import type { ReactNode } from 'react';

export type FullScreenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  header?: ReactNode;
  className?: string;
};
