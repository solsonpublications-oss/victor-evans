"use client";

import * as React from "react";
import { useHeaderScrolled } from "./hooks/motion";

const NAV = [
  { href: "#author", label: "The Author" },
  { href: "#book", label: "The Book" },
  { href: "#record", label: "The Record" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const scrolled = useHeaderScrolled(40);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(20, 17, 15, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(184, 145, 63, 0.35)"
          : "1px solid transparent",
        transition:
          "background-color 250ms ease, backdrop-filter 250ms ease, border-color 250ms ease",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* wordmark */}
        <a
          href="#top"
          className="label-mono text-paper hover:text-brass-2 transition-colors"
          style={{ color: "var(--paper)" }}
          aria-label="Victor L. Evans — home"
        >
          V. L. Evans
        </a>

        {/* desktop nav */}
        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-mono-sm link-draw"
              style={{ color: "var(--paper)", opacity: 0.78 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.78")}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#book"
            className="btn btn-outline-paper"
            style={{ fontSize: "0.7rem" }}
          >
            Get the Book
          </a>
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          className="md:hidden label-mono-sm"
          style={{ color: "var(--paper)" }}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-ink-grain border-t border-[rgba(184,145,63,0.2)]"
        >
          <nav
            className="px-5 py-4 flex flex-col gap-3"
            aria-label="Mobile primary"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label-mono py-2"
                style={{ color: "var(--paper)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#book"
              className="btn btn-outline-paper mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Get the Book
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
