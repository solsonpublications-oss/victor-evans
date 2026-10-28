"use client";

import * as React from "react";
import { useView, type ViewId } from "./view-provider";

export function SiteFooter() {
  const { view, setView } = useView();

  const viewLinks: { view: ViewId; label: string }[] = [
    { view: "home", label: "Home" },
    { view: "record", label: "The Record" },
    { view: "contact", label: "Contact" },
    { view: "press", label: "Press" },
    { view: "privacy", label: "Privacy" },
  ];

  const anchorLinks =
    view === "home"
      ? [
          { href: "#author", label: "The Author" },
          { href: "#book", label: "The Book" },
        ]
      : [];

  return (
    <footer
      className="bg-bg-ink-grain pt-12 sm:pt-14 pb-8 sm:pb-10 px-4 sm:px-5 md:px-8"
      style={{
        color: "var(--on-ink)",
        borderTop: "1px solid var(--line-strong)",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          {/* wordmark + nonfiction note */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => setView("home")}
              className="label-mono"
              style={{
                color: "var(--brass)",
                letterSpacing: "0.16em",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
            >
              V. L. Evans
            </button>
            <p
              className="body-text mt-4"
              style={{
                color: "var(--on-ink)",
                opacity: 0.7,
                maxWidth: "38ch",
                fontSize: "0.9rem",
              }}
            >
              This is a work of nonfiction. The events described are true to
              the best of the author&apos;s knowledge and recollection,
              supported by legal documents, sworn affidavits, medical records,
              and official government correspondence referenced throughout the text.
            </p>
          </div>

          {/* sitemap — view nav */}
          <nav className="md:col-span-3" aria-label="Footer">
            <div
              className="label-mono-sm mb-4"
              style={{ color: "var(--brass)" }}
            >
              Sitemap
            </div>
            <ul className="space-y-2">
              {viewLinks.map((item) => (
                <li key={item.view}>
                  <button
                    type="button"
                    onClick={() => setView(item.view)}
                    className="nav-link"
                    data-active={view === item.view}
                    style={{ color: "var(--on-ink)", opacity: 0.78 }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {anchorLinks.length > 0 && (
                <li
                  className="mt-3 pt-3"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <div
                    className="label-mono-sm mb-2"
                    style={{ color: "var(--brass)", opacity: 0.6 }}
                  >
                    On this page
                  </div>
                  {anchorLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="nav-link block"
                      style={{ color: "var(--on-ink)", opacity: 0.78 }}
                    >
                      {item.label}
                    </a>
                  ))}
                </li>
              )}
            </ul>
          </nav>

          {/* care resources — sensitive content footer note */}
          <div className="md:col-span-4">
            <div
              className="label-mono-sm mb-4"
              style={{ color: "var(--brass)" }}
            >
              Care resources
            </div>
            <p
              className="body-text"
              style={{
                color: "var(--on-ink)",
                opacity: 0.78,
                fontSize: "0.9rem",
              }}
            >
              If you or someone you know is being exploited, neglected, or
              isolated, the following resources are available.
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://eldercare.acl.gov/Public/Index.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw label-mono-sm"
                  style={{ color: "var(--brass-2)" }}
                >
                  Eldercare Locator →
                </a>
                <p
                  className="body-text mt-1"
                  style={{ color: "var(--fg-muted)", fontSize: "0.82rem" }}
                >
                  A public service of the U.S. Administration on Aging.
                </p>
              </li>
              <li>
                <a
                  href="https://adultprotectiveservices.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw label-mono-sm"
                  style={{ color: "var(--brass-2)" }}
                >
                  Adult Protective Services →
                </a>
                <p
                  className="body-text mt-1"
                  style={{ color: "var(--fg-muted)", fontSize: "0.82rem" }}
                >
                  Find your state or local APS office. Verify current contact
                  details before relying on them.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div
          className="mt-10 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <p className="label-mono-sm" style={{ color: "var(--fg-muted)" }}>
            © 2025 Victor L. Evans · All rights reserved
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href="mailto:contact@victorlevans.com"
              className="link-draw label-mono-sm"
              style={{ color: "var(--fg-muted)" }}
            >
              Email
            </a>
            <button
              type="button"
              onClick={() => setView("press")}
              className="link-draw label-mono-sm"
              style={{
                color: "var(--fg-muted)",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Press
            </button>
            <button
              type="button"
              onClick={() => setView("privacy")}
              className="link-draw label-mono-sm"
              style={{
                color: "var(--fg-muted)",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Privacy
            </button>
            <a
              href="/sitemap.xml"
              className="link-draw label-mono-sm"
              style={{ color: "var(--fg-muted)" }}
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* open-items footer note — only shown in non-production builds */}
        {process.env.NODE_ENV !== "production" && (
          <p
            className="label-mono-sm mt-6"
            style={{ color: "var(--fg-muted)", fontSize: "0.6rem", lineHeight: 1.7 }}
          >
            Placeholders — cover art, author photograph, ISBN, price, retailer
            links, contact email — are flagged for the owner to confirm before
            launch. Recommendation: have an attorney review the final copy
            before launch. The site does not publish the author&apos;s home
            address or phone number found on the book&apos;s copyright page.
          </p>
        )}
      </div>
    </footer>
  );
}
