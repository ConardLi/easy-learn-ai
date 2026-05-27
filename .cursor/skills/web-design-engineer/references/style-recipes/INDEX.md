# Style Recipes — Catalog Index

A catalog of 25 named, anchored design recipes — each one tied to a real brand / studio / designer and **stored as its own file in this directory**. Read this INDEX to discover what's available and how to choose; then read **one recipe file** to get the concrete values for Step 3.

```
references/style-recipes/
├── INDEX.md                       ← you are here
├── apple-hig.md
├── muji-kenya-hara.md
├── aesop.md
├── ... (25 recipe files total)
```

This catalog is the **anchored library**; `../design-directions.md` is the **school taxonomy** for vague-request conversations. The two work together:

| Route | Tool | When |
|---|---|---|
| User has no idea — needs guidance | `../design-directions.md` (6-school 3-pick conversation) | "Make me something nice" / "I don't know what style I want" |
| User has an anchor in mind | Read **one** file here directly | "Make it Linear-style" / "Stripe Press feeling" / "Are.na vibe" |
| Direction Advisor narrowed to a school but user wants concreteness | Read this INDEX for the school's recipes → then read the 2–3 specific recipe files | Mid-conversation handoff |

---

## When to Read Recipe Files

**Read a single recipe file** when:

1. **The user names an anchor by brand, studio, or designer** — "make a Linear-style landing page", "Aesop-feeling product page", "MUJI quietness", "Pentagram-grade type system". Read **only that anchor's file** (`linear.md`, `aesop.md`, etc.) — never the whole catalog.
2. **The Direction Advisor narrowed to a school** — read this INDEX to see which recipes live in that school, then read 2–3 specific files to present the user concrete choices.
3. **You're in Step 3 and need a known-good palette / typography / spacing combo** — pick the closest recipe by school or best-for table below, then read that single file and adapt.

Do **not** load every recipe file up front. The entire catalog is ~1400 lines if loaded together; loading one recipe is ~50 lines. **Loading the whole catalog when you only need one recipe is the exact anti-pattern this split is designed to prevent.**

Do **not** read recipe files when:
- The user provided their own brand assets / Figma / codebase — extract from those instead (Asset > Spec).
- The task is dictated by an existing UI you're extending — match the visual vocabulary already there, don't impose a recipe.
- The user gave you a screenshot of a specific reference page — that screenshot *is* the recipe; extract directly.

---

## File Format Conventions (every recipe file follows this anatomy)

- **Title line** — `# <anchor-id> — <Human-readable name>`
- **Anchor & school** — which real-world reference and which Direction-Advisor school it belongs to
- **Vibe & best-for** — 1-line vibe summary plus the scenarios it actually serves
- **Touchstone** — at least one named real product / object / publication to look at (search and verify before relying on memory)
- **Palette** — hex values, named by role (ink / surface / accent / ground). Always restricted; never a 12-stop ramp.
- **Typography** — real font names with weight numbers and size guidance. No "Inter / Roboto" fallbacks unless the anchor itself uses them.
- **Spacing system** — concrete value ladder
- **Radius / Shadow / Motion character** — described in **design language**, not code
- **Signature moves** — 3–5 specific, opinionated, copy-able design decisions that make this recipe *recognisable*. This is the design DNA.
- **Avoid** — anti-patterns inside this recipe (i.e., things that would silently turn it into AI slop)
- **AI prompt seed** — when generating supporting imagery, what to ask for to stay in DNA
- **Don't use when** — the boundary; situations where this recipe will misfire
- **Footer** — peer recipes in the same school + a link back to this INDEX

**These files contain no code.** Hex codes, font names, and spacing ladders are *design tokens described in words*, not code. The agent translates them to CSS / JSX in Step 3+ using the project's stack.

---

## Index 1 — By School

