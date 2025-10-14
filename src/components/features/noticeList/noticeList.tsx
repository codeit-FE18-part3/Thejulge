import { Post } from '@/components/ui';
import { Pagination } from '@/components/ui/pagination';
import { useNotice } from '@/context/noticeProvider';

interface NoticeProps {
  q: string | undefined;
}

const NoticeList = ({ q }: NoticeProps) => {
  const { notices, isLoading, error, pagination, fetchNotices } = useNotice();
  if (error) {
    return <div> {error}</div>;
  }
  if (notices.length === 0) {
    return <div>{q && q + '에 대한 '}공고가 존재하지 않습니다</div>;
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
      <Pagination
        total={pagination.count}
        limit={pagination.limit}
        offset={pagination.offset}
        onPageChange={next => fetchNotices({ offset: next })}
        className='mt-8 tablet:mt-10'
      />
    </>
  );
};
export default NoticeList;
