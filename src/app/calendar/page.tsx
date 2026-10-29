import type { Metadata } from 'next';
import CalendarHero from '@/components/calendar/calendar-hero';
import CalendarPageContent from '@/components/calendar/calendar-page-content';
import {
  getDepartures,
  getDestinations,
  getFeaturedTrips,
} from '@/lib/api';
import { parseCalendarMonthParam } from '@/lib/calendar-utils';
import { getDestinationName } from '@/lib/labels';
import {
  VALID_DURATION_BUCKETS,
  VALID_SORT_OPTIONS,
  VALID_TRIP_TYPES,
} from '@/lib/trips';
import type { DurationBucket, TripSortOption, TripType } from '@/types';

export interface CalendarPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSingleParam(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value[0]?.trim();
  return undefined;
}

export async function generateMetadata({
  searchParams,
}: CalendarPageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const monthOption = parseCalendarMonthParam(resolved.luna);
  const destinatie = getSingleParam(resolved.destinatie);

  let title = `Calendarul plecărilor — ${monthOption.label} | LeCrisTur`;
  if (destinatie && destinatie !== 'all') {
    const destName = getDestinationName(destinatie);
    title = `Calendar plecări ${destName} (${monthOption.label}) | LeCrisTur`;
  }

  return {
    title,
    description:
      'Consultă calendarul plecărilor LeCrisTur actualizat în timp real. Alege data dorită, verifică locurile disponibile în autocar și rezervă excursia ta în România.',
    openGraph: {
      title,
      description:
        'Consultă calendarul plecărilor LeCrisTur actualizat în timp real și descoperă toate excursiile disponibile.',
      type: 'website',
      locale: 'ro_RO',
    },
  };
}

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const resolved = await searchParams;
  const currentMonth = parseCalendarMonthParam(resolved.luna);

  const rawDest = getSingleParam(resolved.destinatie) ?? 'all';
  const rawDuration = getSingleParam(resolved.durata) ?? 'all';
  const rawType = getSingleParam(resolved.tip) ?? 'all';
  const rawPassengers = Number(getSingleParam(resolved.persoane) ?? '2');
  const rawSort = getSingleParam(resolved.sort) ?? 'date-asc';
  const rawDay = getSingleParam(resolved.zi);

  const durationFilter = (VALID_DURATION_BUCKETS as readonly string[]).includes(
    rawDuration,
  )
    ? (rawDuration as DurationBucket)
    : undefined;

  const typeFilter = (VALID_TRIP_TYPES as readonly string[]).includes(rawType)
    ? (rawType as TripType)
    : undefined;

  const passengersFilter =
    Number.isInteger(rawPassengers) && rawPassengers >= 1 && rawPassengers <= 10
      ? rawPassengers
      : 2;

  const sortOption: TripSortOption = (
    VALID_SORT_OPTIONS as readonly string[]
  ).includes(rawSort)
    ? (rawSort as TripSortOption)
    : 'date-asc';

  const dayFilter =
    rawDay && /^\d{4}-\d{2}-\d{2}$/.test(rawDay) ? rawDay : undefined;

  const [departures, featuredTrips, destinations] = await Promise.all([
    getDepartures({
      year: currentMonth.year,
      month: currentMonth.month,
      destinatie: rawDest !== 'all' ? rawDest : undefined,
      durata: durationFilter,
      tip: typeFilter,
      persoane: passengersFilter,
      includeSoldOut: true,
      sort:
        sortOption === 'price-asc' || sortOption === 'price-desc'
          ? sortOption
          : 'date-asc',
    }),
    getFeaturedTrips(8),
    getDestinations(),
  ]);

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Antet alb curat Calendarul plecărilor + 5 USP-uri */}
      <CalendarHero />

      {/* Conținut interactiv: Bara de filtre + Layout 3 coloane */}
      <CalendarPageContent
        currentMonth={currentMonth}
        departures={departures}
        featuredTrips={featuredTrips}
        destinations={destinations}
        initialFilters={{
          destination: rawDest,
          duration: durationFilter ?? 'all',
          type: typeFilter ?? 'all',
          passengers: passengersFilter,
          sort: sortOption,
          dayFilter,
        }}
      />
    </div>
  );
}
