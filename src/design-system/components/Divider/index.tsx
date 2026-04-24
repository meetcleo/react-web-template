import React from 'react';
import type { DividerProps } from './types';

export const Divider: React.FC<DividerProps> = ({ vertical = false, className = '' }) => (
  <div
    aria-hidden
    className={`${vertical ? 'h-full w-XS' : 'h-XS w-full'} ${className}`}
    style={{
      backgroundColor: 'var(--border-default)',
      ...(vertical ? { width: 1 } : { height: 1 }),
    }}
  />
);

export type { DividerProps };
