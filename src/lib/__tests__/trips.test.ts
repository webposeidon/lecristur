import { describe, expect, it } from 'vitest';
import {
  getDepartures,
  getDestinations,
  getFeaturedTrips,
  getFilterFacets,
  getTrip,
  getTrips,
} from '@/lib/api';
import { MOCK_TRIPS } from '@/lib/data/trips-mock';
import {
  DEFAULT_TODAY,
  filterAndSortTrips,
  getDepartureStatus,
  getNextDeparture,
  getStartingPrice,
  parseTripFilterParams,
  toTripSummary,
} from '@/lib/trips';
import type { Trip } from '@/types';

describe('Funcții derivate pentru plecări și excursii (src/lib/trips.ts)', () => {
  it('calculează corect pragurile de status în getDepartureStatus (0, 1..8, >8)', () => {
    expect(getDepartureStatus(0)).toBe('sold-out');
    expect(getDepartureStatus({ availableSeats: 0 })).toBe('sold-out');

    expect(getDepartureStatus(1)).toBe('last-seats');
    expect(getDepartureStatus(4)).toBe('last-seats');
    expect(getDepartureStatus(8)).toBe('last-seats');
    expect(getDepartureStatus({ availableSeats: 8 })).toBe('last-seats');

    expect(getDepartureStatus(9)).toBe('available');
    expect(getDepartureStatus(28)).toBe('available');
    expect(getDepartureStatus({ availableSeats: 50 })).toBe('available');
  });

  it('determină următoarea plecare viitoare și prețul „de la” în funcție de parametrul injectabil today', () => {
    const sampleTrip: Pick<Trip, 'departures'> = {
      departures: [
        {
          id: 'd1',
          startDate: '2026-10-10',
          endDate: '2026-10-11',
          price: 89,
          totalSeats: 40,
          availableSeats: 10,
        },
        {
          id: 'd2',
          startDate: '2026-11-15',
          endDate: '2026-11-16',
          price: 119,
          totalSeats: 50,
          availableSeats: 28,
        },
        {
          id: 'd3',
          startDate: '2026-11-29',
          endDate: '2026-11-30',
          price: 109,
          totalSeats: 50,
          availableSeats: 4,
        },
      ],
    };

    // La data implicită (21 octombrie 2026), plecarea din 10 octombrie este ignorată
    expect(getNextDeparture(sampleTrip, '2026-10-21')?.id).toBe('d2');
    expect(getStartingPrice(sampleTrip, '2026-10-21')).toBe(109);

    // După 16 noiembrie 2026, următoarea plecare devine 29 noiembrie
    expect(getNextDeparture(sampleTrip, '2026-11-16')?.id).toBe('d3');
    expect(getStartingPrice(sampleTrip, '2026-11-16')).toBe(109);

    // În 2027 nu mai există plecări viitoare
    expect(getNextDeparture(sampleTrip, '2027-01-01')).toBeNull();
    expect(getStartingPrice(sampleTrip, '2027-01-01')).toBeNull();
  });

  it('construiește TripSummary fără câmpurile de detaliu (itinerary, reviews, included, notIncluded)', () => {
    const fullTrip = MOCK_TRIPS[0];
    const summary = toTripSummary(fullTrip, DEFAULT_TODAY);

    expect(summary.slug).toBe('brasov-bran-sinaia');
    expect(summary.startingPrice).toBe(119);
    expect(summary.nextDeparture?.startDate).toBe('2026-11-15');
    expect('itinerary' in summary).toBe(false);
    expect('reviews' in summary).toBe(false);
    expect('included' in summary).toBe(false);
    expect('notIncluded' in summary).toBe(false);
  });
});

describe('Validare Zod pentru parametrii din URL (parseTripFilterParams)', () => {
  it('aplică valorile implicite și tolerează valori invalide din URL', () => {
    const parsed = parseTripFilterParams({
      destinatie: 'brasov, sinaia',
      durata: ['2', 'invalid-duration'],
      bugetMin: 'not-a-number',
      bugetMax: '-50',
      tip: ['cultural', 'unknown-type'],
      deLa: 'invalid-date',
      panaLa: '2026-11-30',
      sort: 'invalid-sort',
      page: '-3',
      pageSize: '999',
    });

    expect(parsed.destinations).toEqual(['brasov', 'sinaia']);
    expect(parsed.durations).toEqual(['2']);
    expect(parsed.minPrice).toBe(0);
    expect(parsed.maxPrice).toBe(300);
    expect(parsed.types).toEqual(['cultural']);
    expect(parsed.dateFrom).toBeUndefined();
    expect(parsed.dateTo).toBe('2026-11-30');
    expect(parsed.sort).toBe('popular');
    expect(parsed.page).toBe(1);
    expect(parsed.pageSize).toBe(12);
  });

  it('inversează automat bugetMin/bugetMax și deLa/panaLa dacă sunt trimise în ordine inversă', () => {
    const parsed = parseTripFilterParams({
      bugetMin: '200',
      bugetMax: '100',
      deLa: '2026-12-10',
      panaLa: '2026-11-10',
    });

    expect(parsed.minPrice).toBe(100);
    expect(parsed.maxPrice).toBe(200);
    expect(parsed.dateFrom).toBe('2026-11-10');
    expect(parsed.dateTo).toBe('2026-12-10');
  });
});

