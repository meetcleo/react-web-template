// Approximate web equivalent of RN MemoizedFastImage — memo-wrapped <img>; browsers cache automatically.
import { memo } from 'react';
import { Image } from '../Image';
import type { MemoizedFastImageProps } from './types';

export const MemoizedFastImage = memo(function MemoizedFastImage(props: MemoizedFastImageProps) {
  return <Image {...props} />;
});

export type { MemoizedFastImageProps };
