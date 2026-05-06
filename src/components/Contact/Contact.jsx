import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { profile } from '../../utils/constants.js';
import { useContacts } from '../../database/useContacts';
import Reveal from '../UI/Reveal.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { submitContact } = useContacts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await submitContact(form);
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section">
      <Reveal>
        <span className="eyebrow">Contact</span>
        <h2 className="headline">Let us build something with taste, velocity, and staying power.</h2>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal className="premium-card">
          <div className="flex items-center gap-4"><Mail className="text-plasma" /><span className="font-bold">{profile.email}</span></div>
          <div className="mt-6 flex items-center gap-4"><MapPin className="text-champagne" /><span className="font-bold">{profile.location}</span></div>
        </Reveal>
        <Reveal className="premium-card">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input className="admin-input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="admin-input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <textarea className="admin-input min-h-36" placeholder="Project brief" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            <button className="button-primary justify-self-start" type="submit" disabled={sending}>
              {sending ? <Loader2 className="animate-spin" size={16} /> : <><Send size={16} /> {sent ? 'Sent!' : 'Send Message'}</>}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
