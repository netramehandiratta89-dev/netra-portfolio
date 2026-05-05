import { ArrowRight, Github, Linkedin, MapPin, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { githubConfig } from '../../github/githubService.js';
import { profile } from '../../utils/constants.js';

export default function Hero() {
  return (
    <section id="hero" className="aurora noise relative min-h-screen overflow-hidden pt-28">
      <div className="absolute left-1/2 top-24 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-plasma/10" />
      <div className="spin-slow absolute left-[58%] top-20 h-[520px] w-[520px] rounded-full border border-dashed border-champagne/20" />
      <div className="section grid min-h-[calc(100vh-7rem)] items-center gap-12 lg:grid-cols-[1.03fr_.97fr]">
        <motion.div initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="eyebrow"><Sparkles size={14} /> Student Developer Portfolio</div>
          <h1 className="max-w-5xl text-5xl font-black leading-[1.02] text-zinc-950 dark:text-white sm:text-7xl lg:text-8xl">
            {profile.name}
            <span className="typing block bg-gradient-to-r from-plasma via-white to-champagne bg-clip-text text-transparent">{profile.role}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-bold text-zinc-600 dark:text-zinc-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur"><MapPin size={16} className="text-plasma" />{profile.location}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">BCA 2025 - 2028</span>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="button-primary">View Projects <ArrowRight size={18} /></a>
            <a href={githubConfig.profileUrl} target="_blank" rel="noreferrer" className="button-ghost"><Github size={18} />GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="button-ghost"><Linkedin size={18} />LinkedIn</a>
          </div>
        </motion.div>
        <motion.div className="parallax-soft relative mx-auto aspect-square w-full max-w-[540px]" initial={{ opacity: 0, scale: 0.86, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.15 }}>
          <div className="absolute inset-8 rounded-full bg-plasma/20 blur-3xl" />
          <div className="float-slow absolute -left-4 top-16 z-10 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold backdrop-blur">6 Public Repos</div>
          <div className="float-fast absolute bottom-12 right-0 z-10 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold backdrop-blur">12 LinkedIn Highlights</div>
          <div className="relative grid h-full place-items-center overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-br from-white/25 via-white/5 to-plasma/20 shadow-luxury backdrop-blur-xl">
            <div className="scanline absolute inset-0 opacity-50" />
            <img className="relative h-72 w-72 rounded-full object-cover shadow-glow ring-8 ring-white/10" src={profile.avatar || '/assets/profile.png'} alt={`${profile.name} profile portrait`} />
            <div className="absolute bottom-8 left-8 right-8 rounded-lg border border-white/10 bg-ink/80 p-4 text-left text-white shadow-glow backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-plasma"><Terminal size={14} />Profile Build</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4"><span className="text-white/50">focus</span><span>React + AI Learning</span></div>
                <div className="flex justify-between gap-4"><span className="text-white/50">community</span><span>BVIMR + Geek Room</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
