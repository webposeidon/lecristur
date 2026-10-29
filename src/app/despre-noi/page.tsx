import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Despre Noi | LeCrisTur — Călătorii care unesc oamenii',
  description:
    'Află povestea agenției LeCrisTur. Peste 10 ani de excursii organizate cu autocarul din Republica Moldova către cele mai frumoase destinații din România. Siguranță, confort și ghizi autorizați.',
  openGraph: {
    title: 'Despre Noi | LeCrisTur',
    description:
      'Peste 10 ani de experiență în organizarea excursiilor cu autocarul din Chișinău către cele mai pitorești colțuri ale României.',
    type: 'website',
    locale: 'ro_RO',
  },
};

const PILLARS = [
  {
    title: 'Transport propriu & modern',
    description:
      'Flotă proprie de autocare și microbuze turistice Euro 5 și Euro 6, echipate cu aer condiționat, scaune rabatabile confortabile, prize USB și Wi-Fi.',
    icon: (
      <svg
        className="h-6 w-6 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-10A2.25 2.25 0 0 1 4.5 4.25h15A2.25 2.25 0 0 1 21.75 6.5v10a2.25 2.25 0 0 1-2.25 2.25h-.75m-6 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9-9.5h18M6.75 8.25h.008v.008H6.75V8.25Zm10.5 0h.008v.008H17.25V8.25Z"
        />
      </svg>
    ),
  },
  {
    title: 'Ghizi profesioniști și pasionați',
    description:
      'Însoțitori atestați care transformă fiecare călătorie într-o poveste vie, oferind asistență completă și informații istorice și culturale autentice.',
    icon: (
      <svg
        className="h-6 w-6 text-teal"
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
    ),
  },
  {
    title: 'Cazări atent verificate',
    description:
      'Colaborăm exclusiv cu pensiuni tradiționale și hoteluri de 3 și 4 stele cu recenzii impecabile, curate și primitoare, pentru odihnă deplină.',
    icon: (
      <svg
        className="h-6 w-6 text-teal"
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
    ),
  },
  {
    title: 'Prețuri corecte & transparență',
    description:
      'Fără costuri ascunse la îmbarcare. Traseul, cazările, micul dejun și serviciile de ghidaj sunt clar stipulate de la primul contact.',
    icon: (
      <svg
        className="h-6 w-6 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
];

const STATS = [
  { value: '10+', label: 'Ani de experiență' },
  { value: '15.000+', label: 'Turiști mulțumiți' },
  { value: '50+', label: 'Destinații în România' },
  { value: '4.9 ★', label: 'Rating mediu călători' },
];

export default function DespreNoiPage() {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Antet curat pe alb */}
      <section className="bg-white pt-8 pb-6 md:pt-10 md:pb-8 border-0">
        <div className="container-fluid">
          <nav
            aria-label="Navigație ierarhică"
            className="mb-3 flex items-center gap-2 text-xs sm:text-sm text-[#909090]"
          >
            <Link href="/" className="transition-colors hover:text-teal">
              Acasă
            </Link>
            <span className="text-[#909090]">›</span>
            <span className="font-bold text-[#2C2C2C]">Despre noi</span>
          </nav>

          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
            Despre LeCrisTur
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl">
            „Călătorii care unesc oamenii — din inima Moldovei către frumusețile României”
          </p>
        </div>
      </section>

      <div className="container-fluid space-y-12">
        {/* Card Poveste */}
        <div className="bg-white border-0">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal">
              Misiunea Noastră
            </span>
            <h2 className="mt-2 font-sans text-2xl sm:text-3xl font-bold text-[#1F284B]">
              Creăm experiențe autentice, nu simple călătorii
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#777777]">
              Fondată din pasiunea sinceră pentru călătorie și istorie, agenția{' '}
              <strong className="text-[#2C2C2C] font-bold">LeCrisTur</strong> își
              propune să apropie oamenii de cele mai spectaculoase comori naturale și
              culturale din România: de la maiestuoasele castele ale Transilvaniei
              (Bran, Peleș, Corvinilor), la tradițiile intacte din Maramureș și
              mănăstirile pictate din Bucovina.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#777777]">
              Fiecare itinerariu este parcurs și verificat personal de echipa
              noastră. Ne asigurăm că timpul petrecut în autocar este relaxant,
              cazările oferă tot confortul necesar, iar ghizii noștri aduc la viață
              legendele și poveștile fiecărui colț vizitat.
            </p>
          </div>

          {/* Grila 4 Statistici */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-[#F7F7F7] p-5 text-center border-0"
              >
                <span className="font-sans text-2xl sm:text-3xl font-bold text-teal block">
                  {stat.value}
                </span>
                <span className="text-xs text-[#777777] mt-1 block font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grila 4 Piloni de Siguranță & Încredere */}
        <div>
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal">
              De ce să alegi LeCrisTur
            </span>
            <h2 className="mt-2 font-sans text-2xl sm:text-3xl font-bold text-[#1F284B]">
              Standarde înalte pentru vacanța ta
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border-0 bg-[#F7F7F7] p-6 flex items-start gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-sans text-lg font-bold text-[#1F284B]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner CTA pe #F7F7F7 fără gradient */}
        <div className="rounded-xl bg-[#F7F7F7] p-8 sm:p-10 text-[#2C2C2C] border-0 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-sans text-2xl font-bold text-[#1F284B]">
              Ești gata pentru o nouă aventură în România?
            </h3>
            <p className="mt-1 text-sm text-[#777777] max-w-xl">
              Consultă catalogul complet sau calendarul plecărilor și alege data
              potrivită pentru tine și cei dragi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/excursii"
              className="rounded-[3px] bg-teal px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-teal-hover transition-colors"
            >
              Catalogul de excursii
            </Link>
            <Link
              href="/calendar"
              className="rounded-[3px] border-0 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#2C2C2C] hover:text-teal transition-colors"
            >
              Calendarul plecărilor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
