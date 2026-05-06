import { useEffect, useState } from 'react';

export function useAsyncData(loader, fallback, options = {}) {
  const { autoRefresh = 0, immediate = true } = options;
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (!immediate) {
      setLoading(false);
    }
  }, [immediate]);

  useEffect(() => {
    let alive = true;
    let intervalId;

    const fetchData = () => {
      setLoading(true);
      loader()
        .then((value) => {
          if (alive) {
            setData(value);
            setLastUpdated(new Date());
          }
        })
        .catch((err) => alive && setError(err.message || 'Unable to load live data'))
        .finally(() => alive && setLoading(false));
    };

    if (immediate) {
      fetchData();
    }

    if (autoRefresh > 0) {
      intervalId = setInterval(fetchData, autoRefresh);
    }

    return () => {
      alive = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [loader, autoRefresh, immediate]);

  return { data, loading, error, lastUpdated, refetch: () => loader().then(setData).catch(setError) };
}
