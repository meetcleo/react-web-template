import React from 'react';
import { useSafeArea } from '../../../shell';
import type { SafeAreaProps } from './types';

export const SafeArea: React.FC<SafeAreaProps> = ({ edges = ['top', 'bottom'], children, className = '' }) => {
  const insets = useSafeArea();
  const style: React.CSSProperties = {
    paddingTop: edges.includes('top') ? insets.top : undefined,
    paddingBottom: edges.includes('bottom') ? insets.bottom : undefined,
    paddingLeft: edges.includes('left') ? insets.left : undefined,
    paddingRight: edges.includes('right') ? insets.right : undefined,
  };
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export type { SafeAreaProps };
