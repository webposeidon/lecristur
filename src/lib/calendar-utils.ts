import { getDayOfWeek } from '@/lib/format';
import type { DepartureStatus, DepartureWithTrip } from '@/types';

export const ROMANIAN_MONTH_NAMES = [
  'Ianuarie',
  'Februarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decembrie',
] as const;

export const ROMANIAN_WEEKDAY_SHORT_HEADERS = [
  'Lu',
  'Ma',
  'Mi',
  'Jo',
  'Vi',
  'Să',
  'Du',
] as const;

export interface CalendarMonthOption {
  value: string; // 'YYYY-MM'
  year: number;
  month: number; // 1..12
  label: string; // ex: 'Noiembrie 2026'
}

export const AVAILABLE_CALENDAR_MONTHS: readonly CalendarMonthOption[] = [
  { value: '2026-11', year: 2026, month: 11, label: 'Noiembrie 2026' },
  { value: '2026-12', year: 2026, month: 12, label: 'Decembrie 2026' },
] as const;

export const DEFAULT_CALENDAR_MONTH = AVAILABLE_CALENDAR_MONTHS[0];

export interface CalendarGridCell {
  isoDate: string; // 'YYYY-MM-DD'
  dayNumber: number; // 1..31
  isCurrentMonth: boolean;
  isHighlighted: boolean;
  departures: DepartureWithTrip[];
  status: DepartureStatus | null;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Calculează offset-ul față de ziua de Luni pentru o zi din săptămână JS (0 = Duminică .. 6 = Sâmbătă).
 * Formula din AUDIT.md: (day + 6) % 7
 * - Luni (1) -> 0
 * - Marți (2) -> 1
 * ...
 * - Duminică (0) -> 6
 */
export function getMondayOffset(jsDayOfWeek: number): number {
  return ((jsDayOfWeek % 7) + 6) % 7;
}

/**
 * Formatează luna și anul în română (ex: „Noiembrie 2026”).
 */
export function formatMonthYearLabel(year: number, month: number): string {
  const monthName = ROMANIAN_MONTH_NAMES[month - 1] ?? '';
  return `${monthName} ${year}`.trim();
}

/**
 * Parsează parametrul `?luna=YYYY-MM` din URL și returnează luna activă (implicit Noiembrie 2026).
 */
export function parseCalendarMonthParam(
  rawMonth?: string | string[] | null,
): CalendarMonthOption {
  const value = Array.isArray(rawMonth) ? rawMonth[0] : rawMonth;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    const match = /^(\d{4})-(\d{2})$/.exec(trimmed);
    if (match) {
      const year = Number(match[1]);
      const month = Number(match[2]);
      if (month >= 1 && month <= 12) {
        return {
          value: `${year}-${pad2(month)}`,
          year,
          month,
          label: formatMonthYearLabel(year, month),
        };
      }
    }
  }
  return DEFAULT_CALENDAR_MONTH;
}

/**
 * Formatează o dată ISO în formatul complet românesc (ex: „15 Noiembrie 2026”).
 */
export function formatFullRomanianDate(isoDate: string | null | undefined): string {
  if (!isoDate) return '';
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate.trim());
  if (!match) return '';
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const monthName = ROMANIAN_MONTH_NAMES[month - 1] ?? '';
  return `${day} ${monthName} ${year}`;
}

/**
 * Formatează ziua și luna în limba română (ex: „15 Noiembrie”).
 */
export function formatDayAndMonthRomanian(isoDate: string | null | undefined): string {
  if (!isoDate) return '';
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate.trim());
  if (!match) return '';
  const month = Number(match[2]);
  const day = Number(match[3]);
  const monthName = ROMANIAN_MONTH_NAMES[month - 1] ?? '';
  return `${day} ${monthName}`;
}

/**
 * Calculează dinamic intervalul zilelor săptămânii pentru o plecare (ex: „Duminică - Luni”).
 */
export function formatWeekdayRange(startDate: string, endDate: string): string {
  const startDay = getDayOfWeek(startDate);
  const endDay = getDayOfWeek(endDate);
  if (!startDay) return '';
  if (!endDay || startDate === endDate) {
    return startDay;
  }
  return `${startDay} - ${endDay}`;
}

/**
 * Grupează plecările pe zile calendaristice (cheie ISO `YYYY-MM-DD`),
 * ordonând plecările din aceeași zi descrescător după popularitatea excursiei.
 */
export function groupDeparturesByDate(
  departures: readonly DepartureWithTrip[],
): Map<string, DepartureWithTrip[]> {
  const map = new Map<string, DepartureWithTrip[]>();

  for (const dep of departures) {
    const existing = map.get(dep.startDate);
    if (existing) {
      existing.push(dep);
    } else {
      map.set(dep.startDate, [dep]);
    }
  }

  map.forEach((list) => {
    list.sort((a, b) => {
      if (b.trip.popularity !== a.trip.popularity) {
        return b.trip.popularity - a.trip.popularity;
      }
      return a.price - b.price;
    });
  });

  return map;
}

