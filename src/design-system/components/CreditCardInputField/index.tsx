// Approximate web equivalent of RN CreditCardInputField — formatting-only, no Stripe integration.
import React from 'react';
import { InputField } from '../InputField';
import type { CreditCardInputFieldProps } from './types';

const formatCard = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

export const CreditCardInputField: React.FC<CreditCardInputFieldProps> = ({
  label,
  value,
  onChangeText,
  error,
  isDisabled,
  className,
}) => (
  <InputField
    label={label}
    value={formatCard(value)}
    onChangeText={(v) => onChangeText(v.replace(/\s/g, ''))}
    error={error}
    isDisabled={isDisabled}
    className={className}
    placeholder="1234 5678 9012 3456"
    keyboardType="numeric"
    maxLength={23}
  />
);

export type { CreditCardInputFieldProps };
