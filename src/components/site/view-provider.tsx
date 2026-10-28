"use client";

import * as React from "react";

export type ViewId =
  | "home"
  | "record"
  | "press"
  | "privacy"
  | "contact"
  | "404";

type ViewCtx = {
  view: ViewId;
  setView: (v: ViewId) => void;
};

const ViewContext = React.createContext<ViewCtx>({
  view: "home",
  setView: () => {},
});

const STORAGE_KEY = "gcb-view";

/**
 * View provider — manages which "page" the single-page app shows.
 * The home view is short (Hero + Author + Book + Footer). Other views render
 * their own content + footer. URL stays at `/` per sandbox constraint, but
 * we sync to the URL hash so the back button and deep links still work.
 */
export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = React.useState<ViewId>("home");

  // Initial sync from URL hash
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    const valid: ViewId[] = ["home", "record", "press", "privacy", "contact", "404"];
    if (valid.includes(hash as ViewId)) {
      setViewState(hash as ViewId);
    } else {
      setViewState("home");
    }
  }, []);

  // Listen to hashchange (back/forward)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onHash = () => {
      const hash = window.location.hash.replace("#", "") as ViewId;
      const valid: ViewId[] = ["home", "record", "press", "privacy", "contact", "404"];
      if (valid.includes(hash)) {
        setViewState(hash);
      } else {
        setViewState("home");
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setView = React.useCallback((v: ViewId) => {
    setViewState(v);
    if (typeof window !== "undefined") {
      const newHash = v === "home" ? "" : `#${v}`;
      if (window.location.hash !== newHash) {
        history.pushState(null, "", newHash || window.location.pathname);
      }
      // scroll to top on view change
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const value = React.useMemo(() => ({ view, setView }), [view, setView]);

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}

export function useView() {
  return React.useContext(ViewContext);
}
