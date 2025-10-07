import { Icon } from '@/components/ui/icon';
import { CalendarHeaderProps } from '@/types/calendar';
import { clsx } from 'clsx';

export default function CalendarHeader({
  selectMode,
  currentMonth,
  onToggleMode,
  onChange,
}: CalendarHeaderProps) {
  const CALENDAR_MONTH_ARROW = clsx('rounded px-1 pt-1 hover:bg-gray-100');

  const headerLabel = currentMonth.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });

  const START_YEAR = Math.floor(currentMonth.getFullYear() / 10) * 10;
  const END_YEAR = START_YEAR + 9;
  const YEAR_RANGE = `${START_YEAR} - ${END_YEAR}`;

  return (
    <div className='mb-3 flex items-center justify-between'>
      <button onClick={() => onChange(-1)} className={CALENDAR_MONTH_ARROW}>
        <Icon iconName='chevronLeft' iconSize='md' ariaLabel='이전으로 이동' />
      </button>

      <button onClick={onToggleMode} className='text-lg font-semibold hover:underline'>
        {selectMode === 'day' && headerLabel}
        {selectMode === 'month' && `${currentMonth.getFullYear()}년`}
        {selectMode === 'year' && `${YEAR_RANGE}`}
      </button>

      <button onClick={() => onChange(1)} className={CALENDAR_MONTH_ARROW}>
        <Icon iconName='chevronRight' iconSize='md' ariaLabel='다음으로 이동' />
      </button>
    </div>
  );
}
