import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ADDRESS_CODE } from '@/constants/dropdown';
import { cn } from '@/lib/utils/cn';
import { formatNumber } from '@/lib/utils/formatNumber';
import { ChangeEvent, useEffect, useState } from 'react';

const FILTER_STYLES = {
  position: 'bg-background w-full',
  stickyContent: 'sticky left-0 flex border-gray-200',
  wrapper:
    'fixed z-10 h-dvh overflow-hidden rounded-xl border border-gray-200 min-[480px]:absolute min-[480px]:h-fit min-[480px]:w-[390px]',
  padding: 'px-3 tablet:px-5',
  header: 'top-0 items-center justify-between border-b pb-3 pt-6',
  body: 'scroll-bar h-[calc(100dvh-94px)] py-3 min-[480px]:max-h-[calc(660px)]',
  footer: 'bottom-0 gap-2 border-t pb-6 pt-3',
  filterGap: 'flex flex-col gap-6',
  locationWrapper:
    'scroll-bar flex h-64 flex-wrap gap-3 rounded-md border border-gray-200 bg-white p-5',
  locationText: 'shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-center text-body-m',
  location: 'w-full hover:bg-red-100 hover:text-red-500 mobile:w-[calc(50%-6px)]',
  locationSelected: 'flex items-center gap-2 bg-red-100 font-bold text-red-500',
} as const;

const FilterHeader = () => (
  <div className='flex items-center justify-between'>
    <div className='text-heading-s font-bold'>상세 필터</div>
    <button type='button'>
      <Icon iconName='close' />
    </button>
  </div>
);
const FilterFooter = () => (
  <div className='absolute bottom-0 left-0 flex w-full gap-2 border border-t border-gray-200 px-3 py-4'>
    <Button variant='secondary' className='shrink-0'>
      초기화
    </Button>
    <Button full>적용하기</Button>
  </div>
);
const FilterBody = () => {
  const [startAt, setStartAt] = useState('');
  const [payText, setPayText] = useState('');
  const [pay, setPay] = useState<number | undefined>(undefined);

  const handlePayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/[^0-9]/g, '');

    if (!digits) {
      setPayText('');
      setPay(undefined);
      return;
    }

    const n = Number(digits);
    setPay(n);
    setPayText(formatNumber(n));
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartAt(e.target.value);
  };
  return (
    <>
      <div>
        <p className='label'>위치</p>
      </div>
      <hr />
      <div>
        <Input
          id='filterStartAt'
          type='date'
          label='시작일'
          className='gap-2'
          value={startAt}
          onChange={handleDateChange}
        />
      </div>
      <hr />
      <div>
        <Input
          id='filterPay'
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          label='금액'
          placeholder='시급을 입력해주세요'
          suffix='원'
          className='gap-2'
          value={payText}
          onChange={handlePayChange}
        />
      </div>
    </>
  );
};

const Filter = ({ className = '' }) => {
  const [selectedLocation, setSelectedLocation] = useState<string[]>([
    'asdf',
    'asdf',
    'asdf',
    'asdf',
    'asdf',
    'asdf',
    'asdf',
    'asdf',
  ]);
  const [filterData, setFilterData] = useState<object | null>();
  const [startAt, setStartAt] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [payText, setPayText] = useState('');
  const [pay, setPay] = useState<number | undefined>(undefined);
  const location = ADDRESS_CODE;
  const handlePayChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const digits = target.value.replace(/[^0-9]/g, '');

    if (!digits) {
      setPayText('');
      setPay(undefined);
      return;
    }

    const n = Number(digits);
    setPay(n);
    setPayText(formatNumber(n));
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartAt(e.target.value);
  };

  const handleDate = (date: Date | null) => setStartDate(date);

  const handleResetData = () => {
    setSelectedLocation([]);
    setStartAt('');
    setPay(undefined);
    setPayText('');
    setFilterData(null);
  };

  useEffect(() => {
    console.log(pay, startDate);
  }, [pay, startAt]);

  return (
    <div className={cn(FILTER_STYLES['position'], FILTER_STYLES['wrapper'], className)}>
      <div
        className={cn(
          FILTER_STYLES['position'],
          FILTER_STYLES['stickyContent'],
          FILTER_STYLES['header'],
          FILTER_STYLES['padding']
        )}
      >
        <div className='text-heading-s font-bold'>상세 필터</div>
        <button type='button' className='icon-btn'>
          <Icon iconName='close' />
        </button>
      </div>
      <div
        className={cn(FILTER_STYLES['filterGap'], FILTER_STYLES['body'], FILTER_STYLES['padding'])}
      >
        <div>
          <p className='mb-2 text-base'>위치</p>
          <ul className={FILTER_STYLES['locationWrapper']}>
            {location.map((value, index) => (
              <li
                key={index}
                className={cn(FILTER_STYLES['location'], FILTER_STYLES['locationText'])}
              >
                <button type='button'>{value}</button>
              </li>
            ))}
          </ul>

          {selectedLocation.length !== 0 && (
            <div className='mt-3 flex flex-wrap gap-2'>
              {selectedLocation.map((value, index) => (
                <button
                  key={`${value}_${index}`}
                  type='button'
                  className={cn(FILTER_STYLES['locationSelected'], FILTER_STYLES['locationText'])}
                >
                  <span className='text-inherit'>{value}</span>
                  <Icon iconName='close' iconSize='sm' className='bg-red-500' />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <Input
            id='filterStartAt'
            type='date'
            label='시작일'
            className='gap-2'
            value={startAt}
            onChange={handleDateChange}
          />
        </div>
        {/* <DateInput
          id='filterStartAt'
          label='시작일'
          className='gap-2'
          value={startDate}
          onChange={handleDate}
        /> */}
        <div>
          <Input
            id='filterPay'
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            label='금액'
            placeholder='시급을 입력해주세요'
            suffix='원'
            className='gap-2'
            value={payText}
            onChange={handlePayChange}
          />
        </div>
      </div>
      <div
        className={cn(
          FILTER_STYLES['position'],
          FILTER_STYLES['stickyContent'],
          FILTER_STYLES['footer'],
          FILTER_STYLES['padding']
        )}
      >
        <Button variant='secondary' className='shrink-0'>
          초기화
        </Button>
        <Button full>적용하기</Button>
      </div>
    </div>
  );
};
export default Filter;
