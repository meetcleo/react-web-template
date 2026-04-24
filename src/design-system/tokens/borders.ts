export const BorderWidth = {
  NONE: 0,
  XS: 0.5,
  S: 1,
  M: 1.5,
  L: 2,
  XL: 3,
} as const;

export type BorderWidthToken = keyof typeof BorderWidth;
