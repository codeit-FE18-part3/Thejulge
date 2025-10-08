import { Calendar } from '@/components/ui/calendar';
import TimeCalendar from '@/components/ui/calendar/TimeCalendar';
import { formatDateTime, parsedDateTime } from '@/lib/utils/timeFormatter';
import { useState } from 'react';
import Input from './input';

export default function DateTimeInput() {
  const [open, setOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState('');

  const updateDateTime = (date: Date) => {
    setSelectedDateTime(date);
    setInputValue(formatDateTime(date));
  };

  const handleDateSelect = (date: Date) => {
    const baseDateTime = selectedDateTime ?? new Date();
    const newDateTime = new Date(date);
    newDateTime.setHours(baseDateTime.getHours(), baseDateTime.getMinutes());
    updateDateTime(newDateTime);
  };

  const handleTimeSelect = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return;

    const baseDateTime = selectedDateTime ?? new Date();
    const newDateTime = new Date(baseDateTime);

    newDateTime.setHours(hours, minutes);
    updateDateTime(newDateTime);
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const parsed = parsedDateTime(value);
    if (parsed) setSelectedDateTime(parsed);
  };

  const getTimeValue = (): string =>
    selectedDateTime
      ? `${String(selectedDateTime.getHours()).padStart(2, '0')}:${String(selectedDateTime.getMinutes()).padStart(2, '0')}`
      : '';

  return (
    <div className='relative w-full'>
      <Input
        id='datetime'
        label='날짜 및 시간 선택'
        placeholder='2025-01-01 18:00'
        value={inputValue}
        onClick={() => setOpen(prev => !prev)}
        onChange={handleDateTimeChange}
      />

      {open && (
        <div>
          <Calendar onSelect={handleDateSelect} value={selectedDateTime ?? new Date()} />
          <div className='mt-2'>
            <TimeCalendar value={getTimeValue()} onChange={handleTimeSelect} />
          </div>
        </div>
      )}
    </div>
  );
}
