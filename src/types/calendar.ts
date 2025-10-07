export type SelectMode = 'day' | 'month' | 'year';

export interface CalendarProps {
  value?: Date;
  onSelect?: (date: Date) => void;
}

export interface CalendarHeaderProps {
  selectMode: SelectMode;
  currentMonth: Date;
  onToggleMode: () => void;
  onChange: (offset: number) => void;
}

export interface DayViewProps {
  currentMonth: Date;
  currentDay: Date;
  onSelect: (date: Date) => void;
}

export interface MonthViewProps {
  onSelect: (month: number) => void;
}

export interface YearViewProps {
  currentMonth: Date;
  onSelect: (year: number) => void;
}
