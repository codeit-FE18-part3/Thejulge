// context/MockAuthProvider.tsx
import { AuthContext } from '@/context/authProvider';
import type { User, UserRole } from '@/types/user';
import { ReactNode } from 'react';

interface MockAuthProviderProps {
  user: User | null;
  role?: UserRole; // guest | employer | employee
  children: ReactNode;
}

export const MockAuthProvider = ({ user, role, children }: MockAuthProviderProps) => {
  const value = {
    user,
    isPending: false,
    isLogin: role !== 'guest',
    role: role ?? (user ? user.type : 'guest'),
    login: async () => {},
    logout: () => {},
    signup: async () => {},
    getUser: async () => {},
    updateUser: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
