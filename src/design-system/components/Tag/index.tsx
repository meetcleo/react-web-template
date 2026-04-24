import React from 'react';
import { LineIcon } from '../LineIcon';
import { Typography } from '../Typography';
import type { TagProps, TagVariant } from './types';

const VARIANT_STYLES: Record<TagVariant, { bg: string; content: string; border: string }> = {
  info: { bg: 'var(--bg-waitingLight)', content: 'var(--content-waitingMid)', border: 'var(--border-waitingLight)' },
  success: { bg: 'var(--bg-positiveLight)', content: 'var(--content-positiveMid)', border: 'var(--border-positiveLight)' },
  warning: { bg: 'var(--bg-warningLight)', content: 'var(--content-warningMid)', border: 'var(--border-warningLight)' },
  error: { bg: 'var(--bg-negativeLight)', content: 'var(--content-negativeMid)', border: 'var(--border-negativeLight)' },
  disabled: { bg: 'var(--bg-disabled)', content: 'var(--content-disabled)', border: 'var(--border-disabled)' },
  neutral: { bg: 'var(--bg-secondary)', content: 'var(--content-primary)', border: 'var(--border-default)' },
};

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'neutral',
  outline = false,
  startIcon,
  className = '',
}) => {
  const v = VARIANT_STYLES[variant];
  return (
    <span
      className={`inline-flex items-center gap-XXS px-XS py-XXS rounded-PILL ${className}`}
      style={{
        backgroundColor: outline ? 'transparent' : v.bg,
        borderWidth: outline ? 1 : 0,
        borderStyle: 'solid',
        borderColor: v.border,
      }}
    >
      {startIcon && <LineIcon name={startIcon} size="XS" color={v.content} />}
      <Typography type="labelStrong" size="S" color={v.content}>
        {label}
      </Typography>
    </span>
  );
};

export type { TagProps };
