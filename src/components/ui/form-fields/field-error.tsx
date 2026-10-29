import clsx from 'clsx';

interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  error: string | null | undefined;
  className?: string;
}

export default function FieldError({
  tag = 'div',
  error,
  className,
}: FieldErrorProps) {
  if (!error) return null;
  const Component = tag;
  return (
    <Component role="alert" className={clsx('text-xs text-status-danger mt-1 font-medium', className)}>
      {error}
    </Component>
  );
}
