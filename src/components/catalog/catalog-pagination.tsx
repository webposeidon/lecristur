'use client';

import { useMemo } from 'react';
import Pagination from '@/components/ui/pagination';
import SelectBox, { type OptionType } from '@/components/ui/select-box';
import { useTripQueryParams } from '@/hooks/use-trip-query-params';
import type { PageSizeOption } from '@/types';

export interface CatalogPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: PageSizeOption;
}

const PAGE_SIZE_OPTIONS: OptionType[] = [
  { label: 'Afișează 12 excursii pe pagină', value: 12 },
  { label: 'Afișează 24 excursii pe pagină', value: 24 },
  { label: 'Afișează 48 excursii pe pagină', value: 48 },
];

export default function CatalogPagination({
  currentPage,
  totalItems,
  pageSize,
}: CatalogPaginationProps) {
  const { updateParams } = useTripQueryParams();

  const selectedPageSizeOption = useMemo(() => {
    return (
      PAGE_SIZE_OPTIONS.find((opt) => opt.value === pageSize) ??
      PAGE_SIZE_OPTIONS[0]
    );
  }, [pageSize]);

  const handlePageChange = (page: number) => {
    updateParams({ page }, { scroll: true, resetPage: false });
  };

  const handlePageSizeChange = (option: OptionType) => {
    if (option.value) {
      updateParams(
        { pageSize: Number(option.value), page: 1 },
        { scroll: true, resetPage: false },
      );
    }
  };

  if (totalItems <= 0) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-0 pt-6 sm:flex-row">
      {/* Paginare numerotată */}
      <div className="flex-1 flex justify-center sm:justify-start">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      {/* Selector mărime pagină */}
      <div className="w-full sm:w-auto min-w-[240px]">
        <SelectBox
          value={selectedPageSizeOption}
          options={PAGE_SIZE_OPTIONS}
          onChange={handlePageSizeChange}
          buttonClassName="!py-2 !px-3 text-xs sm:text-sm !rounded-[4px]"
        />
      </div>
    </div>
  );
}
