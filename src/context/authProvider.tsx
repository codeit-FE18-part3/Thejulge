import { LoginRequest, User, UserRequest, UserRole } from '@/types/user';
import { createContext, ReactNode, useState } from 'react';

/**
 * @TODO
 * token은 AuthProvider 내부에서만 관리하고 외부에는 파생된 상태(isLogin, user 같은 권한)만 소비하는 설계
 * 컴포넌트에서 토큰 문자열을 직접 다룰일을 막을 수 있음 (보안/ 유지보수측면)
 * 토큰 저장 위치(Storage, cookie 등)를 변경해야 할때도 컨텍스트 안에서만 토큰이 사용되기 때문에 외부 코드를 건드릴 일이 없음
 * token을 간접적으로 사용하는 저장,삭제,업데이트와 같은 액션은 내부 함수로 작성하고 Provider 외부로 노출하면 관리에 용이함
 * 외부는 파생된 상태값만 받아서 적절한 권한 처리만 하면 된다.
 *
 * AuthContextValue의 함수는 전부 void 값으로 지정했으나 구현에 따라
 * return 값이 필요할 경우 type/user 에서 맞는 타입 지정
 *
 * 초반 설계는 AuthContext에서 구현을 하다가
 * 추후 AuthContext (토큰,로그인 상태 관리) / UserContext (프로필 전용) 로 관심사 분리 리팩토링 고려
 *
 */

type AuthState = {
  user: User | null;
  isPending: boolean;
};
interface AuthContextValue extends AuthState {
  isLogin: boolean;
  role: UserRole;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  signup: (data: UserRequest) => Promise<void>;
  getUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}
const initialState: AuthState = {
  user: null,
  isPending: true,
};
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<AuthState>(initialState);
  const [token, setToken] = useState<string | null>(null);

  const isLogin = !!token;
  const role: UserRole = !isLogin
    ? 'guest'
    : values.user?.type === 'employer'
      ? 'employer'
      : 'employee';

  const login: AuthContextValue['login'] = async credentials => {
    // TODO: 로그인 구현 (API 요청 후 setValues, setToken)
  };
  const logout: AuthContextValue['logout'] = () => {
    // TODO: 로그아웃 구현 (setValues, setToken 초기화)
  };
  const signup: AuthContextValue['signup'] = async data => {
    // TODO: 회원가입 구현
  };
  const getUser: AuthContextValue['getUser'] = async () => {
    // TODO: 유저 조회 구현
  };
  const updateUser: AuthContextValue['updateUser'] = async data => {
    // TODO: 유저 업데이트 구현
  };

  const value: AuthContextValue = {
    ...values,
    isLogin,
    role,
    login,
    logout,
    signup,
    getUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
