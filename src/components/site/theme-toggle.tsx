"use client";

import * as React from "react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ inDarkContext = false }: { inDarkContext?: boolean }) {
  const { theme, toggle } = useTheme();

  // If the toggle is rendered inside an "ink" section (which is dark in both
  // themes), we want the icon color to be the cream tone regardless of the
  // global theme. Otherwise, follow the global theme.
  const iconColor = inDarkContext ? "var(--on-ink)" : "var(--fg)";

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      style={{ color: iconColor, borderColor: inDarkContext ? "rgba(244, 236, 216, 0.35)" : "var(--line-strong)" }}
    >
      {theme === "light" ? (
        // Moon
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
