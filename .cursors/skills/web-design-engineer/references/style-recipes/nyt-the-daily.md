# nyt-the-daily — New York Times Editorial

- **School**: Information Architecture
- **Vibe**: Authoritative broadsheet, generations of typographic craft
- **Best for**: Longform editorial, news / journalism products, narrative explainers
- **Touchstone**: nytimes.com homepage, NYT Cooking, NYT investigative features

**Palette**
- Ground: `#FFFFFF`
- Ink: `#121212`
- Secondary text: `#666666`
- NYT red `#D0021B` — used only for breaking-news indicators or sparingly
- Soft section background: `#F7F7F7`
- Hairline: `#E2E2E2`

**Typography**
- Display: Cheltenham (NYT's proprietary) — substitute Sentinel or Tiempos Headline. Weight 700 for hero, italic widely used.
- Subhead: Imperial or Lyon Display at weight 400
- Body: Imperial / Georgia / source serif at 18–20px, line-height ~1.55
- Sans for UI / kickers: Franklin (NYT) — substitute Söhne Mono or Söhne, weight 500, often in small caps

**Spacing**: 4 / 8 / 16 / 24 / 32 / 48 / 96. Multi-column grids for stories.

**Radius**: 0 throughout.

**Shadow**: none.

**Motion**: minimal — sticky bylines, lazy-loaded images fading in, slow zoom on hero photo over 8–15s.

**Signature moves**
- Three-deck hierarchy: tiny eyebrow ("OPINION" / "ANALYSIS" / "INVESTIGATION" in small-caps sans) → bold serif headline → italic serif standfirst
- Byline + timestamp block in sans below the headline, always
- Pull-quotes set in italic serif at 1.5–2× body size, with hairline rules above and below
- Multi-column body copy on wide viewports; single column on mobile (always readable)
- Inline images with serif captions; captions matter and are styled distinctively

**Avoid**
- Sans-serif headlines (the recipe's signature is the serif voice)
- Card grids of articles — NYT lays articles out as a front page, with hierarchy by size
- Pretty UI buttons in the body of articles
- Centered alignment for body (left-aligned justified is the recipe)

**AI prompt seed**
> Editorial photojournalism, single decisive moment image, natural lighting, 3:2 aspect, color grading neutral with slight desaturation, real-feeling not staged, place-specific.

**Don't use when**
- The product is a SaaS dashboard — NYT craft reads as overformal there
- Content is short and punchy (one-line CTAs) — NYT needs longform to land
- The brand has no editorial / authority claim — using NYT voice without the substance reads as cosplay

---

> **Same school — Information Architecture**: [`pentagram`](./pentagram.md) · [`vignelli-swiss-helvetica`](./vignelli-swiss-helvetica.md) · [`bloomberg-terminal`](./bloomberg-terminal.md) · [`tufte-dataink`](./tufte-dataink.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
