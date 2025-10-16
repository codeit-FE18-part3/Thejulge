import NoticeList from '@/components/features/noticeList/noticeList';
import NoticeListFilter from '@/components/features/noticeList/noticeListFilter';
import { Container } from '@/components/layout';
import { useNotice } from '@/context/noticeProvider';
import type { NoticeQuery } from '@/types/api';
import { useEffect } from 'react';

interface NoticeListSectionProps {
  title?: string; //  제목
  q?: string; // 검색어
  showFilter?: boolean; // 우측 필터 표시 여부
  initialFilters?: Partial<NoticeQuery>; // 섹션 진입 시 적용할 초기 필터
}

const NoticeListSection = ({
  title = '전체 공고',
  q,
  showFilter,
  initialFilters,
}: NoticeListSectionProps) => {
  const { updateFilters, fetchNotices } = useNotice();
  // 섹션 진입 및 q/initialFilters 변경 시 초기 필터 반영하여 조회
  useEffect(() => {
    const hasInitial = Boolean(initialFilters && Object.keys(initialFilters).length > 0);
    if (hasInitial) {
      updateFilters(initialFilters!);
      fetchNotices(initialFilters);
    } else {
      fetchNotices();
    }
    
    // fetchNotices와 updateFilters 함수는 initialFilters값이 변경될때 새로만들어짐
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, initialFilters]);
  return (
    <Container as='section' isPage>
      <div className='mb-4 flex items-center justify-between tablet:mb-8'>
        {q ? (
          <h2 className='text-heading-l font-bold'>
            <span className='text-red-500'>{q}</span>에 대한 공고 목록
          </h2>
        ) : (
          <h2 className='text-heading-l font-bold'>{title}</h2>
        )}
        {showFilter && <NoticeListFilter />}
      </div>
      <NoticeList q={q} />
    </Container>
  );
};

export default NoticeListSection;
