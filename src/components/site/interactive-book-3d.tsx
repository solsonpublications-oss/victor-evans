"use client";

import * as React from "react";

interface InteractiveBook3DProps {
  className?: string;
  variant?: "hero" | "compact" | "showcase";
  priority?: boolean;
  enableScrollRotate?: boolean;
}

export function InteractiveBook3D({
  className = "",
  variant = "hero",
  priority = false,
  enableScrollRotate = true,
}: InteractiveBook3DProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Scroll-driven rotation (defaults to an initial aesthetic 3D stance)
  const initialRotY = variant === "hero" ? -16 : variant === "showcase" ? -12 : -8;
  const initialRotX = variant === "hero" ? 5 : 4;
  const initialRotZ = variant === "hero" ? -2 : 0;

  const [scrollRotY, setScrollRotY] = React.useState(initialRotY);
  const [scrollRotX, setScrollRotX] = React.useState(initialRotX);
  const [scrollRotZ, setScrollRotZ] = React.useState(initialRotZ);

  // Pointer hover & drag offsets
  const [pointerRotX, setPointerRotX] = React.useState(0);
  const [pointerRotY, setPointerRotY] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState({ rotX: 0, rotY: 0 });

  const [sheenPos, setSheenPos] = React.useState({ x: 45, y: 30 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const dragStartRef = React.useRef<{ x: number; y: number; startDragRotX: number; startDragRotY: number }>({
    x: 0,
    y: 0,
    startDragRotX: 0,
    startDragRotY: 0,
  });

  // ================= SCROLL-DRIVEN 3D ROTATION =================
  React.useEffect(() => {
    if (!enableScrollRotate || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let rafId = 0;

    const updateScrollRotation = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (variant === "hero") {
        // Hero: Rotate Y gracefully with scroll position
        const scrollY = window.scrollY || window.pageYOffset || 0;
        // Rotation begins at -16° and turns 0.1° per pixel scrolled
        const targetY = -16 + scrollY * 0.1;
        const targetX = 5 - Math.sin(scrollY * 0.0018) * 6;
        const targetZ = -2 + Math.min(6, scrollY * 0.004);

        setScrollRotY(targetY);
        setScrollRotX(targetX);
        setScrollRotZ(targetZ);

        if (!isHovered) {
          const sheenX = 35 + ((scrollY * 0.08) % 55);
          const sheenY = 25 + Math.sin(scrollY * 0.004) * 18;
          setSheenPos({ x: sheenX, y: sheenY });
        }
      } else if (variant === "showcase") {
        // Showcase: The book is sticky while scrolling through the 4 narrative beats!
        // Computes progress through the parent section (0 to 1)
        const section = containerRef.current.closest("section");
        let progress = 0;
        if (section) {
          const sRect = section.getBoundingClientRect();
          const totalScroll = sRect.height - windowH;
          if (totalScroll > 0) {
            progress = Math.max(0, Math.min(1, -sRect.top / totalScroll));
          }
        } else {
          progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
        }

        // Full 360° turnaround across the 4 beats:
        // Beat 1 (0.00 - 0.25): Front cover (-12° to 25°)
        // Beat 2 (0.25 - 0.50): Spine & 3D thickness (25° to 90°)
        // Beat 3 (0.50 - 0.75): Back cover record audit (90° to 180° to 220°)
        // Beat 4 (0.75 - 1.00): Returns smoothly to front (220° to 360° / 0°)
        const targetY = -12 + progress * 372;
        const targetX = 4 - Math.sin(progress * Math.PI) * 8;
        const targetZ = Math.sin(progress * Math.PI * 2) * 3;

        setScrollRotY(targetY);
        setScrollRotX(targetX);
        setScrollRotZ(targetZ);

        if (!isHovered) {
          const sheenX = 25 + ((progress * 180) % 65);
          setSheenPos({ x: sheenX, y: 32 });
        }
      } else {
        // Compact / General viewport-based rotation
        const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
        const targetY = -8 + (progress - 0.5) * 55;
        const targetX = 3 - (progress - 0.5) * 10;
        setScrollRotY(targetY);
        setScrollRotX(targetX);
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollRotation);
    };

    updateScrollRotation();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableScrollRotate, variant, isHovered]);

  // Handle pointer tracking for micro-tilt
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      setDragOffset({
        rotX: Math.max(-30, Math.min(30, dragStartRef.current.startDragRotX - deltaY * 0.35)),
        rotY: dragStartRef.current.startDragRotY + deltaX * 0.45,
      });
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const maxTilt = variant === "hero" ? 12 : 9;
    const targetTiltY = (px - 0.5) * maxTilt * 2;
    const targetTiltX = -(py - 0.5) * maxTilt * 2;

    setPointerRotX(targetTiltX);
    setPointerRotY(targetTiltY);
    setSheenPos({ x: px * 100, y: py * 100 });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startDragRotX: dragOffset.rotX,
      startDragRotY: dragOffset.rotY,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
    setPointerRotX(0);
    setPointerRotY(0);
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  const sizeStyles = {
    hero: {
      width: "min(76vw, 370px)",
      aspectRatio: "2 / 3",
      depth: 36, // book spine thickness
    },
    showcase: {
      width: "min(80vw, 340px)",
      aspectRatio: "2 / 3",
      depth: 32,
    },
    compact: {
      width: "240px",
      aspectRatio: "2 / 3",
      depth: 26,
    },
  }[variant];

  const depth = sizeStyles.depth;

  // Composite 3D rotation angles
  const totalRotX = scrollRotX + pointerRotX + dragOffset.rotX;
  const totalRotY = scrollRotY + pointerRotY + dragOffset.rotY + (isFlipped ? 180 : 0);
  const totalRotZ = scrollRotZ;

  // Realistic shadow scaling based on angle (narrows at edge-on 90°/270°)
  const currentCos = Math.abs(Math.cos(((totalRotY % 360) * Math.PI) / 180));
  const shadowScaleX = Math.max(0.35, currentCos) * (isHovered ? 1.15 : 1);

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        perspective: "1400px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Gentle ambient bobbing wrapper (separate from 3D rotation frame) */}
      <div className={isHovered || isDragging ? "" : "animate-gentle-float"}>
        {/* 3D Root Book Frame */}
        <div
          ref={containerRef}
          onPointerEnter={() => setIsHovered(true)}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className="relative cursor-grab active:cursor-grabbing will-change-transform"
          style={{
            width: sizeStyles.width,
            aspectRatio: sizeStyles.aspectRatio,
            transformStyle: "preserve-3d",
            transform: `rotateX(${totalRotX}deg) rotateY(${totalRotY}deg) rotateZ(${totalRotZ}deg) ${
              isHovered && !isDragging ? "translateY(-10px) scale(1.03)" : "translateY(0) scale(1)"
            }`,
            transition: isDragging
              ? "none"
              : "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease",
            touchAction: "none",
          }}
          title="Scroll to rotate · Drag to inspect in 3D"
        >
          {/* Dynamic Multi-layered Soft Drop Shadow */}
          <div
            aria-hidden="true"
            className="absolute -bottom-10 left-6 right-6 h-12 rounded-full pointer-events-none transition-all duration-300"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)",
              filter: "blur(14px)",
              transform: `translateZ(-${depth * 2}px) translateY(${isHovered ? 14 : 0}px) scaleX(${shadowScaleX})`,
              opacity: isHovered ? 0.9 : 0.65,
            }}
          />

        {/* ================= FRONT COVER FACE ================= */}
        <div
          className="absolute inset-0 rounded-[3px] overflow-hidden bg-[#0A0D14]"
          style={{
            transform: `translateZ(${depth / 2}px)`,
            backfaceVisibility: "hidden",
            boxShadow: `
              0 0 0 1px rgba(246, 196, 83, 0.25),
              inset 0 0 18px rgba(0,0,0,0.5),
              2px 4px 16px rgba(0,0,0,0.6)
            `,
          }}
        >
          {/* Cover Art */}
          <picture>
            <img
              src="/cover.jpg"
              alt="The Generational Curse Breaker by Victor L. Evans — Hardcover front cover"
              width={1024}
              height={1536}
              fetchPriority={priority ? "high" : "auto"}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover block pointer-events-none"
            />
          </picture>

          {/* Hardcover Outer Bevel & Hinge Dent */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[18px] w-[3px] pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.45), rgba(255,255,255,0.12), rgba(0,0,0,0.5))",
              boxShadow: "inset 0 0 2px rgba(0,0,0,0.8)",
            }}
          />

          {/* Golden Gilded Sheen (Tracks Pointer) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.75 : 0.35,
              background: `radial-gradient(circle 220px at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 230, 150, 0.42), rgba(246, 196, 83, 0.15) 40%, transparent 70%)`,
              mixBlendMode: "color-dodge",
            }}
          />

          {/* Title Area Gilded Foil Shimmer */}
          <div
            aria-hidden="true"
            className="absolute top-[28%] left-[10%] right-[10%] h-[24%] pointer-events-none opacity-40 mix-blend-overlay"
            style={{
              background: `linear-gradient(${sheenPos.x * 2}deg, transparent 20%, rgba(255, 235, 170, 0.8) 50%, transparent 80%)`,
            }}
          />

          {/* Fine Paper / Leatherette Grain Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: "radial-gradient(#FFE08A 0.5px, transparent 0.5px)",
              backgroundSize: "4px 4px",
            }}
          />
        </div>

        {/* ================= BACK COVER FACE (Visible on 180° Flip) ================= */}
        <div
          className="absolute inset-0 rounded-[3px] p-7 flex flex-col justify-between overflow-hidden bg-[#0C1220] text-[#F3EEE4]"
          style={{
            transform: `translateZ(-${depth / 2}px) rotateY(180deg)`,
            backfaceVisibility: "hidden",
            boxShadow: `
              0 0 0 1px rgba(246, 196, 83, 0.3),
              inset 0 0 28px rgba(0,0,0,0.7)
            `,
          }}
        >
          {/* Subtle gold etched frame */}
          <div className="absolute inset-3 border border-[rgba(246,196,83,0.3)] pointer-events-none rounded-[2px]" />

          {/* Top Header */}
          <div className="relative z-10 pt-2 text-center">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#F6C453] block">
              Official Nonfiction Record
            </span>
            <h4 className="font-display font-bold text-lg text-white mt-1">
              The Generational Curse Breaker
            </h4>
          </div>

          {/* Middle Excerpt */}
          <div className="relative z-10 space-y-3 text-xs leading-relaxed opacity-90 px-2">
            <blockquote className="font-display italic text-sm text-[#FFE08A] border-l-2 border-[#C8553D] pl-3 py-0.5">
              &ldquo;I am not asking anyone to take my word for it. I am asking people to read the record.&rdquo;
            </blockquote>
            <p className="text-[0.78rem] text-slate-300">
              A brick row house in Northeast Washington paid off by hand. Thirty years of documentation. Six formal demands for justice.
            </p>
            <div className="pt-2 border-t border-[rgba(246,196,83,0.2)]">
              <span className="text-[0.68rem] tracking-wider uppercase text-[#F6C453] font-semibold block">
                Includes Documentation From:
              </span>
              <p className="text-[0.7rem] text-slate-400 mt-0.5">
                Metropolitan Police Dept · Adult Protective Services · FBI · U.S. Congress · Dept of Veterans Affairs
              </p>
            </div>
          </div>

          {/* Bottom Barcode / Imprint */}
          <div className="relative z-10 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[0.65rem] text-slate-400 font-mono">
            <div>
              <span className="block text-white font-semibold">VICTOR L. EVANS</span>
              <span>First Edition · 2025</span>
            </div>
            {/* Stylized Barcode SVG */}
            <div className="bg-white/95 px-2 py-1 rounded">
              <svg width="70" height="22" viewBox="0 0 70 22" fill="none">
                <rect x="2" y="2" width="2" height="18" fill="#111" />
                <rect x="6" y="2" width="1" height="18" fill="#111" />
                <rect x="9" y="2" width="3" height="18" fill="#111" />
                <rect x="14" y="2" width="1" height="18" fill="#111" />
                <rect x="17" y="2" width="2" height="18" fill="#111" />
                <rect x="21" y="2" width="4" height="18" fill="#111" />
                <rect x="27" y="2" width="1" height="18" fill="#111" />
                <rect x="30" y="2" width="2" height="18" fill="#111" />
                <rect x="34" y="2" width="3" height="18" fill="#111" />
                <rect x="39" y="2" width="1" height="18" fill="#111" />
                <rect x="42" y="2" width="2" height="18" fill="#111" />
                <rect x="46" y="2" width="3" height="18" fill="#111" />
                <rect x="51" y="2" width="1" height="18" fill="#111" />
                <rect x="54" y="2" width="4" height="18" fill="#111" />
                <rect x="60" y="2" width="2" height="18" fill="#111" />
                <rect x="64" y="2" width="3" height="18" fill="#111" />
              </svg>
            </div>
          </div>
        </div>

        {/* ================= LEFT SPINE ================= */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 bg-[#090D18] flex items-center justify-center overflow-hidden"
          style={{
            width: `${depth}px`,
            transform: `translateX(-${depth / 2}px) rotateY(-90deg)`,
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)",
            borderLeft: "1px solid rgba(246, 196, 83, 0.3)",
            borderRight: "1px solid rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Raised Spine Ribs */}
          <div className="absolute inset-x-0 top-8 h-[2px] bg-[rgba(246,196,83,0.3)] shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
          <div className="absolute inset-x-0 bottom-8 h-[2px] bg-[rgba(246,196,83,0.3)] shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />

          {/* Spine Title (Vertical Gold Text) */}
          <div
            className="transform -rotate-90 whitespace-nowrap flex items-center gap-4 text-[0.62rem] font-bold tracking-[0.26em] uppercase"
            style={{
              color: "#FFE08A",
              textShadow: "0 1px 3px rgba(0,0,0,0.9)",
              filter: "drop-shadow(0 0 4px rgba(246,196,83,0.3))",
            }}
          >
            <span>The Generational Curse Breaker</span>
            <span className="text-[#C8553D]">◆</span>
            <span className="text-white/80">Victor L. Evans</span>
          </div>
        </div>

        {/* ================= RIGHT PAGE EDGES (Gilded Gold Trim) ================= */}
        <div
          aria-hidden="true"
          className="absolute top-[2px] bottom-[2px] right-0 flex overflow-hidden"
          style={{
            width: `${depth}px`,
            transform: `translateX(${depth / 2}px) rotateY(90deg)`,
            background: "linear-gradient(to right, #B7791F 0%, #FFE08A 25%, #E8DCC4 50%, #B7791F 100%)",
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
          }}
        >
          {/* Repeated page striations */}
          <div
            className="w-full h-full opacity-35"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
            }}
          />
        </div>

        {/* ================= TOP PAGE EDGES ================= */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-[2px] right-[2px]"
          style={{
            height: `${depth}px`,
            transform: `translateY(-${depth / 2}px) rotateX(90deg)`,
            background: "linear-gradient(to bottom, #FFE08A, #D4B05E 40%, #1A2234 100%)",
            opacity: 0.9,
          }}
        />

        {/* ================= BOTTOM PAGE EDGES ================= */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[2px] right-[2px]"
          style={{
            height: `${depth}px`,
            transform: `translateY(${depth / 2}px) rotateX(-90deg)`,
            background: "linear-gradient(to top, #1A2234, #D4B05E 60%, #FFE08A 100%)",
            opacity: 0.9,
          }}
        />
        </div>
      </div>

      {/* Floating 3D Interaction Control Pill */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={toggleFlip}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[0.68rem] font-mono tracking-widest uppercase transition-all duration-300"
          style={{
            background: "rgba(15, 22, 38, 0.75)",
            backdropFilter: "blur(8px)",
            color: "var(--gold-2)",
            border: "1px solid var(--line-strong)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--gold)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--line-strong)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          </svg>
          <span>{isFlipped ? "View Front Cover" : "Flip & Inspect Back"}</span>
        </button>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[0.64rem] font-mono uppercase tracking-wider text-slate-400 opacity-75">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
          Rotates on scroll · Drag in 3D
        </span>
      </div>
    </div>
  );
}
