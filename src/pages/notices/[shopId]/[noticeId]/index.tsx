import { Button, Notice } from '@/components/ui';
import axiosInstance from '@/lib/axios';
import { getNoticeStatus } from '@/lib/utils/getNoticeStatus';
import { toNoticeCard } from '@/lib/utils/parse';
import type { NoticeCard } from '@/types/notice';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{ notice: NoticeCard }> = async ({
  params,
}) => {
  const { shopId, noticeId } = params as { shopId: string; noticeId: string };
  let notice;
  try {
    const res = await axiosInstance.get(`/shops/${shopId}/notices/${noticeId}`);
    notice = toNoticeCard(res.data); // API 응답 NoticeCard로 평탄화
  } catch {
    return {
      notFound: true,
    };
  }
  return { props: { notice } };
};

// @TODO 알바 신청 로직 구현 예정
const Notices = ({ notice }: { notice: NoticeCard }) => {
  const status = getNoticeStatus(notice.closed, notice.startsAt);
  const isOpen = status === 'open';
  return (
    <div>
      <Notice notice={notice} className='py-10 tablet:py-16'>
        <Button size='xs38' full className='font-bold' variant={isOpen ? 'disabled' : 'primary'}>
          {isOpen ? '신청 불가' : '신청하기'}
        </Button>
      </Notice>
    </div>
  );
};
export default Notices;
