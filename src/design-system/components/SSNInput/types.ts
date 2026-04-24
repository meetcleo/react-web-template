export type SSNInputProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  isDisabled?: boolean;
  className?: string;
};
