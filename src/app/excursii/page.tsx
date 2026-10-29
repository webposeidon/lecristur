import type { Metadata } from 'next';
import { getFilterFacets, getTrips } from '@/lib/api';
import { getDestinationName } from '@/lib/labels';
import CatalogHero from '@/components/catalog/catalog-hero';
import CatalogSidebar from '@/components/catalog/catalog-sidebar';
import CatalogContent from '@/components/catalog/catalog-content';

export interface ExcursiiPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: ExcursiiPageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const q = typeof resolved.q === 'string' ? resolved.q.trim() : '';
  const destinatie =
    typeof resolved.destinatie === 'string'
      ? resolved.destinatie.trim()
      : Array.isArray(resolved.destinatie)
        ? resolved.destinatie[0]
        : '';

  let title = 'Toate excursiile | LeCrisTur — Călătorii care unesc oamenii';
  if (destinatie) {
    const destName = getDestinationName(destinatie);
    title = `Excursii în ${destName} | LeCrisTur`;
  } else if (q) {
    title = `Căutare „${q}” — Excursii | LeCrisTur`;
  }

  return {
    title,
    description:
      'Descoperă peste 50 de excursii organizate cu autocarul din Republica Moldova către cele mai frumoase destinații din România. Prețuri transparente, plecări garantate.',
    openGraph: {
      title,
      description:
        'Descoperă peste 50 de excursii organizate cu autocarul din Republica Moldova către cele mai frumoase destinații din România.',
      type: 'website',
      locale: 'ro_RO',
    },
  };
}

export default async function ExcursiiPage({
  searchParams,
}: ExcursiiPageProps) {
  // În Next.js 15, searchParams este Promise și trebuie rezolvat cu await
  const resolvedSearchParams = await searchParams;

  const [tripsData, facets] = await Promise.all([
    getTrips(resolvedSearchParams),
    getFilterFacets(),
  ]);

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Antet curat pe alb cu breadcrumbs și beneficii */}
      <CatalogHero totalCount={facets.totalTrips} />

      {/* Zona principală: Sidebar Filtre + Grid Carduri */}
      <div className="container-fluid py-8">
        <div className="flex items-start gap-8 lg:gap-10">
          {/* Sidebar Desktop stânga */}
          <div className="hidden lg:block w-72 2xl:w-80 flex-shrink-0">
            <CatalogSidebar facets={facets} />
          </div>

          {/* Conținut Principal dreapta (Topbar, Cards Grid/List, Pagination) */}
          <div className="flex-1 min-w-0">
            <CatalogContent tripsData={tripsData} facets={facets} />
          </div>
        </div>
      </div>
    </div>
  );
}
