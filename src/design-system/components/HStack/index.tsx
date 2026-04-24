import React from 'react';
import { Box } from '../Box';
import type { HStackProps } from './types';

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

export const HStack: React.FC<HStackProps> = ({
  gap,
  align = 'center',
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
      className={`flex flex-row ${ALIGN[align]} ${JUSTIFY[justify]} ${gapClass} ${wrapClass} ${className}`}
      {...rest}
    >
      {children}
    </Box>
  );
};

export type { HStackProps };
