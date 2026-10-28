"use client";

import * as React from "react";

type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const ThemeContext = React.createContext<ThemeCtx>({
  theme: "light",
  toggle: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = "gcb-theme";

/**
 * Theme provider — defaults to light, persists to localStorage, respects
 * prefers-color-scheme on first visit if no stored preference. Applies the
 * `.dark` class to <html> synchronously to prevent flash of wrong theme.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light");

  // Initial sync — runs once on mount
  React.useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null) as Theme | null;

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.style.colorScheme = initial;
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.style.colorScheme = t;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, t);
    }
  }, []);

  const toggle = React.useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  // Inline script — runs before paint to prevent theme flash.
  // Injected once into <head> via layout.
  const value = React.useMemo(
    () => ({ theme, toggle, setTheme }),
    [theme, toggle, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}

/**
 * The inline script that runs before paint to set the initial theme class.
 * Call this from layout.tsx — it must be a string so it can be injected via
 * dangerouslySetInnerHTML.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;
