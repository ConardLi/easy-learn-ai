# Critique Mode — Detailed Reference

Read this when running Step 7 of the workflow (user asked for review, or self-check before delivery). The main `SKILL.md` already covers the **5 dimensions and output format**. This file provides **scoring rubrics, per-output-type weighting, and the common-issue catalog**.

**Critique the design, not the designer.** Be specific, actionable, and grounded in design language — not vague taste claims.

---

## The Five Dimensions — Detailed Rubrics

### 1. Philosophy Alignment

How well does every detail trace back to the chosen design direction (Pentagram-style information architecture, Kenya Hara-style minimalism, etc.)?

| Score | Standard |
|---|---|
| 9–10 | Every detail embodies the chosen philosophy; nothing reads as "borrowed from elsewhere" |
| 7–8 | Direction is correct, signature traits land, 1–2 minor drift moments |
| 5–6 | Intent visible, but mixed-in foreign elements dilute purity (e.g., "minimalism" with 6 cards per row) |
| 3–4 | Surface mimicry only; the underlying values aren't understood |
| 1–2 | No discernible relationship to any stated direction |

**What to look for**:
- Are signature moves of the chosen designer/studio actually present?
- Do color, type, layout, motion all agree on the same philosophy?
- Any "self-contradicting" elements? (Picked Kenya Hara then crammed the page full → contradiction)

### 2. Visual Hierarchy

Does the eye flow where the designer intends?

| Score | Standard |
|---|---|
| 9–10 | Eye flows naturally along the intended path; zero friction reading the information |
| 7–8 | Primary/secondary clear; 1–2 spots where hierarchy is muddy |
| 5–6 | Title vs. body distinguishable, but middle layers (subtitles, captions) collapse together |
| 3–4 | Information sits flat with no clear entry point |
| 1–2 | Chaotic — viewer doesn't know where to look first |

**What to look for**:
- Title vs. body size ratio ≥ 2.5× (ideally 4–6× for hero)?
- Color / weight / size building 3–4 clear levels?
- Whitespace actively guiding the eye?
- **Squint test**: squint at the screen — is the hierarchy still legible?

### 3. Craft Quality

Pixel-level execution: alignment, spacing, color discipline.

| Score | Standard |
|---|---|
| 9–10 | Pixel-perfect; alignment, spacing, color all flawless |
| 7–8 | Refined overall; 1–2 minor alignment or spacing issues |
| 5–6 | Basically aligned, but spacing is inconsistent and color use is unsystematic |
| 3–4 | Obvious alignment errors, chaotic spacing, too many colors |
| 1–2 | Sloppy — looks like a draft |

**What to look for**:
- Consistent spacing system (8pt grid: 8 / 16 / 24 / 32 / 48 / 64)?
- Same-class elements use identical spacing?
- Color count controlled (typically ≤ 4 — primary + accent + neutral scale + 1 emphasis)?
- Font families ≤ 2 (1 display + 1 body)?
- Edges align precisely?

### 4. Functionality

Does each element earn its place?

| Score | Standard |
|---|---|
| 9–10 | Every element serves a goal; zero redundancy |
| 7–8 | Function-led overall, with minor decoration that could be cut |
| 5–6 | Usable, but obvious decorative elements compete for attention |
| 3–4 | Form > function; users have to work to find information |
| 1–2 | Decoration drowns the content's ability to communicate |

**What to look for**:
- The deletion test: "If I delete this element, does the design get worse?" If no → delete
- Is the CTA / key information in the most prominent position?
- Anything added "because it looked good"?
- Is the information density appropriate for the medium? (PPT sparse; PDF can be denser; landing page conversion-focused)

### 5. Originality

Avoids clichés while staying coherent within the philosophy.

| Score | Standard |
|---|---|
| 9–10 | Refreshing; finds a unique expression *within* the chosen philosophy |
| 7–8 | Has its own ideas; not template-by-numbers |
| 5–6 | Average; reads as a template execution |
| 3–4 | Heavy use of clichés (gradient orbs for "AI", chat bubbles for "conversation") |
| 1–2 | Pure template / stock-asset assembly |

**What to look for**:
- Has it avoided the AI-slop list (purple gradients, emoji icons, left-border accent cards, Inter as display)?
- Is there at least one "unexpected but right" decision?
- Any element that screams "made by AI"?

---

## Per-Output-Type Weighting

Different outputs need different priorities. When scoring, weight these dimensions higher for each context:

