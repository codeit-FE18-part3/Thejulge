import { Post } from '@/components/ui';
import { Pagination } from '@/components/ui/pagination';
import { NoticeQuery, PaginatedResponse } from '@/types/api';
import { type PostCard } from '@/types/notice';

interface NoticeListProps {
  notices: PostCard[];
  pagination?: PaginatedResponse;
  isLoading: boolean;
  error: string | null;
  fetchNotices?: (params?: Partial<NoticeQuery>) => Promise<void>;
}

const NoticeList = ({ notices, isLoading, error, pagination, fetchNotices }: NoticeListProps) => {
  
  if (error) {
    return <div> {error}</div>;
  }
  if (notices.length === 0) {
    return <div>공고가 존재하지 않습니다</div>;
  }

  return (
    <>
      {isLoading ? (
        <div>로딩중 .. 스켈레톤 UI 삽입예정</div>
      ) : (
        <div className='grid gap-x-4 gap-y-8 sm:grid-cols-2 desktop:grid-cols-3'>
          {notices.map(notice => (
            <Post key={notice.id} notice={notice} />
          ))}
        </div>
      )}
      {pagination && (
        <Pagination
          total={pagination.count}
          limit={pagination.limit}
          offset={pagination.offset}
          onPageChange={next => fetchNotices?.({ offset: next })}
          className='mt-8 tablet:mt-10'
        />
      )}
    </>
  );
};
export default NoticeList;
