import { ExternalLink, Linkedin } from 'lucide-react';
import { linkedInHighlights, profile } from '../../utils/constants.js';
import Reveal from '../UI/Reveal.jsx';

export default function LinkedInHighlights() {
  return (
    <section id="linkedin" className="section">
      <Reveal>
        <span className="eyebrow">LinkedIn Highlights</span>
        <h2 className="headline">Public milestones across hackathons, AI learning, leadership, and student communities.</h2>
      </Reveal>
      <div className="mt-8 flex flex-wrap gap-3">
        <a className="button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={17} /> Open LinkedIn Profile
        </a>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {linkedInHighlights.map((post) => (
          <Reveal key={post.url} className="premium-card flex min-h-72 flex-col">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="rounded-full border border-plasma/30 bg-plasma/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-plasma">{post.category}</span>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{post.date}</span>
            </div>
            <h3 className="text-2xl font-black">{post.title}</h3>
            <p className="muted mt-4 leading-7">{post.body}</p>
            <a className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-plasma" href={post.url} target="_blank" rel="noreferrer">
              View Post <ExternalLink size={15} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
