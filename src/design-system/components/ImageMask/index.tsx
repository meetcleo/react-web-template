// CSS mask-image applied over an image background.
import React from 'react';
import type { ImageMaskProps } from './types';

export const ImageMask: React.FC<ImageMaskProps> = ({
  source,
  maskSource,
  width,
  height,
  className = '',
  style,
  alt,
}) => (
  <div
    role={alt ? 'img' : undefined}
    aria-label={alt}
    className={className}
    style={{
      width,
      height,
      backgroundImage: `url(${source})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      WebkitMaskImage: `url(${maskSource})`,
      maskImage: `url(${maskSource})`,
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      ...style,
    }}
  />
);

export type { ImageMaskProps };
