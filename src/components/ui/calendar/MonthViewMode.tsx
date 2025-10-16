import { MonthViewProps } from '@/types/calendar';

export default function MonthViewMode({ onSelect: onSelectMonth }: MonthViewProps) {
  return (
    <div className='grid max-h-[340px] grid-cols-2 justify-items-center gap-2.5 text-center'>
      {Array.from({ length: 12 }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelectMonth(i)}
          className='h-[3rem] w-[4rem] rounded-lg hover:bg-blue-100'
        >
          {i + 1}월
        </button>
      ))}
    </div>
  );
}
