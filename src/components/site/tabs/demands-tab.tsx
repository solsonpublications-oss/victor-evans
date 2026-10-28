"use client";

import * as React from "react";
import { DEMANDS } from "@/lib/book-data";

export function DemandsTab() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div>
      <p
        className="body-text measure mb-10"
        style={{ color: "var(--fg)", opacity: 0.8 }}
      >
        The book&apos;s closing requests, rendered as six numbered exhibit
        cards that expand on click. Each is grounded in documented fact and is
        within the authority of an existing institution to produce.
      </p>

      <div className="space-y-3">
        {DEMANDS.map((d, i) => {
          const isOpen = open === i;
          return (
            <div
              key={d.number}
              className="reveal exhibit-card"
              data-reveal-delay={Math.min(i * 60, 300)}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`demand-body-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left flex items-start gap-4 md:gap-6"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <span
                  className="display"
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    color: "var(--brick)",
                    lineHeight: 1,
                    minWidth: "2.5rem",
                  }}
                >
                  {d.number}
                </span>
                <span className="flex-1">
                  <span
                    className="display"
                    style={{
                      display: "block",
                      fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                      color: "var(--fg)",
                      lineHeight: 1.2,
                    }}
                  >
                    {d.title}
                  </span>
                  <span
                    className="body-text"
                    style={{
                      display: "block",
                      marginTop: "0.4rem",
                      color: "var(--fg)",
                      opacity: 0.7,
                      fontSize: "0.92rem",
                    }}
                  >
                    {d.short}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="label-mono-sm"
                  style={{
                    color: "var(--brick)",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 250ms ease",
                    marginTop: "0.4rem",
                  }}
                >
                  +
                </span>
              </button>

              {/* expandable body — grid-template-rows trick for smooth height */}
              <div
                id={`demand-body-${i}`}
                className="grid transition-all"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transitionDuration: "400ms",
                  transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className="pt-5 mt-5 pl-0 md:pl-[4.5rem]"
                    style={{ borderTop: "1px solid var(--line)" }}
                  >
                    <p
                      className="body-text"
                      style={{ color: "var(--fg)", opacity: 0.88 }}
                    >
                      {d.body}
                    </p>
                    <div
                      className="label-mono-sm mt-4"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Authority: <span style={{ color: "var(--brick)" }}>{d.authority}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* What you can do */}
      <div
        className="reveal mt-10 p-6"
        style={{
          background: "var(--bg-3)",
          border: "1px solid var(--line)",
        }}
      >
        <div className="label-mono-sm mb-3" style={{ color: "var(--brick)" }}>
          What you can do
        </div>
        <ul className="space-y-2 body-text" style={{ color: "var(--fg)" }}>
          <li>
            <span style={{ color: "var(--brick)" }}>—</span> Read the record and share it
            with someone who has the authority to act.
          </li>
          <li>
            <span style={{ color: "var(--brick)" }}>—</span> Contact your representative.
            The author has addressed his petition to Representative Jasmine Crockett
            and, through her office, to the relevant federal and D.C. agencies.
          </li>
          <li>
            <span style={{ color: "var(--brick)" }}>—</span> Request a review copy of the
            book — placeholder link pending the author&apos;s preferred contact method.
          </li>
        </ul>
        <p
          className="label-mono-sm mt-4"
          style={{ color: "var(--fg-muted)", fontSize: "0.6rem" }}
        >
          Any item not in the manuscript is marked as a placeholder pending the
          author&apos;s confirmation.
        </p>
      </div>
    </div>
  );
}
