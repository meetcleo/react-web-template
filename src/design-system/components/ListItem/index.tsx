import React from 'react';
import { motion } from 'framer-motion';
import { HStack } from '../HStack';
import { LineIcon } from '../LineIcon';
import { LoadingSpinner } from '../LoadingSpinner';
import { ProgressBar } from '../ProgressBar';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { ListItemProps } from './types';

const NUMBER_BADGE_SIZE = 32;
const NUMBER_BADGE_SIZE_COMPACT = 28;

export const ListItem: React.FC<ListItemProps> = ({
  title,
  titleType = 'titleStrong',
  titleSize = 'M',
  titleIcon,
  subtitle,
  eyebrowText,
  label,
  labelType = 'titleStrong',
  labelSize = 'M',
  subLabel,
  icon,
  iconPosition = 'left',
  iconBgColor,
  iconColor,
  iconSize = 'M',
  number,
  numberBgColor,
  numberColor,
  tag,
  tagPosition = 'left',
  button,
  onPress,
  isDisabled = false,
  isLoading = false,
  hideChevron = false,
  bgColor,
  progressPercentage,
  footerContent,
  isCompact = false,
  className = '',
}) => {
  const contentColor = isDisabled ? 'var(--content-disabled)' : 'var(--content-primary)';
  const subtitleColor = isDisabled ? 'var(--content-disabled)' : 'var(--content-secondary)';
  const numberBadgeSize = isCompact ? NUMBER_BADGE_SIZE_COMPACT : NUMBER_BADGE_SIZE;

  const leading = (
    (icon && iconPosition === 'left') || number != null
  ) ? (
    <HStack align="center">
      {icon && iconPosition === 'left' && (
        <div
          className={iconBgColor ? 'p-XXS rounded-ICON' : ''}
          style={iconBgColor ? { backgroundColor: iconBgColor } : undefined}
        >
          <LineIcon name={icon} color={iconColor ?? contentColor} size={iconSize} />
        </div>
      )}
      {number != null && (
        <div
          className="flex items-center justify-center rounded-ICON"
          style={{
            width: numberBadgeSize,
            height: numberBadgeSize,
            backgroundColor: numberBgColor ?? 'var(--bg-secondary)',
          }}
        >
          <Typography type="bodyStrong" size={isCompact ? 'M' : 'L'} color={numberColor ?? contentColor}>
            {String(number)}
          </Typography>
        </div>
      )}
    </HStack>
  ) : null;

  const leftBlock = (
    <VStack gap={isCompact ? 'ZERO' : 'XXXS'} align="start" className="min-w-0 flex-1">
      {eyebrowText && (
        <Typography type="body" size="S" color={contentColor}>
          {eyebrowText}
        </Typography>
      )}
      <HStack gap="XXXS" align="center">
        <Typography type={titleType} size={titleSize} color={contentColor}>
          {title}
        </Typography>
        {titleIcon && <LineIcon name={titleIcon} size="S" color={contentColor} />}
      </HStack>
      {subtitle && (
        <Typography type="body" size="M" color={subtitleColor}>
          {subtitle}
        </Typography>
      )}
      {tag && tagPosition === 'left' && <div style={{ marginTop: 2 }}>{tag}</div>}
    </VStack>
  );

  const rightBlock = (
    <HStack gap="XXS" align="center" justify="end">
      <VStack gap="XXXS" align="end">
        {tag && tagPosition === 'right' && <div>{tag}</div>}
        {label != null &&
          (React.isValidElement(label) ? (
            label
          ) : (
            <Typography type={labelType} size={labelSize} align="right" color={contentColor}>
              {label}
            </Typography>
          ))}
        {subLabel && (
          <Typography type="body" size="M" align="right" color={subtitleColor}>
            {subLabel}
          </Typography>
        )}
        {button && !isLoading && button}
      </VStack>
      {icon && iconPosition === 'right' && (
        <div
          className={iconBgColor ? 'p-XXS rounded-ICON' : ''}
          style={iconBgColor ? { backgroundColor: iconBgColor } : undefined}
        >
          <LineIcon name={icon} color={iconColor ?? contentColor} size={iconSize} />
        </div>
      )}
      {(isLoading || (onPress && !hideChevron)) && (
        <HStack align="center">
          {isLoading ? (
            <LoadingSpinner size="SMALL" />
          ) : (
            <LineIcon name="direction-right" size="S" color={contentColor} />
          )}
        </HStack>
      )}
    </HStack>
  );

  const row = (
    <VStack gap="XS" align="stretch" className={className}>
      <HStack
        gap={isCompact ? 'XS' : 'S'}
        align="center"
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        {leading}
        <VStack gap={isCompact ? 'XXXS' : 'S'} align="stretch" className="flex-1 min-w-0">
          <HStack justify="between" gap={isCompact ? 'XS' : 'S'} align="center" className="w-full">
            {leftBlock}
            {rightBlock}
          </HStack>
          {footerContent}
        </VStack>
      </HStack>
      {progressPercentage !== undefined && <ProgressBar percentageCompleted={progressPercentage} />}
    </VStack>
  );

  if (!onPress) return row;

  return (
    <motion.button
      type="button"
      onClick={onPress}
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.99 }}
      className="w-full text-left"
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {row}
    </motion.button>
  );
};

export type { ListItemProps };
