import { Award, Code2, Lightbulb } from 'lucide-react';
import Reveal from '../UI/Reveal.jsx';

const cards = [
  [Code2, 'Developer Foundations', 'Building practical skills across TypeScript, JavaScript, React, C programming, and data structures.'],
  [Lightbulb, 'Learning by Doing', 'Turning hackathons, AI sessions, and campus activities into portfolio-ready projects and proof of growth.'],
  [Award, 'Community Momentum', 'Growing through BVIMR initiatives, Buildathon coordination, volunteering, and student developer communities.']
];

export default function About() {
  return (
    <section id="about" className="section">
      <Reveal>
        <span className="eyebrow">About Me</span>
        <h2 className="headline">A student developer building momentum through code, community, and consistent learning.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map(([Icon, title, body]) => (
          <Reveal key={title} className="premium-card">
            <Icon className="mb-6 text-plasma" />
            <h3 className="text-xl font-black">{title}</h3>
            <p className="muted mt-3 leading-7">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
