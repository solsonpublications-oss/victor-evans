"use client";

import * as React from "react";
import { AuthorPortraitArt, DiamondDivider } from "./illustrations";
import { useCountUp } from "./hooks/motion";

const STATS = [
  { value: 30, suffix: "", label: "Years of documentation" },
  { value: 7, suffix: "", label: "Children in one row house" },
  { value: 6, suffix: "", label: "Demands for justice" },
  { value: 12, suffix: "", label: "Chapters" },
];

function StatItem({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div
      className="reveal text-center md:text-left"
      data-reveal-delay={delay}
    >
      <div
        ref={ref}
        className="display text-brass"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
          lineHeight: 1,
          color: "var(--brick)",
        }}
      >
        {current}
        {suffix}
      </div>
      <div
        className="label-mono-sm mt-2"
        style={{ color: "var(--mist)" }}
      >
        {label}
      </div>
    </div>
  );
}

export function AboutAuthor() {
  return (
    <section
      id="author"
      className="relative py-24 md:py-32 px-5 md:px-8"
      aria-label="About the author — Victor L. Evans"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-12 reveal">
          <span className="label-mono-sm text-brass">§ 01</span>
          <span className="label-mono-sm" style={{ color: "var(--mist)" }}>
            About the Author
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* portrait */}
          <div className="md:col-span-5 reveal" data-reveal-delay="80">
            <div className="relative" style={{ aspectRatio: "4 / 5" }}>
              <AuthorPortraitArt className="w-full h-full" />
              {/* brass offset frame */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-14px",
                  border: "1px solid var(--brass)",
                  opacity: 0.55,
                  transform: "translate(8px, 8px)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* text */}
          <div className="md:col-span-7">
            <h2
              className="display reveal text-balance"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                color: "var(--ink)",
              }}
              data-reveal-delay="100"
            >
              A disciplined veteran-administrator.
              <br />
              <span style={{ fontStyle: "italic", color: "var(--brick)" }}>
                Grief refined into clarity.
              </span>
            </h2>

            <div className="mt-7 space-y-5 body-text measure reveal" data-reveal-delay="180">
              <p>
                Victor L. Evans is a retired United States Army veteran in his
                seventies. He holds two master&apos;s degrees — one in Public
                Administration, the other in Human Resources Management. He
                spent a career in institutions that value documentation, chain
                of custody, evidence, and accountability. He describes himself
                as &ldquo;not a professional writer.&rdquo;
              </p>
              <p>
                He wrote this book because time is running out. His sister
                Phyllis is in her sixties. Three of his brothers are dead. His
                mother is dead. He spent roughly thirty years writing to the
                FBI, the Metropolitan Police Department, Adult Protective
                Services, the D.C. Attorney General, and the United States
                Congress. In May 2025 he petitioned Congress for an
                investigation.
              </p>
              <p>
                He is the only remaining capacitated member of his family. The
                assignment his mother gave him, in a kitchen on Mills Avenue,
                was specific: <em>you are her protection.</em> He has been
                trying to keep that assignment for forty years.
              </p>
            </div>

            <blockquote
              className="reveal mt-8 pl-6"
              style={{ borderLeft: "3px solid var(--brass)" }}
              data-reveal-delay="240"
            >
              <p
                className="display-italic"
                style={{
                  fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
                  color: "var(--ink)",
                  lineHeight: 1.45,
                }}
              >
                &ldquo;I am not asking anyone to take my word for it. I am
                asking people to read the record.&rdquo;
              </p>
              <footer
                className="label-mono-sm mt-3"
                style={{ color: "var(--mist)" }}
              >
                — Author&apos;s Note
              </footer>
            </blockquote>
          </div>
        </div>

        {/* by the numbers */}
        <div className="mt-20 reveal">
          <DiamondDivider />
          <div
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
            aria-label="By the numbers"
          >
            {STATS.map((s, i) => (
              <StatItem
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                delay={i * 80}
              />
            ))}
          </div>
          <p
            className="label-mono-sm mt-8 text-center md:text-left"
            style={{ color: "var(--mist)" }}
          >
            Thirty years · thousands of pages · hundreds of letters · zero
            meaningful interventions.
          </p>
        </div>
      </div>
    </section>
  );
}
