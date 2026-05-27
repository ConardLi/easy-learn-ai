# tufte-dataink — Edward Tufte / Maximum Data-Ink

- **School**: Information Architecture
- **Vibe**: Every pixel earns its place; the chart is the page
- **Best for**: Analytical reports, scientific publications, data-led storytelling
- **Touchstone**: *The Visual Display of Quantitative Information*, *Beautiful Evidence*, edwardtufte.com

**Palette**
- Ground: `#FBFAF6` (warm paper)
- Ink: `#1B1B1A`
- Two data colors only — typically a warm red `#A6300E` and a cool slate `#3E4A5C`. Add a third only if a third dimension genuinely needs it.
- Faint reference rules: `#D8D2C2`

**Typography**
- Display & body: an old-style or transitional serif — ET Book (Tufte's own family), Equity, or Lyon Text. Weight 400 for body, italic for emphasis.
- Body at 12–14px (Tufte deliberately uses small body text — the reader leans in)
- Sans for axis labels only — a humanist sans at 10–11px, color `#5C5550`

**Spacing**: tight. 4 / 8 / 12 / 16 / 24 / 48. Margins are filled with side-notes, not whitespace.

**Radius**: 0.

**Shadow**: none.

**Motion**: none. The page is meant to be read still.

**Signature moves**
- Sparklines inline with body copy (a tiny chart embedded in a sentence)
- Side-notes (marginalia) used heavily — annotations live in the right margin, not in tooltips
- Charts have no chart-junk: no gridlines except faint ones, no border boxes, no 3D, no legends if direct labels work
- Small multiples — a 3×3 grid of the same chart with different data
- Direct labels on data series (the line is labeled at its endpoint, not in a legend box)

**Avoid**
- Pie charts (Tufte would not approve)
- 3D anything
- Gridlines darker than `#D8D2C2`
- Multiple chart types on the same page when one would do
- Color for decoration (every color must encode meaning)

**AI prompt seed**
> Editorial scientific figure, warm paper #FBFAF6 background, multi-line time-series chart with two data series in muted red and slate, direct labels at line endpoints, side-note callouts in italic serif, no chart frame, no legend, 4:3.

**Don't use when**
- The chart is decorative (Tufte demands the chart be the *point*)
- The reader expects interactive tooltips / filters (Tufte is for static editorial figures)
- The medium is mobile (small body type plus margin notes doesn't fit)

---

> **Same school — Information Architecture**: [`pentagram`](./pentagram.md) · [`vignelli-swiss-helvetica`](./vignelli-swiss-helvetica.md) · [`bloomberg-terminal`](./bloomberg-terminal.md) · [`nyt-the-daily`](./nyt-the-daily.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
