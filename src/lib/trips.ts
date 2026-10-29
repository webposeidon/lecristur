import { z } from 'zod';
import { getDestinationName } from '@/lib/labels';
import type {
  Departure,
  DepartureStatus,
  DurationBucket,
  NormalizedTripFilterParams,
  PageSizeOption,
  PaginatedTripsResult,
  Trip,
  TripFilterParams,
  TripSortOption,
  TripSummary,
  TripType,
} from '@/types';

// TODO: înlocuiește cu data reală când se conectează API-ul
export const DEFAULT_TODAY = '2026-10-21';

export const VALID_DURATION_BUCKETS: readonly DurationBucket[] = [
  '1',
  '2',
  '3',
  '4+',
];

export const VALID_TRIP_TYPES: readonly TripType[] = [
  'cultural',
  'nature',
  'adventure',
  'city-break',
  'exclusive',
];

export const VALID_SORT_OPTIONS: readonly TripSortOption[] = [
  'popular',
  'price-asc',
  'price-desc',
  'date-asc',
];

export const VALID_PAGE_SIZES: readonly PageSizeOption[] = [12, 24, 48];

export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 300;
export const DEFAULT_PAGE_SIZE: PageSizeOption = 12;

export function normalizeDateString(date: string | Date = DEFAULT_TODAY): string {
  if (date instanceof Date) {
    if (Number.isNaN(date.getTime())) {
      return DEFAULT_TODAY;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const trimmed = date.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return DEFAULT_TODAY;
}

export function stripDiacritics(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function getDurationBucket(days: number): DurationBucket {
  if (days <= 1) return '1';
  if (days === 2) return '2';
  if (days === 3) return '3';
  return '4+';
}

/**
 * Returnează statusul unei plecări în funcție de locurile disponibile:
 * - 0 locuri -> 'sold-out'
 * - 1..8 locuri -> 'last-seats'
 * - >8 locuri -> 'available'
 */
export function getDepartureStatus(
  departureOrSeats: Pick<Departure, 'availableSeats'> | number,
): DepartureStatus {
  const seats =
    typeof departureOrSeats === 'number'
      ? departureOrSeats
      : departureOrSeats.availableSeats;

  if (seats <= 0) {
    return 'sold-out';
  }
  if (seats <= 8) {
    return 'last-seats';
  }
  return 'available';
}

/**
 * Returnează toate plecările viitoare (startDate >= today), ordonate crescător după startDate.
 */
export function getFutureDepartures(
  trip: Pick<Trip, 'departures'>,
  today: string | Date = DEFAULT_TODAY,
): Departure[] {
  const todayIso = normalizeDateString(today);
  return trip.departures
    .filter((dep) => dep.startDate >= todayIso)
    .sort((a, b) => {
      const dateDiff = a.startDate.localeCompare(b.startDate);
      if (dateDiff !== 0) return dateDiff;
      return a.price - b.price;
    });
}

/**
 * Returnează următoarea plecare viitoare (cea mai apropiată din viitor cu startDate >= today).
 */
export function getNextDeparture(
  trip: Pick<Trip, 'departures'>,
  today: string | Date = DEFAULT_TODAY,
): Departure | null {
  const future = getFutureDepartures(trip, today);
  return future[0] ?? null;
}

/**
 * Returnează prețul „de la” (minimul din plecările viitoare cu startDate >= today).
 */
export function getStartingPrice(
  trip: Pick<Trip, 'departures'>,
  today: string | Date = DEFAULT_TODAY,
): number | null {
  const future = getFutureDepartures(trip, today);
  if (future.length === 0) {
    return null;
  }
  return Math.min(...future.map((dep) => dep.price));
}

/**
 * Construiește un TripSummary (fără itinerary, reviews, included, notIncluded),
 * cu startingPrice și nextDeparture precalculate.
 */
export function toTripSummary(
  trip: Trip,
  today: string | Date = DEFAULT_TODAY,
): TripSummary {
  const {
    itinerary: _itinerary,
    reviews: _reviews,
    included: _included,
    notIncluded: _notIncluded,
    ...rest
  } = trip;

  return {
    ...rest,
    startingPrice: getStartingPrice(trip, today),
    nextDeparture: getNextDeparture(trip, today),
  };
}

function toStringList(input: unknown): string[] {
  if (input === undefined || input === null) return [];
  const rawItems = Array.isArray(input) ? input : [input];
  return rawItems
    .flatMap((item) => (typeof item === 'string' ? item.split(',') : []))
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0 && s !== 'all' && s !== 'toate');
}

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const optionalIsoDateSchema = z
  .preprocess((val) => {
    if (typeof val !== 'string') return undefined;
    const trimmed = val.trim();
    return isoDateRegex.test(trimmed) ? trimmed : undefined;
  }, z.string().optional())
  .catch(undefined);

const rawFilterSchema = z.object({
  q: z
    .preprocess(
      (val) => (typeof val === 'string' ? val.trim() : ''),
      z.string(),
    )
    .catch(''),
  destinations: z
    .preprocess((val) => toStringList(val), z.array(z.string()))
    .catch([]),
  durations: z
    .preprocess(
      (val) =>
        toStringList(val).filter((d): d is DurationBucket =>
          (VALID_DURATION_BUCKETS as readonly string[]).includes(d),
        ),
      z.array(z.enum(['1', '2', '3', '4+'])),
    )
    .catch([]),
  minPrice: z
    .preprocess((val) => {
      if (val === undefined || val === null || val === '') {
        return DEFAULT_MIN_PRICE;
      }
      const num = Number(val);
      return Number.isFinite(num) && num >= 0 ? num : DEFAULT_MIN_PRICE;
    }, z.number().min(0))
    .catch(DEFAULT_MIN_PRICE),
  maxPrice: z
    .preprocess((val) => {
      if (val === undefined || val === null || val === '') {
        return DEFAULT_MAX_PRICE;
      }
      const num = Number(val);
      return Number.isFinite(num) && num >= 0 ? num : DEFAULT_MAX_PRICE;
    }, z.number().min(0))
    .catch(DEFAULT_MAX_PRICE),
  types: z
    .preprocess(
      (val) =>
        toStringList(val).filter((t): t is TripType =>
          (VALID_TRIP_TYPES as readonly string[]).includes(t),
        ),
      z.array(
        z.enum(['cultural', 'nature', 'adventure', 'city-break', 'exclusive']),
      ),
    )
    .catch([]),
  dateFrom: optionalIsoDateSchema,
  dateTo: optionalIsoDateSchema,
  sort: z
    .preprocess((val) => {
      if (typeof val !== 'string') return 'popular';
      const trimmed = val.trim();
      return (VALID_SORT_OPTIONS as readonly string[]).includes(trimmed)
        ? trimmed
        : 'popular';
    }, z.enum(['popular', 'price-asc', 'price-desc', 'date-asc']))
    .catch('popular'),
  page: z
    .preprocess((val) => {
      const num = Number(val);
      return Number.isInteger(num) && num >= 1 ? num : 1;
    }, z.number().int().min(1))
    .catch(1),
  pageSize: z
    .preprocess((val) => {
      const num = Number(val);
      return (VALID_PAGE_SIZES as readonly number[]).includes(num)
        ? (num as PageSizeOption)
        : DEFAULT_PAGE_SIZE;
    }, z.union([z.literal(12), z.literal(24), z.literal(48)]))
    .catch(DEFAULT_PAGE_SIZE),
});

/**
 * Parsează și validează cu Zod parametrii de filtrare (din URL searchParams cu chei în română
 * `destinatie`, `durata`, `bugetMin`, `bugetMax`, `tip`, `deLa`, `panaLa` sau echivalentele în engleză),
 * aplicând valori implicite și toleranță la valori invalide.
 */
export function parseTripFilterParams(
  raw: Record<string, unknown> | Partial<TripFilterParams> = {},
): NormalizedTripFilterParams {
  const r = raw as Record<string, unknown>;

  const mappedInput = {
    q: r.q ?? r.search ?? '',
    destinations: r.destinatie ?? r.destinations,
    durations: r.durata ?? r.durations ?? r.duration,
    minPrice: r.bugetMin ?? r.minPrice,
    maxPrice: r.bugetMax ?? r.maxPrice,
    types: r.tip ?? r.types ?? r.type,
    dateFrom: r.deLa ?? r.dateFrom,
    dateTo: r.panaLa ?? r.dateTo,
    sort: r.sort,
    page: r.page,
    pageSize: r.pageSize,
  };

  const parsed = rawFilterSchema.parse(mappedInput);

  const minPrice = Math.min(parsed.minPrice, parsed.maxPrice);
  const maxPrice = Math.max(parsed.minPrice, parsed.maxPrice);

  let dateFrom = parsed.dateFrom;
  let dateTo = parsed.dateTo;
  if (dateFrom && dateTo && dateFrom > dateTo) {
    [dateFrom, dateTo] = [dateTo, dateFrom];
  }

  return {
    ...parsed,
    minPrice,
    maxPrice,
    dateFrom,
    dateTo,
  };
}

/**
 * Funcție pură de filtrare, sortare și paginare a excursiilor.
 * Lucrează intern pe `Trip[]` și mapează pagina rezultată la `TripSummary[]`.
 */
export function filterAndSortTrips(
  trips: readonly Trip[],
  rawParams: Record<string, unknown> | Partial<TripFilterParams> = {},
  today: string | Date = DEFAULT_TODAY,
): PaginatedTripsResult {
  const params = parseTripFilterParams(rawParams);
  const normalizedQuery = params.q ? stripDiacritics(params.q) : '';

  const matchingTrips = trips.filter((trip) => {
    const startingPrice = getStartingPrice(trip, today);
    const futureDepartures = getFutureDepartures(trip, today);

    // 1. Filtru căutare text (titlu, subtitlu, slug destinație, nume destinație în română)
    if (normalizedQuery) {
      const searchableText = stripDiacritics(
        [
          trip.title,
          trip.subtitle,
          ...trip.destinations,
          ...trip.destinations.map((slug) => getDestinationName(slug)),
        ].join(' '),
      );
      if (!searchableText.includes(normalizedQuery)) {
        return false;
      }
    }

    // 2. Filtru destinații (cel puțin o destinație selectată se regăsește în trip.destinations)
    if (params.destinations.length > 0) {
      const hasDestination = trip.destinations.some((dest) =>
        params.destinations.includes(dest.toLowerCase()),
      );
      if (!hasDestination) {
        return false;
      }
    }

    // 3. Filtru durată (1 zi, 2 zile, 3 zile, 4+ zile)
    if (params.durations.length > 0) {
      const bucket = getDurationBucket(trip.days);
      if (!params.durations.includes(bucket)) {
        return false;
      }
    }

    // 4. Filtru buget min-max (raportat la prețul „de la” al excursiei)
    if (startingPrice === null) {
      return false;
    }
    if (startingPrice < params.minPrice || startingPrice > params.maxPrice) {
      return false;
    }

    // 5. Filtru tip excursie
    if (params.types.length > 0) {
      if (!params.types.includes(trip.type)) {
        return false;
      }
    }

    // 6. Filtru interval de date (cel puțin o plecare viitoare în intervalul [dateFrom, dateTo])
    if (params.dateFrom || params.dateTo) {
      const hasDepartureInWindow = futureDepartures.some((dep) => {
        if (params.dateFrom && dep.startDate < params.dateFrom) return false;
        if (params.dateTo && dep.startDate > params.dateTo) return false;
        return true;
      });
      if (!hasDepartureInWindow) {
        return false;
      }
    }

    return true;
  });

  // Sortare
  const sortedTrips = [...matchingTrips].sort((a, b) => {
    if (params.sort === 'price-asc') {
      const priceA = getStartingPrice(a, today) ?? Number.POSITIVE_INFINITY;
      const priceB = getStartingPrice(b, today) ?? Number.POSITIVE_INFINITY;
      if (priceA !== priceB) return priceA - priceB;
      return b.popularity - a.popularity;
    }

    if (params.sort === 'price-desc') {
      const priceA = getStartingPrice(a, today) ?? Number.NEGATIVE_INFINITY;
      const priceB = getStartingPrice(b, today) ?? Number.NEGATIVE_INFINITY;
      if (priceA !== priceB) return priceB - priceA;
      return b.popularity - a.popularity;
    }

    if (params.sort === 'date-asc') {
      const nextA = getNextDeparture(a, today)?.startDate ?? '9999-12-31';
      const nextB = getNextDeparture(b, today)?.startDate ?? '9999-12-31';
      const cmp = nextA.localeCompare(nextB);
      if (cmp !== 0) return cmp;
      return b.popularity - a.popularity;
    }

    // Default: 'popular'
    if (b.popularity !== a.popularity) {
      return b.popularity - a.popularity;
    }
    return b.reviewCount - a.reviewCount;
  });

  // Paginare
  const total = sortedTrips.length;
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize));
  const startIndex = (params.page - 1) * params.pageSize;
  const pageItems = sortedTrips
    .slice(startIndex, startIndex + params.pageSize)
    .map((trip) => toTripSummary(trip, today));

  return {
    items: pageItems,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages,
  };
}
