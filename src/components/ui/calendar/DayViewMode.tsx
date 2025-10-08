import { fillCalendarDays } from '@/lib/utils/fillCalendarDays';
import { DayViewProps } from '@/types/calendar';

export default function DayViewMode({ currentMonth, currentDay, onSelect }: DayViewProps) {
  const DAYS = fillCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth());
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <div className='text-md mb-3 grid grid-cols-7 text-center font-medium text-gray-500'>
        {WEEKDAYS.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className='text-md grid grid-cols-7 gap-1 text-center'>
        {DAYS.map((date, i) => {
          if (!date) return <div key={i}></div>;
          const isSelected = date.toDateString() === currentDay.toDateString();
          return (
            <button
              key={i}
              onClick={() => onSelect(date)}
              className={`rounded-lg py-1.5 transition ${
                isSelected ? 'bg-blue-200 font-semibold text-white' : 'hover:bg-blue-100'
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );
}
