import { noticeListLayout } from '@/components/features/noticeList/noticeList.styles';
import { Container } from '@/components/layout';
import { Dropdown, Filter } from '@/components/ui';
import { getActiveFilterCount } from '@/components/ui/filter/getActiveFilterCount';
import { SORT_CODE, type SortCode } from '@/constants/dropdown';
import useNotice from '@/hooks/useNotice';
import { FilterQuery, type sort } from '@/types/api';
import { useEffect, useState } from 'react';
import NoticeList from './noticeList';

const SORT_TO_API: Record<SortCode, sort> = {
  '마감 임박 순': 'time',
  '시급 많은 순': 'pay',
  '시간 적은 순': 'hour',
  '가나다 순': 'shop',
};

const AllNoticeList = () => {
  const { notices, fetchNotices, updateFilters, filters, error, isLoading, pagination } =
    useNotice();
  const [sort, setSort] = useState<SortCode>('마감 임박 순');
  const appliedCount = getActiveFilterCount(filters);
  
  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSort = (label: SortCode) => {
    const sort = SORT_TO_API[label];
    fetchNotices({ sort });
    setSort(label);
  };

  const handleFilter = (q: FilterQuery) => {
    updateFilters(q);
    fetchNotices(q);
  };

  return (
    <Container as='section' isPage>
      <div className='mb-4 flex items-center justify-between tablet:mb-8'>
        <h2 className={noticeListLayout.title({ className: 'mb-0 tablet:mb-0' })}>전체 공고</h2>
        <div className='flex gap-3'>
          <Dropdown
            name='sort'
            ariaLabel='공고 정렬 기준'
            size='sm'
            values={SORT_CODE}
            selected={sort}
            onChange={handleSort}
          />
          <Filter
            appliedCount={appliedCount}
            value={filters}
            onSubmit={handleFilter}
            align='right'
          />
        </div>
      </div>
      <NoticeList
        notices={notices}
        isLoading={isLoading}
        error={error}
        pagination={pagination}
        fetchNotices={fetchNotices}
      />
    </Container>
  );
};
export default AllNoticeList;
