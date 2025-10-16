import { Container } from '@/components/layout';
import { Post } from '@/components/ui';
import { useRecentNoticeList } from './hooks/useRecentNotice';

const RecentNoticeList = () => {
  const { recentNotices } = useRecentNoticeList();

  if (recentNotices.length === 0) return null;

  return (
    <Container as='section' isPage>
      <h2 className='mb-4 text-heading-l font-bold tablet:mb-8'>최근에 본 공고</h2>
      <div className='grid gap-x-4 gap-y-8 sm:grid-cols-2 desktop:grid-cols-3'>
        {recentNotices.map(notice => (
          <Post key={notice.id} notice={notice} />
        ))}
      </div>
    </Container>
  );
};
export default RecentNoticeList;
