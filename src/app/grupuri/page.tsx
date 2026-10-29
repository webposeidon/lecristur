import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Excursii de Grup & Corporate | LeCrisTur',
  description:
    'Organizează excursii personalizate de grup cu autocarul din Moldova în România. Oferte speciale pentru firme, școli și grupuri de prieteni. Telefon: +373 60 123 456.',
  openGraph: {
    title: 'Excursii de Grup & Corporate | LeCrisTur',
    description:
      'Trasee personalizate, autocare moderne exclusive și tarife avantajoase pentru grupuri organizate.',
    type: 'website',
    locale: 'ro_RO',
  },
};

const GROUP_ADVANTAGES = [
  {
    title: 'Autocar exclusiv pentru grupul tău',
    description:
      'Vehicul modern de 20, 35 sau 50 de locuri alocat exclusiv evenimentului tău, cu șoferi experimentați și asistență permanentă.',
  },
  {
    title: 'Traseu și program 100% flexibile',
    description:
      'Alegeți data plecării, orele de pauză, obiectivele turistice vizitate și restaurantele unde doriți să serviți masa.',
  },
  {
    title: 'Punct de plecare la alegere',
    description:
      'Îmbarcare din Chișinău, Bălți, Ungheni, Cahul sau direct de la sediul companiei/instituției dumneavoastră.',
  },
  {
    title: 'Tarife speciale & reduceri de grup',
    description:
      'Oferte negociate de cazare și masă, gratuități pentru conducătorul de grup și condiții flexibile de rezervare.',
  },
];

export default function GrupuriPage() {
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
            <span className="font-bold text-[#2C2C2C]">Excursii de grup</span>
          </nav>

          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
            Excursii de Grup & Corporate
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl">
            Soluții turistice personalizate pentru companii, asociații, școli și
            grupuri mari de prieteni cu plecare din Republica Moldova.
          </p>
        </div>
      </section>

      <div className="container-fluid space-y-10">
        {/* Card Principal de Prezentare */}
        <div className="bg-white border-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Pachete personalizate
              </span>
              <h2 className="mt-2 font-sans text-2xl sm:text-3xl font-bold text-[#1F284B]">
                Călătoria ideală pentru echipa sau colectivul tău
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#777777] leading-relaxed">
                Fie că doriți un weekend de team-building în Brașov, o călătorie de
                relaxare în Sovata sau o excursie cultural-educativă în Bucovina
                și Maramureș, LeCrisTur se ocupă de tot: transport, cazări
                selectate, ghizi autorizați și activități recreative.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+37360123456"
                  className="rounded-[3px] bg-teal px-6 py-3 text-sm font-bold text-white hover:bg-teal-hover transition-colors inline-flex items-center gap-2"
                >
                  <span>Sună pentru ofertă:</span>
                  <span className="font-bold">+373 60 123 456</span>
                </a>
                <Link
                  href="/contact"
                  className="rounded-[3px] border-0 bg-[#F7F7F7] px-6 py-3 text-sm font-bold text-[#2C2C2C] hover:bg-[#EBEBEB] transition-colors"
                >
                  Trimite o solicitare scrisă
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F7F7F7] border-0 p-6 rounded-xl">
              <h3 className="font-sans text-lg font-bold text-[#1F284B]">
                De ce aleg grupurile LeCrisTur?
              </h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-[#777777]">
                <li className="flex items-start gap-2.5">
                  <span className="text-teal font-bold text-base leading-none">
                    ✓
                  </span>
                  <span>Contract comercial și factură fiscală pentru persoane juridice</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-teal font-bold text-base leading-none">
                    ✓
                  </span>
                  <span>Autocare verificate tehnic conform normelor internaționale</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-teal font-bold text-base leading-none">
                    ✓
                  </span>
                  <span>Asigurări medicale și suport la trecerea frontierei</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-teal font-bold text-base leading-none">
                    ✓
                  </span>
                  <span>Opțiuni de team-building, degustări tradiționale și foc de tabără</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Avantaje Grup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GROUP_ADVANTAGES.map((adv, idx) => (
            <div
              key={adv.title}
              className="rounded-xl border-0 bg-[#F7F7F7] p-6"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-teal font-bold text-sm">
                0{idx + 1}
              </span>
              <h3 className="mt-4 font-sans text-base font-bold text-[#1F284B]">
                {adv.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
