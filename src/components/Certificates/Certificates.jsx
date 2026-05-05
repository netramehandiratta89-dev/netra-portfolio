import { BadgeCheck } from 'lucide-react';
import { certificates } from '../../utils/constants.js';
import Reveal from '../UI/Reveal.jsx';

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <Reveal>
        <span className="eyebrow">Certificates</span>
        <h2 className="headline">Credentials presented as premium, animated proof points.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certificates.map((certificate) => (
          <Reveal key={certificate} className="premium-card">
            <BadgeCheck className="mb-8 text-champagne" />
            <h3 className="text-xl font-black">{certificate}</h3>
            <p className="muted mt-3 text-sm">Verified certificate card ready for CMS upload metadata.</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