| School | Recipes |
|---|---|
| **Editorial / Minimalist** | [`apple-hig`](./apple-hig.md) · [`muji-kenya-hara`](./muji-kenya-hara.md) · [`aesop`](./aesop.md) · [`dieter-rams-braun`](./dieter-rams-braun.md) · [`monocle-magazine`](./monocle-magazine.md) |
| **Information Architecture** | [`pentagram`](./pentagram.md) · [`vignelli-swiss-helvetica`](./vignelli-swiss-helvetica.md) · [`bloomberg-terminal`](./bloomberg-terminal.md) · [`tufte-dataink`](./tufte-dataink.md) · [`nyt-the-daily`](./nyt-the-daily.md) |
| **Modern Tool / Builder SaaS** | [`linear`](./linear.md) · [`vercel-mesh`](./vercel-mesh.md) · [`raycast`](./raycast.md) · [`notion-pre-ai`](./notion-pre-ai.md) |
| **Motion / Experimental** | [`field-io`](./field-io.md) · [`active-theory`](./active-theory.md) · [`resn-storytelling`](./resn-storytelling.md) |
| **Brutalist / Raw** | [`are-na`](./are-na.md) · [`bloomberg-businessweek-turley`](./bloomberg-businessweek-turley.md) · [`balenciaga-post-2017`](./balenciaga-post-2017.md) |
| **Warm Humanist** | [`mailchimp-freddie`](./mailchimp-freddie.md) · [`stripe-press`](./stripe-press.md) · [`headspace-meditation`](./headspace-meditation.md) |
| **Specialty / Genre** (not surfaced via Advisor) | [`y2k-retrofuturism`](./y2k-retrofuturism.md) · [`mid-century-modern`](./mid-century-modern.md) |

The first 6 schools mirror the Direction Advisor's 6 schools (in `../design-directions.md`) — so when the Advisor picks one of those, you know which recipe files to surface. The 7th school (Specialty / Genre) is **only reachable through direct anchor naming** — users wanting Y2K or Mid-Century always arrive with the anchor in hand, never through Advisor.

## Index 2 — By Best-For

| Scenario | First-choice recipes |
|---|---|
| B2B SaaS / developer tools | [`linear`](./linear.md) · [`vercel-mesh`](./vercel-mesh.md) · [`raycast`](./raycast.md) · [`pentagram`](./pentagram.md) |
| Premium consumer / lifestyle | [`aesop`](./aesop.md) · [`muji-kenya-hara`](./muji-kenya-hara.md) · [`stripe-press`](./stripe-press.md) · [`monocle-magazine`](./monocle-magazine.md) |
| Data product / dashboard / finance | [`bloomberg-terminal`](./bloomberg-terminal.md) · [`tufte-dataink`](./tufte-dataink.md) · [`vignelli-swiss-helvetica`](./vignelli-swiss-helvetica.md) |
| Editorial / publishing / longform | [`nyt-the-daily`](./nyt-the-daily.md) · [`monocle-magazine`](./monocle-magazine.md) · [`stripe-press`](./stripe-press.md) · [`mailchimp-freddie`](./mailchimp-freddie.md) |
| Launch moment / brand film / awwwards | [`field-io`](./field-io.md) · [`active-theory`](./active-theory.md) · [`resn-storytelling`](./resn-storytelling.md) · [`vercel-mesh`](./vercel-mesh.md) |
| Differentiated / counter-culture / artist | [`are-na`](./are-na.md) · [`bloomberg-businessweek-turley`](./bloomberg-businessweek-turley.md) · [`balenciaga-post-2017`](./balenciaga-post-2017.md) |
| Approachable B2C / community / health | [`mailchimp-freddie`](./mailchimp-freddie.md) · [`headspace-meditation`](./headspace-meditation.md) · [`notion-pre-ai`](./notion-pre-ai.md) |
| Retro / theme / decade-coded | [`y2k-retrofuturism`](./y2k-retrofuturism.md) · [`mid-century-modern`](./mid-century-modern.md) |

## Index 3 — By Mode (light / dark / either)

