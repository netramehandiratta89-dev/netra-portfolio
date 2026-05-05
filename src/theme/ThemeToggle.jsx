import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider.jsx';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const Icon = isDark ? Sun : Moon;
  return (
    <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
      <Icon size={18} />
    </button>
  );
}
