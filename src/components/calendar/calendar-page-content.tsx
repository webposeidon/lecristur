'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Pagination from '@/components/ui/pagination';
import SelectBox, { type OptionType } from '@/components/ui/select-box';
import CalendarFilterBar from './calendar-filter-bar';
import CalendarMiniMonth from './calendar-mini-month';
import CalendarDepartureCard from './calendar-departure-card';
import CalendarRightSidebar from './calendar-right-sidebar';
import {
  buildCalendarMonthGrid,
  DEFAULT_CALENDAR_MONTH,
  formatFullRomanianDate,
  groupDeparturesByDate,
  type CalendarMonthOption,
} from '@/lib/calendar-utils';
import { TRIP_SORT_LABELS } from '@/lib/labels';
import type {
  DepartureWithTrip,
  DestinationSummary,
  TripSortOption,
  TripSummary,
} from '@/types';

export interface CalendarPageContentProps {
  currentMonth: CalendarMonthOption;
  departures: DepartureWithTrip[];
  featuredTrips: TripSummary[];
  destinations: DestinationSummary[];
  initialFilters: {
    destination: string;
    duration: string;
    type: string;
    passengers: number;
    sort: TripSortOption;
    dayFilter?: string;
  };
}

export default function CalendarPageContent({
  currentMonth,
  departures,
  featuredTrips,
  destinations,
  initialFilters,
}: CalendarPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Grupăm toate plecările lunii pe zile (inclusiv cele sold-out, pentru bulinele din mini-calendar)
  const departuresByDate = useMemo(
    () => groupDeparturesByDate(departures),
    [departures],
  );

  // Construim grila de 42 de zile pentru mini-calendar
  const calendarCells = useMemo(
    () =>
      buildCalendarMonthGrid(
        currentMonth.year,
        currentMonth.month,
        departures,
      ),
    [currentMonth.year, currentMonth.month, departures],
  );

  // Determinăm ziua selectată implicit în mini-calendar (15 Noiembrie 2026 dacă are plecări, altfel prima zi cu plecări din lună)
  const defaultSelectedDate = useMemo(() => {
    if (
      initialFilters.dayFilter &&
      departuresByDate.has(initialFilters.dayFilter)
    ) {
      return initialFilters.dayFilter;
    }
    const nov15 = `${currentMonth.value}-15`;
    if (departuresByDate.has(nov15)) {
      return nov15;
    }
    const firstDayWithDepartures = Array.from(departuresByDate.keys()).sort()[0];
    return firstDayWithDepartures ?? `${currentMonth.value}-15`;
  }, [currentMonth.value, departuresByDate, initialFilters.dayFilter]);

  const [selectedDate, setSelectedDate] = useState<string>(defaultSelectedDate);
  const [activeDayFilter, setActiveDayFilter] = useState<string | null>(
    initialFilters.dayFilter ?? null,
  );
  const [sortBy, setSortBy] = useState<TripSortOption>(initialFilters.sort);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const rawPage = Number(searchParams?.get('pagina') ?? '1');
    return Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;
  });
  const [pageSize, setPageSize] = useState<number>(5);

  const CALENDAR_PAGE_SIZE_OPTIONS: OptionType[] = useMemo(
    () => [
      { label: '5 plecări / pagină', value: 5 },
      { label: '10 plecări / pagină', value: 10 },
      { label: '20 plecări / pagină', value: 20 },
    ],
    [],
  );

  const selectedPageSizeOption = useMemo(
    () =>
      CALENDAR_PAGE_SIZE_OPTIONS.find((opt) => opt.value === pageSize) ??
      CALENDAR_PAGE_SIZE_OPTIONS[0],
    [CALENDAR_PAGE_SIZE_OPTIONS, pageSize],
  );

  useEffect(() => {
    setSelectedDate(defaultSelectedDate);
  }, [defaultSelectedDate]);

  useEffect(() => {
    setActiveDayFilter(initialFilters.dayFilter ?? null);
    setCurrentPage(1);
  }, [initialFilters.dayFilter]);

  useEffect(() => {
    setSortBy(initialFilters.sort);
  }, [initialFilters.sort]);

  // Resetăm pagina la 1 când se schimbă luna sau lista de plecări
  useEffect(() => {
    setCurrentPage(1);
  }, [currentMonth.value, departures]);

  const selectedDateDepartures = useMemo(
    () => departuresByDate.get(selectedDate) ?? [],
    [departuresByDate, selectedDate],
  );

  // Lista centrală de plecări (filtrată opțional pe ziua activă și sortată conform selectorului)
  const centralDepartures = useMemo(() => {
    const baseList = departures.filter((dep) => {
      if (activeDayFilter && dep.startDate !== activeDayFilter) {
        return false;
      }
      // În lista centrală de excursii disponibile excludem cursele epuizate, cu excepția cazului în care s-a filtrat explicit pe o zi sold-out
      if (!activeDayFilter && dep.availableSeats <= 0) {
        return false;
      }
      return true;
    });

    return [...baseList].sort((a, b) => {
      if (sortBy === 'price-asc') {
        if (a.price !== b.price) return a.price - b.price;
        return a.startDate.localeCompare(b.startDate);
      }
      if (sortBy === 'price-desc') {
        if (a.price !== b.price) return b.price - a.price;
        return a.startDate.localeCompare(b.startDate);
      }
      if (sortBy === 'popular') {
        if (b.trip.popularity !== a.trip.popularity) {
          return b.trip.popularity - a.trip.popularity;
        }
        return a.startDate.localeCompare(b.startDate);
      }
      // Default: 'date-asc' (cu prioritizarea excursiilor principale din BASE_TRIPS pentru afișarea de referință)
      const aIsBase = a.trip.popularity >= 89 ? 1 : 0;
      const bIsBase = b.trip.popularity >= 89 ? 1 : 0;
      if (aIsBase !== bIsBase) {
        return bIsBase - aIsBase;
      }
      const dateDiff = a.startDate.localeCompare(b.startDate);
      if (dateDiff !== 0) return dateDiff;
      return b.trip.popularity - a.trip.popularity;
    });
  }, [departures, activeDayFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(centralDepartures.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedDepartures = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return centralDepartures.slice(startIndex, startIndex + pageSize);
  }, [centralDepartures, safeCurrentPage, pageSize]);

  const updateUrlParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    for (const [key, val] of Object.entries(updates)) {
      if (val === null || val === '') {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleSelectDate = (isoDate: string) => {
    setSelectedDate(isoDate);
    if (activeDayFilter) {
      setActiveDayFilter(isoDate);
      setCurrentPage(1);
      updateUrlParams({ zi: isoDate, pagina: null });
    }
  };

  const handleFilterBySelectedDate = (isoDate: string) => {
    setSelectedDate(isoDate);
    setActiveDayFilter(isoDate);
    setCurrentPage(1);
    updateUrlParams({ zi: isoDate, pagina: null });
  };

  const handleClearDayFilter = () => {
    setActiveDayFilter(null);
    setCurrentPage(1);
    updateUrlParams({ zi: null, pagina: null });
  };

  const handleChangeMonth = (monthValue: string) => {
    setActiveDayFilter(null);
    setCurrentPage(1);
    updateUrlParams({
      luna:
        monthValue === DEFAULT_CALENDAR_MONTH.value ? null : monthValue,
      zi: null,
      pagina: null,
    });
  };

  const handleSortChange = (nextSort: TripSortOption) => {
    setSortBy(nextSort);
    setCurrentPage(1);
    updateUrlParams({
      sort: nextSort === 'date-asc' ? null : nextSort,
      pagina: null,
    });
  };

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    updateUrlParams({
      pagina: nextPage <= 1 ? null : String(nextPage),
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const handlePageSizeChange = (option: OptionType) => {
    if (option.value) {
      setPageSize(Number(option.value));
      setCurrentPage(1);
      updateUrlParams({ pagina: null });
    }
  };

  return (
    <div className="container-fluid relative z-20 space-y-8">
      {/* Bara de filtre de sus (5 dropdown-uri + buton Caută) */}
      <CalendarFilterBar
        initialDestination={initialFilters.destination}
        initialMonth={currentMonth.value}
        initialDuration={initialFilters.duration}
        initialType={initialFilters.type}
        initialPassengers={initialFilters.passengers}
      />

      {/* Layout pe 3 coloane: Stânga (Mini-calendar) | Centru (Lista de plecări) | Dreapta (Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coloana stângă: Mini-calendar interactiv + Plecări în perioada selectată */}
        <div className="lg:col-span-3">
          <CalendarMiniMonth
            currentMonth={currentMonth}
            cells={calendarCells}
            selectedDate={selectedDate}
            selectedDateDepartures={selectedDateDepartures}
            isFilteredByDay={Boolean(activeDayFilter)}
            onSelectDate={handleSelectDate}
            onFilterBySelectedDate={handleFilterBySelectedDate}
            onClearDayFilter={handleClearDayFilter}
            onChangeMonth={handleChangeMonth}
          />
        </div>

        {/* Coloana centrală: Toate plecările din [Lună An] */}
        <div className="lg:col-span-6 min-w-0">
          <div className="bg-white border-0">
            {/* Antet listă centrală + Sortare */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#1F284B]">
                  {activeDayFilter
                    ? `Plecări din ${formatFullRomanianDate(activeDayFilter)}`
                    : `Toate plecările din ${currentMonth.label}`}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#777777]">
                  <span>
                    {centralDepartures.length}{' '}
                    {centralDepartures.length === 1
                      ? 'excursie disponibilă'
                      : 'excursii disponibile'}
                  </span>
                  {activeDayFilter && (
                    <button
                      type="button"
                      onClick={handleClearDayFilter}
                      className="inline-flex items-center gap-1 rounded-[3px] bg-teal-muted px-2.5 py-0.5 text-xs font-bold text-teal transition hover:bg-teal hover:text-white"
                    >
                      <span>Arată toată luna</span>
                      <XMarkIcon className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Selector Sortare */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <label
                  htmlFor="calendar-sort"
                  className="text-xs font-bold text-[#777777] whitespace-nowrap"
                >
                  Sortează după:
                </label>
                <div className="relative">
                  <select
                    id="calendar-sort"
                    value={sortBy}
                    onChange={(e) =>
                      handleSortChange(e.target.value as TripSortOption)
                    }
                    className="appearance-none rounded-[4px] border-0 bg-[#F7F7F7] py-2 pl-3 pr-8 text-xs font-bold text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-teal cursor-pointer"
                  >
                    <option value="date-asc">
                      {TRIP_SORT_LABELS['date-asc']}
                    </option>
                    <option value="price-asc">
                      {TRIP_SORT_LABELS['price-asc']}
                    </option>
                    <option value="price-desc">
                      {TRIP_SORT_LABELS['price-desc']}
                    </option>
                    <option value="popular">
                      {TRIP_SORT_LABELS['popular']}
                    </option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#777777]" />
                </div>
              </div>
            </div>

            {/* Lista cardurilor orizontale de plecări + Paginare */}
            {centralDepartures.length > 0 ? (
              <>
                <div className="mt-2 space-y-4">
                  {paginatedDepartures.map((dep) => (
                    <CalendarDepartureCard key={dep.id} departure={dep} />
                  ))}
                </div>

                {/* Bara de paginare în stilul tripfinder-hotel */}
                <div className="mt-8 pt-6 border-t border-[#F0F0F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Pagination
                      current={safeCurrentPage}
                      total={centralDepartures.length}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xs text-[#909090] whitespace-nowrap">
                      Pagina <strong className="text-[#2C2C2C]">{safeCurrentPage}</strong> din{' '}
                      <strong className="text-[#2C2C2C]">{totalPages}</strong>
                    </span>
                    <div className="w-[180px]">
                      <SelectBox
                        value={selectedPageSizeOption}
                        options={CALENDAR_PAGE_SIZE_OPTIONS}
                        onChange={handlePageSizeChange}
                        buttonClassName="!py-2 !px-3 text-xs !rounded-[4px]"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4 rounded-xl border-0 bg-[#F7F7F7] p-8 text-center">
                <h3 className="font-sans text-lg font-bold text-[#1F284B]">
                  Nicio plecare găsită pentru filtrele selectate
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#777777] max-w-md mx-auto">
                  Încearcă să selectezi o altă zi din calendar sau să resetezi
                  filtrele de destinație, durată și tip excursie.
                </p>
                {activeDayFilter && (
                  <button
                    type="button"
                    onClick={handleClearDayFilter}
                    className="mt-4 inline-flex items-center justify-center rounded-[3px] bg-teal px-4 py-2 text-xs font-bold text-white transition hover:bg-teal-hover"
                  >
                    Vezi toate plecările din {currentMonth.label}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Coloana dreaptă: Sidebar (Excursii recomandate, Destinații populare, Asistență) */}
        <div className="lg:col-span-3">
          <CalendarRightSidebar
            featuredTrips={featuredTrips}
            destinations={destinations}
          />
        </div>
      </div>
    </div>
  );
}
