"use client";

import * as React from "react";
import { CinematicHeroScene, ParticleCanvas } from "./cinematic-scene";
import { useCoverTilt, useScrollProgress, useFoilSweep, useMagnetic } from "./hooks/motion";
import { useGetBookModal } from "./get-book-modal";
import { useView } from "./view-provider";

/**
 * Chain-break intro — first visit only, skippable, reduced-motion safe.
 * A single gold chain link draws itself, then snaps with an ember burst.
 */
function ChainBreakIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = React.useState<"draw" | "snap" | "done">("draw");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      onDone();
      return;
    }

    // Check if this is the first visit (session-based)
    const seen = sessionStorage.getItem("gcb-intro-seen");
    if (seen) {
      onDone();
      return;
    }

    const t1 = setTimeout(() => setPhase("snap"), 900);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("gcb-intro-seen", "1");
      onDone();
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#050810",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        animation: phase === "snap" ? "backdropFade 400ms ease-out reverse forwards" : undefined,
      }}
      aria-hidden="true"
    >
      <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
        {/* Chain link — draws itself */}
        <ellipse
          cx="100"
          cy="40"
          rx="28"
          ry="18"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: phase === "draw" ? 200 : 0,
            animation: "chainDraw 800ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards",
          }}
        />
        {/* Snap crack — appears when snapping */}
        {phase === "snap" && (
          <>
            <path
              d="M 72 40 L 128 40"
              stroke="var(--gold-2)"
              strokeWidth="1"
              opacity="0.8"
              style={{ animation: "chainDraw 200ms ease-out forwards" }}
            />
            {/* Ember burst */}
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const dist = 30 + Math.random() * 20;
              const x = 100 + Math.cos(angle) * dist;
              const y = 40 + Math.sin(angle) * dist;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={1 + Math.random() * 2}
                  fill="var(--ember)"
                  style={{
                    animation: `emberRise 600ms ease-out forwards`,
                    animationDelay: `${i * 20}ms`,
                    transformOrigin: "100px 40px",
                  }}
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}

export function Hero() {
  const tiltRef = useCoverTilt(8);
  const foilRef = useFoilSweep();
  const readBtnRef = useMagnetic(0.25, 120);
  const getBookBtnRef = useMagnetic(0.25, 120);
  const { open: openGetBook } = useGetBookModal();
  const { setView } = useView();
  const scrollProgress = useScrollProgress();
  const [introDone, setIntroDone] = React.useState(false);

  return (
    <>
      {!introDone && <ChainBreakIntro onDone={() => setIntroDone(true)} />}

      <section
        id="top"
        className="storm-section relative overflow-hidden"
        style={{ minHeight: "100svh" }}
        aria-label="The Generational Curse Breaker — opening"
      >
        {/* Cinematic layered background scene */}
        <CinematicHeroScene scrollProgress={scrollProgress * 2} />

        {/* Particle canvas — embers (dark) / dust (light) */}
        <ParticleCanvas count={40} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 grid md:grid-cols-12 gap-8 items-center">
          {/* left/center: text */}
          <div className="md:col-span-7 md:pr-8">
            <p
              className="eyebrow hero-rise"
              style={{ animationDelay: "200ms", color: "var(--gold-2)" }}
            >
              A True Account · First Edition 2025
            </p>

            <h1
              ref={foilRef}
              className="display hero-rise text-balance mt-4 sm:mt-5"
              style={{
                fontSize: "clamp(2.8rem, 9vw, 8rem)",
                animationDelay: "400ms",
              }}
            >
              <span className="hero-rise block" style={{ animationDelay: "400ms" }}>
                The Generational
              </span>
              <span className="hero-rise block" style={{ animationDelay: "550ms" }}>
                <span className="foil-text">Curse Breaker</span>
              </span>
            </h1>

            <p
              className="display-italic hero-rise mt-4 sm:mt-5"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                color: "var(--on-dark)",
                opacity: 0.8,
                maxWidth: "42ch",
                animationDelay: "700ms",
              }}
            >
              A Family&apos;s Battle Against Undue Influence, Systemic Neglect,
              and the Theft of Carrie Evans&apos;s Legacy.
            </p>

            <p
              className="body-text-lg hero-rise mt-6 sm:mt-7"
              style={{
                color: "var(--on-dark)",
                opacity: 0.9,
                maxWidth: "44ch",
                animationDelay: "900ms",
              }}
            >
              <span style={{ color: "var(--gold-2)" }}>&ldquo;</span>
              I am not asking you to take my word for it. I am asking you to read
              the record.
              <span style={{ color: "var(--gold-2)" }}>&rdquo;</span>
            </p>

            <div
              className="hero-rise mt-7 sm:mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "1100ms" }}
            >
              <button
                ref={readBtnRef as React.RefObject<HTMLButtonElement>}
                type="button"
                className="btn btn-gold"
                onClick={() => setView("record")}
                style={{ position: "relative", transition: "transform 200ms ease-out, box-shadow 280ms ease" }}
              >
                Read the Record
              </button>
              <button
                ref={getBookBtnRef as React.RefObject<HTMLButtonElement>}
                type="button"
                className="btn btn-outline-light"
                onClick={openGetBook}
                style={{ position: "relative", transition: "transform 200ms ease-out, box-shadow 280ms ease" }}
              >
                Get the Book
              </button>
            </div>
          </div>

          {/* right: 3D book */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div
              ref={tiltRef}
              className="hero-rise relative"
              style={{
                width: "min(72vw, 380px)",
                aspectRatio: "2 / 3",
                animation: "coverFloat 1200ms cubic-bezier(0.2,0.7,0.2,1) forwards",
                animationDelay: "1200ms",
                opacity: 0,
                transformStyle: "preserve-3d",
                transform: "perspective(1200px) rotateX(0) rotateY(0)",
                transition: "transform 200ms ease-out",
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.7))",
              }}
            >
              {/* Real book cover on a 3D hardcover face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transformStyle: "preserve-3d",
                  borderRadius: "2px",
                  overflow: "hidden",
                  boxShadow: "0 0 0 1px rgba(246, 196, 83, 0.15), inset 0 0 20px rgba(0,0,0,0.3)",
                }}
              >
                <picture>
                  <img
                    src="/cover.jpg"
                    alt="The Generational Curse Breaker — book cover: a brick row house at dusk with a lit window, a broken chain on the front steps, and the silhouette of a white-haired figure in the storm clouds above."
                    width={1024}
                    height={1536}
                    fetchPriority="high"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </picture>
                {/* Specular gold sheen — follows cursor */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle 80px at var(--sheen-x, 50%) var(--sheen-y, 30%), rgba(255, 224, 138, 0.25), transparent 60%)`,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                  }}
                />
              </div>
              {/* Spine highlight */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "6px",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)",
                  pointerEvents: "none",
                }}
                  aria-hidden="true"
              />
              {/* Page edges — right side */}
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "-3px",
                  bottom: "2px",
                  width: "4px",
                  background: "linear-gradient(to right, #E8DCC4, #F2E9D8, #E8DCC4)",
                  borderRadius: "0 2px 2px 0",
                  boxShadow: "1px 0 3px rgba(0,0,0,0.3)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 hidden md:flex flex-col items-center gap-2 z-10"
          aria-hidden="true"
          style={{ color: "var(--gold)" }}
        >
          <span
            className="block"
            style={{
              width: "8px",
              height: "8px",
              background: "currentColor",
              transform: "rotate(45deg)",
              boxShadow: "0 0 12px currentColor",
            }}
          />
          <span
            className="block"
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, currentColor, transparent)",
              animation: "scrollCue 2200ms ease-in-out infinite",
            }}
          />
          <span className="label-mono-sm" style={{ color: "var(--on-dark-dim)" }}>
            Scroll
          </span>
        </div>

        {/* Bottom ticker — signature phrases */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden"
          style={{
            borderTop: "1px solid var(--line)",
            background: "rgba(7, 11, 20, 0.4)",
            backdropFilter: "blur(6px)",
          }}
          aria-hidden="true"
        >
          <div
            style={{
              display: "flex",
              gap: "3rem",
              padding: "0.6rem 0",
              animation: "ticker 30s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {[
              "Read the record.",
              "Thirty years.",
              "The walls remember.",
              "I didn't forget.",
              "Hope is a discipline.",
              "This book is the audit.",
            ].concat([
              "Read the record.",
              "Thirty years.",
              "The walls remember.",
              "I didn't forget.",
              "Hope is a discipline.",
              "This book is the audit.",
            ]).map((phrase, i) => (
              <span
                key={i}
                className="label-mono-sm"
                style={{ color: "var(--on-dark)", opacity: 0.7 }}
              >
                {phrase} <span style={{ color: "var(--gold)" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
