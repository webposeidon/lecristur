import Image from 'next/image';
import type { Trip } from '@/types';

export interface TripOverviewProps {
  trip: Trip;
}

const DEFAULT_HIGHLIGHT_CARDS = [
  {
    title: 'Peisaje spectaculoase',
    subtitle: 'Munți și orașe medievale',
  },
  {
    title: 'Obiective renumite',
    subtitle: 'Castelul Peleș și Bran',
  },
  {
    title: 'Timp liber pentru explorare',
    subtitle: 'Brașov, suveniruri, restaurante',
  },
  {
    title: 'Potrivit pentru toți',
    subtitle: 'Familii, tineri, grupuri',
  },
];

function parseHighlightCard(raw: string | undefined, fallbackIdx: number) {
  const fallback =
    DEFAULT_HIGHLIGHT_CARDS[fallbackIdx % DEFAULT_HIGHLIGHT_CARDS.length];
  if (!raw) return fallback;
  const parts = raw.split(':');
  if (parts.length >= 2) {
    return {
      title: parts[0].trim(),
      subtitle: parts.slice(1).join(':').trim(),
    };
  }
  return {
    title: raw.trim(),
    subtitle: fallback.subtitle,
  };
}

function HighlightIcon({ index }: { index: number }) {
  switch (index % 4) {
    case 0:
      // Munți / Peisaje
      return (
        <svg
          className="h-5 w-5 text-teal"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.6}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      );
    case 1:
      // Castel / Obiective
      return (
        <svg
          className="h-5 w-5 text-teal"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.6}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
          />
        </svg>
      );
    case 2:
      // Ceas / Timp liber
      return (
        <svg
          className="h-5 w-5 text-teal"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.6}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      );
    default:
      // Grup / Potrivit pentru toți
      return (
        <svg
          className="h-5 w-5 text-teal"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.6}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.999-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      );
  }
}

export default function TripOverview({ trip }: TripOverviewProps) {
  const videoPreviewImage =
    trip.images[2] ?? trip.images[0] ?? '/images/trips/brasov-bran-sinaia.svg';

  const highlightCards = [0, 1, 2, 3].map((idx) =>
    parseHighlightCard(trip.highlights[idx], idx),
  );

  return (
    <section
      id="descriere"
      className="scroll-mt-24 bg-white border-0"
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:items-center">
        {/* Coloana stângă: Titlu, Descriere + 4 mini-carduri puncte forte */}
        <div className="xl:col-span-7">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#1F284B]">
            Descriere excursie
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#777777]">
            {trip.description ??
              `Te invităm într-o călătorie de neuitat alături de LeCrisTur către ${trip.title}. ${trip.subtitle}.`}
          </p>

          {/* Cele 4 carduri de puncte forte fără border */}
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
            {highlightCards.map((card, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-lg border-0 bg-[#F7F7F7] p-3.5"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white border-0">
                  <HighlightIcon index={idx} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-[#2C2C2C] leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#777777] leading-tight">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coloana dreaptă: Video preview placeholder fără gradient */}
        <div className="xl:col-span-5">
          <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-lg border-0 bg-[#F7F7F7]">
            <Image
              src={videoPreviewImage}
              alt={`Descoperă atmosfera excursiei — ${trip.title}`}
              fill
              sizes="(min-width: 1280px) 320px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />

            {/* Buton Play central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-float transition-transform duration-300 group-hover:scale-110 group-hover:bg-teal-hover">
                <svg
                  className="ml-0.5 h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Subsol Video Card */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="rounded bg-black/50 px-2.5 py-1 text-xs font-bold">
                Descoperă atmosfera excursiei
              </span>
              <span className="rounded bg-black/60 px-2 py-0.5 text-[11px] font-bold text-white">
                02:36
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
