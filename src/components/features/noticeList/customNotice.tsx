import { Container, HorizontalScroll } from '@/components/layout';
import { Post, SkeletonUI } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import useCustomNotices from './hooks/useCustomNotices';

const CustomNoticeList = () => {
  const { user } = useAuth();
  const { notices, isLoading, error } = useCustomNotices(user?.address);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonUI
          count={3}
          className='min-h-[270px] target:min-h-[276px] desktop:min-h-[344px]'
        />
      ) : (
        <HorizontalScroll as='ul' className='flex gap-x-4 gap-y-8 px-3 desktop:px-8'>
          {notices.map(notice => {
            const href = `/notices/${notice.shopId}/${notice.id}`;
            return (
              <li key={notice.id} className='min-w-[310px] flex-initial'>
                <Post notice={notice} href={href} />
              </li>
            );
          })}
        </HorizontalScroll>
      )}
    </>
  );
};

const CustomNotice = () => (
  <div className='bg-red-100'>
    <Container as='section' isPage className='!px-0'>
      <h2 className='mb-4 px-3 text-heading-l font-bold tablet:mb-8 tablet:px-8'>맞춤공고</h2>
      <CustomNoticeList />
    </Container>
  </div>
);
export default CustomNotice;
