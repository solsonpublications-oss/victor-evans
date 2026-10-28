"use client";

import * as React from "react";
import { EXCERPTS, CONTENTS } from "@/lib/book-data";

export function ReadInsideTab() {
  const [openPart, setOpenPart] = React.useState<string | null>("Part One");

  return (
    <div className="grid lg:grid-cols-12 gap-10">
      {/* interactive table of contents */}
      <div className="lg:col-span-5">
        <div
          className="label-mono-sm mb-4"
          style={{ color: "var(--brick)" }}
        >
          Table of Contents
        </div>
        <div className="space-y-2">
          {CONTENTS.map((p) => {
            const isOpen = openPart === p.number;
            return (
              <div
                key={p.number}
                className="reveal"
                style={{
                  border: "1px solid var(--ink-15)",
                  background: "var(--paper-2)",
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`part-${p.number.replace(/\s+/g, "-")}`}
                  onClick={() => setOpenPart(isOpen ? null : p.number)}
                  className="w-full text-left p-4 flex items-baseline justify-between gap-3"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <span>
                    <span
                      className="label-mono-sm"
                      style={{ color: "var(--mist)", display: "block" }}
                    >
                      {p.number}
                    </span>
                    <span
                      className="display-italic"
                      style={{
                        color: "var(--ink)",
                        fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                      }}
                    >
                      {p.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="label-mono-sm"
                    style={{
                      color: "var(--brick)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 250ms ease",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`part-${p.number.replace(/\s+/g, "-")}`}
                  className="grid transition-all"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transitionDuration: "350ms",
                    transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <ul
                      className="px-4 pb-4 space-y-1.5"
                      style={{ fontSize: "0.92rem" }}
                    >
                      {p.chapters.map((c) => (
                        <li
                          key={c.n}
                          className="flex gap-3"
                          style={{ color: "var(--ink)", opacity: 0.85 }}
                        >
                          <span
                            className="label-mono-sm"
                            style={{ color: "var(--brick)", minWidth: "4.5rem" }}
                          >
                            {c.n}
                          </span>
                          <span className="body-text" style={{ fontSize: "0.92rem" }}>
                            {c.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* excerpts */}
      <div className="lg:col-span-7">
        <div
          className="label-mono-sm mb-4"
          style={{ color: "var(--brick)" }}
        >
          Three excerpts
        </div>
        <p
          className="body-text measure mb-8"
          style={{ color: "var(--ink)", opacity: 0.75, fontSize: "0.95rem" }}
        >
          Each under 150 words. Attributed by chapter. Sensitive passages and any
          profanity from the manuscript are not surfaced. Continue reading in the book.
        </p>

        <div className="space-y-6">
          {EXCERPTS.map((ex, i) => (
            <article
              key={ex.label}
              className="reveal exhibit-card"
              data-reveal-delay={i * 80}
            >
              <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
                <span className="label-mono-sm" style={{ color: "var(--brick)" }}>
                  {ex.label}
                </span>
                <span className="label-mono-sm" style={{ color: "var(--mist)" }}>
                  {ex.attribution}
                </span>
              </div>
              <div
                className="display-italic"
                style={{
                  fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                  color: "var(--ink)",
                  lineHeight: 1.55,
                  whiteSpace: "pre-line",
                }}
              >
                {ex.text}
              </div>
              <a
                href="#book"
                className="label-mono-sm link-draw mt-4 inline-block"
                style={{ color: "var(--brick)" }}
              >
                Continue reading in the book →
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
