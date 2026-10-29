import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termeni și Condiții | LeCrisTur',
  description:
    'Condițiile generale privind rezervarea, plata și participarea la excursiile turistice organizate de LeCrisTur.',
};

export default function TermeniPage() {
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
            <span className="font-bold text-[#2C2C2C]">Termeni și condiții</span>
          </nav>

          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
            Termeni și Condiții Generale
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl">
            Informații contractuale și reguli privind organizarea excursiilor turistice LeCrisTur.
          </p>
        </div>
      </section>

      <div className="container-fluid">
        <div className="rounded-xl border-0 bg-[#F7F7F7] p-6 sm:p-10 max-w-4xl mx-auto space-y-6 text-xs sm:text-sm text-[#777777] leading-relaxed">
          <div>
            <h2 className="font-sans text-lg font-bold text-[#1F284B]">
              1. Dispoziții generale
            </h2>
            <p className="mt-2">
              Prezentele clauze reglementează raporturile dintre agenția de turism{' '}
              <strong className="text-[#2C2C2C]">LeCrisTur</strong> și călător, având ca
              obiect comercializarea pachetelor turistice și excursiilor cu autocarul
              cu plecare din Republica Moldova către România.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-lg font-bold text-[#1F284B]">
              2. Rezervare și modalități de plată
            </h2>
            <p className="mt-2">
              Rezervarea unui loc se poate efectua online pe platformă sau telefonic la{' '}
              <a href="tel:+37360123456" className="text-teal font-bold hover:underline">
                +373 60 123 456
              </a>
              . Confirmarea rezervării se realizează după achitarea unui avans de minim 30%
              din valoarea pachetului, restul sumei urmând a fi achitat înainte de plecare
              sau la îmbarcare conform contractului.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-lg font-bold text-[#1F284B]">
              3. Documente necesare călătoriei
            </h2>
            <p className="mt-2">
              Fiecare participant este direct responsabil de deținerea unui document de
              călătorie valabil pentru trecerea frontierei de stat (pașaport biometric
              valabil minim 3 luni de la data încheierii călătoriei sau pașaport UE).
              Pentru minori este necesar acordul notarial dacă călătoresc fără ambii părinți.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-lg font-bold text-[#1F284B]">
              4. Politica de anulare și modificări
            </h2>
            <p className="mt-2">
              Anularea călătoriei cu mai mult de 7 zile înainte de data plecării permite
              reportarea avansului pentru o altă dată sau restituirea parțială conform
              normelor contractuale. Pentru asistență rapidă, călătorul poate contacta
              agenția telefonic sau pe WhatsApp.
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
              Contactează echipa LeCrisTur &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
