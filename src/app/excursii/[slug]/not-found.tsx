import Link from 'next/link';

export default function TripNotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center bg-white px-4 py-16 text-center">
      <div className="max-w-md rounded-xl border-0 bg-[#F7F7F7] p-8">
        <span className="inline-flex rounded-[3px] bg-teal-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal">
          Eroare 404
        </span>
        <h1 className="mt-4 font-sans text-2xl sm:text-3xl font-bold text-[#1F284B]">
          Excursia nu a fost găsită
        </h1>
        <p className="mt-2 text-sm text-[#777777] leading-relaxed">
          Ne pare rău, dar excursia pe care o cauți nu există sau nu mai este
          activă în catalogul nostru.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/excursii"
            className="inline-flex items-center justify-center rounded-[3px] bg-teal px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-hover"
          >
            Vezi toate excursiile →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[3px] border-0 bg-white px-5 py-2.5 text-sm font-bold text-[#2C2C2C] transition hover:text-teal"
          >
            Mergi la Acasă
          </Link>
        </div>
      </div>
    </div>
  );
}
