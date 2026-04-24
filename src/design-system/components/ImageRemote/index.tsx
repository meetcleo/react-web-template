import React, { useState } from 'react';
import { Image } from '../Image';
import { Skeleton } from '../Skeleton';
import type { ImageRemoteProps } from './types';

export const ImageRemote: React.FC<ImageRemoteProps> = ({ showSkeleton = true, onLoad, onError, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position: 'relative', width: rest.width, height: rest.height }}>
      {!loaded && showSkeleton && (
        <Skeleton width={rest.width ?? '100%'} height={rest.height ?? 160} borderRadius={rest.borderRadius ?? 0} />
      )}
      <Image
        {...rest}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        onError={onError}
        style={{ ...rest.style, opacity: loaded ? 1 : 0, transition: 'opacity 0.2s', position: 'absolute', inset: 0 }}
      />
    </div>
  );
};

export type { ImageRemoteProps };
