"use client";

import * as React from "react";
import { useHeaderScrolled } from "./hooks/motion";
import { useView, type ViewId } from "./view-provider";
import { useGetBookModal } from "./get-book-modal";
import { ThemeToggle } from "./theme-toggle";

const NAV: { view: ViewId; label: string }[] = [
  { view: "home", label: "Home" },
  { view: "home", label: "The Author" }, // home view has it
  { view: "home", label: "The Book" },
  { view: "record", label: "The Record" },
  { view: "contact", label: "Contact" },
];

// We split NAV into anchor-nav (scrolls within home) and view-nav (switches view).
const VIEW_NAV: { view: ViewId; label: string }[] = [
  { view: "record", label: "The Record" },
  { view: "contact", label: "Contact" },
];

export function SiteHeader() {
  const scrolled = useHeaderScrolled(40);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { view, setView } = useView();
  const { open: openGetBook } = useGetBookModal();

  const onHome = view === "home";

  const headerStyle: React.CSSProperties = {
    backgroundColor: scrolled
      ? "var(--header-bg-scrolled)"
      : onHome
      ? "transparent"
      : "var(--header-bg)",
    backdropFilter: scrolled ? "blur(12px) saturate(140%)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(12px) saturate(140%)" : "none",
    borderBottom: scrolled
      ? "1px solid var(--line-strong)"
      : "1px solid transparent",
    transition:
      "background-color 250ms ease, backdrop-filter 250ms ease, border-color 250ms ease",
  };

  const wordmarkColor = onHome && !scrolled ? "var(--on-dark)" : "var(--text)";
  const navColor = onHome && !scrolled ? "var(--on-dark)" : "var(--text)";

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={headerStyle}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 h-14 md:h-16 flex items-center justify-between gap-2">
        {/* wordmark */}
        <button
          type="button"
          onClick={() => setView("home")}
          className="label-mono"
          style={{ color: wordmarkColor, transition: "color 250ms ease", cursor: "pointer" }}
          aria-label="Go to home"
        >
          V. L. Evans
        </button>

        {/* desktop nav */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7"
          aria-label="Primary"
        >
          {onHome && (
            <>
              <a
                href="#author"
                className="nav-link"
                style={{ color: navColor }}
              >
                The Author
              </a>
              <a
                href="#book"
                className="nav-link"
                style={{ color: navColor }}
              >
                The Book
              </a>
            </>
          )}
          {VIEW_NAV.map((item) => (
            <button
              key={item.view}
              type="button"
              onClick={() => setView(item.view)}
              className="nav-link"
              data-active={view === item.view}
              style={{ color: navColor }}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={openGetBook}
            className="btn btn-outline-light"
            style={{
              fontSize: "0.7rem",
              padding: "0.6rem 1rem",
              color: onHome && !scrolled ? "var(--on-dark)" : "var(--text)",
              borderColor: onHome && !scrolled
                ? "color-mix(in srgb, var(--on-dark) 55%, transparent)"
                : "var(--line-strong)",
            }}
          >
            Get the Book
          </button>
          <ThemeToggle inDarkContext={onHome && !scrolled} />
        </nav>

        {/* mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle inDarkContext={onHome && !scrolled} />
          <button
            type="button"
            className="label-mono-sm md:hidden"
            style={{ color: navColor }}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden"
          style={{
            backgroundColor: "var(--header-bg-scrolled)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <nav
            className="px-4 sm:px-5 py-4 flex flex-col gap-1"
            aria-label="Mobile primary"
          >
            {onHome && (
              <>
                <a
                  href="#author"
                  className="label-mono py-2.5 nav-link"
                  style={{ color: "var(--text)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  The Author
                </a>
                <a
                  href="#book"
                  className="label-mono py-2.5 nav-link"
                  style={{ color: "var(--text)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  The Book
                </a>
              </>
            )}
            {VIEW_NAV.map((item) => (
              <button
                key={item.view}
                type="button"
                className="label-mono py-2.5 nav-link text-left"
                data-active={view === item.view}
                style={{ color: "var(--text)" }}
                onClick={() => {
                  setView(item.view);
                  setMobileOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                openGetBook();
                setMobileOpen(false);
              }}
              className="btn btn-brick mt-2"
              style={{ fontSize: "0.7rem" }}
            >
              Get the Book
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
