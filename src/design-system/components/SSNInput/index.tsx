import React from 'react';
import { InputField } from '../InputField';
import type { SSNInputProps } from './types';

const formatSSN = (raw: string): string => {
  const d = raw.replace(/\D/g, '').slice(0, 9);
  if (d.length < 4) return d;
  if (d.length < 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
};

export const SSNInput: React.FC<SSNInputProps> = ({
  label = 'Social Security Number',
  value,
  onChangeText,
  error,
  isDisabled,
  className,
}) => (
  <InputField
    label={label}
    value={formatSSN(value)}
    onChangeText={(v) => onChangeText(v.replace(/\D/g, ''))}
    error={error}
    isDisabled={isDisabled}
    className={className}
    placeholder="123-45-6789"
    keyboardType="numeric"
    maxLength={11}
    secureTextEntry
    showSecureTextEntryToggle
  />
);

export type { SSNInputProps };
