//
export type SelectProps = {
  onChange?: (value: any) => void;
  error?: boolean;
  isMulti?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;
