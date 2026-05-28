import type { CSSProperties } from "react";

/**
 * 25 hand-crafted cover compositions — one per recipe.
 * Each cover commits to the recipe's actual palette, typography, and signature
 * move (Tufte = sparkline; Bloomberg = amber ticker on navy; Y2K = chrome
 * bevel; Pentagram = bold display letter, etc.).
 *
 * The component returns the inner content; the wrapping `.recipe-cover` div
 * is rendered by RecipeCard so framing/aspect-ratio stays consistent.
 */

// — Editorial / Minimalist —————————————————————————————————————

function AppleCover() {
  return (
    <div className="rc rc-apple-hig">
      <span className="rc-apple-eyebrow">iPhone</span>
      <span className="rc-apple-title">17 Pro</span>
      <span className="rc-apple-tagline">Titanium. Forged for pros.</span>
      <div className="rc-apple-device" aria-hidden />
    </div>
  );
}

function MujiCover() {
  return (
    <div className="rc rc-muji">
      <span className="rc-muji-rule" aria-hidden />
      <span className="rc-muji-mark">無印良品</span>
      <span className="rc-muji-meta">No 0042 · 茶筒 · 240ml</span>
    </div>
  );
}

function AesopCover() {
  return (
    <div className="rc rc-aesop">
      <span className="rc-aesop-cat">Skin · Body · Hair</span>
      <span className="rc-aesop-mark">Aesop</span>
      <span className="rc-aesop-tagline">A balm for considered hands.</span>
      <span className="rc-aesop-dot" aria-hidden />
    </div>
  );
}

