export interface CalendarProps {
  value?: Date;
  onSelect?: (date: Date) => void;
}

export type SelectMode = 'day' | 'month' | 'year';
