import Image from 'next/image';
import { formatShortDate, getDayOfWeek } from '@/lib/format';
import { getDestinationName } from '@/lib/labels';
import type { Departure, Trip } from '@/types';

export interface TripItineraryProps {
  trip: Trip;
  nextDeparture: Departure | null;
}

function addDaysToIsoDate(isoDate: string, daysToAdd: number): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate.trim());
  if (!match) return isoDate;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day + daysToAdd, 12, 0, 0);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function ActivityIcon({ text }: { text: string }) {
  const lower = text.toLowerCase();

  if (lower.includes('plecare') || lower.includes('autocar')) {
    return (
      <svg
        className="h-4 w-4 text-teal"
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
    );
  }

  if (
    lower.includes('prânz') ||
    lower.includes('mic dejun') ||
    lower.includes('cină') ||
    lower.includes('restaurant')
  ) {
    return (
      <svg
        className="h-4 w-4 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12"
        />
      </svg>
    );
  }

  if (lower.includes('sosire') || lower.includes('cazare')) {
    return (
      <svg
        className="h-4 w-4 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    );
  }

  return (
    <svg
      className="h-4 w-4 text-teal"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
      />
    </svg>
  );
}

interface LandmarkCardItem {
  title: string;
  location: string;
  image: string;
}

function getLandmarkCards(trip: Trip): LandmarkCardItem[] {
  const imgs =
    trip.images.length > 0
      ? trip.images
      : ['/images/trips/brasov-bran-sinaia.svg'];

  if (trip.slug === 'brasov-bran-sinaia') {
    return [
      {
        title: 'Castelul Peleș',
        location: 'Sinaia',
        image: imgs[1] ?? imgs[0],
      },
      {
        title: 'Castelul Bran',
        location: 'Bran',
        image: imgs[0],
      },
      {
        title: 'Piața Sfatului',
        location: 'Brașov',
        image: imgs[2] ?? imgs[0],
      },
      {
        title: 'Biserica Neagră',
        location: 'Brașov',
        image: imgs[1] ?? imgs[0],
      },
      {
        title: 'Străduțe medievale',
        location: 'Brașov',
        image: imgs[2] ?? imgs[0],
      },
      {
        title: 'Tâmpa',
        location: 'Brașov',
        image: imgs[0],
      },
    ];
  }

  const routeStops = trip.route.points.filter(
    (p) => p.toLowerCase() !== 'chișinău',
  );
  const primaryLocation =
    routeStops[0] ??
    (trip.destinations[0] ? getDestinationName(trip.destinations[0]) : 'România');

  const fallbackTitles = [
    ...trip.highlights.map((h) => h.split(':')[0].trim()),
    ...routeStops.map((stop) => `Obiective în ${stop}`),
    'Centrul istoric',
    'Panoramă naturală',
  ];

  return Array.from({ length: 6 }, (_, idx) => ({
    title: fallbackTitles[idx] ?? `Obiectiv turistic #${idx + 1}`,
    location: routeStops[idx % Math.max(1, routeStops.length)] ?? primaryLocation,
    image: imgs[idx % imgs.length],
  }));
}

export default function TripItinerary({
  trip,
  nextDeparture,
}: TripItineraryProps) {
  const landmarkCards = getLandmarkCards(trip);
  const baseStartDate =
    nextDeparture?.startDate ?? trip.departures[0]?.startDate ?? null;

  return (
    <section
      id="program"
      className="scroll-mt-24 bg-white border-0"
    >
      <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#1F284B]">
        Programul excursiei
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-8 xl:grid-cols-12">
        {/* Stânga: Timeline vertical pe zile și ore */}
        <div className="xl:col-span-6 space-y-7">
          {trip.itinerary.map((day) => {
            const dayIsoDate = baseStartDate
              ? addDaysToIsoDate(baseStartDate, day.dayNumber - 1)
              : null;
            const dayOfWeek = dayIsoDate ? getDayOfWeek(dayIsoDate) : '';
            const shortDate = dayIsoDate ? formatShortDate(dayIsoDate) : '';

            return (
              <div key={day.dayNumber} className="relative pl-6">
                {/* Linie verticală timeline */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-teal/25"
                />
                {/* Bulină Teal Ziua X */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-teal"
                />

                {/* Titlu Zi + Dată calculată dinamic */}
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#2C2C2C]">
                    {day.title}
                  </h3>
                  {dayIsoDate && (
                    <span className="text-xs font-bold text-[#909090]">
                      {dayOfWeek}, {shortDate}
                    </span>
                  )}
                </div>

                {/* Lista de ore și activități */}
                <div className="mt-3.5 space-y-3">
                  {day.activities.map((activity, actIdx) => (
                    <div
                      key={actIdx}
                      className="flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <span className="w-11 flex-shrink-0 pt-0.5 font-bold text-[#2C2C2C]">
                        {activity.time}
                      </span>
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[#F7F7F7]">
                        <ActivityIcon text={activity.text} />
                      </div>
                      <span className="pt-0.5 text-[#777777] leading-snug">
                        {activity.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dreapta: Grila de 6 carduri foto cu obiectivele turistice fără border */}
        <div className="xl:col-span-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {landmarkCards.map((landmark, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-lg border-0 bg-white"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-[#F7F7F7]">
                  <Image
                    src={landmark.image}
                    alt={landmark.title}
                    fill
                    sizes="(min-width: 1280px) 160px, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-2.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#2C2C2C] line-clamp-1">
                    {landmark.title}
                  </h4>
                  <p className="text-[11px] text-[#909090]">
                    {landmark.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
