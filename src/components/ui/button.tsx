'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';
import Loader from '@/components/ui/loader/loader';

const classes = {
  base: 'inline-flex font-bold items-center justify-center border-0 focus:outline-none transition-colors duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100',
  size: {
    sm: 'px-3.5 py-2 text-xs',
    DEFAULT: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-3.5 text-base',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    DEFAULT: 'rounded-[3px]',
    lg: 'rounded-lg',
    pill: 'rounded-full',
  },
  variant: {
    solid: {
      base: 'border-0',
      color: {
        DEFAULT: 'bg-teal text-white hover:bg-teal-hover focus:ring-2 focus:ring-teal/25',
        teal: 'bg-teal text-white hover:bg-teal-hover focus:ring-2 focus:ring-teal/25',
        gold: 'bg-teal text-white hover:bg-teal-hover focus:ring-2 focus:ring-teal/25',
        navy: 'bg-[#1F284B] text-white hover:bg-[#2C2C2C] focus:ring-2 focus:ring-[#1F284B]/20',
        danger: 'bg-status-danger text-white hover:opacity-90 focus:ring-2 focus:ring-status-danger/25',
        success: 'bg-status-success text-white hover:opacity-90 focus:ring-2 focus:ring-status-success/25',
      },
    },
    flat: {
      base: 'border-0',
      color: {
        DEFAULT: 'bg-[#F7F7F7] text-[#2C2C2C] hover:text-teal focus:ring-2 focus:ring-teal/20',
        teal: 'bg-teal-muted text-teal hover:bg-teal/15 focus:ring-2 focus:ring-teal/20',
        gold: 'bg-[#F7F7F7] text-teal hover:bg-teal-muted focus:ring-2 focus:ring-teal/20',
        navy: 'bg-[#F7F7F7] text-[#2C2C2C] hover:text-teal focus:ring-2 focus:ring-teal/20',
        danger: 'bg-status-danger-light text-status-danger hover:opacity-90',
        success: 'bg-status-success-light text-status-success hover:opacity-90',
      },
    },
    outline: {
      base: 'bg-[#F7F7F7] border-0',
      color: {
        DEFAULT: 'text-[#2C2C2C] hover:text-teal focus:ring-2 focus:ring-teal/20',
        teal: 'text-teal hover:bg-teal hover:text-white focus:ring-2 focus:ring-teal/20',
        gold: 'text-teal hover:bg-teal hover:text-white focus:ring-2 focus:ring-teal/20',
        navy: 'text-[#2C2C2C] hover:bg-[#1F284B] hover:text-white focus:ring-2 focus:ring-[#1F284B]/20',
        danger: 'text-status-danger hover:bg-status-danger hover:text-white',
        success: 'text-status-success hover:bg-status-success hover:text-white',
      },
    },
    text: {
      base: 'bg-transparent border-0',
      color: {
        DEFAULT: 'text-[#777777] hover:text-teal',
        teal: 'text-teal hover:text-teal-hover',
        gold: 'text-teal hover:text-teal-hover',
        navy: 'text-[#2C2C2C] hover:text-teal',
        danger: 'text-status-danger hover:opacity-80',
        success: 'text-status-success hover:opacity-80',
      },
    },
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: keyof typeof classes.variant;
  size?: keyof typeof classes.size;
  rounded?: keyof typeof classes.rounded;
  color?: 'DEFAULT' | 'teal' | 'gold' | 'navy' | 'danger' | 'success';
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      type = 'button',
      variant = 'solid',
      size = 'DEFAULT',
      rounded = 'DEFAULT',
      color = 'DEFAULT',
      disabled,
      ...buttonProps
    },
    ref,
  ) => {
    const variantStyle = classes.variant[variant];
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={clsx(
          classes.base,
          classes.size[size],
          classes.rounded[rounded],
          variantStyle.base,
          variantStyle.color[color],
          isLoading && 'pointer-events-none relative',
          className,
        )}
        {...buttonProps}
      >
        {isLoading ? (
          <>
            <span className="invisible opacity-0">{children}</span>
            <span className="absolute inset-0 flex h-full w-full items-center justify-center">
              <Loader tag="span" color="current" size={size} animation="scaleUp" />
            </span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
