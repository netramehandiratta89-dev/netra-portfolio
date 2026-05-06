import { FileText, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';

const table = 'blogs';

const defaultBlogs = [
  { title: 'Designing Motion That Feels Expensive', slug: 'designing-motion', category: 'UI Motion', description: 'Exploring animation techniques that create premium user experiences.' },
  { title: 'Scaling React Apps Without Losing Taste', slug: 'scaling-react-apps', category: 'Engineering', description: 'Best practices for building large React applications while maintaining code quality.' },
  { title: 'A Practical CMS Model for Portfolios', slug: 'cms-model-portfolios', category: 'Architecture', description: 'Building a flexible content management system for personal portfolios.' }
];

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', category: 'Development', description: '' });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filtered = blogs.filter(b => b.title?.toLowerCase().includes(search.toLowerCase()));

  const handleSyncDefaults = async () => {
    setSyncing(true);
    try {
      for (const blog of defaultBlogs) {
        const exists = blogs.find(b => b.slug === blog.slug);
        if (!exists) {
          const { data, error } = await supabase.from(table).insert(blog).select().single();
          if (!error && data) setBlogs(prev => [data, ...prev]);
        }
      }
    } finally {
      setSyncing(false);
    }
  };

  const handleCreate = async () => {
    if (!form.title) return;
    const { data, error } = await supabase.from(table).insert(form).select().single();
    if (!error && data) {
      setBlogs(prev => [data, ...prev]);
      setForm({ title: '', slug: '', category: 'Development', description: '' });
    }
  };

  const handleUpdate = async () => {
    if (!editing || !form.title) return;
    const { data, error } = await supabase.from(table).update(form).eq('id', editing).select().single();
    if (!error && data) {
      setBlogs(prev => prev.map(b => b.id === editing ? data : b));
      setEditing(null);
      setForm({ title: '', slug: '', category: 'Development', description: '' });
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setBlogs(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS</p>
          <h2 className="text-3xl font-black">Manage Blogs</h2>
        </div>
        <button className="button-primary" onClick={handleSyncDefaults} disabled={syncing}>
          <FileText size={16} />{syncing ? 'Syncing...' : 'Import Default'}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="premium-card bg-white/[0.06]">
          <h3 className="text-2xl font-black">{editing ? 'Edit' : 'Add New'} Blog</h3>
          <div className="mt-6 grid gap-4">
            <input className="admin-input" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} />
            <input className="admin-input" placeholder="Slug (URL)" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
            <input className="admin-input" placeholder="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            <textarea className="admin-input min-h-24" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <div className="flex gap-3">
              {editing ? (
                <>
                  <button className="button-primary" onClick={handleUpdate}><RotateCcw size={16} />Update</button>
                  <button className="button-ghost" onClick={() => { setEditing(null); setForm({ title: '', slug: '', category: 'Development', description: '' }); }}>Cancel</button>
                </>
              ) : (
                <button className="button-primary" onClick={handleCreate}><Plus size={16} />Add Blog</button>
              )}
            </div>
          </div>
        </section>

        <section className="premium-card bg-white/[0.06]">
          <div className="flex items-center gap-3">
            <Search className="text-white/50" size={18} />
            <input className="admin-input" placeholder="Search blogs..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="mt-5 space-y-3">
            {loading ? <p className="text-white/50 text-center py-8">Loading...</p> : filtered.length === 0 ? (
              <p className="text-white/50 text-center py-8">No blogs. Click "Import Default" to add.</p>
            ) : filtered.map(blog => (
              <div key={blog.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <div className="font-bold">{blog.title}</div>
                  <div className="text-sm text-white/50">{blog.category} • /blog/{blog.slug}</div>
                </div>
                <div className="flex gap-2">
                  <button className="button-ghost py-2" onClick={() => { setEditing(blog.id); setForm(blog); }}>Edit</button>
                  <button className="button-ghost py-2 text-red-200" onClick={() => handleDelete(blog.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}