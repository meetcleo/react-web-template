import React, { useState } from 'react';
import { Image } from '../Image';
import type { ImageWithFallbackProps } from './types';

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ source, fallbackSource, onError, ...rest }) => {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      {...rest}
      source={failed ? fallbackSource : source}
      onError={() => {
        setFailed(true);
        onError?.();
      }}
    />
  );
};

export type { ImageWithFallbackProps };
