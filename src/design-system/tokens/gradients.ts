import { colors, colorRoles } from './colors';

const hexToRgba = (hex: string, alpha: number): string => {
  const clean = hex.replace('#', '');
  const value = clean.length === 8 ? clean.slice(0, 6) : clean;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const { background } = colorRoles;

const creditScoreColors = {
  excellent: colors.green[500],
  veryGood: colors.green[400],
  good: colors.blue[300],
  fair: colors.purple[400],
  poor: colors.red[500],
};

const { excellent, veryGood, good, fair, poor } = creditScoreColors;

export type GradientName =
  | 'ACCENT_LIGHT_TO_TRANSPARENT'
  | 'AUTOPILOT_WAITLIST_BACKGROUND'
  | 'BASE_LIGHT_TO_TRANSPARENT'
  | 'CHAT_FEED_SCROLL'
  | 'CHAT_SCROLL_FADE_OUT'
  | 'CHAT_SMART_LOADER'
  | 'CHAT_SMART_LOADER_DARK'
  | 'CREDIT_BUILDER_CARD_ADD_TO_WALLET_BACKGROUND'
  | 'CREDIT_SCORE_POOR_TO_EXCELLENT'
  | 'CREDIT_SCORE_POOR_TO_VERY_GOOD'
  | 'CREDIT_SCORE_POOR_TO_GOOD'
  | 'CREDIT_SCORE_POOR_TO_FAIR'
  | 'CREDIT_SCORE_POOR_TO_POOR'
  | 'DARK_TO_TRANSPARENT'
  | 'DARK_TO_TRANSPARENT_REVERSED'
  | 'GOAL_IMAGE'
  | 'INTRODUCTION_CAROUSEL_BUILDING_CREDIT'
  | 'INTRODUCTION_CAROUSEL_CASH_ADVANCE'
  | 'INTRODUCTION_CAROUSEL_COACHING'
  | 'INTRODUCTION_CAROUSEL_SAVINGS'
  | 'INVERSE_PRIMARY_TO_LIGHT_BLUE'
  | 'INVERSE_PRIMARY_TO_TRANSPARENT'
  | 'LIGHT_BLUE_TO_BACKGROUND'
  | 'PURPLE_TO_TRANSPARENT'
  | 'TEMPERATURE'
  | 'TRANSPARENT'
  | 'WHITE_TO_BASE_LIGHT'
  | 'WHITE_TO_TRANSPARENT'
  | 'WHITE_TO_WHITE'
  | 'POT_BAR_REMAINING'
  | 'POT_BAR_BOOST'
  | 'POT_BAR_PROCESSING';

export const gradients: Record<GradientName, string[]> = {
  ACCENT_LIGHT_TO_TRANSPARENT: [
    background.accentLight,
    hexToRgba(background.accentLight, 0),
    hexToRgba(background.accentLight, 0),
  ],
  AUTOPILOT_WAITLIST_BACKGROUND: [hexToRgba(colors.blue[800], 0), colors.blue[800]],
  BASE_LIGHT_TO_TRANSPARENT: [background.baseLight, hexToRgba(background.baseLight, 0)],
  CHAT_FEED_SCROLL: [background.primary, background.disabled],
  CHAT_SCROLL_FADE_OUT: [background.disabled, background.transparent],
  CHAT_SMART_LOADER: [background.overlayLightInverse, background.transparent],
  CHAT_SMART_LOADER_DARK: [background.overlay, background.transparent],
  CREDIT_BUILDER_CARD_ADD_TO_WALLET_BACKGROUND: [background.positiveMid, background.waitingMid],
  CREDIT_SCORE_POOR_TO_EXCELLENT: [excellent, veryGood, good, fair, poor],
  CREDIT_SCORE_POOR_TO_VERY_GOOD: [veryGood, good, fair, poor],
  CREDIT_SCORE_POOR_TO_GOOD: [good, fair, poor],
  CREDIT_SCORE_POOR_TO_FAIR: [fair, poor],
  CREDIT_SCORE_POOR_TO_POOR: [poor, poor],
  DARK_TO_TRANSPARENT_REVERSED: [background.overlayLight, hexToRgba(background.overlayLight, 0)],
  DARK_TO_TRANSPARENT: [hexToRgba(background.overlayLight, 0), background.overlayLight],
  GOAL_IMAGE: [colors.blackAlpha[25], background.transparent, background.transparent, background.transparent],
  INTRODUCTION_CAROUSEL_BUILDING_CREDIT: [colors.blue[200], colors.purple[700]],
  INTRODUCTION_CAROUSEL_CASH_ADVANCE: [colors.green[300], background.accentMid],
  INTRODUCTION_CAROUSEL_COACHING: [colors.purple[400], colors.blue[700]],
  INTRODUCTION_CAROUSEL_SAVINGS: [colors.purple[300], colors.green[800]],
  INVERSE_PRIMARY_TO_LIGHT_BLUE: [background.primaryInverse, background.secondaryInverse],
  INVERSE_PRIMARY_TO_TRANSPARENT: [background.primaryInverse, hexToRgba(background.primaryInverse, 0)],
  LIGHT_BLUE_TO_BACKGROUND: [background.accentMid, background.baseLight],
  PURPLE_TO_TRANSPARENT: [background.waitingMid, hexToRgba(background.waitingMid, 0)],
  TEMPERATURE: [background.accentMid, background.negativeMid],
  TRANSPARENT: [background.transparent, background.transparent],
  WHITE_TO_BASE_LIGHT: [background.primary, background.baseLight],
  WHITE_TO_TRANSPARENT: [background.primary, hexToRgba(background.primary, 0)],
  WHITE_TO_WHITE: [colors.whiteAlpha[10], colors.whiteAlpha[10], colors.whiteAlpha[5]],
  POT_BAR_REMAINING: [colors.purple[600], colors.purple[500], colors.purple[400]],
  POT_BAR_BOOST: [colors.green[600], colors.green[500], colors.green[400]],
  POT_BAR_PROCESSING: [colors.blue[600], colors.blue[500], colors.blue[400]],
};

export const toCssGradient = (
  stops: string[],
  direction: string = 'to bottom',
): string => `linear-gradient(${direction}, ${stops.join(', ')})`;
