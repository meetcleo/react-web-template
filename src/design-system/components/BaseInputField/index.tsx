import React from 'react';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { BaseInputFieldProps } from './types';

export const BaseInputField: React.FC<BaseInputFieldProps> = ({
  label,
  error,
  success,
  helper,
  isDisabled = false,
  isFocused = false,
  className = '',
  children,
}) => {
  const borderColor = error
    ? 'var(--border-negativeMid)'
    : success
      ? 'var(--border-positiveMid)'
      : isFocused
        ? 'var(--border-focused)'
        : 'var(--border-default)';

  return (
    <VStack gap="XXS" className={className} align="stretch">
      {label && (
        <Typography type="label" size="M" color="var(--content-secondary)">
          {label}
        </Typography>
      )}
      <div
        className="rounded-INPUT px-S py-XS"
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor,
          backgroundColor: 'var(--bg-primary)',
          opacity: isDisabled ? 0.5 : 1,
        }}
      >
        {children}
      </div>
      {(error || success || helper) && (
        <Typography
          type="label"
          size="S"
          color={
            error
              ? 'var(--content-negativeMid)'
              : success
                ? 'var(--content-positiveMid)'
                : 'var(--content-tertiary)'
          }
        >
          {error ?? success ?? helper}
        </Typography>
      )}
    </VStack>
  );
};

export type { BaseInputFieldProps };
