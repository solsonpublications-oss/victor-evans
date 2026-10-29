"use client";

import * as React from "react";
import { useView } from "./view-provider";

export function NotFoundView() {
  const { setView } = useView();
  return (
    <section
      className="storm-section min-h-[80vh] flex items-center justify-center px-4 sm:px-5 md:px-8 pt-20 pb-16"
      aria-label="Page not found"
    >
      <div className="max-w-[640px] text-center">
        {/* Empty doorway — line art */}
        <svg
          viewBox="0 0 240 320"
          className="mx-auto mb-8"
          style={{
            width: "min(60vw, 240px)",
            height: "auto",
            color: "var(--gold)",
          }}
          fill="none"
          aria-hidden="true"
        >
          {/* door frame */}
          <rect
            x="50"
            y="40"
            width="140"
            height="260"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* door jamb inner */}
          <rect
            x="62"
            y="52"
            width="116"
            height="236"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.3"
          />
          {/* doorknob */}
          <circle cx="168" cy="170" r="2.5" fill="currentColor" opacity="0.7" />
          {/* threshold */}
          <line
            x1="40"
            y1="300"
            x2="200"
            y2="300"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* warm light spilling out from under the door */}
          <polygon
            points="62,300 178,300 200,320 40,320"
            fill="var(--gold)"
            opacity="0.08"
          />
        </svg>

        <p
          className="label-mono-sm mb-4"
          style={{ color: "var(--gold)" }}
        >
          § 404 — Off the record
        </p>

        <h1
          className="display text-balance"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "var(--on-dark)",
          }}
        >
          This page isn&apos;t on the record.
        </h1>

        <p
          className="lede mt-5"
          style={{ color: "var(--on-dark)", opacity: 0.75 }}
        >
          The page you were looking for is not part of this site. The walls
          remember. The doorway is empty. Return to the record.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-brick"
            onClick={() => setView("home")}
          >
            Back to the record
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => setView("record")}
          >
            Open the file
          </button>
        </div>
      </div>
    </section>
  );
}
