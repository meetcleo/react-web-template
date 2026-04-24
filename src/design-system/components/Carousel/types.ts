import type { ReactNode } from 'react';

export type CarouselProps<T> = {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  itemWidth?: number;
  gap?: number;
  className?: string;
};
