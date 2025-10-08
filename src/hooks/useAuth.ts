import { AuthContext } from '@/context/authProvider';
import { useContext } from 'react';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 AuthProvider 안에서 사용해야 합니다.');
  return context;
};
export default useAuth;
