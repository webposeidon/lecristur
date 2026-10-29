import type {
  DepartureStatus,
  DurationBucket,
  TripBadge,
  TripSortOption,
  TripType,
} from '@/types';

export const TRIP_TYPE_LABELS: Record<TripType, string> = {
  cultural: 'Culturală',
  nature: 'Natură',
  adventure: 'Aventură',
  'city-break': 'City Break',
  exclusive: 'Exclusiv',
};

export const TRIP_BADGE_LABELS: Record<TripBadge, string> = {
  popular: 'Popular',
  'new-tour': 'Tur nou',
  exclusive: 'Exclusiv',
  'city-break': 'City Break',
  nature: 'Natură',
  cultural: 'Cultural',
};

export const DEPARTURE_STATUS_LABELS: Record<DepartureStatus, string> = {
  available: 'Disponibil',
  'last-seats': 'Ultimele locuri',
  'sold-out': 'Sold out',
};

export const DURATION_BUCKET_LABELS: Record<DurationBucket, string> = {
  '1': '1 zi',
  '2': '2 zile',
  '3': '3 zile',
  '4+': '4+ zile',
};

export const TRIP_SORT_LABELS: Record<TripSortOption, string> = {
  popular: 'Cele mai populare',
  'date-asc': 'Data plecării (crescător)',
  'price-asc': 'Preț (crescător)',
  'price-desc': 'Preț (descrescător)',
};

export const DESTINATION_LABELS: Record<string, string> = {
  brasov: 'Brașov',
  sinaia: 'Sinaia',
  maramures: 'Maramureș',
  bucovina: 'Bucovina',
  sovata: 'Sovata',
  'delta-dunarii': 'Delta Dunării',
  transilvania: 'Transilvania',
  moldova: 'Moldova',
  litoral: 'Litoral',
  sibiu: 'Sibiu',
  transfagarasan: 'Transfăgărășan',
  apuseani: 'Munții Apuseni',
};

export function getDestinationName(slug: string): string {
  return DESTINATION_LABELS[slug] ?? slug;
}

export function formatDurationLabel(days: number, nights: number): string {
  if (days <= 1 || nights <= 0) {
    return '1 zi';
  }
  const nightsLabel = nights === 1 ? '1 noapte' : `${nights} nopți`;
  return `${days} zile / ${nightsLabel}`;
}
