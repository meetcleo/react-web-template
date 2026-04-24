export type AmountInputProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  currency?: string;
  decimals?: number;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
};
