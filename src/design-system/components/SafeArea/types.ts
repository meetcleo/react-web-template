import type { ReactNode } from 'react';

export type SafeAreaProps = {
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  children?: ReactNode;
  className?: string;
};
