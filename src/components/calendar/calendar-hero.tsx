import Link from 'next/link';

const CALENDAR_BENEFITS = [
  {
    title: 'Date actualizate',
    description: 'în timp real',
    icon: (
      <svg
        className="h-5 w-5 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        />
      </svg>
    ),
  },
  {
    title: 'Locuri limitate',
    description: 'Rezervă din timp',
    icon: (
      <svg
        className="h-5 w-5 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-10A2.25 2.25 0 0 1 4.5 4.25h15A2.25 2.25 0 0 1 21.75 6.5v10a2.25 2.25 0 0 1-2.25 2.25h-.75m-6 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9-9.5h18M6.75 8.25h.008v.008H6.75V8.25Zm10.5 0h.008v.008H17.25V8.25Z"
        />
      </svg>
    ),
  },
  {
    title: 'Confirmare instantă',
    description: 'online sau telefonic',
    icon: (
      <svg
        className="h-5 w-5 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    title: 'Pentru toți',
    description: 'Familii, tineri, grupuri',
    icon: (
      <svg
        className="h-5 w-5 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.999-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    title: 'Suport permanent',
    description: 'înainte și după rezervare',
    icon: (
      <svg
        className="h-5 w-5 text-teal"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
        />
      </svg>
    ),
  },
];

export interface CalendarHeroProps {
  backgroundImage?: string;
}

export default function CalendarHero(_props: CalendarHeroProps) {
  return (
    <section className="bg-white pt-8 pb-6 md:pt-10 md:pb-8 border-0">
      <div className="container-fluid">
        {/* Breadcrumbs */}
        <nav
          aria-label="Navigație ierarhică"
          className="mb-3 flex items-center gap-2 text-xs sm:text-sm text-[#909090]"
        >
          <Link href="/" className="transition-colors hover:text-teal">
            Acasă
          </Link>
          <span className="text-[#909090]">›</span>
          <span className="font-bold text-[#2C2C2C]">Calendarul plecărilor</span>
        </nav>

        {/* Titlu & Subtitlu */}
        <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F284B]">
          Calendarul plecărilor
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-2xl">
          Alege data și descoperă toate excursiile disponibile
        </p>

        {/* Bara de 5 USP-uri specifice Calendarului pe fundal alb */}
        <div className="mt-7 grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-5">
          {CALENDAR_BENEFITS.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
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
