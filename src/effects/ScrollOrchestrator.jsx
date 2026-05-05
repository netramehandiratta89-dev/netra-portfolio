import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollOrchestrator() {
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray('.premium-card').forEach((card) => {
        gsap.fromTo(card, { y: 34, opacity: 0.82 }, {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'top 62%',
            scrub: 0.8
          }
        });
      });

      gsap.utils.toArray('.parallax-soft').forEach((item) => {
        gsap.to(item, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
