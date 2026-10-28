"use client";

import * as React from "react";
import { RowHouseArt, BookCoverArt } from "./illustrations";
import { useCoverTilt } from "./hooks/motion";
import { useGetBookModal } from "./get-book-modal";

export function Hero() {
  const tiltRef = useCoverTilt(6);
  const { open: openGetBook } = useGetBookModal();

  return (
    <section
      id="top"
      className="bg-ink-grain relative overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label="The Generational Curse Breaker — opening"
    >
      {/* background house line art — absolute, behind everything */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.55 }}
        aria-hidden="true"
      >
        <RowHouseArt
          className="w-full h-full"
          style={{ objectFit: "cover" } as React.CSSProperties}
        />
        {/* vignette to push the house into the background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(20,17,15,0.2) 0%, rgba(20,17,15,0.85) 70%, rgba(20,17,15,0.98) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 grid md:grid-cols-12 gap-8 items-center">
        {/* left/center: text */}
        <div className="md:col-span-7 md:pr-8">
          <p
            className="eyebrow hero-rise"
            style={{ animationDelay: "100ms", color: "var(--brass-2)" }}
          >
            A True Account · First Edition 2025
          </p>

          <h1
            className="display text-balance mt-4 sm:mt-5"
            style={{
              fontSize: "clamp(2.2rem, 8vw, 6.5rem)",
              color: "var(--on-ink)",
            }}
            data-hero-rise
          >
            <span className="hero-rise block" style={{ animationDelay: "220ms" }}>
              The Generational
            </span>
            <span className="hero-rise block" style={{ animationDelay: "280ms" }}>
              Curse{" "}
              <span style={{ color: "var(--brass-2)" }}>Breaker</span>
            </span>
          </h1>

          <p
            className="display-italic hero-rise mt-4 sm:mt-5"
            style={{
              fontSize: "clamp(0.95rem, 1.7vw, 1.4rem)",
              color: "var(--on-ink)",
              opacity: 0.8,
              maxWidth: "42ch",
              animationDelay: "460ms",
            }}
          >
            A Family&apos;s Battle Against Undue Influence, Systemic Neglect,
            and the Theft of Carrie Evans&apos;s Legacy.
          </p>

          <p
            className="body-text-lg hero-rise mt-6 sm:mt-7"
            style={{
              color: "var(--on-ink)",
              opacity: 0.85,
              maxWidth: "44ch",
              animationDelay: "600ms",
            }}
          >
            <span style={{ color: "var(--brass-2)" }}>&ldquo;</span>
            I am not asking you to take my word for it. I am asking you to read
            the record.
            <span style={{ color: "var(--brass-2)" }}>&rdquo;</span>
          </p>

          <div
            className="hero-rise mt-7 sm:mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "740ms" }}
          >
            <button
              type="button"
              className="btn btn-brick"
              onClick={openGetBook}
            >
              Get the Book
            </button>
            <a href="#book" className="btn btn-outline-paper">
              About the Book
            </a>
          </div>
        </div>

        {/* right: cover */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div
            ref={tiltRef}
            className="hero-rise relative"
            style={{
              width: "min(72vw, 320px)",
              aspectRatio: "2 / 3",
              animation: "coverFloat 1100ms cubic-bezier(0.2,0.7,0.2,1) forwards",
              animationDelay: "800ms",
              opacity: 0,
              transformStyle: "preserve-3d",
              transform: "perspective(1200px) rotateX(0) rotateY(0)",
              transition: "transform 200ms ease-out, filter 350ms ease",
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.55))",
            }}
          >
            <BookCoverArt className="w-full h-full" />
            {/* spine highlight */}
            <div
              className="absolute top-0 left-0 bottom-0 pointer-events-none"
              style={{
                width: "4px",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.15), transparent)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* scroll cue — vertical thread with brass diamond */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
        style={{ color: "var(--brass)" }}
      >
        <span
          className="block"
          style={{
            width: "8px",
            height: "8px",
            background: "currentColor",
            transform: "rotate(45deg)",
            animation: "diamondScale 700ms ease-out forwards",
          }}
        />
        <span
          className="block"
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, currentColor, transparent)",
            animation: "scrollCue 2200ms ease-in-out infinite",
          }}
        />
        <span className="label-mono-sm" style={{ color: "var(--fg-muted)" }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
