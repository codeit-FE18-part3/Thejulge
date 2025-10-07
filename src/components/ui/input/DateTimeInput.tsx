import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import Input from './input';

export default function DateTimeInput() {
  const [open, setOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState('');

  const parseDateTime = (value: string): Date | null => {
    const date = new Date(value.replace(' ', 'T'));
    return isNaN(date.getTime()) ? null : date;
  };

  const formatDateTime = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  const updateDateTime = (date: Date) => {
    setSelectedDateTime(date);
    setInputValue(formatDateTime(date));
  };

  const handleDateSelect = (date: Date) => {
    const baseTime = selectedDateTime ?? new Date();
    const newDateTime = new Date(date);
    newDateTime.setHours(baseTime.getHours(), baseTime.getMinutes());
    updateDateTime(newDateTime);
  };

  const handleTimeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const baseTime = selectedDateTime ?? new Date();
    const newDateTime = new Date(baseTime);
    newDateTime.setHours(hours, minutes);
    updateDateTime(newDateTime);
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 4) value = value.slice(0, 4) + '-' + value.slice(4);
    if (value.length > 7) value = value.slice(0, 7) + '-' + value.slice(7);
    if (value.length > 10) value = value.slice(0, 10) + ' ' + value.slice(10);
    if (value.length > 13) value = value.slice(0, 13) + ':' + value.slice(13);
    if (value.length > 16) value = value.slice(0, 16);

    setInputValue(value);

    const parsed = parseDateTime(value);
    if (parsed) setSelectedDateTime(parsed);
  };

  return (
    <div>
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
          <div>
            <input
              type='time'
              onChange={handleTimeSelect}
              value={selectedDateTime ? selectedDateTime.toTimeString().slice(0, 5) : ''}
            />
          </div>
        </div>
      )}
    </div>
  );
}
