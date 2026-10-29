import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFeaturedTrips, getTrip } from '@/lib/api';
import {
  getFutureDepartures,
  getNextDeparture,
  getStartingPrice,
} from '@/lib/trips';
import TripHeroGallery from '@/components/detalii/trip-hero-gallery';
import TripTabsNav from '@/components/detalii/trip-tabs-nav';
import TripOverview from '@/components/detalii/trip-overview';
import TripItinerary from '@/components/detalii/trip-itinerary';
import TripDetailsSections from '@/components/detalii/trip-details-sections';
import BookingSidebar from '@/components/detalii/booking-sidebar';
import TripRouteCard from '@/components/detalii/trip-route-card';
import TripReviewsCard from '@/components/detalii/trip-reviews-card';
import TripCard from '@/components/trips/trip-card';

export interface TripDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TripDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTrip(slug);

  if (!trip) {
    return {
      title: 'Excursia nu a fost găsită | LeCrisTur',
      description:
        'Excursia căutată nu mai este disponibilă. Descoperă toate excursiile organizate cu autocarul de LeCrisTur.',
    };
  }

  const title = `${trip.title} — ${trip.subtitle} | LeCrisTur`;
  const description =
    trip.description ??
    `${trip.title}: ${trip.subtitle}. Excursie de ${trip.days} zile organizată cu autocarul de LeCrisTur.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ro_RO',
    },
  };
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  // În Next.js 15, params este Promise<{ slug: string }>
  const { slug } = await params;

  const [trip, featuredTrips] = await Promise.all([
    getTrip(slug),
    getFeaturedTrips(5),
  ]);

  if (!trip) {
    notFound();
  }

  const futureDepartures = getFutureDepartures(trip);
  const departuresToShow =
    futureDepartures.length > 0 ? futureDepartures : trip.departures;
  const nextDeparture = getNextDeparture(trip) ?? trip.departures[0] ?? null;
  const startingPrice = getStartingPrice(trip);

  const similarTrips = featuredTrips
    .filter((item) => item.slug !== trip.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Antet alb curat + Banda de 5 miniaturi foto cu overlay +27 pe a 5-a poză */}
      <TripHeroGallery trip={trip} />

      {/* Layout principal în 2 coloane (8/12 stânga + 4/12 dreapta) */}
      <div className="container-fluid pt-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Coloana stângă (8/12): Tab-uri + Descriere + Program + Secțiuni detalii */}
          <div className="lg:col-span-8 space-y-10 min-w-0">
            <TripTabsNav />
            <TripOverview trip={trip} />
            <TripItinerary trip={trip} nextDeparture={nextDeparture} />
            <TripDetailsSections trip={trip} />
          </div>

          {/* Coloana dreaptă (4/12): Card rezervare flotant + Traseu + Recenzii */}
          <aside className="relative z-20 space-y-8 lg:col-span-4 lg:-mt-72">
            <BookingSidebar
              trip={trip}
              departures={departuresToShow}
              startingPrice={startingPrice}
            />
            <TripRouteCard trip={trip} />
            <TripReviewsCard trip={trip} />
          </aside>
        </div>

        {/* Excursii similare recomandate */}
        {similarTrips.length > 0 && (
          <section className="mt-16 pt-8 border-0">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-sans text-2xl font-bold text-[#1F284B]">
                Excursii similare recomandate
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similarTrips.map((item) => (
                <TripCard key={item.id} trip={item} showNextDeparture />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
