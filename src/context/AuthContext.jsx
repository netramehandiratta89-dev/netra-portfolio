import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('portfolio-admin') === 'true');
  const login = (email, password) => {
    const ok = email === 'admin@portfolio.dev' && password === 'premium123';
    if (ok) {
      localStorage.setItem('portfolio-admin', 'true');
      setIsAuthenticated(true);
    }
    return ok;
  };
  const logout = () => {
    localStorage.removeItem('portfolio-admin');
    setIsAuthenticated(false);
  };
  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
