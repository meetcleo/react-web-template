import React from 'react';
import { InputField } from '../InputField';
import type { AmountInputProps } from './types';

export const AmountInput: React.FC<AmountInputProps> = ({
  label,
  value,
  onChangeText,
  currency = '$',
  decimals = 2,
  onBlur,
  onFocus,
  error,
  placeholder,
  isDisabled,
  className,
}) => {
  const handleChange = (next: string) => {
    const cleaned = next.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    const whole = parts[0] ?? '';
    const frac = parts[1] ?? '';
    const limited = parts.length > 1 ? `${whole}.${frac.slice(0, decimals)}` : whole;
    onChangeText(limited);
  };

  return (
    <InputField
      label={label}
      value={value}
      onChangeText={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      placeholder={placeholder}
      isDisabled={isDisabled}
      className={className}
      prefix={currency}
      keyboardType="decimal-pad"
    />
  );
};

export type { AmountInputProps };
