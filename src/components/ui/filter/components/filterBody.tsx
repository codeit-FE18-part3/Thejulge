import { filterLayout } from '@/components/ui/filter/filter.styles';
import { Icon } from '@/components/ui/icon';
import { DateInput, Input } from '@/components/ui/input';
import { ADDRESS_CODE } from '@/constants/dropdown';
import { cn } from '@/lib/utils/cn';
import { parseRFC3339 } from '@/lib/utils/dateFormatter';
import { formatNumber } from '@/lib/utils/formatNumber';
import { FilterQuery } from '@/types/api';
import { ChangeEvent, useMemo } from 'react';

interface FilterBodyProps {
  formData: FilterQuery;
  onChange: (updater: (prev: FilterQuery) => FilterQuery) => void;
}

const FilterBody = ({ formData, onChange }: FilterBodyProps) => {
  const startAt = parseRFC3339(formData.startsAtGte);
  const pay = useMemo(
    () => (formData.hourlyPayGte ? formatNumber(formData.hourlyPayGte) : ''),
    [formData.hourlyPayGte]
  );
  const locations = formData.address ?? [];
  const locationList = ADDRESS_CODE;

  const addLocation = (loc: string) => {
    if (locations.includes(loc)) return;
    onChange(prev => ({ ...prev, address: [...locations, loc] }));
  };

  const removeLocation = (loc: string) => {
    const next = locations.filter(v => v !== loc);
    onChange(prev => ({ ...prev, address: next }));
  };

  const handleDateChange = (date: Date | string) => {
    if (typeof date === 'string') return;

    const now = new Date();
    const selected = new Date(date);

    // 선택한 날짜가 오늘이라면, 현재 시각 기준으로 설정 + 60초로 서버 시차문제 방지
    if (
      selected.getFullYear() === now.getFullYear() &&
      selected.getMonth() === now.getMonth() &&
      selected.getDate() === now.getDate()
    ) {
      selected.setHours(now.getHours(), now.getMinutes(), now.getSeconds() + 60, 0);
    } else {
      // 미래 날짜면 00시로
      selected.setHours(0, 0, 0, 0);
    }

    const rfc3339String = selected.toISOString();
    onChange(prev => ({ ...prev, startsAtGte: rfc3339String }));
  };

  const handlePayChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const digits = target.value.replace(/[^0-9]/g, '');
    onChange(prev => ({ ...prev, hourlyPayGte: Number(digits) }));
  };

  return (
    <ul className={filterLayout.body()}>
      <li>
        <p className='mb-2 text-base'>위치</p>
        <ul className={filterLayout.locationWrapper()}>
          {locationList.map(value => (
            <li key={value} className='w-full mobile:w-[calc(50%-6px)]'>
              <button
                type='button'
                className={cn(filterLayout.location(), locations.includes(value) && 'text-red-400')}
                onClick={() => addLocation(value)}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
        {locations.length !== 0 && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {locations.map(value => (
              <button
                key={value}
                type='button'
                className={filterLayout.locationSelected()}
                onClick={() => removeLocation(value)}
              >
                <span className='text-inherit'>{value}</span>
                <Icon iconName='close' iconSize='sm' className='bg-red-500' />
              </button>
            ))}
          </div>
        )}
      </li>
      <li>
        <DateInput
          id='filterStartAt'
          label='시작일'
          className='gap-2'
          value={startAt}
          onChange={handleDateChange}
        />
      </li>
      <li className='flex items-end gap-3'>
        <Input
          id='filterPay'
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          label='금액'
          placeholder='0'
          suffix='원'
          className='gap-2'
          value={pay}
          onChange={handlePayChange}
        />
        <p className='whitespace-nowrap pb-4'>이상부터</p>
      </li>
    </ul>
  );
};
export default FilterBody;
