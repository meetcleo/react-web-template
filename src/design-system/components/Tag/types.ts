import type { ReactNode } from 'react';
import type { LineIconName } from '../LineIcon/types';

export type TagVariant = 'info' | 'error' | 'warning' | 'success' | 'disabled' | 'neutral';
export type TagPalette = 'light' | 'dark';

export type TagProps = {
  label: string;
  variant?: TagVariant;
  palette?: TagPalette;
  outline?: boolean;
  startIcon?: LineIconName;
  className?: string;
  children?: ReactNode;
};
