"use client";

import * as React from "react";
import { TimelineTab } from "./tabs/timeline-tab";
import { FamilyTab } from "./tabs/family-tab";
import { SystemTab } from "./tabs/system-tab";
import { DemandsTab } from "./tabs/demands-tab";
import { ReadInsideTab } from "./tabs/read-inside-tab";

type TabId = "timeline" | "family" | "system" | "demands" | "inside";

const TABS: { id: TabId; label: string; hash: string }[] = [
  { id: "timeline", label: "The Timeline", hash: "#timeline" },
  { id: "family", label: "The Family", hash: "#family" },
  { id: "system", label: "The System", hash: "#system" },
  { id: "demands", label: "The Six Demands", hash: "#demands" },
  { id: "inside", label: "Read Inside", hash: "#inside" },
];

export function TheRecord() {
  const [active, setActive] = React.useState<TabId>("timeline");
  const tablistRef = React.useRef<HTMLDivElement | null>(null);
  const triggersRef = React.useRef<Record<TabId, HTMLButtonElement | null>>({
    timeline: null,
    family: null,
    system: null,
    demands: null,
    inside: null,
  });

  // Deep-linkable: open the tab matching the URL hash on mount, and update
  // the hash when the tab changes (without scrolling).
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    const match = TABS.find((t) => t.id === hash);
    if (match) setActive(match.id);
  }, []);

  const select = (id: TabId) => {
    setActive(id);
    if (typeof window !== "undefined") {
      const newHash = `#${id}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, "", newHash);
      }
    }
    triggersRef.current[id]?.focus();
  };

  // Keyboard: arrow keys, Home, End (roving tabindex)
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = TABS.findIndex((t) => t.id === active);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    select(TABS[next].id);
  };

  return (
    <section
      id="record"
      className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-5 md:px-8"
      aria-label="The Record"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="label-mono-sm text-brass">§ 03</span>
          <span className="label-mono-sm" style={{ color: "var(--text-dim)" }}>
            The Record
          </span>
        </div>

        <h2
          className="display reveal text-balance mb-6"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.4rem)",
            color: "var(--text)",
          }}
        >
          Open the file.
        </h2>
        <p
          className="lede reveal mb-10 measure"
          style={{ color: "var(--text)", opacity: 0.8 }}
        >
          Five tabs. The Timeline. The Family. The System. The Six Demands.
          Read Inside. Each one a layer of the record — read them in order, or
          jump straight to what matters to you.
        </p>

        {/* Tab list — horizontally scrollable on small screens */}
        <div
          ref={tablistRef}
          className="tab-list reveal"
          role="tablist"
          aria-label="The Record"
          onKeyDown={onKeyDown}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              ref={(el) => {
                triggersRef.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={active === t.id ? 0 : -1}
              data-state={active === t.id ? "active" : "inactive"}
              className="tab-trigger"
              onClick={() => select(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panels — all rendered for SEO; hidden via display:none when not active */}
        <div className="mt-10">
          <div
            role="tabpanel"
            id="panel-timeline"
            aria-labelledby="tab-timeline"
            hidden={active !== "timeline"}
            tabIndex={0}
            style={active === "timeline" ? { animation: "panelFade 350ms ease-out" } : undefined}
          >
            {active === "timeline" && <TimelineTab />}
          </div>
          <div
            role="tabpanel"
            id="panel-family"
            aria-labelledby="tab-family"
            hidden={active !== "family"}
            tabIndex={0}
            style={active === "family" ? { animation: "panelFade 350ms ease-out" } : undefined}
          >
            {active === "family" && <FamilyTab />}
          </div>
          <div
            role="tabpanel"
            id="panel-system"
            aria-labelledby="tab-system"
            hidden={active !== "system"}
            tabIndex={0}
            style={active === "system" ? { animation: "panelFade 350ms ease-out" } : undefined}
          >
            {active === "system" && <SystemTab />}
          </div>
          <div
            role="tabpanel"
            id="panel-demands"
            aria-labelledby="tab-demands"
            hidden={active !== "demands"}
            tabIndex={0}
            style={active === "demands" ? { animation: "panelFade 350ms ease-out" } : undefined}
          >
            {active === "demands" && <DemandsTab />}
          </div>
          <div
            role="tabpanel"
            id="panel-inside"
            aria-labelledby="tab-inside"
            hidden={active !== "inside"}
            tabIndex={0}
            style={active === "inside" ? { animation: "panelFade 350ms ease-out" } : undefined}
          >
            {active === "inside" && <ReadInsideTab />}
          </div>
        </div>
      </div>
    </section>
  );
}
