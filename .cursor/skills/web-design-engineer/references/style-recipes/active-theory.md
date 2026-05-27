# active-theory — Active Theory (Cinematic WebGL)

- **School**: Motion / Experimental
- **Vibe**: Cinematic web experiences, WebGL heroes, physical-feeling interaction
- **Best for**: Brand launch sites, game / entertainment products, "experience marketing" pieces
- **Touchstone**: activetheory.net, NASA / Apple WWDC dev portals they've made, Doritos / movie tie-in launches

**Palette**
- Often a single dramatic hue from the project's content — black + one signature color from the brand or film
- High contrast — deep black + bright accent
- Tinted neutrals — never plain gray; gray-with-cast (cool blue cast for sci-fi, warm amber for cinematic)

**Typography**
- Display: a strong grotesque or a custom display face built for the campaign — Druk, Editorial New, ABC Diatype Mono
- Body type secondary — most content rides over imagery; less reading, more witnessing
- All-caps display common, with very tight or very open tracking depending on tone

**Spacing**: cinematic — content sits centered or in unexpected corners against a full-bleed canvas

**Radius**: 0

**Shadow**: from WebGL lighting, not CSS

**Motion**: feature-film-grade. Camera moves through a 3D space. Physics-driven debris / particles. The page is a stage.

**Signature moves**
- A full-screen WebGL hero scene that the user moves through (scroll = camera path)
- Real-time physics or particle systems responding to cursor / device tilt
- Carefully art-directed transitions between scenes (not generic fades)
- Sound design integrated (subtle ambient audio that ducks during text passages)
- A single moment of maximum impact — the recipe builds toward one payoff frame

**Avoid**
- Many small WebGL moments (one big set-piece is the recipe, not five small ones)
- Trying to ship a content-heavy site this way (cinematic recipes work for marketing moments, not docs)
- Reaching for off-the-shelf Three.js demos (this recipe demands hand-crafted scenes — generic WebGL reads as cheap)

**AI prompt seed**
> Cinematic VFX still, single dramatic moment from a sci-fi launch film, key light from one direction, deep shadows, single brand-accent hue floating in the scene, particle debris in air, 2.39:1 aspect.

**Don't use when**
- Performance / accessibility constraints rule out heavy WebGL
- The product is utilitarian (this recipe is for moments, not for daily use)
- The build budget is sub-3-weeks

---

> **Same school — Motion / Experimental**: [`field-io`](./field-io.md) · [`resn-storytelling`](./resn-storytelling.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
