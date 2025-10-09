import {
  CalendarHeader,
  DayViewMode,
  MonthViewMode,
  YearViewMode,
} from '@/components/ui/calendar/';
import { CalendarProps, SelectMode } from '@/types/calendar';
import { useState } from 'react';

export default function Calendar({ value, onSelect }: CalendarProps) {
  const [currentDay, setCurrentDay] = useState<Date>(value ?? new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(value ?? new Date());
  const [selectMode, setSelectMode] = useState<SelectMode>('day');

  const TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);

  const handleSelect = (date: Date) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < TODAY) {
      return;
    }
    setCurrentDay(date);
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    onSelect?.(date);
  };

  // day 한 달 단위, year 10년 단위, month 1년 단위
  const onChange = (offset: number) => {
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
    setSelectMode('day');
    onSelect?.(TODAY);
  };

  // 모드 전환
  const onToggleMode = () => {
    setSelectMode(prev => (prev === 'day' ? 'month' : prev === 'month' ? 'year' : 'day'));
  };

  return (
    <div className='mt-3 w-80 rounded-xl border bg-white p-4'>
      <CalendarHeader
        selectMode={selectMode}
        currentMonth={currentMonth}
        onToggleMode={onToggleMode}
        onChange={onChange}
      />

      {selectMode === 'day' && (
        <DayViewMode currentMonth={currentMonth} currentDay={currentDay} onSelect={handleSelect} />
      )}

      {selectMode === 'month' && (
        <MonthViewMode
          onSelect={month => {
            setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
            setSelectMode('day');
          }}
        />
      )}

      {selectMode === 'year' && (
        <YearViewMode
          currentMonth={currentMonth}
          onSelect={year => {
            setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
            setSelectMode('month');
          }}
        />
      )}

      <div className='mt-3 text-right'>
        <button onClick={handleToday} className='text-sm text-blue-200 hover:underline'>
          오늘로 이동
        </button>
      </div>
    </div>
  );
}
