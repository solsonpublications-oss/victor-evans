"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { AboutAuthor } from "@/components/site/about-author";
import { AboutBook } from "@/components/site/about-book";
import { TheRecord } from "@/components/site/the-record";
import { ClosingCTA } from "@/components/site/closing-cta";
import { SiteFooter } from "@/components/site/site-footer";
import { useRevealOnScroll } from "@/components/site/hooks/motion";

export default function Page() {
  // Reveal-on-scroll for all .reveal elements. Skips if reduced motion.
  useRevealOnScroll();

  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <AboutAuthor />
        <AboutBook />
        <TheRecord />
        <ClosingCTA />
      </main>
      <SiteFooter />
    </>
  );
}
