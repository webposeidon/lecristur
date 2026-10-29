'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import { formatShortDate } from '@/lib/format';
import type { Trip } from '@/types';

export interface TripReviewsCardProps {
  trip: Trip;
}

export default function TripReviewsCard({ trip }: TripReviewsCardProps) {
  const reviews =
    trip.reviews.length > 0
      ? trip.reviews
      : [
          {
            id: 'default-rev',
            author: 'Ana M.',
            rating: 5.0,
            date: '2026-10-12',
            text: 'O excursie minunată! Organizare excelentă, șofer profesionist, ghid foarte bine pregătit. Am vizitat locuri superbe și am avut timp suficient pentru poze. Recomand cu drag!',
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentReview = reviews[currentIndex] ?? reviews[0];

  const baseImages =
    trip.images.length > 0
      ? trip.images
      : ['/images/trips/brasov-bran-sinaia.svg'];
  const reviewThumbnails = Array.from(
    { length: 4 },
    (_, idx) => baseImages[idx % baseImages.length],
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const initials = currentReview.author
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      id="recenzii"
      className="scroll-mt-24 rounded-xl border-0 bg-white p-5 sm:p-6 shadow-float"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-sans text-lg sm:text-xl font-bold text-[#1F284B]">
          Ce spun turiștii noștri
        </h2>
        <a
          href="#recenzii"
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="text-xs font-bold text-teal transition hover:underline whitespace-nowrap"
        >
          Vezi toate recenziile →
        </a>
      </div>

      {/* Corp recenzie cu săgeți stânga / dreapta */}
      <div className="relative mt-4 rounded-lg border-0 bg-[#F7F7F7] p-4">
        {/* Săgeată stânga */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Recenzia anterioară"
          className="absolute -left-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border-0 bg-white text-[#2C2C2C] shadow-float transition hover:bg-teal hover:text-white"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        {/* Săgeată dreapta */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Recenzia următoare"
          className="absolute -right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border-0 bg-white text-[#2C2C2C] shadow-float transition hover:bg-teal hover:text-white"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>

        {/* Autor + Rating + Dată */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal text-xs font-bold text-white">
            {initials}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
            <span className="font-bold text-[#2C2C2C]">{currentReview.author}</span>
            <span className="inline-flex items-center gap-0.5 font-bold text-[#008489]">
              <StarIcon className="h-3.5 w-3.5 text-[#008489]" />
              {currentReview.rating.toFixed(1)}
            </span>
            <span className="text-[#909090]">
              {formatShortDate(currentReview.date)}
            </span>
          </div>
        </div>

        {/* Text recenzie */}
        <p className="mt-3 text-xs leading-relaxed text-[#777777]">
          {currentReview.text}
        </p>

        {/* Cele 4 miniaturi foto din recenzie */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {reviewThumbnails.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-[16/11] overflow-hidden rounded-md bg-white"
            >
              <Image
                src={src}
                alt={`Fotografie turist ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicatori (dots) */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Recenzia ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-4 bg-teal' : 'w-1.5 bg-[#E6E6E6]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
