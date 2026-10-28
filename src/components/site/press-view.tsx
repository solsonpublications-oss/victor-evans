"use client";

import * as React from "react";
import { DiamondDivider } from "./illustrations";
import { useView } from "./view-provider";
import { useGetBookModal } from "./get-book-modal";

const BIOS = [
  {
    len: "50 words",
    body: "Victor L. Evans is a retired United States Army veteran in his seventies with two master's degrees — Public Administration and Human Resources Management. He is the author of The Generational Curse Breaker, a nonfiction account of his family's thirty-year fight for justice. He lives in Odenton, Maryland.",
  },
  {
    len: "100 words",
    body: "Victor L. Evans is a retired United States Army veteran in his seventies. He holds master's degrees in Public Administration and Human Resources Management and describes himself as 'not a professional writer.' For thirty years he corresponded with the FBI, the Metropolitan Police Department, Adult Protective Services, the D.C. Attorney General, and the United States Congress. In May 2025 he petitioned Congress for an investigation. The Generational Curse Breaker is his first book. He lives in Odenton, Maryland, and is the only remaining capacitated member of his family.",
  },
  {
    len: "200 words",
    body: "Victor L. Evans is a retired United States Army veteran in his seventies with two master's degrees — one in Public Administration, the other in Human Resources Management. He spent a career in institutions that value documentation, chain of custody, evidence, and accountability. He describes himself as 'not a professional writer.' He is the author of The Generational Curse Breaker: A Family's Battle Against Undue Influence, Systemic Neglect, and the Theft of Carrie Evans's Legacy. The book documents his family's thirty-year fight against the alleged exploitation of his disabled sister, the loss of the family home at 2905 Mills Avenue N.E. in Washington, D.C., and the deaths of three of his brothers. He has written to the FBI, the Metropolitan Police Department, Adult Protective Services, the D.C. Attorney General, the D.C. Bar, the Department of Veterans Affairs, and the United States Congress. In May 2025 he petitioned Congress for an investigation. He lives in Odenton, Maryland, and is the only remaining capacitated member of his family.",
  },
];

const FACTS = [
  { k: "Title", v: "The Generational Curse Breaker" },
  {
    k: "Subtitle",
    v: "A Family's Battle Against Undue Influence, Systemic Neglect, and the Theft of Carrie Evans's Legacy",
  },
  { k: "Author", v: "Victor L. Evans" },
  { k: "Edition", v: "First Edition, 2025" },
  { k: "Genre", v: "Nonfiction · Memoir · True Crime · Legal" },
  { k: "Length", v: "Approximately 51,000 words · 12 chapters across four parts" },
  { k: "Format", v: "Placeholder — confirm with author" },
  { k: "ISBN", v: "Placeholder — confirm with author" },
  { k: "Price", v: "Placeholder — confirm with author" },
  { k: "Retailer links", v: "Placeholder — confirm with author" },
];

export function PressView() {
  const { setView } = useView();
  const { open: openGetBook } = useGetBookModal();

  return (
    <section className="pt-28 md:pt-32 pb-24 px-4 sm:px-5 md:px-8" aria-label="Press">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-center gap-3 mb-8 reveal">
          <span className="label-mono-sm" style={{ color: "var(--brick)" }}>
            § Press
          </span>
          <span className="label-mono-sm" style={{ color: "var(--fg-muted)" }}>
            For media, reviewers, and event organizers
          </span>
        </div>

        <h1
          className="display reveal text-balance"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            color: "var(--fg)",
          }}
        >
          Press &amp; media kit.
        </h1>

        <p
          className="lede reveal mt-6 measure"
          style={{ color: "var(--fg)", opacity: 0.85 }}
        >
          Bios at three lengths, book facts, and downloadable asset placeholders.
          For review copies and interview requests, use the contact form or the
          email below.
        </p>

        {/* bios */}
        <div className="mt-14 reveal">
          <div className="label-mono-sm mb-4" style={{ color: "var(--brick)" }}>
            Author bios
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {BIOS.map((b) => (
              <article
                key={b.len}
                className="exhibit-card hover-lift"
              >
                <div className="label-mono-sm mb-3" style={{ color: "var(--brick)" }}>
                  {b.len}
                </div>
                <p
                  className="body-text"
                  style={{
                    color: "var(--fg)",
                    opacity: 0.88,
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                  }}
                >
                  {b.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* book facts */}
        <div className="mt-14 reveal">
          <div className="label-mono-sm mb-4" style={{ color: "var(--brick)" }}>
            Book facts
          </div>
          <div
            className="p-6 md:p-8"
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
            }}
          >
            <dl className="space-y-3">
              {FACTS.map((d) => (
                <div
                  key={d.k}
                  className="grid grid-cols-3 gap-3"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <dt
                    className="label-mono-sm py-2"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {d.k}
                  </dt>
                  <dd
                    className="col-span-2 py-2 body-text"
                    style={{ fontSize: "0.92rem", color: "var(--fg)" }}
                  >
                    {d.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* downloadable assets — placeholders */}
        <div className="mt-14 reveal">
          <div className="label-mono-sm mb-4" style={{ color: "var(--brick)" }}>
            Downloadable assets
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Book cover (JPG/PNG/AVIF)", note: "1200×1800 · placeholder" },
              { label: "Author headshot", note: "1200×1500 · placeholder" },
              { label: "OG image (SVG)", note: "1200×630 · available" },
            ].map((a) => (
              <a
                key={a.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="exhibit-card hover-lift block"
                style={{ textDecoration: "none" }}
              >
                <div className="label-mono-sm mb-2" style={{ color: "var(--brick)" }}>
                  Download
                </div>
                <div
                  className="display-italic"
                  style={{ color: "var(--fg)", fontSize: "1.1rem" }}
                >
                  {a.label}
                </div>
                <div
                  className="label-mono-sm mt-2"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {a.note}
                </div>
              </a>
            ))}
          </div>
          <p
            className="label-mono-sm mt-4"
            style={{ color: "var(--fg-muted)", fontSize: "0.6rem" }}
          >
            Cover and headshot are placeholders. The author will supply final
            assets before launch.
          </p>
        </div>

        {/* review copy request */}
        <div className="mt-14 reveal">
          <DiamondDivider />
          <div className="text-center my-10">
            <h2
              className="display"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: "var(--fg)",
              }}
            >
              Request a review copy.
            </h2>
            <p
              className="body-text mt-4 mx-auto"
              style={{
                color: "var(--fg)",
                opacity: 0.82,
                maxWidth: "48ch",
              }}
            >
              Reviewers, journalists, and event organizers may request an advance
              copy of the book. Use the contact form or email the author directly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                className="btn btn-brick"
                onClick={() => setView("contact")}
              >
                Open the contact form
              </button>
              <a href="mailto:contact@victorlevans.com" className="btn btn-outline">
                Email the author
              </a>
              <button
                type="button"
                className="btn btn-outline"
                onClick={openGetBook}
              >
                Get the Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
