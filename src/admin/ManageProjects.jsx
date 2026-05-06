import { Github, Plus, RotateCcw, Search, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useProjects } from '../database/useProjects';
import { fetchGitHubProjects } from '../github/githubService';

export default function ManageProjects() {
  const { projects, loading, create, update, remove, refresh } = useProjects();
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', tag: '', image: '', github: '', live: '', stack: '', description: '' });

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const handleSync = async () => {
    setSyncing(true);
    try {
      const githubProjects = await fetchGitHubProjects();
      for (const proj of githubProjects) {
        const existing = projects.find(p => p.github === proj.github);
        if (!existing) {
          await create(proj);
        }
      }
      await refresh();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setSyncing(false);
    }
  };

  const handleCreate = async () => {
    if (!form.title) return;
    await create(form);
    setForm({ title: '', tag: '', image: '', github: '', live: '', stack: '', description: '' });
  };

  const handleUpdate = async () => {
    if (!editing || !form.title) return;
    await update(editing, form);
    setEditing(null);
    setForm({ title: '', tag: '', image: '', github: '', live: '', stack: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS</p>
          <h2 className="text-3xl font-black">Manage Projects</h2>
        </div>
        <button className="button-primary" onClick={handleSync} disabled={syncing}>
          <Github size={16} />{syncing ? 'Syncing...' : 'Sync from GitHub'}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="premium-card bg-white/[0.06]">
          <h3 className="text-2xl font-black">{editing ? 'Edit' : 'Add Manual'} Project</h3>
          <p className="mt-2 text-sm text-white/50">Add custom projects not synced from GitHub.</p>
          <div className="mt-6 grid gap-4">
            <input className="admin-input" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            <input className="admin-input" placeholder="Tag / Category" value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} />
            <input className="admin-input" placeholder="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
            <input className="admin-input" placeholder="GitHub URL" value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))} />
            <input className="admin-input" placeholder="Live URL" value={form.live} onChange={e => setForm(f => ({ ...f, live: e.target.value }))} />
            <input className="admin-input" placeholder="Tech Stack (comma separated)" value={form.stack} onChange={e => setForm(f => ({ ...f, stack: e.target.value }))} />
            <textarea className="admin-input min-h-24" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <div className="flex gap-3">
              {editing ? (
                <>
                  <button className="button-primary" onClick={handleUpdate}><RotateCcw size={16} />Update</button>
                  <button className="button-ghost" onClick={() => { setEditing(null); setForm({ title: '', tag: '', image: '', github: '', live: '', stack: '', description: '' }); }}>Cancel</button>
                </>
              ) : (
                <button className="button-primary" onClick={handleCreate}><Plus size={16} />Add Project</button>
              )}
            </div>
          </div>
        </section>

        <section className="premium-card bg-white/[0.06]">
          <div className="flex items-center gap-3">
            <Search className="text-white/50" size={18} />
            <input className="admin-input" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="mt-5 space-y-3">
            {loading ? <p className="text-white/50">Loading...</p> : filtered.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <div className="font-bold">{p.title}</div>
                  <div className="text-sm text-white/50">{p.tag} • {p.stack}</div>
                </div>
                <div className="flex gap-2">
                  <button className="button-ghost py-2" onClick={() => { setEditing(p.id); setForm(p); }}>Edit</button>
                  <button className="button-ghost py-2 text-red-200" onClick={() => remove(p.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}