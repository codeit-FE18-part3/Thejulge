import { AllNoticeList, RecommendedNoticeList } from '@/components/features';
import {NoticeProvider} from '@/context/noticeProvider';

export default function Main() {
  return (
    <>
      <NoticeProvider>
        <RecommendedNoticeList />
      </NoticeProvider>
      <NoticeProvider>
        <AllNoticeList />
      </NoticeProvider>
    </>
  );
}
