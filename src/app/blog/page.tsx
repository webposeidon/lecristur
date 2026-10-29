import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog & Ghiduri de Călătorie | LeCrisTur',
  description:
    'Articole, sfaturi utile și ghiduri turistice pentru vacanțele în România. Descoperă Transilvania, Maramureșul, Bucovina și Delta Dunării alături de LeCrisTur.',
  openGraph: {
    title: 'Blog & Ghiduri de Călătorie | LeCrisTur',
    description:
      'Ghiduri complete și sfaturi de la călători experimentați pentru cele mai frumoase trasee din România.',
    type: 'website',
    locale: 'ro_RO',
  },
};

const ARTICLES = [
  {
    slug: 'top-castele-transilvania',
    title: 'Top castele din Transilvania pe care trebuie să le vezi măcar o dată',
    category: 'Cultură & Istorie',
    readTime: '5 min de citit',
    date: '12 Octombrie 2026',
    excerpt:
      'De la impunătorul Castel Peleș cu arhitectura sa renascentistă germană, până la misteriosul Castel Bran și Cetatea Râșnov, Transilvania oferă o călătorie fascinantă în timp.',
    tripLink: '/excursii/brasov-bran-sinaia',
    tripTitle: 'Vezi excursia Brașov • Bran • Sinaia',
  },
  {
    slug: 'ghid-maramures-mocanita',
    title: 'Ghid complet pentru o călătorie de poveste în Maramureș',
    category: 'Tradiții & Natură',
    readTime: '6 min de citit',
    date: '28 Septembrie 2026',
    excerpt:
      'Tot ce trebuie să știi înainte de plimbarea cu Mocănița de pe Valea Vaserului, Cimitirul Vesel de la Săpânța și bisericile de lemn protejate de patrimoniul mondial UNESCO.',
    tripLink: '/excursii/maramures-mocanita',
    tripTitle: 'Vezi excursia Maramureș & Mocănița',
  },
  {
    slug: 'manastiri-bucovina-patrimoniu',
    title: 'Mănăstirile pictate din Bucovina: comori de artă bizantină',
    category: 'Spiritualitate & Artă',
    readTime: '4 min de citit',
    date: '15 Septembrie 2026',
    excerpt:
      'Frescele exterioare de la Voroneț (celebrul albastru de Voroneț), Sucevița și Moldovița rămân o enigmă tehnică și o capodoperă a artei medievale românești.',
    tripLink: '/excursii/bucovina-manastiri',
    tripTitle: 'Vezi excursia Bucovina & Mănăstirile pictate',
  },
  {
    slug: 'weekend-relaxare-sovata-praid',
    title: 'Relaxare și sănătate: weekend la Lacul Ursu și Salina Praid',
    category: 'Sănătate & Relaxare',
    readTime: '4 min de citit',
    date: '02 Septembrie 2026',
    excerpt:
      'Beneficiile apei helioterme din Lacul Ursu (singurul de acest fel din Europa) și aerul curat, puternic ionizat din adâncurile Salinei Praid.',
    tripLink: '/excursii/sovata-salina-praid',
    tripTitle: 'Vezi excursia Sovata & Salina Praid',
  },
];

export default function BlogPage() {
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
            <span className="font-bold text-[#2C2C2C]">Blog & Ghiduri</span>
          </nav>

          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
            Ghiduri & Inspirație de Călătorie
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl">
            Sfaturi utile, atracții de neratat și povești din spatele celor mai
            frumoase itinerarii din România.
          </p>
        </div>
      </section>

      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((art) => (
            <article
              key={art.slug}
              className="rounded-xl border-0 bg-[#F7F7F7] p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center rounded-[3px] bg-white px-2.5 py-1 font-bold text-teal">
                    {art.category}
                  </span>
                  <div className="text-[#909090] flex items-center gap-2 font-bold">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h2 className="mt-4 font-sans text-xl sm:text-2xl font-bold text-[#1F284B] hover:text-teal transition-colors">
                  {art.title}
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-[#777777] leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-2 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={art.tripLink}
                  className="text-xs font-bold text-teal hover:text-teal-hover transition-colors inline-flex items-center gap-1"
                >
                  <span>{art.tripTitle}</span>
                  <span>&rarr;</span>
                </Link>

                <span className="text-[11px] text-[#909090] font-bold">
                  Echipa LeCrisTur
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Banner CTA către Calendar */}
        <div className="mt-10 rounded-xl bg-[#F7F7F7] border-0 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-sans text-lg sm:text-xl font-bold text-[#1F284B]">
              Vrei să explorezi România în direct?
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-1">
              Plecări săptămânale din Chișinău cu autocarul. Alege data din calendar.
            </p>
          </div>
          <Link
            href="/calendar"
            className="rounded-[3px] bg-teal px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-teal-hover transition-colors whitespace-nowrap"
          >
            Vezi calendarul plecărilor &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
