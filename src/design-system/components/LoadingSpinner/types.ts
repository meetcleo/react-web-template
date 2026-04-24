export type LoadingSpinnerSize = 'XXSMALL' | 'XSMALL' | 'SMALL' | 'MEDIUM' | 'LARGE';
export type LoadingSpinnerPalette = 'light' | 'dark' | 'custom';

export type LoadingSpinnerProps = {
  size?: LoadingSpinnerSize;
  palette?: LoadingSpinnerPalette;
  color?: string;
  className?: string;
};
