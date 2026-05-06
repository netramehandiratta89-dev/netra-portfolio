import { ExternalLink, Github, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useProjects } from '../../database/useProjects';
import Reveal from '../UI/Reveal.jsx';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { projects, loading, tags } = useProjects();
  const filters = useMemo(() => ['All', ...tags], [tags]);
  const visible = filter === 'All' ? projects : projects.filter((p) => p.tag === filter);
  const cyclicIndex = visible.length > 0 ? currentIndex % visible.length : 0;
  const cyclicProject = visible[cyclicIndex];

  useEffect(() => {
    if (!autoPlay || visible.length === 0) return;
    const interval = setInterval(() => setCurrentIndex((i) => (i + 1) % visible.length), 5000);
    return () => clearInterval(interval);
  }, [autoPlay, visible.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const nextSlide = () => setCurrentIndex((i) => (i + 1) % visible.length);
  const prevSlide = () => setCurrentIndex((i) => (i - 1 + visible.length) % visible.length);
  return (
    <section id="projects" className="section">
      <Reveal>
        <span className="eyebrow">{loading ? 'Syncing Projects...' : 'Live Projects'}</span>
        <h2 className="headline">Real repositories, live links, and premium previews pulled from your GitHub.</h2>
      </Reveal>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {filters.map((item) => <button key={item} onClick={() => { setFilter(item); setCurrentIndex(0); }} className={filter === item ? 'button-primary py-2' : 'button-ghost py-2'}>{item}</button>)}
        <button onClick={() => setAutoPlay(!autoPlay)} className="button-ghost ml-auto flex items-center gap-2 py-2">
          {autoPlay ? <Pause size={14} /> : <Play size={14} />}
          {autoPlay ? 'Pause' : 'Auto'}
        </button>
      </div>
      {autoPlay && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button onClick={prevSlide} className="button-ghost p-3" aria-label="Previous"><ChevronLeft size={20} /></button>
          <div className="flex gap-2">
            {visible.map((_, idx) => <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-2 w-2 rounded-full transition ${idx === cyclicIndex ? 'bg-plasma' : 'bg-white/20'}`} aria-label={`Go to slide ${idx + 1}`} />)}
          </div>
          <button onClick={nextSlide} className="button-ghost p-3" aria-label="Next"><ChevronRight size={20} /></button>
        </div>
      )}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {autoPlay ? (
          cyclicProject && (
            <Reveal key={cyclicProject.title} className="premium-card group overflow-hidden p-0 md:col-span-2">
              <div className="relative h-80 overflow-hidden">
                <img src={cyclicProject.image} alt={`${cyclicProject.title} preview`} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-ink/55 px-4 py-3 text-white backdrop-blur-xl transition duration-500 group-hover:border-plasma/50 group-hover:bg-ink/75">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-plasma">Preview</div>
                    <div className="text-sm font-bold">{cyclicProject.title}</div>
                  </div>
                  <ExternalLink size={18} className="text-champagne" />
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 text-sm font-bold text-plasma">{cyclicProject.tag}</div>
                <h3 className="text-2xl font-black">{cyclicProject.title}</h3>
                <p className="muted mt-2">{cyclicProject.stack}</p>
                {cyclicProject.description && <p className="muted mt-3 line-clamp-2">{cyclicProject.description}</p>}
                <div className="mt-5 flex gap-3">
                  <a className="button-ghost py-2" href={cyclicProject.github} target="_blank" rel="noreferrer"><Github size={16} />Code</a>
                  <a className="button-primary py-2" href={cyclicProject.live} target="_blank" rel="noreferrer">Live <ExternalLink size={16} /></a>
                </div>
              </div>
            </Reveal>
          )
        ) : (
          visible.map((project) => (
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
