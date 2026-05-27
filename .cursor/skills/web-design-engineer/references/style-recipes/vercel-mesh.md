# vercel-mesh — Vercel (Gradient Mesh Era)

- **School**: Modern Tool / Builder SaaS (also touches Motion / Experimental)
- **Vibe**: Black-and-white precision broken by a single shimmering gradient mesh
- **Best for**: Platform / infrastructure tools, AI tools, deeply technical products that want to feel modern but not AI-cliché
- **Touchstone**: vercel.com, the v0.dev landing, nextjs.org

**Palette**
- Ground: `#000000` (true black)
- Surface 1: `#0A0A0A`
- Surface 2: `#111111`
- Hairline: `#1F1F1F` or `rgba(255,255,255,0.08)`
- Primary text: `#EDEDED`
- Secondary text: `#888888`
- Gradient mesh accents (used only in hero / section breaks):
  - Cyan `#0070F3` → magenta `#FF0080` → orange `#F5A623` — but mixed at low saturation and high feathering, never a hard purple-pink AI gradient
- One sharp accent for CTAs: white `#FFFFFF` button on black ground (high contrast)

**Typography**
- Display: Geist Sans (weight 500–600) — Vercel's own family. Substitute Inter Tight weight 600.
- Body: Geist Sans at 15–16px, weight 400, line-height 1.6
- Mono: Geist Mono — for code, terminal-style commands, deploy logs

**Spacing**: 4 / 8 / 16 / 24 / 40 / 64 / 96 / 128

**Radius**: 8 (small) / 12 (medium) / 16 (large). Slightly more generous than Linear, but still disciplined.

**Shadow**: minimal at component level; the *page* feels lit by the gradient mesh, not by shadows.

**Motion**: snappy ease-out (cubic-bezier(0.16, 1, 0.3, 1)), 200ms hovers, 500–700ms for layout. The mesh itself slowly drifts (10–20s loop).

**Signature moves**
- One full-bleed gradient mesh in the hero — diffuse, dreamy, feathered to black edges
- Otherwise the page is black-and-white with hairline detail and monospace accents
- Deploy / terminal log readouts as a hero element (real-feeling, not lorem)
- Animated mesh on hover for cards (the card "lights up" with a soft glow from below)
- White solid buttons (`#FFFFFF` on `#000000`) — high contrast, no gradient, no shadow

**Avoid**
- Bright saturated purple → pink gradients (that's the AI cliché the recipe is *replacing*)
- More than one mesh per page
- Glow on every component (selective use — one hero, maybe one section break, that's it)
- Colored buttons (the brand button is white)

**AI prompt seed**
> Abstract atmospheric gradient on pure black #000000 background, deep blue #0070F3 fading into magenta #FF0080 and orange #F5A623, feathered edges blending into black, dreamy soft focus, no objects, no text, 16:9, very low saturation overall.

**Don't use when**
- The brand isn't a platform / infra / tooling product — meshes on a consumer site read as "trying too hard"
- Multiple gradient meshes are needed (use one or none, never several)
- The audience expects warm / human feel

---

> **Same school — Modern Tool / Builder SaaS**: [`linear`](./linear.md) · [`raycast`](./raycast.md) · [`notion-pre-ai`](./notion-pre-ai.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
