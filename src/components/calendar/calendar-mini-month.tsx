'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  AVAILABLE_CALENDAR_MONTHS,
  formatDayAndMonthRomanian,
  formatFullRomanianDate,
  ROMANIAN_WEEKDAY_SHORT_HEADERS,
  type CalendarGridCell,
  type CalendarMonthOption,
} from '@/lib/calendar-utils';
import { formatPrice } from '@/lib/format';
import { formatDurationLabel } from '@/lib/labels';
import type { DepartureWithTrip } from '@/types';

export interface CalendarMiniMonthProps {
  currentMonth: CalendarMonthOption;
  cells: CalendarGridCell[];
  selectedDate: string | null;
  selectedDateDepartures: DepartureWithTrip[];
  isFilteredByDay: boolean;
  onSelectDate: (isoDate: string) => void;
  onFilterBySelectedDate: (isoDate: string) => void;
  onClearDayFilter: () => void;
  onChangeMonth: (monthValue: string) => void;
}

export default function CalendarMiniMonth({
  currentMonth,
  cells,
  selectedDate,
  selectedDateDepartures,
  isFilteredByDay,
  onSelectDate,
  onFilterBySelectedDate,
  onClearDayFilter,
  onChangeMonth,
}: CalendarMiniMonthProps) {
  const currentMonthIndex = AVAILABLE_CALENDAR_MONTHS.findIndex(
    (m) => m.value === currentMonth.value,
  );
  const prevMonthOption =
    currentMonthIndex > 0
      ? AVAILABLE_CALENDAR_MONTHS[currentMonthIndex - 1]
      : null;
  const nextMonthOption =
    currentMonthIndex >= 0 &&
    currentMonthIndex < AVAILABLE_CALENDAR_MONTHS.length - 1
      ? AVAILABLE_CALENDAR_MONTHS[currentMonthIndex + 1]
      : null;

  // Afișăm primele 3 excursii în secțiunea de sub mini-calendar
  const previewDepartures = selectedDateDepartures.slice(0, 3);

  return (
    <aside className="rounded-xl border-0 bg-[#F7F7F7] p-4 sm:p-5">
      {/* Header Mini-Calendar: Lună An + Săgeți < > */}
      <div className="flex items-center justify-between gap-2 pb-2">
        <h2 className="font-sans text-lg sm:text-xl font-bold text-[#1F284B]">
          {currentMonth.label}
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              prevMonthOption && onChangeMonth(prevMonthOption.value)
            }
            disabled={!prevMonthOption}
            aria-label="Luna anterioară"
            className="flex h-7 w-7 items-center justify-center rounded-full border-0 bg-white text-[#2C2C2C] transition hover:bg-teal hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              nextMonthOption && onChangeMonth(nextMonthOption.value)
            }
            disabled={!nextMonthOption}
            aria-label="Luna următoare"
            className="flex h-7 w-7 items-center justify-center rounded-full border-0 bg-white text-[#2C2C2C] transition hover:bg-teal hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Antet zile săptămână: Lu Ma Mi Jo Vi Să Du */}
      <div className="mt-2 grid grid-cols-7 text-center text-[11px] font-bold text-[#777777] pb-2">
        {ROMANIAN_WEEKDAY_SHORT_HEADERS.map((dayHeader) => (
          <span key={dayHeader} className="py-1">
            {dayHeader}
          </span>
        ))}
      </div>

      {/* Grila 7x6 de zile fără borderuri */}
      <div
        role="grid"
        aria-label={`Calendar ${currentMonth.label}`}
        className="grid grid-cols-7 gap-1 rounded-lg bg-white p-2 border-0"
      >
        {cells.map((cell) => {
          const isSelected =
            cell.isCurrentMonth && cell.isoDate === selectedDate;
          const hasDepartures =
            cell.isCurrentMonth && cell.departures.length > 0;

          return (
            <button
              key={cell.isoDate}
              type="button"
              disabled={!cell.isCurrentMonth}
              onClick={() => {
                if (cell.isCurrentMonth) {
                  onSelectDate(cell.isoDate);
                }
              }}
              aria-label={`${cell.dayNumber} ${currentMonth.label}${
                hasDepartures
                  ? ` — ${cell.departures.length} plecări`
                  : ''
              }`}
              aria-pressed={isSelected}
              className={clsx(
                'relative flex h-10 flex-col items-center justify-center rounded-md p-0.5 text-xs transition-colors focus:outline-none',
                !cell.isCurrentMonth &&
                  'text-[#909090]/40 cursor-default',
                cell.isCurrentMonth &&
                  !isSelected &&
                  !cell.isHighlighted &&
                  'hover:bg-[#F7F7F7]',
                cell.isCurrentMonth &&
                  cell.isHighlighted &&
                  !isSelected &&
                  'bg-teal-muted/60',
              )}
            >
              <span
                className={clsx(
                  'flex h-6 w-6 items-center justify-center rounded-full leading-none transition-all',
                  isSelected
                    ? 'bg-teal text-white font-bold'
                    : hasDepartures
                      ? 'font-bold text-[#1F284B]'
                      : cell.isCurrentMonth
                        ? 'font-normal text-[#2C2C2C]'
                        : 'font-normal text-[#909090]/50',
                )}
              >
                {cell.dayNumber}
              </span>

              {/* Bulina de status sub numărul zilei */}
              <span className="mt-0.5 h-1.5 flex items-center justify-center">
                {cell.status && (
                  <span
                    className={clsx(
                      'h-1.5 w-1.5 rounded-full',
                      cell.status === 'available' && 'bg-teal',
                      cell.status === 'last-seats' && 'bg-status-warning',
                      cell.status === 'sold-out' && 'bg-status-danger',
                    )}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legendă statusuri */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-[#777777]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal" />
          <span>Există plecări</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-status-warning" />
          <span>Ultimele locuri</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-status-danger" />
          <span>Sold out</span>
        </span>
      </div>

      {/* Secțiunea: Plecări în perioada selectată */}
      <div className="mt-5 pt-2">
        <p className="text-xs font-bold text-[#777777]">
          Plecări în perioada selectată
        </p>
        <h3 className="mt-0.5 font-sans text-base font-bold text-[#1F284B]">
          {selectedDate
            ? formatFullRomanianDate(selectedDate)
            : currentMonth.label}
        </h3>

        {previewDepartures.length > 0 ? (
          <div className="mt-3 space-y-2.5">
            {previewDepartures.map((dep) => {
              const image =
                dep.trip.images[0] ?? '/images/trips/brasov-bran-sinaia.svg';
              const durationText = formatDurationLabel(
                dep.trip.days,
                dep.trip.nights,
              );

              return (
                <Link
                  key={dep.id}
                  href={`/excursii/${dep.trip.slug}`}
                  className="group flex items-center justify-between gap-2.5 rounded-lg border-0 bg-white p-2.5 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[#F7F7F7]">
                      <Image
                        src={image}
                        alt={dep.trip.title}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="truncate text-xs font-bold text-[#2C2C2C] group-hover:text-teal transition-colors">
                        {dep.trip.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-[#777777]">
                        {durationText}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0 text-right">
                    <div className="text-xs font-bold text-[#2C2C2C] whitespace-nowrap">
                      {formatPrice(dep.price)}{' '}
                      <span className="text-[10px] font-normal text-[#777777]">
                        / pers.
                      </span>
                    </div>
                    <span
                      className={clsx(
                        'mt-1 inline-flex items-center rounded-[3px] px-2 py-0.5 text-[10px] font-bold text-white leading-tight',
                        dep.status === 'available' && 'bg-teal',
                        dep.status === 'last-seats' && 'bg-status-warning',
                        dep.status === 'sold-out' && 'bg-status-danger',
                      )}
                    >
                      {dep.availableSeats > 0
                        ? `${dep.availableSeats} locuri`
                        : 'Sold out'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-3 rounded-lg border-0 bg-white p-3 text-center text-xs text-[#777777]">
            Nu există plecări programate în această zi. Alege o zi marcată cu
            bulină din calendar.
          </div>
        )}

        {/* Link de filtrare a listei centrale pe ziua selectată */}
        {selectedDate && selectedDateDepartures.length > 0 && (
          <div className="mt-3.5 pt-1">
            {isFilteredByDay ? (
              <button
                type="button"
                onClick={onClearDayFilter}
                className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:underline"
              >
                <span>Vezi toate plecările din {currentMonth.label}</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onFilterBySelectedDate(selectedDate)}
                className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:underline"
              >
                <span>
                  Vezi toate excursiile din{' '}
                  {formatDayAndMonthRomanian(selectedDate)}
                </span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
