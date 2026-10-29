'use client';

import clsx from 'clsx';
import Slider from 'rc-slider';
import type { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface RangeSliderProps extends SliderProps {
  className?: string;
}

export default function RangeSlider({
  className,
  ...props
}: RangeSliderProps) {
  return (
    <div
      className={clsx(
        'w-full py-2',
        '[&>.rc-slider-rail]:bg-[#E2E2E2] [&>.rc-slider-rail]:h-1.5',
        '[&>.rc-slider-track]:bg-teal [&>.rc-slider-track]:h-1.5',
        '[&>.rc-slider-handle]:w-4 [&>.rc-slider-handle]:h-4 [&>.rc-slider-handle]:bg-white [&>.rc-slider-handle]:border-2 [&>.rc-slider-handle]:border-teal [&>.rc-slider-handle]:shadow-sm [&>.rc-slider-handle]:opacity-100 [&>.rc-slider-handle]:-mt-1.5 [&>.rc-slider-handle:hover]:scale-110 [&>.rc-slider-handle:active]:scale-110 [&>.rc-slider-handle-dragging]:!shadow-none [&>.rc-slider-handle-dragging]:!border-teal',
        className,
      )}
    >
      <Slider {...props} />
    </div>
  );
}

RangeSlider.displayName = 'RangeSlider';
