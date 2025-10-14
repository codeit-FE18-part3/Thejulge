// 목적: 앱 전역에서 로그인/유저 상태를 관리하고, 인증 관련 표준 함수를 제공한다.
// 특징: 토큰과 사용자 ID는 내부에서만 관리하고, 외부는 파생 상태와 동작 함수만 사용한다.

import { apiLogin, apiSignup } from '@/api/auth';
import { apiGetUser, apiUpdateUser } from '@/api/users';
import type { LoginRequest, User, UserRequest, UserRole } from '@/types/user';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

type AuthContextValue = {
  // 파생 상태
  isLogin: boolean;
  role: UserRole; // 'guest' | 'employee' | 'employer'
  // 데이터
  user: User | null;
  // 동작
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  signup: (data: UserRequest) => Promise<void>;
  getUser: (userId: string) => Promise<void>;
  updateUser: (patch: Partial<User>) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

// 로컬 스토리지 키 (고정)
const TOKEN_KEY = 'thejulge_token';
const USER_ID_KEY = 'thejulge_user_id';
const EXPIRES_KEY = 'thejulge_expires_at'; //  추가: 만료시간 저장용 키

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
  // 핵심 상태: 토큰, 사용자 ID, 사용자 정보
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // 파생 상태
  // 변경: isLogin 기준을 "토큰만"에서 "토큰 + 유저 객체 존재"로 강화
  // → user 로드 전 과도기에 guest 메뉴와 로그아웃이 동시에 뜨는 문제 방지
  const isLogin = !!token && !!user;

  const role: UserRole = useMemo(() => (user ? user.type : 'guest'), [user]);

  // 앱 시작 시 저장소에서 복원
  useEffect(() => {
<<<<<<< HEAD
    const storedToken = getStorage(TOKEN_KEY);
    const storedUserId = getStorage(USER_ID_KEY);
    const expiresAt = Number(getStorage(EXPIRES_KEY)); // 만료시간 불러오기
    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
  }, []);
=======
    let cancelled = false; // 변경: 언마운트 안전 가드

    (async () => {
      const storedToken = getStorage(TOKEN_KEY);
      const storedUserId = getStorage(USER_ID_KEY);
      const expiresAt = Number(getStorage(EXPIRES_KEY)); // 만료시간 불러오기

      // 변경: 유효성 먼저 판단(토큰/유저ID/만료)
      const isValidSession = !!storedToken && !!storedUserId && Date.now() < expiresAt;

      if (!isValidSession) {
        // 만료 또는 비정상 세션 → 로그아웃으로 정리
        logout();
        return;
      }

      // 유효한 경우에만 토큰/유저ID 세팅 후, 유저 정보 동기화
      setToken(storedToken!);
      setUserId(storedUserId!);

      try {
        // 변경: 복원 시에도 /users 조회를 즉시 수행하여 user를 채움
        // → user 세팅 전까지는 isLogin=false 이므로 Nav가 guest만 렌더
        const me = await apiGetUser(storedUserId!);
        if (!cancelled) setUser(me);
      } catch {
        // 실패 시 세션 폐기
        logout();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []); // 의도: 최초 1회(로그아웃은 내부 상태만 쓰므로 deps 생략)
>>>>>>> a564c1a (✨ feat: 프로필 등록 및 상세 페이지 구현, 로그인 상태 관리 개선)

  // 로그인: /token → 토큰/사용자 ID 저장 → /users/{id}로 내 정보 동기화
  const login = useCallback(async (credentials: LoginRequest) => {
    const res = await apiLogin(credentials);
    const newToken = res.item.token;
    const newUserId = res.item.user.item.id;

    //  만료시간 10분
    const expiresAt = Date.now() + 1000 * 60 * 10;

    setToken(newToken);
    setUserId(newUserId);
    setStorage(TOKEN_KEY, newToken);
    setStorage(USER_ID_KEY, newUserId);
    setStorage(EXPIRES_KEY, expiresAt.toString());

    // 변경: 로그인 직후에도 user를 먼저 채운 뒤에야 isLogin=true가 되도록 유지
    const me = await apiGetUser(newUserId);
    setUser(me);
  }, []);

  // 로그아웃: 상태와 저장소 초기화
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setUserId(null);
    removeStorage(TOKEN_KEY);
    removeStorage(USER_ID_KEY);
    removeStorage(EXPIRES_KEY);
  }, []);

  // 회원가입: /users 성공만 확인 (라우팅은 화면에서 처리)
  const signup = useCallback(async (data: UserRequest) => {
    await apiSignup(data);
  }, []);

  // 내 정보 재조회
  const getUser = useCallback(
    async (userId: string) => {
      if (!userId) throw new Error('로그인이 필요합니다');
      const me = await apiGetUser(userId);
      setUser(me);
    },
    [userId]
  );

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
      const expiresAt = Number(getStorage(EXPIRES_KEY));
      if (expiresAt && Date.now() > expiresAt) {
        logout();
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [token, logout]);

  // 컨텍스트 값 메모이즈 (리렌더 최소화)
  const value = useMemo<AuthContextValue>(
    () => ({
      isLogin,
      role,
      user,
      login,
      logout,
      signup,
      getUser,
      updateUser,
    }),
    [isLogin, role, user, login, logout, signup, getUser, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