| Mode | Recipes |
|---|---|
| Light-first | [`apple-hig`](./apple-hig.md) · [`muji-kenya-hara`](./muji-kenya-hara.md) · [`aesop`](./aesop.md) · [`dieter-rams-braun`](./dieter-rams-braun.md) · [`monocle-magazine`](./monocle-magazine.md) · [`pentagram`](./pentagram.md) · [`nyt-the-daily`](./nyt-the-daily.md) · [`stripe-press`](./stripe-press.md) · [`headspace-meditation`](./headspace-meditation.md) · [`mailchimp-freddie`](./mailchimp-freddie.md) · [`mid-century-modern`](./mid-century-modern.md) |
| Dark-first | [`linear`](./linear.md) · [`vercel-mesh`](./vercel-mesh.md) · [`raycast`](./raycast.md) · [`bloomberg-terminal`](./bloomberg-terminal.md) · [`field-io`](./field-io.md) · [`active-theory`](./active-theory.md) · [`resn-storytelling`](./resn-storytelling.md) · [`y2k-retrofuturism`](./y2k-retrofuturism.md) |
| Works either way | [`vignelli-swiss-helvetica`](./vignelli-swiss-helvetica.md) · [`tufte-dataink`](./tufte-dataink.md) · [`notion-pre-ai`](./notion-pre-ai.md) · [`are-na`](./are-na.md) · [`bloomberg-businessweek-turley`](./bloomberg-businessweek-turley.md) · [`balenciaga-post-2017`](./balenciaga-post-2017.md) |

---

## Cross-Cutting Anti-Patterns (apply to all 25 recipes)

These apply across every recipe in this catalog. Violating them collapses the recipe back into AI-default slop. **Read these even before reading an individual recipe file** — they're not duplicated in each file.

### ❌ Don't combine two recipes mid-page

Pick **one** recipe and instantiate it fully. Adding "Linear with Aesop accents" or "Pentagram with a Y2K hero" usually reads as confused rather than original. Two-recipe remixes work only when the user explicitly asks and you can articulate *why* the marriage is coherent (e.g., "Aesop palette on Pentagram grid for an apothecary catalog with editorial bones").

### ❌ Don't half-commit to brutalism / Y2K / mid-century

The Specialty / Genre and Brutalist / Raw recipes need full commitment. Half-Y2K reads as "broken modern site". Half-brutalism reads as "unfinished design". Either go all-in or pick a different recipe.

### ❌ Don't default to Inter / Roboto / Arial / system-ui as display

If your chosen recipe specifies a font, use that font (or a real substitute *named in the recipe*). Defaulting to Inter erases the recipe's typographic identity, which is usually 30–40% of its signature.

### ❌ Don't import every color in the palette

Each recipe lists a restricted palette intentionally. If a recipe gives you 4 colors, don't add a 5th to "balance things out". The restriction *is* the recipe.

### ❌ Don't add your own AI-default touches "to make it pop"

If the recipe says "no shadow," don't add a subtle shadow. If it says "no gradient," don't add a gradient mesh. If it says "no emoji," don't add one. Every AI-default addition you make reduces the recipe's distinctiveness toward the mean.

### ❌ Don't fake the photography style with CSS

Recipes like Aesop, Stripe Press, MUJI, Apple HIG, Mailchimp, and Headspace rely on a specific photography or illustration style. If you can't source / generate that imagery, **say so to the user** — don't substitute CSS shapes. A recipe with a real hero photograph at 60% quality lands better than the same recipe with a CSS substitute at 0% recognition value.

### ❌ Don't invent new recipes silently

If you find yourself drifting outside the listed recipes, **tell the user**: "None of the 25 recipes fits — here's what I propose instead." A new recipe deserves its own anchor, its own concrete values, and its own signature moves articulated. Drifting silently produces the AI-default that this whole catalog is built to prevent.

### ❌ Don't read the whole catalog when you need one recipe

Load only the recipe files you actually need. If the user said "Linear-style", read [`linear.md`](./linear.md) — not all 25. The 1-file-at-a-time pattern is what makes this catalog efficient; loading everything up front defeats progressive disclosure.

---

## When None of the 25 Fits

Options in this order:

1. **Re-read the user's request** — sometimes the right recipe is obvious in hindsight (a "data-led research tool" is almost always [`tufte-dataink`](./tufte-dataink.md) or [`bloomberg-terminal`](./bloomberg-terminal.md), even when the user didn't name those)
2. **Combine two recipes deliberately**, with explicit framing — see the warning above
3. **Hand off to `../design-directions.md`** — propose 3 differentiated schools and let the user pick
4. **Articulate a new recipe** — name an anchor, list concrete values, get user sign-off, then proceed

Always make the recipe choice explicit in your Step 3 design-system declaration so the user can confirm before code starts.
