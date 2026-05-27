# Web Design Engineer Skill

**An AI agent skill that transforms AI-generated web pages from "functional" to "stunning."**

[中文文档](./README.zh-CN.md) · [Back to collection root](../../README.md)

![Web Design Skill](../../dist/imgs/web-design-skill.png)

---

## What Is This?

This is a reusable **Skill** (structured system prompt) for AI coding agents — such as [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Cursor](https://cursor.com), and other tools that support the `SKILL.md` format — that dramatically improves the design quality of AI-generated HTML/CSS/JavaScript artifacts.

It distills the core design philosophy from [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)'s system prompt into an open, portable, and customizable skill file that you can drop into any project.

### The Problem

Modern LLMs can already produce functional web pages from simple prompts. But their output tends to converge on the same aesthetic: Inter font, blue primary buttons, purple-pink gradients, large-radius cards, emoji as icons, fabricated testimonials. Technically correct, visually generic.

### The Solution

This skill injects **design taste** into the AI's decision-making process through:

- **Anti-cliché rules** — an explicit blocklist of overused AI design patterns
- **Design system declaration** — forces the AI to articulate color, typography, spacing, and motion choices *before writing code*
- **oklch color theory** — perceptually uniform color derivation instead of random hex guessing
- **Curated font & color pairings** — high-quality starting points that replace the default Inter + #3b82f6
- **Placeholder philosophy** — honest `[icon]` markers instead of poorly drawn SVG fakes
- **Structured workflow** — six-step process from requirements → context → design system → v0 draft → full build → verification

---

## Quick Start

### For Claude Code / Cursor / AI Agents

Copy this skill folder into your project:

```
your-project/
├── .agents/skills/web-design-engineer/   # or .claude/skills/web-design-engineer/
│   ├── SKILL.md                          # Main skill file
│   └── references/
│       ├── advanced-patterns.md          # Code template library (slide engine, device frames, motion timelines, data viz)
│       ├── design-directions.md          # Design Direction Advisor (6 schools, differentiated 3-pick recommendation)
│       ├── style-recipes/                # 25 anchored style recipes — one .md file per anchor, loaded on demand
│       │   ├── INDEX.md                   #   Catalog index + 3 cross-indexes + cross-cutting anti-patterns
│       │   ├── linear.md / aesop.md / pentagram.md / ...    #   25 single-recipe files
│       └── critique-guide.md             # 5-dimension scoring rubric + common issues catalog
└── ...
```

Or use the Claude Code plugin marketplace from the collection root — see the [top-level README](../../README.md#install).

The agent will automatically pick up the skill when your request involves visual/interactive front-end work.

### What It Covers

| Output Type | Examples |
|---|---|
| Web pages & landing pages | Marketing sites, product pages, portfolios |
| Interactive prototypes | Clickable app mockups with device frames |
| Slide decks | HTML presentations (1920×1080, keyboard nav) |
| Data visualizations | Dashboards with Chart.js or D3.js |
| Animations | CSS/JS motion design, timeline-driven demos |
| Design systems | Token exploration, component variants |

---

## How It Works

### The Six-Step Workflow

```
1. Understand requirements  →  Ask only when information is insufficient
2. Gather design context    →  Code > screenshots; never start from nothing
3. Declare design system    →  Colors, fonts, spacing, motion — in Markdown, before code
4. Show v0 draft early      →  Placeholders + layout + tokens; let the user course-correct
5. Full build               →  Components, states, motion; pause at key decision points
6. Verify                   →  Pre-delivery checklist; no console errors, no rogue hues
```

### Key Design Principles

**Anti-AI-cliché checklist.** The skill explicitly bans:
- Purple-pink-blue gradient backgrounds
- Left-border accent cards
- Inter / Roboto / Arial / Fraunces / system-ui fonts
- Emoji as icon substitutes
- Fabricated stats, fake logo walls, dummy testimonials

**oklch color system.** Colors are derived in the perceptually uniform oklch space. Same lightness values actually *look* the same brightness to the human eye — unlike HSL, where yellow-at-50% looks much brighter than blue-at-50%.

**Curated starting points.** Six pre-validated color × font pairings for common use cases:

| Style | Color | Fonts | Use Case |
|---|---|---|---|
| Modern tech | Blue-violet | Space Grotesk + Inter | SaaS, dev tools |
| Elegant editorial | Warm brown | Newsreader + Outfit | Content, blogs |
| Premium brand | Near-black | Sora + Plus Jakarta Sans | Luxury, finance |
| Lively consumer | Coral | Plus Jakarta Sans + Outfit | E-commerce, social |
| Minimal professional | Teal-blue | Outfit + Space Grotesk | Dashboards, B2B |
| Artisan warmth | Caramel | Caveat + Newsreader | Food, education |

**Anchored style-recipe library (25 named recipes, progressively loaded).** When the user names an anchor ("Linear-style", "Aesop feeling", "Pentagram-grade type"), the agent reads **only the matching file** at `references/style-recipes/<anchor>.md` (~50 lines). The catalog index, 3 cross-indexes, and cross-cutting anti-patterns live in `references/style-recipes/INDEX.md` (~150 lines). The full catalog is never loaded at once. The 25 recipes are spread across 7 schools (the 6 Direction-Advisor schools plus a *Specialty / Genre* school reachable only via direct anchor names):

| School | Recipes |
|---|---|
| Editorial / Minimalist | `apple-hig` · `muji-kenya-hara` · `aesop` · `dieter-rams-braun` · `monocle-magazine` |
| Information Architecture | `pentagram` · `vignelli-swiss-helvetica` · `bloomberg-terminal` · `tufte-dataink` · `nyt-the-daily` |
| Modern Tool / Builder SaaS | `linear` · `vercel-mesh` · `raycast` · `notion-pre-ai` |
| Motion / Experimental | `field-io` · `active-theory` · `resn-storytelling` |
| Brutalist / Raw | `are-na` · `bloomberg-businessweek-turley` · `balenciaga-post-2017` |
| Warm Humanist | `mailchimp-freddie` · `stripe-press` · `headspace-meditation` |
| Specialty / Genre | `y2k-retrofuturism` · `mid-century-modern` |

---

## Style Recipe Gallery — 25 recipes, 25 working artefacts

> **Live demo:** [`demo/web-design-engineer-demo/`](../../demo/web-design-engineer-demo) — run `npm run dev` to browse.

Reading 25 recipe spec files is one thing. *Seeing* the difference between Linear and Vercel, between Aesop and MUJI, between Bloomberg Terminal and Tufte — that's another. So every recipe in the catalogue has a dedicated single-page demo built with React + Vite, fully committing to that recipe's DNA — no shared template, no 16:9 stage, just the form of artefact each recipe was designed for.

| School | Pick a card to open the demo |
|---|---|
| **Editorial / Minimalist** | `apple-hig` → premium hardware page · `muji-kenya-hara` → object catalogue · `aesop` → apothecary product page · `dieter-rams-braun` → industrial archive · `monocle-magazine` → magazine contents |
| **Information Architecture** | `pentagram` → identity specimen · `vignelli-swiss-helvetica` → transit wayfinding · `bloomberg-terminal` → trading workstation · `tufte-dataink` → data essay · `nyt-the-daily` → news + podcast hub |
| **Modern Tool / Builder SaaS** | `linear` → issue-tracker landing · `vercel-mesh` → deploy hero · `raycast` → command launcher · `notion-pre-ai` → workspace document |
| **Motion / Experimental** | `field-io` → generative case study · `active-theory` → cinematic launch · `resn-storytelling` → narrative scroll |
| **Brutalist / Raw** | `are-na` → research channel · `bloomberg-businessweek-turley` → editorial cover · `balenciaga-post-2017` → fashion collection |
| **Warm Humanist** | `mailchimp-freddie` → SMB onboarding · `stripe-press` → book detail · `headspace-meditation` → meditation card |
| **Specialty / Genre** | `y2k-retrofuturism` → Y2K portal · `mid-century-modern` → Saul Bass poster |

Each demo:

- uses the recipe's actual typeface (or the closest publicly-available substitute)
- commits to the recipe's restricted palette — no rogue Inter + `#3b82f6`
- demonstrates the *signature moves* listed in the recipe spec (e.g., Bloomberg's amber-on-navy multi-pane workspace, Aesop's small-caps labels and serif body, Linear's hairline borders and keyboard chips, Tufte's inline sparklines + small multiples + no-chartjunk figure)
- lives in `demo/web-design-engineer-demo/src/recipes/<recipe-id>.tsx` (~150–300 lines each)

```bash
cd demo/web-design-engineer-demo
npm install
npm run dev    # gallery at http://localhost:5181/
```

`Esc` returns to the gallery; `H` toggles the on-screen recipe HUD. Hash-routed URLs (`#/linear`, `#/aesop`, …) so you can deep-link to any recipe. See the demo's own [README](../../demo/web-design-engineer-demo/README.md) for the full mapping and how to record GIFs.

> **Why this matters.** When you're picking a recipe in the catalogue, opening three or four demos side-by-side is the fastest way to feel the *shape* of each school — much faster than reading three spec files. Use the gallery as a visual index into the catalogue.

---

## Before & after: skill on / off

The repository's [`demo/web-design-demo/`](../../demo/web-design-demo) directory contains side-by-side comparisons of pages generated with and without this skill, using identical prompts. Open [`demo/web-design-demo/demo2/index.html`](../../demo/web-design-demo/demo2/index.html) for a side-by-side viewer.

### Demo 1: Space Exploration Museum

**Prompt:** *"Build a homepage for a fictional 'Space Exploration Museum' — full-screen hero, 4 exhibition sections, a timeline with 6+ milestones, a booking CTA, and a footer. Deep, immersive, cosmic feel."*

| | Without Skill | With Skill |
|---|---|---|
| **File** | `demo/web-design-demo/demo2/demo1.html` | `demo/web-design-demo/demo2/demo1-with-skill.html` |
| **Color system** | Hardcoded hex values (#7cf0ff, #b388ff) | oklch-based token system with CSS custom properties |
| **Typography** | Orbitron + Noto Serif SC | Instrument Serif + Space Grotesk + JetBrains Mono |
| **Layout** | Standard landing-page structure | Editorial magazine-style layout with grid compositions |
| **Details** | Heavy glow effects, neon gradients | Restrained palette, typographic hierarchy, decorative data elements |
| **Overall feel** | Enthusiastic junior designer | Experienced design director |

### Demo 2: Photographer Portfolio

**Prompt:** *"Build a homepage for an independent photographer's portfolio."*

| | With Skill |
|---|---|
| **File** | `demo/web-design-demo/demo2/demo2-with-skill.html` |
| **Character** | Creates a fictional Nordic photographer "Mira Høst" with a complete visual identity |
| **Color** | Paper-warm light (#f2efe8) + ink-dark (#161513) — extremely restrained two-tone palette |
| **Typography** | Instrument Serif (display) + Space Grotesk (UI) with extensive italic usage |
| **Layout** | Magazine-editorial structure with numbered sections, asymmetric grids, side rails |
| **Motion** | Slow Ken Burns on hero image (24s cycle), film-grain texture overlay |
| **Navigation** | `mix-blend-mode: difference` masthead — seamless across light/dark sections |

> The original Claude Design system prompt that inspired this skill is preserved at [`dist/prompt/claude-design-system-prompt.md`](../../dist/prompt/claude-design-system-prompt.md).

---

## Background

This skill is inspired by the system prompt of [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs), Anthropic's visual design product launched in April 2026. Claude Design's system prompt (~420 lines) encodes a sophisticated set of design principles, anti-patterns, and workflow constraints that make its output consistently high-quality.

This project extracts and refines those core ideas into a portable skill that works with any AI coding agent — giving you Claude-Design-level design taste without the product lock-in or usage limits.

Key additions beyond the original Claude Design prompt:
- **Design system declaration step** — forces the AI to articulate design tokens in natural language before coding
- **v0 draft strategy** — a concrete methodology for showing work-in-progress early
- **Extended anti-cliché list** — additional patterns identified from real-world AI output
- **Placeholder philosophy** — a complete framework for handling missing assets professionally
- **Color × font pairing table** — six validated visual system starting points
- **Design Direction Advisor** — six-school conversational tool for vague requests, with explicit handoff to the recipe library
- **25-recipe anchored style library** — each recipe tied to a real brand / studio / designer with concrete copy-able values; defends against AI-default mush
- **Advanced pattern library** — ready-to-use code templates for common UI patterns

---

## License

MIT
