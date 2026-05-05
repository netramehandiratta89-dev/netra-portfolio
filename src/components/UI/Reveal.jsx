import { motion } from 'framer-motion';
import { slideUp } from '../../animations/slideUp.js';

export default function Reveal({ children, className = '' }) {
  return <motion.div className={className} variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>{children}</motion.div>;
}
