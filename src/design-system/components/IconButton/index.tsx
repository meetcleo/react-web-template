import React from 'react';
import { motion } from 'framer-motion';
import { LineIcon } from '../LineIcon';
import type { IconButtonProps, IconButtonSize, IconButtonVariant } from './types';

const SIZES: Record<IconButtonSize, { box: number; icon: 'XS' | 'S' | 'M' | 'L' }> = {
  S: { box: 24, icon: 'XS' },
  M: { box: 32, icon: 'S' },
  L: { box: 40, icon: 'M' },
};

// Faithful to cleo/mobile-app/src/modules/shared/components/IconButton/index.tsx.
// All variants use `content.primary` for the icon (auto-inverts per theme); only
// the background differs. primary = bare/ghosted, secondary = subtle tint,
// tertiary = more prominent surface.
const VARIANT_BG: Record<IconButtonVariant, string> = {
  primary: 'var(--bg-primary)',
  secondary: 'var(--bg-accentLight)',
  tertiary: 'var(--bg-tertiary)',
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 'M',
  variant = 'secondary',
  label,
  isDisabled = false,
  transparentBackground = false,
  rotate,
  className = '',
}) => {
  const s = SIZES[size];
  const iconColor = isDisabled ? 'var(--border-disabledOnLight)' : 'var(--content-primary)';
  const bg = transparentBackground ? 'transparent' : VARIANT_BG[variant];
  return (
    <motion.button
      type="button"
      onClick={onPress}
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.92 }}
      aria-label={label ?? icon}
      className={`inline-flex items-center justify-center rounded-ICON ${className}`}
      style={{
        width: s.box,
        height: s.box,
        backgroundColor: bg,
        color: iconColor,
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.4 : 1,
      }}
    >
      <LineIcon name={icon} size={s.icon} color="currentColor" rotate={rotate} />
    </motion.button>
  );
};

export type { IconButtonProps };
