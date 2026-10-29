"use client";

import * as React from "react";

/**
 * Row-house line art — inline SVG, under 6KB.
 * Used in the hero background. The single window glows warm brass on load.
 *
 * Stroke language: thin lines, brick silhouette, two-story row house
 * with a front stoop and a single lit window. No glossy effects.
 */
export function RowHouseArt({
  className = "",
  ariaHidden = true,
}: {
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 400"
      className={className}
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Line drawing of a brick row house on Mills Avenue N.E., with one window glowing warm."}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4B05E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8E3B2F" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="stoopGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8913F" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#B8913F" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* sky line — distant neighbors */}
      <g stroke="rgba(184, 145, 63, 0.18)" strokeWidth="0.75" fill="none">
        <rect x="20" y="180" width="60" height="120" />
        <rect x="100" y="160" width="80" height="140" />
        <rect x="500" y="170" width="70" height="130" />
      </g>

      {/* main house — 2905 Mills Avenue */}
      <g stroke="rgba(184, 145, 63, 0.55)" strokeWidth="1.1" fill="none">
        {/* roof */}
        <path d="M180 130 L300 90 L420 130 Z" />
        {/* facade */}
        <rect x="180" y="130" width="240" height="170" />
        {/* floor divider */}
        <line x1="180" y1="215" x2="420" y2="215" />
        {/* brick coursing — subtle horizontal lines */}
        <line x1="180" y1="160" x2="420" y2="160" stroke="rgba(184, 145, 63, 0.12)" />
        <line x1="180" y1="185" x2="420" y2="185" stroke="rgba(184, 145, 63, 0.12)" />
        <line x1="180" y1="240" x2="420" y2="240" stroke="rgba(184, 145, 63, 0.12)" />
        <line x1="180" y1="265" x2="420" y2="265" stroke="rgba(184, 145, 63, 0.12)" />

        {/* upper-left window (the lit one) */}
        <rect x="210" y="155" width="50" height="50" />
        <line x1="235" y1="155" x2="235" y2="205" />
        <line x1="210" y1="180" x2="260" y2="180" />

        {/* upper-right window (dark) */}
        <rect x="340" y="155" width="50" height="50" />
        <line x1="365" y1="155" x2="365" y2="205" />
        <line x1="340" y1="180" x2="390" y2="180" />

        {/* lower-left window */}
        <rect x="210" y="235" width="50" height="50" />
        <line x1="235" y1="235" x2="235" y2="285" />
        <line x1="210" y1="260" x2="260" y2="260" />

        {/* door — center lower */}
        <rect x="290" y="240" width="40" height="60" />
        <circle cx="321" cy="270" r="1.5" fill="rgba(184, 145, 63, 0.7)" />

        {/* front stoop — three steps */}
        <path d="M285 300 L285 310 L335 310 L335 300" />
        <path d="M280 310 L280 318 L340 318 L340 310" />
        <path d="M275 318 L275 324 L345 324 L345 318" />

        {/* sidewalk edge */}
        <line x1="0" y1="324" x2="600" y2="324" stroke="rgba(184, 145, 63, 0.3)" />
      </g>

      {/* the lit window glow — brass pulse on load */}
      <rect
        x="210"
        y="155"
        width="50"
        height="50"
        fill="url(#windowGlow)"
        style={{
          animation: "windowGlow 1400ms ease-out forwards",
          animationDelay: "700ms",
        }}
      />

      {/* the stoop glow */}
      <rect
        x="275"
        y="300"
        width="70"
        height="24"
        fill="url(#stoopGlow)"
        opacity="0"
        style={{
          animation: "windowGlow 1800ms ease-out forwards",
          animationDelay: "1100ms",
        }}
      />
    </svg>
  );
}

/**
 * Diamond section divider — — — ◆ — — —
 * Thin rules, brass diamond that gently scales in on scroll (handled by .reveal).
 */
