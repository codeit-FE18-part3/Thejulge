// context/MockAuthProvider.tsx
import { AuthContext } from '@/context/authProvider';
import type { User } from '@/types/user';
import { ReactNode } from 'react';

interface MockAuthProviderProps {
  user: User | null; // employer / employee / null
  children: ReactNode;
}

export const MockAuthProvider = ({ user, children }: MockAuthProviderProps) => {
  const value = {
    user,
    isPending: false,
    isLogin: !!user,
    login: async () => {},
    logout: () => {},
    signup: async () => {},
    getUser: async () => {},
    updateUser: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
