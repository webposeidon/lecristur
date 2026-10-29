import { describe, expect, it } from 'vitest';
import {
  buildCalendarMonthGrid,
  formatFullRomanianDate,
  formatWeekdayRange,
  getDayAggregateStatus,
  getMondayOffset,
  parseCalendarMonthParam,
} from '@/lib/calendar-utils';
import type { DepartureStatus, DepartureWithTrip, TripSummary } from '@/types';

function createMockDeparture(
  status: DepartureStatus,
  availableSeats: number,
  popularity = 85,
  startDate = '2026-11-15',
): DepartureWithTrip {
  const mockTrip: TripSummary = {
    id: 'trip-mock',
    slug: 'mock-trip',
    title: 'Mock Trip',
    subtitle: 'Mock Subtitle',
    destinations: ['brasov'],
    type: 'cultural',
    days: 2,
    nights: 1,
    transportIncluded: true,
    hotelStars: 3,
    rating: 4.8,
    reviewCount: 50,
    popularity,
    images: ['/images/trips/brasov-bran-sinaia.svg'],
    highlights: [],
    route: { points: ['Chișinău', 'Brașov'], distanceKm: 600 },
    departures: [],
    startingPrice: 119,
    nextDeparture: null,
  };

  return {
    id: `dep-${startDate}-${availableSeats}`,
    startDate,
    endDate: '2026-11-16',
    price: 119,
    totalSeats: 40,
    availableSeats,
    status,
    trip: mockTrip,
  };
}

describe('calendar-utils', () => {
  it('calculates mondayOffset correctly using (day + 6) % 7', () => {
    // Luni (1) -> offset 0
    expect(getMondayOffset(1)).toBe(0);
    // Marți (2) -> offset 1
    expect(getMondayOffset(2)).toBe(1);
    // Sâmbătă (6) -> offset 5
    expect(getMondayOffset(6)).toBe(5);
    // Duminică (0) -> offset 6 (ex: 1 Noiembrie 2026)
    expect(getMondayOffset(0)).toBe(6);
  });

  it('builds the November 2026 calendar grid starting with 26 Oct on Monday and 1 Nov on Sunday', () => {
    const cells = buildCalendarMonthGrid(2026, 11, []);

    expect(cells).toHaveLength(42);
    // Prima poziție (Luni) este 26 Octombrie 2026
    expect(cells[0].isoDate).toBe('2026-10-26');
    expect(cells[0].dayNumber).toBe(26);
    expect(cells[0].isCurrentMonth).toBe(false);

    // Poziția 6 (coloana Duminică) este 1 Noiembrie 2026
    expect(cells[6].isoDate).toBe('2026-11-01');
    expect(cells[6].dayNumber).toBe(1);
    expect(cells[6].isCurrentMonth).toBe(true);

    // 15 Noiembrie 2026 este tot pe coloana Duminică (index 20 -> 20 % 7 === 6)
    const nov15Index = cells.findIndex((c) => c.isoDate === '2026-11-15');
    expect(nov15Index).toBe(20);
    expect(nov15Index % 7).toBe(6);
  });

  it('computes getDayAggregateStatus for available, last-seats, sold-out and empty days', () => {
    expect(getDayAggregateStatus([])).toBeNull();

    // Available
    expect(
      getDayAggregateStatus([
        createMockDeparture('available', 28),
        createMockDeparture('available', 16),
      ]),
    ).toBe('available');

    // Last seats
    expect(
      getDayAggregateStatus([createMockDeparture('last-seats', 5)]),
    ).toBe('last-seats');

    // Sold out (all sold out)
    expect(
      getDayAggregateStatus([createMockDeparture('sold-out', 0)]),
    ).toBe('sold-out');

    // Sold out when primary base trip (popularity >= 90) is sold out (e.g. 13 Nov)
    expect(
      getDayAggregateStatus([
        createMockDeparture('sold-out', 0, 92, '2026-11-13'),
        createMockDeparture('available', 14, 80, '2026-11-13'),
      ]),
    ).toBe('sold-out');
  });

  it('formats weekday ranges and Romanian dates accurately', () => {
    expect(formatWeekdayRange('2026-11-15', '2026-11-16')).toBe(
      'Duminică - Luni',
    );
    expect(formatWeekdayRange('2026-11-19', '2026-11-19')).toBe('Joi');
    expect(formatFullRomanianDate('2026-11-15')).toBe('15 Noiembrie 2026');
    expect(parseCalendarMonthParam('2026-12').label).toBe('Decembrie 2026');
    expect(parseCalendarMonthParam(undefined).value).toBe('2026-11');
  });
});
