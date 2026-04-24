// UK National Insurance number format: 2 letters, 6 digits, 1 letter (e.g. QQ 12 34 56 C).
import React from 'react';
import { InputField } from '../InputField';
import type { NIInputProps } from './types';

const formatNI = (raw: string): string => {
  const up = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 9);
  const parts: string[] = [];
  if (up.length > 0) parts.push(up.slice(0, 2));
  if (up.length > 2) parts.push(up.slice(2, 4));
  if (up.length > 4) parts.push(up.slice(4, 6));
  if (up.length > 6) parts.push(up.slice(6, 8));
  if (up.length > 8) parts.push(up.slice(8, 9));
  return parts.join(' ');
};

export const NIInput: React.FC<NIInputProps> = ({
  label = 'National Insurance number',
  value,
  onChangeText,
  error,
  isDisabled,
  className,
}) => (
  <InputField
    label={label}
    value={formatNI(value)}
    onChangeText={(v) => onChangeText(v.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
    error={error}
    isDisabled={isDisabled}
    className={className}
    placeholder="QQ 12 34 56 C"
    maxLength={13}
  />
);

export type { NIInputProps };
