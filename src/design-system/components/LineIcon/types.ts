import type { GeneratedIconName } from './generatedIcons';

export type CustomIconName = 'sun' | 'moon';

export type LineIconName = GeneratedIconName | CustomIconName;

export type LineIconSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type LineIconProps = {
  name: LineIconName;
  size?: LineIconSize;
  color?: string;
  strokeWidth?: number;
  className?: string;
  rotate?: 'LEFT' | 'RIGHT' | 'FLIP';
};
