# raycast — Raycast (Productivity Tool)

- **School**: Modern Tool / Builder SaaS
- **Vibe**: Glassy command-palette aesthetic, color extensions for personality, keyboard-first culture
- **Best for**: Productivity tools, command-palette / launcher products, dev utilities
- **Touchstone**: raycast.com, Raycast app screenshots, raycast.com/store extension cards

**Palette**
- Ground: `#0F0F11` (charcoal with hint of blue)
- Surface translucent: `rgba(255,255,255,0.06)` over a colored gradient backdrop
- Hairline: `rgba(255,255,255,0.10)`
- Primary text: `#FFFFFF`
- Secondary text: `#B0B3B8`
- Brand red accent: `#FF6363` — Raycast's signature, used on icons and key CTAs
- Extension chips: bright per-tile colors (lime, coral, lavender, cyan) used as accent dots on small surfaces only

**Typography**
- Display: Söhne weight 600, or Inter Tight weight 600
- Body: Inter at 14–15px, weight 500 (slightly heavier than Linear's 400 — Raycast feels punchier)
- Mono: SF Mono or JetBrains Mono for shortcut chips
- Letter-spacing on display: -0.02em

**Spacing**: 4 / 8 / 12 / 16 / 24 / 40 / 64

**Radius**: 8 (small) / 12 (medium) / 16 (cards) / 24 (large modal). Raycast's signature radius is the soft-corner command palette.

**Shadow**: cushiony — `0 16px 40px rgba(0,0,0,0.4)` on the command palette card; barely any shadow elsewhere

**Motion**: bouncy welcomed for key moments (the palette appearing, hover lift) — spring physics with mild overshoot. Otherwise quick 150ms ease-out.

**Signature moves**
- A floating command-palette screenshot in the hero, slightly tilted, casting a generous cushioned shadow, with a blurred colorful gradient backdrop visible through it (glass)
- Every keyboard shortcut shown as a styled chip — `⌘` `↵` `⌥` set in a precision mono with a hairline border and dim background
- Bright per-extension colors used as small accent dots on tile cards (a Notion tile has a tiny lavender dot, a GitHub tile has a charcoal one)
- Sticky color-banded gradient backdrop behind the hero (oranges → magentas, but soft-focused)
- Generously spaced section anatomy with clear hover lift on tiles

**Avoid**
- Too many bright extension colors on the same screen — they only work as small accents on a dark ground
- Solid bright-color buttons (Raycast buttons are usually translucent white pills with shortcut chips)
- Pure monochrome scenes — Raycast leans on color *just enough* to feel playful

**AI prompt seed**
> Productivity application interface, floating command palette card centered on the page, soft-focused colorful gradient backdrop in warm oranges and magentas behind it, dark charcoal foreground UI, cushioned drop shadow under the palette, no people, 16:9.

**Don't use when**
- The product isn't a launcher / command-palette / keyboard-first tool — the central glass palette image won't land otherwise
- The audience doesn't know keyboard shortcuts (they'll miss the recipe's main signal)
- A strictly enterprise tone is needed — Raycast skews playful

---

> **Same school — Modern Tool / Builder SaaS**: [`linear`](./linear.md) · [`vercel-mesh`](./vercel-mesh.md) · [`notion-pre-ai`](./notion-pre-ai.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
