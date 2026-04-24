export type StepperProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  step?: number;
  min?: number;
  max?: number;
  currency?: string;
  decimals?: number;
  isDisabled?: boolean;
  className?: string;
};
