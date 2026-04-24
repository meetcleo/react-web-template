import React from 'react';
import type { DashedLineProps } from './types';

export const DashedLine: React.FC<DashedLineProps> = ({
  vertical = false,
  dashLength = 4,
  gapLength = 4,
  className = '',
}) => {
  const gradient = `repeating-linear-gradient(${vertical ? 'to bottom' : 'to right'}, var(--border-default) 0 ${dashLength}px, transparent ${dashLength}px ${dashLength + gapLength}px)`;
  return (
    <div
      aria-hidden
      className={className}
      style={
        vertical
          ? { width: 1, height: '100%', background: gradient }
          : { height: 1, width: '100%', background: gradient }
      }
    />
  );
};

export type { DashedLineProps };