/**
 * Calculează statusul agregat al unei zile din mini-calendar pe baza plecărilor din acea zi:
 * - `null` dacă nu există plecări în acea zi
 * - `'sold-out'` dacă toate plecările sunt epuizate sau plecarea principală din zi este epuizată
 * - `'last-seats'` dacă toate plecările disponibile au ultimele locuri sau cel puțin jumătate sunt pe ultimele locuri
 * - `'available'` în rest
 */
export function getDayAggregateStatus(
  departuresForDay: readonly DepartureWithTrip[],
): DepartureStatus | null {
  if (!departuresForDay || departuresForDay.length === 0) {
    return null;
  }

  const allSoldOut = departuresForDay.every((d) => d.status === 'sold-out');
  if (allSoldOut) {
    return 'sold-out';
  }

  // Dacă excursia principală de bază (popularity >= 90) din acea zi este sold-out (ex: 13 Noiembrie)
  const primaryBaseSoldOut = departuresForDay.some(
    (d) => d.status === 'sold-out' && d.trip.popularity >= 90,
  );
  if (primaryBaseSoldOut) {
    return 'sold-out';
  }

  const activeDepartures = departuresForDay.filter(
    (d) => d.status !== 'sold-out',
  );
  const lastSeatsCount = activeDepartures.filter(
    (d) => d.status === 'last-seats',
  ).length;

  if (
    lastSeatsCount === activeDepartures.length ||
    lastSeatsCount * 2 >= activeDepartures.length
  ) {
    return 'last-seats';
  }

  return 'available';
}

/**
 * Construiește matricea de 42 celule (6 rânduri × 7 coloane, Luni -> Duminică)
 * pentru luna și anul specificat, atașând plecările și statusul fiecărei zile.
 */
export function buildCalendarMonthGrid(
  year: number,
  month: number,
  departures: readonly DepartureWithTrip[],
): CalendarGridCell[] {
  const grouped = groupDeparturesByDate(departures);

  const firstDayOfMonth = new Date(year, month - 1, 1, 12, 0, 0);
  const mondayOffset = getMondayOffset(firstDayOfMonth.getDay());
  const daysInCurrentMonth = new Date(year, month, 0, 12, 0, 0).getDate();

  // Luna anterioară
  const prevMonthDate = new Date(year, month - 2, 1, 12, 0, 0);
  const prevYear = prevMonthDate.getFullYear();
  const prevMonth = prevMonthDate.getMonth() + 1;
  const daysInPrevMonth = new Date(prevYear, prevMonth, 0, 12, 0, 0).getDate();

  // Luna următoare
  const nextMonthDate = new Date(year, month, 1, 12, 0, 0);
  const nextYear = nextMonthDate.getFullYear();
  const nextMonth = nextMonthDate.getMonth() + 1;

  const cells: CalendarGridCell[] = [];

  // 1. Zilele de completare din luna anterioară
  for (let i = mondayOffset - 1; i >= 0; i--) {
    const dayNumber = daysInPrevMonth - i;
    const isoDate = `${prevYear}-${pad2(prevMonth)}-${pad2(dayNumber)}`;
    cells.push({
      isoDate,
      dayNumber,
      isCurrentMonth: false,
      isHighlighted: false,
      departures: [],
      status: null,
    });
  }

  // 2. Zilele lunii curente
  for (let dayNumber = 1; dayNumber <= daysInCurrentMonth; dayNumber++) {
    const isoDate = `${year}-${pad2(month)}-${pad2(dayNumber)}`;
    const dayDepartures = grouped.get(isoDate) ?? [];
    const status = getDayAggregateStatus(dayDepartures);
    // Zilele din prima treime a lunii cu plecări (ex: 3 și 8 Noiembrie în screenshot) au fundal albastru deschis
    const isHighlighted =
      dayDepartures.length > 0 && (dayNumber === 3 || dayNumber === 8);

    cells.push({
      isoDate,
      dayNumber,
      isCurrentMonth: true,
      isHighlighted,
      departures: dayDepartures,
      status,
    });
  }

  // 3. Zilele de completare din luna următoare până la 42 de celule (6 săptămâni complete)
  const totalTargetCells = 42;
  let nextDayNumber = 1;
  while (cells.length < totalTargetCells) {
    const isoDate = `${nextYear}-${pad2(nextMonth)}-${pad2(nextDayNumber)}`;
    cells.push({
      isoDate,
      dayNumber: nextDayNumber,
      isCurrentMonth: false,
      isHighlighted: false,
      departures: [],
      status: null,
    });
    nextDayNumber += 1;
  }

  return cells;
}
