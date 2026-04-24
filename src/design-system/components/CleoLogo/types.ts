import type { CSSProperties } from 'react';

export type CleoLogoVariant = 'default' | 'closed';

export type CleoLogoProps = {
  variant?: CleoLogoVariant;
  width?: number | string;
  height?: number | string;
  fillColor?: string;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
};
