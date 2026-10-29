'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  HeartIcon,
  CalendarDaysIcon,
  PhoneIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolidIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { formatPrice, formatShortDate } from '@/lib/format';
import { formatDurationLabel } from '@/lib/labels';
import { getDepartureStatus } from '@/lib/trips';
import type { Departure, Trip } from '@/types';
import BookingRequestModal from './booking-request-modal';

export interface BookingSidebarProps {
  trip: Trip;
  departures: Departure[];
  startingPrice: number | null;
}

export default function BookingSidebar({
  trip,
  departures,
  startingPrice,
}: BookingSidebarProps) {
  const firstAvailable =
    departures.find((d) => d.availableSeats > 0) ?? departures[0] ?? null;

  const [selectedDepartureId, setSelectedDepartureId] = useState<string>(
    firstAvailable?.id ?? '',
  );
  const [seats, setSeats] = useState<number>(2);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);

  const selectedDeparture =
    departures.find((d) => d.id === selectedDepartureId) ?? firstAvailable;

  const maxSeats = Math.max(1, selectedDeparture?.availableSeats ?? 1);
  const displayPrice =
    selectedDeparture?.price ?? startingPrice ?? trip.departures[0]?.price ?? 0;

  const durationLabel = formatDurationLabel(trip.days, trip.nights);

  const handleSelectDeparture = (dep: Departure) => {
    if (dep.availableSeats <= 0) return;
    setSelectedDepartureId(dep.id);
    if (seats > dep.availableSeats) {
      setSeats(Math.max(1, dep.availableSeats));
    }
  };

  const handleDecrement = () => {
    setSeats((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setSeats((prev) => Math.min(maxSeats, prev + 1));
  };

  const seatSelectionHref = `/excursii/${trip.slug}/locuri?departure=${encodeURIComponent(
    selectedDeparture?.id ?? '',
  )}&seats=${seats}`;

  return (
    <>
      <div className="rounded-xl border-0 bg-white p-5 sm:p-6 shadow-float">
        {/* Header: Preț + Inimioară */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-normal text-[#777777]">de la</span>
            <span className="font-sans text-3xl sm:text-4xl font-bold text-[#1F284B]">
              {formatPrice(displayPrice)}
            </span>
            <span className="text-xs sm:text-sm text-[#777777]">/ persoană</span>
          </div>

          <button
            type="button"
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-label="Salvează la favorite"
            className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-[#F7F7F7] text-[#2C2C2C] transition hover:text-teal"
          >
            {isFavorite ? (
              <HeartSolidIcon className="h-5 w-5 text-status-danger" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Rating + Link Citește recenziile */}
        <div className="mt-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-[#008489]" />
            <span className="font-bold text-[#2C2C2C]">
              {trip.rating.toFixed(1)}
            </span>
            <span className="text-[#777777]">({trip.reviewCount} recenzii)</span>
          </div>
          <a
            href="#recenzii"
            className="font-bold text-teal transition hover:underline"
          >
            Citește recenziile →
          </a>
        </div>

        {/* Cele 4 mini-atribute pe un rând */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg bg-[#F7F7F7] px-3 py-2.5 text-[11px] font-bold text-[#2C2C2C]">
          <span className="inline-flex items-center gap-1">
            <CalendarDaysIcon className="h-3.5 w-3.5 text-teal" />
            {durationLabel}
          </span>
          {trip.transportIncluded && (
            <span className="inline-flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-teal"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-10A2.25 2.25 0 0 1 4.5 4.25h15A2.25 2.25 0 0 1 21.75 6.5v10a2.25 2.25 0 0 1-2.25 2.25h-.75"
                />
              </svg>
              Transport inclus
            </span>
          )}
          {trip.hotelStars > 0 && (
            <span className="inline-flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-teal"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m16.5-18v18m-13.5-15h4.5a1.5 1.5 0 0 1 1.5 1.5v13.5h-7.5V4.5A1.5 1.5 0 0 1 6 3Z"
                />
              </svg>
              Hotel {trip.hotelStars}★
            </span>
          )}
          {trip.nights > 0 && (
            <span className="inline-flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-teal"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513"
                />
              </svg>
              Mic dejun inclus
            </span>
          )}
        </div>

        {/* Selector „Alege data plecării” */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1F284B]">Alege data plecării</h3>
            <Link
              href="/calendar"
              className="text-xs font-bold text-teal transition hover:underline"
            >
              Vezi toate datele →
            </Link>
          </div>

          <div className="mt-2.5 space-y-2" role="radiogroup" aria-label="Alege data plecării">
            {departures.map((dep) => {
              const status = getDepartureStatus(dep);
              const isSelected = selectedDeparture?.id === dep.id;
              const isSoldOut = status === 'sold-out';

              return (
                <button
                  key={dep.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={isSoldOut}
                  onClick={() => handleSelectDeparture(dep)}
                  className={clsx(
                    'flex w-full items-center justify-between rounded-lg border-0 px-3.5 py-2.5 text-left transition',
                    isSoldOut
                      ? 'cursor-not-allowed bg-[#F7F7F7] opacity-60'
                      : isSelected
                        ? 'bg-teal-muted ring-2 ring-teal'
                        : 'bg-[#F7F7F7] hover:bg-[#EFEFEF]',
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio circle */}
                    <span
                      className={clsx(
                        'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full',
                        isSelected
                          ? 'bg-teal'
                          : 'bg-white',
                      )}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>

                    <div>
                      <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C]">
                        {formatShortDate(dep.startDate)}
                      </span>
                      <span
                        className={clsx(
                          'block text-[11px] font-bold',
                          status === 'available' && 'text-teal',
                          status === 'last-seats' && 'text-status-warning',
                          status === 'sold-out' && 'text-status-danger',
                        )}
                      >
                        {isSoldOut
                          ? 'Locuri epuizate (Sold out)'
                          : `Locuri disponibile: ${dep.availableSeats}`}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-bold text-[#2C2C2C]">
                      {formatPrice(dep.price)}
                    </span>
                    <span className="text-[11px] text-[#777777]"> / persoană</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selector „Număr persoane” */}
        <div className="mt-4">
          <span className="block text-xs font-bold text-[#1F284B]">
            Număr persoane
          </span>
          <div className="mt-1.5 flex h-10 items-center justify-between rounded-[4px] border-0 bg-[#F7F7F7] px-2">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={seats <= 1}
              aria-label="Scade numărul de persoane"
              className="flex h-7 w-8 items-center justify-center rounded text-[#2C2C2C] transition hover:bg-white disabled:opacity-40"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold text-[#2C2C2C]">{seats}</span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={seats >= maxSeats}
              aria-label="Crește numărul de persoane"
              className="flex h-7 w-8 items-center justify-center rounded text-[#2C2C2C] transition hover:bg-white disabled:opacity-40"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Buton principal Teal „Alege locurile în autocar →” */}
        <div className="mt-5">
          <Link
            href={seatSelectionHref}
            className="flex w-full items-center justify-center gap-2 rounded-[3px] bg-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-hover"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
            <span>Alege locurile în autocar →</span>
          </Link>
        </div>

        {/* Cele două butoane secundare dedesubt */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setRequestModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-[3px] border-0 bg-[#F7F7F7] px-3 py-2.5 text-xs font-bold text-[#2C2C2C] transition hover:bg-[#EBEBEB]"
          >
            <CalendarDaysIcon className="h-4 w-4 text-teal flex-shrink-0" />
            <span>Solicită rezervare</span>
          </button>

          <a
            href="tel:+37360123456"
            className="flex items-center justify-center gap-2 rounded-[3px] border-0 bg-[#F7F7F7] px-3 py-2 text-left text-xs text-[#2C2C2C] transition hover:bg-[#EBEBEB]"
          >
            <PhoneIcon className="h-4 w-4 text-teal flex-shrink-0" />
            <div className="leading-tight">
              <span className="block text-[10px] font-bold text-[#777777]">
                Contactează-ne
              </span>
              <span className="block text-[11px] font-bold text-[#2C2C2C]">
                +373 60 123 456
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Modalul „Solicită rezervare” */}
      <BookingRequestModal
        open={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        trip={trip}
        selectedDeparture={selectedDeparture ?? null}
        seats={seats}
      />
    </>
  );
}
