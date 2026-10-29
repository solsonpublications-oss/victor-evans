#!/usr/bin/env python3
"""
Migrate `var(--bg)` text-color references inside ink sections to `var(--on-ink)`.
The `--on-ink` token is always light cream, regardless of theme, which is what
we want for text on dark/ink sections.

Files to migrate (all components that render inside .bg-ink-grain):
"""
from pathlib import Path

# Components that render inside .bg-ink-grain sections.
# In these files, `var(--bg)` used as a TEXT color should become `var(--on-ink)`.
INK_FILES = [
    "/home/z/my-project/src/components/site/hero.tsx",
    "/home/z/my-project/src/components/site/about-book.tsx",
    "/home/z/my-project/src/components/site/closing-cta.tsx",
    "/home/z/my-project/src/components/site/site-footer.tsx",
    "/home/z/my-project/src/components/site/not-found-view.tsx",
    "/home/z/my-project/src/components/site/tabs/system-tab.tsx",
]


def migrate(path: str) -> int:
    p = Path(path)
    content = p.read_text(encoding="utf-8")
    original = content

    # Only replace color: var(--bg) (text color), NOT background-color: var(--bg)
    # The pattern: color: "var(--bg)" or color: var(--bg) used as inline text color
    content = content.replace('color: "var(--bg)"', 'color: "var(--on-ink)"')
    content = content.replace("color: var(--bg)", "color: var(--on-ink)")

    # Also handle the .bg-ink-grain's color which is now set in CSS,
    # but some components explicitly set color: var(--bg) which overrides.
    # Those should use --on-ink instead.

    if content != original:
        p.write_text(content, encoding="utf-8")
        return 1
    return 0


def main():
    changed = 0
    for f in INK_FILES:
        if migrate(f):
            changed += 1
            print(f"  migrated: {f}")
    print(f"\n{changed}/{len(INK_FILES)} files migrated.")


if __name__ == "__main__":
    main()
