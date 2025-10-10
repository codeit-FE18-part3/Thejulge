// 목적: 앱 전역에서 로그인/유저 상태를 관리하고, 인증 관련 함수를 제공한다.
// 특징: 토큰과 사용자 ID를 내부에서 관리하고, 외부는 파생 상태와 동작 함수만 사용한다.

import { apiLogin, apiSignup } from '@/api/auth'; // 로그인/회원가입 API
import { apiGetUser, apiUpdateUser } from '@/api/users'; // 내 정보 API
import type { LoginRequest, User, UserRequest, UserRole } from '@/types/user';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

type AuthContextValue = {
  isLogin: boolean; // 토큰 보유 여부
  role: UserRole; // 'guest' | 'employee' | 'employer'
  user: User | null; // 로그인 상태일 때의 내 정보
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  signup: (data: UserRequest) => Promise<void>;
  getUser: () => Promise<void>;
  updateUser: (patch: Partial<User>) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

// 로컬 스토리지 키: 읽기 쉬운 이름으로 고정
const TOKEN_KEY = 'thejulge_token';
const USER_ID_KEY = 'thejulge_user_id';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 핵심 상태: 토큰, 사용자 ID, 사용자 정보
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // 파생 상태: 로그인 여부, 역할
  const isLogin = !!token;
  const role: UserRole = useMemo(() => (user ? user.type : 'guest'), [user]);

  // 앱 시작 시, 저장소에 남아있는 토큰/사용자 ID 복원
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUserId = localStorage.getItem(USER_ID_KEY);
    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  // 로그인: /token → 토큰과 사용자 ID 저장 → 즉시 내 정보 동기화
  const login: AuthContextValue['login'] = async credentials => {
    const res = await apiLogin(credentials);
    const newToken = res.item.token;
    const newUserId = res.item.user.item.id;

    setToken(newToken);
    setUserId(newUserId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_ID_KEY, newUserId);
    }

    const me = await apiGetUser(newUserId);
    setUser(me);
  };

  // 로그아웃: 상태와 저장소 모두 비우기
  const logout: AuthContextValue['logout'] = () => {
    setToken(null);
    setUser(null);
    setUserId(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
    }
  };

  // 회원가입: /users 성공만 확인(페이지에서 라우팅 처리)
  const signup: AuthContextValue['signup'] = async data => {
    await apiSignup(data);
  };

  // 내 정보 재조회
  const getUser: AuthContextValue['getUser'] = async () => {
    if (!userId) throw new Error('로그인이 필요합니다');
    const me = await apiGetUser(userId);
    setUser(me);
  };

  // 내 정보 수정
  const updateUser: AuthContextValue['updateUser'] = async patch => {
    if (!userId) throw new Error('로그인이 필요합니다');
    const updated = await apiUpdateUser(userId, patch);
    setUser(updated);
  };

  const value: AuthContextValue = {
    isLogin,
    role,
    user,
    login,
    logout,
    signup,
    getUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
