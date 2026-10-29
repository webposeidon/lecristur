import Link from 'next/link';

// 5 Beneficii / USP-uri specifice LeCrisTur
const BENEFITS = [
  {
    icon: (
      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-10A2.25 2.25 0 0 1 4.5 4.25h15A2.25 2.25 0 0 1 21.75 6.5v10a2.25 2.25 0 0 1-2.25 2.25h-.75m-6 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9-9.5h18M6.75 8.25h.008v.008H6.75V8.25Zm10.5 0h.008v.008H17.25V8.25Z" />
      </svg>
    ),
    title: 'Transport propriu',
    description: 'Autocare și microbuze moderne',
  },
  {
    icon: (
      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Prețuri corecte',
    description: 'Fără costuri ascunse',
  },
  {
    icon: (
      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.999-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: 'Excursii pentru toți',
    description: 'Familii, tineri, grupuri',
  },
  {
    icon: (
      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
    title: 'Destinații autentice',
    description: 'Cele mai frumoase locuri',
  },
  {
    icon: (
      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    title: 'Suport permanent',
    description: 'Înainte și în timpul excursiei',
  },
];

export default function CatalogHero({ totalCount }: { totalCount?: number }) {
  return (
    <section className="bg-white pt-8 pb-6 md:pt-10 md:pb-8 border-0">
      <div className="container-fluid">
        {/* Breadcrumbs */}
        <nav aria-label="Navigație ierarhică" className="mb-3 flex items-center gap-2 text-xs sm:text-sm text-[#909090]">
          <Link href="/" className="transition-colors hover:text-teal">
            Acasă
          </Link>
          <span className="text-[#909090]">›</span>
          <span className="font-bold text-[#2C2C2C]">Toate excursiile</span>
        </nav>

        {/* Titlu & Subtitlu */}
        <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
          Toate excursiile
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl font-normal">
          Alege din peste {totalCount ?? 50} de experiențe unice în România
        </p>

        {/* Bara de 5 beneficii / USP-uri pe fundal alb curat */}
        <div className="mt-7 grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-5">
          {BENEFITS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#F7F7F7]">
                {item.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold text-[#2C2C2C]">
                  {item.title}
                </span>
                <span className="text-[11px] sm:text-xs text-[#777777]">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
