import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const table = 'stats';

const fallbackStats = [
  { id: 1, label: 'Projects Completed', value: 15, icon: 'folder' },
  { id: 2, label: 'Years Experience', value: 3, icon: 'clock' },
  { id: 3, label: 'Clients Served', value: 10, icon: 'users' }
];

export function useStats(options = {}) {
  const { autoRefresh = 0 } = options;
  const [stats, setStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const { data, error: err } = await supabase.from(table).select('*').order('id');
      if (err) throw err;
      if (data?.length) setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    fetchStats();
    if (autoRefresh > 0) {
      interval = setInterval(fetchStats, autoRefresh);
    }
    return () => interval && clearInterval(interval);
  }, [autoRefresh]);

  const addStat = async (stat) => {
    const { data, error } = await supabase.from(table).insert(stat).select().single();
    if (!error && data) setStats((prev) => [...prev, data]);
    return { data, error };
  };

  const updateStat = async (id, updates) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
    if (!error && data) {
      setStats((prev) => prev.map((s) => (s.id === id ? data : s)));
    }
    return { data, error };
  };

  const deleteStat = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setStats((prev) => prev.filter((s) => s.id !== id));
    return { error };
  };

  return {
    stats,
    loading,
    error,
    addStat,
    updateStat,
    deleteStat,
    refetch: fetchStats
  };
}