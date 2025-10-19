import { DROPDOWN_STYLE } from '@/components/ui/dropdown/dropdown.styles';
import useClickOutside from '@/hooks/useClickOutside';
import useEscapeKey from '@/hooks/useEscapeKey';
import useSafeRef from '@/hooks/useSafeRef';
import useToggle from '@/hooks/useToggle';
import { cn } from '@/lib/utils/cn';
import { FilterQuery } from '@/types/api';
import { useCallback, useEffect, useState } from 'react';
import FilterBody from './components/filterBody';
import FilterFooter from './components/filterFooter';
import FilterHeader from './components/filterHeader';
import { filterLayout } from './filter.styles';
import { getActiveFilterCount } from './getActiveFilterCount';

interface FilterProps {
  value: FilterQuery;
  appliedCount: number;
  onSubmit: (next: FilterQuery) => void;
  className?: string;
  align?: 'left' | 'right';
}

const INIT_DATA: FilterQuery = {
  address: undefined,
  startsAtGte: undefined,
  hourlyPayGte: undefined,
};

export function normalizeFilter(q: FilterQuery): FilterQuery {
  return {
    address: q.address && q.address.length > 0 ? q.address : undefined,
    startsAtGte: q.startsAtGte ?? undefined,
    hourlyPayGte: typeof q.hourlyPayGte === 'number' ? q.hourlyPayGte : undefined,
  };
}

const Filter = ({ value, onSubmit, appliedCount, className, align = 'right' }: FilterProps) => {
  const { isOpen, setClose, toggle } = useToggle();
  const [draft, setDraft] = useState<FilterQuery>(value);
  const [attachFilterRef, filterRef] = useSafeRef<HTMLDivElement>();

  const handleSubmit = useCallback(() => {
    onSubmit(normalizeFilter(draft));
    setClose();
  }, [draft, onSubmit, setClose]);

  const handleReset = useCallback(() => {
    setDraft(INIT_DATA);
  }, []);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useClickOutside(filterRef, setClose);
  useEscapeKey(setClose);

  return (
    <div className='relative' ref={attachFilterRef}>
      <button
        type='button'
        className={cn(
          DROPDOWN_STYLE['base'],
          DROPDOWN_STYLE['sm'],
          'min-w-0 border border-red-400 bg-white px-3 text-red-400'
        )}
        onClick={toggle}
      >
        상세 필터{appliedCount > 0 && <>({appliedCount})</>}
      </button>
      <div
        className={cn(
          filterLayout.wrapper(),
          filterLayout.placement({ align }),
          isOpen ? 'block' : 'hidden',
          className
        )}
      >
        <FilterHeader onClose={setClose} activeCount={getActiveFilterCount(draft)} />
        <FilterBody formData={draft} onChange={setDraft} />
        <FilterFooter onReset={handleReset} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
export default Filter;
