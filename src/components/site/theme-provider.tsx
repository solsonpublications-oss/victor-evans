"use client";

import * as React from "react";

type Theme = "storm" | "dawn";
type ThemeCtx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const ThemeContext = React.createContext<ThemeCtx>({
  theme: "storm",
  toggle: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = "gcb-theme";

/**
 * Theme provider — Storm (dark, default) and Dawn (light).
 * Dark is the :root default in CSS; light is activated by adding `.light` to <html>.
 * Uses View Transitions API for a circular reveal on toggle when supported.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("storm");

  React.useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null) as Theme | null;

    const prefersLight =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: light)").matches;

    const initial: Theme = stored ?? (prefersLight ? "dawn" : "storm");
    setThemeState(initial);
    document.documentElement.classList.toggle("light", initial === "dawn");
    document.documentElement.style.colorScheme = initial === "dawn" ? "light" : "dark";
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.classList.toggle("light", t === "dawn");
    document.documentElement.style.colorScheme = t === "dawn" ? "light" : "dark";
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, t);
    }
  }, []);

  const toggle = React.useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "storm" ? "dawn" : "storm";

      // Apply theme IMMEDIATELY — always, before any VT effect.
      // This ensures the theme switches even if VT API fails or isn't supported.
      document.documentElement.classList.toggle("light", next === "dawn");
      document.documentElement.style.colorScheme = next === "dawn" ? "light" : "dark";

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

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
 * Inline script — runs before paint to set the initial theme.
 * Dark (Storm) is the CSS :root default. We add `.light` only for Dawn.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored || (prefersLight ? 'dawn' : 'storm');
    if (theme === 'dawn') document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = theme === 'dawn' ? 'light' : 'dark';
  } catch (e) {}
})();
`;
