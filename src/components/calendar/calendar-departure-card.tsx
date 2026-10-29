'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/20/solid';
import Badge, { type BadgeColor } from '@/components/ui/badge';
import { formatWeekdayRange } from '@/lib/calendar-utils';
import { formatPrice, formatShortDate } from '@/lib/format';
import {
  formatDurationLabel,
  TRIP_BADGE_LABELS,
  TRIP_TYPE_LABELS,
} from '@/lib/labels';
import type { DepartureWithTrip, TripBadge, TripType } from '@/types';

export interface CalendarDepartureCardProps {
  departure: DepartureWithTrip;
  className?: string;
}

const BADGE_COLOR_BY_BADGE: Record<TripBadge, BadgeColor> = {
  popular: 'popular',
  'new-tour': 'danger',
  exclusive: 'exclusiv',
  'city-break': 'danger',
  nature: 'natura',
  cultural: 'cultural',
};

const BADGE_COLOR_BY_TYPE: Record<TripType, BadgeColor> = {
  cultural: 'cultural',
  nature: 'natura',
  adventure: 'popular',
  'city-break': 'citybreak',
  exclusive: 'exclusiv',
};

export default function CalendarDepartureCard({
  departure,
  className,
}: CalendarDepartureCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { trip } = departure;
  const primaryImage =
    trip.images[0] ?? '/images/trips/brasov-bran-sinaia.svg';
  const durationLabel = formatDurationLabel(trip.days, trip.nights);
  const shortDate = formatShortDate(departure.startDate);
  const weekdayRange = formatWeekdayRange(
    departure.startDate,
    departure.endDate,
  );

  const badgeLabel = trip.badge
    ? TRIP_BADGE_LABELS[trip.badge]
    : TRIP_TYPE_LABELS[trip.type];
  const badgeColor: BadgeColor = trip.badge
    ? BADGE_COLOR_BY_BADGE[trip.badge]
    : BADGE_COLOR_BY_TYPE[trip.type];

  const isLowOrSoldOut =
    departure.status === 'last-seats' || departure.status === 'sold-out';

  return (
    <article
      className={clsx(
        'group flex flex-col rounded-xl border-0 bg-[#F7F7F7] p-4 transition-colors duration-200',
        className,
      )}
    >
      {/* Partea de sus: Imagine + Info Excursie (Titlu, Badge, 4 Atribute) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 min-w-0">
        {/* Imagine */}
        <div className="relative aspect-[16/10] sm:aspect-auto sm:h-28 sm:w-40 md:w-44 flex-shrink-0 overflow-hidden rounded-lg bg-white">
          <Link href={`/excursii/${trip.slug}`} tabIndex={-1}>
            <Image
              src={primaryImage}
              alt={trip.title}
              fill
              sizes="(min-width: 640px) 176px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-label="Adaugă la favorite"
            className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
          >
            {isFavorite ? (
              <HeartSolidIcon className="h-4 w-4 text-status-danger" />
            ) : (
              <HeartIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Titlu + Badge + 4 Atribute */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/excursii/${trip.slug}`} className="min-w-0 max-w-full">
              <h3 className="font-sans text-base sm:text-lg font-bold text-[#2C2C2C] transition-colors group-hover:text-teal truncate">
                {trip.title}
              </h3>
            </Link>
            <Badge
              variant="solid"
              color={badgeColor}
              size="sm"
              rounded="DEFAULT"
              className="text-[10px] font-bold normal-case px-2 py-0.5 flex-shrink-0"
            >
              {badgeLabel}
            </Badge>
          </div>

          {/* Grila 2x2 de atribute */}
          <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-[#777777]">
            {/* 1. Durată */}
            <div className="flex items-center gap-1.5 min-w-0">
              <svg
                className="h-3.5 w-3.5 text-teal flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5"
                />
              </svg>
              <span className="truncate">{durationLabel}</span>
            </div>

            {/* 2. Hotel */}
            <div className="flex items-center gap-1.5 min-w-0">
              <svg
                className="h-3.5 w-3.5 text-teal flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m16.5-18v18m-13.5-15h4.5a1.5 1.5 0 0 1 1.5 1.5v13.5h-7.5V4.5A1.5 1.5 0 0 1 6 3Zm9 4.5h3m-3 4.5h3m-3 4.5h3"
                />
              </svg>
              <span className="truncate">
                {trip.hotelStars > 0
                  ? `Hotel ${trip.hotelStars}★`
                  : 'Excursie 1 zi'}
              </span>
            </div>

            {/* 3. Transport */}
            <div className="flex items-center gap-1.5 min-w-0">
              <svg
                className="h-3.5 w-3.5 text-teal flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-10A2.25 2.25 0 0 1 4.5 4.25h15A2.25 2.25 0 0 1 21.75 6.5v10a2.25 2.25 0 0 1-2.25 2.25h-.75"
                />
              </svg>
              <span className="truncate">Transport inclus</span>
            </div>

            {/* 4. Mic dejun inclus */}
            <div className="flex items-center gap-1.5 min-w-0">
              <svg
                className="h-3.5 w-3.5 text-teal flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="truncate">Mic dejun inclus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bară Info Plecare: Data plecare + Locuri disponibile + Preț + Link */}
      <div className="mt-3.5 rounded-lg bg-white px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 border-0">
        {/* Stânga: Dată plecare + Locuri disponibile */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs min-w-0">
          {/* Data + interval zile */}
          <div className="flex items-center gap-1.5 min-w-0">
            <svg
              className="h-4 w-4 text-teal flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5"
              />
            </svg>
            <div className="flex items-center gap-1 leading-tight">
              <span className="font-bold text-[#2C2C2C] whitespace-nowrap">
                {shortDate}
              </span>
              {weekdayRange && (
                <span className="text-[11px] text-[#777777] whitespace-nowrap">
                  ({weekdayRange})
                </span>
              )}
            </div>
          </div>

          {/* Locuri disponibile */}
          <div className="flex items-center gap-1.5 min-w-0">
            <svg
              className={clsx(
                'h-4 w-4 flex-shrink-0',
                isLowOrSoldOut ? 'text-status-danger' : 'text-teal',
              )}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-10A2.25 2.25 0 0 1 4.5 4.25h15A2.25 2.25 0 0 1 21.75 6.5v10a2.25 2.25 0 0 1-2.25 2.25h-.75m-6 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9-9.5h18"
              />
            </svg>
            <div className="flex items-center gap-1 leading-tight">
              <span
                className={clsx(
                  'font-bold whitespace-nowrap',
                  isLowOrSoldOut ? 'text-status-danger' : 'text-teal',
                )}
              >
                {departure.availableSeats > 0
                  ? `${departure.availableSeats} locuri disponibile`
                  : 'Sold out (0 locuri)'}
              </span>
              <span className="text-[11px] text-[#777777] whitespace-nowrap">
                din {departure.totalSeats}
              </span>
            </div>
          </div>
        </div>

        {/* Dreapta: Preț + Link CTA */}
        <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0">
          <div className="text-left sm:text-right leading-tight">
            <span className="font-sans text-lg font-bold text-[#2C2C2C]">
              {formatPrice(departure.price)}
            </span>
            <span className="text-[11px] text-[#777777] ml-1">
              / pers
            </span>
          </div>

          <Link
            href={`/excursii/${trip.slug}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-[3px] bg-teal hover:bg-teal-hover px-3.5 py-2 text-xs font-bold text-white transition-colors whitespace-nowrap"
          >
            <span>Vezi detalii</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
