'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/20/solid';
import { formatPrice } from '@/lib/format';
import { formatDurationLabel } from '@/lib/labels';
import type { DestinationSummary, TripSummary } from '@/types';

export interface CalendarRightSidebarProps {
  featuredTrips: TripSummary[];
  destinations: DestinationSummary[];
}

export default function CalendarRightSidebar({
  featuredTrips,
  destinations,
}: CalendarRightSidebarProps) {
  // Promovăm „Transfăgărășan • Bâlea Lac” pe prima poziție a mini-caruselului
  const orderedFeatured = useMemo(() => {
    if (featuredTrips.length === 0) return [];
    const transfagarasan = featuredTrips.find(
      (t) => t.slug === 'transfagarasan-balea-lac',
    );
    if (!transfagarasan) return featuredTrips;
    return [
      transfagarasan,
      ...featuredTrips.filter((t) => t.slug !== 'transfagarasan-balea-lac'),
    ];
  }, [featuredTrips]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [favoriteSlugs, setFavoriteSlugs] = useState<Record<string, boolean>>(
    {},
  );

  const currentFeatured =
    orderedFeatured[activeSlideIndex] ?? orderedFeatured[0] ?? null;

  const handlePrevSlide = () => {
    if (orderedFeatured.length <= 1) return;
    setActiveSlideIndex((prev) =>
      prev === 0 ? orderedFeatured.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    if (orderedFeatured.length <= 1) return;
    setActiveSlideIndex((prev) =>
      prev === orderedFeatured.length - 1 ? 0 : prev + 1,
    );
  };

  const toggleFavorite = (slug: string) => {
    setFavoriteSlugs((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const topDestinations = destinations.slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* 1. Cardul „Excursii recomandate în această lună” */}
      {currentFeatured && (
        <div className="rounded-xl border-0 bg-[#F7F7F7] p-4 sm:p-5">
          <h3 className="font-sans text-sm sm:text-base font-bold text-[#1F284B]">
            Excursii recomandate în această lună
          </h3>

          <div className="mt-3">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-white">
              <Link href={`/excursii/${currentFeatured.slug}`}>
                <Image
                  src={
                    currentFeatured.images[0] ??
                    '/images/trips/transfagarasan-balea-lac.svg'
                  }
                  alt={currentFeatured.title}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>

              {/* Inimioară dreapta-sus */}
              <button
                type="button"
                onClick={() => toggleFavorite(currentFeatured.slug)}
                aria-label="Adaugă la favorite"
                className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
              >
                {favoriteSlugs[currentFeatured.slug] ? (
                  <HeartSolidIcon className="h-4 w-4 text-status-danger" />
                ) : (
                  <HeartIcon className="h-4 w-4" />
                )}
              </button>

              {/* Săgeți carusel < > */}
              {orderedFeatured.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Excursia recomandată anterioară"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#2C2C2C] shadow-float transition hover:bg-teal hover:text-white"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Excursia recomandată următoare"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#2C2C2C] shadow-float transition hover:bg-teal hover:text-white"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Detalii excursie recomandată */}
            <div className="mt-3">
              <Link href={`/excursii/${currentFeatured.slug}`}>
                <h4 className="font-sans text-base font-bold text-[#2C2C2C] hover:text-teal transition-colors">
                  {currentFeatured.title}
                </h4>
              </Link>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-[#777777]">
                <svg
                  className="h-3.5 w-3.5 text-teal flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5"
                  />
                </svg>
                <span>
                  {formatDurationLabel(
                    currentFeatured.days,
                    currentFeatured.nights,
                  )}
                </span>
              </div>
              <div className="mt-1.5 text-xs text-[#777777]">
                De la{' '}
                <span className="font-sans text-base font-bold text-[#2C2C2C]">
                  {formatPrice(currentFeatured.startingPrice)}
                </span>{' '}
                / persoană
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Cardul „Destinații populare” */}
      <div className="rounded-xl border-0 bg-[#F7F7F7] p-4 sm:p-5">
        <h3 className="font-sans text-sm sm:text-base font-bold text-[#1F284B]">
          Destinații populare
        </h3>

        <ul className="mt-3 space-y-2.5">
          {topDestinations.map((dest) => (
            <li key={dest.slug}>
              <Link
                href={`/excursii?destinatie=${encodeURIComponent(dest.slug)}`}
                className="group flex items-center justify-between gap-3 rounded-lg bg-white p-2 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-11 w-14 flex-shrink-0 overflow-hidden rounded-md bg-[#F7F7F7]">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate text-xs sm:text-sm font-bold text-[#2C2C2C] group-hover:text-teal transition-colors">
                      {dest.name}
                    </span>
                    <span className="block text-[11px] text-[#777777]">
                      {dest.tripCount} excursii
                    </span>
                  </div>
                </div>

                <ChevronRightIcon className="h-4 w-4 text-[#909090] group-hover:text-teal transition-colors flex-shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Cardul „Ai întrebări? Suntem aici pentru tine!” */}
      <div className="rounded-xl border-0 bg-[#F7F7F7] p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-teal-muted text-teal">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-sans text-sm sm:text-base font-bold text-[#1F284B]">
              Ai întrebări?
            </h3>
            <p className="text-xs text-[#777777]">Suntem aici pentru tine!</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-lg bg-white p-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal text-white">
            <PhoneIcon className="h-5 w-5" />
          </div>
          <div>
            <a
              href="tel:+37360123456"
              className="block text-sm sm:text-base font-bold text-[#2C2C2C] hover:text-teal transition-colors"
            >
              +373 60 123 456
            </a>
            <span className="block text-[11px] text-[#777777]">
              Luni - Duminică 08:00 - 20:00
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href="/contact"
            className="flex w-full items-center justify-center gap-1.5 rounded-[3px] bg-teal hover:bg-teal-hover py-2.5 px-4 text-xs sm:text-sm font-bold text-white transition-colors"
          >
            <span>Contactează-ne</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
