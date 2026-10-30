"use client";

import * as React from "react";

interface InteractiveChainProps {
  className?: string;
  label?: string;
}

export function InteractiveChain({ className = "", label = "Break the curse" }: InteractiveChainProps) {
  const [isBroken, setIsBroken] = React.useState(false);
  const [sparks, setSparks] = React.useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);

  const triggerSnap = () => {
    setIsBroken(true);
    // Generate spark burst
    const newSparks = Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const speed = 25 + Math.random() * 35;
      return {
        id: Math.random(),
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
        vx: Math.cos(angle),
        vy: Math.sin(angle),
      };
    });
    setSparks(newSparks);
  };

  const resetChain = () => {
    setIsBroken(false);
    setSparks([]);
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Interactive Broken Chain motif — hover or click to snap"
        onMouseEnter={triggerSnap}
        onMouseLeave={resetChain}
        onClick={() => (isBroken ? resetChain() : triggerSnap())}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            isBroken ? resetChain() : triggerSnap();
          }
        }}
        className="relative cursor-pointer p-4 group"
      >
        <svg width="220" height="70" viewBox="0 0 220 70" fill="none" className="overflow-visible">
          <defs>
            <linearGradient id="chainGoldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C98A1B" />
              <stop offset="50%" stopColor="#FFE08A" />
              <stop offset="100%" stopColor="#C98A1B" />
            </linearGradient>
            <filter id="chainGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Link (Intact) */}
          <g
            style={{
              transform: isBroken ? "translateX(-24px) rotate(-14deg)" : "translateX(0) rotate(0)",
              transformOrigin: "45px 35px",
              transition: "transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1)",
            }}
          >
            <rect
              x="20"
              y="20"
              width="55"
              height="30"
              rx="15"
              stroke="url(#chainGoldGrad)"
              strokeWidth="5"
              fill="none"
              filter="url(#chainGlow)"
            />
          </g>

          {/* Middle Link (The one that snaps into two halves) */}
          {/* Upper half snaps up-left */}
          <g
            style={{
              transform: isBroken ? "translate(-18px, -14px) rotate(-32deg)" : "translate(0, 0) rotate(0)",
              transformOrigin: "90px 35px",
              transition: "transform 450ms cubic-bezier(0.18, 0.89, 0.32, 1.28)",
            }}
          >
            <path
              d="M 68 25 A 15 15 0 0 1 112 25 L 112 32"
              stroke="url(#chainGoldGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Lower half snaps down-right */}
          <g
            style={{
              transform: isBroken ? "translate(18px, 14px) rotate(32deg)" : "translate(0, 0) rotate(0)",
              transformOrigin: "115px 35px",
              transition: "transform 450ms cubic-bezier(0.18, 0.89, 0.32, 1.28)",
            }}
          >
            <path
              d="M 90 45 L 90 38 M 90 45 A 15 15 0 0 0 134 45"
              stroke="url(#chainGoldGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Right Link (Separates right) */}
          <g
            style={{
              transform: isBroken ? "translateX(24px) rotate(14deg)" : "translateX(0) rotate(0)",
              transformOrigin: "165px 35px",
              transition: "transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1)",
            }}
          >
            <rect
              x="135"
              y="20"
              width="55"
              height="30"
              rx="15"
              stroke="url(#chainGoldGrad)"
              strokeWidth="5"
              fill="none"
              filter="url(#chainGlow)"
            />
          </g>

          {/* Flash Flare at the snap point */}
          {isBroken && (
            <circle
              cx="105"
              cy="35"
              r="22"
              fill="#FFE08A"
              opacity="0.8"
              style={{
                filter: "blur(8px)",
                animation: "flareFade 500ms ease-out forwards",
              }}
            />
          )}

          {/* Spark Particles */}
          {sparks.map((s) => (
            <circle
              key={s.id}
              cx={105}
              cy={35}
              r={1.5 + Math.random() * 2}
              fill="#FF7A45"
              style={{
                transform: `translate(${s.x}px, ${s.y}px)`,
                opacity: 0,
                transition: "all 500ms ease-out",
                filter: "drop-shadow(0 0 4px #FFE08A)",
              }}
            />
          ))}
        </svg>

        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isBroken ? 0.6 : 0.15,
            background: "radial-gradient(circle at center, rgba(246, 196, 83, 0.25), transparent 70%)",
            filter: "blur(12px)",
          }}
        />
      </div>

      <span className="text-[0.65rem] font-mono tracking-[0.24em] uppercase text-[#F6C453] transition-colors duration-300">
        {isBroken ? "The Chain Breaks" : label}
      </span>

      <style>{`
        @keyframes flareFade {
          0% { opacity: 0.95; transform: scale(0.5); }
          50% { opacity: 0.6; transform: scale(1.4); }
          100% { opacity: 0; transform: scale(2); }
        }
      `}</style>
    </div>
  );
}
