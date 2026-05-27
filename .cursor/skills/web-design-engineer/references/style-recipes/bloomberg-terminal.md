# bloomberg-terminal — Bloomberg Terminal

- **School**: Information Architecture
- **Vibe**: Maximum data-ink, mission-critical density, chrome-amber on near-black
- **Best for**: Finance / trading / monitoring dashboards, "professionals don't have time for whitespace" products
- **Touchstone**: a real Bloomberg Terminal screenshot (always reference the real thing — it's denser than memory suggests)

**Palette**
- Ground: `#0A0E1A` (deep navy-black)
- Surface 1: `#11172A`
- Surface 2: `#1A2138`
- Amber primary: `#FFA02F` (the signature)
- Positive (price-up): `#00B96B`
- Negative (price-down): `#F23645`
- Muted label: `#5E6680`
- High-importance text: `#E8ECF4`

**Typography**
- Display & body: a monospaced workhorse — IBM Plex Mono, JetBrains Mono, or Berkeley Mono. Bloomberg itself uses a proprietary mono.
- Sizes: 11 / 12 / 13 / 14px — densely packed. No 16px body. No 32px headlines.
- All numerals tabular-aligned (right-aligned columns of digits)

**Spacing**: 2 / 4 / 8 / 12. Multi-pane layouts with no luxury margins.

**Radius**: 0 or 2px. Terminals don't round.

**Shadow**: none. Elevation through hairline borders only (`#2A3050` 1px lines).

**Motion**: ticker scroll (uniform linear), instant state flips, blink on data update (50–80ms flash). No eased animations.

**Signature moves**
- Multi-pane workspaces with hairline dividers — 4 to 9 panels visible at once
- Amber text on near-black for the most important data; chrome-white for secondary
- Status / ticker bar at top with marquee-scrolling tickers, color-coded up/down
- Keyboard-shortcut chips in the margins (`F9: TRADE`)
- Tabular data with monospaced digits, color-coded by delta

**Avoid**
- Any rounded corners
- Hero sections / marketing-style headlines
- Photography or illustration of any kind
- Decorative gradients (gradient meshes are not data-ink)
- Sans-serif body type (the monospace is the recipe)

**AI prompt seed**
> Trading workstation user interface, deep navy #0A0E1A background, multi-pane layout with amber #FFA02F headlines, monospaced data tables, ticker scroll across the top, no rounded corners, no illustrations, fixed-width font throughout.

**Don't use when**
- The audience is consumer (they'll bounce in 3 seconds — terminal density is acquired taste)
- You can't fill the screen with real data — terminal aesthetic + dummy "Lorem 1,234" placeholders looks broken
- The task is a marketing landing page — terminals are for working in, not for selling

---

> **Same school — Information Architecture**: [`pentagram`](./pentagram.md) · [`vignelli-swiss-helvetica`](./vignelli-swiss-helvetica.md) · [`tufte-dataink`](./tufte-dataink.md) · [`nyt-the-daily`](./nyt-the-daily.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
