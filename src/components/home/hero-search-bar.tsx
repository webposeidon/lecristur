'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  DESTINATION_LABELS,
  DURATION_BUCKET_LABELS,
  TRIP_TYPE_LABELS,
} from '@/lib/labels';
import type { DurationBucket, TripType } from '@/types';

interface HeroSearchBarProps {
  className?: string;
}

export default function HeroSearchBar({ className }: HeroSearchBarProps) {
  const router = useRouter();

  const [destination, setDestination] = useState<string>('all');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [duration, setDuration] = useState<string>('all');
  const [tripType, setTripType] = useState<string>('all');
  const [passengers, setPassengers] = useState<string>('2');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (destination && destination !== 'all') {
      params.set('destinatie', destination);
    }
    if (departureDate) {
      params.set('deLa', departureDate);
    }
    if (duration && duration !== 'all') {
      params.set('durata', duration);
    }
    if (tripType && tripType !== 'all') {
      params.set('tip', tripType);
    }
    if (passengers && passengers !== '2') {
      params.set('persoane', passengers);
    }

    const query = params.toString();
    router.push(query ? `/excursii?${query}` : '/excursii');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'w-full bg-white rounded-xl shadow-float border-0 p-4 lg:p-5',
        className,
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-3.5">
        {/* 1. Destinație */}
        <div className="lg:flex-[1.2] min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] bg-[#F7F7F7] border-0">
          <MapPinIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="hero-destinatie"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider"
            >
              Destinație
            </label>
            <div className="relative flex items-center">
              <select
                id="hero-destinatie"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full appearance-none bg-transparent pr-6 text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
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

        {/* 2. Data plecare */}
        <div className="lg:flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] bg-[#F7F7F7] border-0">
          <CalendarDaysIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="hero-data"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider"
            >
              Data plecare
            </label>
            <div className="relative flex items-center">
              <input
                id="hero-data"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                aria-label="Data plecare"
                className="w-full min-w-0 max-w-full bg-transparent text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. Durată */}
        <div className="lg:flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] bg-[#F7F7F7] border-0">
          <ClockIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="hero-durata"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider"
            >
              Durată
            </label>
            <div className="relative flex items-center">
              <select
                id="hero-durata"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full appearance-none bg-transparent pr-6 text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
              >
                <option value="all">Oricare</option>
                {Object.entries(DURATION_BUCKET_LABELS).map(([bucket, label]) => (
                  <option key={bucket} value={bucket as DurationBucket}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-0 h-4 w-4 text-[#777777] flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* 4. Tip excursie */}
        <div className="lg:flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] bg-[#F7F7F7] border-0">
          <TagIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="hero-tip"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider"
            >
              Tip excursie
            </label>
            <div className="relative flex items-center">
              <select
                id="hero-tip"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full appearance-none bg-transparent pr-6 text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
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
        <div className="lg:flex-1 min-w-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] bg-[#F7F7F7] border-0">
          <UserGroupIcon className="h-5 w-5 text-[#008489] flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            <label
              htmlFor="hero-persoane"
              className="block text-[10px] font-bold text-[#909090] uppercase tracking-wider"
            >
              Număr persoane
            </label>
            <div className="relative flex items-center">
              <select
                id="hero-persoane"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full appearance-none bg-transparent pr-6 text-sm font-bold text-[#2C2C2C] focus:outline-none cursor-pointer truncate"
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

        {/* Buton Submit */}
        <div className="sm:col-span-2 lg:flex-none flex items-center flex-shrink-0">
          <button
            type="submit"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-[3px] bg-teal hover:bg-teal-hover text-white font-bold py-3.5 px-6 text-sm transition-colors duration-200 whitespace-nowrap border-0"
          >
            <span>Caută excursii</span>
            <span aria-hidden="true" className="text-base font-bold">&rarr;</span>
          </button>
        </div>
      </div>
    </form>
  );
}
