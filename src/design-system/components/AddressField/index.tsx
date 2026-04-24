import React, { useState } from 'react';
import { BaseInputField } from '../BaseInputField';
import type { AddressFieldProps } from './types';

export const AddressField: React.FC<AddressFieldProps> = ({
  label = 'Address',
  value,
  onChangeText,
  error,
  isDisabled,
  placeholder = '1 Infinite Loop\nCupertino, CA 95014',
  rows = 3,
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
      <textarea
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isDisabled}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-transparent outline-none resize-none"
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

export type { AddressFieldProps };
