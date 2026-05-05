import { Mail, MapPin, Send } from 'lucide-react';
import { profile } from '../../utils/constants.js';
import Reveal from '../UI/Reveal.jsx';

export default function Contact() {
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
          <form className="grid gap-4">
            <input className="admin-input" placeholder="Name" />
            <input className="admin-input" placeholder="Email" type="email" />
            <textarea className="admin-input min-h-36" placeholder="Project brief" />
            <button className="button-primary justify-self-start" type="button">Send Message <Send size={16} /></button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
