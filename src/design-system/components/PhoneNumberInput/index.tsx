import React from 'react';
import { InputField } from '../InputField';
import type { PhoneNumberInputProps } from './types';

const formatUS = (raw: string): string => {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  value,
  onChangeText,
  countryCode = '+1',
  error,
  isDisabled,
  className,
}) => (
  <InputField
    label={label}
    value={formatUS(value)}
    onChangeText={(v) => onChangeText(v.replace(/\D/g, ''))}
    error={error}
    isDisabled={isDisabled}
    className={className}
    prefix={countryCode}
    placeholder="(555) 123-4567"
    keyboardType="phone-pad"
    maxLength={14}
  />
);

export type { PhoneNumberInputProps };
