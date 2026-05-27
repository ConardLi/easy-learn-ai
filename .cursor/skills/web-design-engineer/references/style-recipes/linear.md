# linear — Linear (Modern Builder Tool)

- **School**: Modern Tool / Builder SaaS
- **Vibe**: Quiet luxury for developer tools; warm dark, hairline detail, restraint as confidence
- **Best for**: Developer tools, AI tools, B2B SaaS where "serious + designed" matters
- **Touchstone**: linear.app, the Linear changelog page, Linear Method site

**Palette**
- Ground: `#08090A` (near-black with warm undertone, not pure black)
- Surface 1: `#16171C`
- Surface 2: `#1E1F25`
- Surface 3 (raised): `#26272E`
- Hairline border: `rgba(255,255,255,0.06)`
- Primary text: `#F7F8F8`
- Secondary text: `#9CA3AF`
- Muted text: `#6B7280`
- Accent: Linear purple `#5E6AD2` — used on < 5% of pixels
- Gradient meshes (very controlled, < 8% opacity) in the hero only

**Typography**
- Display: Inter Tight at weight 600 (or Söhne, or Geist Sans) — never plain Inter at default weight, that's the AI-default
- Body: Inter at 14–15px, weight 400–500, line-height 1.55
- Mono: GeistMono, JetBrains Mono, or Berkeley Mono for inline code and shortcut chips
- Letter-spacing on display headlines: -0.02em (tight)

**Spacing**: 4 / 8 / 12 / 16 / 24 / 40 / 64 / 96

**Radius**: 6 (small UI) / 12 (medium cards) / 16 (large panels). **Never above 16.** Linear's radius character is "modest, precise, never gummy."

**Shadow**: barely there — soft `0 1px 2px rgba(0,0,0,0.3)` on raised surfaces. **Never glow, never colored shadow.**

**Motion**: ease-out around 150ms for hover, 350–450ms for layout moves with a quint curve (e.g., the famous cubic-bezier(0.22, 1, 0.36, 1)). State changes feel "snappy but not bouncy."

**Signature moves**
- Hairline 1px borders in `rgba(255,255,255,0.06)` separating every panel, everywhere
- Selective accent use — purple appears on focused / active states, on tiny pills, on key brand surfaces; never on body backgrounds
- Inline code styled with monospaced font and dim background `#1E1F25`, color `#A78BFA`
- Subtle gradient meshes in the hero (extremely controlled saturation, < 8% opacity) — *not* the bright purple-pink-blue AI cliché
- Keyboard-shortcut chips throughout the UI (the brand celebrates keyboard-first)
- A bottom-pinned screenshot of the actual product on landing pages

**Avoid**
- Emoji
- Bouncy springs or elastic easings
- More than one saturated color (Linear's purple is the only accent)
- Border-radius above 16
- Stock photography of people
- "Get Started Free" hero CTAs styled like a 2018 SaaS landing page

**AI prompt seed**
> Abstract product UI screenshot, warm dark #08090A background, hairline borders, panels with #16171C and #1E1F25 surfaces, very subtle blue-purple ambient lighting at top edge, no people, no text on the image itself, 16:9.

**Don't use when**
- The brand is consumer-friendly / playful — Linear reads as professional and serious
- The product needs warmth or hand-touched feel
- The audience is non-technical (the keyboard-shortcut and monospace signals don't land)

---

> **Same school — Modern Tool / Builder SaaS**: [`vercel-mesh`](./vercel-mesh.md) · [`raycast`](./raycast.md) · [`notion-pre-ai`](./notion-pre-ai.md)  
> **Browse all 25 recipes**: [INDEX.md](./INDEX.md)