| Output type | Most important | Secondary | Can relax |
|---|---|---|---|
| Landing page / marketing site | Functionality, Visual hierarchy | Originality | — (must be all-around) |
| Dashboard / data product | Functionality, Craft quality | Visual hierarchy | Originality (clarity wins) |
| HTML slide deck | Visual hierarchy, Functionality | Craft | Originality (legibility wins) |
| Mobile app prototype | Functionality, Craft | Visual hierarchy | Philosophy alignment (usability wins) |
| Brand launch animation / hero film | Originality, Visual hierarchy | Philosophy | Functionality (it's the moment, not the form) |
| Editorial / portfolio | Originality, Philosophy | Visual hierarchy | Functionality (vibe matters most) |
| Documentation site | Functionality, Visual hierarchy | Craft | Originality (find-the-answer wins) |
| Interactive prototype for user testing | Functionality, Visual hierarchy | Craft | Originality (testing the flow, not the look) |

---

## Common Issues — Top 10 Catalog

Use these as a checklist when running a critique. Each entry has the issue, why it matters, and the fix.

### 1. AI-tech cliché
**Issue**: Gradient orbs, digital rain, blue circuit boards, robot faces
**Why it's a problem**: Audience is exhausted by these — your product becomes indistinguishable
**Fix**: Use abstract metaphors instead of literal symbols (e.g., a "conversation" metaphor instead of a chat bubble icon)

### 2. Insufficient type-size hierarchy
**Issue**: Title and body are too similar in size (< 2.5×)
**Why**: Users can't find key information quickly
**Fix**: Title at least 3× body (16px body → 48–64px title; for hero, 6× is normal)

### 3. Too many colors
**Issue**: 5+ colors in use without a clear primary/secondary structure
**Why**: Visual chaos; weak brand identity
**Fix**: Limit to 1 primary + 1 secondary + 1 accent + grayscale; everything else has to justify itself

### 4. Inconsistent spacing
**Issue**: Element spacing chosen ad-hoc with no system
**Why**: Reads as unprofessional; visual rhythm broken
**Fix**: Adopt an 8pt grid (only use spacing values from {8, 16, 24, 32, 48, 64, 96})

### 5. Insufficient whitespace
**Issue**: Every region is filled with content
**Why**: Cognitive overload reduces information transfer; dense ≠ informative
**Fix**: Whitespace should be at least 40% of total area (60%+ for minimalist)

### 6. Too many fonts
**Issue**: 3+ font families in use
**Why**: Visual noise; weakens unity
**Fix**: At most 2 (1 display + 1 body); use weight and size variation for richness

### 7. Inconsistent alignment
**Issue**: Mixed left-, center-, and right-aligned blocks
**Why**: Breaks visual order
**Fix**: Pick one alignment (typically left) and apply globally; centered alignment only for hero / pull-quote moments

### 8. Decoration eclipses content
**Issue**: Background patterns / gradients / shadows steal focus from primary content
**Why**: Inverts the priority — users came for information, not for decoration
**Fix**: Apply the deletion test: "if I remove this decoration, does the design get worse?" If no → remove

### 9. Cyber-neon overuse
**Issue**: Dark navy `#0D1117` + neon-glow accents
**Why**: This is the GitHub-dark / "AI dev tool" cliché — every clone looks the same
**Fix**: Pick a more distinctive palette; if dark mode is mandatory, choose a non-default base (deep warm gray, near-black with hint of color)

### 10. Information density mismatched to medium
**Issue**: A wall of text on a slide; 10 elements crammed into a social cover
**Why**: Different media have different optimal density
**Fix**:
- Slides: 1 core idea per page
- Cover image: 1 visual focal point
- Infographic: layered (overview → detail)
- PDF / docs: can be dense, but needs clear navigation

---

## Output Template (copy this when delivering a critique)

```markdown
## Design Critique

**Overall: X.X / 10** [Excellent (8+) / Good (6–7.9) / Needs work (4–5.9) / Failing (<4)]

**By dimension**:
- Philosophy alignment: X / 10 — [one-sentence reason]
- Visual hierarchy: X / 10 — [one-sentence reason]
- Craft quality: X / 10 — [one-sentence reason]
- Functionality: X / 10 — [one-sentence reason]
- Originality: X / 10 — [one-sentence reason]

### Keep
- [Specific things done well, in design language — not "the colors are nice", say "the muted terracotta against warm off-white reads as confident and editorial"]

### Fix (sorted by severity)

**1. [Issue name]** — ⚠️ Critical / ⚡ Important / 💡 Polish
- Current: [what it looks like now]
- Why: [why it's a problem, anchored in a principle above]
- Fix: [concrete change with specific values — "increase title size from 32px to 56px", not "make titles bigger"]

**2. [Issue name]** — ⚠️ / ⚡ / 💡
…

### Quick Wins (top 3 if you only have 5 minutes)
- [ ] [Highest-impact change that takes the least time]
- [ ] [Second]
- [ ] [Third]
```

---

## Critique Anti-Patterns

❌ **Vague taste claims**: "the colors are off" → bad. "The accent saturation is too high — at oklch(0.65 0.25 25) it competes with the primary; reduce to 0.18 chroma to subordinate it" → good.

❌ **Praise without specifics**: "looks great!" provides zero learning. Always say *what* is great and *why*.

❌ **Mixing severity**: putting a critical hierarchy bug next to a polish-level color tweak in the same list. Always sort by ⚠️ → ⚡ → 💡.

❌ **More than 7 fix items**: cognitive overload. If there are more, group them — "five spacing inconsistencies" as one item, not five.

❌ **Critiquing without grounding**: every "Fix" should reference a principle (hierarchy, craft, philosophy, etc.) so the user understands the *why*, not just the *what*.

❌ **Critiquing the designer instead of the design**: "you didn't think this through" is unhelpful and not the agent's role. "This element doesn't earn its place — consider removing" is the right framing.
