'use client';

import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface InputIconClearProps {
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}

export default function InputIconOnClear({
  onClick,
  className,
}: InputIconClearProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center rounded-full p-0.5 text-gray hover:text-navy hover:bg-gray-lighter transition-colors',
        className,
      )}
      aria-label="Șterge"
    >
      <XMarkIcon className="h-4 w-4" />
    </button>
  );
}
