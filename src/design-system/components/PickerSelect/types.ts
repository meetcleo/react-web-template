export type PickerSelectItem<T extends string = string> = {
  value: T;
  label: string;
};

export type PickerSelectProps<T extends string = string> = {
  label?: string;
  items: readonly PickerSelectItem<T>[];
  value?: T;
  onValueChange: (value: T) => void;
  placeholder?: string;
  error?: string;
  isDisabled?: boolean;
  className?: string;
};
