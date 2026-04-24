// Approximate web equivalent of RN DateField — native <input type="date"> instead of a custom calendar sheet.
import React, { useState } from 'react';
import { BaseInputField } from '../BaseInputField';
import type { DateFieldProps } from './types';

export const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  error,
  isDisabled = false,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <BaseInputField
      label={label}
      error={error}
      isDisabled={isDisabled}
      isFocused={isFocused}
      className={className}
    >
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={isDisabled}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent outline-none"
        style={{
          color: 'var(--content-userInput)',
          fontSize: 16,
          lineHeight: '20px',
          fontFamily: 'PPNeueMontreal, system-ui, sans-serif',
        }}
      />
    </BaseInputField>
  );
};

export type { DateFieldProps };
