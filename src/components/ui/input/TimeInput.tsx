import TimeSelector from '@/components/ui/calendar/TimeSelector';
import useClickOutside from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';
import { formatTime } from '@/lib/utils/dateFormatter';
import { Period } from '@/types/calendar';
import { useCallback, useRef, useState } from 'react';
import Input from './input';

export default function TimeInput() {
  const { isOpen, toggle, setClose } = useToggle(false);
  const [period, setPeriod] = useState<Period>('오전');
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState(''); // typing 사용

  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    if (isOpen) setClose();
  });

  // 시간 업데이트 중앙 관리
  const updateTime = useCallback((date: Date, selectedPeriod: Period) => {
    setPeriod(selectedPeriod);
    setSelectedTime(date);
    setInputValue(formatTime(date));
  }, []);

  // 시간 선택
  const handleTimeSelect = useCallback(
    (value: string) => {
      const parts = value.split(' ');
      const periodValue = parts.length === 2 ? (parts[0] as Period) : period;
      const timePart = parts.length === 2 ? parts[1] : parts[0];

      const [hours, minutes] = timePart.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) return;

      const baseDate = selectedTime ?? new Date();
      const newDate = new Date(baseDate);
      newDate.setHours(hours, minutes);

      updateTime(newDate, periodValue);
    },
    [selectedTime, updateTime, period]
  );

  // typing
  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTypedNumbers = e.target.value.replace(/[^0-9]/g, '');
    const typedLength = newTypedNumbers.length;

    setInputValue(newTypedNumbers);

    if (typedLength > 4) {
      const hours = parseInt(newTypedNumbers.slice(0, typedLength - 2));

      if (isNaN(hours) || hours < 1 || hours > 12) {
        setInputValue(newTypedNumbers.slice(-1));
        return;
      }
    }

    if (typedLength < 3) return;

    const hoursTyped = newTypedNumbers.slice(0, typedLength - 2);
    const minutesTyped = newTypedNumbers.slice(-2);

    const h = parseInt(hoursTyped);
    const m = parseInt(minutesTyped);

    if (!isNaN(h) && !isNaN(m)) {
      if (!(h >= 1 && h <= 12 && m >= 0 && m < 60)) return;

      const periodValue: Period = h > 12 ? '오후' : '오전';

      const baseDate = selectedTime ?? new Date();
      const newDate = new Date(baseDate);
      newDate.setHours(h, m);

      updateTime(newDate, periodValue);
    }
  };

  const hours = selectedTime ? String(selectedTime.getHours() % 12 || 12).padStart(2, '0') : '12';
  const minutes = selectedTime ? String(selectedTime.getMinutes()).padStart(2, '0') : '00';

  return (
    <div ref={wrapperRef} className='relative max-w-md'>
      <Input
        value={inputValue ? `${period} ${inputValue}` : ''}
        label='시간 선택'
        placeholder='오전 12:30'
        onClick={toggle}
        onChange={handleTimeInputChange}
      />

      {isOpen && (
        <div className='z-1 absolute'>
          <TimeSelector
            onSelect={handleTimeSelect}
            period={period}
            hours={hours}
            minutes={minutes}
            value={selectedTime ? formatTime(selectedTime) : ''}
          />
        </div>
      )}
    </div>
  );
}
