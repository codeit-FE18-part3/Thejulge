import { Dropdown, Filter } from '@/components/ui';
import { getActiveFilterCount } from '@/components/ui/filter/getActiveFilterCount';
import { SORT_CODE, type SortCode } from '@/constants/dropdown';
import { FilterQuery, NoticeQuery, type sort } from '@/types/api';
import { useMemo } from 'react';

const SORT_TO_API: Record<SortCode, sort> = {
  '마감 임박 순': 'time',
  '시급 많은 순': 'pay',
  '시간 적은 순': 'hour',
  '가나다 순': 'shop',
};

interface NoticeListFilterProps {
  filters: NoticeQuery;
  onSortChange: (sort: sort) => void;
  onFilterSubmit: (filter: FilterQuery) => void;
}

const NoticeListFilter = ({ filters, onSortChange, onFilterSubmit }: NoticeListFilterProps) => {
  const selectedLabel = useMemo<SortCode>(() => {
    const currentSort = filters.sort ?? 'time';
    const entry = Object.entries(SORT_TO_API).find(([, v]) => v === currentSort);
    return entry?.[0] as SortCode;
  }, [filters.sort]);

  const appliedCount = getActiveFilterCount(filters);

  const handleSort = (next: SortCode) => {
    const s = SORT_TO_API[next];
    onSortChange(s);
  };

  const handleFilter = (filter: FilterQuery) => {
    onFilterSubmit(filter);
  };

  return (
    <div className='flex gap-3'>
      <Dropdown
        name='sort'
        ariaLabel='공고 정렬 기준'
        size='sm'
        values={SORT_CODE}
        selected={selectedLabel}
        onChange={handleSort}
      />
      <Filter appliedCount={appliedCount} value={filters} onSubmit={handleFilter} align='right' />
    </div>
  );
};
export default NoticeListFilter;
