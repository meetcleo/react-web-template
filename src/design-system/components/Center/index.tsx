import React from 'react';
import { Box } from '../Box';
import type { CenterProps } from './types';

export const Center: React.FC<CenterProps> = ({ className = '', children, ...rest }) => (
  <Box className={`flex flex-1 items-center justify-center ${className}`} {...rest}>
    {children}
  </Box>
);

export type { CenterProps };
