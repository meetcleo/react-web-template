import type { ReactNode } from 'react';
import type { LineIconName } from '../LineIcon/types';

export type ButtonSize = 'S' | 'M' | 'L';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'link';
export type ButtonPalette = 'light' | 'dark';
export type ButtonTheme = 'default' | 'danger' | 'positive' | 'plus';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  palette?: ButtonPalette;
  theme?: ButtonTheme;
  isLoading?: boolean;
  isDisabled?: boolean;
  startIcon?: LineIconName;
  endIcon?: LineIconName;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};
