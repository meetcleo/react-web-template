// Approximate web equivalent of RN PickerSelect — BottomSheet of options instead of native wheel picker.
import { useState } from 'react';
import { BaseInputField } from '../BaseInputField';
import { BottomSheet } from '../BottomSheet';
import { LineIcon } from '../LineIcon';
import { Radio } from '../Radio';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { PickerSelectProps } from './types';

export function PickerSelect<T extends string>({
  label,
  items,
  value,
  onValueChange,
  placeholder = 'Select…',
  error,
  isDisabled,
  className,
}: PickerSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = items.find((i) => i.value === value);

  return (
    <>
      <BaseInputField label={label} error={error} isDisabled={isDisabled} className={className}>
        <button
          type="button"
          onClick={() => !isDisabled && setIsOpen(true)}
          disabled={isDisabled}
          className="flex w-full items-center justify-between bg-transparent outline-none"
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        >
          <Typography
            type="body"
            size="M"
            color={selected ? 'var(--content-userInput)' : 'var(--content-tertiary)'}
          >
            {selected?.label ?? placeholder}
          </Typography>
          <LineIcon name="direction-down" size="S" color="var(--content-tertiary)" />
        </button>
      </BaseInputField>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title={label}>
        <VStack gap="XS" align="stretch">
          {items.map((item) => (
            <Radio
              key={item.value}
              isSelected={item.value === value}
              onPress={() => {
                onValueChange(item.value);
                setIsOpen(false);
              }}
              label={item.label}
              hasOutline
            />
          ))}
        </VStack>
      </BottomSheet>
    </>
  );
}

export type { PickerSelectProps };
