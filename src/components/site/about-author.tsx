"use client";

import * as React from "react";
import { AuthorPortraitArt, DiamondDivider, BrokenChainArt } from "./illustrations";
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
      className="reveal text-center md:text-left hover-lift"
      data-reveal-delay={delay}
      style={{ padding: "0.5rem 0" }}
    >
      <div
        ref={ref}
        className="display"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
          lineHeight: 1,
          color: "var(--brick)",
          transition: "color 350ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--brick)")}
      >
        {current}
        {suffix}
      </div>
      <div
        className="label-mono-sm mt-2"
        style={{ color: "var(--text-dim)" }}
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
      className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-5 md:px-8"
      style={{ backgroundColor: "var(--surface)" }}
      aria-label="About the author — Victor L. Evans"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-8 sm:mb-12 reveal">
          <span className="label-mono-sm" style={{ color: "var(--brick)" }}>§ 01</span>
          <span className="label-mono-sm" style={{ color: "var(--text-dim)" }}>
            About the Author
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-start">
          {/* portrait */}
          <div className="md:col-span-5 reveal" data-reveal-delay="80">
            <div
              className="relative hover-lift"
              style={{ aspectRatio: "4 / 5", maxWidth: "480px", margin: "0 auto" }}
              onMouseEnter={(e) => {
                const frame = e.currentTarget.querySelector(".portrait-frame") as HTMLElement;
                if (frame) frame.style.transform = "translate(12px, 12px)";
              }}
              onMouseLeave={(e) => {
                const frame = e.currentTarget.querySelector(".portrait-frame") as HTMLElement;
                if (frame) frame.style.transform = "translate(8px, 8px)";
              }}
            >
              <AuthorPortraitArt className="w-full h-full" />
              {/* brass offset frame */}
              <div
                className="portrait-frame absolute pointer-events-none"
                style={{
                  inset: "-10px sm:-14px",
                  border: "1px solid var(--gold)",
                  opacity: 0.55,
                  transform: "translate(8px, 8px)",
                  transition: "transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* text */}
          <div className="md:col-span-7">
            {/* Broken chain motif — the book's central image */}
            <div
              className="reveal mb-6"
              data-reveal-delay="60"
              style={{ opacity: 0.85 }}
            >
              <BrokenChainArt
                className="w-32 h-12"
                tone="brass"
              />
            </div>

            <h2
              className="display reveal text-balance"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.4rem)",
                color: "var(--text)",
              }}
              data-reveal-delay="100"
            >
              A disciplined veteran-administrator.
              <br />
              <span style={{ fontStyle: "italic", color: "var(--brick)" }}>
                Grief refined into clarity.
              </span>
            </h2>

            <div className="mt-6 sm:mt-7 space-y-4 sm:space-y-5 body-text measure reveal" data-reveal-delay="180">
              <p>
                Victor L. Evans is a retired United States Army veteran in his
                seventies. He holds two master&apos;s degrees — one in Public
                Administration, the other in Human Resources Management. He
                spent a career in institutions that value documentation, chain
                of custody, evidence, and accountability. He describes himself
                as &ldquo;not a professional writer.&rdquo;
              </p>
              <p>
                His father worked as a transmission mechanic for the Greyhound
                Bus Company. His mother kept the house. The family survived
                through work — never on food stamps or welfare. A steady job
                and a paid-off home in Black Northeast Washington was an
                achievement, and the author grew up inside that achievement
                and inside the frustrations that came with it.
              </p>
              <p>
                He wrote this book because time is running out. His sister
                Phyllis is in her sixties. He spent roughly thirty years
                writing to the FBI, the Metropolitan Police Department, Adult
                Protective Services, the D.C. Attorney General, and the
                United States Congress. In May 2025 he petitioned Congress for
                an investigation.
              </p>
              <p>
                He is the only remaining capacitated member of his family. The
                assignment his mother gave him, in a kitchen on Mills Avenue,
                was specific: <em>you are her protection.</em> He has been
                trying to keep that assignment for forty years.
              </p>
            </div>

            <blockquote
              className="reveal mt-7 sm:mt-8 pl-5 sm:pl-6"
              style={{ borderLeft: "3px solid var(--brick)" }}
              data-reveal-delay="240"
            >
              <p
                className="display-italic"
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)",
                  color: "var(--text)",
                  lineHeight: 1.45,
                }}
              >
                &ldquo;I am not asking anyone to take my word for it. I am
                asking people to read the record.&rdquo;
              </p>
              <footer
                className="label-mono-sm mt-3"
                style={{ color: "var(--text-dim)" }}
              >
                — Author&apos;s Note
              </footer>
            </blockquote>
          </div>
        </div>

        {/* by the numbers */}
        <div className="mt-16 sm:mt-20 reveal">
          <DiamondDivider />
          <div
            className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6"
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
            className="label-mono-sm mt-6 sm:mt-8 text-center md:text-left"
            style={{ color: "var(--text-dim)" }}
          >
            Thirty years · thousands of pages · hundreds of letters · zero
            meaningful interventions.
          </p>
        </div>
      </div>
    </section>
  );
}
