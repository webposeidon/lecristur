import clsx from 'clsx';

const animations = {
  blink: 'animate-pulse',
  scaleUp: 'animate-bounce',
};

const sizes = {
  sm: 'w-1 h-1',
  DEFAULT: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
  xl: 'w-2.5 h-2.5',
};

const gapBasedOnSize = {
  sm: 'gap-1',
  DEFAULT: 'gap-1.5',
  lg: 'gap-1.5',
  xl: 'gap-2',
};

const colors = {
  DEFAULT: 'bg-navy',
  primary: 'bg-gold',
  secondary: 'bg-navy-light',
  danger: 'bg-status-danger',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  current: 'bg-current',
};

export type LoaderSizeTypes = keyof typeof sizes;
export type LoaderColorTypes = keyof typeof colors;
export type LoaderAnimationTypes = keyof typeof animations;

export interface LoaderTypes extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  size?: LoaderSizeTypes;
  color?: LoaderColorTypes;
  animation?: LoaderAnimationTypes;
  className?: string;
}

export default function Loader({
  tag = 'div',
  size = 'DEFAULT',
  color = 'DEFAULT',
  animation = 'blink',
  className,
}: LoaderTypes) {
  const Component = tag;
  return (
    <Component className={clsx('flex items-center', gapBasedOnSize[size], className)}>
      <span className={clsx('rounded-full', sizes[size], colors[color], animations[animation])} />
      <span className={clsx('rounded-full opacity-75', sizes[size], colors[color], animations[animation])} />
      <span className={clsx('rounded-full opacity-50', sizes[size], colors[color], animations[animation])} />
    </Component>
  );
}

Loader.displayName = 'Loader';
