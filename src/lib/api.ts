import { MOCK_TRIPS } from '@/lib/data/trips-mock';
import { getDestinationName } from '@/lib/labels';
import {
  DEFAULT_TODAY,
  filterAndSortTrips,
  getDepartureStatus,
  getDurationBucket,
  normalizeDateString,
  toTripSummary,
} from '@/lib/trips';
import type {
  DepartureWithTrip,
  DestinationSummary,
  DurationBucket,
  FilterFacets,
  GetDeparturesParams,
  PaginatedTripsResult,
  Trip,
  TripFilterParams,
  TripSummary,
  TripType,
} from '@/types';

/**
 * Returnează excursiile filtrate, sortate și paginate (ca `TripSummary[]`).
 */
export async function getTrips(
  params: Record<string, unknown> | Partial<TripFilterParams> = {},
  today: string | Date = DEFAULT_TODAY,
): Promise<PaginatedTripsResult> {
  return filterAndSortTrips(MOCK_TRIPS, params, today);
}

/**
 * Returnează o excursie completă (`Trip`) după `slug`, sau `null` dacă nu există.
 */
export async function getTrip(slug: string): Promise<Trip | null> {
  const normalized = slug.trim().toLowerCase();
  const found = MOCK_TRIPS.find((t) => t.slug.toLowerCase() === normalized);
  return found ?? null;
}

/**
 * Returnează plecările aplatizate cu excursia (`TripSummary`) și `status` atașate,
 * filtrate opțional după lună, an, zi, destinație, durată, tip sau număr de persoane.
 */
export async function getDepartures(
  params: GetDeparturesParams = {},
  today: string | Date = DEFAULT_TODAY,
): Promise<DepartureWithTrip[]> {
  const todayIso = normalizeDateString(today);
  const destinationFilter = (
    params.destination ??
    params.destinatie ??
    ''
  )
    .trim()
    .toLowerCase();
  const durationFilter = params.duration ?? params.durata;
  const typeFilter = params.type ?? params.tip;
  const minPassengers = params.passengers ?? params.persoane;
  const includeSoldOut = params.includeSoldOut ?? true;
  const sort = params.sort ?? 'date-asc';

  const results: DepartureWithTrip[] = [];

  for (const trip of MOCK_TRIPS) {
    if (
      destinationFilter &&
      destinationFilter !== 'all' &&
      destinationFilter !== 'toate' &&
      !trip.destinations.includes(destinationFilter)
    ) {
      continue;
    }

    if (durationFilter && getDurationBucket(trip.days) !== durationFilter) {
      continue;
    }

    if (typeFilter && trip.type !== typeFilter) {
      continue;
    }

    const summary = toTripSummary(trip, todayIso);

    for (const dep of trip.departures) {
      if (dep.startDate < todayIso) {
        continue;
      }

      if (!includeSoldOut && dep.availableSeats <= 0) {
        continue;
      }

      if (
        typeof minPassengers === 'number' &&
        minPassengers > 0 &&
        dep.availableSeats > 0 &&
        dep.availableSeats < minPassengers
      ) {
        continue;
      }

      if (params.date && dep.startDate !== params.date) {
        continue;
      }

      if (params.year !== undefined || params.month !== undefined) {
        const [yearStr, monthStr] = dep.startDate.split('-');
        const depYear = Number(yearStr);
        const depMonth = Number(monthStr);

        if (params.year !== undefined && depYear !== params.year) {
          continue;
        }
        if (params.month !== undefined && depMonth !== params.month) {
          continue;
        }
      }

      results.push({
        ...dep,
        status: getDepartureStatus(dep),
        trip: summary,
      });
    }
  }

  results.sort((a, b) => {
    if (sort === 'price-asc') {
      if (a.price !== b.price) return a.price - b.price;
      return a.startDate.localeCompare(b.startDate);
    }
    if (sort === 'price-desc') {
      if (a.price !== b.price) return b.price - a.price;
      return a.startDate.localeCompare(b.startDate);
    }
    const dateDiff = a.startDate.localeCompare(b.startDate);
    if (dateDiff !== 0) return dateDiff;
    return b.trip.popularity - a.trip.popularity;
  });

  return results;
}

/**
 * Returnează lista destinațiilor cu numărul de excursii calculat dinamic.
 */
export async function getDestinations(): Promise<DestinationSummary[]> {
  const counts = new Map<string, { count: number; image: string }>();

  for (const trip of MOCK_TRIPS) {
    const primaryImage = trip.images[0] ?? '/images/trips/brasov-bran-sinaia.svg';
    for (const slug of trip.destinations) {
      const existing = counts.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(slug, { count: 1, image: primaryImage });
      }
    }
  }

  return Array.from(counts.entries())
    .map(([slug, data]) => ({
      slug,
      name: getDestinationName(slug),
      tripCount: data.count,
      image: data.image,
    }))
    .sort((a, b) => {
      if (b.tripCount !== a.tripCount) return b.tripCount - a.tripCount;
      return a.name.localeCompare(b.name, 'ro');
    });
}

/**
 * Returnează contoarele (facets) pentru sidebar-ul din Catalog:
 * număr de excursii per destinație, per durată și per tip.
 */
export async function getFilterFacets(): Promise<FilterFacets> {
  const destinations = await getDestinations();

  const durations: Record<DurationBucket, number> = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4+': 0,
  };

  const types: Record<TripType, number> = {
    cultural: 0,
    nature: 0,
    adventure: 0,
    'city-break': 0,
    exclusive: 0,
  };

  for (const trip of MOCK_TRIPS) {
    const bucket = getDurationBucket(trip.days);
    durations[bucket] += 1;
    types[trip.type] += 1;
  }

  return {
    totalTrips: MOCK_TRIPS.length,
    destinations: destinations.map((d) => ({
      slug: d.slug,
      name: d.name,
      count: d.tripCount,
    })),
    durations,
    types,
  };
}

/**
 * Returnează cele mai populare excursii (ca `TripSummary[]`).
 */
export async function getFeaturedTrips(
  limit = 8,
  today: string | Date = DEFAULT_TODAY,
): Promise<TripSummary[]> {
  return [...MOCK_TRIPS]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
    .map((trip) => toTripSummary(trip, today));
}
