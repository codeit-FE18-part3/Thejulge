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

export interface CalendarViewProps<T> {
  onSelect: (value: T) => void;
}

export type DayViewProps = CalendarViewProps<Date> & { currentMonth: Date; currentDay: Date };
export type MonthViewProps = CalendarViewProps<number>;
export type YearViewProps = CalendarViewProps<number> & { currentMonth: Date };

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};

// Time Selector 관련
export type Period = '오전' | '오후';

export interface TimeSelectorProps {
  value?: string;
  period: Period;
  hours: string;
  minutes: string;
  onSelect?: (value: string) => void;
}
