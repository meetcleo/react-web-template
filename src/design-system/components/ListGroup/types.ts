import type { ReactNode } from 'react';

export type ListGroupProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  hasDivider?: boolean;
  hasOutline?: boolean;
  className?: string;
};
