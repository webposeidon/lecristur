'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/button';
import Input from '@/components/ui/form-fields/input';
import { formatPrice, formatShortDate } from '@/lib/format';
import type { Departure, Trip } from '@/types';

export interface BookingRequestModalProps {
  open: boolean;
  onClose: () => void;
  trip: Trip;
  selectedDeparture: Departure | null;
  seats: number;
}

export default function BookingRequestModal({
  open,
  onClose,
  trip,
  selectedDeparture,
  seats,
}: BookingRequestModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const unitPrice = selectedDeparture?.price ?? 0;
  const totalPrice = unitPrice * seats;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleResetAndClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-float border-0">
          {/* Header Modal curat pe alb */}
          <div className="flex items-center justify-between bg-white px-6 pt-6 pb-2 text-[#1F284B]">
            <DialogTitle className="font-sans text-lg font-bold">
              Solicită rezervare — {trip.title}
            </DialogTitle>
            <button
              type="button"
              onClick={handleResetAndClose}
              aria-label="Închide fereastra"
              className="rounded-lg p-1 text-[#777777] transition hover:bg-[#F7F7F7] hover:text-[#2C2C2C]"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Sumar plecare selectată */}
            <div className="mb-5 rounded-lg border-0 bg-[#F7F7F7] p-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between font-bold text-[#2C2C2C]">
                <span>
                  Plecare:{' '}
                  {selectedDeparture
                    ? formatShortDate(selectedDeparture.startDate)
                    : 'La cerere'}
                </span>
                <span>
                  {seats} {seats === 1 ? 'persoană' : 'persoane'}
                </span>
              </div>
              {selectedDeparture && (
                <div className="mt-1 flex items-center justify-between text-xs text-[#777777]">
                  <span>
                    Preț per persoană: {formatPrice(selectedDeparture.price)}
                  </span>
                  <span className="font-bold text-teal">
                    Total estimat: {formatPrice(totalPrice)}
                  </span>
                </div>
              )}
            </div>

            {submitted ? (
              <div className="py-6 text-center">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-teal" />
                <h3 className="mt-3 font-sans text-lg font-bold text-[#1F284B]">
                  Solicitarea a fost trimisă cu succes!
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#777777]">
                  Un consultant LeCrisTur te va contacta în cel mai scurt timp
                  la numărul <strong className="text-[#2C2C2C]">{phone}</strong> pentru confirmarea
                  locurilor.
                </p>
                <div className="mt-6">
                  <Button
                    variant="solid"
                    color="gold"
                    onClick={handleResetAndClose}
                    className="w-full"
                  >
                    Închide
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nume și prenume *"
                  placeholder="Ex: Maria Popescu"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Număr de telefon *"
                  type="tel"
                  placeholder="Ex: +373 60 123 456"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Adresă de email (opțional)"
                  type="email"
                  placeholder="Ex: maria@exemplu.md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-[#2C2C2C]">
                    Mesaj sau mențiuni speciale
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Preferințe locuri în autocar, tip cameră (dublă / twin) etc."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full rounded-[4px] border-0 bg-[#F7F7F7] px-4 py-2.5 text-sm text-[#2C2C2C] placeholder:text-[#909090] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetAndClose}
                  >
                    Anulează
                  </Button>
                  <Button type="submit" variant="solid" color="gold">
                    Trimite solicitarea
                  </Button>
                </div>
              </form>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
