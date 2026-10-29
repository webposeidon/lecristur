import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'Contact & Asistență | LeCrisTur — Călătorii care unesc oamenii',
  description:
    'Contactează agenția de turism LeCrisTur. Telefon și WhatsApp: +373 60 123 456. Punct de plecare: Chișinău, Republica Moldova. Răspundem zilnic între 08:00 și 20:00.',
  openGraph: {
    title: 'Contact & Asistență | LeCrisTur',
    description:
      'Contactează echipa LeCrisTur pentru rezervări și detalii despre excursiile cu autocarul în România. Telefon: +373 60 123 456.',
    type: 'website',
    locale: 'ro_RO',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Antet curat pe alb */}
      <section className="bg-white pt-8 pb-8 md:pt-10 md:pb-10 border-0">
        <div className="container-fluid">
          <nav
            aria-label="Navigație ierarhică"
            className="mb-3 flex items-center gap-2 text-xs sm:text-sm text-[#909090]"
          >
            <Link href="/" className="transition-colors hover:text-teal">
              Acasă
            </Link>
            <span className="text-[#909090]">›</span>
            <span className="font-bold text-[#2C2C2C]">Contact & Asistență</span>
          </nav>

          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
            Contact & Asistență
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl">
            Suntem aici pentru a-ți răspunde la orice întrebare legată de trasee,
            plecări din Chișinău și disponibilitatea locurilor.
          </p>
        </div>
      </section>

      {/* Grid Informații Contact & Formular */}
      <div className="container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coloana Stângă: Carduri Informative pe #F7F7F7 fără border */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Telefon & WhatsApp */}
            <div className="rounded-xl border-0 bg-[#F7F7F7] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white text-teal">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-sans text-lg font-bold text-[#1F284B]">
                    Telefon & WhatsApp
                  </h2>
                  <p className="text-xs text-[#777777] mt-0.5">
                    Răspundem cu plăcere pentru consultanță și rezervări
                  </p>
                  <a
                    href="tel:+37360123456"
                    className="mt-2.5 inline-block text-lg font-bold text-[#2C2C2C] hover:text-teal transition-colors"
                  >
                    +373 60 123 456
                  </a>
                  <p className="text-[11px] text-[#777777] mt-1">
                    Disponibil și pe WhatsApp & Viber
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Punct de plecare */}
            <div className="rounded-xl border-0 bg-[#F7F7F7] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white text-teal">
                  <svg
                    className="h-6 w-6"
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
                  <h2 className="font-sans text-lg font-bold text-[#1F284B]">
                    Punct de îmbarcare
                  </h2>
                  <p className="text-xs text-[#777777] mt-0.5">
                    Plecări organizate din Chișinău
                  </p>
                  <p className="mt-2 font-bold text-sm text-[#2C2C2C]">
                    Circul din Chișinău / bd. Renașterii Naționale
                  </p>
                  <p className="text-[11px] text-[#777777] mt-1">
                    Loc de întâlnire accesibil, cu parcare în apropiere
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Program de lucru */}
            <div className="rounded-xl border-0 bg-[#F7F7F7] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white text-teal">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-sans text-lg font-bold text-[#1F284B]">
                    Program de lucru
                  </h2>
                  <p className="text-xs text-[#777777] mt-0.5">
                    Asistență călători și rezervări
                  </p>
                  <p className="mt-2 font-bold text-sm text-[#2C2C2C]">
                    Luni – Duminică: 08:00 – 20:00
                  </p>
                  <p className="text-[11px] text-[#777777] mt-1">
                    Asistență de urgență pe traseu 24/7 pentru călători
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coloana Dreaptă: Formular de Mesaj */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border-0 bg-white p-6 sm:p-8 shadow-float">
              <h2 className="font-sans text-2xl font-bold text-[#1F284B]">
                Trimite-ne un mesaj
              </h2>
              <p className="mt-1 text-sm text-[#777777]">
                Completează formularul de mai jos și te vom contacta în scurt timp
                pentru a stabili toate detaliile călătoriei tale.
              </p>

              <ContactForm />

              <div className="mt-8 pt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#777777] block">
                    Vrei să vezi direct excursiile programate?
                  </span>
                  <span className="text-xs font-bold text-[#2C2C2C]">
                    Avem peste 50 de plecări garantate în România.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/excursii"
                    className="rounded-[3px] border-0 bg-[#F7F7F7] px-4 py-2.5 text-xs font-bold text-[#2C2C2C] hover:bg-[#EBEBEB] transition-colors"
                  >
                    Catalog excursii
                  </Link>
                  <Link
                    href="/calendar"
                    className="rounded-[3px] bg-teal px-4 py-2.5 text-xs font-bold text-white hover:bg-teal-hover transition-colors"
                  >
                    Calendarul plecărilor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
