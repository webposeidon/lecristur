import { getFeaturedTrips, getDestinations } from '@/lib/api';
import HomeHero from '@/components/home/home-hero';
import HomeUspBar from '@/components/home/home-usp-bar';
import PopularTripsSection from '@/components/home/popular-trips-section';
import PopularDestinationsSection from '@/components/home/popular-destinations-section';

export const metadata = {
  title: 'LeCrisTur — Descoperă România | Excursii cu autocarul din Moldova',
  description:
    'Excursii organizate cu autocarul din Republica Moldova către cele mai frumoase destinații din România. Brașov, Castelul Bran, Maramureș, Bucovina, Delta Dunării.',
};

export default async function HomePage() {
  const [featuredTrips, destinations] = await Promise.all([
    getFeaturedTrips(10),
    getDestinations(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Banner cu Căutare */}
      <HomeHero />

      {/* 2. Bandă 5 USP-uri */}
      <HomeUspBar />

      {/* 3. Cele mai populare excursii (cu TripCard showNextDeparture=false) */}
      <PopularTripsSection trips={featuredTrips} />

      {/* 4. Destinații populare (Carduri 4:3) */}
      <PopularDestinationsSection destinations={destinations} />
    </main>
  );
}
