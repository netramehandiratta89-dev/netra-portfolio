import { BadgeCheck } from 'lucide-react';
import { useCertificates } from '../../database/useCertificates';
import Reveal from '../UI/Reveal.jsx';

export default function Certificates() {
  const { certificates, loading } = useCertificates();

  return (
    <section id="certificates" className="section">
      <Reveal>
        <span className="eyebrow">{loading ? 'Loading...' : 'Certificates'}</span>
        <h2 className="headline">Credentials presented as premium, animated proof points.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certificates.map((cert) => (
          <Reveal key={cert.id} className="premium-card">
            <BadgeCheck className="mb-8 text-champagne" />
            <h3 className="text-xl font-black">{cert.name}</h3>
            <p className="muted mt-3 text-sm">{cert.issuer} {cert.date && `- ${new Date(cert.date).getFullYear()}`}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
