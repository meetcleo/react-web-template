import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FullScreenModalProps } from './types';

export const FullScreenModal: React.FC<FullScreenModalProps> = ({
  isOpen,
  onClose: _onClose,
  children,
  header,
  className = '',
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={`absolute inset-0 z-50 ${className}`}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 360, damping: 34 }}
        style={{ backgroundColor: 'var(--bg-primary)' }}
        role="dialog"
        aria-modal="true"
      >
        {header}
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export type { FullScreenModalProps };
