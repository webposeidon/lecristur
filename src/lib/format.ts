const ROMANIAN_SHORT_MONTHS = [
  'Ian',
  'Feb',
  'Mar',
  'Apr',
  'Mai',
  'Iun',
  'Iul',
  'Aug',
  'Sep',
  'Oct',
  'Noi',
  'Dec',
] as const;

const ROMANIAN_DAYS_OF_WEEK = [
  'Duminică',
  'Luni',
  'Marți',
  'Miercuri',
  'Joi',
  'Vineri',
  'Sâmbătă',
] as const;

function parseDateSafely(date: string | Date): {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
} | null {
  if (typeof date === 'string') {
    const trimmed = date.trim();
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
    if (match) {
      const year = Number(match[1]);
      const month = Number(match[2]);
      const day = Number(match[3]);
      // Use local noon to avoid any timezone edge cases when computing day of week
      const d = new Date(year, month - 1, day, 12, 0, 0);
      return {
        year,
        month,
        day,
        dayOfWeek: d.getDay(),
      };
    }
    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
      return {
        year: parsed.getFullYear(),
        month: parsed.getMonth() + 1,
        day: parsed.getDate(),
        dayOfWeek: parsed.getDay(),
      };
    }
    return null;
  }

  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayOfWeek: date.getDay(),
    };
  }

  return null;
}

/**
 * Formatează o dată în formatul scurt românesc (ex: „15 Noi 2026”).
 */
export function formatShortDate(date: string | Date | null | undefined): string {
  if (!date) return '';
  const parsed = parseDateSafely(date);
  if (!parsed) return '';

  const dayStr = String(parsed.day).padStart(2, '0');
  const monthStr = ROMANIAN_SHORT_MONTHS[parsed.month - 1] ?? '';
  return `${dayStr} ${monthStr} ${parsed.year}`;
}

/**
 * Returnează ziua săptămânii în limba română (ex: „Sâmbătă”, „Duminică”),
 * calculată dinamic din dată (niciodată scrisă de mână).
 */
export function getDayOfWeek(date: string | Date | null | undefined): string {
  if (!date) return '';
  const parsed = parseDateSafely(date);
  if (!parsed) return '';

  return ROMANIAN_DAYS_OF_WEEK[parsed.dayOfWeek] ?? '';
}

/**
 * Formatează o valoare numerică ca preț în euro (ex: „119 €”).
 */
export function formatPrice(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return '—';
  }
  return `${Math.round(amount)} €`;
}