describe('Filtrare, sortare și paginare (filterAndSortTrips)', () => {
  it('returnează primele 12 excursii ordonate după popularitate în mod implicit (primele 8 corespund cu Catalog)', () => {
    const result = filterAndSortTrips(MOCK_TRIPS, {}, DEFAULT_TODAY);

    expect(result.total).toBe(50);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(12);
    expect(result.totalPages).toBe(5);
    expect(result.items).toHaveLength(12);

    const firstEightTitles = result.items.slice(0, 8).map((t) => t.title);
    expect(firstEightTitles).toEqual([
      'Brașov • Bran • Sinaia',
      'Maramureș • Mocănița',
      'Bucovina • Mănăstiri',
      'Sovata • Corund • Târgu Mureș',
      'Delta Dunării',
      'Sinaia • Castelul Peleș',
      'Transfăgărășan • Bâlea Lac',
      'Litoralul României',
    ]);
  });

  it('filtrează corect după durată (1 zi: 8, 2 zile: 18, 3 zile: 12, 4+ zile: 12)', () => {
    expect(filterAndSortTrips(MOCK_TRIPS, { durata: '1' }).total).toBe(8);
    expect(filterAndSortTrips(MOCK_TRIPS, { durata: '2' }).total).toBe(18);
    expect(filterAndSortTrips(MOCK_TRIPS, { durata: '3' }).total).toBe(12);
    expect(filterAndSortTrips(MOCK_TRIPS, { durata: '4+' }).total).toBe(12);
    expect(
      filterAndSortTrips(MOCK_TRIPS, { durata: ['1', '3'] }).total,
    ).toBe(20);
  });

  it('filtrează după o combinație de destinație, tip, buget, interval de date și căutare text fără diacritice', () => {
    const combined = filterAndSortTrips(
      MOCK_TRIPS,
      {
        destinatie: 'brasov',
        durata: '2',
        tip: 'cultural',
        bugetMin: 100,
        bugetMax: 125,
        deLa: '2026-11-14',
        panaLa: '2026-11-16',
        q: 'peles', // fără diacritice, găsește „Peleș”
      },
      DEFAULT_TODAY,
    );

    expect(combined.total).toBeGreaterThanOrEqual(1);
    expect(combined.items.some((t) => t.slug === 'brasov-bran-sinaia')).toBe(
      true,
    );
    for (const item of combined.items) {
      expect(item.destinations).toContain('brasov');
      expect(item.days).toBe(2);
      expect(item.type).toBe('cultural');
      expect(item.startingPrice).toBeGreaterThanOrEqual(100);
      expect(item.startingPrice).toBeLessThanOrEqual(125);
    }
  });

  it('gestionează corect pagina goală (niciun rezultat) și pagina în afara intervalului', () => {
    const emptyResult = filterAndSortTrips(MOCK_TRIPS, {
      q: 'excursie-inexistenta-xyz-999',
    });
    expect(emptyResult.total).toBe(0);
    expect(emptyResult.items).toEqual([]);
    expect(emptyResult.totalPages).toBe(1);

    const outOfRange = filterAndSortTrips(MOCK_TRIPS, {
      page: 10,
      pageSize: 24,
    });
    expect(outOfRange.total).toBe(50);
    expect(outOfRange.totalPages).toBe(3);
    expect(outOfRange.page).toBe(10);
    expect(outOfRange.items).toEqual([]);
  });

  it('suportă dimensiunile de pagină 12, 24 și 48', () => {
    expect(filterAndSortTrips(MOCK_TRIPS, { pageSize: 12 }).items).toHaveLength(
      12,
    );
    expect(filterAndSortTrips(MOCK_TRIPS, { pageSize: 24 }).items).toHaveLength(
      24,
    );
    expect(filterAndSortTrips(MOCK_TRIPS, { pageSize: 48 }).items).toHaveLength(
      48,
    );
  });

  it('sortează corect după price-asc, price-desc și date-asc', () => {
    const asc = filterAndSortTrips(MOCK_TRIPS, {
      sort: 'price-asc',
      pageSize: 48,
    });
    for (let i = 1; i < asc.items.length; i++) {
      expect(asc.items[i].startingPrice!).toBeGreaterThanOrEqual(
        asc.items[i - 1].startingPrice!,
      );
    }

    const desc = filterAndSortTrips(MOCK_TRIPS, {
      sort: 'price-desc',
      pageSize: 48,
    });
    for (let i = 1; i < desc.items.length; i++) {
      expect(desc.items[i].startingPrice!).toBeLessThanOrEqual(
        desc.items[i - 1].startingPrice!,
      );
    }

    const byDate = filterAndSortTrips(MOCK_TRIPS, {
      sort: 'date-asc',
      pageSize: 48,
    });
    for (let i = 1; i < byDate.items.length; i++) {
      const prevDate = byDate.items[i - 1].nextDeparture!.startDate;
      const currDate = byDate.items[i].nextDeparture!.startDate;
      expect(currDate >= prevDate).toBe(true);
    }
  });
});

