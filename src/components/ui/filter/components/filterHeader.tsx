import { filterLayout } from '@/components/ui/filter/filter.styles';
import { Icon } from '@/components/ui/icon';

const FilterHeader = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className={filterLayout.header()}>
      <div className='text-heading-s font-bold'>상세 필터</div>
      <button type='button' className='icon-btn' onClick={onClose} aria-label='상세 필터 닫기'>
        <Icon iconName='close' decorative />
      </button>
    </div>
  );
};

export default FilterHeader;
