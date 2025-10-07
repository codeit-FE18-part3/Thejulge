interface MonthViewProps {
  onSelect: (month: number) => void;
}

export default function MonthViewMode({ onSelect }: MonthViewProps) {
  return (
    <div className='grid grid-cols-3 gap-2 text-center'>
      {Array.from({ length: 12 }).map((_, i) => (
        <button key={i} onClick={() => onSelect(i)} className='rounded-lg py-2 hover:bg-blue-100'>
          {i + 1}월
        </button>
      ))}
    </div>
  );
}
