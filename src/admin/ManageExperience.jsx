import { Linkedin, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';

const table = 'experiences';

const defaultExperiences = [
  { title: 'Bachelor of Computer Applications', company: 'Bharati Vidyapeeth University Institute of Management and Research (BVIMR)', type: 'Education', period: '2025 - 2028', description: 'Building core foundations in computer applications, programming, and software development.' },
  { title: 'Nexel: Incubation Cell BVIMR', company: 'BVIMR, Delhi', type: 'Hackathon', period: '2026', description: 'LinkedIn-listed experience connected to innovation, incubation, and campus technology initiatives.' },
  { title: 'Buildathon 2025 Participant', company: 'Unstop', type: 'Hackathon', period: '2025', description: 'Certificate of Participation in Round 0 PPT Submission of Buildathon 2025: Innovate. Iterate. Evolve.' }
];

export default function ManageExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', company: '', type: 'Work', period: '', description: '' });

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setExperiences(data || []);
    } catch (err) {
      console.error('Error fetching experiences:', err);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const filtered = experiences.filter(e => 
    e.title?.toLowerCase().includes(search.toLowerCase()) || 
    e.company?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSyncDefaults = async () => {
    setSyncing(true);
    try {
      for (const exp of defaultExperiences) {
        const exists = experiences.find(e => e.title === exp.title);
        if (!exists) {
          const { data, error } = await supabase.from(table).insert(exp).select().single();
          if (!error && data) {
            setExperiences(prev => [data, ...prev]);
          }
        }
      }
    } catch (err) {
      console.error('Sync error:', err);
    } finally {
      setSyncing(false);
    }
  };

  const handleCreate = async () => {
    if (!form.title) return;
    try {
      const { data, error } = await supabase.from(table).insert(form).select().single();
      if (!error && data) {
        setExperiences(prev => [data, ...prev]);
        setForm({ title: '', company: '', type: 'Work', period: '', description: '' });
      }
    } catch (err) {
      console.error('Create error:', err);
    }
  };

  const handleUpdate = async () => {
    if (!editing || !form.title) return;
    try {
      const { data, error } = await supabase.from(table).update(form).eq('id', editing).select().single();
      if (!error && data) {
        setExperiences(prev => prev.map(e => e.id === editing ? data : e));
        setEditing(null);
        setForm({ title: '', company: '', type: 'Work', period: '', description: '' });
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (!error) {
        setExperiences(prev => prev.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS</p>
          <h2 className="text-3xl font-black">Experience & Education</h2>
        </div>
        <button className="button-primary" onClick={handleSyncDefaults} disabled={syncing}>
          <Linkedin size={16} />{syncing ? 'Syncing...' : 'Import Default'}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="premium-card bg-white/[0.06]">
          <h3 className="text-2xl font-black">{editing ? 'Edit' : 'Add New'} Experience</h3>
          <div className="mt-6 grid gap-4">
            <input className="admin-input" placeholder="Title / Position" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            <input className="admin-input" placeholder="Company / Institution" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
            <select className="admin-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="Work">Work</option>
              <option value="Education">Education</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Volunteering">Volunteering</option>
            </select>
            <input className="admin-input" placeholder="Period (e.g., 2023 - Present)" value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} />
            <textarea className="admin-input min-h-24" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <div className="flex gap-3">
              {editing ? (
                <>
                  <button className="button-primary" onClick={handleUpdate}><RotateCcw size={16} />Update</button>
                  <button className="button-ghost" onClick={() => { setEditing(null); setForm({ title: '', company: '', type: 'Work', period: '', description: '' }); }}>Cancel</button>
                </>
              ) : (
                <button className="button-primary" onClick={handleCreate}><Plus size={16} />Add Experience</button>
              )}
            </div>
          </div>
        </section>

        <section className="premium-card bg-white/[0.06]">
          <div className="flex items-center gap-3">
            <Search className="text-white/50" size={18} />
            <input className="admin-input" placeholder="Search experiences..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="mt-5 space-y-3">
            {loading ? <p className="text-white/50 text-center py-8">Loading...</p> : filtered.length === 0 ? (
              <p className="text-white/50 text-center py-8">No experiences. Click "Import Default" to add.</p>
            ) : filtered.map(exp => (
              <div key={exp.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <div className="font-bold">{exp.title}</div>
                  <div className="text-sm text-white/50">{exp.company} • {exp.period}</div>
                  <div className="text-xs text-plasma">{exp.type}</div>
                </div>
                <div className="flex gap-2">
                  <button className="button-ghost py-2" onClick={() => { setEditing(exp.id); setForm(exp); }}>Edit</button>
                  <button className="button-ghost py-2 text-red-200" onClick={() => handleDelete(exp.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}