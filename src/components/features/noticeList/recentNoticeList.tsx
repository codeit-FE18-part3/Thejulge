import { noticeListLayout } from '@/components/features/noticeList/noticeList.styles';
import { Container } from '@/components/layout';

// @TODO 최근에 본 공고 리스트 출력 
const RecentNoticeList = () => {
  return (
    <Container as='section' isPage>
      <h2 className={noticeListLayout.title()}>최근에 본 공고</h2>
    </Container>
  );
};
export default RecentNoticeList;