describe('Stratul API async (src/lib/api.ts) și integritatea datelor din screenshot-uri', () => {
  it('getTrip("brasov-bran-sinaia") returnează programul complet pe 2 zile, cele 3 plecări și recenzia Anei M.', async () => {
    const trip = await getTrip('brasov-bran-sinaia');
    expect(trip).not.toBeNull();
    expect(trip!.title).toBe('Brașov • Bran • Sinaia');
    expect(trip!.itinerary).toHaveLength(2);
    expect(trip!.itinerary[0].activities[0]).toEqual({
      time: '06:00',
      text: 'Plecare din Chișinău (punctul stabilit)',
    });
    expect(trip!.itinerary[1].activities[4]).toEqual({
      time: '22:00',
      text: 'Sosire în Chișinău (în funcție de trafic)',
    });

    expect(trip!.departures.map((d) => ({
      startDate: d.startDate,
      price: d.price,
      availableSeats: d.availableSeats,
      totalSeats: d.totalSeats,
    }))).toEqual([
      {
        startDate: '2026-11-15',
        price: 119,
        availableSeats: 28,
        totalSeats: 50,
      },
      {
        startDate: '2026-11-22',
        price: 119,
        availableSeats: 12,
        totalSeats: 50,
      },
      {
        startDate: '2026-11-29',
        price: 129,
        availableSeats: 4,
        totalSeats: 50,
      },
    ]);

    expect(trip!.reviews[0].author).toBe('Ana M.');
    expect(trip!.reviews[0].rating).toBe(5.0);
  });

  it('getDepartures({ month: 11, year: 2026 }) conține plecările din Calendar cu toate stările (available, last-seats, sold-out)', async () => {
    const novDepartures = await getDepartures({ month: 11, year: 2026 });
    expect(novDepartures.length).toBeGreaterThan(10);

    const statuses = new Set(novDepartures.map((d) => d.status));
    expect(statuses.has('available')).toBe(true);
    expect(statuses.has('last-seats')).toBe(true);
    expect(statuses.has('sold-out')).toBe(true);

    // Verificăm cele 6 stocuri de locuri din screenshot-ul Calendar:
    // 28 din 50 (Brașov), 8 din 30 (Sovata), 16 din 40 (Bucovina),
    // 12 din 30 (Maramureș), 4 din 20 (Delta Dunării), 20 din 40 (Sibiu)
    expect(
      novDepartures.find(
        (d) =>
          d.trip.slug === 'brasov-bran-sinaia' && d.startDate === '2026-11-15',
      ),
    ).toMatchObject({ availableSeats: 28, totalSeats: 50, status: 'available' });

    expect(
      novDepartures.find(
        (d) =>
          d.trip.slug === 'sovata-corund-targu-mures' &&
          d.startDate === '2026-11-15',
      ),
    ).toMatchObject({ availableSeats: 8, totalSeats: 30, status: 'last-seats' });

    expect(
      novDepartures.find(
        (d) =>
          d.trip.slug === 'bucovina-manastiri' && d.startDate === '2026-11-15',
      ),
    ).toMatchObject({ availableSeats: 16, totalSeats: 40, status: 'available' });

    expect(
      novDepartures.find(
        (d) =>
          d.trip.slug === 'maramures-mocanita' && d.startDate === '2026-11-22',
      ),
    ).toMatchObject({ availableSeats: 12, totalSeats: 30, status: 'available' });

    expect(
      novDepartures.find(
        (d) => d.trip.slug === 'delta-dunarii' && d.startDate === '2026-11-29',
      ),
    ).toMatchObject({ availableSeats: 4, totalSeats: 20, status: 'last-seats' });

    expect(
      novDepartures.find(
        (d) =>
          d.trip.slug === 'sibiu-sighisoara' && d.startDate === '2026-11-29',
      ),
    ).toMatchObject({ availableSeats: 20, totalSeats: 40, status: 'available' });
  });

  it('getDestinations, getFilterFacets, getTrips și getFeaturedTrips returnează date calculate dinamic', async () => {
    const destinations = await getDestinations();
    expect(destinations.length).toBeGreaterThan(5);
    expect(destinations[0].tripCount).toBeGreaterThan(0);

    const facets = await getFilterFacets();
    expect(facets.totalTrips).toBe(50);
    expect(facets.durations).toEqual({
      '1': 8,
      '2': 18,
      '3': 12,
      '4+': 12,
    });

    const featured = await getFeaturedTrips(4);
    expect(featured).toHaveLength(4);
    expect('itinerary' in featured[0]).toBe(false);

    const tripsPage = await getTrips({ page: 1, pageSize: 12 });
    expect(tripsPage.items).toHaveLength(12);
    expect(tripsPage.total).toBe(50);
  });
});
