'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';
import FieldError from '@/components/ui/form-fields/field-error';
import FieldHelperText from '@/components/ui/form-fields/field-helper-text';
import InputIconOnClear from '@/components/ui/form-fields/field-clear-btn';

const inputClasses = {
  base: 'block w-full border-0 bg-[#F7F7F7] text-[#2C2C2C] font-normal transition duration-200 placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-teal/25 disabled:opacity-60 disabled:cursor-not-allowed',
  size: {
    sm: 'px-3 py-1.5 text-xs h-9',
    DEFAULT: 'px-4 py-2.5 text-sm h-11',
    lg: 'px-5 py-3 text-base h-12',
    xl: 'px-6 py-3.5 text-base h-14',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    DEFAULT: 'rounded-[4px]',
    lg: 'rounded-lg',
    pill: 'rounded-full',
  },
  variant: {
    outline: {
      base: 'border-0 bg-[#F7F7F7] focus:bg-[#F7F7F7] focus:ring-2 focus:ring-teal/25',
      error: 'bg-status-danger-light focus:ring-2 focus:ring-status-danger/30',
    },
    flat: {
      base: 'border-0 bg-[#F7F7F7] focus:bg-[#F7F7F7] focus:ring-2 focus:ring-teal/25',
      error: 'bg-status-danger-light focus:ring-2 focus:ring-status-danger/30',
    },
  },
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: keyof typeof inputClasses.variant;
  size?: keyof typeof inputClasses.size;
  rounded?: keyof typeof inputClasses.rounded;
  label?: string;
  error?: string;
  helperText?: React.ReactNode;
  clearable?: boolean;
  onClearClick?: (event: React.MouseEvent) => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  labelClassName?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant = 'flat',
      size = 'DEFAULT',
      rounded = 'DEFAULT',
      disabled,
      placeholder,
      label,
      error,
      clearable,
      onClearClick,
      startIcon,
      endIcon,
      labelClassName,
      inputClassName,
      helperText,
      ...inputProps
    },
    ref,
  ) => {
    const variantStyle = inputClasses.variant[variant];
    return (
      <div className={clsx('flex flex-col w-full', className)}>
        {label && (
          <label className={clsx('block text-sm font-bold text-[#2C2C2C] mb-1.5', labelClassName)}>
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {startIcon && (
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#909090]">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={clsx(
              inputClasses.base,
              inputClasses.size[size],
              inputClasses.rounded[rounded],
              error ? variantStyle.error : variantStyle.base,
              startIcon && 'pl-10',
              (endIcon || clearable) && 'pr-10',
              inputClassName,
            )}
            {...inputProps}
          />
          {clearable && (
            <div className="absolute right-3 flex items-center">
              <InputIconOnClear onClick={onClearClick} />
            </div>
          )}
          {endIcon && !clearable && (
            <div className="absolute right-3.5 flex items-center justify-center pointer-events-none text-[#909090]">
              {endIcon}
            </div>
          )}
        </div>
        <FieldHelperText>{helperText}</FieldHelperText>
        <FieldError error={error} />
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
