import { Check, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useContacts } from '../database/useContacts';

export default function ManageMessages() {
  const { contacts, loading, remove, markRead } = useContacts();
  const [search, setSearch] = useState('');

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS</p>
          <h2 className="text-3xl font-black">Contact Messages</h2>
        </div>
        <div className="text-sm text-white/50">{filtered.length} messages</div>
      </div>

      <section className="premium-card bg-white/[0.06]">
        <div className="flex items-center gap-3">
          <Search className="text-white/50" size={18} />
          <input className="admin-input" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="mt-5 space-y-3">
          {loading ? <p className="text-white/50">Loading...</p> : filtered.length === 0 ? (
            <p className="text-white/50 text-center py-8">No messages found</p>
          ) : filtered.map(msg => (
            <div key={msg.id} className={`rounded-lg border p-4 ${msg.read ? 'border-white/10 bg-white/5' : 'border-plasma/30 bg-plasma/10'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-bold">{msg.name}</div>
                    {!msg.read && <span className="rounded-full bg-plasma/20 px-2 py-0.5 text-xs font-bold text-plasma">New</span>}
                  </div>
                  <div className="text-sm text-white/50">{msg.email}</div>
                  <div className="mt-2 text-sm">{msg.message}</div>
                  <div className="mt-2 text-xs text-white/30">{msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}</div>
                </div>
                <div className="flex gap-2">
                  {!msg.read && (
                    <button className="button-ghost py-2" onClick={() => markRead(msg.id)}><Check size={15} />Mark Read</button>
                  )}
                  <button className="button-ghost py-2 text-red-200" onClick={() => remove(msg.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}