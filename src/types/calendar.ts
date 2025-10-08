// Calendar 관련

export type SelectMode = 'day' | 'month' | 'year';

export interface CalendarProps {
  value?: Date;
  onSelect?: (date: Date) => void;
}

export interface BaseCalendarProps {
  currentMonth: Date;
}

export interface CalendarHeaderProps extends BaseCalendarProps {
  selectMode: SelectMode;
  onToggleMode: () => void;
  onChange: (offset: number) => void;
}

export interface DayViewProps extends BaseCalendarProps {
  currentDay: Date;
  onSelect: (date: Date) => void;
}

export interface MonthViewProps {
  onSelect: (month: number) => void;
}

export interface YearViewProps extends BaseCalendarProps {
  onSelect: (year: number) => void;
}

// Time Calendar 관련
export interface TimeCalendarProps {
  value: string;
  onChange: (value: string) => void;
}
