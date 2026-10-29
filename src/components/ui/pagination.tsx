'use client';

import clsx from 'clsx';
import RcPagination, { PaginationProps as RcPaginationProps } from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const localeRo = {
  items_per_page: '/ pagină',
  jump_to: 'Mergi la',
  jump_to_confirm: 'confirmă',
  page: 'Pagina',
  prev_page: 'Pagina precedentă',
  next_page: 'Pagina următoare',
  prev_5: '5 pagini în urmă',
  next_5: '5 pagini înainte',
  prev_3: '3 pagini în urmă',
  next_3: '3 pagini înainte',
  page_size: 'Mărime pagină',
};

export interface PaginationProps extends RcPaginationProps {
  className?: string;
}

export default function Pagination({
  className,
  locale = localeRo,
  ...props
}: PaginationProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        '[&>.rc-pagination]:flex [&>.rc-pagination]:items-center [&>.rc-pagination]:gap-1.5',
        '[&_.rc-pagination-item]:flex [&_.rc-pagination-item]:items-center [&_.rc-pagination-item]:justify-center [&_.rc-pagination-item]:min-w-[36px] [&_.rc-pagination-item]:h-9 [&_.rc-pagination-item]:rounded-[4px] [&_.rc-pagination-item]:border-0 [&_.rc-pagination-item]:bg-[#F7F7F7] [&_.rc-pagination-item]:text-sm [&_.rc-pagination-item]:font-bold [&_.rc-pagination-item]:text-[#2C2C2C] [&_.rc-pagination-item]:transition-colors',
        '[&_.rc-pagination-item:hover]:text-teal',
        '[&_.rc-pagination-item-active]:!bg-teal [&_.rc-pagination-item-active]:!border-0 [&_.rc-pagination-item-active>a]:!text-white',
        '[&_.rc-pagination-prev]:flex [&_.rc-pagination-prev]:items-center [&_.rc-pagination-prev]:justify-center [&_.rc-pagination-prev]:min-w-[36px] [&_.rc-pagination-prev]:h-9 [&_.rc-pagination-prev]:rounded-[4px] [&_.rc-pagination-prev]:border-0 [&_.rc-pagination-prev]:bg-[#F7F7F7] [&_.rc-pagination-prev]:transition-colors',
        '[&_.rc-pagination-next]:flex [&_.rc-pagination-next]:items-center [&_.rc-pagination-next]:justify-center [&_.rc-pagination-next]:min-w-[36px] [&_.rc-pagination-next]:h-9 [&_.rc-pagination-next]:rounded-[4px] [&_.rc-pagination-next]:border-0 [&_.rc-pagination-next]:bg-[#F7F7F7] [&_.rc-pagination-next]:transition-colors',
        '[&_.rc-pagination-disabled]:opacity-40 [&_.rc-pagination-disabled]:cursor-not-allowed',
        className,
      )}
    >
      <RcPagination
        locale={locale}
        prevIcon={<ChevronLeftIcon className="h-4 w-4 text-[#777777]" />}
        nextIcon={<ChevronRightIcon className="h-4 w-4 text-[#777777]" />}
        jumpPrevIcon={<span className="text-[#909090]">•••</span>}
        jumpNextIcon={<span className="text-[#909090]">•••</span>}
        {...props}
      />
    </div>
  );
}

Pagination.displayName = 'Pagination';
