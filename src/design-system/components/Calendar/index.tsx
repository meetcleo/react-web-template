// Approximate web equivalent of RN Calendar — simple month grid instead of react-native-calendars.
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { HStack } from '../HStack';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { CalendarProps } from './types';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const toISODate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const parseISO = (s: string): Date => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1);
};

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
  className,
}) => {
  const initial = selectedDate ? parseISO(selectedDate) : new Date();
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const lead = (first.getDay() + 6) % 7; // ISO: Mon = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result: (string | null)[] = [];
    for (let i = 0; i < lead; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(toISODate(new Date(year, month, d)));
    return result;
  }, [cursor]);

  const isDisabled = (iso: string): boolean => {
    if (minDate && iso < minDate) return true;
    if (maxDate && iso > maxDate) return true;
    return false;
  };

  return (
    <VStack gap="S" className={className}>
      <HStack justify="between" align="center">
        <IconButton
          icon="direction-left"
          size="M"
          variant="tertiary"
          onPress={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          label="Previous month"
        />
        <Typography type="titleStrong" size="M">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </Typography>
        <IconButton
          icon="direction-right"
          size="M"
          variant="tertiary"
          onPress={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          label="Next month"
        />
      </HStack>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {WEEKDAYS.map((w) => (
          <Typography key={w} type="label" size="S" align="center" color="var(--content-tertiary)">
            {w}
          </Typography>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <div key={`empty-${i}`} />;
          const isSelected = iso === selectedDate;
          const disabled = isDisabled(iso);
          const dayNum = Number(iso.slice(8));
          return (
            <motion.button
              key={iso}
              type="button"
              onClick={() => !disabled && onSelectDate(iso)}
              disabled={disabled}
              whileTap={disabled ? undefined : { scale: 0.92 }}
              className="flex items-center justify-center rounded-ICON"
              style={{
                aspectRatio: '1 / 1',
                backgroundColor: isSelected ? 'var(--bg-accentMid)' : 'transparent',
                color: isSelected
                  ? 'var(--content-onColorLight)'
                  : disabled
                    ? 'var(--content-disabled)'
                    : 'var(--content-primary)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                border: 'none',
              }}
            >
              <Typography type="body" size="M" color="currentColor">
                {String(dayNum)}
              </Typography>
            </motion.button>
          );
        })}
      </div>
    </VStack>
  );
};

export type { CalendarProps };
