import { describe, expect, it } from 'vitest';
import { formatPrice, formatShortDate, getDayOfWeek } from '@/lib/format';

describe('format helpers', () => {
  it('formats short Romanian dates correctly', () => {
    expect(formatShortDate('2026-11-15')).toBe('15 Noi 2026');
    expect(formatShortDate('2026-01-05')).toBe('05 Ian 2026');
    expect(formatShortDate(new Date(2026, 11, 6))).toBe('06 Dec 2026');
    expect(formatShortDate(null)).toBe('');
  });

  it('calculates the Romanian day of week correctly', () => {
    // 2026-11-15 was a Sunday
    expect(getDayOfWeek('2026-11-15')).toBe('Duminică');
    // 2026-11-16 was a Monday
    expect(getDayOfWeek('2026-11-16')).toBe('Luni');
    // 2026-10-21 was a Wednesday
    expect(getDayOfWeek('2026-10-21')).toBe('Miercuri');
  });

  it('formats prices correctly', () => {
    expect(formatPrice(119)).toBe('119 €');
    expect(formatPrice(0)).toBe('0 €');
    expect(formatPrice(null)).toBe('—');
  });
});
