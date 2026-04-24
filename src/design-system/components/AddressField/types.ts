export type AddressFieldProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  isDisabled?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
};
