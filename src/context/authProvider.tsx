// 목적: 앱 전역에서 로그인/유저 상태를 관리하고, 인증 관련 표준 함수를 제공한다.
// 특징: 토큰/유저ID/만료시각은 내부에서만 관리. 외부는 파생 상태와 동작 함수만 사용.

import { apiLogin, apiSignup } from '@/api/auth';
import { apiGetUser, apiUpdateUser } from '@/api/users';
import type { LoginRequest, User, UserRequest, UserRole } from '@/types/user';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

type AuthContextValue = {
  // 파생 상태
  isLogin: boolean; // 토큰+유저 동시 존재할 때 true
  role: UserRole;   // 'guest' | 'employee' | 'employer'
  bootstrapped: boolean; // 초기 복원(bootstrap) 완료 플래그

  // 데이터
  user: User | null;

  // 동작
  login: (credentials: LoginRequest) => Promise<void>;
  // redirectTo:
  //  - string: 로그아웃 후 해당 경로로 replace 이동
  //  - false : 이동 안 함
  logout: (redirectTo?: string | false) => void;
  signup: (data: UserRequest) => Promise<void>;
  getUser: () => Promise<void>;
  updateUser: (patch: Partial<User>) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

// 로컬 스토리지 키
const TOKEN_KEY = 'thejulge_token';
const USER_ID_KEY = 'thejulge_user_id';
const EXPIRES_KEY = 'thejulge_expires_at'; // 만료시각(ms) 저장
const EXP_TIME = 10 * 60 * 1000; // 10분

// 브라우저 가드 유틸
const setStorage = (k: string, v: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(k, v);
};
const getStorage = (k: string) =>
  typeof window !== 'undefined' ? localStorage.getItem(k) : null;
const removeStorage = (k: string) => {
  if (typeof window !== 'undefined') localStorage.removeItem(k);
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // 핵심 상태
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  // 파생 상태
  const isLogin = !!token && !!user;
  const role: UserRole = useMemo(() => (user ? user.type : 'guest'), [user]);

  // 로그아웃
  const logout = useCallback(
    (redirectTo: string | false = '/') => {
      setToken(null);
      setUser(null);
      setUserId(null);
      removeStorage(TOKEN_KEY);
      removeStorage(USER_ID_KEY);
      removeStorage(EXPIRES_KEY);
      if (redirectTo !== false) router.replace(redirectTo);
    },
    [router]
  );

  // 앱 시작 시 저장소에서 복원 (bootstrap)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const storedToken = getStorage(TOKEN_KEY);
      const storedUserId = getStorage(USER_ID_KEY);
      const expText = getStorage(EXPIRES_KEY) ?? '';
      const exp = Number(expText) || 0;

      // 토큰/ID 없거나 만료면 종료
      if (!storedToken || !storedUserId || !exp || Date.now() >= exp) {
        logout(false); // 화면 이동은 하지 않음
        setBootstrapped(true);
        return;
      }

      // 유효 → 상태 반영 + 유저 동기화
      setToken(storedToken);
      setUserId(storedUserId);
      try {
        const me = await apiGetUser(storedUserId);
        if (!cancelled) setUser(me);
      } catch {
        logout(false);
      } finally {
        if (!cancelled) setBootstrapped(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [logout]);

  // 로그인
  const login = useCallback(async (credentials: LoginRequest) => {
    const res = await apiLogin(credentials);
    const newToken = res.item.token;
    const newUserId = res.item.user.item.id;

    const exp = Date.now() + EXP_TIME;
    setStorage(EXPIRES_KEY, String(exp));

    setToken(newToken);
    setUserId(newUserId);
    setStorage(TOKEN_KEY, newToken);
    setStorage(USER_ID_KEY, newUserId);

    const me = await apiGetUser(newUserId);
    setUser(me);
  }, []);

  // 회원가입
  const signup = useCallback(async (data: UserRequest) => {
    await apiSignup(data);
  }, []);

  // 내 정보 재조회
  const getUser = useCallback(async () => {
    if (!userId) throw new Error('로그인이 필요합니다.');
    const me = await apiGetUser(userId);
    setUser(me);
  }, [userId]);

  // 내 정보 수정
  const updateUser = useCallback(
    async (patch: Partial<User>) => {
      if (!userId) throw new Error('로그인이 필요합니다.');
      const updated = await apiUpdateUser(userId, patch);
      setUser(updated); // 컨텍스트 동기화
    },
    [userId]
  );

  // 1분마다 만료 여부 체크
  useEffect(() => {
    if (!token) return;
    const timer = setInterval(() => {
      const expText = getStorage(EXPIRES_KEY) ?? '';
      const exp = Number(expText) || 0;
      if (!exp || Date.now() >= exp) logout('/'); // 만료 시 메인으로
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, [token, logout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLogin,
      role,
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
