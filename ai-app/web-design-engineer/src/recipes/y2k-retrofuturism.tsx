export function Y2KDemo() {
  return (
    <div className="demo-y2k">
      <div className="y2-bg" aria-hidden>
        <div className="y2-orb y2-orb--1" />
        <div className="y2-orb y2-orb--2" />
        <div className="y2-orb y2-orb--3" />
        <div className="y2-flare" />
      </div>

      <header className="y2-nav">
        <a className="y2-mark">
          <span className="y2-mark-chrome">i</span>
          <span>iSpace.NET</span>
        </a>
        <nav>
          <a>Home</a>
          <a>Music</a>
          <a className="is-current">Skins</a>
          <a>Buddies</a>
          <a>Cart</a>
        </nav>
        <div className="y2-nav-utility">
          <span className="y2-led" />
          <span>online · 14,200 buddies</span>
        </div>
      </header>

      <main className="y2-main">
        <section className="y2-hero">
          <div className="y2-hero-copy">
            <span className="y2-eyebrow">★ NEW SKIN DROP · MAY 26 / 26</span>
            <h1 className="y2-h1">
              <span className="y2-chrome">your</span>
              <br />
              <span className="y2-iridescent">desktop,</span>
              <br />
              <span className="y2-chrome">re-fluid.</span>
            </h1>
            <p className="y2-dek">
              Fourteen iridescent skins for your music player — bubbles, lava, oil-slick, chrome.
              Built for 2002. Looks better in 2026.
            </p>
            <div className="y2-cta-row">
              <a className="y2-cta y2-cta--aqua">Download skin pack</a>
              <a className="y2-cta y2-cta--ghost">Preview live</a>
            </div>
            <div className="y2-bullets">
              <span>● works on Win XP &gt;</span>
              <span>● Mac OS X 10.3 &gt;</span>
              <span>● 12 MB</span>
              <span>● FREE 4EVER ♥</span>
            </div>
          </div>

          <div className="y2-player">
            <div className="y2-player-frame">
              <div className="y2-player-chrome">
                <span className="y2-player-dot y2-player-dot--r" />
                <span className="y2-player-dot y2-player-dot--y" />
                <span className="y2-player-dot y2-player-dot--g" />
                <span className="y2-player-title">FluidWave 2.0</span>
              </div>
              <div className="y2-player-screen">
                <div className="y2-lcd">
                  <div className="y2-lcd-row">
                    <span>03:</span>
                    <span>42</span>
                  </div>
                  <div className="y2-lcd-meta">
                    <span>NOW PLAYING — KSHMR PROJECT</span>
                  </div>
                </div>
                <div className="y2-visualiser">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <span key={i} style={{ ["--i" as string]: i, ["--h" as string]: 24 + (i * 17) % 84 } as React.CSSProperties} />
                  ))}
                </div>
                <div className="y2-track">
                  <strong>SUMMER NIGHTSCAPE</strong>
                  <em>The Iridescent Sessions, Vol. 02</em>
                </div>
              </div>
              <div className="y2-player-controls">
                <button className="y2-pad">◁◁</button>
                <button className="y2-pad y2-pad--play">▶</button>
                <button className="y2-pad">▷▷</button>
                <div className="y2-slider">
                  <div className="y2-slider-fill" />
                  <div className="y2-slider-knob" />
                </div>
                <button className="y2-pad">◉</button>
              </div>
            </div>
            <div className="y2-sticker">
              <span>NEW</span>
            </div>
          </div>
        </section>

        <section className="y2-skins">
          <h2 className="y2-section-h">
            <span>★</span> CHOOSE YOUR FLAVOR <span>★</span>
          </h2>
          <div className="y2-skin-grid">
            {[
              { n: "AQUA BUBBLE", c: ["#5FC9F8", "#A9E1FF"] },
              { n: "MAGENTA SLICK", c: ["#FF66C4", "#FFB3DA"] },
              { n: "CHROME GHOST", c: ["#C4C9D2", "#F2F4F8"] },
              { n: "ACID LIME", c: ["#A8FF00", "#E0FF99"] },
              { n: "LAVA NIGHT", c: ["#FF4D2E", "#FFA08C"] },
              { n: "IRIDESCENT", c: ["#5FC9F8", "#FF66C4", "#A8FF00"] },
            ].map((s) => (
              <article key={s.n} className="y2-skin">
                <div
                  className="y2-skin-orb"
                  style={{
                    background: `linear-gradient(135deg, ${s.c.join(", ")})`,
                  }}
                />
                <strong>{s.n}</strong>
                <a className="y2-skin-cta">Apply</a>
              </article>
            ))}
          </div>
        </section>

        <section className="y2-stamp">
          <div className="y2-stamp-frame">
            <span className="y2-stamp-eye">⌒_⌒</span>
            <h3>YOU&apos;VE GOT THE WHOLE INTERNET ON YOUR DESKTOP.</h3>
            <a className="y2-cta y2-cta--aqua">SIGN UP — FREE 4EVER</a>
          </div>
        </section>
      </main>

      <footer className="y2-foot">
        <span>© iSpace.NET — best viewed at 1024 × 768</span>
        <span>♥ powered by Frutiger Aero · since 2002 · still going</span>
      </footer>
    </div>
  );
}
