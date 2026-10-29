'use client';

import { useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DestinationCard from '@/components/trips/destination-card';
import type { DestinationSummary } from '@/types';

interface PopularDestinationsSectionProps {
  destinations: DestinationSummary[];
  className?: string;
}

export default function PopularDestinationsSection({
  destinations,
  className,
}: PopularDestinationsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="destinatii" className={clsx('py-12 sm:py-16 bg-white scroll-mt-20', className)}>
      <div className="container-fluid">
        {/* Antet Secțiune */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#1F284B]">
              Destinații populare
            </h2>
            <p className="text-sm text-[#777777] mt-1 font-normal">
              Explorează cele mai frumoase zone din România
            </p>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            <Link
              href="/excursii"
              className="text-sm font-bold text-teal hover:text-teal-hover transition-colors inline-flex items-center gap-1 group"
            >
              <span>Vezi toate destinațiile</span>
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
          {destinations.map((destination) => (
            <div
              key={destination.slug}
              className="flex-none w-[190px] sm:w-[210px] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] 2xl:w-[calc(16.666%-14px)] snap-start"
            >
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
