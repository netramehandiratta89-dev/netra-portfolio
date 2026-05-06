import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const table = 'projects';

const fallbackProjects = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'Personal portfolio website with modern design',
    stack: 'React, Tailwind, Vercel',
    tag: 'Web',
    github: 'https://github.com/netra-portfolio',
    live: 'https://netra.me',
    featured: true
  }
];

export function useProjects(options = {}) {
  const { autoRefresh = 0, tag } = options;
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      let query = supabase.from(table).select('*').order('created_at', { ascending: false });
      if (tag && tag !== 'All') {
        query = query.eq('tag', tag);
      }
      const { data, error: err } = await query;
      if (err) throw err;
      if (data?.length) setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    fetchProjects();
    if (autoRefresh > 0) {
      interval = setInterval(fetchProjects, autoRefresh);
    }
    return () => interval && clearInterval(interval);
  }, [autoRefresh, tag]);

  const addProject = async (project) => {
    const { data, error } = await supabase.from(table).insert(project).select().single();
    if (!error && data) setProjects((prev) => [data, ...prev]);
    return { data, error };
  };

  const updateProject = async (id, updates) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
    if (!error && data) {
      setProjects((prev) => prev.map((p) => (p.id === id ? data : p)));
    }
    return { data, error };
  };

  const deleteProject = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setProjects((prev) => prev.filter((p) => p.id !== id));
    return { error };
  };

  const tags = [...new Set(projects.map((p) => p.tag))];

  return {
    projects,
    loading,
    error,
    tags,
    addProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
}