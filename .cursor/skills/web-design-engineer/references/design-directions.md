# Design Direction Advisor — Extended Reference

Read this when the request is vague ("make something nice", "I don't know what style I want") and no design context exists. The main `SKILL.md` already covers the **mechanism** (3 differentiated directions, named designer references, hard rule against same-school picks). This file provides the **school taxonomy** — six high-level philosophical lenses, each with named anchors and the sample copy you use to recommend it.

> **Terminology lock**: this file deals in **schools** (six high-level lenses) and **anchors** (named studios / brands / designers per school). The companion folder `style-recipes/` contains 25 **recipe** files — one file per anchor — with concrete, ready-to-paste configurations. When a user picks a school here, hand them off to the recipe files in that school for concrete palette / typography / spacing values. Load only the recipe files you actually need; the catalog index is at `style-recipes/INDEX.md`.

---

## How to Use This File

1. Read the user's request and the four positioning questions (narrative role / viewing distance / visual temperature / capacity)
2. Pick **3 schools from different rows** below that genuinely fit the user's context
3. Recommend each with: named designer/studio + 2–3 lines of "why this fits you" + 3–4 signature visual cues + (optional) one famous touchstone work
4. Wait for the user to pick one (or remix two)
5. **After the user picks a school → read 2–3 recipe files from `style-recipes/` in that school** (e.g., picked *Information Architecture* → read `style-recipes/pentagram.md` + `style-recipes/bloomberg-terminal.md` + `style-recipes/tufte-dataink.md`). The recipe files carry the concrete values; this file does not duplicate them.
6. The chosen recipe becomes the design context — write it into `brand-spec.md` and proceed to the main workflow

---

## The Six Schools (1 of 3 must come from each different row)

### 1. Information Architecture

**Vibe**: Rational, data-driven, restrained, hierarchy-led
**Best for**: Safe / professional / B2B / data products / institutional
**Why it works**: Treats the page as a *system* of typographic and grid relationships. The "design" disappears so the information speaks.

| Anchor | What to borrow |
|---|---|
| **Pentagram** (Paula Scher, Michael Bierut) | Bold typography as image; identity through type relationships; sparing color use |
| **Edward Tufte** | Maximum data-ink ratio; small multiples; smallest sufficient difference |
| **Massimo Vignelli** | Helvetica-style restraint; strict grid; 6 typefaces is enough for a lifetime |
| **Bloomberg Terminal** | Mission-critical density; amber-on-near-black; monospaced data |
| **NYT / Broadsheet editorial** | Multi-deck hierarchy; serif headlines; place-rich photography |

**Concrete starting points** (each is a single file in `style-recipes/` — read one): [`pentagram`](./style-recipes/pentagram.md) · [`vignelli-swiss-helvetica`](./style-recipes/vignelli-swiss-helvetica.md) · [`bloomberg-terminal`](./style-recipes/bloomberg-terminal.md) · [`tufte-dataink`](./style-recipes/tufte-dataink.md) · [`nyt-the-daily`](./style-recipes/nyt-the-daily.md) — each carries the palette, typography, spacing, and signature moves to paste straight into Step 3.

**Sample copy when recommending**:
> "Pentagram-style information architecture — your dashboard becomes a system of typographic relationships rather than a UI. Headlines do the heavy visual lifting; everything else recedes. Best when you want institutional credibility and your data is the hero."

---

### 2. Editorial / Minimalist

**Vibe**: Whitespace, refined typography, quiet luxury, considered
**Best for**: Premium / high-end / quiet / lifestyle / prestige B2C
**Why it works**: Treats whitespace as the primary design material. The reader/viewer gets room to breathe; restraint reads as confidence.

| Anchor | What to borrow |
|---|---|
| **Kenya Hara (MUJI)** | Whiteness as a value; *ex-formation*; emptiness as fullness |
| **Apple HIG / Marketing** | Generous negative space; hero product on white; one-thought-per-screen |
| **Dieter Rams (Braun)** | "Less but better"; honest materials; functional decoration is a contradiction |
| **Aesop** | Cream/sage palette; serif copy as conversation; product as protagonist |
| **Monocle** | Magazine-grade kicker / headline / dek hierarchy; international considered |

**Concrete starting points** (each is a single file in `style-recipes/` — read one): [`apple-hig`](./style-recipes/apple-hig.md) · [`muji-kenya-hara`](./style-recipes/muji-kenya-hara.md) · [`aesop`](./style-recipes/aesop.md) · [`dieter-rams-braun`](./style-recipes/dieter-rams-braun.md) · [`monocle-magazine`](./style-recipes/monocle-magazine.md) — each carries the palette, typography, spacing, and signature moves to paste straight into Step 3.

