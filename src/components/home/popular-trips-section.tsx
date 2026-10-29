'use client';

import { useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import TripCard from '@/components/trips/trip-card';
import type { TripSummary } from '@/types';

interface PopularTripsSectionProps {
  trips: TripSummary[];
  className?: string;
}

export default function PopularTripsSection({
  trips,
  className,
}: PopularTripsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className={clsx('py-12 sm:py-16 bg-white', className)}>
      <div className="container-fluid">
        {/* Antet Secțiune */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#1F284B]">
              Cele mai populare excursii
            </h2>
            <p className="text-sm text-[#777777] mt-1 font-normal">
              Destinații apreciate de turiștii noștri
            </p>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            <Link
              href="/excursii"
              className="text-sm font-bold text-teal hover:text-teal-hover transition-colors inline-flex items-center gap-1 group"
            >
              <span>Vezi toate excursiile</span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </Link>

            {/* Butoane Navigare Săgeți */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Derulează spre stânga"
                className="flex h-9 w-9 items-center justify-center rounded-full border-0 bg-[#F7F7F7] text-[#2C2C2C] transition hover:bg-teal hover:text-white focus:outline-none"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Derulează spre dreapta"
                className="flex h-9 w-9 items-center justify-center rounded-full border-0 bg-[#F7F7F7] text-[#2C2C2C] transition hover:bg-teal hover:text-white focus:outline-none"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Listă orizontală / Carusel scrollabil */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="flex-none w-[270px] sm:w-[290px] lg:w-[calc(25%-15px)] 2xl:w-[calc(20%-16px)] snap-start"
            >
              <TripCard trip={trip} showNextDeparture={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
