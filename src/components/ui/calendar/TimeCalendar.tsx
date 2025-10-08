import { TimeCalendarProps } from '@/types/calendar';

export default function TimeCalendar({ value, onChange }: TimeCalendarProps) {
  return (
    <input
      type='time'
      value={value}
      onChange={e => onChange(e.target.value)}
      className='w-80 rounded-lg border px-2 py-1'
    />
  );
}
