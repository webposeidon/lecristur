import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contul Meu | LeCrisTur',
  description:
    'Gestionează rezervările tale de excursii, istoricul călătoriilor și preferințele de călătorie LeCrisTur.',
};

export default function ContulMeuPage() {
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
            <span className="font-bold text-[#2C2C2C]">Contul meu</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
                Contul meu LeCrisTur
              </h1>
              <p className="mt-1 text-sm text-[#777777]">
                Bun venit! Gestionează rezervările și călătoriile tale programate.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-[3px] bg-teal-muted px-3 py-1 text-xs font-bold text-teal border-0">
                <span className="h-2 w-2 rounded-full bg-teal" />
                Cont activ
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid space-y-8">
        {/* Rezervări Active */}
        <div className="rounded-xl border-0 bg-[#F7F7F7] p-6">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 className="font-sans text-xl font-bold text-[#1F284B]">
                Rezervările mele
              </h2>
              <p className="text-xs text-[#777777] mt-0.5">
                Excursiile confirmate și starea biletelor
              </p>
            </div>
            <Link
              href="/calendar"
              className="text-xs font-bold text-teal hover:underline transition-colors"
            >
              + Rezervă altă dată &rarr;
            </Link>
          </div>

          <div className="mt-2">
            <div className="rounded-lg border-0 bg-white p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-[3px] bg-teal px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
                    Confirmată
                  </span>
                  <span className="text-xs text-[#909090] font-bold">Nr. Rezervare: #LCT-2026-849</span>
                </div>

                <h3 className="mt-2 font-sans text-lg font-bold text-[#2C2C2C]">
                  Brașov • Castelul Bran • Peleș & Sinaia
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#777777]">
                  <span>
                    Data plecării:{' '}
                    <strong className="text-[#2C2C2C]">15 Noiembrie 2026</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Pasageri: <strong className="text-[#2C2C2C]">2 adulți</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Îmbarcare:{' '}
                    <strong className="text-[#2C2C2C]">
                      Chișinău, Circul (ora 06:00)
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 md:pt-0">
                <Link
                  href="/excursii/brasov-bran-sinaia"
                  className="rounded-[3px] border-0 bg-[#F7F7F7] px-4 py-2 text-xs font-bold text-[#2C2C2C] hover:bg-[#EBEBEB] transition-colors"
                >
                  Vezi detalii itinerariu
                </Link>
                <a
                  href="tel:+37360123456"
                  className="rounded-[3px] bg-teal px-4 py-2 text-xs font-bold text-white hover:bg-teal-hover transition-colors"
                >
                  Suport telefonic
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Grilă: Date profil & Asistență */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date de Contact Profil */}
          <div className="rounded-xl border-0 bg-[#F7F7F7] p-6">
            <h3 className="font-sans text-lg font-bold text-[#1F284B]">
              Date personale călător
            </h3>
            <p className="text-xs text-[#777777] mt-0.5">
              Informații utilizate la emiterea biletelor și documentelor de transport
            </p>

            <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between rounded-md bg-white px-3.5 py-2.5">
                <span className="text-[#777777]">Nume complet:</span>
                <span className="font-bold text-[#2C2C2C]">Oaspete LeCrisTur</span>
              </div>
              <div className="flex justify-between rounded-md bg-white px-3.5 py-2.5">
                <span className="text-[#777777]">Telefon asociat:</span>
                <span className="font-bold text-[#2C2C2C]">+373 60 123 456</span>
              </div>
              <div className="flex justify-between rounded-md bg-white px-3.5 py-2.5">
                <span className="text-[#777777]">Punct uzual plecare:</span>
                <span className="font-bold text-[#2C2C2C]">Chișinău</span>
              </div>
              <div className="flex justify-between rounded-md bg-white px-3.5 py-2.5">
                <span className="text-[#777777]">Monedă preferată:</span>
                <span className="font-bold text-[#2C2C2C]">EUR (€) / MDL</span>
              </div>
            </div>
          </div>

          {/* Asistență și Modificări Rezervare */}
          <div className="rounded-xl border-0 bg-[#F7F7F7] p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-sans text-lg font-bold text-[#1F284B]">
                Asistență rezervări & modificări
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
                Dorești să adaugi un loc în autocar, să schimbi data sau să ceri
                detalii suplimentare despre cazare? Echipa noastră îți stă la
                dispoziție zilnic.
              </p>

              <div className="mt-4 rounded-lg bg-white p-4 border-0 text-xs">
                <span className="font-bold text-[#2C2C2C] block">
                  Linie directă călători:
                </span>
                <a
                  href="tel:+37360123456"
                  className="text-base font-bold text-teal hover:underline transition-colors mt-0.5 block"
                >
                  +373 60 123 456
                </a>
                <span className="text-[11px] text-[#777777] mt-0.5 block">
                  Program: Luni - Duminică, 08:00 - 20:00
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/excursii"
                className="w-full text-center rounded-[3px] bg-teal py-2.5 text-xs font-bold text-white hover:bg-teal-hover transition-colors"
              >
                Explorează catalogul de excursii
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
