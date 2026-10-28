"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { AboutAuthor } from "@/components/site/about-author";
import { AboutBook } from "@/components/site/about-book";
import { TheRecord } from "@/components/site/the-record";
import { ClosingCTA } from "@/components/site/closing-cta";
import { PressView } from "@/components/site/press-view";
import { PrivacyView } from "@/components/site/privacy-view";
import { NotFoundView } from "@/components/site/not-found-view";
import { SiteFooter } from "@/components/site/site-footer";
import { useRevealOnScroll } from "@/components/site/hooks/motion";
import { useView } from "@/components/site/view-provider";

export default function Page() {
  // Reveal-on-scroll for all .reveal elements. Re-runs when the view changes
  // so newly-mounted .reveal elements get observed. Skips if reduced motion.
  const { view } = useView();
  useRevealOnScroll([view]);

  return (
    <>
      <SiteHeader />
      <main id="main">
        {view === "home" && (
          <>
            <Hero />
            <AboutAuthor />
            <AboutBook />
          </>
        )}
        {view === "record" && <TheRecord />}
        {view === "contact" && <ClosingCTA />}
        {view === "press" && <PressView />}
        {view === "privacy" && <PrivacyView />}
        {view === "404" && <NotFoundView />}
      </main>
      <SiteFooter />
    </>
  );
}
