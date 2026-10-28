"use client";

import * as React from "react";

export function SiteFooter() {
  return (
    <footer
      className="bg-ink-grain pt-14 pb-10 px-5 md:px-8"
      style={{
        color: "var(--paper)",
        borderTop: "1px solid rgba(184, 145, 63, 0.2)",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          {/* wordmark + nonfiction note */}
          <div className="md:col-span-5">
            <div
              className="label-mono"
              style={{ color: "var(--brass)", letterSpacing: "0.16em" }}
            >
              V. L. Evans
            </div>
            <p
              className="body-text mt-4"
              style={{
                color: "var(--paper)",
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

          {/* sitemap */}
          <nav className="md:col-span-3" aria-label="Footer">
            <div
              className="label-mono-sm mb-4"
              style={{ color: "var(--brass)" }}
            >
              Sitemap
            </div>
            <ul className="space-y-2">
              {[
                ["#author", "The Author"],
                ["#book", "The Book"],
                ["#record", "The Record"],
                ["#timeline", "Timeline"],
                ["#family", "Family"],
                ["#system", "System"],
                ["#demands", "The Six Demands"],
                ["#inside", "Read Inside"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="link-draw label-mono-sm"
                    style={{
                      color: "var(--paper)",
                      opacity: 0.78,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
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
                color: "var(--paper)",
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
                  style={{ color: "var(--mist)", fontSize: "0.82rem" }}
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
                  style={{ color: "var(--mist)", fontSize: "0.82rem" }}
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
          style={{ borderTop: "1px solid rgba(184, 145, 63, 0.15)" }}
        >
          <p className="label-mono-sm" style={{ color: "var(--mist)" }}>
            © 2025 Victor L. Evans · All rights reserved
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href="mailto:contact@victorlevans.com"
              className="label-mono-sm link-draw"
              style={{ color: "var(--mist)" }}
            >
              Press
            </a>
            <a
              href="#contact"
              className="label-mono-sm link-draw"
              style={{ color: "var(--mist)" }}
            >
              Contact
            </a>
            <a
              href="/sitemap.xml"
              className="label-mono-sm link-draw"
              style={{ color: "var(--mist)" }}
            >
              Sitemap
            </a>
            <a
              href="/robots.txt"
              className="label-mono-sm link-draw"
              style={{ color: "var(--mist)" }}
            >
              Robots
            </a>
          </div>
        </div>

        {/* open-items footer note — only shown in non-production builds
            so it doesn't ship to end users. Maintained internally by the owner. */}
        {process.env.NODE_ENV !== "production" && (
          <p
            className="label-mono-sm mt-6"
            style={{ color: "var(--mist)", fontSize: "0.6rem", lineHeight: 1.7 }}
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
