import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const table = 'skills';

const fallbackSkills = [
  { id: 1, name: 'JavaScript', category: 'Languages', level: 95 },
  { id: 2, name: 'Python', category: 'Languages', level: 90 },
  { id: 3, name: 'React', category: 'Frontend', level: 95 },
  { id: 4, name: 'Node.js', category: 'Backend', level: 88 },
  { id: 5, name: 'TypeScript', category: 'Languages', level: 92 },
  { id: 6, name: 'HTML/CSS', category: 'Frontend', level: 95 },
  { id: 7, name: 'Tailwind', category: 'Frontend', level: 90 },
  { id: 8, name: 'Git', category: 'Tools', level: 85 },
  { id: 9, name: 'Docker', category: 'Tools', level: 75 },
  { id: 10, name: 'PostgreSQL', category: 'Database', level: 80 }
];

export function useSkills(options = {}) {
  const { autoRefresh = 0, category } = options;
  const [skills, setSkills] = useState(fallbackSkills);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSkills = async () => {
    try {
      let query = supabase.from(table).select('*').order('level', { ascending: false });
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const { data, error: err } = await query;
      if (err) throw err;
      if (data?.length) setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    fetchSkills();
    if (autoRefresh > 0) {
      interval = setInterval(fetchSkills, autoRefresh);
    }
    return () => interval && clearInterval(interval);
  }, [autoRefresh, category]);

  const addSkill = async (skill) => {
    const { data, error } = await supabase.from(table).insert(skill).select().single();
    if (!error && data) setSkills((prev) => [...prev, data]);
    return { data, error };
  };

  const updateSkill = async (id, updates) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
    if (!error && data) {
      setSkills((prev) => prev.map((s) => (s.id === id ? data : s)));
    }
    return { data, error };
  };

  const deleteSkill = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setSkills((prev) => prev.filter((s) => s.id !== id));
    return { error };
  };

  const categories = [...new Set(skills.map((s) => s.category))];

  return {
    skills,
    loading,
    error,
    categories,
    addSkill,
    updateSkill,
    deleteSkill,
    refetch: fetchSkills
  };
}