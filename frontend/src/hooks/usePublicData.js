/**
 * File: frontend/src/hooks/usePublicData.js
 * Purpose: Reusable hook for loading public backend data with fallbacks.
 * Features: Loading state, error state, async fetch, and fallback-safe data.
 * Used by: Public website pages that read services, offers, staff, reviews, or settings.
 * Future edits: Add caching, retry logic, or React Query replacement here.
 */

import { useEffect, useState } from 'react';

export function usePublicData(fetcher, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const result = await fetcher();
        if (mounted) setData(Array.isArray(result) || typeof result === 'object' ? result : fallback);
      } catch (err) {
        if (mounted) {
          setData(fallback);
          setError(err?.response?.data?.message || err?.message || 'Could not load data right now.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error, setData };
}
