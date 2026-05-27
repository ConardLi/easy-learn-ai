# apple-hig — Apple Human Interface

- **School**: Editorial / Minimalist
- **Vibe**: Generous space, hero product on white, one thought per screen
- **Best for**: Premium hardware, premium software, "this product deserves a stage" feel
- **Touchstone**: apple.com product pages, Apple keynote slides, HIG documentation

**Palette**
- Ground: `#FFFFFF` (paper-pure white) or `#000000` (deep black, hero film moments only)
- Ink: `#1D1D1F` (Apple's not-quite-black)
- Soft surface: `#F5F5F7`
- Muted text: `#86868B`
- Accent (sparingly): system-blue `#0071E3`

**Typography**
- Display: SF Pro Display (weight 600 for headlines, 400 for sub-display) — fall back to Inter Tight only when SF Pro is unreachable
- Body: SF Pro Text at 17px, line-height ~1.47
- Captions: SF Pro at 12–14px, weight 400, color `#86868B`

**Spacing**: 4 / 8 / 16 / 24 / 40 / 64 / 96 / 160. Section breaks are large (160px+ vertical). Headlines breathe.

**Radius**: 12 (small components) / 18 (cards) / 22 (large panels). Apple is rarely sharp-cornered, never gummy-bear rounded.

**Shadow**: barely visible. `0 1px 2px rgba(0,0,0,0.04)` at most. Elevation through whitespace and color contrast, not shadow.

**Motion**: cubic-bezier expo-out; durations 350–650ms for layout moves, 150–250ms for hover. Never bouncy. Often a slow Ken Burns on hero imagery.

**Signature moves**
- One product photograph centered on whitespace, occupying ~40% of the hero
- Hero headline in big display weight, body line below in muted gray (`#86868B`), single CTA in system-blue text-link form (no chunky button on hero — that comes later)
- Section anatomy: tiny eyebrow label → big headline → one paragraph → one product shot → repeat. No tabs, no cards, no bento.
- Hairline `#D2D2D7` dividers between sections, never anything heavier
- Numbers are display-weight characters (e.g., a stat reads `12.9″`, with the `″` set in a smaller weight)

**Avoid**
- Any gradient mesh, glow, or "tech atmosphere" — Apple's gradients are almost always subtle silver-to-charcoal on a product surface, not background decoration
- Stacking multiple CTAs in the hero
- Card grids of features (Apple uses long vertical sections, one idea each)
- Emoji of any kind on marketing pages

**AI prompt seed** (for hero imagery)
> Studio-lit product photograph, single object centered on pure-white #FFFFFF ground, soft top-down diffused light, subtle floor reflection, 16:9, no text, no people, no shadow drama, color grading neutral.

**Don't use when**
- The product is software-only and doesn't have a "hero object" to photograph — you'll end up with a blank stage
- The brand wants to feel scrappy / startup / accessible — Apple HIG reads as expensive and serious
- Audience is anti-tech-corporate — it'll feel "stale Apple cosplay"

---

> **Same school — Editorial / Minimalist**: [`muji-kenya-hara`](./muji-kenya-hara.md) · [`aesop`](./aesop.md) · [`dieter-rams-braun`](./dieter-rams-braun.md) · [`monocle-magazine`](./monocle-magazine.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
