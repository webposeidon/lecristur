import clsx from 'clsx';

interface HomeUspBarProps {
  className?: string;
}

// 1. Icon Trofeu
function TrophyIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3-3h.75a2.25 2.25 0 0 0 2.25-2.25V9a3.75 3.75 0 0 0-3.75-3.75h-.75m-9.75 13.5a3 3 0 0 0-3-3h-.75A2.25 2.25 0 0 1 3 13.5V9A3.75 3.75 0 0 1 6.75 5.25h.75m9.75 13.5H7.5m9 0v1.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 7.5 20.25v-1.5m9-13.5v6a4.5 4.5 0 0 1-9 0v-6m9 0h-9"
      />
    </svg>
  );
}

// 2. Icon Siguranță / Transport
function SafetyIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    </svg>
  );
}

// 3. Icon Prețuri Corecte (Scut cu bifă)
function ShieldCheckIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

// 4. Icon Destinații Unice (Stea)
function StarIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}

// 5. Icon Suport Permanent
function SupportIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

const USP_ITEMS = [
  {
    icon: TrophyIcon,
    title: 'Peste 5.000',
    subtitle: 'turiști mulțumiți',
  },
  {
    icon: SafetyIcon,
    title: 'Excursii sigure',
    subtitle: 'cu transport propriu',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Prețuri corecte',
    subtitle: 'fără costuri ascunse',
  },
  {
    icon: StarIcon,
    title: 'Destinații unice',
    subtitle: 'în toată România',
  },
  {
    icon: SupportIcon,
    title: 'Suport permanent',
    subtitle: 'înainte și în timpul excursiei',
  },
];

export default function HomeUspBar({ className }: HomeUspBarProps) {
  return (
    <div
      className={clsx(
        'w-full bg-white border-0 pt-2 pb-10 sm:pb-12',
        className,
      )}
    >
      <div className="container-fluid">
        <div className="rounded-xl bg-[#F7F7F7] px-5 py-5 sm:px-7 sm:py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-center">
            {USP_ITEMS.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3.5 group"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-white text-teal flex-shrink-0 transition-colors">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-teal" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs sm:text-sm text-[#1F284B] tracking-tight leading-snug">
                      {item.title}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#777777] mt-0.5 leading-snug truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
