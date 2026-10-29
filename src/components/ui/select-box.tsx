'use client';

import clsx from 'clsx';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export type OptionType = {
  label: string;
  value?: any;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export interface SelectBoxProps {
  options: OptionType[];
  value: OptionType;
  onChange: (value: OptionType) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  optionsContainerClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
}

export default function SelectBox({
  label,
  value,
  options,
  onChange,
  className,
  buttonClassName,
  optionsContainerClassName,
  labelClassName,
  disabled,
}: SelectBoxProps) {
  return (
    <div className={clsx('relative w-full', className)}>
      {label && (
        <label className={clsx('block text-sm font-bold text-[#2C2C2C] mb-1.5', labelClassName)}>
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton
            className={clsx(
              'relative flex h-11 w-full cursor-pointer items-center justify-between rounded-[4px] border-0 bg-[#F7F7F7] px-4 py-2.5 text-left text-sm text-[#2C2C2C] transition focus:outline-none focus:ring-2 focus:ring-teal/25 disabled:cursor-not-allowed disabled:opacity-60',
              buttonClassName,
            )}
          >
            <span className="flex items-center gap-2 truncate">
              {value?.icon && <span>{value.icon}</span>}
              <span className="block truncate font-normal">{value?.label}</span>
            </span>
            <span className="pointer-events-none flex items-center pl-2 text-[#909090]">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className={clsx(
                'absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-lg border-0 bg-white py-1.5 text-sm shadow-float focus:outline-none',
                optionsContainerClassName,
              )}
            >
              {options.map((option, index) => (
                <ListboxOption
                  key={index}
                  value={option}
                  disabled={option.disabled}
                  className={({ active, selected }) =>
                    clsx(
                      'relative cursor-pointer select-none px-4 py-2.5 transition-colors',
                      active ? 'bg-[#F7F7F7] text-teal' : 'text-[#2C2C2C]',
                      selected && 'font-bold text-teal bg-[#F7F7F7]',
                      option.disabled && 'cursor-not-allowed opacity-40',
                    )
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 truncate">
                        {option.icon && <span>{option.icon}</span>}
                        <span className={clsx('block truncate', selected ? 'font-bold' : 'font-normal')}>
                          {option.label}
                        </span>
                      </span>
                      {selected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                      )}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
