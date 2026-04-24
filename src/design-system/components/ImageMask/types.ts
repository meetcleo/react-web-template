import type { CSSProperties } from 'react';

export type ImageMaskProps = {
  source: string;
  maskSource: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
};
