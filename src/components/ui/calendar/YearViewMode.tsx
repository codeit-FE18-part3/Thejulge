import { YearViewProps } from '@/types/calendar';

export default function YearViewMode({ currentMonth, onSelect }: YearViewProps) {
  const START_YEAR = Math.floor(currentMonth.getFullYear() / 10) * 10;

  return (
    <div className='grid max-h-[340px] grid-cols-2 justify-items-center gap-6 text-center'>
      {Array.from({ length: 10 }).map((_, i) => {
        const YEAR = START_YEAR + i;
        return (
          <button
            key={YEAR}
            onClick={() => onSelect(YEAR)}
            className='h-[3rem] w-[5rem] rounded-lg py-2 hover:bg-blue-100'
          >
            {YEAR}
          </button>
        );
      })}
    </div>
  );
}
