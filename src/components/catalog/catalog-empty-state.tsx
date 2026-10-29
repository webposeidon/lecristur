'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTripQueryParams } from '@/hooks/use-trip-query-params';

export default function CatalogEmptyState() {
  const { resetAllFilters } = useTripQueryParams();

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-0 bg-[#F7F7F7] p-8 text-center sm:p-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-teal">
        <MagnifyingGlassIcon className="h-8 w-8" />
      </div>

      <h3 className="mt-4 font-sans text-xl font-bold text-[#1F284B] sm:text-2xl">
        Nicio excursie găsită
      </h3>

      <p className="mt-2 max-w-md text-xs sm:text-sm text-[#777777]">
        Nu am găsit nicio excursie care să corespundă criteriilor sau filtrelor
        selectate. Încearcă să relaxezi filtrele sau să cauți o altă destinație.
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => resetAllFilters({ scroll: true })}
          className="inline-flex items-center justify-center rounded-[3px] bg-teal px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-teal-hover"
        >
          Resetează toate filtrele
        </button>
      </div>
    </div>
  );
}
