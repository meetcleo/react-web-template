export type CalendarProps = {
  selectedDate?: string;
  onSelectDate: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  className?: string;
};
