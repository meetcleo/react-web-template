import React, { Children } from 'react';
import { Divider } from '../Divider';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { ListGroupProps } from './types';

export const ListGroup: React.FC<ListGroupProps> = ({
  title,
  subtitle,
  children,
  hasDivider = true,
  hasOutline = false,
  className = '',
}) => {
  const items = Children.toArray(children);
  return (
    <VStack
      gap="S"
      align="stretch"
      className={`${hasOutline ? 'p-S rounded-CARD' : ''} ${className}`}
      style={
        hasOutline
          ? {
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'var(--border-default)',
              backgroundColor: 'var(--bg-primary)',
            }
          : undefined
      }
    >
      {(title || subtitle) && (
        <VStack gap="XXXS" align="start">
          {title && (
            <Typography type="labelStrong" size="M" uppercase color="var(--content-tertiary)">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography type="body" size="S" color="var(--content-tertiary)">
              {subtitle}
            </Typography>
          )}
        </VStack>
      )}
      <VStack gap="S" align="stretch">
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {child}
            {hasDivider && i < items.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </VStack>
    </VStack>
  );
};

export type { ListGroupProps };
