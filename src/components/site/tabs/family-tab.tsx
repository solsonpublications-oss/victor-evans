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
              {/* In Memoriam Candle Flame on Hover */}
              <div
                aria-hidden="true"
                className="absolute top-3 right-4 pointer-events-none flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-75"
              >
                {/* Flame Halo Glow */}
                <div
                  className="absolute -top-3 w-10 h-10 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(246, 196, 83, 0.5) 0%, rgba(255, 122, 69, 0.2) 50%, transparent 75%)",
                    filter: "blur(6px)",
                    animation: "candleBreathe 2s ease-in-out infinite",
                  }}
                />
                {/* Candle Teardrop Flame */}
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" className="relative z-10">
                  <line x1="7" y1="18" x2="7" y2="24" stroke="#888" strokeWidth="1.2" strokeLinecap="round" />
                  <path
                    d="M 7 1 C 5 7 2 11 2 15 C 2 18 4 20 7 20 C 10 20 12 18 12 15 C 12 11 9 7 7 1 Z"
                    fill="url(#candleFlameGrad)"
                    style={{ animation: "candleFlicker 1.6s ease-in-out infinite" }}
                  />
                  <ellipse cx="7" cy="16" rx="2" ry="3" fill="#FFF8E7" opacity="0.9" />
                  <defs>
                    <linearGradient id="candleFlameGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFF2A3" />
                      <stop offset="40%" stopColor="#F6C453" />
                      <stop offset="100%" stopColor="#C8553D" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

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