function DieterRamsCover() {
  return (
    <div className="rc rc-rams">
      <span className="rc-rams-num">10</span>
      <ol className="rc-rams-list">
        <li>useful</li>
        <li>understandable</li>
        <li>unobtrusive</li>
        <li>honest</li>
      </ol>
      <div className="rc-rams-shapes" aria-hidden>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function MonocleCover() {
  return (
    <div className="rc rc-monocle">
      <span className="rc-monocle-issue">Issue 178 · The Forecast</span>
      <span className="rc-monocle-mark">M</span>
      <ul className="rc-monocle-cities">
        <li>Tokyo</li>
        <li>Zürich</li>
        <li>Lisbon</li>
        <li>Seoul</li>
      </ul>
      <span className="rc-monocle-rule" aria-hidden />
    </div>
  );
}

// — Information Architecture ———————————————————————————————————

function PentagramCover() {
  return (
    <div className="rc rc-pentagram">
      <span className="rc-pentagram-mark">P</span>
      <span className="rc-pentagram-meta">Pentagram · 1972</span>
    </div>
  );
}

function VignelliCover() {
  const lines: { name: string; color: string }[] = [
    { name: "4·5·6", color: "#00933C" },
    { name: "1·2·3", color: "#EE352E" },
    { name: "N·Q·R·W", color: "#FCCC0A" },
    { name: "A·C·E", color: "#0039A6" },
    { name: "B·D·F·M", color: "#FF6319" },
    { name: "L", color: "#A7A9AC" },
  ];
  return (
    <div className="rc rc-vignelli">
      <ul className="rc-vignelli-discs">
        {lines.map((l) => (
          <li key={l.name} style={{ background: l.color }}>
            <span>{l.name}</span>
          </li>
        ))}
      </ul>
      <span className="rc-vignelli-mark">SUBWAY</span>
    </div>
  );
}

function BloombergTerminalCover() {
  const rows = [
    { sym: "AAPL", price: "242.18", delta: "+0.42" },
    { sym: "NVDA", price: "189.55", delta: "+2.31" },
    { sym: "TSLA", price: "298.07", delta: "-0.18" },
    { sym: "BTC ", price: "94 281", delta: "+1.08" },
  ];
  return (
    <div className="rc rc-bbt">
      <div className="rc-bbt-head">
        <span>SYM</span>
        <span>LAST</span>
        <span>ΔPCT</span>
      </div>
      {rows.map((r) => (
        <div key={r.sym} className={`rc-bbt-row ${r.delta.startsWith("-") ? "is-down" : "is-up"}`}>
          <span>{r.sym}</span>
          <span>{r.price}</span>
          <span>{r.delta}</span>
        </div>
      ))}
      <div className="rc-bbt-foot">F1·HELP · F4·EQUITY · ▮▮▮▮▮▮</div>
    </div>
  );
}

function TufteCover() {
  return (
    <div className="rc rc-tufte">
      <p className="rc-tufte-line">
        Galileo&apos;s 1610 sketches{" "}
        <svg className="rc-tufte-spark" viewBox="0 0 80 18" aria-hidden>
          <polyline
            points="0,12 8,9 16,11 24,7 32,8 40,4 48,6 56,5 64,2 72,4 80,1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>{" "}
        suggested four moons{" "}
        <svg className="rc-tufte-spark" viewBox="0 0 80 18" aria-hidden>
          <polyline
            points="0,9 8,4 16,7 24,11 32,6 40,9 48,13 56,7 64,3 72,8 80,11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>{" "}
        orbiting Jupiter.
      </p>
      <div className="rc-tufte-multiples">
        {Array.from({ length: 12 }).map((_, i) => (
          <svg key={i} viewBox="0 0 40 22" aria-hidden>
            <polyline
              points={`0,${15 - (i % 4) * 2} 10,${10 + ((i + 1) % 3) * 2} 20,${
                6 + (i % 5)
              } 30,${12 - (i % 3)} 40,${4 + (i % 4)}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

function NytCover() {
  return (
    <div className="rc rc-nyt">
      <span className="rc-nyt-dateline">Wednesday, May 27, 2026 · Late Edition</span>
      <span className="rc-nyt-mark">𝔗</span>
      <h3 className="rc-nyt-head">A Quiet Revolution in How We Read the News</h3>
      <span className="rc-nyt-byline">By J. Halberstam · 14 min listen</span>
      <span className="rc-nyt-rule" aria-hidden />
    </div>
  );
}

// — Modern Tool / Builder SaaS —————————————————————————————————

function LinearCover() {
  return (
    <div className="rc rc-linear">
      <div className="rc-linear-mesh" aria-hidden />
      <div className="rc-linear-row">
        <span className="rc-linear-status" />
        <span>ENG-2841 · Hash routing edge-case in shared link</span>
        <kbd>⌘K</kbd>
      </div>
      <div className="rc-linear-row">
        <span className="rc-linear-status is-done" />
        <span>ENG-2840 · Audit hairline borders across cards</span>
        <kbd>⏎</kbd>
      </div>
      <span className="rc-linear-mark">Linear</span>
    </div>
  );
}

function VercelCover() {
  return (
    <div className="rc rc-vercel">
      <div className="rc-vercel-mesh" aria-hidden />
      <svg className="rc-vercel-tri" viewBox="0 0 100 86" aria-hidden>
        <polygon points="50,0 100,86 0,86" fill="currentColor" />
      </svg>
      <span className="rc-vercel-mark">▲ vercel</span>
      <span className="rc-vercel-meta">Deployed · iad1 · 38 ms</span>
    </div>
  );
}

function RaycastCover() {
  return (
    <div className="rc rc-raycast">
      <div className="rc-raycast-void" aria-hidden />
      <div className="rc-raycast-bar">
        <span>⌘</span>
        <span className="rc-raycast-q">Search emoji…</span>
        <span className="rc-raycast-k">⌘K</span>
      </div>
      <ul className="rc-raycast-list">
        <li>
          <span>🪐</span> Saturn
        </li>
        <li>
          <span>🌗</span> Last quarter moon
        </li>
        <li>
          <span>☄️</span> Comet
        </li>
      </ul>
    </div>
  );
}

function NotionCover() {
  return (
    <div className="rc rc-notion">
      <span className="rc-notion-bread">Projects / Notes</span>
      <h3 className="rc-notion-title">
        <span aria-hidden>📒</span> Weekly review
      </h3>
      <div className="rc-notion-block">
        <span className="rc-notion-handle" aria-hidden>
          ⋮⋮
        </span>
        <span>Three things that went well this week.</span>
      </div>
      <div className="rc-notion-callout">
        <span aria-hidden>💡</span> Type <code>/callout</code> to insert one.
      </div>
    </div>
  );
}

// — Motion / Experimental ——————————————————————————————————————

function FieldIOCover() {
  return (
    <div className="rc rc-field">
      <div className="rc-field-particles" aria-hidden />
      <span className="rc-field-cap">01 / Generative case studies — 2017—2026</span>
      <span className="rc-field-mark">Field</span>
    </div>
  );
}

function ActiveTheoryCover() {
  return (
    <div className="rc rc-active">
      <div className="rc-active-mesh" aria-hidden />
      <span className="rc-active-mark">WEBGL</span>
      <span className="rc-active-foot">Active Theory · since 2014</span>
    </div>
  );
}

function ResnCover() {
  return (
    <div className="rc rc-resn">
      <div className="rc-resn-noise" aria-hidden />
      <div className="rc-resn-spot" aria-hidden />
      <span className="rc-resn-mark">RESN</span>
      <span className="rc-resn-cap">a tableau in nine acts</span>
    </div>
  );
}

// — Brutalist / Raw ————————————————————————————————————————————

function ArenaCover() {
  return (
    <div className="rc rc-arena">
      <h3 className="rc-arena-channel">channel: design DNA — 132 blocks</h3>
      <ul className="rc-arena-links">
        <li>
          <a href="#">Vignelli on Helvetica</a> · text
        </li>
        <li>
          <a href="#">aesop store interiors</a> · image
        </li>
        <li>
          <a href="#">type as image — Pentagram</a> · link
        </li>
        <li>
          <a href="#">subway map, 1972</a> · attachment
        </li>
      </ul>
    </div>
  );
}

function BwTurleyCover() {
  return (
    <div className="rc rc-bwt">
      <span className="rc-bwt-issue">Bloomberg Businessweek · May 27, 2026</span>
      <span className="rc-bwt-mark">BW</span>
      <span className="rc-bwt-headline">THE GREAT&nbsp;UNBUNDLING</span>
      <span className="rc-bwt-sticker">ISSUE 4901</span>
    </div>
  );
}

function BalenciagaCover() {
  return (
    <div className="rc rc-balenciaga">
      <span className="rc-balenciaga-mark">BALENCIAGA</span>
      <span className="rc-balenciaga-sub">SS26 · LOOK 14 OF 47</span>
      <span className="rc-balenciaga-sku">BAL/SS26/W-0142/BLK</span>
    </div>
  );
}

// — Warm Humanist ——————————————————————————————————————————————

function MailchimpCover() {
  return (
    <div className="rc rc-mailchimp">
      <svg className="rc-mailchimp-doodle" viewBox="0 0 240 80" aria-hidden>
        <path
          d="M10,55 C30,30 60,72 90,40 S150,15 170,50 S220,72 235,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="rc-mailchimp-hello">Hello, friend!</span>
      <span className="rc-mailchimp-sub">Send your first campaign in 4 steps.</span>
      <span className="rc-mailchimp-emoji" aria-hidden>
        ✦
      </span>
    </div>
  );
}

function StripePressCover() {
  return (
    <div className="rc rc-stripe">
      <span className="rc-stripe-stamp" aria-hidden />
      <span className="rc-stripe-mark">Stripe&nbsp;Press</span>
      <span className="rc-stripe-title">
        Working in Public
      </span>
      <span className="rc-stripe-author">Nadia Eghbal</span>
    </div>
  );
}

function HeadspaceCover() {
  return (
    <div className="rc rc-headspace">
      <div className="rc-headspace-sun" aria-hidden />
      <div className="rc-headspace-blob" aria-hidden />
      <span className="rc-headspace-title">Letting go</span>
      <span className="rc-headspace-meta">Day 03 · 12 min</span>
    </div>
  );
}

// — Specialty / Genre —————————————————————————————————————————

function Y2KCover() {
  return (
    <div className="rc rc-y2k">
      <div className="rc-y2k-lava" aria-hidden />
      <div className="rc-y2k-chrome" aria-hidden>
        <span>GO</span>
      </div>
      <span className="rc-y2k-mark">y2k.exe</span>
      <span className="rc-y2k-meta">~ welcome to the future ~</span>
    </div>
  );
}

function MidCenturyCover() {
  return (
    <div className="rc rc-mid-century">
      <span className="rc-mc-rect" aria-hidden />
      <span className="rc-mc-circle" aria-hidden />
      <span className="rc-mc-tri" aria-hidden />
      <span className="rc-mc-mark">A FILM BY OTTO PREMINGER</span>
    </div>
  );
}

// — Cover map ——————————————————————————————————————————————————

export const COVERS: Record<string, () => JSX.Element> = {
  "apple-hig": AppleCover,
  "muji-kenya-hara": MujiCover,
  aesop: AesopCover,
  "dieter-rams-braun": DieterRamsCover,
  "monocle-magazine": MonocleCover,
  pentagram: PentagramCover,
  "vignelli-swiss-helvetica": VignelliCover,
  "bloomberg-terminal": BloombergTerminalCover,
  "tufte-dataink": TufteCover,
  "nyt-the-daily": NytCover,
  linear: LinearCover,
  "vercel-mesh": VercelCover,
  raycast: RaycastCover,
  "notion-pre-ai": NotionCover,
  "field-io": FieldIOCover,
  "active-theory": ActiveTheoryCover,
  "resn-storytelling": ResnCover,
  "are-na": ArenaCover,
  "bloomberg-businessweek-turley": BwTurleyCover,
  "balenciaga-post-2017": BalenciagaCover,
  "mailchimp-freddie": MailchimpCover,
  "stripe-press": StripePressCover,
  "headspace-meditation": HeadspaceCover,
  "y2k-retrofuturism": Y2KCover,
  "mid-century-modern": MidCenturyCover,
};

export type CoverProps = { id: string; style?: CSSProperties };

export function RecipeCover({ id, style }: CoverProps) {
  const C = COVERS[id];
  return (
    <div className="recipe-cover" style={style}>
      {C ? <C /> : null}
    </div>
  );
}
