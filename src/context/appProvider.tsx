import { ReactNode } from 'react';
import AuthProvider from './authProvider';
import { ToastProvider } from './toastContext';
import { UserApplicationsProvider } from './userApplicationsProvider';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <UserApplicationsProvider>
        <ToastProvider>{children}</ToastProvider>
      </UserApplicationsProvider>
    </AuthProvider>
  );
};
export default AppProvider;
