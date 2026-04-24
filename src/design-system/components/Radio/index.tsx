import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { RadioProps } from './types';

export const Radio: React.FC<RadioProps> = ({
  isSelected,
  onPress,
  label,
  caption,
  isDisabled = false,
  hasOutline = false,
  className = '',
}) => (
  <motion.button
    type="button"
    role="radio"
    aria-checked={isSelected}
    disabled={isDisabled}
    onClick={onPress}
    whileTap={isDisabled ? undefined : { scale: 0.97 }}
    className={`flex items-start gap-XS w-full text-left ${hasOutline ? 'p-S rounded-CONTAINER' : ''} ${className}`}
    style={{
      borderWidth: hasOutline ? 1 : 0,
      borderStyle: 'solid',
      borderColor: isSelected ? 'var(--border-selected)' : 'var(--border-default)',
      backgroundColor: hasOutline ? 'var(--bg-primary)' : 'transparent',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
    }}
  >
    <div
      className="rounded-ICON flex items-center justify-center shrink-0"
      style={{
        width: 20,
        height: 20,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: isSelected ? 'var(--bg-accentMid)' : 'var(--border-default)',
        marginTop: 2,
      }}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="rounded-ICON"
          style={{ width: 10, height: 10, backgroundColor: 'var(--bg-accentMid)' }}
        />
      )}
    </div>
    {(label || caption) && (
      <VStack gap="XXXS" align="start" className="flex-1 min-w-0">
        {label && (
          <Typography type="body" size="M" color="var(--content-primary)">
            {label}
          </Typography>
        )}
        {caption && (
          <Typography type="label" size="S" color="var(--content-tertiary)">
            {caption}
          </Typography>
        )}
      </VStack>
    )}
  </motion.button>
);

export type { RadioProps };
