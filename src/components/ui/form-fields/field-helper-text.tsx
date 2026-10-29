import clsx from 'clsx';

export interface FieldHelperTextProps extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  className?: string;
}

export default function FieldHelperText({
  tag = 'div',
  children,
  className,
}: React.PropsWithChildren<FieldHelperTextProps>) {
  if (!children) return null;
  const Component = tag;
  return (
    <Component className={clsx('text-xs text-gray-light mt-1', className)}>
      {children}
    </Component>
  );
}
