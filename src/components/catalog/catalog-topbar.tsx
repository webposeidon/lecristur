'use client';

import { useMemo } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import SelectBox, { type OptionType } from '@/components/ui/select-box';
import { useTripQueryParams } from '@/hooks/use-trip-query-params';
import { TRIP_SORT_LABELS } from '@/lib/labels';
import type { TripSortOption } from '@/types';

export interface CatalogTopbarProps {
  totalCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onOpenMobileFilters: () => void;
}

const SORT_OPTIONS: OptionType[] = [
  { label: TRIP_SORT_LABELS.popular, value: 'popular' },
  { label: TRIP_SORT_LABELS['price-asc'], value: 'price-asc' },
  { label: TRIP_SORT_LABELS['price-desc'], value: 'price-desc' },
  { label: TRIP_SORT_LABELS['date-asc'], value: 'date-asc' },
];

export default function CatalogTopbar({
  totalCount,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
}: CatalogTopbarProps) {
  const { getParam, updateParams } = useTripQueryParams();
  const currentSort = (getParam('sort') as TripSortOption) || 'popular';

  const selectedSortOption = useMemo(() => {
    return (
      SORT_OPTIONS.find((opt) => opt.value === currentSort) ?? SORT_OPTIONS[0]
    );
  }, [currentSort]);

  const handleSortChange = (option: OptionType) => {
    if (option.value) {
      updateParams({ sort: option.value });
    }
  };

  const tripsCountLabel =
    totalCount === 1
      ? '1 excursie găsită'
      : `${totalCount} excursii găsite`;

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-0 pb-2">
      {/* Număr excursii găsite */}
      <div className="flex items-center gap-3">
        <h2 className="font-sans text-base sm:text-lg font-bold text-[#1F284B]">
          {tripsCountLabel}
        </h2>

        {/* Buton mobil pentru deschiderea filtrelor */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="inline-flex lg:hidden items-center gap-1.5 rounded-[4px] border-0 bg-[#F7F7F7] px-3 py-2 text-xs font-bold text-[#2C2C2C] transition hover:bg-teal hover:text-white"
          aria-label="Filtrează rezultatele"
        >
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
          <span>Filtre</span>
        </button>
      </div>

      {/* Sortare + Toggle Grid/Listă */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sortare */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs font-bold text-[#777777] whitespace-nowrap">
            Sortează după:
          </span>
          <div className="w-44 sm:w-52">
            <SelectBox
              value={selectedSortOption}
              options={SORT_OPTIONS}
              onChange={handleSortChange}
              buttonClassName="!py-2 !px-3 text-xs sm:text-sm !rounded-[4px]"
            />
          </div>
        </div>

        {/* Toggle Grid / Listă */}
        <div
          role="group"
          aria-label="Mod de vizualizare"
          className="hidden sm:inline-flex items-center rounded-[4px] border-0 bg-[#F7F7F7] p-1"
        >
          {/* Buton Grid */}
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            aria-pressed={viewMode === 'grid'}
            title="Afișare Grid"
            className={`flex h-8 w-8 items-center justify-center rounded-[3px] transition-colors ${
              viewMode === 'grid'
                ? 'bg-teal text-white'
                : 'text-[#777777] hover:text-[#2C2C2C]'
            }`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5ZM5 11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5ZM11 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5ZM13 11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2Z" />
            </svg>
          </button>

          {/* Buton Listă */}
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            aria-pressed={viewMode === 'list'}
            title="Afișare Listă"
            className={`flex h-8 w-8 items-center justify-center rounded-[3px] transition-colors ${
              viewMode === 'list'
                ? 'bg-teal text-white'
                : 'text-[#777777] hover:text-[#2C2C2C]'
            }`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 4.5A1.5 1.5 0 0 1 4.5 3h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 3 4.5Zm0 5.5A1.5 1.5 0 0 1 4.5 8.5h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 3 10Zm0 5.5A1.5 1.5 0 0 1 4.5 14h11a1.5 1.5 0 0 1 0 3h-11a1.5 1.5 0 0 1-1.5-1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
