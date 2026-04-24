export type CreditCardInputFieldProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  isDisabled?: boolean;
  className?: string;
};
