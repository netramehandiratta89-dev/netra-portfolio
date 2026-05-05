import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let frame = 0;
    const particles = Array.from({ length: 72 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + 0.4, s: Math.random() * 0.35 + 0.1 }));
    const resize = () => {
      width = canvas.width = window.innerWidth * devicePixelRatio;
      height = canvas.height = window.innerHeight * devicePixelRatio;
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.y = (p.y + p.s / 1600) % 1;
        const x = p.x * width + Math.sin(frame / 80 + i) * 18;
        const y = p.y * height;
        ctx.beginPath();
        ctx.fillStyle = i % 3 === 0 ? 'rgba(25,211,218,.55)' : 'rgba(255,255,255,.32)';
        ctx.arc(x, y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true" />;
}
