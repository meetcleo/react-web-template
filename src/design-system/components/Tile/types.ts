import type { LineIconName } from '../LineIcon/types';
import type { TagVariant } from '../Tag/types';

export type TilePalette = 'default' | 'dark';

export type TileProps = {
  title: string;
  description?: string;
  iconName?: LineIconName;
  badgeLabel?: string;
  badgeVariant?: TagVariant;
  onPress?: () => void;
  palette?: TilePalette;
  className?: string;
};
