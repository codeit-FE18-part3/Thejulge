import TimeSelector from '@/components/ui/calendar/TimeSelector';
import { formatTime } from '@/lib/utils/timeFormatter';
import { Period } from '@/types/calendar';
import { useCallback, useState } from 'react';
import Input from './input';

export default function TimeInput() {
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState<Period>('오전');
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState(''); // typing 사용

  // 시간 업데이트 중앙 관리
  const updateTime = useCallback((date: Date, selectedPeriod: Period) => {
    setPeriod(selectedPeriod);
    setSelectedTime(date);
    setInputValue(formatTime(date));
  }, []);

  // 시간 선택
  const handleTimeSelect = useCallback(
    (value: string) => {
      const [selectedPeriod, time] = value.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) return;

      const baseDate = selectedTime ?? new Date();
      const newDate = new Date(baseDate);

      newDate.setHours(hours, minutes);

      updateTime(newDate, selectedPeriod as Period);
    },
    [selectedTime, updateTime]
  );

  // typing
  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='relative w-full'>
      <Input
        value={inputValue ? `${period} ${inputValue}` : ''}
        label='시간 선택'
        placeholder='오전 12:30'
        onClick={() => setOpen(prev => !prev)}
        onChange={handleTimeInputChange}
      />
      {open && (
        <div>
          <TimeSelector
            onSelect={handleTimeSelect}
            value={selectedTime ? formatTime(selectedTime) : ''}
          />
        </div>
      )}
    </div>
  );
}
