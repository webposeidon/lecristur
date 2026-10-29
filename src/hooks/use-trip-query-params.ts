'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export type TripQueryParamKey =
  | 'q'
  | 'destinatie'
  | 'durata'
  | 'bugetMin'
  | 'bugetMax'
  | 'tip'
  | 'deLa'
  | 'panaLa'
  | 'sort'
  | 'page'
  | 'pageSize';

export interface SetParamOptions {
  scroll?: boolean;
  resetPage?: boolean;
}

export function useTripQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = useCallback(
    (key: TripQueryParamKey): string => {
      return searchParams?.get(key) ?? '';
    },
    [searchParams],
  );

  const getArrayParam = useCallback(
    (key: TripQueryParamKey): string[] => {
      const raw = searchParams?.get(key);
      if (!raw) return [];
      return raw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    },
    [searchParams],
  );

  /**
   * Actualizează sau șterge parametri în URL.
   * La orice schimbare de filtru (key !== 'page'), resetează implicit parametrul 'page'.
   * Opțiunea scroll este implicit false (evită saltul paginii la click pe filtre).
   */
  const updateParams = useCallback(
    (
      updates: Partial<
        Record<
          TripQueryParamKey,
          string | number | string[] | null | undefined
        >
      >,
      options: SetParamOptions = {},
    ) => {
      const { scroll = false, resetPage = true } = options;
      const current = new URLSearchParams(searchParams?.toString() ?? '');

      // Dacă resetPage este activ și nu modificăm explicit doar pagina, resetăm pagina la 1
      const isOnlyPageChange =
        Object.keys(updates).length === 1 && 'page' in updates;
      if (resetPage && !isOnlyPageChange) {
        current.delete('page');
      }

      for (const [key, value] of Object.entries(updates)) {
        if (
          value === undefined ||
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          current.delete(key);
          continue;
        }

        if (Array.isArray(value)) {
          const joined = value.filter(Boolean).join(',');
          if (joined) {
            current.set(key, joined);
          } else {
            current.delete(key);
          }
        } else {
          const str = String(value).trim();
          if (
            str &&
            !(key === 'page' && str === '1') &&
            !(key === 'sort' && str === 'popular') &&
            !(key === 'bugetMin' && str === '0') &&
            !(key === 'bugetMax' && str === '300')
          ) {
            current.set(key, str);
          } else if (
            (key === 'page' && str === '1') ||
            (key === 'sort' && str === 'popular') ||
            (key === 'bugetMin' && str === '0') ||
            (key === 'bugetMax' && str === '300')
          ) {
            // Curățăm valorile implicite din URL pentru un link curat
            current.delete(key);
          }
        }
      }

      const queryString = current.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(targetUrl, { scroll });
    },
    [pathname, router, searchParams],
  );

  /**
   * Comută un element dintr-un parametru array (ex. destinație sau tip).
   * Dacă elementul există deja, este eliminat. Dacă nu, este adăugat.
   */
  const toggleArrayValue = useCallback(
    (
      key: TripQueryParamKey,
      valueToToggle: string,
      options: SetParamOptions = {},
    ) => {
      const normalized = valueToToggle.trim().toLowerCase();
      const currentValues = getArrayParam(key);
      const exists = currentValues.includes(normalized);

      const nextValues = exists
        ? currentValues.filter((v) => v !== normalized)
        : [...currentValues, normalized];

      updateParams({ [key]: nextValues }, { scroll: false, ...options });
    },
    [getArrayParam, updateParams],
  );

  /**
   * Șterge un parametru din URL (sau mai mulți).
   */
  const clearParams = useCallback(
    (keys: TripQueryParamKey | TripQueryParamKey[], options: SetParamOptions = {}) => {
      const keysList = Array.isArray(keys) ? keys : [keys];
      const updates = keysList.reduce(
        (acc, k) => ({ ...acc, [k]: null }),
        {} as Record<TripQueryParamKey, null>,
      );
      updateParams(updates, { scroll: false, ...options });
    },
    [updateParams],
  );

  /**
   * Resetează toate filtrele de căutare (păstrează eventual doar pagina 1 curată).
   */
  const resetAllFilters = useCallback(
    (options: { scroll?: boolean } = {}) => {
      router.push(pathname, { scroll: options.scroll ?? false });
    },
    [pathname, router],
  );

  const hasActiveFilters = Boolean(
    searchParams?.get('q') ||
      searchParams?.get('destinatie') ||
      searchParams?.get('durata') ||
      searchParams?.get('bugetMin') ||
      searchParams?.get('bugetMax') ||
      searchParams?.get('tip') ||
      searchParams?.get('deLa') ||
      searchParams?.get('panaLa'),
  );

  return {
    searchParams,
    getParam,
    getArrayParam,
    updateParams,
    toggleArrayValue,
    clearParams,
    resetAllFilters,
    hasActiveFilters,
  };
}
