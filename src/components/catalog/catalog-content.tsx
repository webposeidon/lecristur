'use client';

import { useState } from 'react';
import CatalogTopbar from '@/components/catalog/catalog-topbar';
import CatalogPagination from '@/components/catalog/catalog-pagination';
import CatalogEmptyState from '@/components/catalog/catalog-empty-state';
import CatalogMobileDrawer from '@/components/catalog/catalog-mobile-drawer';
import TripCard from '@/components/trips/trip-card';
import TripCardList from '@/components/trips/trip-card-list';
import type { FilterFacets, PaginatedTripsResult } from '@/types';

export interface CatalogContentProps {
  tripsData: PaginatedTripsResult;
  facets: FilterFacets;
}

export default function CatalogContent({
  tripsData,
  facets,
}: CatalogContentProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div>
      {/* Drawer filtre pe mobil */}
      <CatalogMobileDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        facets={facets}
      />

      {/* Topbar: Contor rezultate, sortare, comutator grid/listă */}
      <CatalogTopbar
        totalCount={tripsData.total}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
      />

      {/* Rezultate sau Stare Goală */}
      {tripsData.items.length === 0 ? (
        <CatalogEmptyState />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tripsData.items.map((trip, idx) => (
            <TripCard
              key={trip.id}
              trip={trip}
              showNextDeparture={true}
              priority={idx < 4}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tripsData.items.map((trip) => (
            <TripCardList key={trip.id} trip={trip} />
          ))}
        </div>
      )}

      {/* Paginare numerotată */}
      <CatalogPagination
        currentPage={tripsData.page}
        totalItems={tripsData.total}
        pageSize={tripsData.pageSize}
      />
    </div>
  );
}
