import type { LineIconName } from '../LineIcon/types';

export type IconButtonSize = 'S' | 'M' | 'L';
export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type IconButtonProps = {
  icon: LineIconName;
  onPress?: () => void;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  label?: string;
  isDisabled?: boolean;
  transparentBackground?: boolean;
  rotate?: 'LEFT' | 'RIGHT' | 'FLIP';
  className?: string;
};
