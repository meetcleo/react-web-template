export { colors, colorRoles, darkModeColorRoles } from './colors';
export type { Colors, ColorRoles, BackgroundRole, ContentRole, BorderRole } from './colors';

export { Spacing } from './spacing';
export type { SpacingToken } from './spacing';

export { Radii } from './radii';
export type { RadiusToken } from './radii';

export { BorderWidth } from './borders';
export type { BorderWidthToken } from './borders';

export { Shadows } from './shadows';
export type { ShadowToken } from './shadows';

export {
  TypographyWeight,
  fontFamilies,
  fontWeights,
  typographySizeMap,
  typographyLineHeightMap,
  typographyDefaultWeights,
  typography,
} from './typography';
export type { TypographyType, TypographySize, TypographyWeightName } from './typography';

export { MotionDuration, MotionEasing, motion } from './motion';
export type { DurationToken, EasingToken } from './motion';

export { gradients, toCssGradient } from './gradients';
export type { GradientName } from './gradients';

import { colors, colorRoles, darkModeColorRoles } from './colors';
import { Spacing } from './spacing';
import { Radii } from './radii';
import { BorderWidth } from './borders';
import { Shadows } from './shadows';
import { typography } from './typography';
import { motion } from './motion';
import { gradients } from './gradients';

export const tokens = {
  colors,
  colorRoles,
  darkModeColorRoles,
  spacing: Spacing,
  radii: Radii,
  borderWidth: BorderWidth,
  shadows: Shadows,
  typography,
  motion,
  gradients,
} as const;
