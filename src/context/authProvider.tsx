// 원칙: state는 user 하나만 관리(부트스트랩/로그인여부는 파생)

import { apiLogin, apiSignup } from '@/api/auth';
import { apiGetUser, apiUpdateUser } from '@/api/users';
import type { LoginRequest, User, UserRequest, UserRole } from '@/types/user';
import { useRouter } from 'next/router';
import { createContext, type ReactNode, useCallback, useEffect, useState } from 'react';

type AuthContextValue = {
  /** 파생: user가 있으면 true */
  isLogin: boolean;
  /** 파생: user?.type 또는 'guest' */
  role: UserRole;
  /** 파생: user !== undefined (부트스트랩 완료 여부) */
  bootstrapped: boolean;
  /** 로그인 유저. 미로그인은 null */
  user: User | null;

  /** 로그인: 토큰/아이디/만료시각 저장 → 내 정보 조회 → user 채움 */
  login: (credentials: LoginRequest) => Promise<void>;
  /** 로그아웃: 저장소 초기화 + user=null + (옵션) 리다이렉트 */
  logout: (redirectTo?: string | false) => void;
  /** 회원가입 */
  signup: (data: UserRequest) => Promise<void>;
  /** 내 정보 재조회: 저장소 userId 기준 */
  getUser: () => Promise<void>;
  /** 내 정보 수정: 성공 시 Context의 user 동기화 */
  updateUser: (patch: Partial<User>) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

/** LocalStorage keys */
const TOKEN_KEY = 'thejulge_token';
const USER_ID_KEY = 'thejulge_user_id';
const EXPIRES_KEY = 'thejulge_expires_at';
const EXPIRES_DURATION_MS = 10 * 60 * 1000; // 10분

/** storage helpers */
const isBrowser = () => typeof window !== 'undefined';

const setLocalStorageItem = (key: string, value: string) => {
  if (isBrowser()) localStorage.setItem(key, value);
};
const getLocalStorageItem = (key: string) => (isBrowser() ? localStorage.getItem(key) : null);
const removeLocalStorageItem = (key: string) => {
  if (isBrowser()) localStorage.removeItem(key);
};

const readAuthFromStorage = () => {
  const token = getLocalStorageItem(TOKEN_KEY);
  const userId = getLocalStorageItem(USER_ID_KEY);
  const expiresAt = Number(getLocalStorageItem(EXPIRES_KEY) ?? '') || 0;
  return { token, userId, expiresAt };
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // 단일 핵심 상태
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // 파생값
  const isLogin = !!user;
  const role: UserRole = user ? user.type : 'guest';
  const bootstrapped = user !== undefined;

  /** 로그아웃: 저장소 초기화 + user=null + (옵션) 리다이렉트 */
  const logout = useCallback(
    (redirectTo: string | false = '/') => {
      setUser(null);
      removeLocalStorageItem(TOKEN_KEY);
      removeLocalStorageItem(USER_ID_KEY);
      removeLocalStorageItem(EXPIRES_KEY);
      if (redirectTo !== false) router.replace(redirectTo);
    },
    [router]
  );

  /** 부트스트랩: 저장소 값 유효 → /users/{id} 조회 → user 주입 (아니면 user=null) */
  useEffect(() => {
    const bootstrap = async () => {
      const { token, userId, expiresAt } = readAuthFromStorage();

      // token / userId 없거나 "만료된 expiresAt"만 진짜 무효
      const isInvalid = !token || !userId || (!!expiresAt && Date.now() >= expiresAt);
      if (isInvalid) {
        logout(false); // 화면 이동은 하지 않음
        setUser(null); // 부트스트랩 종료(비로그인 상태 확정)
        return;
      }

      // ✅ 자기치유: token + userId는 있는데 expiresAt만 없는 과거 세션 방어
      if (!expiresAt) {
        const newExpiresAt = Date.now() + EXPIRES_DURATION_MS;
        setLocalStorageItem(EXPIRES_KEY, String(newExpiresAt));
      }

      try {
        const me = await apiGetUser(userId);
        setUser(me);
      } catch {
        logout(false);
        setUser(null);
      }
    };

    bootstrap();
  }, [logout]);

  /** 로그인: 토큰/아이디/만료시각 저장 → 내 정보 조회 → user 채움 */
  const login = useCallback(async (credentials: LoginRequest) => {
    const res = await apiLogin(credentials);
    const token = res.item.token;
    const userId = res.item.user.item.id;
    const expiresAt = Date.now() + EXPIRES_DURATION_MS;

    setLocalStorageItem(TOKEN_KEY, token);
    setLocalStorageItem(USER_ID_KEY, userId);
    setLocalStorageItem(EXPIRES_KEY, String(expiresAt));

    const me = await apiGetUser(userId);
    setUser(me);
  }, []);

  /** 회원가입 */
  const signup = useCallback(async (data: UserRequest) => {
    await apiSignup(data);
  }, []);

  /** 내 정보 재조회: 저장소 userId 기준 */
  const getUser = useCallback(async () => {
    const { userId } = readAuthFromStorage();
    if (!userId) throw new Error('로그인이 필요합니다.');
    const me = await apiGetUser(userId);
    setUser(me);
  }, []);

  /** 내 정보 수정: 성공 시 Context의 user 동기화 */
  const updateUser = useCallback(async (patch: Partial<User>) => {
    const { userId } = readAuthFromStorage();
    if (!userId) throw new Error('로그인이 필요합니다.');
    const updated = await apiUpdateUser(userId, patch);
    setUser(updated);
  }, []);

  /** 만료 체크: 1분마다 확인 → 만료 시 자동 로그아웃
   *  - 로그인 상태에서만 타이머 동작
   *  - expiresAt이 없으면 아무 것도 하지 않음(로그아웃 금지)
   */
  useEffect(() => {
    if (!isLogin) return;
    const timerId = setInterval(() => {
      const { expiresAt } = readAuthFromStorage();
      if (!expiresAt) return; // 키가 없다면 건드리지 않음
      if (Date.now() >= expiresAt) logout('/'); // 진짜 만료시에만 로그아웃
    }, 60 * 1000);
    return () => clearInterval(timerId);
  }, [isLogin, logout]);

  /** Context 값 */
  const value: AuthContextValue = {
    isLogin,
    role,
    bootstrapped,
    user: user ?? null,
    login,
    logout,
    signup,
    getUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
