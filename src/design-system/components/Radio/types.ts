export type RadioProps = {
  isSelected: boolean;
  onPress?: () => void;
  label?: string;
  caption?: string;
  isDisabled?: boolean;
  hasOutline?: boolean;
  className?: string;
};
