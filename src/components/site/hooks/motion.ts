"use client";

import * as React from "react";

/**
 * Section reveal — IntersectionObserver adds .in to .reveal elements.
 * Reduced-motion: .reveal is forced visible via CSS @media query.
 *
 * Pass a `deps` array (e.g., the current view) so the observer re-runs when
 * the view changes and new .reveal elements mount.
 */
export function useRevealOnScroll(deps: React.DependencyList = []) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      // CSS handles forcing .reveal visible. Nothing to do.
      // But still force .in on any new elements to be safe.
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
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));

    // Also immediately reveal any elements already in the viewport on view switch
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
 * Count-up — animates a number from 0 to target when scrolled into view.
 * Reduced-motion: renders the target value immediately.
 */
export function useCountUp(
  target: number,
  options: { duration?: number; startOnView?: boolean } = {}
) {
  const { duration = 1400, startOnView = true } = options;
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
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();

    function run() {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setValue(Math.round(eased * target));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, [target, duration, startOnView]);

  return { ref, value };
}

/**
 * Header scroll state — adds blur + brass underline after 40px scroll.
 * Single passive listener, rAF throttled.
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
 * Book cover 3D tilt — pointer move, max 6 degrees. Disabled on touch and reduced motion.
 */
export function useCoverTilt(maxTilt = 6) {
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
