import { Calendar } from '@/components/ui/calendar';
import { formatDate } from '@/lib/utils/timeFormatter';
import { useCallback, useState } from 'react';
import Input from './input';

export default function DateInput() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState(''); // typing 사용

  // 날짜 업데이트 중앙 관리
  const updateDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setInputValue(formatDate(date));
  }, []);

  // 날짜 선택
  const handleDateSelect = useCallback(
    (date: Date) => {
      updateDate(date);
      setInputValue(formatDate(date));
    },
    [updateDate]
  );

  // typing
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='relative w-full'>
      <Input
        id='date'
        label='날짜 선택'
        placeholder='2025.01.01'
        value={inputValue}
        onClick={() => setOpen(prev => !prev)}
        onChange={handleDateInputChange}
      />

      {open && (
        <div>
          <Calendar onSelect={handleDateSelect} value={selectedDate ?? new Date()} />
        </div>
      )}
    </div>
  );
}
