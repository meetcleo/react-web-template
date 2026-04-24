import React from 'react';
import { motion } from 'framer-motion';
import { LineIcon } from '../LineIcon';
import { LoadingSpinner } from '../LoadingSpinner';
import { Typography } from '../Typography';
import type {
  ButtonPalette,
  ButtonProps,
  ButtonSize,
  ButtonTheme,
  ButtonVariant,
} from './types';

const SIZE_STYLES: Record<ButtonSize, { height: number; px: number; typographySize: 'L' | 'M' | 'S' }> = {
  S: { height: 32, px: 12, typographySize: 'S' },
  M: { height: 40, px: 16, typographySize: 'M' },
  L: { height: 48, px: 20, typographySize: 'L' },
};

type VariantColors = { bg: string; content: string; border: string };

// Faithful to cleo/mobile-app/src/modules/shared/components/Button/constants/colors.ts.
// Palette describes the surface the button sits on: `light` = app's primary
// background, `dark` = inverse/brand surface. Each cell uses CSS vars that
// flip automatically between light/dark themes via ThemeProvider.
const COLOR_TABLE: Record<ButtonVariant, Record<ButtonPalette, Record<ButtonTheme, VariantColors>>> = {
  primary: {
    light: {
      default: { bg: 'var(--bg-primaryInverse)', content: 'var(--content-primaryInverse)', border: 'var(--bg-primaryInverse)' },
      danger: { bg: 'var(--bg-negativeMid)', content: 'var(--content-primaryInverse)', border: 'var(--bg-negativeMid)' },
      positive: { bg: 'var(--bg-positiveDark)', content: 'var(--content-onColor)', border: 'var(--bg-positiveDark)' },
      plus: { bg: 'var(--bg-waitingDark)', content: 'var(--content-onColor)', border: 'var(--bg-waitingDark)' },
    },
    dark: {
      default: { bg: 'var(--bg-primary)', content: 'var(--content-primary)', border: 'var(--bg-primary)' },
      danger: { bg: 'var(--bg-negativeLight)', content: 'var(--content-primary)', border: 'var(--bg-negativeLight)' },
      positive: { bg: 'var(--bg-positiveLight)', content: 'var(--content-positiveDark)', border: 'var(--bg-positiveLight)' },
      plus: { bg: 'var(--bg-waitingLight)', content: 'var(--content-waitingDark)', border: 'var(--bg-waitingLight)' },
    },
  },
  secondary: {
    light: {
      default: { bg: 'transparent', content: 'var(--content-secondary)', border: 'var(--border-selected)' },
      danger: { bg: 'transparent', content: 'var(--content-negativeMid)', border: 'var(--bg-negativeMid)' },
      positive: { bg: 'transparent', content: 'var(--content-positiveDark)', border: 'var(--border-positiveDark)' },
      plus: { bg: 'transparent', content: 'var(--content-waitingDark)', border: 'var(--border-waitingDark)' },
    },
    dark: {
      default: { bg: 'transparent', content: 'var(--content-primaryInverse)', border: 'var(--border-accentLight)' },
      danger: { bg: 'transparent', content: 'var(--content-negativeLight)', border: 'var(--border-negativeLight)' },
      positive: { bg: 'transparent', content: 'var(--content-positiveLight)', border: 'var(--bg-positiveLight)' },
      plus: { bg: 'transparent', content: 'var(--content-waitingLight)', border: 'var(--bg-waitingLight)' },
    },
  },
  tertiary: {
    light: {
      default: { bg: 'var(--bg-accentLight)', content: 'var(--content-tertiary)', border: 'var(--bg-accentLight)' },
      danger: { bg: 'var(--bg-accentLight)', content: 'var(--content-negativeMid)', border: 'var(--bg-accentLight)' },
      positive: { bg: 'var(--bg-accentLight)', content: 'var(--content-positiveDark)', border: 'var(--bg-accentLight)' },
      plus: { bg: 'var(--bg-accentLight)', content: 'var(--content-waitingDark)', border: 'var(--bg-accentLight)' },
    },
    dark: {
      default: { bg: 'var(--bg-accentMid)', content: 'var(--content-primaryInverse)', border: 'var(--bg-accentMid)' },
      danger: { bg: 'var(--bg-accentMid)', content: 'var(--content-negativeLight)', border: 'var(--bg-accentMid)' },
      positive: { bg: 'var(--bg-accentMid)', content: 'var(--content-positiveLight)', border: 'var(--bg-accentMid)' },
      plus: { bg: 'var(--bg-accentMid)', content: 'var(--content-waitingLight)', border: 'var(--bg-accentMid)' },
    },
  },
  text: {
    light: {
      default: { bg: 'transparent', content: 'var(--content-secondary)', border: 'transparent' },
      danger: { bg: 'transparent', content: 'var(--content-negativeMid)', border: 'transparent' },
      positive: { bg: 'transparent', content: 'var(--content-positiveMid)', border: 'transparent' },
      plus: { bg: 'transparent', content: 'var(--content-waitingMid)', border: 'transparent' },
    },
    dark: {
      default: { bg: 'transparent', content: 'var(--content-primaryInverse)', border: 'transparent' },
      danger: { bg: 'transparent', content: 'var(--content-negativeLight)', border: 'transparent' },
      positive: { bg: 'transparent', content: 'var(--content-positiveLight)', border: 'transparent' },
      plus: { bg: 'transparent', content: 'var(--content-waitingLight)', border: 'transparent' },
    },
  },
  link: {
    light: {
      default: { bg: 'transparent', content: 'var(--content-secondary)', border: 'transparent' },
      danger: { bg: 'transparent', content: 'var(--content-negativeMid)', border: 'transparent' },
      positive: { bg: 'transparent', content: 'var(--content-positiveMid)', border: 'transparent' },
      plus: { bg: 'transparent', content: 'var(--content-waitingMid)', border: 'transparent' },
    },
    dark: {
      default: { bg: 'transparent', content: 'var(--content-primaryInverse)', border: 'transparent' },
      danger: { bg: 'transparent', content: 'var(--content-negativeLight)', border: 'transparent' },
      positive: { bg: 'transparent', content: 'var(--content-positiveLight)', border: 'transparent' },
      plus: { bg: 'transparent', content: 'var(--content-waitingLight)', border: 'transparent' },
    },
  },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  size = 'M',
  variant = 'primary',
  palette = 'light',
  theme = 'default',
  isLoading = false,
  isDisabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  className = '',
}) => {
  const s = SIZE_STYLES[size];
  const colors = COLOR_TABLE[variant][palette][theme];
  const disabled = isDisabled || isLoading;
  const isUnderline = variant === 'link';
  const hasBorder = variant === 'secondary' || variant === 'tertiary';

  return (
    <motion.button
      type="button"
      onClick={onPress}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex items-center justify-center gap-XXS rounded-BUTTON ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        height: s.height,
        paddingLeft: s.px,
        paddingRight: s.px,
        backgroundColor: disabled && variant !== 'text' && variant !== 'link' ? 'var(--bg-disabled)' : colors.bg,
        color: disabled ? 'var(--content-disabled)' : colors.content,
        borderWidth: hasBorder ? 1 : 0,
        borderStyle: 'solid',
        borderColor: disabled
          ? palette === 'dark'
            ? 'var(--border-disabledOnDark)'
            : 'var(--border-disabledOnLight)'
          : colors.border,
        textDecoration: isUnderline ? 'underline' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {isLoading ? (
        <LoadingSpinner size="XXSMALL" color="currentColor" />
      ) : (
        <>
          {startIcon && <LineIcon name={startIcon} size="S" color="currentColor" />}
          <Typography type="buttonLabel" size={s.typographySize} color="currentColor">
            {label}
          </Typography>
          {endIcon && <LineIcon name={endIcon} size="S" color="currentColor" />}
        </>
      )}
    </motion.button>
  );
};

export type { ButtonProps };
