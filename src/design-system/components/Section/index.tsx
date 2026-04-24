import React from 'react';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { SectionProps } from './types';

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => (
  <VStack gap="S" className={className}>
    {title && (
      <Typography type="labelStrong" size="M" uppercase color="var(--content-tertiary)">
        {title}
      </Typography>
    )}
    {children}
  </VStack>
);

export type { SectionProps };
