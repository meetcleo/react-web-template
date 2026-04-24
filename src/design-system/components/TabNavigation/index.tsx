import { motion } from 'framer-motion';
import { useSafeArea } from '../../../shell';
import { LineIcon } from '../LineIcon';
import { Typography } from '../Typography';
import type { TabNavigationProps } from './types';

export function TabNavigation<T extends string>({
  items,
  selectedValue,
  onValueChange,
  className = '',
}: TabNavigationProps<T>) {
  const insets = useSafeArea();
  return (
    <nav
      className={`flex w-full ${className}`}
      style={{
        backgroundColor: 'var(--bg-navbar)',
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: 'var(--border-default)',
        paddingBottom: insets.bottom,
      }}
    >
      {items.map((item) => {
        const isSelected = item.value === selectedValue;
        const color = isSelected ? 'var(--content-primary)' : 'var(--content-tertiary)';
        return (
          <motion.button
            key={item.value}
            type="button"
            onClick={() => onValueChange(item.value)}
            whileTap={{ scale: 0.95 }}
            className="relative flex flex-1 flex-col items-center justify-center gap-XXXS py-XS"
            style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
          >
            {item.icon && (
              <div style={{ position: 'relative' }}>
                <LineIcon name={item.icon} size="M" color={color} />
                {item.badge != null && (
                  <span
                    className="absolute rounded-PILL"
                    style={{
                      top: -4,
                      right: -6,
                      backgroundColor: 'var(--bg-negativeMid)',
                      minWidth: 16,
                      height: 16,
                      padding: '0 4px',
                      textAlign: 'center',
                      lineHeight: '16px',
                    }}
                  >
                    <Typography type="label" size="S" color="var(--content-onColorLight)">
                      {String(item.badge)}
                    </Typography>
                  </span>
                )}
              </div>
            )}
            {item.label && (
              <Typography type="label" size="S" color={color}>
                {item.label}
              </Typography>
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}

export type { TabNavigationProps };