**Sample copy when recommending**:
> "Kenya Hara-style editorial minimalism — the page is mostly whitespace, with one serif headline carrying emotional weight and the product anchored in a single hero shot. Best when premium positioning matters more than feature density."

---

### 3. Motion / Experimental

**Vibe**: Bold, generative, sensory, kinetic, technical
**Best for**: Distinctive / launch films / brand moments / awwwards-style / tech storytelling
**Why it works**: Movement and surprise are the brand. Static screenshots can't capture the experience.

| Anchor | What to borrow |
|---|---|
| **Field.io** | Generative type and form; data-driven motion; the page is a system that *makes* itself |
| **Active Theory** | WebGL hero moments; physics-driven interactions; cinematic transitions |
| **Resn** | Storytelling through scroll; payoff for exploration; surprise is the reward |

**Concrete starting points** (each is a single file in `style-recipes/` — read one): [`field-io`](./style-recipes/field-io.md) · [`active-theory`](./style-recipes/active-theory.md) · [`resn-storytelling`](./style-recipes/resn-storytelling.md) — each carries the palette, typography, spacing, and signature moves to paste straight into Step 3.

> Note: Vercel / Linear marketing pages use motion *as restraint*, not as the show — they live in the **Modern Tool / Builder SaaS** school below, not here. Reach for this school only when motion is genuinely the brand.

**Sample copy when recommending**:
> "Field.io-style motion-led identity — the page generates itself in front of the visitor through choreographed scroll-driven sequences. Best when the launch *moment* matters and your audience will share clips. Note: this is the most labor-intensive of the three; budget accordingly."

---

### 4. Brutalist / Raw

**Vibe**: Anti-design, honest, unpolished, confrontational
**Best for**: Differentiated / confident / counter-culture / publishing / artist platforms
**Why it works**: Ugly-on-purpose reads as authentic in a sea of polished AI defaults. The lack of consensus aesthetic *is* the aesthetic.

| Anchor | What to borrow |
|---|---|
| **Are.na** | Raw HTML feel; system fonts on purpose; content > chrome |
| **Bloomberg Businessweek covers** (Richard Turley era) | Typographic violence; magazine grid abused; copy as image |
| **Balenciaga** (post-2017) | Default browser styling weaponized; hero text in Helvetica at absurd scale |
| **Craigslist (yes, really)** | Information density without apology; everything is a link |

**Concrete starting points** (each is a single file in `style-recipes/` — read one): [`are-na`](./style-recipes/are-na.md) · [`bloomberg-businessweek-turley`](./style-recipes/bloomberg-businessweek-turley.md) · [`balenciaga-post-2017`](./style-recipes/balenciaga-post-2017.md) — each carries the palette, typography, spacing, and signature moves to paste straight into Step 3.

**Sample copy when recommending**:
> "Are.na/Bloomberg-style brutalism — system fonts, harsh type contrast, no rounded corners, no shadows. Confrontational on purpose. Best when you're a strong contrarian voice and want to repel the crowd that wants 'modern SaaS.' Warning: half-measures here look broken, not bold."

---

### 5. Warm Humanist

**Vibe**: Approachable, organic, hand-touched, friendly without being childish
**Best for**: Lifestyle / education / approachable B2C / community products / health
**Why it works**: Conveys that real humans made this for real humans. Counters the "robot wrote my landing page" perception.

| Anchor | What to borrow |
|---|---|
| **Mailchimp** (early Freddie era) | Hand-drawn marks; warm illustration; personality in microcopy |
| **Stripe Press** | Editorial serif + warm palette + tactile object photography |
| **Studio Dumbar** | Identity through movement and personality, not through restraint |
| **Headspace / Calm** | Soft pastels, rounded everything, breathing-pace motion |

**Concrete starting points** (each is a single file in `style-recipes/` — read one): [`mailchimp-freddie`](./style-recipes/mailchimp-freddie.md) · [`stripe-press`](./style-recipes/stripe-press.md) · [`headspace-meditation`](./style-recipes/headspace-meditation.md) — each carries the palette, typography, spacing, and signature moves to paste straight into Step 3.

> Note: Notion (pre-AI era) borrows from this school's friendly tone but lives in the **Modern Tool / Builder SaaS** school below — it's a tool first, warmth second.

