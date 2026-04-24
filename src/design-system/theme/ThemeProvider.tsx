import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { colorRoles, darkModeColorRoles, tokens } from '../tokens';

export type ThemeName = 'light' | 'dark';

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  tokens: typeof tokens;
  colorRoles: typeof colorRoles;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const applyThemeVars = (theme: ThemeName) => {
  const roles = theme === 'dark' ? darkModeColorRoles : colorRoles;
  const root = document.documentElement;

  for (const [key, value] of Object.entries(roles.background)) {
    root.style.setProperty(`--bg-${key}`, value);
  }
  for (const [key, value] of Object.entries(roles.content)) {
    root.style.setProperty(`--content-${key}`, value);
  }
  for (const [key, value] of Object.entries(roles.border)) {
    root.style.setProperty(`--border-${key}`, value);
  }
  root.setAttribute('data-theme', theme);
};

export const ThemeProvider: React.FC<{ initialTheme?: ThemeName; children: React.ReactNode }> = ({
  initialTheme = 'light',
  children,
}) => {
  const [theme, setTheme] = useState<ThemeName>(initialTheme);

  useEffect(() => {
    applyThemeVars(theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      tokens,
      colorRoles: theme === 'dark' ? darkModeColorRoles : colorRoles,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};
