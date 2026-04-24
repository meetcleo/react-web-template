import type { ReactNode } from 'react';

export type BaseInputFieldProps = {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  className?: string;
  children: ReactNode;
};
