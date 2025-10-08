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

  const handleSelectPeriod = (p: Period) => {
    setCurrentPeriod(p);
    notifySelect(p, currentHour, currentMinute);
  };

  const handleSelectHour = (h: string) => {
    setCurrentHour(h);
    notifySelect(currentPeriod, h, currentMinute);
  };

  const handleSelectMinute = (m: string) => {
    setCurrentMinute(m);
    notifySelect(currentPeriod, currentHour, m);
  };

  return (
    <div className='mt-3 flex w-80 items-center justify-center gap-6 rounded-lg border bg-white p-4'>
      <div className='flex flex-col gap-4 p-2'>
        {['오전', '오후'].map(p => (
          <button
            key={p}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              currentPeriod === p ? 'bg-blue-200 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => handleSelectPeriod(p as Period)}
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
                className={`rounded px-3 py-1 transition ${
                  currentHour === h ? 'bg-blue-200 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSelectHour(h)}
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
                className={`rounded px-3 py-1 transition ${
                  currentMinute === m ? 'bg-blue-200 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSelectMinute(m)}
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
