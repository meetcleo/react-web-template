import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { ToggleProps } from './types';

export const Toggle: React.FC<ToggleProps> = ({
  isSelected,
  onPress,
  label,
  caption,
  isDisabled = false,
  hasOutline = false,
  className = '',
}) => {
  const container = (
    <button
      type="button"
      role="switch"
      aria-checked={isSelected}
      disabled={isDisabled}
      onClick={onPress}
      className={`flex items-center justify-between gap-S w-full ${hasOutline ? 'p-S rounded-CONTAINER' : ''} ${className}`}
      style={{
        borderWidth: hasOutline ? 1 : 0,
        borderStyle: 'solid',
        borderColor: 'var(--border-default)',
        backgroundColor: hasOutline ? 'var(--bg-primary)' : 'transparent',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
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
      <motion.div
        className="rounded-PILL shrink-0"
        animate={{ backgroundColor: isSelected ? 'var(--bg-accentMid)' : 'var(--bg-skeletonDark)' }}
        transition={{ duration: 0.18, ease: [0.28, 0, 0.72, 1] }}
        style={{ width: 48, height: 28, padding: 2 }}
      >
        <motion.div
          className="rounded-PILL bg-white"
          animate={{ x: isSelected ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ width: 24, height: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
        />
      </motion.div>
    </button>
  );
  return container;
};

export type { ToggleProps };
