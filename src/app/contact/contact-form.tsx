'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulare submit formular
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="mt-6 rounded-xl border-0 bg-[#F7F7F7] p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="mt-3 font-sans text-lg font-bold text-[#1F284B]">
          Mesajul tău a fost trimis cu succes!
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#777777] max-w-md mx-auto">
          Mulțumim, {formData.name || 'dragă călător'}! Un consultant LeCrisTur te va
          contacta în cel mai scurt timp la numărul{' '}
          <strong className="text-[#2C2C2C]">{formData.phone || '+373 60 123 456'}</strong>.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', phone: '', email: '', message: '' });
          }}
          className="mt-4 inline-flex items-center justify-center rounded-[3px] border-0 bg-white px-4 py-2 text-xs font-bold text-[#2C2C2C] transition hover:text-teal"
        >
          Trimite alt mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold uppercase tracking-wider text-[#2C2C2C] mb-1.5"
          >
            Nume și prenume *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Ion Popescu"
            className="w-full rounded-[4px] border-0 bg-[#F7F7F7] px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#909090] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-bold uppercase tracking-wider text-[#2C2C2C] mb-1.5"
          >
            Număr de telefon *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Ex: +373 60 123 456"
            className="w-full rounded-[4px] border-0 bg-[#F7F7F7] px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#909090] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-bold uppercase tracking-wider text-[#2C2C2C] mb-1.5"
        >
          Adresă de email (opțional)
        </label>
        <input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Ex: ion.popescu@gmail.com"
          className="w-full rounded-[4px] border-0 bg-[#F7F7F7] px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#909090] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-bold uppercase tracking-wider text-[#2C2C2C] mb-1.5"
        >
          Mesaj sau întrebare despre o excursie *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Scrie-ne ce destinație te interesează sau numărul dorit de locuri..."
          className="w-full rounded-[4px] border-0 bg-[#F7F7F7] px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#909090] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal resize-none"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          isLoading={isSubmitting}
          color="gold"
          className="w-full sm:w-auto !py-3 !px-8 text-sm font-bold"
        >
          Trimite mesajul &rarr;
        </Button>
      </div>
    </form>
  );
}
