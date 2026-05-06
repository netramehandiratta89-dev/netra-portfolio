import { motion } from 'framer-motion';
import { useStats } from '../../database/useStats';
import Reveal from '../UI/Reveal.jsx';

export default function Stats() {
  const { stats, loading } = useStats({ autoRefresh: 60000 });

  return (
    <section className="section">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Reveal key={stat.id} className="metric-card">
            <motion.div className="bg-gradient-to-r from-plasma to-champagne bg-clip-text text-4xl font-black text-transparent" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>{loading ? '...' : stat.value}</motion.div>
            <div className="muted mt-2">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
