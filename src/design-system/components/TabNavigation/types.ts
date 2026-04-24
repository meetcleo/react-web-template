import type { LineIconName } from '../LineIcon/types';

export type TabNavigationItem<T extends string = string> = {
  value: T;
  label?: string;
  icon?: LineIconName;
  badge?: string | number;
};

export type TabNavigationProps<T extends string = string> = {
  items: readonly TabNavigationItem<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  className?: string;
};
