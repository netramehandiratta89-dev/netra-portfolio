import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSkills } from '../../database/useSkills';
import Reveal from '../UI/Reveal.jsx';

export default function Skills() {
  const [filter, setFilter] = useState('All');
  const { skills, loading, categories } = useSkills();
  const filtered = filter === 'All' ? skills : skills.filter((s) => s.category === filter);
  const allCategories = ['All', ...categories];

  return (
    <section id="skills" className="section">
      <Reveal>
        <span className="eyebrow">{loading ? 'Loading Skills...' : 'Skills'}</span>
        <h2 className="headline">A sharp blend of engineering, design systems, and motion craft.</h2>
      </Reveal>
      <div className="mt-6 flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} className={`button-ghost py-1 px-3 text-sm ${filter === cat ? 'button-primary' : ''}`}>{cat}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filtered.map((skill) => (
          <Reveal key={skill.id} className="premium-card">
            <div className="mb-3 flex items-center justify-between font-bold"><span>{skill.name}</span><span className="text-plasma">{skill.level}%</span></div>
            <div className="h-3 overflow-hidden rounded-full bg-zinc-950/10 dark:bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-plasma to-champagne" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
