// Approximate web equivalent of RN CleoLogo — Cleo wordmark as a two-tone SVG.
// The RN source has gradient/mask variants; this ships a single flat-colour version.
import React from 'react';
import type { CleoLogoProps } from './types';

const WORDMARK_PATH =
  'M195.833 46.524h-25v137.5h25zM105.483 161.617c-19.216 0-31.014-15.853-31.014-36.104S86.268 89.41 105.265 89.41c12.889 0 22.051 7.258 27.287 19.151l21.397-9.914c-9.181-20.471-26.215-31.485-48.702-31.485C72.269 67.162 50 91.59 50 125.495s22.288 58.333 55.465 58.333c22.487 0 39.521-11.435 48.702-31.906l-21.615-9.695c-5.254 11.894-14.198 19.371-27.069 19.371zM265.984 67.178c-32.137 0-53.484 24.645-53.484 58.544s21.562 58.123 53.484 58.123c21.795 0 39.031-10.353 48.528-30.381l-20.7-10.115c-5.386 11.892-14.884 18.489-27.397 18.489-16.392 0-27.613-12.332-29.983-29.061h79.804c.215-3.299.431-6.157.431-9.474 0-34.118-18.546-56.125-50.683-56.125m-28.69 46.45c3.662-14.53 13.806-24.645 28.69-24.645 14.883 0 24.596 9.693 27.181 24.645zM389.694 67.16c-33.379 0-56.361 24.645-56.361 58.324s22.762 58.324 56.361 58.324c33.378 0 56.139-24.865 56.139-58.544s-22.761-58.123-56.139-58.123zm0 94.44c-19.449 0-31.391-16.07-31.391-36.098s11.942-36.097 31.391-36.097 31.17 15.849 31.17 35.877-11.923 36.318-31.17 36.318';

const BUBBLE_PATH = 'M0 120C0 53.726 53.726 0 120 0h260c66.274 0 120 53.726 120 120v10c0 66.274-53.726 120-120 120H0z';

const CLOSED_EYES_PATH =
  'M211.375 83.375c-3.5 8-3 15.5-.5 22.75M274.125 83.375c-3.5 8-3 15.5-.5 22.75';

export const CleoLogo: React.FC<CleoLogoProps> = ({
  variant = 'default',
  width = 70,
  height = 40,
  fillColor = 'var(--bg-accentMid)',
  accentColor = 'var(--content-onColorLight)',
  className = '',
  style,
}) => (
  <svg
    viewBox="0 0 500 250"
    width={width}
    height={height}
    preserveAspectRatio="xMinYMin meet"
    className={className}
    style={style}
    aria-label="Cleo"
  >
    <path d={BUBBLE_PATH} fill={fillColor} />
    <path d={WORDMARK_PATH} fill={accentColor} />
    {variant === 'closed' && (
      <path d={CLOSED_EYES_PATH} stroke={accentColor} strokeWidth={4} fill="none" strokeLinecap="round" />
    )}
  </svg>
);

export type { CleoLogoProps };
