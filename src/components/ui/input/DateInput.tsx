import { Calendar } from '@/components/ui/calendar';
import useClickOutside from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';
import { formatDate, formatWithDots } from '@/lib/utils/dateFormatter';
import { useCallback, useRef, useState } from 'react';
import Input from './input';

export default function DateInput() {
  const { value: open, toggle, setClose } = useToggle(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState(''); // typing 사용

  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    if (open) setClose();
  });

  // 날짜 업데이트 중앙 관리
  const updateDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setInputValue(formatDate(date));
  }, []);

  // 날짜 선택
  const handleDateSelect = useCallback(
    (date: Date) => {
      updateDate(date);
    },
    [updateDate]
  );

  // typing
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTypedNumbers = e.target.value.replace(/[^0-9]/g, '');
    const typedLength = newTypedNumbers.length;

    if (typedLength > 8) return;

    const year = parseInt(newTypedNumbers.slice(0, 4));
    const month = parseInt(newTypedNumbers.slice(4, 6));
    const day = parseInt(newTypedNumbers.slice(6, 8));

    if (typedLength === 8) {
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (inputDate < today) return;
    }

    const maxDaysList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const maxDay = month === 2 && isLeapYear ? 29 : maxDaysList[month - 1];

    if (typedLength >= 8) {
      if (day > 0 && day <= maxDay) {
        setInputValue(formatWithDots(newTypedNumbers));
      } else {
        setInputValue(formatWithDots(newTypedNumbers.slice(0, 7)));
      }
      return;
    }

    if (typedLength >= 7) {
      if (month === 2 && parseInt(formatWithDots(newTypedNumbers[6])) > 2) {
        setInputValue(formatWithDots(newTypedNumbers.slice(0, 6)));
        return;
      }
    }

    if (typedLength >= 6) {
      if (month > 0 && month < 13) {
        setInputValue(formatWithDots(newTypedNumbers));
      } else {
        setInputValue(formatWithDots(newTypedNumbers.slice(0, 5)));
      }
      return;
    }

    setInputValue(formatWithDots(newTypedNumbers));
  };

  return (
    <div ref={wrapperRef} className='relative w-full'>
      <Input
        id='date'
        label='날짜 선택'
        placeholder={`${formatDate(new Date())}`}
        value={inputValue}
        onClick={toggle}
        onChange={handleDateInputChange}
      />

      {open && (
        <div className='absolute'>
          <Calendar onSelect={handleDateSelect} value={selectedDate ?? new Date()} />
        </div>
      )}
    </div>
  );
}
