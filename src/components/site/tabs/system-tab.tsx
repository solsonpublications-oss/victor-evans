"use client";

import * as React from "react";
import { INSTITUTIONS } from "@/lib/book-data";

const BALANCE = [
  { v: "30", l: "years" },
  { v: "1,000s", l: "of pages" },
  { v: "100s", l: "of letters" },
  { v: "Dozens", l: "of agencies" },
  { v: "0", l: "meaningful interventions" },
];

export function SystemTab() {
  return (
    <div>
      <p
        className="body-text measure mb-10"
        style={{ color: "var(--ink)", opacity: 0.8 }}
      >
        Deaf Ears and Blind Eyes. Each card states, in neutral language, what
        the author says he sent and what he says came back. Allegations are
        framed as the author&apos;s documented account, never as the site&apos;s
        own findings.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {INSTITUTIONS.map((inst, i) => (
          <article
            key={inst.name}
            className="reveal exhibit-card"
            data-reveal-delay={Math.min(i * 70, 350)}
          >
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <h3
                className="display"
                style={{
                  fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                  color: "var(--ink)",
                }}
              >
                {inst.name}
              </h3>
              <span className="label-mono-sm" style={{ color: "var(--mist)" }}>
                {inst.chapter}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div
                  className="label-mono-sm mb-1"
                  style={{ color: "var(--brick)" }}
                >
                  What the author says he sent
                </div>
                <p
                  className="body-text"
                  style={{ color: "var(--ink)", opacity: 0.85, fontSize: "0.92rem" }}
                >
                  {inst.sent}
                </p>
              </div>
              <div>
                <div
                  className="label-mono-sm mb-1"
                  style={{ color: "var(--brick)" }}
                >
                  What the author says came back
                </div>
                <p
                  className="body-text"
                  style={{ color: "var(--ink)", opacity: 0.85, fontSize: "0.92rem" }}
                >
                  {inst.received}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Balance sheet */}
      <div
        className="reveal mt-12 p-8 md:p-10 bg-ink-grain"
        style={{ color: "var(--paper)" }}
      >
        <div className="label-mono-sm mb-4" style={{ color: "var(--brass)" }}>
          The balance sheet
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-3">
          {BALANCE.map((b) => (
            <div key={b.l} className="text-center">
              <div
                className="display"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  color: "var(--brass-2)",
                  lineHeight: 1,
                }}
              >
                {b.v}
              </div>
              <div
                className="label-mono-sm mt-2"
                style={{ color: "var(--mist)" }}
              >
                {b.l}
              </div>
            </div>
          ))}
        </div>
        <p
          className="display-italic mt-6"
          style={{
            fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
            color: "var(--paper)",
            opacity: 0.85,
          }}
        >
          This book is the audit.
        </p>
      </div>
    </div>
  );
}
