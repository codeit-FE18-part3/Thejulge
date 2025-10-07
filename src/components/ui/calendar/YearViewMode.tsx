import { YearViewProps } from '@/types/calendar';

export default function YearViewMode({ currentMonth, onSelect }: YearViewProps) {
  const START_YEAR = Math.floor(currentMonth.getFullYear() / 10) * 10;

  return (
    <div className='grid grid-cols-3 gap-2 text-center'>
      {Array.from({ length: 10 }).map((_, i) => {
        const YEAR = START_YEAR + i;
        return (
          <button
            key={YEAR}
            onClick={() => onSelect(YEAR)}
            className='rounded-lg py-2 hover:bg-blue-100'
          >
            {YEAR}
          </button>
        );
      })}
    </div>
  );
}
