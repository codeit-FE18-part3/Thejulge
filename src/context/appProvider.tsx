import { ReactNode } from 'react';
import AuthProvider from './authProvider';
import { ToastProvider } from './toastContext';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};
export default AppProvider;
