#!/usr/bin/env python3
"""
Migrate color tokens from v1 (paper/ink/mist) to v2 (bg/fg/fg-muted).
"""

import re
from pathlib import Path

FILES = [
    "/home/z/my-project/src/components/site/closing-cta.tsx",
    "/home/z/my-project/src/components/site/illustrations.tsx",
    "/home/z/my-project/src/components/site/the-record.tsx",
    "/home/z/my-project/src/components/site/site-footer.tsx",
    "/home/z/my-project/src/components/site/tabs/family-tab.tsx",
    "/home/z/my-project/src/components/site/tabs/read-inside-tab.tsx",
    "/home/z/my-project/src/components/site/tabs/demands-tab.tsx",
    "/home/z/my-project/src/components/site/tabs/system-tab.tsx",
    "/home/z/my-project/src/components/site/tabs/timeline-tab.tsx",
]

REPLACEMENTS = [
    ("var(--paper-3)", "var(--bg-3)"),
    ("var(--paper-2)", "var(--bg-2)"),
    ("var(--paper)", "var(--bg)"),
    ("var(--ink-25)", "var(--line-strong)"),
    ("var(--ink-15)", "var(--line)"),
    ("var(--ink-3)", "var(--bg-3)"),
    ("var(--ink-2)", "var(--bg-2)"),
    ("var(--ink)", "var(--fg)"),
    ("var(--mist)", "var(--fg-muted)"),
    ("text-paper", "text-bg"),
    ("text-ink", "text-fg"),
    ("text-mist", "text-fg-muted"),
    ("bg-paper", "bg-bg"),
    ("#F1E8D8", "#F4ECD8"),
    ("#14110F", "#1F1814"),
    ("#1E1A17", "#2A2218"),
    ("#2A2420", "#2F271F"),
    ("#9C948A", "#5C544A"),
]


def migrate(path: str) -> int:
    p = Path(path)
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
