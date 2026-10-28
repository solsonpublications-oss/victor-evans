"use client";

import * as React from "react";
import { TIMELINE } from "@/lib/book-data";

export function TimelineTab() {
  return (
    <div>
      <p
        className="body-text measure mb-10"
        style={{ color: "var(--fg)", opacity: 0.8 }}
      >
        A vertical thread that fills with brass as you scroll. Each entry is an
        exhibit card with the date the manuscript cites and the chapter that
        contains it. Date ambiguities are flagged, not silently corrected.
      </p>

      <ol className="relative" style={{ paddingLeft: "2rem" }}>
        {/* the thread — absolute, fills with scroll progress */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0"
          style={{
            left: "0.35rem",
            width: "2px",
            background:
              "linear-gradient(to bottom, var(--brass) 0%, var(--brass) 100%)",
            opacity: 0.55,
          }}
        />

        {TIMELINE.map((ev, i) => (
          <li
            key={ev.title}
            className="reveal relative pb-9"
            data-reveal-delay={Math.min(i * 60, 300)}
          >
            {/* node on the thread */}
            <span
              aria-hidden="true"
              className="absolute"
              style={{
                left: "-1.65rem",
                top: "0.4rem",
                width: "12px",
                height: "12px",
                background: i === 0 ? "var(--brass)" : "var(--bg)",
                border: "2px solid var(--brass)",
                transform: "rotate(45deg)",
              }}
            />

            <article className="exhibit-card">
              <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                <span className="label-mono" style={{ color: "var(--brick)" }}>
                  {ev.date}
                </span>
                <span className="label-mono-sm" style={{ color: "var(--fg-muted)" }}>
                  {ev.chapter}
                </span>
              </div>
              <h3
                className="display-italic"
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                  color: "var(--fg)",
                }}
              >
                {ev.title}
              </h3>
              <p
                className="body-text mt-2"
                style={{ color: "var(--fg)", opacity: 0.85 }}
              >
                {ev.summary}
              </p>

              {ev.ambiguity && (
                <p
                  className="mt-3 p-3 label-mono-sm"
                  style={{
                    color: "var(--brick)",
                    background: "rgba(142, 59, 47, 0.06)",
                    borderLeft: "2px solid var(--brick)",
                    lineHeight: 1.6,
                  }}
                >
                  ⚠ Date ambiguity — {ev.ambiguity}
                </p>
              )}

              <a
                href="#inside"
                className="label-mono-sm link-draw mt-3 inline-block"
                style={{ color: "var(--brick)" }}
              >
                Read in {ev.chapter} →
              </a>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