export function DiamondDivider({
  className = "",
  tone = "brass",
}: {
  className?: string;
  tone?: "brass" | "ink" | "paper";
}) {
  const color =
    tone === "gold" ? "var(--gold)" : tone === "ink" ? "var(--text)" : "var(--on-dark)";
  return (
    <div
      className={`diamond-divider reveal ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <span className="diamond" />
    </div>
  );
}

/**
 * Book cover placeholder — typographic SVG.
 * Ink background, brass diamond, title in serif, author name in mono.
 * Aspect ratio 2:3. Swappable by replacing /public/cover.* with real art.
 */
export function BookCoverArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 1800"
      className={className}
      role="img"
      aria-label="Book cover placeholder: The Generational Curse Breaker by Victor L. Evans"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="coverBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2218" />
          <stop offset="100%" stopColor="#1F1814" />
        </linearGradient>
        <pattern id="coverGrain" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.4" fill="rgba(184, 145, 63, 0.06)" />
        </pattern>
      </defs>

      <rect width="1200" height="1800" fill="url(#coverBg)" />
      <rect width="1200" height="1800" fill="url(#coverGrain)" />

      {/* double rule frame */}
      <rect x="80" y="80" width="1040" height="1640" fill="none" stroke="rgba(184, 145, 63, 0.45)" strokeWidth="2" />
      <rect x="92" y="92" width="1016" height="1616" fill="none" stroke="rgba(184, 145, 63, 0.18)" strokeWidth="1" />

      {/* top eyebrow */}
      <text
        x="600"
        y="220"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="22"
        letterSpacing="8"
        fill="rgba(184, 145, 63, 0.85)"
      >
        A TRUE ACCOUNT · FIRST EDITION 2025
      </text>

      {/* diamond */}
      <g transform="translate(600 360)">
        <rect x="-12" y="-12" width="24" height="24" transform="rotate(45)" fill="#B8913F" />
        <rect x="-22" y="-22" width="44" height="44" transform="rotate(45)" fill="none" stroke="rgba(184, 145, 63, 0.3)" strokeWidth="1" />
      </g>

      {/* title */}
      <text x="600" y="560" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="92" fill="#F4ECD8">THE</text>
      <text x="600" y="700" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="118" fontWeight="500" fill="#F4ECD8">GENERATIONAL</text>
      <text x="600" y="840" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="118" fontWeight="500" fill="#F4ECD8">CURSE</text>
      <text x="600" y="980" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="118" fontWeight="500" fill="#B8913F">BREAKER</text>

      {/* divider */}
      <g transform="translate(600 1110)">
        <line x1="-180" y1="0" x2="-20" y2="0" stroke="rgba(184, 145, 63, 0.6)" strokeWidth="1.5" />
        <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" fill="#B8913F" />
        <line x1="20" y1="0" x2="180" y2="0" stroke="rgba(184, 145, 63, 0.6)" strokeWidth="1.5" />
      </g>

      {/* subtitle */}
      <text x="600" y="1200" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="34" fontStyle="italic" fill="rgba(241, 232, 216, 0.75)">A Family&apos;s Battle Against</text>
      <text x="600" y="1252" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="34" fontStyle="italic" fill="rgba(241, 232, 216, 0.75)">Undue Influence, Systemic Neglect,</text>
      <text x="600" y="1304" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="34" fontStyle="italic" fill="rgba(241, 232, 216, 0.75)">and the Theft of Carrie Evans&apos;s Legacy</text>

      {/* author */}
      <text x="600" y="1560" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="26" letterSpacing="6" fill="rgba(184, 145, 63, 0.9)">VICTOR L. EVANS</text>
    </svg>
  );
}

/**
 * Author portrait placeholder — silhouette-free tonal SVG frame with VLE initials.
 * Aspect ratio 4:5. Swappable by replacing /public/author.* with real photo.
 */
export function AuthorPortraitArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 1500"
      className={className}
      role="img"
      aria-label="Portrait placeholder for Victor L. Evans — a tonal frame with the initials VLE."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="portraitBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2F271F" />
          <stop offset="100%" stopColor="#1F1814" />
        </linearGradient>
        <pattern id="portraitGrain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.3" fill="rgba(184, 145, 63, 0.08)" />
        </pattern>
      </defs>

      <rect width="1200" height="1500" fill="url(#portraitBg)" />
      <rect width="1200" height="1500" fill="url(#portraitGrain)" />

      <rect x="60" y="60" width="1080" height="1380" fill="none" stroke="rgba(184, 145, 63, 0.5)" strokeWidth="1.5" />

      <line x1="180" y1="700" x2="1020" y2="700" stroke="rgba(184, 145, 63, 0.18)" strokeWidth="0.8" />

      <g transform="translate(600 220)">
        <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" fill="#B8913F" />
      </g>

      <text x="600" y="780" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="280" fontWeight="300" letterSpacing="20" fill="#F4ECD8">VLE</text>

      <text x="600" y="900" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="22" letterSpacing="6" fill="rgba(184, 145, 63, 0.8)">VICTOR L. EVANS</text>
      <text x="600" y="940" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="26" fontStyle="italic" fill="rgba(241, 232, 216, 0.55)">Author photograph pending</text>

      <line x1="540" y1="1280" x2="660" y2="1280" stroke="rgba(184, 145, 63, 0.6)" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Broken chain — the thematic motif from the book cover.
 * A chain with one link broken open, symbolizing the curse being broken.
 * Used as a decorative element in the author section.
 */
export function BrokenChainArt({
  className = "",
  tone = "brass",
}: {
  className?: string;
  tone?: "brass" | "ink" | "paper";
}) {
  const color =
    tone === "gold"
      ? "var(--gold)"
      : tone === "ink"
      ? "var(--text)"
      : "var(--on-dark)";

  return (
    <svg
      viewBox="0 0 200 80"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left link — intact oval */}
      <ellipse
        cx="40"
        cy="40"
        rx="28"
        ry="18"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.7"
      />
      {/* Right link — broken, two halves separated */}
      <path
        d="M 100 22 Q 132 22 132 40 Q 132 58 100 58"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M 168 22 Q 136 22 136 40"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M 168 58 Q 136 58 136 40"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.5"
        strokeLinecap="round"
      />
      {/* Break spark — small brass dot at the break point */}
      <circle cx="152" cy="40" r="2" fill={color} opacity="0.9" />
      <circle cx="152" cy="40" r="5" fill={color} opacity="0.2" />
    </svg>
  );
}
