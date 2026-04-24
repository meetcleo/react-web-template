import type { CSSProperties, ReactNode } from 'react';
import type { GradientName } from '../../tokens';

export type GradientDirection = 'to top' | 'to bottom' | 'to left' | 'to right' | 'to top right' | 'to bottom right';

export type GradientProps = {
  name?: GradientName;
  colors?: string[];
  direction?: GradientDirection;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};
