import { Dropdown, Filter } from '@/components/ui';
import { getActiveFilterCount } from '@/components/ui/filter/getActiveFilterCount';
import { SORT_CODE, type SortCode } from '@/constants/dropdown';
import { useNotice } from '@/context/noticeProvider';
import { FilterQuery, type sort } from '@/types/api';
import { useState } from 'react';

const SORT_TO_API: Record<SortCode, sort> = {
  '마감 임박 순': 'time',
  '시급 많은 순': 'pay',
  '시간 적은 순': 'hour',
  '가나다 순': 'shop',
};

const NoticeListFilter = () => {
  const { fetchNotices, updateFilters, filters } = useNotice();
  const [sort, setSort] = useState<SortCode>('마감 임박 순');
  const appliedCount = getActiveFilterCount(filters);

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
    <div className='flex gap-3'>
      <Dropdown
        name='sort'
        ariaLabel='공고 정렬 기준'
        size='sm'
        values={SORT_CODE}
        selected={sort}
        onChange={handleSort}
      />
      <Filter appliedCount={appliedCount} value={filters} onSubmit={handleFilter} align='right' />
    </div>
  );
};
export default NoticeListFilter;
