import { filterLayout } from '@/components/ui/filter/filter.styles';
import { Icon } from '@/components/ui/icon';

interface FilterHeaderProps {
  onClose?: () => void;
  activeCount?: number;
}

const FilterHeader = ({ onClose, activeCount = 0 }: FilterHeaderProps) => {
  return (
    <div className={filterLayout.header()}>
      <div className='text-heading-s font-bold'>
        상세 필터{activeCount > 0 && <>({activeCount})</>}
      </div>
      <button type='button' className='icon-btn' onClick={onClose} aria-label='상세 필터 닫기'>
        <Icon iconName='close' decorative />
      </button>
    </div>
  );
};

export default FilterHeader;
