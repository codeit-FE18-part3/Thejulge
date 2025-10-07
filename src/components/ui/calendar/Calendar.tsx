import { getDaysInMonth } from '@/lib/utils/getDaysInMonth';
import { CalendarProps, SelectMode } from '@/types/calendar';
import { useState } from 'react';
import CalendarHeader from './CalendarHeader';

export default function Calendar({ value, onSelect }: CalendarProps) {
  const [currendDay, setCurrentDay] = useState<Date>(value ?? new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(value ?? new Date());
  const [selectMode, setSelectMode] = useState<SelectMode>('day');

  const TODAY = new Date();

  const handleSelect = (date: Date) => {
    setCurrentDay(date);
    onSelect?.(date);
  };

  // day 한 달 단위, year 10년 단위, month 1년 단위
  const handleChange = (offset: number) => {
    if (selectMode === 'day') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
    } else if (selectMode === 'year') {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() + offset * 10, currentMonth.getMonth(), 1)
      );
    } else {
      setCurrentMonth(new Date(currentMonth.getFullYear() + offset, currentMonth.getMonth(), 1));
    }
  };

  // 오늘로 이동
  const handleToday = () => {
    setCurrentMonth(TODAY);
    setCurrentDay(TODAY);
    onSelect?.(TODAY);
    setSelectMode('day');
  };

  // 모드 전환
  const toggleSelectMode = () => {
    setSelectMode(prev => (prev === 'day' ? 'month' : prev === 'month' ? 'year' : 'day'));
  };

  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  return (
    <div className='mt-3 w-80 rounded-xl border bg-white p-4'>
      <CalendarHeader />
      {selectMode === 'day' && (
        <>
          <div className='text-md mb-3 grid grid-cols-7 text-center font-medium text-gray-500'>
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className='text-md grid grid-cols-7 gap-1 text-center'>
            {days.map((date, i) => {
              if (!date) return <div key={i}></div>;
              const isSelected = date.toDateString() === currendDay.toDateString();
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(date)}
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
      )}

      {selectMode === 'month' && (
        <div className='grid grid-cols-3 gap-2 text-center'>
          {Array.from({ length: 12 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentMonth(new Date(currentMonth.getFullYear(), i, 1));
                setSelectMode('day');
              }}
              className='rounded-lg py-2 hover:bg-blue-100'
            >
              {i + 1}월
            </button>
          ))}
        </div>
      )}

      {selectMode === 'year' && (
        <div className='grid grid-cols-3 gap-2 text-center'>
          {Array.from({ length: 10 }).map((_, i) => {
            const startYear = Math.floor(currentMonth.getFullYear() / 10) * 10;
            const year = startYear + i;
            return (
              <button
                key={year}
                onClick={() => {
                  setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
                  setSelectMode('month');
                }}
                className='rounded-lg py-2 hover:bg-blue-100'
              >
                {year}
              </button>
            );
          })}
        </div>
      )}

      <div className='mt-3 text-right'>
        <button onClick={handleToday} className='text-sm text-blue-200 hover:underline'>
          오늘로 이동
        </button>
      </div>
    </div>
  );
}
