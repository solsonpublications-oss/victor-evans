"use client";

import * as React from "react";

/**
 * Section reveal — IntersectionObserver adds .in to .reveal elements.
 * Re-runs when deps change (e.g., view switch).
 */
export function useRevealOnScroll(deps: React.DependencyList = []) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
      return;
    }

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)")
    );
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));

    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("in");
        }
      });
    });

    return () => io.disconnect();
  }, deps);
}

/**
 * Count-up — animates from 0 to target when scrolled into view.
 */
export function useCountUp(
  target: number,
  options: { duration?: number; startOnView?: boolean } = {}
) {
  const { duration = 1600, startOnView = true } = options;
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    if (!startOnView) {
      run();
      return;
    }

    if (!ref.current || !("IntersectionObserver" in window)) {
      setValue(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();

    function run() {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        setValue(Math.round(eased * target));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, [target, duration, startOnView]);

  return { ref, value };
}

/**
 * Header scroll state — frosted glass after threshold.
 */
export function useHeaderScrolled(threshold = 40) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Scroll progress — 0 at top, 1 at bottom of the given element (or page).
 */
export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollHeight > 0 ? Math.min(1, window.scrollY / scrollHeight) : 0);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

/**
 * 3D book tilt — pointer move, max 8 degrees. Disabled on touch + reduced motion.
 */
export function useCoverTilt(maxTilt = 8) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = px * maxTilt * 2;
        const rotX = -py * maxTilt * 2;
        el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
        // Move the specular sheen
        el.style.setProperty("--sheen-x", `${50 + px * 40}%`);
        el.style.setProperty("--sheen-y", `${50 + py * 40}%`);
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [maxTilt]);

  return ref;
}

/**
 * Magnetic button — leans toward the cursor.
 */
export function useMagnetic(strength = 0.3, radius = 100) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius) {
          const factor = (1 - dist / radius) * strength;
          el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
        } else {
          el.style.transform = "translate(0, 0)";
        }
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "translate(0, 0)";
    };

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return ref;
}

/**
 * Foil text cursor sweep — tracks mouse position to move the gold gradient.
 */
export function useFoilSweep() {
  const ref = React.useRef<HTMLHeadingElement | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        el.style.backgroundPosition = `${px}% 50%`;
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

/**
 * Glass card mouse tracking — updates CSS vars for the radial glow.
 */
export function useGlassCardHover() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return ref;
}
