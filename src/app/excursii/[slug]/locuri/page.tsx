import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTrip } from '@/lib/api';
import { formatPrice, formatShortDate } from '@/lib/format';

export interface SeatSelectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: SeatSelectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTrip(slug);

  return {
    title: trip
      ? `Alege locurile în autocar — ${trip.title} | LeCrisTur`
      : 'Alege locurile în autocar | LeCrisTur',
  };
}

export default async function SeatSelectionPlaceholderPage({
  params,
  searchParams,
}: SeatSelectionPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const trip = await getTrip(slug);
  if (!trip) {
    notFound();
  }

  const departureId =
    typeof resolvedSearchParams.departure === 'string'
      ? resolvedSearchParams.departure
      : '';
  const seatsParam = Number(resolvedSearchParams.seats);
  const seats =
    Number.isInteger(seatsParam) && seatsParam >= 1 ? seatsParam : 2;

  const selectedDeparture =
    trip.departures.find((d) => d.id === departureId) ??
    trip.departures[0] ??
    null;

  return (
    <div className="min-h-[75vh] bg-white py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="rounded-xl border-0 bg-white p-6 sm:p-8 shadow-float">
          <span className="inline-flex items-center rounded-[3px] bg-teal-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal">
            În lucru — Harta interactivă a autocarului
          </span>

          <h1 className="mt-4 font-sans text-2xl sm:text-3xl font-bold text-[#1F284B]">
            Alege locurile în autocar
          </h1>
          <p className="mt-1 text-sm text-[#777777]">
            Excursie: <strong className="text-[#2C2C2C]">{trip.title}</strong> (
            {trip.subtitle})
          </p>

          <div className="mt-6 rounded-lg border-0 bg-[#F7F7F7] p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#777777]">Data plecării selectată:</span>
              <span className="font-bold text-[#2C2C2C]">
                {selectedDeparture
                  ? formatShortDate(selectedDeparture.startDate)
                  : 'La cerere'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#777777]">Număr pasageri:</span>
              <span className="font-bold text-[#2C2C2C]">
                {seats} {seats === 1 ? 'persoană' : 'persoane'}
              </span>
            </div>
            {selectedDeparture && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#777777]">Total estimat:</span>
                <span className="font-sans text-lg font-bold text-[#1F284B]">
                  {formatPrice(selectedDeparture.price * seats)}
                </span>
              </div>
            )}
          </div>

          <p className="mt-5 text-xs sm:text-sm leading-relaxed text-[#777777]">
            Modulul de selecție vizuală a locurilor în autocar este în curs de
            finalizare. Până atunci, poți finaliza rezervarea rapid prin
            formularul „Solicită rezervare” sau telefonic la{' '}
            <a
              href="tel:+37360123456"
              className="font-bold text-teal hover:underline"
            >
              +373 60 123 456
            </a>
            .
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/excursii/${trip.slug}`}
              className="inline-flex items-center justify-center rounded-[3px] bg-teal px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-hover"
            >
              ← Înapoi la detalii excursie
            </Link>
            <Link
              href="/excursii"
              className="inline-flex items-center justify-center rounded-[3px] border-0 bg-[#F7F7F7] px-5 py-2.5 text-sm font-bold text-[#2C2C2C] transition hover:bg-[#EBEBEB]"
            >
              Vezi toate excursiile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
