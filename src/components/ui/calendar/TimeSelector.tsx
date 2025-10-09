import { cn } from '@/lib/utils/cn';
import { Period, TimeSelectorProps } from '@/types/calendar';
import { useState } from 'react';
import { ScrollList } from './TimeSelector.styles';

export default function TimeSelector({ onSelect, period, hours, minutes }: TimeSelectorProps) {
  const [currentPeriod, setCurrentPeriod] = useState<Period>(period);
  const [currentHour, setCurrentHour] = useState(hours);
  const [currentMinute, setCurrentMinute] = useState(minutes);

  // 01 ~ 12
  const hoursList = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  // 00 ~ 59
  const minutesList = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const notifySelect = (p: Period, h: string, m: string) => {
    onSelect?.(`${p} ${h}:${m}`);
  };

  const handleSelect = (type: 'period' | 'hour' | 'minute', value: string) => {
    const updates = {
      period: () => setCurrentPeriod(value as Period),
      hour: () => setCurrentHour(value),
      minute: () => setCurrentMinute(value),
    };

    updates[type]();

    notifySelect(
      type === 'period' ? (value as Period) : currentPeriod,
      type === 'hour' ? value : currentHour,
      type === 'minute' ? value : currentMinute
    );
  };

  const TIME_SELECTOR_WRAPPER_CLASS =
    'mt-3 flex w-80 items-center justify-center gap-6 rounded-lg border bg-white p-4';

  const BASE_PERIOD_CLASS = 'rounded-lg px-4 py-2 font-semibold transition';
  const BASE_TIME_CLASS = 'rounded px-3 py-1 transition';

  const selectPeriodClass = (p: Period) =>
    cn(
      BASE_PERIOD_CLASS,
      currentPeriod === p ? 'bg-blue-200 text-white' : 'bg-gray-100 hover:bg-gray-200'
    );

  const selectTimeClass = (value: string, currentValue: string) =>
    cn(BASE_TIME_CLASS, currentValue === value ? 'bg-blue-200 text-white' : 'hover:bg-gray-100');

  return (
    <div className={TIME_SELECTOR_WRAPPER_CLASS}>
      <div className='flex flex-col gap-4 p-2'>
        {['오전', '오후'].map(p => (
          <button
            key={p}
            className={selectPeriodClass(p as Period)}
            onClick={() => handleSelect('period', p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className='flex gap-4'>
        <div>
          <ScrollList>
            {hoursList.map(h => (
              <button
                key={h}
                className={selectTimeClass(h, currentHour)}
                onClick={() => handleSelect('hour', h)}
              >
                {h}
              </button>
            ))}
          </ScrollList>
        </div>

        <div>
          <ScrollList>
            {minutesList.map(m => (
              <button
                key={m}
                className={selectTimeClass(m, currentMinute)}
                onClick={() => handleSelect('minute', m)}
              >
                {m}
              </button>
            ))}
          </ScrollList>
        </div>
      </div>
    </div>
  );
}
