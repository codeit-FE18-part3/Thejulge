import { Calendar } from '@/components/ui/calendar';
import useClickOutside from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';
import { formatDate, formatWithDots } from '@/lib/utils/dateFormatter';
import { DateInputProps } from '@/types/calendar';
import { useCallback, useEffect, useRef, useState } from 'react';
import Input from './input';

export default function DateInput({
  id = 'date',
  label = '날짜 선택',
  className,
  value,
  onChange,
  requiredMark = false,
  error,
}: DateInputProps) {
  const { isOpen, toggle, setClose } = useToggle(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState(''); // typing 사용
  const [dateError, setDateError] = useState('');

  useClickOutside(wrapperRef, () => {
    if (isOpen) setClose();
  });

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setInputValue(formatDate(value));
    } else {
      setSelectedDate(null);
      setInputValue('');
    }
  }, [value]);

  // 날짜 업데이트 중앙 관리
  const updateDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setInputValue(formatDate(date));
      setClose();
      onChange?.(date);
    },
    [onChange, setClose]
  );

  // 날짜 선택
  const handleDateSelect = useCallback(
    (date: Date) => {
      updateDate(date);
    },
    [updateDate]
  );

  // typing
  const maxDaysList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  const getMaxDay = (year: number, month: number) => {
    if (month === 2 && isLeapYear(year)) return 29;
    return maxDaysList[month - 1];
  };

  const validateDate = (year: number, month: number, day: number) => {
    const maxDay = getMaxDay(year, month);

    if (month < 1 || month > 12 || day < 1 || day > maxDay) {
      return { valid: false, error: '올바른 날짜를 입력하세요.' };
    }

    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      return { valid: false, error: '이전 날짜는 선택할 수 없습니다.' };
    }

    return { valid: true, date: inputDate };
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTypedNumbers = e.target.value.replace(/[^0-9]/g, '');
    const typedLength = newTypedNumbers.length;

    if (typedLength > 8) return;

    setDateError('');
    setInputValue(formatWithDots(newTypedNumbers));

    if (typedLength === 8) {
      const year = parseInt(newTypedNumbers.slice(0, 4));
      const month = parseInt(newTypedNumbers.slice(4, 6));
      const day = parseInt(newTypedNumbers.slice(6, 8));

      const { valid, error, date } = validateDate(year, month, day);

      if (!valid) {
        setDateError(error ?? '');
        return;
      }
      if (date) {
        setDateError('');
        updateDate(date);
      }
    }
  };

  return (
    <div ref={wrapperRef} className='relative max-w-md'>
      <Input
        id={id}
        label={label}
        placeholder={`${formatDate(new Date())}`}
        value={inputValue}
        onClick={toggle}
        onChange={handleDateInputChange}
        requiredMark={requiredMark}
        className={className}
        error={dateError || error}
        autoComplete='off'
      />

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'mt-2 max-h-[700px] opacity-100' : 'max-h-0 opacity-0'} `}
      >
        <Calendar onSelect={handleDateSelect} value={selectedDate ?? new Date()} />
      </div>
    </div>
  );
}
