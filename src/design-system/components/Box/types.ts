import type { HTMLAttributes, ReactNode } from 'react';
import type React from 'react';

export type BoxProps = {
  children?: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>;
