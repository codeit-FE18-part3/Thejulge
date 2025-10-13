import { cn } from '@/lib/utils/cn';
import { FilterQueryParams } from '@/types/api';
import { useCallback, useEffect, useState } from 'react';
import FilterBody from './components/filterBody';
import FilterFooter from './components/filterFooter';
import FilterHeader from './components/filterHeader';
import { filterLayout } from './filter.styles';

interface FilterProps {
  value: FilterQueryParams;
  onSubmit: (next: FilterQueryParams) => void;
  onClose?: () => void;
  className: string;
}

const INIT_DATA: FilterQueryParams = {
  address: undefined,
  startsAtGte: undefined,
  hourlyPayGte: undefined,
};

export function normalizeFilter(q: FilterQueryParams): FilterQueryParams {
  return {
    address: q.address && q.address.length > 0 ? q.address : undefined,
    startsAtGte: q.startsAtGte ?? undefined,
    hourlyPayGte: typeof q.hourlyPayGte === 'number' ? q.hourlyPayGte : undefined,
  };
}

const Filter = ({ value, onSubmit, onClose, className }: FilterProps) => {
  const [draft, setDraft] = useState<FilterQueryParams>(value);

  // const handleSubmit = () => onSubmit(draft);

  const handleSubmit = useCallback(() => {
    onSubmit(normalizeFilter(draft));
    onClose?.();
  }, [draft, onSubmit, onClose]);

  const handleReset = useCallback(() => {
    setDraft(INIT_DATA);
    onSubmit(INIT_DATA);
  }, [onSubmit]);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <div className={cn(filterLayout.wrapper(), className)}>
      <FilterHeader onClose={onClose} />
      <FilterBody formData={draft} onChange={setDraft} />
      <FilterFooter onReset={handleReset} onSubmit={handleSubmit} />
    </div>
  );
};
export default Filter;
