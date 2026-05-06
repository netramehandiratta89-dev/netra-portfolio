import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const table = 'testimonials';

const fallbackTestimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CTO',
    company: 'Tech Corp',
    content: 'Great developer to work with! Very professional and delivers on time.',
    featured: true
  }
];

export function useTestimonials(options = {}) {
  const { autoRefresh = 0, featuredOnly = false } = options;
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTestimonials = async () => {
    try {
      let query = supabase.from(table).select('*').order('created_at', { ascending: false });
      if (featuredOnly) {
        query = query.eq('featured', true);
      }
      const { data, error: err } = await query;
      if (err) throw err;
      if (data?.length) setTestimonials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    fetchTestimonials();
    if (autoRefresh > 0) {
      interval = setInterval(fetchTestimonials, autoRefresh);
    }
    return () => interval && clearInterval(interval);
  }, [autoRefresh, featuredOnly]);

  const addTestimonial = async (testimonial) => {
    const { data, error } = await supabase.from(table).insert(testimonial).select().single();
    if (!error && data) setTestimonials((prev) => [data, ...prev]);
    return { data, error };
  };

  const updateTestimonial = async (id, updates) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
    if (!error && data) {
      setTestimonials((prev) => prev.map((t) => (t.id === id ? data : t)));
    }
    return { data, error };
  };

  const deleteTestimonial = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setTestimonials((prev) => prev.filter((t) => t.id !== id));
    return { error };
  };

  return {
    testimonials,
    loading,
    error,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials
  };
}