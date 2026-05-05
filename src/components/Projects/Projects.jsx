import { ExternalLink, Github } from 'lucide-react';
import { useMemo, useState } from 'react';
import { fetchGitHubProjects } from '../../github/githubService.js';
import { useAsyncData } from '../../hooks/useAsyncData.js';
import { projects } from '../../utils/constants.js';
import Reveal from '../UI/Reveal.jsx';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const { data: liveProjects, loading, error } = useAsyncData(fetchGitHubProjects, projects);
  const filters = useMemo(() => ['All', ...new Set(liveProjects.map((project) => project.tag))], [liveProjects]);
  const visible = filter === 'All' ? liveProjects : liveProjects.filter((project) => project.tag === filter);
  return (
    <section id="projects" className="section">
      <Reveal>
        <span className="eyebrow">{loading ? 'Syncing GitHub' : error ? 'Fallback Projects' : 'Live GitHub Projects'}</span>
        <h2 className="headline">Real repositories, live links, and premium previews pulled from your GitHub.</h2>
      </Reveal>
      <div className="mt-8 flex flex-wrap gap-3">
        {filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'button-primary py-2' : 'button-ghost py-2'}>{item}</button>)}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {visible.map((project, index) => (
          <Reveal key={project.title} className="premium-card group overflow-hidden p-0">
            <div className="relative h-64 overflow-hidden">
              <img src={project.image} alt={`${project.title} preview`} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-ink/55 px-4 py-3 text-white backdrop-blur-xl transition duration-500 group-hover:border-plasma/50 group-hover:bg-ink/75">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-plasma">Preview</div>
                  <div className="text-sm font-bold">{project.title}</div>
                </div>
                <ExternalLink size={18} className="text-champagne" />
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2 text-sm font-bold text-plasma">{project.tag}</div>
              <h3 className="text-2xl font-black">{project.title}</h3>
              <p className="muted mt-2">{project.stack}</p>
              {project.description && <p className="muted mt-3 line-clamp-2">{project.description}</p>}
              <div className="mt-5 flex gap-3">
                <a className="button-ghost py-2" href={project.github} target="_blank" rel="noreferrer"><Github size={16} />Code</a>
                <a className="button-primary py-2" href={project.live} target="_blank" rel="noreferrer">Live <ExternalLink size={16} /></a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
