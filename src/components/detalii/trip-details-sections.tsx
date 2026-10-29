'use client';

import { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { formatDurationLabel } from '@/lib/labels';
import type { Trip } from '@/types';

export interface TripDetailsSectionsProps {
  trip: Trip;
}

const FAQ_ITEMS = [
  {
    question: 'De ce acte am nevoie pentru călătoria în România?',
    answer:
      'Pentru traversarea frontierei este necesar pașaportul biometric valabil cel puțin 6 luni de la data întoarcerii (sau cartea de identitate românească). Pentru minori este obligatorie procura notarială în cazul în care călătoresc cu un singur părinte.',
  },
  {
    question: 'Cum se face alegerea locurilor în autocar?',
    answer:
      'Locurile în autocar se pot alege online la pasul următor („Alege locurile în autocar”) sau sunt alocate în ordinea achitării avansului la rezervarea excursiei.',
  },
  {
    question: 'Putem anula sau reprograma rezervarea?',
    answer:
      'Anularea gratuită sau reprogramarea pe o altă dată de plecare este posibilă cu cel puțin 7 zile lucrătoare înainte de data plecării, conform condițiilor contractuale LeCrisTur.',
  },
  {
    question: 'Ce bagaj este inclus în prețul excursiei?',
    answer:
      'Fiecare pasager are inclus în preț un bagaj de cală (până la 20 kg) și un bagaj mic de mână pentru interiorul autocarului.',
  },
];

export default function TripDetailsSections({
  trip,
}: TripDetailsSectionsProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const durationLabel = formatDurationLabel(trip.days, trip.nights);

  return (
    <div className="space-y-10">
      {/* Secțiunea: Ce include / Ce nu include */}
      <section
        id="ce-include"
        className="scroll-mt-24 bg-white border-0"
      >
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#1F284B]">
          Ce include prețul excursiei
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Inclus */}
          <div className="rounded-lg border-0 bg-[#F7F7F7] p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#2C2C2C]">
              <CheckCircleIcon className="h-5 w-5 text-teal" />
              <span>Servicii incluse în preț</span>
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              {trip.included.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2C2C]"
                >
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Neinclus */}
          <div className="rounded-lg border-0 bg-[#F7F7F7] p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#2C2C2C]">
              <XCircleIcon className="h-5 w-5 text-status-danger" />
              <span>Cheltuieli neincluse (opționale)</span>
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              {trip.notIncluded.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#777777]"
                >
                  <XCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-status-danger" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Secțiunile compacte: Cazare + Transport */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section
          id="cazare"
          className="scroll-mt-24 rounded-lg border-0 bg-[#F7F7F7] p-5 sm:p-6"
        >
          <h2 className="font-sans text-lg sm:text-xl font-bold text-[#1F284B]">
            Cazare și mese
          </h2>
          {trip.hotelStars > 0 ? (
            <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
              <p>
                Cazarea este asigurată în unități verificate de{' '}
                <strong className="font-bold text-[#2C2C2C]">
                  Hotel {trip.hotelStars}★
                </strong>{' '}
                ({durationLabel}), în camere duble, triple sau twin cu baie
                proprie, Wi-Fi gratuit și confort sporit.
              </p>
              <p className="font-bold text-[#2C2C2C]">
                • Mic dejun bogat inclus în fiecare dimineață la hotel.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-xs sm:text-sm text-[#777777] leading-relaxed">
              Aceasta este o excursie de o singură zi ({durationLabel}) și nu
              necesită cazare peste noapte. Pe traseu sunt prevăzute opriri
              pentru masa de prânz la restaurante tradiționale.
            </p>
          )}
        </section>

        <section
          id="transport"
          className="scroll-mt-24 rounded-lg border-0 bg-[#F7F7F7] p-5 sm:p-6"
        >
          <h2 className="font-sans text-lg sm:text-xl font-bold text-[#1F284B]">
            Transport cu autocarul
          </h2>
          <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
            <p>
              Călătorim cu autocare turistice moderne din flota{' '}
              <strong className="font-bold text-[#2C2C2C]">LeCrisTur</strong>,
              dotate cu scaune rabatabile ergonomice, climatizare individuală,
              sistem audio-video și prize USB.
            </p>
            <p className="font-bold text-[#2C2C2C]">
              • Distanță traseu: ~{trip.route.distanceKm} km (cu opriri regulate
              de relaxare la fiecare 3 ore).
            </p>
          </div>
        </section>
      </div>

      {/* Secțiunea: Întrebări frecvente (Accordion fără borderuri) */}
      <section
        id="intrebari-frecvente"
        className="scroll-mt-24 bg-white border-0"
      >
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#1F284B]">
          Întrebări frecvente
        </h2>

        <div className="mt-4 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="rounded-lg bg-[#F7F7F7] px-4 py-3.5 border-0">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm sm:text-base font-bold text-[#2C2C2C] transition hover:text-teal"
                >
                  <span>{item.question}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 flex-shrink-0 text-[#777777] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2.5 pr-6 text-xs sm:text-sm leading-relaxed text-[#777777]">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
