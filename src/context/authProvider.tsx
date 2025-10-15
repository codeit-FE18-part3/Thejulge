// 목적: 앱 전역에서 로그인/유저 상태를 관리하고, 인증 관련 표준 함수를 제공한다.
// 특징: 토큰과 사용자 ID는 내부에서만 관리하고, 외부는 파생 상태와 동작 함수만 사용한다.

import { apiLogin, apiSignup } from '@/api/auth';
import { apiGetUser, apiUpdateUser } from '@/api/users';
import type { LoginRequest, User, UserRequest, UserRole } from '@/types/user';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

type AuthContextValue = {
  // 파생 상태
  isLogin: boolean;
  role: UserRole; // 'guest' | 'employee' | 'employer'
  // 부트스트랩(초기 복원) 완료 여부 노출 (선택적으로 UI 제어에 사용 가능)
  bootstrapped: boolean;
  // 데이터
  user: User | null;
  // 동작
  login: (credentials: LoginRequest) => Promise<void>;
  // redirectTo: string | false
  // - string: 해당 경로로 replace 이동
  // - false : 이동하지 않음
  logout: (redirectTo?: string | false) => void;
  signup: (data: UserRequest) => Promise<void>;
  getUser: () => Promise<void>;
  updateUser: (patch: Partial<User>) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

// 로컬 스토리지 키 (고정)
const TOKEN_KEY = 'thejulge_token';
const USER_ID_KEY = 'thejulge_user_id';
const EXPIRES_KEY = 'thejulge_expires_at'; // 만료시간 저장 키
const EXP_TIME = 10 * 60 * 1000; // 만료 유지시간 10분

// 브라우저에서만 동작하도록 가드된 유틸
const setStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(key, value);
};
const getStorage = (key: string) =>
  typeof window !== 'undefined' ? localStorage.getItem(key) : null;
const removeStorage = (key: string) => {
  if (typeof window !== 'undefined') localStorage.removeItem(key);
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  // 핵심 상태: 토큰, 사용자 ID, 사용자 정보
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  //  변경: 부트스트랩(초기 세션 복원) 완료 플래그
  const [bootstrapped, setBootstrapped] = useState(false);

  // 파생 상태
  //  변경: isLogin = 토큰 + 유저가 모두 있어야 true (과도기에 guest+로그아웃 동시 노출 방지)
  const isLogin = !!token && !!user;
  const role: UserRole = useMemo(() => (user ? user.type : 'guest'), [user]);

  const logout = useCallback(
    (redirectTo: string | false = '/') => {
      setToken(null);
      setUser(null);
      setUserId(null);
      removeStorage(TOKEN_KEY);
      removeStorage(USER_ID_KEY);
      removeStorage(EXPIRES_KEY); // 만료키 삭제
      //  로그아웃 후 이동 (replace: 뒤로가기 눌러도 다시 로그인 상태로 못 돌아가게)
      if (redirectTo !== false) {
        router.replace(redirectTo);
      }
    },
    [router]
  );

  // 앱 시작 시 저장소에서 복원
  useEffect(() => {
    let cancelled = false; //  변경: 언마운트 가드

    (async () => {
      const storedToken = getStorage(TOKEN_KEY);
      const storedUserId = getStorage(USER_ID_KEY);
      const expText = getStorage(EXPIRES_KEY) ?? ''; // exp: 만료시각(ms) 문자열
      const exp = Number(expText) || 0; // 문자열 → 숫자 (없으면 0)

      // 토큰/ID 없거나, exp 없거나, 이미 지났으면 즉시 로그아웃
      if (!storedToken || !storedUserId || !exp || Date.now() >= exp) {
        logout(false);
        setBootstrapped(true); // 복원 종료 신호
        return;
      }

      //  유효할 때만 복원 + user까지 동기화(여기 전까지는 isLogin=false)
      setToken(storedToken);
      setUserId(storedUserId);

      try {
        const me = await apiGetUser(storedUserId);
        if (!cancelled) setUser(me);
      } catch {
        logout();
      } finally {
        if (!cancelled) setBootstrapped(true); //  복원 종료 신호
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [logout]);

  // 로그인: /token → 토큰/사용자 ID 저장 → /users/{id}로 내 정보 동기화
  const login = useCallback(async (credentials: LoginRequest) => {
    const res = await apiLogin(credentials);
    const newToken = res.item.token;
    const newUserId = res.item.user.item.id;

    const exp = Date.now() + EXP_TIME; // 지금부터 10분 후 만료시각 계산
    setStorage(EXPIRES_KEY, String(exp)); // 만료시각 저장

    setToken(newToken);
    setUserId(newUserId);
    setStorage(TOKEN_KEY, newToken);
    setStorage(USER_ID_KEY, newUserId);

    //  로그인 직후에도 user를 먼저 채운 뒤에야 isLogin=true가 되도록
    const me = await apiGetUser(newUserId);
    setUser(me);
  }, []);

  // 회원가입: /users 성공만 확인 (라우팅은 화면에서 처리)
  const signup = useCallback(async (data: UserRequest) => {
    await apiSignup(data);
  }, []);

  // 내 정보 재조회
  const getUser = useCallback(async () => {
    if (!userId) throw new Error('로그인이 필요합니다');
    const me = await apiGetUser(userId);
    setUser(me);
  }, [userId]);

  // 내 정보 수정
  const updateUser = useCallback(
    async (patch: Partial<User>) => {
      if (!userId) throw new Error('로그인이 필요합니다');
      const updated = await apiUpdateUser(userId, patch);
      setUser(updated);
    },
    [userId]
  );

  //  1분마다 만료여부 확인
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      const expText = getStorage(EXPIRES_KEY) ?? ''; // 만료시각 다시 읽기
      const exp = Number(expText) || 0; // 숫자로 변환
      if (!exp || Date.now() >= exp) logout('/'); // 만료면 로그아웃하고 메인으로
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [token, logout]);

  // 컨텍스트 값 메모이즈 (리렌더 최소화)
  const value = useMemo<AuthContextValue>(
    () => ({
      isLogin,
      role,
      // 부트스트랩 완료 여부도 컨텍스트로 제공
      bootstrapped,
      user,
      login,
      logout,
      signup,
      getUser,
      updateUser,
    }),
    [isLogin, role, bootstrapped, user, login, logout, signup, getUser, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
