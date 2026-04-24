import React from 'react';
import type { ListProps } from './types';

export function List<T>({ items, renderItem, keyExtractor, gap = 'S', className = '' }: ListProps<T>) {
  return (
    <div className={`flex flex-col gap-${gap} ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </div>
  );
}

export type { ListProps };
