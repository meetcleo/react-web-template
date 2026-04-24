import React from 'react';
import type { ImageProps } from './types';

export const Image: React.FC<ImageProps> = ({
  source,
  alt = '',
  width,
  height,
  resizeMode = 'cover',
  borderRadius,
  onLoad,
  onError,
  className = '',
  style,
}) => (
  <img
    src={source}
    alt={alt}
    className={className}
    onLoad={onLoad}
    onError={onError}
    style={{
      width,
      height,
      objectFit: resizeMode,
      borderRadius,
      display: 'block',
      ...style,
    }}
  />
);

export type { ImageProps };
