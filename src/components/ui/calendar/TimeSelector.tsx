import { Period, TimeSelectorProps } from '@/types/calendar';
import { useState } from 'react';
import { ScrollList } from './TimeSelector.styles';

export default function TimeSelector({ onSelect }: TimeSelectorProps) {
  const [currentPeriod, setCurrentPeriod] = useState<Period>('오전');
  const [currentHour, setCurrentHour] = useState('01');
  const [currentMinute, setCurrentMinute] = useState('00');

  // 01 ~ 12
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  // 00 ~ 59
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleSelect = (p: Period, h: string, m: string) => {
    setCurrentPeriod(p);
    setCurrentHour(h);
    setCurrentMinute(m);

    if (onSelect) {
      onSelect(`${p} ${h}:${m}`);
    }
  };

  return (
    <div className='mt-3 flex w-80 items-center justify-center gap-6 rounded-lg border bg-white p-4'>
      <div className='flex flex-col gap-2 rounded border p-2'>
        {['오전', '오후'].map(p => (
          <button
            key={p}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              currentPeriod === p ? 'bg-blue-200 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => handleSelect(p as Period, currentHour, currentMinute)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className='flex gap-4'>
        <div>
          <ScrollList>
            {hours.map(h => (
              <button
                key={h}
                className={`rounded px-3 py-1 transition ${
                  currentHour === h ? 'bg-blue-200 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSelect(currentPeriod, h, currentMinute)}
              >
                {h}
              </button>
            ))}
          </ScrollList>
        </div>

        <div>
          <ScrollList>
            {minutes.map(m => (
              <button
                key={m}
                className={`rounded px-3 py-1 transition ${
                  currentMinute === m ? 'bg-blue-200 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSelect(currentPeriod, currentHour, m)}
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
