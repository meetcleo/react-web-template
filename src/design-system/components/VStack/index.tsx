import React from 'react';
import { Box } from '../Box';
import type { VStackProps } from './types';

const ALIGN = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const JUSTIFY = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const VStack: React.FC<VStackProps> = ({
  gap,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  children,
  ...rest
}) => {
  const gapClass = gap ? `gap-${gap}` : '';
  const wrapClass = wrap ? 'flex-wrap' : '';
  return (
    <Box
      className={`flex flex-col ${ALIGN[align]} ${JUSTIFY[justify]} ${gapClass} ${wrapClass} ${className}`}
      {...rest}
    >
      {children}
    </Box>
  );
};

export type { VStackProps };
