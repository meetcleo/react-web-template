const foundationalRadii = {
  NONE: 0,
  XS: 4,
  S: 12,
  M: 16,
  L: 28,
  XL: 32,
  XXL: 1000,
} as const;

export const Radii = {
  NONE: foundationalRadii.NONE,
  CHECKBOX: foundationalRadii.XS,
  BAR_CHART: foundationalRadii.S,
  INPUT: foundationalRadii.S,
  BANNER: foundationalRadii.M,
  CONTAINER: foundationalRadii.M,
  CARD: foundationalRadii.M,
  MODAL: foundationalRadii.L,
  CHAT_INPUT_FIELD: foundationalRadii.XL,
  BUTTON: foundationalRadii.XXL,
  PROGRESS_BAR: foundationalRadii.XXL,
  ICON: foundationalRadii.XXL,
  TOOLTIP: foundationalRadii.S,
  SNACKBAR: foundationalRadii.S,
  PILL: foundationalRadii.XXL,
  S_CONTAINER: foundationalRadii.M,
  M_CONTAINER: foundationalRadii.M,
  L_CONTAINER: foundationalRadii.M,
  CHAT_CONTAINER: foundationalRadii.M,
  CHAT_BUTTONS: foundationalRadii.XXL,
} as const;

export type RadiusToken = keyof typeof Radii;
