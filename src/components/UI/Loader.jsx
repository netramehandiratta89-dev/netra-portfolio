import { motion } from 'framer-motion';

export default function Loader({ done }) {
  if (done) return null;
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-ink" exit={{ opacity: 0 }}>
      <div className="text-center">
        <motion.div className="mx-auto mb-5 h-16 w-16 rounded-full border border-plasma/40 border-t-plasma" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }} />
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-white/70">Initializing Portfolio</p>
      </div>
    </motion.div>
  );
}
