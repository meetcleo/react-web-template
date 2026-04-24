export type SegmentedControlItem<T extends string = string> = {
  value: T;
  label: string;
};

export type SegmentedControlProps<T extends string = string> = {
  items: readonly SegmentedControlItem<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  isFullWidth?: boolean;
  className?: string;
};
