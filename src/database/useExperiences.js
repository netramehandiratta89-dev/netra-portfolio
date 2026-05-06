import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const table = 'experiences';

const fallbackExperiences = [
  {
    id: 1,
    company: 'Tech Company',
    role: 'Software Developer',
    period: '2023 - Present',
    description: 'Building modern web applications',
    current: true
  }
];

export function useExperiences(options = {}) {
  const { autoRefresh = 0, currentOnly = false } = options;
  const [experiences, setExperiences] = useState(fallbackExperiences);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExperiences = async () => {
    try {
      let query = supabase.from(table).select('*').order('created_at', { ascending: false });
      if (currentOnly) {
        query = query.eq('current', true);
      }
      const { data, error: err } = await query;
      if (err) throw err;
      if (data?.length) setExperiences(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    fetchExperiences();
    if (autoRefresh > 0) {
      interval = setInterval(fetchExperiences, autoRefresh);
    }
    return () => interval && clearInterval(interval);
  }, [autoRefresh, currentOnly]);

  const addExperience = async (experience) => {
    const { data, error } = await supabase.from(table).insert(experience).select().single();
    if (!error && data) setExperiences((prev) => [data, ...prev]);
    return { data, error };
  };

  const updateExperience = async (id, updates) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
    if (!error && data) {
      setExperiences((prev) => prev.map((e) => (e.id === id ? data : e)));
    }
    return { data, error };
  };

  const deleteExperience = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setExperiences((prev) => prev.filter((e) => e.id !== id));
    return { error };
  };

  const refresh = async () => {
    setLoading(true);
    await fetchExperiences();
  };

  return {
    experiences,
    loading,
    error,
    create: addExperience,
    update: updateExperience,
    remove: deleteExperience,
    refresh
  };
}