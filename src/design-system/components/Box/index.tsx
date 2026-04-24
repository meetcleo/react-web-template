import React from 'react';
import type { BoxProps } from './types';

export const Box: React.FC<BoxProps> = ({ as: As = 'div', className, children, ...rest }) => {
  const Component = As as React.ElementType;
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

export type { BoxProps };
