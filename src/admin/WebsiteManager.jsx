import { Edit3, Eye, EyeOff, RotateCcw, Save, ShieldAlert, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useWebsiteControls } from '../hooks/useWebsiteControls.js';

export default function WebsiteManager() {
  const {
    sections,
    state,
    deleted,
    deleteSection,
    restoreSection,
    hideAll,
    restoreAll,
    resetEdits,
    saveSectionEdit
  } = useWebsiteControls();
  const [activeId, setActiveId] = useState(sections[0].id);
  const activeSection = sections.find((section) => section.id === activeId);
  const activeEdit = state.editedSections[activeId] || {};
  const [draft, setDraft] = useState(activeEdit);

  const openEditor = (id) => {
    setActiveId(id);
    setDraft(state.editedSections[id] || {});
  };

  const save = () => {
    saveSectionEdit(activeId, draft);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">Website CMS</p>
          <h2 className="text-3xl font-black">Access, Edit, Hide, and Restore Sections</h2>
          <p className="mt-2 text-sm text-white/50">Frontend controls are stored in localStorage and can be connected to a backend later.</p>
        </div>
        <a className="button-primary" href="/" target="_blank" rel="noreferrer"><Eye size={16} />Open Website</a>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_.85fr]">
        <section className="premium-card bg-white/[0.06]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="text-2xl font-black">Whole Website Sections</h3>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/60">{sections.length - deleted.size}/{sections.length} visible</span>
          </div>
          <div className="space-y-3">
            {sections.map((section) => {
              const isDeleted = deleted.has(section.id);
              return (
                <div key={section.id} className={`rounded-lg border p-4 transition ${isDeleted ? 'border-red-400/25 bg-red-500/10' : 'border-white/10 bg-white/5'}`}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-black">{section.label}</h4>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isDeleted ? 'bg-red-400/15 text-red-200' : 'bg-plasma/15 text-plasma'}`}>{isDeleted ? 'Hidden / Deleted' : 'Visible'}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/50">{section.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a className="button-ghost py-2" href={section.path} target="_blank" rel="noreferrer"><Eye size={15} />Access</a>
                      <button className="button-ghost py-2" onClick={() => openEditor(section.id)}><Edit3 size={15} />Edit</button>
                      {isDeleted ? (
                        <button className="button-primary py-2" onClick={() => restoreSection(section.id)}><RotateCcw size={15} />Restore</button>
                      ) : (
                        <button className="button-ghost py-2 text-red-200 hover:border-red-300 hover:text-red-200" onClick={() => deleteSection(section.id)}><Trash2 size={15} />Delete</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="premium-card bg-white/[0.06]">
            <h3 className="text-2xl font-black">Edit Section Content</h3>
            <p className="mt-2 text-sm text-white/50">Selected: {activeSection?.label}</p>
            <div className="mt-6 grid gap-4">
              <input className="admin-input" value={draft.title || ''} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Section title override" />
              <textarea className="admin-input min-h-28" value={draft.description || ''} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} placeholder="Section description / CMS notes" />
              <input className="admin-input" value={draft.cta || ''} onChange={(event) => setDraft((current) => ({ ...current, cta: event.target.value }))} placeholder="CTA text or admin note" />
              <button className="button-primary justify-self-start" onClick={save}><Save size={16} />Save Edit</button>
            </div>
          </section>

          <section className="premium-card border-red-400/20 bg-red-500/10">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 text-red-200" />
              <div>
                <h3 className="text-2xl font-black">Website Danger Zone</h3>
                <p className="mt-2 text-sm text-red-100/70">These controls affect the visible homepage in this browser preview.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <button className="button-ghost justify-center border-red-300/30 text-red-100 hover:border-red-200 hover:text-red-100" onClick={hideAll}><EyeOff size={16} />Hide All Optional Sections</button>
              <button className="button-primary justify-center" onClick={restoreAll}><RotateCcw size={16} />Restore Whole Website</button>
              <button className="button-ghost justify-center" onClick={resetEdits}><Trash2 size={16} />Clear Admin Overrides</button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
