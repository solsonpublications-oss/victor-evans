"use client";

import * as React from "react";

interface AuthorPortraitAnimatedProps {
  className?: string;
}

export function AuthorPortraitAnimated({ className = "" }: AuthorPortraitAnimatedProps) {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Parallax rotation & translation values
  const rotX = -coords.y * 12;
  const rotY = coords.x * 12;

  return (
    <div
      ref={frameRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative select-none ${className}`}
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* 3D Root Card */}
      <div
        className="relative rounded-md overflow-hidden transition-all duration-300 ease-out"
        style={{
          aspectRatio: "4 / 5",
          maxWidth: "460px",
          margin: "0 auto",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) ${
            isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)"
          }`,
          boxShadow: isHovered
            ? "0 28px 60px -10px rgba(0,0,0,0.7), 0 0 35px rgba(246,196,83,0.18)"
            : "0 18px 40px -10px rgba(0,0,0,0.55), 0 0 15px rgba(246,196,83,0.08)",
          background: "linear-gradient(170deg, #182032 0%, #0D1322 55%, #080C16 100%)",
          border: "1px solid rgba(246, 196, 83, 0.4)",
        }}
      >
        {/* Layer 1: Background Rotating Compass & Sacred Geometry Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden"
          style={{
            transform: `translateZ(-15px) translate(${coords.x * -18}px, ${coords.y * -18}px)`,
            transition: "transform 200ms ease-out",
          }}
        >
          <svg viewBox="0 0 500 625" className="w-full h-full" fill="none">
            {/* Concentric rings */}
            <circle cx="250" cy="280" r="140" stroke="var(--gold)" strokeWidth="0.8" strokeDasharray="3 4" />
            <circle cx="250" cy="280" r="190" stroke="var(--gold)" strokeWidth="0.6" strokeDasharray="6 8" />
            <circle cx="250" cy="280" r="230" stroke="var(--gold)" strokeWidth="0.4" />
            {/* Compass Star Rays */}
            <g
              style={{
                transformOrigin: "250px 280px",
                animation: "slowRotate 90s linear infinite",
              }}
            >
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="250"
                  y1="280"
                  x2={250 + Math.cos((deg * Math.PI) / 180) * 260}
                  y2={280 + Math.sin((deg * Math.PI) / 180) * 260}
                  stroke="var(--gold)"
                  strokeWidth="0.6"
                  opacity="0.35"
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Layer 2: Warm Back-Glow Behind Author */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 240px at ${50 + coords.x * 20}% ${40 + coords.y * 20}%, rgba(246, 196, 83, 0.18), rgba(200, 85, 61, 0.08) 50%, transparent 75%)`,
            transform: "translateZ(-8px)",
          }}
        />

        {/* Layer 3: Artistic Distinguished Portrait of Victor L. Evans */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translateZ(12px) translate(${coords.x * 10}px, ${coords.y * 10}px)`,
            transition: "transform 200ms ease-out",
          }}
        >
          <svg
            viewBox="0 0 400 500"
            className="w-full h-full"
            fill="none"
            role="img"
            aria-label="Distinguished artistic portrait of Victor L. Evans — Retired U.S. Army Veteran and Author"
          >
            <defs>
              <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8A5A36" />
                <stop offset="60%" stopColor="#694125" />
                <stop offset="100%" stopColor="#4A2D19" />
              </linearGradient>
              <linearGradient id="suitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E283D" />
                <stop offset="100%" stopColor="#0B101C" />
              </linearGradient>
              <linearGradient id="goldHilight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFE08A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C98A1B" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id="eyeGleam" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="100%" stopColor="#FFE08A" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Suit & Shoulders (Broad, Dignified, Veteran Posture) */}
            <path
              d="M 50 500 C 50 420 85 365 130 345 L 200 375 L 270 345 C 315 365 350 420 350 500 Z"
              fill="url(#suitGrad)"
              stroke="rgba(246, 196, 83, 0.3)"
              strokeWidth="1.2"
            />

            {/* Crisp Shirt Collar & Tie */}
            <path d="M 175 365 L 200 415 L 225 365 Z" fill="#F4ECD8" />
            {/* Silk Burgundy Tie */}
            <path d="M 194 380 L 206 380 L 210 470 L 200 495 L 190 470 Z" fill="#8E3B2F" stroke="#C8553D" strokeWidth="0.8" />

            {/* Military Service Ribbon Bar on Left Lapel */}
            <g transform="translate(115 395)">
              <rect width="36" height="10" rx="1" fill="#1B2A4A" stroke="#F6C453" strokeWidth="0.8" />
              <rect x="0" y="0" width="12" height="10" fill="#8E3B2F" />
              <rect x="12" y="0" width="12" height="10" fill="#F6C453" />
              <rect x="24" y="0" width="12" height="10" fill="#1B2A4A" />
              {/* Gold Eagle / Star Pin Accent */}
              <circle cx="18" cy="5" r="1.8" fill="#FFE08A" />
            </g>

            {/* Neck */}
            <path d="M 170 295 L 170 365 L 230 365 L 230 295 Z" fill="#694125" />

            {/* Head Silhouette with Determined Jawline */}
            <path
              d="M 150 205 C 150 140 170 120 200 120 C 230 120 250 140 250 205 C 250 260 235 305 200 305 C 165 305 150 260 150 205 Z"
              fill="url(#skinGrad)"
            />

            {/* Distinguished Gray/Silver Hair & Temple Contours */}
            <path
              d="M 148 190 C 146 150 162 115 200 115 C 238 115 254 150 252 190 C 248 150 235 125 200 125 C 165 125 152 150 148 190 Z"
              fill="#D1D5DB"
              opacity="0.95"
            />
            {/* Soft silver temple highlights */}
            <path d="M 148 185 C 148 165 155 145 168 135" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 252 185 C 252 165 245 145 232 135" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />

            {/* Classic Wire-rimmed Scholar Glasses (Reflecting Discipline & Documentation) */}
            <g stroke="#FFE08A" strokeWidth="1.4" fill="none">
              {/* Left Lens */}
              <rect x="162" y="185" width="28" height="22" rx="4" fill="rgba(255, 230, 150, 0.08)" />
              {/* Right Lens */}
              <rect x="210" y="185" width="28" height="22" rx="4" fill="rgba(255, 230, 150, 0.08)" />
              {/* Bridge */}
              <path d="M 190 195 Q 200 191 210 195" />
              {/* Temples */}
              <line x1="162" y1="193" x2="150" y2="190" />
              <line x1="238" y1="193" x2="250" y2="190" />
            </g>

            {/* Focused, Vigilant Eyes */}
            <circle cx="176" cy="196" r="2.2" fill="#20150E" />
            <circle cx="176" cy="195" r="0.8" fill="url(#eyeGleam)" />
            <circle cx="224" cy="196" r="2.2" fill="#20150E" />
            <circle cx="224" cy="195" r="0.8" fill="url(#eyeGleam)" />

            {/* Dignified Eyebrows (Experienced, Wise) */}
            <path d="M 160 180 Q 175 174 190 180" stroke="#C4C9D2" strokeWidth="2" strokeLinecap="round" />
            <path d="M 210 180 Q 225 174 240 180" stroke="#C4C9D2" strokeWidth="2" strokeLinecap="round" />

            {/* Mustache & Expressive Mouth */}
            <path d="M 180 252 Q 200 246 220 252" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
            <path d="M 186 265 Q 200 268 214 265" stroke="#4A2D19" strokeWidth="1.5" strokeLinecap="round" />

            {/* Subtle Golden Contour Rim Light (Left & Right) */}
            <path
              d="M 150 170 Q 146 220 160 270"
              stroke="url(#goldHilight)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 250 170 Q 254 220 240 270"
              stroke="url(#goldHilight)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Layer 4: Etched Brass Filigree Frame & Ornamental Corner Brackets */}
        <div
          aria-hidden="true"
          className="absolute inset-3 pointer-events-none rounded-[2px]"
          style={{
            border: "1px solid rgba(246, 196, 83, 0.35)",
            transform: "translateZ(20px)",
          }}
        >
          {/* Top-Left Corner Bracket */}
          <svg className="absolute -top-1 -left-1 w-5 h-5 text-[#F6C453]" viewBox="0 0 20 20" fill="none">
            <path d="M 0 14 L 0 0 L 14 0" stroke="currentColor" strokeWidth="2" />
            <rect x="2" y="2" width="4" height="4" fill="currentColor" />
          </svg>
          {/* Top-Right Corner Bracket */}
          <svg className="absolute -top-1 -right-1 w-5 h-5 text-[#F6C453]" viewBox="0 0 20 20" fill="none">
            <path d="M 20 14 L 20 0 L 6 0" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="2" width="4" height="4" fill="currentColor" />
          </svg>
          {/* Bottom-Left Corner Bracket */}
          <svg className="absolute -bottom-1 -left-1 w-5 h-5 text-[#F6C453]" viewBox="0 0 20 20" fill="none">
            <path d="M 0 6 L 0 20 L 14 20" stroke="currentColor" strokeWidth="2" />
            <rect x="2" y="14" width="4" height="4" fill="currentColor" />
          </svg>
          {/* Bottom-Right Corner Bracket */}
          <svg className="absolute -bottom-1 -right-1 w-5 h-5 text-[#F6C453]" viewBox="0 0 20 20" fill="none">
            <path d="M 20 6 L 20 20 L 6 20" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="14" width="4" height="4" fill="currentColor" />
          </svg>
        </div>

        {/* Layer 5: Dynamic Glass Specular Light Beam (Follows pointer) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            transform: "translateZ(26px)",
            opacity: isHovered ? 0.75 : 0.3,
            background: `radial-gradient(circle 260px at ${50 + coords.x * 70}% ${50 + coords.y * 70}%, rgba(255, 235, 175, 0.25), transparent 70%)`,
            mixBlendMode: "color-dodge",
          }}
        />

        {/* Layer 6: Floating Military & Academic Credentials Badge */}
        <div
          className="absolute top-4 right-4 z-20 pointer-events-none transition-transform duration-300"
          style={{
            transform: `translateZ(30px) translate(${coords.x * 8}px, ${coords.y * 8}px)`,
          }}
        >
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.62rem] font-mono tracking-widest uppercase font-semibold"
            style={{
              background: "rgba(11, 16, 28, 0.85)",
              border: "1px solid rgba(246, 196, 83, 0.5)",
              color: "#FFE08A",
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8553D] animate-pulse" />
            <span>US Army Vet · MPA</span>
          </div>
        </div>

        {/* Layer 7: Engraved Brass Author Plaque at the Bottom */}
        <div
          className="absolute bottom-4 inset-x-4 z-20 pointer-events-none transition-transform duration-300"
          style={{
            transform: `translateZ(28px) translate(${coords.x * 6}px, ${coords.y * 6}px)`,
          }}
        >
          <div
            className="p-3 text-center rounded border border-[rgba(246,196,83,0.4)]"
            style={{
              background: "linear-gradient(180deg, rgba(16, 24, 42, 0.92) 0%, rgba(9, 13, 22, 0.96) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
            }}
          >
            <span className="font-display font-extrabold text-white text-base tracking-wide block">
              Victor L. Evans
            </span>
            <span className="text-[0.64rem] font-mono tracking-widest text-[#F6C453] uppercase block mt-0.5">
              Author · Curse Breaker · Odenton, MD
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Micro-Cue Underneath */}
      <div className="mt-3 text-center">
        <span className="inline-flex items-center gap-2 text-[0.64rem] font-mono uppercase tracking-widest text-[#9AA6BF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F6C453] inline-block animate-ping" />
          Interactive 3D Holographic Portrait
        </span>
      </div>

      <style>{`
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
