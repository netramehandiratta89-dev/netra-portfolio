import { motion } from 'framer-motion';
import Reveal from '../UI/Reveal.jsx';

const stats = [['6', 'Public Repos'], ['12', 'LinkedIn Highlights'], ['3', 'Certificates'], ['2025-28', 'BCA Journey']];

export default function Stats() {
  return (
    <section className="section">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <Reveal key={label} className="metric-card">
            <motion.div className="bg-gradient-to-r from-plasma to-champagne bg-clip-text text-4xl font-black text-transparent" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>{value}</motion.div>
            <div className="muted mt-2">{label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
