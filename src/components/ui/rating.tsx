'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';
import RcRate from 'rc-rate';
import type { RateProps as RcRateProps } from 'rc-rate/lib/Rate';
import type { StarProps as RcStarProps } from 'rc-rate/lib/Star';
import { StarIcon } from '@heroicons/react/24/solid';

const rateClasses = {
  base: 'flex items-center [&>li]:cursor-pointer [&.rc-rate-disabled>li]:cursor-default [&>li]:relative [&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li]:inline-block text-[#E2E2E2]',
  size: {
    sm: 'h-3.5 w-3.5',
    DEFAULT: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6',
  },
  firstStar:
    '[&>li>div>.rc-rate-star-first]:absolute [&>li>div>.rc-rate-star-first]:left-0 rtl:[&>li>div>.rc-rate-star-first]:right-0 [&>li>div>.rc-rate-star-first]:top-0 [&>li>div>.rc-rate-star-first]:w-1/2 [&>li>div>.rc-rate-star-first]:h-full [&>li>div>.rc-rate-star-first]:overflow-hidden',
  color:
    '[&>.rc-rate-star-half>div>.rc-rate-star-first]:text-[#008489] [&>.rc-rate-star-full>div]:text-[#008489]',
  transition:
    '[&>li>div]:transition-transform [&>li>div]:duration-200 [&>.rc-rate-star:hover]:scale-110',
};

export interface RateProps extends Omit<RcRateProps, 'character' | 'className'> {
  label?: string;
  size?: keyof typeof rateClasses.size;
  character?: React.ReactNode | Array<React.ReactNode>;
  characterClassName?: string;
  error?: string;
  labelClassName?: string;
  rateClassName?: string;
  className?: string;
}

const Rate = forwardRef<unknown, RateProps>(
  (
    {
      size = 'DEFAULT',
      disabled = false,
      character = <StarIcon />,
      label,
      error,
      labelClassName,
      characterClassName,
      rateClassName,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx('inline-flex flex-col', className)}>
        {label && (
          <span className={clsx('block text-xs font-bold text-[#2C2C2C] mb-1', labelClassName)}>
            {label}
          </span>
        )}
        <RcRate
          ref={ref as any}
          disabled={disabled}
          character={({ index }: RcStarProps) => (
            <div
              className={clsx(
                '[&>svg]:fill-current',
                rateClasses.size[size],
                characterClassName,
              )}
            >
              {Array.isArray(character) ? character[index as number] : character}
            </div>
          )}
          className={clsx(
            rateClasses.base,
            rateClasses.firstStar,
            rateClasses.color,
            !disabled && rateClasses.transition,
            rateClassName,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-status-danger">{error}</p>}
      </div>
    );
  },
);

Rate.displayName = 'Rate';
export default Rate;
