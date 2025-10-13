import { MonthViewProps } from '@/types/calendar';

export default function MonthViewMode({ onSelect: onSelectMonth }: MonthViewProps) {
  return (
    <div className='grid grid-cols-4 gap-2 text-center'>
      {Array.from({ length: 12 }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelectMonth(i)}
          className='aspect-square rounded-lg py-2 hover:bg-blue-100'
        >
          {i + 1}월
        </button>
      ))}
    </div>
  );
}
