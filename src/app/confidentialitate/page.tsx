import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate | LeCrisTur',
  description:
    'Cum protejăm și prelucrăm datele tale cu caracter personal în cadrul rezervărilor de excursii LeCrisTur.',
};

export default function ConfidentialitatePage() {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Antet curat pe alb */}
      <section className="bg-white pt-8 pb-6 md:pt-10 md:pb-8 border-0">
        <div className="container-fluid max-w-4xl mx-auto">
          <nav
            aria-label="Navigație ierarhică"
            className="mb-3 flex items-center gap-2 text-xs sm:text-sm text-[#909090]"
          >
            <Link href="/" className="transition-colors hover:text-teal">
              Acasă
            </Link>
            <span className="text-[#909090]">›</span>
            <span className="font-bold text-[#2C2C2C]">Politica de confidențialitate</span>
          </nav>

          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
            Politica de Confidențialitate
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl">
            Protecția și securitatea datelor personale ale pasagerilor noștri este o prioritate absolută.
          </p>
        </div>
      </section>

      <div className="container-fluid">
        <div className="rounded-xl border-0 bg-[#F7F7F7] p-6 sm:p-10 max-w-4xl mx-auto space-y-6 text-xs sm:text-sm text-[#777777] leading-relaxed">
          <div>
            <h2 className="font-sans text-lg font-bold text-[#1F284B]">
              1. Datele colectate
            </h2>
            <p className="mt-2">
              Pentru procesarea rezervărilor și emiterea biletelor colectăm exclusiv
              datele strict necesare: nume și prenume, număr de telefon de contact,
              adresă de email și datele de pașaport necesare întocmirii listei de pasageri
              pentru transport internațional de persoane.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-lg font-bold text-[#1F284B]">
              2. Scopul prelucrării datelor
            </h2>
            <p className="mt-2">
              Datele sunt prelucrate exclusiv în scopul executării contractului de servicii
              turistice: comunicarea orelor de îmbarcare, transmiterea biletului electronic,
              rezervarea camerelor de hotel și asigurarea asistenței pe traseu. Nu
              înstrăinăm și nu comercializăm datele dumneavoastră către terți în scopuri publicitare.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-lg font-bold text-[#1F284B]">
              3. Drepturile dumneavoastră
            </h2>
            <p className="mt-2">
              În conformitate cu legislația privind protecția datelor cu caracter personal,
              aveți dreptul de acces, rectificare, ștergere a datelor sau opoziție la prelucrare.
              Pentru orice solicitare ne puteți scrie la{' '}
              <a href="tel:+37360123456" className="text-teal font-bold hover:underline">
                +373 60 123 456
              </a>
              .
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-[11px] text-[#909090] font-bold">
              Ultima actualizare: Octombrie 2026
            </span>
            <Link
              href="/contact"
              className="text-xs font-bold text-teal hover:underline transition-colors"
            >
              Contactează-ne &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