**Sample copy when recommending**:
> "Stripe Press / early Mailchimp warmth — humanist serifs, cream palette, illustrations that feel hand-touched. Best when you want trust and approachability over institutional polish. Tone is 'friend who happens to be expert,' not 'expert addressing client.'"

---

### 6. Modern Tool / Builder SaaS

**Vibe**: Quiet luxury for tools, hairline detail, warm dark + monospace accents
**Best for**: Developer tools, B2B SaaS, AI tools, infrastructure / platform products, productivity apps
**Why it works**: Confident restraint reads as "made by people who use tools," not "made by marketers." Hairline borders, monospace shortcut chips, and a single accent color signal craft-led culture without shouting. This is the most under-served school in AI-default output — every model wants to reach for the purple-pink-blue gradient instead.

| Anchor | What to borrow |
|---|---|
| **Linear** | Hairline 1px borders, warm dark ground, selective purple accent < 5% of pixels, keyboard-first chips |
| **Vercel** (recent) | Black + white precision broken by *one* feathered gradient mesh; deploy-log realism in the hero |
| **Raycast** | Glassy command-palette as hero; per-extension color dots used as small accents |
| **Notion** (pre-AI era) | Friendly serif headlines + emoji-as-icon on cream surfaces; structure first, warmth second |

**Concrete starting points** (each is a single file in `style-recipes/` — read one): [`linear`](./style-recipes/linear.md) · [`vercel-mesh`](./style-recipes/vercel-mesh.md) · [`raycast`](./style-recipes/raycast.md) · [`notion-pre-ai`](./style-recipes/notion-pre-ai.md) — each carries the palette, typography, spacing, and signature moves to paste straight into Step 3.

**Sample copy when recommending**:
> "Linear-style modern-tool aesthetic — warm dark ground, hairline 1px borders, a single purple accent used on less than 5% of pixels, monospace shortcut chips. Best when your audience is technical and 'serious but designed' matters more than 'fun and accessible.' This is the recipe that defends most directly against AI-default Inter + blue button + 16px-radius output."

---

## When the User Picks (or Remixes)

Common user responses:

- **"I'll go with #2."** → Direction confirmed. Write it into `brand-spec.md`. Proceed to Step 2 with this as design context.
- **"I like A's color but C's layout."** → Confirm the remix in writing ("So: minimalist editorial palette + motion-led layout choreography. Right?"), then proceed.
- **"None of these feel right — show me more."** → Ask one targeted question to narrow ("Are you closer to formal/institutional or playful/expressive?"), then offer 3 fresh directions from rows you didn't show before.
- **"I don't know, you pick."** → Pick the safest one (usually Editorial / Minimalist), state your reasoning, and propose a 5-minute v0 to validate before committing.

---

## AI-Prompt Templates (when generating imagery to support a direction)

Format: `[philosophy DNA] + [content description] + [technical params]`

✅ **Good** (specific characteristics):
> "Kenya Hara-influenced minimalism with 80% whitespace, single muted terracotta (#C04A1A) accent, GT Sectra serif headline, single product hero on warm off-white (#F2EFE8) ground, soft top-down lighting, 3:2 aspect"

❌ **Bad** (style names without DNA):
> "minimalist style, premium feel, high quality"

Always include:
- Color HEX (not "warm" / "cool")
- Aspect ratio and dimensions
- Composition rules (rule-of-thirds, centered, asymmetric)
- What to *avoid* (e.g., "no purple gradient, no emoji, no rounded cards")

> Each recipe file in `style-recipes/` ships a pre-written **AI prompt seed** tuned to that recipe's DNA — start from the one you're using rather than writing prompts from scratch.

---

## Anti-Patterns in Direction Recommendation

❌ **Recommending 3 picks from the same row** — the user can't tell them apart; the entire point of "differentiated directions" collapses

❌ **Recommending "minimalism" / "modern" / "clean"** as the direction name — these are not directions, they are AI-default words. Always anchor on a named designer/studio.

❌ **Recommending without any "why this fits you"** — the user wanted *guidance*, not a multiple-choice quiz. Each option must explain its fit to their context (audience, purpose, budget, brand maturity).

❌ **Showing 5+ directions** — choice paralysis. 3 is the sweet spot. If the first 3 all miss, ask one narrowing question and offer 3 fresh ones.

❌ **Asking the user to score each direction 1–10** — that's offloading the recommendation back to them. Make a recommendation; the user will agree or push back.
