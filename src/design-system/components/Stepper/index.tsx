import React from 'react';
import { AmountInput } from '../AmountInput';
import { HStack } from '../HStack';
import { IconButton } from '../IconButton';
import type { StepperProps } from './types';

export const Stepper: React.FC<StepperProps> = ({
  label,
  value,
  onChange,
  step = 1,
  min,
  max,
  currency,
  decimals,
  isDisabled,
  className,
}) => {
  const numeric = Number(value) || 0;
  const clamp = (n: number): number => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const increment = () => onChange(String(clamp(numeric + step)));
  const decrement = () => onChange(String(clamp(numeric - step)));
  const atMin = min != null && numeric <= min;
  const atMax = max != null && numeric >= max;

  return (
    <HStack gap="XS" align="end" className={className}>
      <IconButton
        icon="minus-boxy"
        size="L"
        variant="secondary"
        onPress={decrement}
        isDisabled={isDisabled || atMin}
      />
      <div style={{ flex: 1 }}>
        <AmountInput
          label={label}
          value={value}
          onChangeText={onChange}
          currency={currency}
          decimals={decimals}
          isDisabled={isDisabled}
        />
      </div>
      <IconButton
        icon="add-boxy"
        size="L"
        variant="secondary"
        onPress={increment}
        isDisabled={isDisabled || atMax}
      />
    </HStack>
  );
};

export type { StepperProps };
