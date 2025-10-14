import { noticeListLayout } from '@/components/features/noticeList/noticeList.styles';
import { Container } from '@/components/layout';
import { useNotice } from '@/context/noticeProvider';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import NoticeList from './noticeList';

const RecommendedNoticeList = () => {
  const { user } = useAuth();
  const { notices, fetchNotices, error, isLoading } = useNotice();
  const recommendedAddress = user?.address ?? '서울시 강남구';
  useEffect(() => {
    fetchNotices({ limit: 3, address: [recommendedAddress] });
  }, []);

  return (
    <div className='bg-red-100'>
      <Container as='section' isPage>
        <h2 className={noticeListLayout.title()}>맞춤 공고</h2>
        <NoticeList
          notices={notices}
          isLoading={isLoading}
          error={error}
          fetchNotices={fetchNotices}
        />
      </Container>
    </div>
  );
};
export default RecommendedNoticeList;
