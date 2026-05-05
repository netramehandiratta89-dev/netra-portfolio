import { motion } from 'framer-motion';
import { skills } from '../../utils/constants.js';
import Reveal from '../UI/Reveal.jsx';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <span className="eyebrow">Skills</span>
        <h2 className="headline">A sharp blend of engineering, design systems, and motion craft.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {skills.map(([name, value]) => (
          <Reveal key={name} className="premium-card">
            <div className="mb-3 flex items-center justify-between font-bold"><span>{name}</span><span className="text-plasma">{value}%</span></div>
            <div className="h-3 overflow-hidden rounded-full bg-zinc-950/10 dark:bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-plasma to-champagne" initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
