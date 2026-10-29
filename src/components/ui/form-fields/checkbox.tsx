'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon } from '@/components/icons/check-icon';
import FieldError from '@/components/ui/form-fields/field-error';

const sizeClasses = {
  sm: 'h-4 w-4',
  DEFAULT: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: keyof typeof sizeClasses;
  label?: React.ReactNode;
  count?: number | string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'DEFAULT',
      label,
      count,
      disabled,
      error,
      className,
      containerClassName,
      labelClassName,
      ...checkboxProps
    },
    ref,
  ) => {
    return (
      <div className={clsx('flex flex-col', className)}>
        <label
          className={clsx(
            'flex items-center justify-between cursor-pointer select-none group',
            disabled && 'cursor-not-allowed opacity-50',
            containerClassName,
          )}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <input
                ref={ref}
                type="checkbox"
                disabled={disabled}
                className={clsx(
                  sizeClasses[size],
                  'peer appearance-none rounded-[4px] border-0 bg-[#F7F7F7] transition-all',
                  'checked:bg-teal focus:ring-2 focus:ring-teal/25 focus:outline-none',
                )}
                {...checkboxProps}
              />
              <CheckIcon
                className={clsx(
                  'pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100',
                  size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5',
                )}
              />
            </div>
            {label && (
              <span className={clsx('text-sm font-normal text-[#2C2C2C] group-hover:text-teal transition-colors', labelClassName)}>
                {label}
              </span>
            )}
          </div>
          {count !== undefined && (
            <span className="text-xs font-normal text-[#909090]">
              ({count})
            </span>
          )}
        </label>
        <FieldError error={error} />
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
