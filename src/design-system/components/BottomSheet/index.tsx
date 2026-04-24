// Approximate web equivalent of RN BottomSheet — Framer Motion AnimatePresence instead of @gorhom/bottom-sheet.
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { BottomSheetProps } from './types';

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  dismissOnBackdrop = true,
  className = '',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="absolute inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: 'var(--bg-overlay)' }}
            onClick={dismissOnBackdrop ? onClose : undefined}
          />
          <motion.div
            className={`absolute z-50 rounded-MODAL ${className}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            style={{
              left: 16,
              right: 16,
              bottom: 16,
              backgroundColor: 'var(--bg-primary)',
              maxHeight: '85%',
              overflowY: 'auto',
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-center pt-XS">
              <div className="h-XXXS rounded-PILL" style={{ width: 36, backgroundColor: 'var(--border-default)' }} />
            </div>
            <VStack gap="S" align="stretch" style={{ padding: 16 }}>
              {(title || subtitle) && (
                <VStack gap="XXS" align="start">
                  {title && (
                    <Typography type="headline" size="S" color="var(--content-primary)">
                      {title}
                    </Typography>
                  )}
                  {subtitle && (
                    <Typography type="body" size="M" color="var(--content-tertiary)">
                      {subtitle}
                    </Typography>
                  )}
                </VStack>
              )}
              {children}
            </VStack>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export type { BottomSheetProps };
