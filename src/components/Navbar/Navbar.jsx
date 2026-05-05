import { Download, Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import ThemeToggle from '../../theme/ThemeToggle.jsx';
import { profile } from '../../utils/constants.js';

const links = ['About', 'Skills', 'Projects', 'Experience', 'Blog', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 80], ['rgba(8,9,15,0)', 'rgba(8,9,15,0.78)']);
  return (
    <motion.header style={{ background }} className="fixed left-0 right-0 top-0 z-40 border-b border-white/0 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#hero" className="text-lg font-black text-zinc-950 dark:text-white">{profile.name.split(' ')[0]}<span className="text-plasma">.</span></a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-semibold text-zinc-700 transition hover:text-plasma dark:text-zinc-300">{link}</a>)}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a className="button-primary py-2.5" href="/resume.pdf" download><Download size={16} />Resume</a>
        </div>
        <button className="icon-button md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="mx-5 mb-4 rounded-lg border border-white/10 bg-ink/95 p-4 md:hidden">
          {links.map((link) => <a key={link} onClick={() => setOpen(false)} href={`#${link.toLowerCase()}`} className="block py-3 text-sm font-semibold text-white">{link}</a>)}
        </div>
      )}
    </motion.header>
  );
}
