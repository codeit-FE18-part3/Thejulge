import TimeSelector from '@/components/ui/calendar/TimeSelector';
import useClickOutside from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';
import { formatTime } from '@/lib/utils/dateFormatter';
import { Period, TimeValue } from '@/types/calendar';
import { useCallback, useEffect, useRef, useState } from 'react';
import Input from './input';

interface TimeInputProps {
  label?: string;
  requiredMark?: boolean;
  value?: TimeValue | null;
  onChange?: (value: TimeValue | null) => void;
}

export default function TimeInput({
  label = '시간 선택',
  requiredMark = false,
  value,
  onChange,
}: TimeInputProps) {
  const { isOpen, toggle, setClose } = useToggle(false);
  const [selectedTime, setSelectedTime] = useState<TimeValue | null>(null);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    if (isOpen) setClose();
  });

  const updateTime = useCallback(
    (date: Date, period: Period) => {
      const newTime: TimeValue = { date, period };
      setSelectedTime(newTime);
      setInputValue(formatTime(date));
      onChange?.(newTime);
    },
    [onChange]
  );

  useEffect(() => {
    if (value) {
      setSelectedTime(value);
      setInputValue(formatTime(value.date));
    } else {
      setSelectedTime(null);
      setInputValue('');
    }
  }, [value]);

  const handleTimeSelect = useCallback(
    (timeString: string) => {
      const parts: string[] = timeString.split(' ');
      const period: Period = parts.length === 2 ? (parts[0] as Period) : '오전';
      const [hoursStr, minutesStr] = parts[1].split(':');
      const hours = Number(hoursStr);
      const minutes = Number(minutesStr);
      if (isNaN(hours) || isNaN(minutes)) return;

      const baseDate: Date = selectedTime?.date ?? new Date();
      const date = new Date(baseDate);
      const hours24 =
        period === '오후' && hours !== 12
          ? hours + 12
          : period === '오전' && hours === 12
            ? 0
            : hours;
      date.setHours(hours24, minutes);

      updateTime(date, period);
    },
    [selectedTime, updateTime]
  );

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly: string = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(digitsOnly);

    if (digitsOnly.length < 3) return;

    const hoursNum: number = parseInt(digitsOnly.slice(0, digitsOnly.length - 2), 10);
    const minutesNum: number = parseInt(digitsOnly.slice(-2), 10);

    if (isNaN(hoursNum) || isNaN(minutesNum)) return;
    if (!(hoursNum >= 1 && hoursNum <= 12 && minutesNum >= 0 && minutesNum < 60)) return;

    const period: Period = selectedTime?.period ?? (hoursNum >= 12 ? '오후' : '오전');

    const baseDate: Date = selectedTime?.date ?? new Date();
    const date = new Date(baseDate);
    const hours24 =
      period === '오후' && hoursNum !== 12
        ? hoursNum + 12
        : period === '오전' && hoursNum === 12
          ? 0
          : hoursNum;
    date.setHours(hours24, minutesNum);

    updateTime(date, period);
  };

  const hoursDisplay: string = selectedTime
    ? String(selectedTime.date.getHours() % 12 || 12).padStart(2, '0')
    : '12';
  const minutesDisplay: string = selectedTime
    ? String(selectedTime.date.getMinutes()).padStart(2, '0')
    : '00';
  const periodDisplay: Period = selectedTime
    ? selectedTime.date.getHours() >= 12
      ? '오후'
      : '오전'
    : '오전';

  return (
    <div ref={wrapperRef} className='relative'>
      <Input
        value={inputValue ? `${periodDisplay} ${hoursDisplay}:${minutesDisplay}` : ''}
        label={label}
        requiredMark={requiredMark}
        placeholder='오전 12:30'
        onClick={toggle}
        onChange={handleTimeInputChange}
      />

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'mt-2 max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <TimeSelector
          onSelect={handleTimeSelect}
          period={periodDisplay}
          hours={hoursDisplay}
          minutes={minutesDisplay}
          value={selectedTime ? formatTime(selectedTime.date) : ''}
        />
      </div>
    </div>
  );
}
