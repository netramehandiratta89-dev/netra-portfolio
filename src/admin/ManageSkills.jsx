import { Github, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useSkills } from '../database/useSkills';
import { profile } from '../utils/constants';

const languageToCategory = {
  JavaScript: 'Frontend',
  TypeScript: 'Frontend',
  Python: 'AI',
  HTML: 'Frontend',
  CSS: 'Frontend',
  Java: 'Backend',
  C: 'Backend',
  'C#': 'Backend',
  Go: 'DevOps',
  Rust: 'Systems',
  Ruby: 'Backend',
  PHP: 'Backend',
  Swift: 'Mobile',
  Kotlin: 'Mobile',
  Dart: 'Mobile'
};

const defaultSkills = [
  { name: 'JavaScript', level: 80, category: 'Frontend' },
  { name: 'TypeScript', level: 75, category: 'Frontend' },
  { name: 'React', level: 70, category: 'Frontend' },
  { name: 'Python', level: 65, category: 'AI' },
  { name: 'C Programming', level: 60, category: 'Backend' },
  { name: 'HTML/CSS', level: 85, category: 'Frontend' },
  { name: 'Node.js', level: 55, category: 'Backend' },
  { name: 'Git', level: 70, category: 'Tools' },
  { name: 'Tailwind CSS', level: 75, category: 'Frontend' },
  { name: 'Problem Solving', level: 65, category: 'Skills' }
];

export default function ManageSkills() {
  const { skills, loading, create, update, remove, refresh } = useSkills();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [syncing, setSyncing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', level: 0, category: 'Frontend' });

  const filtered = skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) && (category === 'All' || s.category === category));
  const categories = [...new Set(skills.map(s => s.category))];

  const handleSyncDefaults = async () => {
    setSyncing(true);
    try {
      for (const skill of defaultSkills) {
        const exists = skills.find(s => s.name.toLowerCase() === skill.name.toLowerCase());
        if (!exists) {
          await create(skill);
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
    setForm({ name: '', level: 0, category: 'Frontend' });
  };

  const handleUpdate = async () => {
    if (!editing || !form.name) return;
    await update(editing, form);
    setEditing(null);
    setForm({ name: '', level: 0, category: 'Frontend' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS</p>
          <h2 className="text-3xl font-black">Manage Skills</h2>
        </div>
        <button className="button-primary" onClick={handleSyncDefaults} disabled={syncing}>
          {syncing ? 'Syncing...' : 'Import Default Skills'}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="premium-card bg-white/[0.06]">
          <h3 className="text-2xl font-black">{editing ? 'Edit' : 'Add New'} Skill</h3>
          <div className="mt-6 grid gap-4">
            <input className="admin-input" placeholder="Skill Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <div className="flex gap-3">
              <input className="admin-input flex-1" type="range" min="0" max="100" placeholder="Level" value={form.level} onChange={e => setForm(f => ({ ...f, level: parseInt(e.target.value) }))} />
              <span className="flex items-center font-bold text-plasma">{form.level}%</span>
            </div>
            <select className="admin-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {categories.length > 0 ? categories.map(c => <option key={c} value={c}>{c}</option>) : (
                <>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="AI">AI</option>
                  <option value="Tools">Tools</option>
                  <option value="Skills">Skills</option>
                </>
              )}
            </select>
            <div className="flex gap-3">
              {editing ? (
                <>
                  <button className="button-primary" onClick={handleUpdate}><RotateCcw size={16} />Update</button>
                  <button className="button-ghost" onClick={() => { setEditing(null); setForm({ name: '', level: 0, category: 'Frontend' }); }}>Cancel</button>
                </>
              ) : (
                <button className="button-primary" onClick={handleCreate}><Plus size={16} />Add Skill</button>
              )}
            </div>
          </div>
        </section>

        <section className="premium-card bg-white/[0.06]">
          <div className="flex items-center gap-3">
            <Search className="text-white/50" size={18} />
            <input className="admin-input" placeholder="Search skills..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {['All', ...categories].map(c => (
              <button key={c} className={`button-ghost py-1 px-3 ${category === c ? 'button-primary' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {loading ? <p className="text-white/50">Loading...</p> : filtered.map(skill => (
              <div key={skill.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <div className="font-bold">{skill.name}</div>
                  <div className="text-sm text-white/50">{skill.category} • {skill.level}%</div>
                </div>
                <div className="flex gap-2">
                  <button className="button-ghost py-2" onClick={() => { setEditing(skill.id); setForm(skill); }}>Edit</button>
                  <button className="button-ghost py-2 text-red-200" onClick={() => remove(skill.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}