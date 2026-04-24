import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../Typography';
import type { SelectableChipProps } from './types';

export const SelectableChip: React.FC<SelectableChipProps> = ({
  label,
  emoji,
  isSelected,
  onPress,
  isDisabled,
  className = '',
}) => (
  <motion.button
    type="button"
    onClick={onPress}
    disabled={isDisabled}
    whileTap={isDisabled ? undefined : { scale: 0.97 }}
    className={`inline-flex items-center gap-XXS px-S py-XS rounded-PILL ${className}`}
    style={{
      backgroundColor: isSelected ? 'var(--bg-accentMid)' : 'var(--bg-secondary)',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: isSelected ? 'var(--border-selected)' : 'var(--border-default)',
      opacity: isDisabled ? 0.4 : 1,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }}
  >
    {emoji && <span style={{ fontSize: 16 }}>{emoji}</span>}
    <Typography
      type="buttonLabel"
      size="M"
      color={isSelected ? 'var(--content-primaryInverse)' : 'var(--content-primary)'}
    >
      {label}
    </Typography>
  </motion.button>
);

export type { SelectableChipProps };
