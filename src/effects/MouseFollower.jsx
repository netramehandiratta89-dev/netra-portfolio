import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function MouseFollower() {
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const sx = useSpring(x, { stiffness: 240, damping: 30 });
  const sy = useSpring(y, { stiffness: 240, damping: 30 });
  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 16);
      y.set(event.clientY - 16);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);
  return <motion.div className="pointer-events-none fixed z-30 hidden h-8 w-8 rounded-full border border-plasma/70 mix-blend-difference md:block" style={{ x: sx, y: sy }} />;
}
