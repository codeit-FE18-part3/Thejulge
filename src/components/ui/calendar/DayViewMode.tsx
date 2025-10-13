import { cn } from '@/lib/utils/cn';
import { fillCalendarDays } from '@/lib/utils/fillCalendarDays';
import { DayViewProps } from '@/types/calendar';
import { clsx } from 'clsx';

export default function DayViewMode({ currentMonth, currentDay, onSelect }: DayViewProps) {
  const DAYS = fillCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth());
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

  const TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);

  const DAY_CALENDAR_CLASS = clsx('text-md grid grid-cols-7 text-center');

  return (
    <>
      <div className={`${DAY_CALENDAR_CLASS} mb-3 pt-2 font-medium text-gray-500`}>
        {WEEKDAYS.map((day, i) => {
          const headerClass = i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-200' : '';

          return (
            <div key={day} className={headerClass}>
              {day}
            </div>
          );
        })}
      </div>

      <div className={`${DAY_CALENDAR_CLASS} min-h-[300px] gap-1`}>
        {DAYS.map((dayObj, i) => {
          const { date, isCurrentMonth } = dayObj;

          const isDisabled = date < TODAY;
          const isSelected = date.toDateString() === currentDay.toDateString();
          const dayOfWeek = date.getDay();

          const DAY_CELL_CLASS = isDisabled
            ? 'text-gray-500'
            : !isSelected && isCurrentMonth && dayOfWeek === 0
              ? 'text-red-400'
              : !isSelected && isCurrentMonth && dayOfWeek === 6
                ? 'text-blue-200'
                : '';

          return (
            <button
              key={i}
              onClick={() => !isDisabled && onSelect(date)}
              disabled={isDisabled}
              className={cn(
                'h-[3rem] w-[3rem] rounded-lg transition',
                isSelected
                  ? 'bg-blue-200 font-semibold text-white'
                  : !isDisabled
                    ? 'hover:bg-blue-100'
                    : '',
                DAY_CELL_CLASS,
                !isDisabled && !isCurrentMonth && 'text-gray-400'
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );
}
