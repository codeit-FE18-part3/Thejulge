import { Post, SkeletonUI } from '@/components/ui';
import { ApiAsync } from '@/types/api';
import { PostCard } from '@/types/notice';
import NoticeEmpty from './noticeEmpty';

interface NoticeProps extends ApiAsync {
  notices: PostCard[];
  q?: string;
  reset: () => void;
}

const NoticeList = ({ notices, q, isLoading, isInitialized, reset, error }: NoticeProps) => {
  if (error) {
    return <div> {error}</div>;
  }
  if (!isInitialized || isLoading) {
    if (q) return;
    <SkeletonUI count={6} className='min-h-[270px] target:min-h-[276px] desktop:min-h-[344px]' />;
  }

  if (!isLoading && notices.length === 0) {
    return <NoticeEmpty q={q} onReset={() => reset()} />;
  }

  return (
    <div className='grid gap-x-4 gap-y-8 sm:grid-cols-2 desktop:grid-cols-3'>
      {notices.map(notice => {
        const href = `/notices/${notice.shopId}/${notice.id}`;
        return <Post key={notice.id} notice={notice} href={href} />;
      })}
    </div>
  );
};
export default NoticeList;
