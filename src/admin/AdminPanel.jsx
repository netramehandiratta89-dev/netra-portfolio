export default function AdminPanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
      <section className="premium-card bg-white/[0.06]">
        <h2 className="text-2xl font-black">Profile Information Management</h2>
        <div className="mt-6 grid gap-4">
          <input className="admin-input" defaultValue="Netra Mehandiratta" />
          <input className="admin-input" defaultValue="BCA Student | Emerging Developer" />
          <textarea className="admin-input min-h-28" defaultValue="I am a BCA student building foundations in programming, web development, and practical technology projects." />
          <button className="button-primary justify-self-start">Save Profile</button>
        </div>
      </section>
      <section className="premium-card bg-white/[0.06]">
        <h2 className="text-2xl font-black">SEO Meta Data</h2>
        <div className="mt-6 grid gap-4">
          <input className="admin-input" defaultValue="Netra Mehandiratta | Portfolio" />
          <textarea className="admin-input min-h-28" defaultValue="Portfolio of Netra Mehandiratta, BCA student and emerging developer from Delhi, India." />
          <button className="button-ghost justify-self-start">Preview Search Snippet</button>
        </div>
      </section>
    </div>
  );
}
