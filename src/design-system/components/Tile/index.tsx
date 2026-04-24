import React from 'react';
import { motion } from 'framer-motion';
import { LineIcon } from '../LineIcon';
import { Tag } from '../Tag';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { TileProps } from './types';

export const Tile: React.FC<TileProps> = ({
  title,
  description,
  iconName,
  badgeLabel,
  badgeVariant,
  onPress,
  palette = 'default',
  className = '',
}) => {
  const isDark = palette === 'dark';
  const bg = isDark ? 'var(--bg-primaryInverse)' : 'var(--bg-secondary)';
  const textColor = isDark ? 'var(--content-primaryInverse)' : 'var(--content-primary)';
  const descColor = isDark ? 'var(--content-onColorMid)' : 'var(--content-tertiary)';

  const Wrapper = onPress ? motion.button : motion.div;
  return (
    <Wrapper
      {...(onPress ? { type: 'button', onClick: onPress, whileTap: { scale: 0.98 } } : {})}
      className={`flex flex-col items-start gap-XS p-S rounded-CARD text-left ${className}`}
      style={{
        backgroundColor: bg,
        cursor: onPress ? 'pointer' : undefined,
        width: '100%',
      }}
    >
      {iconName && (
        <div
          className="flex items-center justify-center rounded-ICON"
          style={{
            width: 40,
            height: 40,
            backgroundColor: isDark ? 'var(--bg-accentLight)' : 'var(--bg-accentLight)',
          }}
        >
          <LineIcon name={iconName} size="M" color={textColor} />
        </div>
      )}
      <VStack gap="XXXS" align="start" className="w-full">
        <div className="flex items-center justify-between w-full gap-XS">
          <Typography type="titleStrong" size="M" color={textColor}>
            {title}
          </Typography>
          {badgeLabel && <Tag label={badgeLabel} variant={badgeVariant ?? 'neutral'} />}
        </div>
        {description && (
          <Typography type="body" size="S" color={descColor}>
            {description}
          </Typography>
        )}
      </VStack>
    </Wrapper>
  );
};

export type { TileProps };
