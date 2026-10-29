#!/usr/bin/env python3
"""
Migrate color tokens from v3 (bg/fg/on-ink) to v4 (Storm/Dawn).
"""
from pathlib import Path

FILES = [
    "/home/z/my-project/src/components/site/hero.tsx",
    "/home/z/my-project/src/components/site/about-author.tsx",
    "/home/z/my-project/src/components/site/about-book.tsx",
    "/home/z/my-project/src/components/site/closing-cta.tsx",
    "/home/z/my-project/src/components/site/site-footer.tsx",
    "/home/z/my-project/src/components/site/site-header.tsx",
    "/home/z/my-project/src/components/site/press-view.tsx",
    "/home/z/my-project/src/components/site/privacy-view.tsx",
    "/home/z/my-project/src/components/site/not-found-view.tsx",
    "/home/z/my-project/src/components/site/the-record.tsx",
    "/home/z/my-project/src/components/site/get-book-modal.tsx",
    "/home/z/my-project/src/components/site/theme-toggle.tsx",
    "/home/z/my-project/src/components/site/tabs/timeline-tab.tsx",
    "/home/z/my-project/src/components/site/tabs/family-tab.tsx",
    "/home/z/my-project/src/components/site/tabs/system-tab.tsx",
    "/home/z/my-project/src/components/site/tabs/demands-tab.tsx",
    "/home/z/my-project/src/components/site/tabs/read-inside-tab.tsx",
]

REPLACEMENTS = [
    # Token renames
    ("var(--fg-muted)", "var(--text-dim)"),
    ("var(--fg)", "var(--text)"),
    ("var(--on-ink-muted)", "var(--on-dark-dim)"),
    ("var(--on-ink)", "var(--on-dark)"),
    ("var(--brass-2)", "var(--gold-2)"),
    ("var(--brass)", "var(--gold)"),
    ("var(--brick-2)", "var(--brick)"),  # brick-2 merged into brick
    # bg-2 → surface, bg-3 → surface-2
    ("var(--bg-3)", "var(--surface-2)"),
    ("var(--bg-2)", "var(--surface)"),
    # Class renames
    ("bg-ink-grain", "storm-section"),
    # btn class renames
    ("btn-outline-paper", "btn-outline-light"),
    # Header bg references
    ("var(--header-bg-scrolled)", "var(--header-bg-scrolled)"),  # same
    # Old amber/ember cleanup
    ("var(--amber-2)", "var(--ember)"),
    ("var(--amber)", "var(--ember)"),
    # rgba references
    ("rgba(212, 176, 94,", "rgba(246, 196, 83,"),  # brass → gold
    ("rgba(212, 149, 80,", "rgba(255, 122, 69,"),  # amber → ember
    ("rgba(237, 228, 209,", "rgba(243, 238, 228,"),  # old paper → text
    ("rgba(184, 145, 63,", "rgba(246, 196, 83,"),  # old brass → gold
]


def migrate(path: str) -> int:
    p = Path(path)
    if not p.exists():
        return 0
    content = p.read_text(encoding="utf-8")
    original = content
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    if content != original:
        p.write_text(content, encoding="utf-8")
        return 1
    return 0


def main():
    changed = 0
    for f in FILES:
        if migrate(f):
            changed += 1
            print(f"  migrated: {f}")
    print(f"\n{changed}/{len(FILES)} files migrated.")


if __name__ == "__main__":
    main()
