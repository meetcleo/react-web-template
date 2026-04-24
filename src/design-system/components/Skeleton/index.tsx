// Approximate web equivalent of RN Skeleton — CSS keyframe shimmer instead of Reanimated.
import React from 'react';
import type { SkeletonProps } from './types';

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  className = '',
  style,
}) => (
  <div
    aria-hidden
    className={className}
    style={{
      width,
      height,
      borderRadius,
      background:
        'linear-gradient(90deg, var(--bg-skeletonLight) 0%, var(--bg-skeletonMid) 50%, var(--bg-skeletonLight) 100%)',
      backgroundSize: '200px 100%',
      backgroundRepeat: 'no-repeat',
      animation: 'skeletonShimmer 1.2s ease-in-out infinite',
      ...style,
    }}
  />
);

export type { SkeletonProps };
