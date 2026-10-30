"use client";

import * as React from "react";

/**
 * CinematicHeroScene — the layered parallax hero background.
 *
 * Layers (back to front):
 * 1. Sky gradient (storm → dawn, scroll-linked)
 * 2. Giant faceless silhouette (drifting, parallax)
 * 3. Storm clouds
 * 4. Capitol dome + park lamps horizon
 * 5. Brick row house with breathing lit window
 * 6. Stone steps with broken chain
 *
 * All colors come from CSS variables so the scene re-colors on theme switch.
 * Parallax is driven by pointer position and scroll.
 */
export function CinematicHeroScene({
  scrollProgress = 0,
  className = "",
}: {
  scrollProgress?: number;
  className?: string;
}) {
  // scrollProgress: 0 at top of page, 1 at bottom of hero
  const horizonOpacity = Math.min(1, scrollProgress * 1.5);
  const skyShift = scrollProgress * 20; // sky shifts up as you scroll

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        style={{
          width: "100%",
          height: "100%",
          transform: `translateY(${skyShift}px)`,
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky gradient — changes with theme via CSS vars */}
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sky-top)" />
            <stop offset="50%" stopColor="var(--sky-mid)" />
            <stop offset="100%" stopColor="var(--sky-bottom)" />
          </linearGradient>

          {/* Horizon sunset glow */}
          <radialGradient id="horizonGlow" cx="0.3" cy="0.7" r="0.5">
            <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
          </radialGradient>

          {/* Window glow */}
          <radialGradient id="windowGlow" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="var(--window)" stopOpacity="0.95" />
            <stop offset="60%" stopColor="var(--window)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--window)" stopOpacity="0" />
          </radialGradient>

          {/* Cloud gradient */}
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--storm)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--storm)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Sky base */}
        <rect width="1440" height="900" fill="url(#sky)" />

        {/* Layer 1b: Twinkling night sky stars */}
        <g opacity="0.75">
          {[
            { cx: 120, cy: 80, r: 1.2, d: "0s" },
            { cx: 280, cy: 60, r: 1.5, d: "1.2s" },
            { cx: 440, cy: 110, r: 1.0, d: "2.4s" },
            { cx: 620, cy: 75, r: 1.4, d: "0.8s" },
            { cx: 780, cy: 130, r: 1.1, d: "1.8s" },
            { cx: 960, cy: 90, r: 1.6, d: "3.1s" },
            { cx: 1120, cy: 70, r: 1.3, d: "2.1s" },
            { cx: 1300, cy: 120, r: 1.5, d: "0.5s" },
            { cx: 200, cy: 140, r: 1.0, d: "1.5s" },
            { cx: 850, cy: 50, r: 1.2, d: "2.7s" },
          ].map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#FFE08A"
              style={{
                animation: `starTwinkle 3.2s ease-in-out infinite`,
                animationDelay: star.d,
              }}
            />
          ))}
        </g>

        {/* Horizon sunset glow */}
        <rect
          width="1440"
          height="900"
          fill="url(#horizonGlow)"
          opacity={0.5 + horizonOpacity * 0.5}
        />

        {/* Layer 2: Giant faceless silhouette in the clouds */}
        <g
          opacity="0.15"
          style={{
            transform: `translateX(${scrollProgress * -15}px)`,
            transition: "transform 100ms linear",
          }}
        >
          {/* Head and shoulders — no face */}
          <ellipse cx="950" cy="280" rx="70" ry="85" fill="var(--text)" />
          <path
            d="M 820 420 Q 820 360 880 340 L 1020 340 Q 1080 360 1080 420 L 1080 550 L 820 550 Z"
            fill="var(--text)"
          />
        </g>

        {/* Layer 3: Storm clouds */}
        <g opacity="0.5">
          <ellipse cx="200" cy="200" rx="180" ry="40" fill="url(#cloudGrad)" />
          <ellipse cx="500" cy="150" rx="220" ry="50" fill="url(#cloudGrad)" />
          <ellipse cx="900" cy="180" rx="200" ry="45" fill="url(#cloudGrad)" />
          <ellipse cx="1200" cy="220" rx="180" ry="40" fill="url(#cloudGrad)" />
        </g>

        {/* Layer 4: Capitol dome + park lamps horizon */}
        <g
          opacity={horizonOpacity}
          style={{ transition: "opacity 400ms ease" }}
        >
          {/* Capitol dome */}
          <g transform="translate(560 580)">
            <path
              d="M 0 60 Q 0 20 40 10 Q 50 0 60 0 Q 70 0 80 10 Q 120 20 120 60 Z"
              fill="var(--storm)"
              opacity="0.5"
            />
            <line x1="60" y1="-10" x2="60" y2="0" stroke="var(--storm)" strokeWidth="2" opacity="0.5" />
            <circle cx="60" cy="-12" r="3" fill="var(--storm)" opacity="0.5" />
          </g>
          {/* Distant trees/skyline */}
          <path
            d="M 0 640 L 100 620 L 180 635 L 300 615 L 420 630 L 700 625 L 820 610 L 950 630 L 1100 620 L 1250 635 L 1440 625 L 1440 660 L 0 660 Z"
            fill="var(--storm)"
            opacity="0.3"
          />
          {/* Park lamps — light up with scroll */}
          {[150, 350, 1150, 1350].map((x, i) => (
            <g key={x}>
              <line
                x1={x}
                y1="640"
                x2={x}
                y2="600"
                stroke="var(--storm)"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <circle
                cx={x}
                cy="598"
                r="3"
                fill="var(--gold-2)"
                opacity={Math.min(1, Math.max(0, (scrollProgress - i * 0.15) * 3))}
                style={{ transition: "opacity 300ms ease" }}
              />
              <circle
                cx={x}
                cy="598"
                r="8"
                fill="var(--gold-2)"
                opacity={Math.min(0.3, Math.max(0, (scrollProgress - i * 0.15) * 0.6))}
                style={{ transition: "opacity 300ms ease" }}
              />
            </g>
          ))}
        </g>

        {/* Layer 5: Brick row house with lit window */}
        <g transform="translate(200 460)">
          {/* House silhouette */}
          <path
            d="M 0 200 L 0 80 L 60 40 L 240 40 L 300 80 L 300 200 Z"
            fill="var(--surface-2)"
            opacity="0.8"
            stroke="var(--text)"
            strokeWidth="1.5"
            strokeOpacity="0.25"
          />
          {/* Roof line */}
          <path
            d="M 0 80 L 60 40 L 240 40 L 300 80"
            fill="none"
            stroke="var(--text)"
            strokeWidth="1.5"
            strokeOpacity="0.2"
          />
          {/* Brick coursing */}
          {[110, 130, 150, 170].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="300"
              y2={y}
              stroke="var(--text)"
              strokeWidth="0.5"
              strokeOpacity="0.06"
            />
          ))}

          {/* Upper-left window — THE lit window (breathing glow) */}
          <rect
            x="40"
            y="100"
            width="50"
            height="50"
            fill="url(#windowGlow)"
            style={{
              animation: "windowBreathe 4s ease-in-out infinite",
            }}
          />
          {/* Window frame */}
          <rect
            x="40"
            y="100"
            width="50"
            height="50"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <line x1="65" y1="100" x2="65" y2="150" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="40" y1="125" x2="90" y2="125" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.3" />

          {/* Upper-right window (dark) */}
          <rect x="210" y="100" width="50" height="50" fill="var(--bg)" opacity="0.5" />
          <rect x="210" y="100" width="50" height="50" fill="none" stroke="var(--text)" strokeWidth="0.5" strokeOpacity="0.1" />

          {/* Door */}
          <rect x="140" y="150" width="40" height="50" fill="var(--bg)" opacity="0.4" />
          <circle cx="172" cy="175" r="1.5" fill="var(--gold)" opacity="0.5" />

          {/* Front stoop */}
          <path d="M 130 200 L 130 210 L 190 210 L 190 200" fill="var(--text)" fillOpacity="0.08" />
          <path d="M 125 210 L 125 218 L 195 218 L 195 210" fill="var(--text)" fillOpacity="0.06" />
          <path d="M 120 218 L 120 224 L 200 224 L 200 218" fill="var(--text)" fillOpacity="0.04" />
        </g>

        {/* Layer 6: Broken chain on the steps */}
        <g transform="translate(300 690)" opacity="0.7">
          {/* Left chain link — intact */}
          <ellipse
            cx="0"
            cy="0"
            rx="18"
            ry="12"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeOpacity="0.6"
          />
          {/* Right chain link — broken, separated */}
          <path
            d="M 40 -8 Q 55 -8 55 0 Q 55 8 40 8"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />
          <path
            d="M 80 -8 Q 65 -8 65 0"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 80 8 Q 65 8 65 0"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
          {/* Break spark */}
          <circle cx="62" cy="0" r="1.5" fill="var(--gold-2)" opacity="0.9" />
          <circle cx="62" cy="0" r="4" fill="var(--gold-2)" opacity="0.2" />
        </g>

        {/* Ground/street */}
        <rect y="660" width="1440" height="240" fill="var(--bg)" opacity="0.3" />

        {/* Lightning flash — Dark mode only, very rare, very soft */}
        <rect
          width="1440"
          height="400"
          fill="var(--text)"
          style={{
            animation: "lightningFlash 14s ease-in-out infinite",
            animationDelay: "5s",
          }}
          opacity="0"
        />
      </svg>

      {/* Vignette overlay — lighter so scene is visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(7, 11, 20, 0.3) 60%, rgba(7, 11, 20, 0.7) 90%)",
        }}
      />
    </div>
  );
}

/**
 * ParticleCanvas — ember (dark) or dust (light) particles.
 * Canvas 2D, capped at 50 particles, paused when off-screen.
 */
export function ParticleCanvas({
  count = 50,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let animId = 0;
    let lastTime = 0;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      hue: number;
    }[] = [];

    const spawn = () => {
      const x = Math.random() * w;
      const y = h + Math.random() * 20;
      const drift = (Math.random() - 0.5) * 0.5;
      particles.push({
        x,
        y,
        vx: drift,
        vy: -0.3 - Math.random() * 0.5,
        size: 1 + Math.random() * 2,
        life: 0,
        maxLife: 200 + Math.random() * 200,
        hue: Math.random() > 0.5 ? 35 : 25, // gold or ember
      });
    };

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      // Check if canvas is visible
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        animId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Spawn particles
      while (particles.length < count) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt * 0.1;
        p.y += p.vy * dt * 0.1;
        p.life += dt;

        if (p.life > p.maxLife || p.y < -20) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsla(${p.hue}, 80%, 60%, ${alpha})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        lastTime = 0;
        animId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
