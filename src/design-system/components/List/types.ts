import type { ReactNode } from 'react';
import type { SpacingToken } from '../../tokens';

export type ListProps<T> = {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  gap?: SpacingToken;
  className?: string;
};
