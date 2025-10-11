import { Button } from '@/components/ui/button';
import { filterLayout } from '@/components/ui/filter/filter.styles';

interface FilterFooterProps {
  onReset: () => void;
  onSubmit: () => void;
}
const FilterFooter = ({ onReset, onSubmit }: FilterFooterProps) => {
  return (
    <div className={filterLayout.footer()}>
      <Button type='button' variant='secondary' className='shrink-0' onClick={onReset}>
        초기화
      </Button>
      <Button type='button' full onClick={onSubmit}>
        적용하기
      </Button>
    </div>
  );
};

export default FilterFooter;
