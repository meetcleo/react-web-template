import React from 'react';
import { gradients, toCssGradient } from '../../tokens';
import type { GradientProps } from './types';

export const Gradient: React.FC<GradientProps> = ({
  name,
  colors,
  direction = 'to bottom',
  className = '',
  style,
  children,
}) => {
  const stops = colors ?? (name ? gradients[name] : ['transparent', 'transparent']);
  return (
    <div
      className={className}
      style={{
        background: toCssGradient(stops, direction),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export type { GradientProps };
