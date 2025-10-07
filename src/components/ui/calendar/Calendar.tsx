import { CalendarProps, SelectMode } from '@/types/calendar';
import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import DayViewMode from './DayViewMode';
import MonthViewMode from './MonthViewMode';

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

  return (
    <div className='mt-3 w-80 rounded-xl border bg-white p-4'>
      <CalendarHeader />
      {selectMode === 'day' && <DayViewMode />}

      {selectMode === 'month' && <MonthViewMode />}

      {selectMode === 'year' && (

      )}

      <div className='mt-3 text-right'>
        <button onClick={handleToday} className='text-sm text-blue-200 hover:underline'>
          오늘로 이동
        </button>
      </div>
    </div>
  );
}
