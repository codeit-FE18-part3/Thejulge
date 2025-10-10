import { Icon } from '@/components/ui/icon';
import { CalendarHeaderProps } from '@/types/calendar';
import { clsx } from 'clsx';
import { useMemo } from 'react';

export default function CalendarHeader({
  selectMode,
  currentMonth,
  onToggleMode,
  onChange,
}: CalendarHeaderProps) {
  const CALENDAR_ARROW_CLASS = clsx('rounded px-1 pt-1 hover:bg-gray-100');

  const headerLabel = useMemo(() => {
    switch (selectMode) {
      case 'day':
        return currentMonth.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
        });
      case 'month':
        return `${currentMonth.getFullYear()}년`;
      case 'year': {
        const startYear = Math.floor(currentMonth.getFullYear() / 10) * 10;
        const endYear = startYear + 9;
        return `${startYear} - ${endYear}`;
      }
      default:
        return '  ';
    }
  }, [selectMode, currentMonth]);

  return (
    <div className='mb-3 flex items-center justify-between'>
      <button onClick={() => onChange(-1)} className={CALENDAR_ARROW_CLASS}>
        <Icon iconName='chevronLeft' iconSize='md' ariaLabel='이전으로 이동' />
      </button>

      <button onClick={onToggleMode} className='text-lg font-semibold hover:underline'>
        {headerLabel}
      </button>

      <button onClick={() => onChange(1)} className={CALENDAR_ARROW_CLASS}>
        <Icon iconName='chevronRight' iconSize='md' ariaLabel='다음으로 이동' />
      </button>
    </div>
  );
}
