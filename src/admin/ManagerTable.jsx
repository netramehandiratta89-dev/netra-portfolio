import { Plus, Search, Upload } from 'lucide-react';

export default function ManagerTable({ title, fields, rows }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS Module</p>
          <h2 className="text-3xl font-black">{title}</h2>
        </div>
        <div className="flex gap-3">
          <button className="button-ghost py-2"><Upload size={16} />Upload</button>
          <button className="button-primary py-2"><Plus size={16} />New</button>
        </div>
      </div>
      <div className="premium-card bg-white/[0.06]">
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
          <Search size={18} className="text-white/40" />
          <input className="w-full bg-transparent text-sm outline-none" placeholder={`Search ${title.toLowerCase()}`} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-white/45">
              <tr>{fields.map((field) => <th key={field} className="border-b border-white/10 py-3">{field}</th>)}<th className="border-b border-white/10 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row} className="border-b border-white/5">
                  {fields.map((field, fieldIndex) => <td key={field} className="py-4">{fieldIndex === 0 ? row : fieldIndex === 1 ? 'Premium' : fieldIndex === 2 ? 'Ready' : index % 2 ? 'Draft' : 'Live'}</td>)}
                  <td className="py-4 text-plasma">Edit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
