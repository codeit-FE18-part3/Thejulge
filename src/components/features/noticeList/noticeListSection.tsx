import NoticeList from '@/components/features/noticeList/noticeList';
import NoticeListFilter from '@/components/features/noticeList/noticeListFilter';
import { Container } from '@/components/layout';
import { Pagination } from '@/components/ui';
import type { NoticeQuery } from '@/types/api';
import { useEffect } from 'react';
import useNotices from './hooks/useNotices';
import NoticeListHeader from './noticeListHeader';

interface NoticeListSectionProps {
  q?: string; // 검색어
  initialFilters?: Partial<NoticeQuery>; // 섹션 진입 시 적용할 초기 필터
}

const NoticeListSection = ({ q, initialFilters }: NoticeListSectionProps) => {
  const { notices, isLoading, isInitialized, error, pagination, fetchNotices, reset, filters } =
    useNotices();

  useEffect(() => {
    // 새 검색어/필터로 진입 시 페이지를 1페이지로 리셋
    fetchNotices({ ...(initialFilters ?? {}), offset: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, initialFilters]);

  return (
    <Container as='section' isPage>
      <div className='mb-4 flex items-center justify-between tablet:mb-8'>
        <NoticeListHeader q={q} />
        <NoticeListFilter
          filters={filters}
          onSortChange={sort => fetchNotices({ sort, offset: 0 })}
          onFilterSubmit={filter => fetchNotices({ ...filter, offset: 0 })}
        />
      </div>
      <NoticeList
        q={q}
        notices={notices}
        isLoading={isLoading}
        error={error}
        isInitialized={isInitialized}
        reset={reset}
      />
      <div className='mt-8 tablet:mt-10 min-h-[40px]'>
        <Pagination
          total={pagination.count}
          limit={pagination.limit}
          offset={pagination.offset}
          onPageChange={next => {
            if (isLoading) return; // 로딩 중이면 페이지 전환 무시 (깜빡임 방지)
            fetchNotices({ offset: next });
          }}
        />
      </div>
    </Container>
  );
};

export default NoticeListSection;
