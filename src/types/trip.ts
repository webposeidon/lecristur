export type TripType =
  | 'cultural'
  | 'nature'
  | 'adventure'
  | 'city-break'
  | 'exclusive';

export type TripBadge =
  | 'popular'
  | 'new-tour'
  | 'exclusive'
  | 'city-break'
  | 'nature'
  | 'cultural';

export type DepartureStatus = 'available' | 'last-seats' | 'sold-out';

export type DurationBucket = '1' | '2' | '3' | '4+';

export type TripSortOption = 'popular' | 'price-asc' | 'price-desc' | 'date-asc';

export type PageSizeOption = 12 | 24 | 48;

export interface ItineraryActivity {
  time: string;
  text: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities: ItineraryActivity[];
}

export interface Review {
  id?: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Departure {
  id: string;
  startDate: string; // ISO YYYY-MM-DD
  endDate: string;   // ISO YYYY-MM-DD
  price: number;
  totalSeats: number;
  availableSeats: number;
}

export interface TripRoute {
  points: string[];
  distanceKm: number;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description?: string;
  destinations: string[]; // destination slugs (e.g. 'brasov', 'delta-dunarii')
  badge?: TripBadge;
  type: TripType;
  days: number;
  nights: number;
  transportIncluded: boolean;
  hotelStars: number;
  rating: number;
  reviewCount: number;
  popularity: number;
  images: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  route: TripRoute;
  itinerary: ItineraryDay[];
  reviews: Review[];
  departures: Departure[];
}

export type TripSummary = Omit<
  Trip,
  'itinerary' | 'reviews' | 'included' | 'notIncluded'
> & {
  startingPrice: number | null;
  nextDeparture: Departure | null;
};

export interface DepartureWithTrip extends Departure {
  status: DepartureStatus;
  trip: TripSummary;
}

export interface DestinationSummary {
  slug: string;
  name: string;
  tripCount: number;
  image: string;
}

export interface FilterFacets {
  totalTrips: number;
  destinations: {
    slug: string;
    name: string;
    count: number;
  }[];
  durations: Record<DurationBucket, number>;
  types: Record<TripType, number>;
}

export interface TripFilterParams {
  q?: string;
  destinatie?: string | string[];
  durata?: DurationBucket | DurationBucket[] | string | string[];
  bugetMin?: number | string;
  bugetMax?: number | string;
  tip?: TripType | TripType[] | string | string[];
  deLa?: string;
  panaLa?: string;
  sort?: TripSortOption | string;
  page?: number | string;
  pageSize?: PageSizeOption | number | string;
}

export interface NormalizedTripFilterParams {
  q: string;
  destinations: string[];
  durations: DurationBucket[];
  minPrice: number;
  maxPrice: number;
  types: TripType[];
  dateFrom?: string;
  dateTo?: string;
  sort: TripSortOption;
  page: number;
  pageSize: PageSizeOption;
}

export interface PaginatedTripsResult {
  items: TripSummary[];
  total: number;
  page: number;
  pageSize: PageSizeOption;
  totalPages: number;
}

export interface GetDeparturesParams {
  month?: number;
  year?: number;
  date?: string;
  destination?: string;
  destinatie?: string;
  duration?: DurationBucket;
  durata?: DurationBucket;
  type?: TripType;
  tip?: TripType;
  passengers?: number;
  persoane?: number;
  includeSoldOut?: boolean;
  sort?: 'date-asc' | 'price-asc' | 'price-desc';
}
