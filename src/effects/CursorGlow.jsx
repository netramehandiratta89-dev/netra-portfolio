import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div className="pointer-events-none fixed z-20 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-plasma/10 blur-3xl" style={{ left: pos.x, top: pos.y }} />;
}
