'use client';

import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import RangeSlider from '@/components/ui/range-slider';
import Checkbox from '@/components/ui/form-fields/checkbox';
import { useTripQueryParams } from '@/hooks/use-trip-query-params';
import {
  DURATION_BUCKET_LABELS,
  TRIP_TYPE_LABELS,
} from '@/lib/labels';
import type { DurationBucket, FilterFacets, TripType } from '@/types';

export interface CatalogSidebarProps {
  facets: FilterFacets;
  className?: string;
  onClose?: () => void;
  isMobileDrawer?: boolean;
}

const DURATION_KEYS: DurationBucket[] = ['1', '2', '3', '4+'];
const TYPE_KEYS: TripType[] = [
  'cultural',
  'nature',
  'adventure',
  'city-break',
  'exclusive',
];

export default function CatalogSidebar({
  facets,
  className,
  onClose,
  isMobileDrawer = false,
}: CatalogSidebarProps) {
  const {
    getParam,
    getArrayParam,
    updateParams,
    toggleArrayValue,
    clearParams,
    resetAllFilters,
    hasActiveFilters,
  } = useTripQueryParams();

  // 1. Căutare text cu debounce
  const rawQuery = getParam('q');
  const [searchInput, setSearchInput] = useState(rawQuery);

  useEffect(() => {
    setSearchInput(rawQuery);
  }, [rawQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== rawQuery) {
        updateParams({ q: searchInput });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput, rawQuery, updateParams]);

  // 2. Destinații
  const activeDestinations = getArrayParam('destinatie');
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const visibleDestinations = showAllDestinations
    ? facets.destinations
    : facets.destinations.slice(0, 8);

  // 3. Date plecare
  const dateFrom = getParam('deLa');
  const dateTo = getParam('panaLa');

  // 4. Durată
  const activeDurations = getArrayParam('durata');

  // 5. Buget (Range Slider)
  const rawMinPrice = getParam('bugetMin');
  const rawMaxPrice = getParam('bugetMax');
  const parsedMin = rawMinPrice ? Number(rawMinPrice) : 0;
  const parsedMax = rawMaxPrice ? Number(rawMaxPrice) : 300;

  const [localBudget, setLocalBudget] = useState<[number, number]>([
    Number.isNaN(parsedMin) ? 0 : parsedMin,
    Number.isNaN(parsedMax) ? 300 : parsedMax,
  ]);

  useEffect(() => {
    setLocalBudget([
      Number.isNaN(parsedMin) ? 0 : parsedMin,
      Number.isNaN(parsedMax) ? 300 : parsedMax,
    ]);
  }, [parsedMin, parsedMax]);

  const handleBudgetChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length >= 2) {
      setLocalBudget([value[0], value[1]]);
    }
  };

  const handleBudgetCommit = (value: number | number[]) => {
    if (Array.isArray(value) && value.length >= 2) {
      const min = value[0];
      const max = value[1];
      updateParams({
        bugetMin: min > 0 ? min : null,
        bugetMax: max < 300 ? max : null,
      });
    }
  };

  // 6. Tip excursie
  const activeTypes = getArrayParam('tip');

  const searchInputId = useId();
  const dateFromId = useId();
  const dateToId = useId();

  return (
    <aside
      className={clsx(
        'w-full bg-white border-0',
        !isMobileDrawer && 'pr-2',
        isMobileDrawer && 'p-6',
        className,
      )}
    >
      {/* Header Filtre */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-sans text-lg font-bold text-[#1F284B]">
          Filtrează rezultatele
        </h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => resetAllFilters()}
              className="text-xs font-bold text-teal transition-colors hover:text-teal-hover hover:underline"
            >
              Resetează
            </button>
          )}
          {isMobileDrawer && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-[#777777] hover:bg-[#F7F7F7] hover:text-[#2C2C2C]"
              aria-label="Închide filtrele"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-7">
        {/* 1. Căutare Text */}
        <div>
          <label htmlFor={searchInputId} className="sr-only">
            Caută excursie sau destinație
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#909090]">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </span>
            <input
              id={searchInputId}
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Caută excursie, destinație..."
              className="w-full rounded-[4px] border-0 bg-[#F7F7F7] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#2C2C2C] placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>
        </div>

        {/* 2. Destinații */}
        <div>
          <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#1F284B]">
            Destinații
          </span>
          <div className="space-y-2.5">
            {/* Opțiunea „Toate destinațiile (N)” */}
            <Checkbox
              name="toate-destinatiile"
              label={`Toate destinațiile (${facets.totalTrips})`}
              checked={activeDestinations.length === 0}
              onChange={() => clearParams('destinatie')}
            />

            {/* Lista destinațiilor din facets */}
            {visibleDestinations.map((dest) => (
              <Checkbox
                key={dest.slug}
                name={`dest-${dest.slug}`}
                label={dest.name}
                count={dest.count}
                checked={activeDestinations.includes(dest.slug)}
                onChange={() => toggleArrayValue('destinatie', dest.slug)}
              />
            ))}

            {/* Buton „Vezi mai multe” / „Vezi mai puține” */}
            {facets.destinations.length > 8 && (
              <button
                type="button"
                onClick={() => setShowAllDestinations((prev) => !prev)}
                className="mt-2 text-xs font-bold text-teal hover:text-teal-hover transition-colors inline-flex items-center gap-1"
              >
                <span>{showAllDestinations ? 'Vezi mai puține' : 'Vezi mai multe'}</span>
                <span aria-hidden="true">{showAllDestinations ? '↑' : '>'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. Data plecării (Două input-uri native type="date") */}
        <div>
          <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#1F284B]">
            Data plecare
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label htmlFor={dateFromId} className="mb-1 block text-[11px] font-bold text-[#777777]">
                De la
              </label>
              <input
                id={dateFromId}
                type="date"
                value={dateFrom}
                onChange={(e) => updateParams({ deLa: e.target.value || null })}
                className="w-full rounded-[4px] border-0 bg-[#F7F7F7] px-2.5 py-2 text-xs font-bold text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            <div>
              <label htmlFor={dateToId} className="mb-1 block text-[11px] font-bold text-[#777777]">
                Până la
              </label>
              <input
                id={dateToId}
                type="date"
                value={dateTo}
                onChange={(e) => updateParams({ panaLa: e.target.value || null })}
                className="w-full rounded-[4px] border-0 bg-[#F7F7F7] px-2.5 py-2 text-xs font-bold text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>
        </div>

        {/* 4. Durată */}
        <div>
          <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#1F284B]">
            Durată
          </span>
          <div className="space-y-2.5">
            <Checkbox
              name="toate-duratele"
              label="Toate duratele"
              checked={activeDurations.length === 0}
              onChange={() => clearParams('durata')}
            />
            {DURATION_KEYS.map((bucket) => (
              <Checkbox
                key={bucket}
                name={`durata-${bucket}`}
                label={DURATION_BUCKET_LABELS[bucket]}
                count={facets.durations[bucket]}
                checked={activeDurations.includes(bucket)}
                onChange={() => toggleArrayValue('durata', bucket)}
              />
            ))}
          </div>
        </div>

        {/* 5. Buget (€/persoană) */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F284B]">
              Buget (€/persoană)
            </span>
            <span className="text-xs font-bold text-[#2C2C2C]">
              {localBudget[0]} € – {localBudget[1]} €
            </span>
          </div>

          <div className="px-2 pt-2">
            <RangeSlider
              range
              min={0}
              max={300}
              step={5}
              value={localBudget}
              onChange={handleBudgetChange}
              onChangeComplete={handleBudgetCommit}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-[#909090]">
            <span>0 €</span>
            <span>300 €</span>
          </div>
        </div>

        {/* 6. Tip excursie */}
        <div>
          <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#1F284B]">
            Tip excursie
          </span>
          <div className="space-y-2.5">
            <Checkbox
              name="toate-tipurile"
              label="Toate tipurile"
              checked={activeTypes.length === 0}
              onChange={() => clearParams('tip')}
            />
            {TYPE_KEYS.map((typeKey) => (
              <Checkbox
                key={typeKey}
                name={`type-${typeKey}`}
                label={TRIP_TYPE_LABELS[typeKey]}
                count={facets.types[typeKey]}
                checked={activeTypes.includes(typeKey)}
                onChange={() => toggleArrayValue('tip', typeKey)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Buton aplică pentru mobile drawer */}
      {isMobileDrawer && onClose && (
        <div className="sticky bottom-0 -mx-6 -mb-6 mt-6 border-0 bg-white p-4 shadow-float">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-[3px] bg-teal py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-teal-hover"
          >
            Vezi rezultatele
          </button>
        </div>
      )}
    </aside>
  );
}
