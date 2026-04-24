import { useId } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../Typography';
import type { TabBarProps } from './types';

export function TabBar<T extends string>({
  items,
  selectedValue,
  onValueChange,
  palette = 'light',
  hasBottomBorder = true,
  className = '',
}: TabBarProps<T>) {
  const indicatorId = useId();
  const isDark = palette === 'dark';
  return (
    <div
      className={`flex w-full ${className}`}
      style={{
        backgroundColor: isDark ? 'var(--bg-primaryInverse)' : 'var(--bg-primary)',
        borderBottomWidth: hasBottomBorder ? 1 : 0,
        borderBottomStyle: 'solid',
        borderBottomColor: 'var(--border-default)',
      }}
    >
      {items.map((item) => {
        const isSelected = item.value === selectedValue;
        const textColor = isDark
          ? isSelected
            ? 'var(--content-primaryInverse)'
            : 'var(--content-onColorMid)'
          : isSelected
            ? 'var(--content-primary)'
            : 'var(--content-tertiary)';
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onValueChange(item.value)}
            className="relative flex flex-1 items-center justify-center gap-XXS py-S"
            style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
          >
            <Typography type="buttonLabel" size="M" color={textColor}>
              {item.label}
            </Typography>
            {item.badge != null && (
              <span
                className="rounded-PILL px-XXS"
                style={{ backgroundColor: 'var(--bg-negativeMid)', minWidth: 18, textAlign: 'center' }}
              >
                <Typography type="label" size="S" color="var(--content-onColorLight)">
                  {String(item.badge)}
                </Typography>
              </span>
            )}
            {isSelected && (
              <motion.div
                layoutId={indicatorId}
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: 2,
                  backgroundColor: isDark ? 'var(--content-primaryInverse)' : 'var(--content-primary)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export type { TabBarProps };
