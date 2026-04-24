import type { CSSProperties } from 'react';

export type ImageResizeMode = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export type ImageProps = {
  source: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  resizeMode?: ImageResizeMode;
  borderRadius?: number;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  style?: CSSProperties;
};
