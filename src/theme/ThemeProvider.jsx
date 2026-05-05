import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [isDark, theme]);

  const value = useMemo(() => ({ theme, isDark, toggleTheme: () => setTheme(isDark ? 'light' : 'dark') }), [isDark, theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
