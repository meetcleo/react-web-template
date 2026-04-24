export type TabBarItem<T extends string = string> = {
  value: T;
  label: string;
  badge?: string | number;
};

export type TabBarPalette = 'light' | 'dark';

export type TabBarProps<T extends string = string> = {
  items: readonly TabBarItem<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  palette?: TabBarPalette;
  hasBottomBorder?: boolean;
  className?: string;
};
