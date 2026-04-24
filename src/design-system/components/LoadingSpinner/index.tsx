// Approximate web equivalent of RN LoadingSpinner — CSS-animated SVG arc instead of Lottie.
import React from 'react';
import type { LoadingSpinnerProps, LoadingSpinnerSize } from './types';

const SIZES: Record<LoadingSpinnerSize, number> = {
  XXSMALL: 16,
  XSMALL: 24,
  SMALL: 32,
  MEDIUM: 48,
  LARGE: 72,
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'MEDIUM',
  palette = 'light',
  color,
  className = '',
}) => {
  const px = SIZES[size];
  const resolved = color ?? (palette === 'dark' ? 'var(--content-primaryInverse)' : 'var(--content-primary)');
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      className={className}
      style={{ animation: 'spinnerRotate 0.9s linear infinite' }}
      aria-label="Loading"
    >
      <circle cx="24" cy="24" r="18" stroke={resolved} strokeOpacity="0.15" strokeWidth="4" fill="none" />
      <path d="M24 6a18 18 0 0118 18" stroke={resolved} strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
};

export type { LoadingSpinnerProps };
