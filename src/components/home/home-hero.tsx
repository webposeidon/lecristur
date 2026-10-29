'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import HeroSearchBar from '@/components/home/hero-search-bar';

interface HomeHeroProps {
  className?: string;
}

// Checkmark SVG Icon pentru beneficii
function TealCheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const HERO_BENEFITS = [
  {
    title: 'Transport propriu',
    subtitle: 'Autocare și microbuze moderne',
  },
  {
    title: 'Ghid și însoțitor',
    subtitle: 'Asistență pe tot traseul',
  },
  {
    title: 'Excursii pentru toți',
    subtitle: 'Familii, tineri și grupuri',
  },
  {
    title: 'Rezervare simplă',
    subtitle: 'Online sau telefonic, fără avans ascuns',
  },
];

export default function HomeHero({ className }: HomeHeroProps) {
  return (
    <section
      className={clsx(
        'relative bg-white text-[#2C2C2C] pt-8 pb-6 lg:pt-12 lg:pb-8',
        className,
      )}
    >
      <div className="container-fluid">
        {/* Antet Hero: Layout echilibrat pe 2 coloane (Text + Colaj Vizual Destinații) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-8 lg:mb-10">
          {/* Coloana Stângă (7 col): Titlu, Subtitlu și Grilă 2x2 Beneficii */}
          <div className="lg:col-span-7">
            <h1 className="font-sans text-3xl sm:text-4xl xl:text-[44px] font-bold tracking-tight text-[#1F284B] leading-[1.15]">
              Descoperă România alături de{' '}
              <span className="text-teal whitespace-nowrap">LeCris Tur</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#777777] leading-relaxed font-normal max-w-2xl">
              Excursii organizate din Republica Moldova către cele mai frumoase
              destinații din România — castele medievale, drumuri alpine,
              mănăstiri din Bucovina și relaxare la Sovata.
            </p>

            {/* Cele 4 beneficii organizate în grilă 2x2 pe suprafață curată #F7F7F7 */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl">
              {HERO_BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-center gap-3.5 rounded-lg bg-[#F7F7F7] px-4 py-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-teal flex-shrink-0">
                    <TealCheckIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#2C2C2C] leading-snug">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-[#777777] mt-0.5 truncate">
                      {benefit.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coloana Dreaptă (5 col): Colaj organizat cu 3 imagini placeholder ale destinațiilor */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-12 gap-3.5 h-[280px] sm:h-[340px]">
              {/* Card Vizual Principal (Stânga - 7 coloane) */}
              <Link
                href="/excursii?destinatie=transilvania"
                className="col-span-7 relative rounded-xl overflow-hidden bg-[#EDF6F6] group block h-full"
              >
                <Image
                  src="/images/trips/brasov-bran-sinaia.svg"
                  alt="Castelul Bran și Brașov"
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 rounded-lg px-3.5 py-2.5 shadow-float">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-teal">
                    Plecări săptămânale
                  </p>
                  <p className="text-sm font-bold text-[#1F284B] truncate mt-0.5">
                    Brașov, Bran &amp; Castelul Peleș
                  </p>
                </div>
              </Link>

              {/* Două Carduri Vizuale Suprapuse (Dreapta - 5 coloane) */}
              <div className="col-span-5 flex flex-col gap-3.5 h-full">
                <Link
                  href="/excursii?destinatie=transilvania"
                  className="relative flex-1 rounded-xl overflow-hidden bg-[#EBF6F6] group block"
                >
                  <Image
                    src="/images/trips/transfagarasan-balea-lac.svg"
                    alt="Transfăgărășan și Bâlea Lac"
                    fill
                    priority
                    sizes="(max-width: 1024px) 40vw, 18vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 rounded-md px-2.5 py-1.5 shadow-float">
                    <p className="text-xs font-bold text-[#1F284B] truncate">
                      Transfăgărășan
                    </p>
                  </div>
                </Link>

                <Link
                  href="/excursii?destinatie=bucovina"
                  className="relative flex-1 rounded-xl overflow-hidden bg-[#F0F7F7] group block"
                >
                  <Image
                    src="/images/trips/bucovina-manastiri.svg"
                    alt="Bucovina și Maramureș"
                    fill
                    sizes="(max-width: 1024px) 40vw, 18vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 rounded-md px-2.5 py-1.5 shadow-float">
                    <p className="text-xs font-bold text-[#1F284B] truncate">
                      Bucovina &amp; Mănăstiri
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bara de căutare flotantă aliniată la întreaga lățime a containerului */}
        <div>
          <HeroSearchBar />
        </div>
      </div>
    </section>
  );
}
