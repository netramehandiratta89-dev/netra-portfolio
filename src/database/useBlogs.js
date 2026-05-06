import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const table = 'blogs';

const fallbackBlogs = [
  {
    id: 1,
    title: 'Getting Started with React',
    slug: 'getting-started-with-react',
    excerpt: 'Learn the basics of React in this beginner-friendly guide',
    content: 'React is a powerful JavaScript library...',
    published: true,
    created_at: new Date().toISOString()
  }
];

export function useBlogs(options = {}) {
  const { autoRefresh = 0, publishedOnly = true } = options;
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    try {
      let query = supabase.from(table).select('*').order('created_at', { ascending: false });
      if (publishedOnly) {
        query = query.eq('published', true);
      }
      const { data, error: err } = await query;
      if (err) throw err;
      if (data?.length) setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    fetchBlogs();
    if (autoRefresh > 0) {
      interval = setInterval(fetchBlogs, autoRefresh);
    }
    return () => interval && clearInterval(interval);
  }, [autoRefresh, publishedOnly]);

  const addBlog = async (blog) => {
    const { data, error } = await supabase.from(table).insert(blog).select().single();
    if (!error && data) setBlogs((prev) => [data, ...prev]);
    return { data, error };
  };

  const updateBlog = async (id, updates) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
    if (!error && data) {
      setBlogs((prev) => prev.map((b) => (b.id === id ? data : b)));
    }
    return { data, error };
  };

  const deleteBlog = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setBlogs((prev) => prev.filter((b) => b.id !== id));
    return { error };
  };

  return {
    blogs,
    loading,
    error,
    addBlog,
    updateBlog,
    deleteBlog,
    refetch: fetchBlogs
  };
}