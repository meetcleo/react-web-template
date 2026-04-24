import React from 'react';
import { motion } from 'framer-motion';
import type { ProgressBarProps } from './types';

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentageCompleted,
  secondaryPercentageCompleted,
  animated = true,
  duration = 0.4,
  isDark = false,
  height = 8,
  className = '',
}) => {
  const primary = clamp(percentageCompleted);
  const secondary = secondaryPercentageCompleted != null ? clamp(secondaryPercentageCompleted) : undefined;
  const track = isDark ? 'var(--bg-skeletonMidInverse)' : 'var(--bg-skeletonMid)';
  const fill = 'var(--bg-accentMid)';
  const secondaryFill = 'var(--bg-accentLight)';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-PROGRESS_BAR ${className}`}
      style={{ height, backgroundColor: track }}
    >
      {secondary != null && (
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${secondary}%`, backgroundColor: secondaryFill }}
        />
      )}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-PROGRESS_BAR"
        initial={animated ? { width: 0 } : false}
        animate={{ width: `${primary}%` }}
        transition={{ duration: animated ? duration : 0, ease: [0.28, 0, 0.84, 1] }}
        style={{ backgroundColor: fill }}
      />
    </div>
  );
};

export type { ProgressBarProps };
