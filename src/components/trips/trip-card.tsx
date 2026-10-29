'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import Badge from '@/components/ui/badge';
import { formatPrice, formatShortDate } from '@/lib/format';
import { formatDurationLabel, TRIP_BADGE_LABELS } from '@/lib/labels';
import type { TripBadge, TripSummary } from '@/types';

export interface TripCardProps {
  trip: TripSummary;
  showNextDeparture?: boolean;
  className?: string;
  priority?: boolean;
}

const BADGE_COLOR_MAP: Record<
  TripBadge,
  'popular' | 'natura' | 'cultural' | 'citybreak' | 'exclusiv'
> = {
  popular: 'popular',
  'new-tour': 'natura',
  exclusive: 'cultural',
  'city-break': 'citybreak',
  nature: 'natura',
  cultural: 'cultural',
};

export default function TripCard({
  trip,
  showNextDeparture = true,
  className,
  priority = false,
}: TripCardProps) {
  const primaryImage =
    trip.images?.[0] || '/images/trips/brasov-bran-sinaia.svg';
  const durationLabel = formatDurationLabel(trip.days, trip.nights);
  const nextDepartureDate = trip.nextDeparture?.startDate
    ? formatShortDate(trip.nextDeparture.startDate)
    : null;
  const badgeLabel = trip.badge ? TRIP_BADGE_LABELS[trip.badge] : null;
  const badgeColor = trip.badge ? BADGE_COLOR_MAP[trip.badge] : 'popular';

  const metaParts = [
    durationLabel,
    trip.transportIncluded ? 'Transport inclus' : null,
    trip.hotelStars > 0 ? `Hotel ${trip.hotelStars}★` : null,
  ].filter(Boolean);

  return (
    <article
      className={clsx(
        'group relative flex flex-col rounded-lg border-0 bg-white transition-all duration-300',
        className,
      )}
    >
      {/* Imagine curată rounded-lg */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#F7F7F7]">
        <Link href={`/excursii/${trip.slug}`} tabIndex={-1}>
          <Image
            src={primaryImage}
            alt={trip.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badge categorie stânga-sus */}
        {badgeLabel && (
          <div className="absolute left-3 top-3 z-10">
            <Badge
              variant="solid"
              color={badgeColor}
              size="sm"
              rounded="md"
              className="font-bold text-[11px]"
            >
              {badgeLabel}
            </Badge>
          </div>
        )}

        {/* Inimioară dreapta-sus */}
        <button
          type="button"
          aria-label="Adaugă la favorite"
          className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#2C2C2C] shadow-sm transition-colors hover:text-teal"
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Conținut direct pe alb dedesubt — stil GridCard din tripfinder-hotel */}
      <div className="flex flex-1 flex-col pt-3.5 pb-2 px-0.5">
        {/* Meta gri mic (#909090, 13px) */}
        <div className="truncate text-[13px] font-normal text-[#909090]">
          {metaParts.join(' • ')}
        </div>

        {/* Titlu bold #2C2C2C (17px), hover Teal */}
        <Link href={`/excursii/${trip.slug}`} className="mt-0.5 block">
          <h3 className="truncate font-sans text-[17px] font-bold text-[#2C2C2C] transition-colors group-hover:text-teal">
            {trip.title}
          </h3>
        </Link>

        {/* Preț curat + Următoarea plecare */}
        <div className="mt-0.5 flex items-center justify-between gap-2 text-[13px] font-normal text-[#2C2C2C]">
          <span>
            de la <strong className="font-bold">{formatPrice(trip.startingPrice)}</strong> / persoană
          </span>
          {showNextDeparture && (
            <span className="truncate text-[12px] text-[#909090]">
              Plecare: <strong className="font-bold text-[#2C2C2C]">{nextDepartureDate ?? 'La cerere'}</strong>
            </span>
          )}
        </div>

        {/* Rating cu steluțe Teal (#008489) + Link simplu „Vezi detalii” în Teal */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[13px] text-[#2C2C2C]">
            <div className="flex items-center text-[#008489]">
              {Array.from({ length: 5 }).map((_, idx) => (
                <StarIcon
                  key={idx}
                  className={clsx(
                    'h-3.5 w-3.5',
                    idx < Math.round(trip.rating) ? 'text-[#008489]' : 'text-[#E2E2E2]',
                  )}
                />
              ))}
            </div>
            <strong className="ml-1 font-bold text-[#2C2C2C]">
              {trip.rating.toFixed(1)}
            </strong>
            <span className="text-[#909090]">({trip.reviewCount})</span>
          </div>

          <Link
            href={`/excursii/${trip.slug}`}
            className="inline-flex items-center text-[14px] font-bold text-teal transition-colors hover:text-teal-light"
          >
            Vezi detalii
          </Link>
        </div>
      </div>
    </article>
  );
}
