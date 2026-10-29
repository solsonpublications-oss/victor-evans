"use client";

import * as React from "react";
import { DiamondDivider } from "./illustrations";
import { useGetBookModal } from "./get-book-modal";
import { useView } from "./view-provider";

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
  { k: "Format", v: "Hardcover and digital — details pending" },
  { k: "ISBN", v: "Pending publication" },
  { k: "Price", v: "Pending publication" },
];

export function AboutBook() {
  const { open: openGetBook } = useGetBookModal();
  const { setView } = useView();

  return (
    <section
      id="book"
      className="storm-section relative py-16 sm:py-20 md:py-32 px-4 sm:px-5 md:px-8"
      aria-label="About the book"
      style={{ color: "var(--on-dark)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-8 sm:mb-12 reveal">
          <span className="label-mono-sm" style={{ color: "var(--gold)" }}>§ 02</span>
          <span className="label-mono-sm" style={{ color: "var(--text-dim)" }}>
            About the Book
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-14">
          {/* sticky cover */}
          <div className="md:col-span-4">
            <div
              className="md:sticky md:top-24 reveal hover-lift relative"
              style={{
                aspectRatio: "2 / 3",
                maxWidth: "360px",
                margin: "0 auto",
                transition: "transform 350ms cubic-bezier(0.2,0.7,0.2,1), filter 350ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.filter = "drop-shadow(0 30px 60px rgba(0,0,0,0.65))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.filter = "drop-shadow(0 20px 40px rgba(0,0,0,0.45))";
              }}
            >
              <picture>
                <img
                  src="/cover.jpg"
                  alt="The Generational Curse Breaker — book cover: a brick row house at dusk with a lit window, a broken chain on the front steps, and the silhouette of a white-haired figure in the storm clouds above."
                  width={1024}
                  height={1536}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </picture>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: "1px solid rgba(246, 196, 83, 0.25)",
                }}
                aria-hidden="true"
              />
            </div>
            {process.env.NODE_ENV !== "production" && (
              <p
                className="label-mono-sm mt-4 reveal text-center md:text-left"
                style={{ color: "var(--on-dark-dim)" }}
              >
                Final cover art.
              </p>
            )}
          </div>

          {/* description + details */}
          <div className="md:col-span-8">
            <h2
              className="display reveal text-balance"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.4rem)",
                color: "var(--on-dark)",
              }}
              data-reveal-delay="80"
            >
              The House. The Net.
              <br />
              <span style={{ color: "var(--gold-2)" }}>The Reckoning.</span>
            </h2>

            <p
              className="lede reveal mt-5 sm:mt-6"
              style={{ color: "var(--on-dark)", opacity: 0.92, maxWidth: "55ch" }}
              data-reveal-delay="140"
            >
              A nonfiction account of one family&apos;s thirty-year fight
              against undue influence, systemic neglect, and the theft of
              Carrie Evans&apos;s legacy. The book ends with six formal demands
              for justice.
            </p>

            <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-7">
              {BEATS.map((beat, i) => (
                <div
                  key={beat.label}
                  className="reveal grid md:grid-cols-12 gap-3 md:gap-6 hover-lift"
                  data-reveal-delay={i * 100}
                >
                  <div className="md:col-span-3">
                    <div className="label-mono-sm" style={{ color: "var(--gold)" }}>
                      {String(i + 1).padStart(2, "0")} / {beat.label}
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <h3
                      className="display-italic"
                      style={{
                        fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)",
                        color: "var(--on-dark)",
                        transition: "color 350ms ease",
                      }}
                    >
                      {beat.title}
                    </h3>
                    <p
                      className="body-text mt-2 sm:mt-3"
                      style={{ color: "var(--on-dark)", opacity: 0.9 }}
                    >
                      {beat.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* who it's for */}
            <div
              className="reveal mt-10 sm:mt-12 p-5 sm:p-6 hover-lift"
              style={{
                border: "1px solid rgba(246, 196, 83, 0.25)",
                background: "rgba(31, 24, 20, 0.5)",
              }}
            >
              <div
                className="label-mono-sm mb-3"
                style={{ color: "var(--gold)" }}
              >
                Who the book is for
              </div>
              <p className="body-text" style={{ color: "var(--on-dark)", opacity: 0.92 }}>
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
              className="reveal mt-8 p-5 sm:p-6 hover-lift"
              style={{
                background: "var(--bg)",
                color: "var(--text)",
                border: "1px solid var(--line)",
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
                    style={{ borderBottom: "1px solid var(--line)" }}
                  >
                    <dt className="label-mono-sm py-1" style={{ color: "var(--text-dim)" }}>
                      {d.k}
                    </dt>
                    <dd
                      className="col-span-2 py-1 body-text"
                      style={{ fontSize: "0.92rem" }}
                    >
                      {d.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p
                className="label-mono-sm mt-4"
                style={{ color: "var(--text-dim)", fontSize: "0.6rem" }}
              >
                Publication details to be confirmed at launch.
              </p>

              <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn btn-brick"
                  onClick={openGetBook}
                >
                  Get the Book
                </button>
                <button
                  type="button"
                  className="btn btn-paper"
                  onClick={() => setView("record")}
                >
                  Read the Record
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setView("contact")}
                >
                  Request a review copy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 reveal">
          <DiamondDivider />
        </div>
      </div>
    </section>
  );
}
