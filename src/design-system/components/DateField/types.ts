export type DateFieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  error?: string;
  isDisabled?: boolean;
  className?: string;
};
