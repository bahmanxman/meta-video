import type { InputHTMLAttributes, ReactNode } from 'react';

import { inputClassName, labelClassName } from './styles';

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export function FormField({ id, label, children, className }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {children}
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange'>;

export function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  className,
  ...inputProps
}: TextFieldProps) {
  return (
    <FormField id={id} label={label} className={className}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClassName}
        {...inputProps}
      />
    </FormField>
  );
}

type NumberFieldProps = {
  id: string;
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'type' | 'value' | 'onChange'
>;

export function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  step,
  className,
  ...inputProps
}: NumberFieldProps) {
  return (
    <FormField id={id} label={label} className={className}>
      <input
        id={id}
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) =>
          onChange(e.target.value === '' ? '' : Number(e.target.value))
        }
        className={inputClassName}
        {...inputProps}
      />
    </FormField>
  );
}
