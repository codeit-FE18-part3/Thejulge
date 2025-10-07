import { Icon } from '@/components/ui/icon';
import { getDaysInMonth } from '@/lib/utils/getDaysInMonth';
import { clsx } from 'clsx';
import { useState } from 'react';

interface CalendarProps {
  value?: Date;
  onSelect?: (date: Date) => void;
}

export default function Calendar({ value, onSelect }: CalendarProps) {
  const [selected, setSelected] = useState<Date>(value ?? new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(value ?? new Date());

  const handleSelect = (date: Date) => {
    setSelected(date);
    onSelect?.(date);
  };

  const handleMonthChange = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  const handleToday = () => {
    const TODAY = new Date();
    setCurrentMonth(TODAY);
    setSelected(TODAY);
    onSelect?.(TODAY);
  };

  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const monthLabel = currentMonth.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });

  const CALENDAR_MONTH_ARROW = clsx('rounded px-1 pt-1 hover:bg-gray-100');

  return (
    <div className='mt-3 w-80 rounded-xl border bg-white p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <button onClick={() => handleMonthChange(-1)} className={CALENDAR_MONTH_ARROW}>
          <Icon iconName='chevronLeft' iconSize='md' ariaLabel='지난 달로 이동' />
        </button>
        <div className='text-lg font-semibold'>{monthLabel}</div>
        <button onClick={() => handleMonthChange(1)} className={CALENDAR_MONTH_ARROW}>
          <Icon iconName='chevronRight' iconSize='md' ariaLabel='다음 달로 이동' />
        </button>
      </div>
      <div className='text-md mb-3 grid grid-cols-7 text-center font-medium text-gray-500'>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className='text-md grid grid-cols-7 gap-1 text-center'>
        {days.map((date, i) => {
          if (!date) return <div key={i}></div>;
          const isSelected = date.toDateString() === selected.toDateString();

          return (
            <button
              key={i}
              onClick={() => handleSelect(date)}
              className={`rounded-lg py-1.5 transition ${isSelected ? 'bg-blue-200 font-semibold text-white' : 'hover:bg-blue-100'}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <div className='mt-3 text-right'>
        <button onClick={handleToday} className='text-sm text-blue-200 hover:underline'>
          오늘로 이동
        </button>
      </div>
    </div>
  );
}
