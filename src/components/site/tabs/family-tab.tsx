"use client";

import * as React from "react";
import { FAMILY } from "@/lib/book-data";

export function FamilyTab() {
  return (
    <div>
      <p
        className="body-text measure mb-10"
        style={{ color: "var(--text)", opacity: 0.8 }}
      >
        An In Memoriam wall. Dignified, quiet cards. Hover reveals a
        candle-like glow — not a gimmick. Phyllis&apos;s card is written with
        respect and without sensationalism. No photographs unless supplied and
        approved.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FAMILY.map((m, i) => (
          <article
            key={m.name}
            className="reveal group"
            data-reveal-delay={Math.min(i * 70, 350)}
          >
            <div
              className="h-full p-6 relative overflow-hidden"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--brick)",
                transition:
                  "border-color 350ms ease, transform 350ms ease, box-shadow 350ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px var(--gold), 0 8px 30px rgba(142, 59, 47, 0.12)";
                e.currentTarget.style.borderTopColor = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderTopColor = "var(--brick)";
              }}
            >
              {/* candle-like glow on hover */}
              <span
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                  top: "-12px",
                  right: "18px",
                  width: "8px",
                  height: "8px",
                  background: "var(--gold)",
                  borderRadius: "50%",
                  boxShadow: "0 0 12px 3px var(--gold), 0 0 22px 6px rgba(246, 196, 83, 0.45)",
                  opacity: 0,
                  transform: "scale(0.4)",
                  transition: "opacity 400ms ease, transform 400ms ease",
                }}
              />

              <h3
                className="display"
                style={{
                  fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
                  color: "var(--text)",
                  lineHeight: 1.2,
                }}
              >
                {m.name}
              </h3>

              {m.years && (
                <div
                  className="label-mono-sm mt-1"
                  style={{ color: "var(--brick)" }}
                >
                  {m.years}
                </div>
              )}

              <div
                className="label-mono-sm mt-3"
                style={{ color: "var(--text-dim)" }}
              >
                {m.role}
              </div>

              <div
                className="my-4"
                style={{
                  height: "1px",
                  background: "var(--line)",
                }}
              />

              <blockquote
                className="display-italic"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text)",
                  opacity: 0.85,
                  lineHeight: 1.55,
                }}
              >
                &ldquo;{m.line}&rdquo;
              </blockquote>

              <div
                className="label-mono-sm mt-4"
                style={{ color: "var(--text-dim)", opacity: 0.7 }}
              >
                {m.chapter}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p
        className="label-mono-sm mt-8"
        style={{ color: "var(--text-dim)" }}
      >
        Family members are named in full as an act of dignity. The author documents
        that Phyllis is a sister and a person — never a spectacle.
      </p>
    </div>
  );
}
