# field-io — Field.io (Generative Motion Identity)

- **School**: Motion / Experimental
- **Vibe**: The brand is movement; the page generates itself in front of the visitor
- **Best for**: Brand films, launch moments, agency portfolios, "the visit is the experience" sites
- **Touchstone**: field.io, FIELD.SYSTEMS work, kinetic identity case studies

**Palette**
- Often dark base — `#0B0B0F` to `#000000`
- One or two generative gradient hues used throughout the motion — frequently a single bold hue cycled through hue rotation, e.g., a deep cyan `#0CE0E5` blending into electric violet `#5B2EFF`, or generated procedurally
- Ink for type: high-contrast white `#FFFFFF`
- Secondary type: cool gray `#A0A4B0`

**Typography**
- Display: a variable font that *animates* on its own axes — Söhne Variable, Editorial New Variable, or Inter Display Variable
- Type often morphs weight, width, or optical-size during scroll
- Body type kept restrained — a single grotesque at neutral weight; the motion is the show, not the body

**Spacing**: irregular by design — content lands in unexpected positions; the grid sometimes appears and disappears

**Radius**: 0 — Field.io's work is rarely soft-cornered

**Shadow**: not via CSS — through generative lighting in WebGL / Canvas scenes

**Motion**: the entire recipe is motion. Multi-stage choreographed sequences. Scroll-driven not just for parallax but for state changes. Pages frequently feel like a video playing itself.

**Signature moves**
- Generative type sequences where letters appear, morph, and resolve into headlines on scroll
- Particle / mesh systems that respond to cursor and scroll position
- Long-tail eased curves (expo-out, quint-out) — `cubic-bezier(0.83, 0, 0.17, 1)` and similar
- Section breaks where the entire page state transforms (a full-bleed canvas overtakes the layout)
- Choreographed multi-element entries — six elements arrive on staggered delays, not all at once

**Avoid**
- Static recipes (this isn't a static recipe — a static screenshot will feel underwhelming)
- Too many cursor-reactive elements (one or two key WebGL moments is the recipe, not the whole page)
- Heavy text content — this recipe is for moments, not for reading

**AI prompt seed**
> Generative type composition, single phrase resolving from particle field, electric violet #5B2EFF and deep cyan #0CE0E5 light traces, on near-black background, long motion trails, 16:9 cinematic.

**Don't use when**
- The deliverable will live as a static screenshot (the recipe loses ~70% of its impact)
- Build budget is small (this is the most labor-intensive of the 25)
- The target audience uses low-end hardware or care about performance / accessibility above wow

---

> **Same school — Motion / Experimental**: [`active-theory`](./active-theory.md) · [`resn-storytelling`](./resn-storytelling.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
