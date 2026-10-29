'use client';

import clsx from 'clsx';
import Checkbox from '@/components/ui/form-fields/checkbox';

export interface CheckboxOption {
  id: string;
  label: string;
  count?: number | string;
  checked?: boolean;
}

export interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  onChange: (option: CheckboxOption) => void;
  className?: string;
  labelClassName?: string;
}

export default function CheckboxGroup({
  label,
  options,
  onChange,
  className,
  labelClassName,
}: CheckboxGroupProps) {
  return (
    <div className={clsx('flex flex-col gap-2.5', className)}>
      {label && (
        <span className={clsx('block text-sm font-bold text-[#2C2C2C] mb-1', labelClassName)}>
          {label}
        </span>
      )}
      <div className="flex flex-col gap-2">
        {options.map((item) => (
          <Checkbox
            key={item.id}
            name={item.label}
            label={item.label}
            count={item.count}
            checked={item.checked}
            onChange={() => onChange(item)}
          />
        ))}
      </div>
    </div>
  );
}

CheckboxGroup.displayName = 'CheckboxGroup';
