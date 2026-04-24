export type CheckBoxProps = {
  isSelected: boolean;
  onPress?: () => void;
  label?: string;
  caption?: string;
  isDisabled?: boolean;
  isIntermediate?: boolean;
  hasOutline?: boolean;
  className?: string;
};
