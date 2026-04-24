import type { InputHTMLAttributes } from 'react';

export type InputFieldProps = {
  label?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  success?: string;
  helper?: string;
  prefix?: string;
  clearable?: boolean;
  secureTextEntry?: boolean;
  showSecureTextEntryToggle?: boolean;
  isDisabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'decimal-pad';
  maxLength?: number;
  className?: string;
  inputClassName?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onBlur' | 'onFocus' | 'value' | 'type' | 'disabled' | 'className'
>;
