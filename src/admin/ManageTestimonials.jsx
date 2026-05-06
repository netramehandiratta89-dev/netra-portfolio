import { Quote, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTestimonials } from '../database/useTestimonials';
import { testimonials as defaultTestimonials } from '../utils/constants';

export default function ManageTestimonials() {
  const { testimonials, loading, create, update, remove, refresh } = useTestimonials();
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', message: '', avatar: '' });

  const filtered = testimonials.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const handleSyncDefaults = async () => {
    setSyncing(true);
    try {
      for (const [message, role, name] of defaultTestimonials) {
        const exists = testimonials.find(t => t.message === message);
        if (!exists) {
          await create({ name, role, message, avatar: '' });
        }
      }
      await refresh();
    } finally {
      setSyncing(false);
    }
  };

  const handleCreate = async () => {
    if (!form.name) return;
    await create(form);
    setForm({ name: '', role: '', message: '', avatar: '' });
  };

  const handleUpdate = async () => {
    if (!editing || !form.name) return;
    await update(editing, form);
    setEditing(null);
    setForm({ name: '', role: '', message: '', avatar: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS</p>
          <h2 className="text-3xl font-black">Testimonials</h2>
        </div>
        <button className="button-primary" onClick={handleSyncDefaults} disabled={syncing}>
          <Quote size={16} />{syncing ? 'Syncing...' : 'Import Default Testimonials'}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="premium-card bg-white/[0.06]">
          <h3 className="text-2xl font-black">{editing ? 'Edit' : 'Add New'} Testimonial</h3>
          <div className="mt-6 grid gap-4">
            <input className="admin-input" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="admin-input" placeholder="Role / Title" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
            <input className="admin-input" placeholder="Avatar URL (optional)" value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} />
            <textarea className="admin-input min-h-24" placeholder="Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            <div className="flex gap-3">
              {editing ? (
                <>
                  <button className="button-primary" onClick={handleUpdate}><RotateCcw size={16} />Update</button>
                  <button className="button-ghost" onClick={() => { setEditing(null); setForm({ name: '', role: '', message: '', avatar: '' }); }}>Cancel</button>
                </>
              ) : (
                <button className="button-primary" onClick={handleCreate}><Plus size={16} />Add Testimonial</button>
              )}
            </div>
          </div>
        </section>

        <section className="premium-card bg-white/[0.06]">
          <div className="flex items-center gap-3">
            <Search className="text-white/50" size={18} />
            <input className="admin-input" placeholder="Search testimonials..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="mt-5 space-y-3">
            {loading ? <p className="text-white/50">Loading...</p> : filtered.length === 0 ? (
              <p className="text-white/50 text-center py-8">No testimonials. Click "Import Default Testimonials" to add.</p>
            ) : filtered.map(t => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-white/50">{t.role}</div>
                  <div className="mt-2 text-sm text-white/70 line-clamp-2">{t.message}</div>
                </div>
                <div className="flex gap-2">
                  <button className="button-ghost py-2" onClick={() => { setEditing(t.id); setForm(t); }}>Edit</button>
                  <button className="button-ghost py-2 text-red-200" onClick={() => remove(t.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}