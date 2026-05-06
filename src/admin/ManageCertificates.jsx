import { Award, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCertificates } from '../database/useCertificates';
import { certificates as defaultCertificates } from '../utils/constants';

export default function ManageCertificates() {
  const { certificates, loading, create, update, remove, refresh } = useCertificates();
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', issuer: '', date: '', url: '' });

  const filtered = certificates.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSyncDefaults = async () => {
    setSyncing(true);
    try {
      for (const certName of defaultCertificates) {
        const exists = certificates.find(c => c.name === certName);
        if (!exists) {
          await create({ name: certName, issuer: 'Issuing Organization', date: '2024', url: '' });
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
    setForm({ name: '', issuer: '', date: '', url: '' });
  };

  const handleUpdate = async () => {
    if (!editing || !form.name) return;
    await update(editing, form);
    setEditing(null);
    setForm({ name: '', issuer: '', date: '', url: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS</p>
          <h2 className="text-3xl font-black">Manage Certificates</h2>
        </div>
        <button className="button-primary" onClick={handleSyncDefaults} disabled={syncing}>
          <Award size={16} />{syncing ? 'Syncing...' : 'Import Default Certs'}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="premium-card bg-white/[0.06]">
          <h3 className="text-2xl font-black">{editing ? 'Edit' : 'Add New'} Certificate</h3>
          <div className="mt-6 grid gap-4">
            <input className="admin-input" placeholder="Certificate Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="admin-input" placeholder="Issuer" value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} />
            <input className="admin-input" placeholder="Date (e.g., Jan 2024)" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            <input className="admin-input" placeholder="Certificate URL (optional)" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} />
            <div className="flex gap-3">
              {editing ? (
                <>
                  <button className="button-primary" onClick={handleUpdate}><RotateCcw size={16} />Update</button>
                  <button className="button-ghost" onClick={() => { setEditing(null); setForm({ name: '', issuer: '', date: '', url: '' }); }}>Cancel</button>
                </>
              ) : (
                <button className="button-primary" onClick={handleCreate}><Plus size={16} />Add Certificate</button>
              )}
            </div>
          </div>
        </section>

        <section className="premium-card bg-white/[0.06]">
          <div className="flex items-center gap-3">
            <Search className="text-white/50" size={18} />
            <input className="admin-input" placeholder="Search certificates..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="mt-5 space-y-3">
            {loading ? <p className="text-white/50">Loading...</p> : filtered.map(cert => (
              <div key={cert.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <div className="font-bold">{cert.name}</div>
                  <div className="text-sm text-white/50">{cert.issuer} • {cert.date}</div>
                </div>
                <div className="flex gap-2">
                  <button className="button-ghost py-2" onClick={() => { setEditing(cert.id); setForm(cert); }}>Edit</button>
                  <button className="button-ghost py-2 text-red-200" onClick={() => remove(cert.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}