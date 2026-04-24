import type { CSSProperties, ReactNode } from 'react';
import type React from 'react';
import type { TypographyType, TypographySize, TypographyWeightName } from '../../tokens';

export type TypographyProps = {
  type: TypographyType;
  size?: TypographySize;
  weight?: TypographyWeightName;
  italic?: boolean;
  color?: string;
  align?: 'left' | 'center' | 'right';
  uppercase?: boolean;
  numberOfLines?: number;
  className?: string;
  style?: CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
  children?: ReactNode;
};
