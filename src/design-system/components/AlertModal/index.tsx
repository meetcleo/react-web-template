import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../Button';
import { HStack } from '../HStack';
import { Typography } from '../Typography';
import { VStack } from '../VStack';
import type { AlertModalProps } from './types';

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'OK',
  cancelLabel,
  onConfirm,
  onCancel,
  destructive = false,
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="absolute inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ backgroundColor: 'var(--bg-overlay)' }}
          onClick={onCancel}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 z-50 rounded-MODAL"
          initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            backgroundColor: 'var(--bg-primary)',
            width: 300,
            padding: 24,
          }}
          role="alertdialog"
          aria-modal="true"
        >
          <VStack gap="S" align="stretch">
            <VStack gap="XXS" align="start">
              <Typography type="titleStrong" size="L" color="var(--content-primary)">
                {title}
              </Typography>
              {message && (
                <Typography type="body" size="M" color="var(--content-secondary)">
                  {message}
                </Typography>
              )}
            </VStack>
            <HStack gap="XS" justify="end">
              {cancelLabel && onCancel && (
                <Button label={cancelLabel} variant="secondary" size="M" onPress={onCancel} />
              )}
              <Button
                label={confirmLabel}
                variant="primary"
                size="M"
                theme={destructive ? 'danger' : 'default'}
                onPress={onConfirm}
              />
            </HStack>
          </VStack>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export type { AlertModalProps };
