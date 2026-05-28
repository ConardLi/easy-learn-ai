export function DieterRamsBraunDemo() {
  return (
    <div className="demo-rams">
      <header className="dr-nav">
        <div className="dr-mark">
          <span className="dr-mark-id">D/RAMS</span>
          <span className="dr-mark-sub">Functional Archive — 1957→</span>
        </div>
        <nav>
          <a>Audio</a>
          <a className="is-current">Time</a>
          <a>Light</a>
          <a>Kitchen</a>
          <a>Office</a>
          <a>Principles</a>
        </nav>
        <span className="dr-nav-status">
          <span className="dr-dot" /> 1 unit active
        </span>
      </header>

      <main className="dr-main">
        <section className="dr-hero">
          <div className="dr-hero-meta">
            <div className="dr-hero-id">ET-66 / TIME</div>
            <h1>Type ET-66</h1>
            <p>Pocket calculator with built-in chronograph. Designed 1987. Still made.</p>
            <ul className="dr-hero-spec">
              <li>
                <span>Dimensions</span>
                <span>147 × 78 × 9 mm</span>
              </li>
              <li>
                <span>Mass</span>
                <span>105 g</span>
              </li>
              <li>
                <span>Power</span>
                <span>Solar + LR44 reserve</span>
              </li>
              <li>
                <span>Display</span>
                <span>10-digit LCD, grey field</span>
              </li>
              <li>
                <span>Material</span>
                <span>ABS housing · steel keypad</span>
              </li>
              <li>
                <span>Origin</span>
                <span>Kronberg im Taunus, DE</span>
              </li>
            </ul>
          </div>
          <div className="dr-hero-stage">
            <div className="dr-hero-grid" />
            <div className="dr-hero-object">
              <div className="dr-hero-screen">
                <div className="dr-hero-screen-bar" />
                <div className="dr-hero-screen-num">12:09</div>
              </div>
              <div className="dr-hero-keys">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className={`dr-key ${i === 19 ? "dr-key--accent" : ""}`} />
                ))}
              </div>
              <div className="dr-hero-power" aria-label="power">
                <span /> POWER
              </div>
            </div>
            <div className="dr-hero-callout dr-hero-callout--1">
              <span>A — Power lamp · 2.8mm Ø</span>
            </div>
            <div className="dr-hero-callout dr-hero-callout--2">
              <span>B — Function row · 6 keys</span>
            </div>
            <div className="dr-hero-callout dr-hero-callout--3">
              <span>C — Display field · 38 × 12 mm</span>
            </div>
          </div>
        </section>

        <section className="dr-principles">
          <div className="dr-section-eyebrow">10 Principles · Applied to ET-66</div>
          <ol className="dr-principle-list">
            {[
              ["Innovative", "Solar calculation in a body 9 mm thick"],
              ["Useful", "Two functions, both used daily"],
              ["Aesthetic", "Tonal restraint; the orange dot is the only colour"],
              ["Understandable", "Keys labelled in plain Akzidenz-Grotesk"],
              ["Unobtrusive", "Mat finish refuses to attract light"],
              ["Honest", "Buttons travel — no fake haptics"],
              ["Long-lasting", "Repairable; spares for 32 years"],
              ["Thorough", "Even the screw heads are aligned"],
              ["Environmental", "ABS recycled, batteries returnable"],
              ["As little design as possible", "No logo on the front"],
            ].map(([n, d], i) => (
              <li key={n}>
                <span className="dr-principle-no">{(i + 1).toString().padStart(2, "0")}</span>
                <div>
                  <strong>{n}</strong>
                  <span>{d}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="dr-archive">
          <div className="dr-section-eyebrow">In the family</div>
          <div className="dr-archive-grid">
            {[
              { id: "T3 / 1958", n: "Radio", color: "Ivory" },
              { id: "SK4 / 1956", n: "Phonograph", color: "Light grey" },
              { id: "L1 / 1957", n: "Loudspeaker", color: "White" },
              { id: "DW20 / 1985", n: "Clock", color: "Black" },
              { id: "L450 / 1968", n: "Hi-fi", color: "Slate" },
              { id: "PS500 / 1968", n: "Turntable", color: "White" },
            ].map((p) => (
              <article key={p.id} className="dr-archive-card">
                <div className="dr-archive-tile">
                  <div className="dr-archive-stripe" />
                </div>
                <div className="dr-archive-meta">
                  <div className="dr-archive-id">{p.id}</div>
                  <div className="dr-archive-name">{p.n}</div>
                  <div className="dr-archive-color">{p.color}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="dr-foot">
        <span>D/RAMS — Functional Archive · Kronberg im Taunus, DE</span>
        <span>Sheet 04 / 217 · Catalogue of working objects</span>
      </footer>
    </div>
  );
}
