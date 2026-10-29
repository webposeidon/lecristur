'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {
  CameraIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { formatDurationLabel, TRIP_BADGE_LABELS } from '@/lib/labels';
import type { Trip } from '@/types';

export interface TripHeroGalleryProps {
  trip: Trip;
}

const GALLERY_LABELS = [
  'Panoramă și arhitectură medievală',
  'Castelul Peleș și Valea Prahovei',
  'Centrul istoric și Piața Sfatului',
  'Peisaje montane din Carpați',
  'Străduțe medievale și cetăți',
  'Atmosferă de poveste în România',
];

export function TripHeroBanner({
  trip,
  onOpenGallery,
  totalPhotosCount,
}: {
  trip: Trip;
  onOpenGallery: (index?: number) => void;
  totalPhotosCount: number;
}) {
  const durationLabel = formatDurationLabel(trip.days, trip.nights);
  const badgeLabel = trip.badge ? TRIP_BADGE_LABELS[trip.badge] : 'Popular';

  return (
    <section className="bg-white text-[#2C2C2C] pt-8 pb-6 border-0">
      <div className="container-fluid">
        <div className="lg:w-[66%] lg:pr-6">
          {/* Breadcrumbs */}
          <nav
            aria-label="Navigație ierarhică"
            className="mb-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#909090]"
          >
            <Link href="/" className="transition-colors hover:text-teal">
              Acasă
            </Link>
            <span className="text-[#909090]">›</span>
            <Link
              href="/excursii"
              className="transition-colors hover:text-teal"
            >
              Toate excursiile
            </Link>
            <span className="text-[#909090]">›</span>
            <span className="font-bold text-[#2C2C2C]">{trip.title}</span>
          </nav>

          {/* Badge-uri */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {trip.badge && (
              <span className="inline-flex items-center rounded-[3px] bg-teal px-2.5 py-1 text-xs font-bold tracking-wide text-white">
                {badgeLabel}
              </span>
            )}
            <span className="inline-flex items-center rounded-[3px] bg-[#F7F7F7] px-2.5 py-1 text-xs font-bold tracking-wide text-[#2C2C2C]">
              Excursie de {trip.days} {trip.days === 1 ? 'zi' : 'zile'}
            </span>
          </div>

          {/* Titlu sans-serif mare & Subtitlu */}
          <h1 className="font-sans text-3xl sm:text-4xl xl:text-[40px] font-bold tracking-tight text-[#1F284B] leading-tight">
            {trip.title}
          </h1>
          <p className="mt-2 font-sans text-base sm:text-lg font-bold text-[#2C2C2C]">
            {trip.subtitle}
          </p>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#777777]">
            Un weekend de poveste prin cele mai frumoase locuri din România.
            <br className="hidden sm:inline" /> Descoperă istorie, natură și
            arhitectură impresionantă alături de LeCris Tur.
          </p>

          {/* Bara cu 5 atribute cu iconițe Teal + Buton „Vezi galeria foto” */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
              {/* 1. Durată */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-teal">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C] leading-tight">
                    {durationLabel}
                  </span>
                  <span className="block text-[11px] text-[#777777]">
                    Durată excursie
                  </span>
                </div>
              </div>

              {/* 2. Transport inclus */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-teal">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-10A2.25 2.25 0 0 1 4.5 4.25h15A2.25 2.25 0 0 1 21.75 6.5v10a2.25 2.25 0 0 1-2.25 2.25h-.75m-6 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9-9.5h18"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C] leading-tight">
                    {trip.transportIncluded
                      ? 'Transport inclus'
                      : 'Transport opțional'}
                  </span>
                  <span className="block text-[11px] text-[#777777]">
                    Autocar modern
                  </span>
                </div>
              </div>

              {/* 3. Hotel */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-teal">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m16.5-18v18m-13.5-15h4.5a1.5 1.5 0 0 1 1.5 1.5v13.5h-7.5V4.5A1.5 1.5 0 0 1 6 3Zm9 4.5h3m-3 4.5h3m-3 4.5h3"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C] leading-tight">
                    {trip.hotelStars > 0
                      ? `Hotel ${trip.hotelStars}★`
                      : 'Excursie 1 zi'}
                  </span>
                  <span className="block text-[11px] text-[#777777]">
                    {trip.hotelStars > 0 ? 'Cazare inclusă' : 'Fără cazare'}
                  </span>
                </div>
              </div>

              {/* 4. Ghid însoțitor */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-teal">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C] leading-tight">
                    Ghid însoțitor
                  </span>
                  <span className="block text-[11px] text-[#777777]">
                    Pe tot traseul
                  </span>
                </div>
              </div>

              {/* 5. Rating + recenzii */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-[#008489]">
                  <svg
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C] leading-tight">
                    {trip.rating.toFixed(1)} ({trip.reviewCount} recenzii)
                  </span>
                  <span className="block text-[11px] text-[#777777]">
                    Turiști mulțumiți
                  </span>
                </div>
              </div>
            </div>

            {/* Buton „Vezi galeria foto (32)” */}
            <button
              type="button"
              onClick={() => onOpenGallery(0)}
              className="inline-flex items-center gap-2 rounded-[4px] border-0 bg-[#F7F7F7] px-3.5 py-2 text-xs font-bold text-[#2C2C2C] transition hover:bg-teal hover:text-white"
            >
              <CameraIcon className="h-4 w-4 text-teal group-hover:text-white" />
              <span>Vezi galeria foto ({totalPhotosCount})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TripHeroGallery({ trip }: TripHeroGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Construim lista de 5 miniaturi folosind exclusiv imaginile din trip.images (mock)
  const baseImages =
    trip.images.length > 0
      ? trip.images
      : ['/images/trips/brasov-bran-sinaia.svg'];

  const thumbnails = Array.from({ length: 5 }, (_, idx) => ({
    src: baseImages[idx % baseImages.length],
    caption: `${trip.title} — ${GALLERY_LABELS[idx % GALLERY_LABELS.length]}`,
  }));

  const extraPhotosCount = 27;
  const totalPhotosCount = thumbnails.length + extraPhotosCount; // 32

  const openGalleryAt = (idx = 0) => {
    setActiveIndex(idx);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <TripHeroBanner
        trip={trip}
        onOpenGallery={openGalleryAt}
        totalPhotosCount={totalPhotosCount}
      />

      {/* Banda de 5 miniaturi foto poziționată în coloana stângă (8/12) sub antet */}
      <div className="container-fluid relative z-10">
        <div className="lg:w-[66%] lg:pr-6">
          <div className="grid grid-cols-5 gap-2.5 bg-white">
            {thumbnails.map((item, idx) => {
              const isLast = idx === thumbnails.length - 1;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => openGalleryAt(idx)}
                  className="group relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#F7F7F7] border-0 focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 1024px) 13vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {isLast && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-colors group-hover:bg-black/60">
                      <span className="font-sans text-sm sm:text-lg font-bold text-white">
                        +{extraPhotosCount}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal (Headless UI Dialog) */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <DialogPanel className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white text-[#2C2C2C] shadow-float border-0">
            {/* Header Lightbox */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white">
              <DialogTitle className="font-sans text-base sm:text-lg font-bold text-[#1F284B]">
                {trip.title} — Galerie foto ({activeIndex + 1} /{' '}
                {thumbnails.length})
              </DialogTitle>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Închide galeria"
                className="rounded-lg p-1.5 text-[#777777] transition hover:bg-[#F7F7F7] hover:text-[#2C2C2C]"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Imagine activă */}
            <div className="relative aspect-[16/10] w-full bg-[#F7F7F7]">
              <Image
                src={thumbnails[activeIndex]?.src ?? baseImages[0]}
                alt={thumbnails[activeIndex]?.caption ?? trip.title}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-contain"
              />

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Imaginea anterioară"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2C2C2C] shadow-float transition hover:bg-teal hover:text-white"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Imaginea următoare"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2C2C2C] shadow-float transition hover:bg-teal hover:text-white"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Footer cu caption și miniaturi */}
            <div className="flex flex-col gap-3 bg-white px-5 py-4">
              <p className="text-center text-xs sm:text-sm font-bold text-[#2C2C2C]">
                {thumbnails[activeIndex]?.caption}
              </p>
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-md transition ${
                      idx === activeIndex
                        ? 'ring-2 ring-teal opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={thumb.src}
                      alt={thumb.caption}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
