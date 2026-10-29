import type { Trip } from '@/types';

export interface TripRouteCardProps {
  trip: Trip;
}

export default function TripRouteCard({ trip }: TripRouteCardProps) {
  const points =
    trip.route.points.length > 0
      ? trip.route.points
      : ['Chișinău', 'România'];

  const startPoint = points[0] ?? 'Chișinău';
  const stopPoints = points.slice(1);
  const stopsLabel =
    stopPoints.length > 0 ? stopPoints.join(', ') : trip.title;

  return (
    <section
      id="harta"
      className="scroll-mt-24 rounded-xl border-0 bg-white p-5 sm:p-6 shadow-float"
    >
      <h2 className="font-sans text-lg sm:text-xl font-bold text-[#1F284B]">
        Traseul excursiei
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
        {/* Hartă statică SVG curată */}
        <div className="sm:col-span-7 overflow-hidden rounded-lg border-0 bg-[#F7F7F7]">
          <svg
            viewBox="0 0 320 210"
            className="h-full w-full"
            role="img"
            aria-label={`Harta traseului: ${points.join(' - ')}`}
          >
            {/* Fundal stilizat relief și râuri */}
            <rect width="320" height="210" fill="#F2F6F6" />
            <path
              d="M0 35 Q80 60 140 40 T280 70 L320 50 L320 210 L0 210 Z"
              fill="#E6F3F3"
              opacity="0.7"
            />
            <path
              d="M40 0 Q110 85 95 210"
              stroke="#CBE0EE"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M210 0 Q235 95 260 210"
              stroke="#CBE0EE"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Drumuri secundare decorative */}
            <path
              d="M15 160 Q120 140 305 175"
              stroke="#D8DFD9"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M70 25 Q150 90 290 45"
              stroke="#D8DFD9"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Traseul activ al excursiei (linie punctată + curbă Teal) */}
            <path
              d="M235 128 C 195 142, 148 92, 118 82 C 102 78, 92 98, 86 116"
              stroke="#0E7A7A"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M235 128 C 195 142, 148 92, 118 82 C 102 78, 92 98, 86 116"
              stroke="#99CECE"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* Pin Plecare (Chișinău - dreapta) */}
            <g transform="translate(235, 128)">
              <circle r="9" fill="#0E7A7A" opacity="0.2" />
              <circle r="5" fill="#0E7A7A" stroke="#FFFFFF" strokeWidth="2" />
              <text
                x="10"
                y="-6"
                className="fill-[#1F284B] text-[11px] font-bold"
                style={{ fontFamily: 'sans-serif' }}
              >
                {startPoint}
              </text>
            </g>

            {/* Pin Oprire 1 (ex: Sinaia) */}
            <g transform="translate(118, 82)">
              <circle r="5" fill="#008489" stroke="#FFFFFF" strokeWidth="1.8" />
              <text
                x="6"
                y="-8"
                className="fill-[#1F284B] text-[10px] font-bold"
                style={{ fontFamily: 'sans-serif' }}
              >
                {stopPoints[0] ?? 'Sinaia'}
              </text>
            </g>

            {/* Pin Oprire 2 (ex: Bran) */}
            {stopPoints.length > 1 && (
              <g transform="translate(94, 98)">
                <circle
                  r="4.5"
                  fill="#008489"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                />
                <text
                  x="-36"
                  y="3"
                  className="fill-[#1F284B] text-[10px] font-bold"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {stopPoints[1]}
                </text>
              </g>
            )}

            {/* Pin Destinație (ex: Brașov) */}
            <g transform="translate(86, 116)">
              <circle r="8" fill="#0E7A7A" opacity="0.2" />
              <circle r="5" fill="#0E7A7A" stroke="#FFFFFF" strokeWidth="2" />
              <text
                x="8"
                y="14"
                className="fill-[#1F284B] text-[11px] font-bold"
                style={{ fontFamily: 'sans-serif' }}
              >
                {stopPoints[stopPoints.length - 1] ?? 'Brașov'}
              </text>
            </g>
          </svg>
        </div>

        {/* Coloana cu detalii de traseu */}
        <div className="sm:col-span-5 space-y-3">
          {/* Distanță totală */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#F7F7F7] text-teal">
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
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C] leading-tight">
                {trip.route.distanceKm} km
              </span>
              <span className="block text-[11px] text-[#777777]">
                Distanță totală
              </span>
            </div>
          </div>

          {/* Autocar */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#F7F7F7] text-teal">
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
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-10A2.25 2.25 0 0 1 4.5 4.25h15A2.25 2.25 0 0 1 21.75 6.5v10a2.25 2.25 0 0 1-2.25 2.25h-.75"
                />
              </svg>
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C] leading-tight">
                Autocar
              </span>
              <span className="block text-[11px] text-[#777777]">
                Transport modern
              </span>
            </div>
          </div>

          {/* Ghid însoțitor */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#F7F7F7] text-teal">
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0"
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

          {/* Puncte de oprire */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#F7F7F7] text-teal">
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
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-[#2C2C2C] leading-tight">
                Puncte de oprire
              </span>
              <span className="block text-[11px] text-[#777777]">{stopsLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
