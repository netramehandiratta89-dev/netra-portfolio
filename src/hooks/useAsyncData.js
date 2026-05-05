import { useEffect, useState } from 'react';

export function useAsyncData(loader, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    loader()
      .then((value) => alive && setData(value))
      .catch((err) => alive && setError(err.message || 'Unable to load live data'))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [loader]);

  return { data, loading, error };
}
