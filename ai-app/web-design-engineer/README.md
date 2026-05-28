# web-design-engineer · style-recipe gallery

A live demo gallery for the [`skills/web-design-engineer`](../../skills/web-design-engineer) skill.

**25 anchored style recipes → 25 working artefacts.**

Each recipe in the skill catalogue (`references/style-recipes/*.md`) gets its own full-page demo here — *not* a unified template, *not* a 16:9 stage. Pick a row, see the DNA in motion. Linear is a product landing, Aesop is an apothecary product page, Bloomberg Terminal is a multi-pane trading workstation, Are.na is a research channel. Each demo fully commits to one recipe so the difference between schools is visible at a glance.

## Quick start

```bash
cd demo/web-design-engineer-demo
npm install
npm run dev
```

Open `http://localhost:5181/` (or whatever port Vite picks). The home page is the gallery; clicking a card opens that recipe's full-page artefact.

```bash
npm run build       # production bundle to dist/
npm run preview     # serve the built dist/
npm run typecheck   # strict TS, zero-warning baseline
```

## Browse a recipe directly

Every demo has a hash-routed URL:

| Recipe              | Open at                          |
| ------------------- | -------------------------------- |
| Linear              | `#/linear`                       |
| Aesop               | `#/aesop`                        |
| Bloomberg Terminal  | `#/bloomberg-terminal`           |
| Stripe Press        | `#/stripe-press`                 |
| Headspace           | `#/headspace-meditation`         |
| Y2K Retrofuturism   | `#/y2k-retrofuturism`            |
| Mid-Century Modern  | `#/mid-century-modern`           |

…and so on — the full mapping is in [`src/recipes/registry.ts`](./src/recipes/registry.ts). `Esc` returns to the gallery; `H` toggles the on-screen recipe HUD.

## The 25 recipes, by school

| School | Recipes |
|---|---|
| **Editorial / Minimalist** | `apple-hig` · `muji-kenya-hara` · `aesop` · `dieter-rams-braun` · `monocle-magazine` |
| **Information Architecture** | `pentagram` · `vignelli-swiss-helvetica` · `bloomberg-terminal` · `tufte-dataink` · `nyt-the-daily` |
| **Modern Tool / Builder SaaS** | `linear` · `vercel-mesh` · `raycast` · `notion-pre-ai` |
| **Motion / Experimental** | `field-io` · `active-theory` · `resn-storytelling` |
| **Brutalist / Raw** | `are-na` · `bloomberg-businessweek-turley` · `balenciaga-post-2017` |
| **Warm Humanist** | `mailchimp-freddie` · `stripe-press` · `headspace-meditation` |
| **Specialty / Genre** | `y2k-retrofuturism` · `mid-century-modern` |

Each one ships with:

- A **palette** from the recipe spec — no Inter + `#3b82f6` defaults
- The recipe's **actual typeface** (or closest Google Fonts substitute)
- The recipe's **signature moves** (e.g., Bloomberg's amber-on-navy, Aesop's small-caps labels, Linear's hairline borders)
- A **scene-appropriate artefact**, not a generic landing page

The components are *small enough to read* (~150–300 lines TSX each) and live in `src/recipes/*.tsx`. Styles are scoped under `.demo-<id>` in [`src/recipes/recipes.css`](./src/recipes/recipes.css).

## How to record GIFs

Each demo is a full-page scrollable artefact, so the easiest workflow is:

1. Run `npm run dev`, open the gallery in Chrome
2. Click into a recipe, set the window to 1440×900 (or whatever feels right)
3. Press `H` to hide the recipe HUD
4. Capture with Cleanshot / Kap / native screen recorder — most demos look great as a static screenshot too

For full-page captures, scroll the whole document; many demos have a hero, a few signature sections, and a footer.

## Project layout

```
demo/web-design-engineer-demo/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx              # entry
    ├── App.tsx               # hash routing
    ├── components/
    │   ├── Gallery.tsx       # home page: 7 schools, 25 cards
    │   └── DemoFrame.tsx     # per-recipe shell + floating HUD
    ├── recipes/
    │   ├── registry.ts       # the 25 RecipeMeta entries
    │   ├── recipes.css       # all per-demo styling, scoped by .demo-<id>
    │   ├── apple-hig.tsx
    │   ├── linear.tsx
    │   ├── ...
    │   └── mid-century-modern.tsx
    └── styles/
        ├── base.css          # minimal reset
        ├── fonts.css         # every recipe's real or closest-public font
        └── gallery.css       # gallery & HUD chrome only
```

The gallery itself uses a tight "design-engineer dashboard" aesthetic so it doesn't compete with the work it's showing.

## Why this gallery exists

The companion gallery for the **web-video-presentation** skill ([`../web-video-presentation-demo`](../web-video-presentation-demo)) shows 23 themed 16:9 slide stages — one shape, many palettes.

`web-design-engineer` is a *much* broader skill — its catalogue spans hardware product pages, transit posters, trading terminals, magazine spreads, fashion lookbooks, and meditation apps. A single template would lose the point. So each recipe gets the form of artefact it was *designed for*:

- `linear` → developer-tool landing with a real-feeling product screenshot
- `bloomberg-terminal` → a six-pane workspace with live tickers and color-coded P&L
- `aesop` → an apothecary product page with small-caps labels and a single sage prop
- `tufte-dataink` → an essay with inline sparklines, small multiples, and a no-chartjunk figure
- `balenciaga-post-2017` → a deadpan product grid with Helvetica caps and no buttons
- `mid-century-modern` → a cut-paper poster with Saul Bass shapes

When you're picking a recipe in the skill catalogue, **come here first** — open three or four schools side-by-side, see the *shape* of each, then decide whether you want the dense terminal, the quiet chamois bottle, or the loud all-caps grid.

## License

MIT, same as the parent repo.
