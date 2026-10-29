'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  TagIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import {
  AVAILABLE_CALENDAR_MONTHS,
  DEFAULT_CALENDAR_MONTH,
} from '@/lib/calendar-utils';
import {
  DESTINATION_LABELS,
  DURATION_BUCKET_LABELS,
  TRIP_TYPE_LABELS,
} from '@/lib/labels';
import type { DurationBucket, TripType } from '@/types';

export interface CalendarFilterBarProps {
  initialDestination?: string;
  initialMonth?: string;
  initialDuration?: string;
  initialType?: string;
  initialPassengers?: number;
  className?: string;
}

export default function CalendarFilterBar({
  initialDestination = 'all',
  initialMonth = DEFAULT_CALENDAR_MONTH.value,
  initialDuration = 'all',
  initialType = 'all',
  initialPassengers = 2,
  className,
}: CalendarFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState<string>(initialDestination);
  const [month, setMonth] = useState<string>(initialMonth);
  const [duration, setDuration] = useState<string>(initialDuration);
  const [tripType, setTripType] = useState<string>(initialType);
  const [passengers, setPassengers] = useState<string>(
    String(initialPassengers),
  );

  useEffect(() => {
    setDestination(initialDestination);
    setMonth(initialMonth);
    setDuration(initialDuration);
    setTripType(initialType);
    setPassengers(String(initialPassengers));
  }, [
    initialDestination,
    initialMonth,
    initialDuration,
    initialType,
    initialPassengers,
  ]);

  const applyFiltersToUrl = (overrides?: {
    destination?: string;
    month?: string;
    duration?: string;
    tripType?: string;
    passengers?: string;
  }) => {
    const nextDest = overrides?.destination ?? destination;
    const nextMonth = overrides?.month ?? month;
    const nextDuration = overrides?.duration ?? duration;
    const nextType = overrides?.tripType ?? tripType;
    const nextPassengers = overrides?.passengers ?? passengers;

    const params = new URLSearchParams(searchParams?.toString() ?? '');

    // Când schimbăm filtrele principale sau luna, resetăm filtrul pe o singură zi și paginația
    params.delete('zi');
    params.delete('pagina');

    if (nextDest && nextDest !== 'all') {
      params.set('destinatie', nextDest);
    } else {
      params.delete('destinatie');
    }

    if (nextMonth && nextMonth !== DEFAULT_CALENDAR_MONTH.value) {
      params.set('luna', nextMonth);
    } else {
      params.delete('luna');
    }

    if (nextDuration && nextDuration !== 'all') {
      params.set('durata', nextDuration);
    } else {
      params.delete('durata');
    }

    if (nextType && nextType !== 'all') {
      params.set('tip', nextType);
    } else {
      params.delete('tip');
    }

    if (nextPassengers && nextPassengers !== '2') {
      params.set('persoane', nextPassengers);
    } else {
      params.delete('persoane');
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFiltersToUrl();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'w-full rounded-lg border-0 bg-white p-4 shadow-float',
        className,
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-3">
        {/* 1. Destinație */}
        <div className="lg:flex-[1.15] min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] border-0 bg-[#F7F7F7]">
          <MapPinIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="cal-destinatie"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider leading-tight"
            >
              Destinație
            </label>
            <div className="relative flex items-center">
              <select
                id="cal-destinatie"
                value={destination}
                onChange={(e) => {
                  const val = e.target.value;
                  setDestination(val);
                  applyFiltersToUrl({ destination: val });
                }}
                className="w-full appearance-none bg-transparent pr-6 text-xs xl:text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
              >
                <option value="all">Toate destinațiile</option>
                {Object.entries(DESTINATION_LABELS).map(([slug, name]) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-0 h-4 w-4 text-[#777777] flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* 2. Perioadă */}
        <div className="lg:flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] border-0 bg-[#F7F7F7]">
          <CalendarDaysIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="cal-perioada"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider leading-tight"
            >
              Perioadă
            </label>
            <div className="relative flex items-center">
              <select
                id="cal-perioada"
                value={month}
                onChange={(e) => {
                  const val = e.target.value;
                  setMonth(val);
                  applyFiltersToUrl({ month: val });
                }}
                className="w-full appearance-none bg-transparent pr-6 text-xs xl:text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
              >
                {AVAILABLE_CALENDAR_MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-0 h-4 w-4 text-[#777777] flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* 3. Durată */}
        <div className="lg:flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] border-0 bg-[#F7F7F7]">
          <ClockIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="cal-durata"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider leading-tight"
            >
              Durată
            </label>
            <div className="relative flex items-center">
              <select
                id="cal-durata"
                value={duration}
                onChange={(e) => {
                  const val = e.target.value;
                  setDuration(val);
                  applyFiltersToUrl({ duration: val });
                }}
                className="w-full appearance-none bg-transparent pr-6 text-xs xl:text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
              >
                <option value="all">Oricare</option>
                {Object.entries(DURATION_BUCKET_LABELS).map(
                  ([bucket, label]) => (
                    <option key={bucket} value={bucket as DurationBucket}>
                      {label}
                    </option>
                  ),
                )}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-0 h-4 w-4 text-[#777777] flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* 4. Tip excursie */}
        <div className="lg:flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] border-0 bg-[#F7F7F7]">
          <TagIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="cal-tip"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider leading-tight"
            >
              Tip excursie
            </label>
            <div className="relative flex items-center">
              <select
                id="cal-tip"
                value={tripType}
                onChange={(e) => {
                  const val = e.target.value;
                  setTripType(val);
                  applyFiltersToUrl({ tripType: val });
                }}
                className="w-full appearance-none bg-transparent pr-6 text-xs xl:text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
              >
                <option value="all">Toate tipurile</option>
                {Object.entries(TRIP_TYPE_LABELS).map(([type, label]) => (
                  <option key={type} value={type as TripType}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-0 h-4 w-4 text-[#777777] flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* 5. Număr persoane */}
        <div className="lg:flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] border-0 bg-[#F7F7F7]">
          <UserGroupIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="cal-persoane"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider leading-tight"
            >
              Număr persoane
            </label>
            <div className="relative flex items-center">
              <select
                id="cal-persoane"
                value={passengers}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassengers(val);
                  applyFiltersToUrl({ passengers: val });
                }}
                className="w-full appearance-none bg-transparent pr-6 text-xs xl:text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
              >
                <option value="1">1 persoană</option>
                <option value="2">2 persoane</option>
                <option value="3">3 persoane</option>
                <option value="4">4 persoane</option>
                <option value="5">5+ persoane</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-0 h-4 w-4 text-[#777777] flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Buton Submit „Caută” */}
        <div className="sm:col-span-2 lg:flex-none flex items-center flex-shrink-0">
          <button
            type="submit"
            className="w-full lg:w-36 inline-flex items-center justify-center rounded-[3px] border-0 bg-teal hover:bg-teal-hover text-white font-bold py-3.5 px-6 text-sm transition-colors duration-200"
          >
            Caută
          </button>
        </div>
      </div>
    </form>
  );
}
