import React, { useState } from 'react';
import { BaseInputField } from '../BaseInputField';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';
import type { InputFieldProps } from './types';

const KEYBOARD_TO_INPUTMODE: Record<NonNullable<InputFieldProps['keyboardType']>, React.HTMLAttributes<HTMLInputElement>['inputMode']> = {
  default: 'text',
  numeric: 'numeric',
  'email-address': 'email',
  'phone-pad': 'tel',
  'decimal-pad': 'decimal',
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  success,
  helper,
  prefix,
  clearable = false,
  secureTextEntry = false,
  showSecureTextEntryToggle = false,
  isDisabled = false,
  autoFocus,
  placeholder,
  keyboardType = 'default',
  maxLength,
  className,
  inputClassName = '',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecret, setIsSecret] = useState(secureTextEntry);

  return (
    <BaseInputField
      label={label}
      error={error}
      success={success}
      helper={helper}
      isDisabled={isDisabled}
      isFocused={isFocused}
      className={className}
    >
      <div className="flex items-center gap-XXS">
        {prefix && (
          <Typography type="body" size="M" color="var(--content-tertiary)">
            {prefix}
          </Typography>
        )}
        <input
          {...rest}
          type={isSecret ? 'password' : 'text'}
          value={value ?? ''}
          onChange={(e) => onChangeText?.(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          disabled={isDisabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={KEYBOARD_TO_INPUTMODE[keyboardType]}
          className={`flex-1 bg-transparent outline-none ${inputClassName}`}
          style={{
            color: 'var(--content-userInput)',
            fontSize: 16,
            lineHeight: '20px',
            fontFamily: 'PPNeueMontreal, system-ui, sans-serif',
          }}
        />
        {clearable && value && (
          <IconButton icon="cross" size="S" variant="tertiary" transparentBackground onPress={() => onChangeText?.('')} />
        )}
        {showSecureTextEntryToggle && secureTextEntry && (
          <IconButton
            icon={isSecret ? 'visible' : 'invisible'}
            size="S"
            variant="tertiary"
            transparentBackground
            onPress={() => setIsSecret((v) => !v)}
          />
        )}
      </div>
    </BaseInputField>
  );
};

export type { InputFieldProps };
