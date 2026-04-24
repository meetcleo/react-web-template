import React from 'react';
import type { ProgressIndicatorProps } from './types';

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  className = '',
}) => (
  <div className={`flex gap-XXS ${className}`}>
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div
        key={i}
        className="h-XXS flex-1 rounded-PILL transition-colors"
        style={{
          backgroundColor: i < currentStep ? 'var(--bg-accentMid)' : 'var(--bg-skeletonMid)',
        }}
      />
    ))}
  </div>
);

export type { ProgressIndicatorProps };
