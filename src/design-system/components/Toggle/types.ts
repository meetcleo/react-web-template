import type { ReactNode } from 'react';

export type ToggleProps = {
  isSelected: boolean;
  onPress?: () => void;
  label?: string;
  caption?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  hasOutline?: boolean;
  className?: string;
  children?: ReactNode;
};
