"use client";

import * as React from "react";
import { DiamondDivider } from "./illustrations";

type ModalCtx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ModalContext = React.createContext<ModalCtx>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function GetBookModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  // ESC to close
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    // lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  const value = React.useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen && <GetBookModal onClose={close} />}
    </ModalContext.Provider>
  );
}

export function useGetBookModal() {
  return React.useContext(ModalContext);
}

function GetBookModal({ onClose }: { onClose: () => void }) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  // Click outside to close
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="get-book-title"
    >
      <div
        ref={panelRef}
        className="modal-panel"
        style={{ textAlign: "center" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center border"
          style={{
            borderColor: "var(--line-strong)",
            background: "transparent",
            color: "var(--fg)",
            cursor: "pointer",
            transition: "all 250ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--brick)";
            e.currentTarget.style.color = "var(--brick)";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--line-strong)";
            e.currentTarget.style.color = "var(--fg)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>

        <DiamondDivider className="mb-6" />

        <p className="label-mono-sm mb-4" style={{ color: "var(--brass)" }}>
          A note from the author
        </p>

        <h2
          id="get-book-title"
          className="display"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            color: "var(--fg)",
            marginBottom: "1rem",
          }}
        >
          The book is on the way.
        </h2>

        <p
          className="body-text-lg"
          style={{
            color: "var(--fg)",
            opacity: 0.82,
            maxWidth: "42ch",
            margin: "0 auto 1.5rem",
          }}
        >
          The Generational Curse Breaker is being prepared for publication.
          When the final cover, ISBN, and retailer links are confirmed, this
          page will be where you can order it.
        </p>

        <p
          className="display-italic"
          style={{
            color: "var(--brick)",
            fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
            marginBottom: "2rem",
          }}
        >
          &ldquo;I am not asking you to take my word for it. I am asking you
          to read the record.&rdquo;
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-brick"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <p
          className="label-mono-sm mt-6"
          style={{ color: "var(--fg-muted)", fontSize: "0.6rem" }}
        >
          First Edition · 2025 · Nonfiction
        </p>
      </div>
    </div>
  );
}
