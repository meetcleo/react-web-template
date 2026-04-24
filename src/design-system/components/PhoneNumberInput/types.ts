export type PhoneNumberInputProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  countryCode?: string;
  error?: string;
  isDisabled?: boolean;
  className?: string;
};
