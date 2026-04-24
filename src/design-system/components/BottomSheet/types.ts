import type { ReactNode } from 'react';

export type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  dismissOnBackdrop?: boolean;
  className?: string;
};
