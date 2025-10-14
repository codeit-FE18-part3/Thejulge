import { NoticeContext } from '@/context/noticeProvider';
import { useContext } from 'react';

const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) throw new Error('useContext는 NoticeContext 안에서 사용해야 합니다.');
  return context;
};
export default useNotice;
