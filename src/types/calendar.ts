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

export interface CalendarViewProps<T> extends BaseCalendarProps {
  onSelect: (value: T) => void;
}

export type DayViewProps = CalendarViewProps<Date> & { currentDay: Date };
export type MonthViewProps = CalendarViewProps<number>;
export type YearViewProps = CalendarViewProps<number>;

// Time Calendar 관련
export interface TimeCalendarProps {
  value: string;
  onChange: (value: string) => void;
}
