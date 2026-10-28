"use client";

import * as React from "react";
import { BookCoverArt, DiamondDivider } from "./illustrations";

const BEATS = [
  {
    label: "The House",
    title: "2905 Mills Avenue N.E.",
    body: "A brick row house in the Langdon neighborhood of Washington, D.C., across from Langdon Park. James William Evans Sr., a Navy veteran, worked at the Greyhound terminal. Carrie Viola Evans kept the house. Seven children. Two parents. One bathroom. The mortgage was paid. The lights stayed on. In Black Northeast Washington of that era, the book documents, that was an achievement that the parents understood and the children did not yet appreciate.",
  },
  {
    label: "The Net",
    title: "Undue influence. Isolation. A will under duress.",
    body: "A fire displaces the family. A neighbor offers shelter. A brother-in-law attorney drafts a will the author alleges disinherits six of Carrie Evans's seven children. The author documents a chain of legal instruments, a Power of Attorney, a second will — designed, he writes, to move the estate through a disabled woman who could not understand what she held. The isolation, he documents, was strategic. Every door he knocked on was already closed.",
  },
  {
    label: "The Reckoning",
    title: "Institutional failure. Six demands.",
    body: "The author wrote to the FBI, the Metropolitan Police Department, Adult Protective Services, the D.C. Attorney General, the D.C. Bar, the Department of Veterans Affairs, and the United States Congress. The responses range from silence to form letters to active dismissal. The book closes with six specific, documented, legally grounded requests — not aspirations, but demands — addressed to the institutions with the authority to act.",
  },
];

const DETAILS = [
  { k: "Title", v: "The Generational Curse Breaker" },
  {
    k: "Subtitle",
    v: "A Family's Battle Against Undue Influence, Systemic Neglect, and the Theft of Carrie Evans's Legacy",
  },
  { k: "Author", v: "Victor L. Evans" },
  { k: "Edition", v: "First Edition, 2025" },
  { k: "Length", v: "Approximately 51,000 words · 12 chapters across four parts" },
  { k: "Format", v: "Placeholder — confirm with author" },
  { k: "ISBN", v: "Placeholder — confirm with author" },
  { k: "Price", v: "Placeholder — confirm with author" },
];

export function AboutBook() {
  return (
    <section
      id="book"
      className="bg-ink-grain relative py-24 md:py-32 px-5 md:px-8"
      aria-label="About the book"
      style={{ color: "var(--paper)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-12 reveal">
          <span className="label-mono-sm text-brass">§ 02</span>
          <span className="label-mono-sm" style={{ color: "var(--mist)" }}>
            About the Book
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14">
          {/* sticky cover */}
          <div className="md:col-span-4">
            <div
              className="md:sticky md:top-24 reveal"
              style={{ aspectRatio: "2 / 3" }}
            >
              <BookCoverArt
                className="w-full h-full"
                // cover floats in already in hero; here just a soft hover
              />
            </div>
            <p
              className="label-mono-sm mt-4 reveal text-center md:text-left"
              style={{ color: "var(--mist)" }}
            >
              Cover art is a placeholder.
              <br />
              Swap one file to publish the real jacket.
            </p>
          </div>

          {/* description + details */}
          <div className="md:col-span-8">
            <h2
              className="display reveal text-balance"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                color: "var(--paper)",
              }}
              data-reveal-delay="80"
            >
              The House. The Net.
              <br />
              <span style={{ color: "var(--brass-2)" }}>The Reckoning.</span>
            </h2>

            <p
              className="lede reveal mt-6"
              style={{ color: "var(--paper)", opacity: 0.85, maxWidth: "55ch" }}
              data-reveal-delay="140"
            >
              A nonfiction account of one family&apos;s thirty-year fight
              against undue influence, systemic neglect, and the theft of
              Carrie Evans&apos;s legacy. The book ends with six formal demands
              for justice.
            </p>

            <div className="mt-10 space-y-7">
              {BEATS.map((beat, i) => (
                <div
                  key={beat.label}
                  className="reveal grid md:grid-cols-12 gap-4 md:gap-6"
                  data-reveal-delay={i * 100}
                >
                  <div className="md:col-span-3">
                    <div className="label-mono-sm" style={{ color: "var(--brass)" }}>
                      {String(i + 1).padStart(2, "0")} / {beat.label}
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <h3
                      className="display-italic"
                      style={{
                        fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
                        color: "var(--paper)",
                      }}
                    >
                      {beat.title}
                    </h3>
                    <p
                      className="body-text mt-3"
                      style={{ color: "var(--paper)", opacity: 0.82 }}
                    >
                      {beat.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* who it's for */}
            <div
              className="reveal mt-12 p-6"
              style={{
                border: "1px solid rgba(184, 145, 63, 0.25)",
                background: "rgba(30, 26, 23, 0.5)",
              }}
            >
              <div
                className="label-mono-sm mb-3"
                style={{ color: "var(--brass)" }}
              >
                Who the book is for
              </div>
              <p className="body-text" style={{ color: "var(--paper)", opacity: 0.85 }}>
                Families of people with developmental disabilities. Attorneys,
                social workers, judges, legislators, and law enforcement. Anyone
                who needs to understand what elder and disabled adult financial
                exploitation looks like when it happens slowly, behind closed
                doors, with paperwork that appears legitimate on its face. Anyone
                who believes the system works for vulnerable people.
              </p>
            </div>

            {/* book details card */}
            <div
              className="reveal mt-8 p-6"
              style={{
                background: "var(--paper)",
                color: "var(--ink)",
                border: "1px solid var(--ink-15)",
              }}
            >
              <div className="label-mono-sm mb-4" style={{ color: "var(--brick)" }}>
                Book details
              </div>
              <dl className="space-y-3">
                {DETAILS.map((d) => (
                  <div
                    key={d.k}
                    className="grid grid-cols-3 gap-3 text-sm"
                    style={{ borderBottom: "1px solid var(--ink-15)" }}
                  >
                    <dt className="label-mono-sm py-1" style={{ color: "var(--mist)" }}>
                      {d.k}
                    </dt>
                    <dd
                      className="col-span-2 py-1 body-text"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {d.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p
                className="label-mono-sm mt-4"
                style={{ color: "var(--mist)", fontSize: "0.6rem" }}
              >
                Items marked &ldquo;placeholder&rdquo; are pending the author&apos;s
                confirmation and will be filled in before launch.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#record" className="btn btn-brick">
                  Read the Record
                </a>
                <a href="#contact" className="btn btn-paper">
                  Request a review copy
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 reveal">
          <DiamondDivider />
        </div>
      </div>
    </section>
  );
}
