import type { Metadata } from 'next';
import Link from 'next/link';
import { getDestinations } from '@/lib/api';
import DestinationCard from '@/components/trips/destination-card';

export const metadata: Metadata = {
  title: 'Destinații Populare din România | LeCrisTur',
  description:
    'Explorează destinațiile turistice din România accesibile cu autocarul din Moldova: Brașov, Maramureș, Bucovina, Sovata, Delta Dunării, Sibiu, Transfăgărășan.',
};

export default async function DestinatiiPage() {
  const destinations = await getDestinations();

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Antet curat pe alb */}
      <section className="bg-white pt-8 pb-6 md:pt-10 md:pb-8 border-0">
        <div className="container-fluid">
          <nav
            aria-label="Navigație ierarhică"
            className="mb-3 flex items-center gap-2 text-xs sm:text-sm text-[#909090]"
          >
            <Link href="/" className="transition-colors hover:text-teal">
              Acasă
            </Link>
            <span className="text-[#909090]">›</span>
            <span className="font-bold text-[#2C2C2C]">Destinații România</span>
          </nav>

          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
            Destinații Populare din România
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl">
            Alege regiunea favorită și descoperă excursiile organizate cu autocarul
            din Republica Moldova.
          </p>
        </div>
      </section>

      <div className="container-fluid">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {destinations.map((dest) => (
            <div key={dest.slug} className="w-full">
              <DestinationCard destination={dest} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/excursii"
            className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-teal hover:bg-teal-hover px-6 py-3 text-sm font-bold text-white transition-colors"
          >
            <span>Vezi toate excursiile din catalog</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
