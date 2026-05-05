import { profile } from '../../utils/constants.js';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-black">Netra<span className="text-plasma">.</span></p>
        <div className="flex flex-wrap gap-4">
          {profile.socials.map(([item, href]) => <a className="muted text-sm font-semibold hover:text-plasma" href={href} target="_blank" rel="noreferrer" key={item}>{item}</a>)}
        </div>
      </div>
    </footer>
  );
}
