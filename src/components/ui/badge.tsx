import clsx from 'clsx';

const classes = {
  base: 'inline-flex items-center justify-center font-bold leading-none tracking-wide border-0',
  size: {
    sm: 'px-2 py-0.5 text-[11px]',
    DEFAULT: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
    xl: 'px-4 py-2 text-base',
  },
  dot: {
    size: {
      sm: 'w-1.5 h-1.5',
      DEFAULT: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
      xl: 'w-3 h-3',
    },
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-[4px]',
    lg: 'rounded-lg',
    pill: 'rounded-full',
    DEFAULT: 'rounded-[4px]',
  },
  variant: {
    solid: {
      color: {
        DEFAULT: 'bg-teal text-white',
        teal: 'bg-teal text-white',
        navy: 'bg-[#1F284B] text-white',
        gold: 'bg-teal text-white',
        popular: 'bg-teal text-white',
        natura: 'bg-teal-hover text-white',
        cultural: 'bg-[#1F284B] text-white',
        citybreak: 'bg-teal-light text-white',
        exclusiv: 'bg-[#2C2C2C] text-white',
        success: 'bg-status-success text-white',
        warning: 'bg-status-warning text-white',
        danger: 'bg-status-danger text-white',
        info: 'bg-status-info text-white',
      },
    },
    flat: {
      color: {
        DEFAULT: 'bg-[#F7F7F7] text-[#2C2C2C]',
        teal: 'bg-teal-muted text-teal',
        navy: 'bg-[#F7F7F7] text-[#1F284B]',
        gold: 'bg-teal-muted text-teal',
        popular: 'bg-teal-muted text-teal',
        natura: 'bg-teal-muted text-teal-hover',
        cultural: 'bg-[#F7F7F7] text-[#1F284B]',
        citybreak: 'bg-teal-muted text-teal',
        exclusiv: 'bg-[#F7F7F7] text-[#2C2C2C]',
        success: 'bg-status-success-light text-status-success',
        warning: 'bg-status-warning-light text-status-warning',
        danger: 'bg-status-danger-light text-status-danger',
        info: 'bg-status-info-light text-status-info',
      },
    },
    outline: {
      color: {
        DEFAULT: 'bg-[#F7F7F7] text-[#2C2C2C]',
        teal: 'bg-teal-muted text-teal',
        navy: 'bg-[#F7F7F7] text-[#1F284B]',
        gold: 'bg-teal-muted text-teal',
        popular: 'bg-teal-muted text-teal',
        natura: 'bg-teal-muted text-teal-hover',
        cultural: 'bg-[#F7F7F7] text-[#1F284B]',
        citybreak: 'bg-teal-muted text-teal',
        exclusiv: 'bg-[#F7F7F7] text-[#2C2C2C]',
        success: 'bg-status-success-light text-status-success',
        warning: 'bg-status-warning-light text-status-warning',
        danger: 'bg-status-danger-light text-status-danger',
        info: 'bg-status-info-light text-status-info',
      },
    },
  },
};

export type BadgeColor = keyof (typeof classes.variant)['solid']['color'];

export interface BadgeProps {
  color?: BadgeColor;
  variant?: keyof typeof classes.variant;
  size?: keyof typeof classes.size;
  renderAsDot?: boolean;
  rounded?: keyof typeof classes.rounded;
  className?: string;
}

export default function Badge({
  renderAsDot = false,
  size = 'DEFAULT',
  color = 'DEFAULT',
  variant = 'solid',
  rounded = 'DEFAULT',
  children,
  className,
}: React.PropsWithChildren<BadgeProps>) {
  const styles = classes.variant[variant];
  return (
    <span
      className={clsx(
        classes.base,
        renderAsDot ? classes.dot.size[size] : classes.size[size],
        styles.color[color],
        classes.rounded[rounded],
        className,
      )}
    >
      {!renderAsDot ? children : null}
    </span>
  );
}

Badge.displayName = 'Badge';
