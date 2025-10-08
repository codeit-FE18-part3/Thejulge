import { fillCalendarDays } from '@/lib/utils/fillCalendarDays';
import { DayViewProps } from '@/types/calendar';

export default function DayViewMode({ currentMonth, currentDay, onSelect }: DayViewProps) {
  const DAYS = fillCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth());
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <div className='text-md mb-3 grid grid-cols-7 text-center font-medium text-gray-500'>
        {WEEKDAYS.map((day, i) => {
          const headerClass = i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-200' : '';

          return (
            <div key={day} className={headerClass}>
              {day}
            </div>
          );
        })}
      </div>

      <div className='text-md grid grid-cols-7 gap-1 text-center'>
        {DAYS.map((day, i) => {
          const isSelected = day.date.toDateString() === currentDay.toDateString();
          const dayOfWeek = day.date.getDay();
          const dayClass =
            day.isCurrentMonth && dayOfWeek === 0
              ? 'text-red-400'
              : day.isCurrentMonth && dayOfWeek === 6
                ? 'text-blue-200'
                : '';

          return (
            <button
              key={i}
              onClick={() => onSelect(day.date)}
              className={`rounded-lg py-1.5 transition ${
                isSelected ? 'bg-blue-200 font-semibold text-white' : 'hover:bg-blue-100'
              } ${dayClass} ${day.isCurrentMonth ? '' : 'text-gray-400'}`}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );
}
