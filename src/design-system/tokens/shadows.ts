export const Shadows: {
  XS?: string;
  S?: string;
  M?: string;
  L?: string;
  UP?: string;
  IN?: string;
  DISABLED?: string;
} = {
  XS: undefined,
  S: undefined,
  M: undefined,
  L: undefined,
  UP: undefined,
  IN: undefined,
  DISABLED: undefined,
};

export type ShadowToken = keyof typeof Shadows;
