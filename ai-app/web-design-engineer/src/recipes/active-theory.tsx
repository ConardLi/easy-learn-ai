export function ActiveTheoryDemo() {
  return (
    <div className="demo-at">
      <div className="at-scene" aria-hidden>
        <div className="at-haze at-haze--cyan" />
        <div className="at-haze at-haze--magenta" />
        <div className="at-haze at-haze--amber" />
        <div className="at-rings">
          <span />
          <span />
          <span />
        </div>
        <div className="at-debris">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} style={{ ["--i" as string]: i }} />
          ))}
        </div>
      </div>

      <div className="at-grain" aria-hidden />

      <div className="at-overlay">
        <header className="at-nav">
          <span className="at-mark">AT/26</span>
          <span className="at-nav-pill">SCENE 02 — &quot;APPROACH&quot;</span>
          <nav>
            <a>Watch</a>
            <a>About</a>
            <a>Tickets</a>
          </nav>
        </header>

        <section className="at-hero">
          <div className="at-meta">
            <div>
              <span>RUNTIME</span>
              <strong>02:24:18</strong>
            </div>
            <div>
              <span>RATED</span>
              <strong>PG-13 · IMAX</strong>
            </div>
            <div>
              <span>STUDIO</span>
              <strong>HALO PICTURES</strong>
            </div>
          </div>
          <h1>
            <span className="at-h-row at-h-row--top">A STORM</span>
            <span className="at-h-row at-h-row--big">PRECEDES</span>
            <span className="at-h-row at-h-row--accent">EVERY</span>
            <span className="at-h-row at-h-row--bot">SUNRISE.</span>
          </h1>
          <p>
            In summer 2027 — across forty IMAX screens, then everywhere — Caoimhe Glynn returns to
            the silence at the edge of the system, and brings something back.
          </p>
          <div className="at-cta-row">
            <a className="at-cta">▶ Watch the trailer</a>
            <a className="at-cta at-cta--ghost">Pre-order tickets</a>
            <span className="at-cta-meta">In theatres · July 12, 2027</span>
          </div>
        </section>

        <section className="at-chapters">
          <div className="at-chapter">
            <span className="at-chapter-n">CH 01</span>
            <h3>Departure</h3>
            <span>04:18</span>
          </div>
          <div className="at-chapter is-current">
            <span className="at-chapter-n">CH 02</span>
            <h3>Approach</h3>
            <span>27:42</span>
          </div>
          <div className="at-chapter">
            <span className="at-chapter-n">CH 03</span>
            <h3>The Field</h3>
            <span>1:02:18</span>
          </div>
          <div className="at-chapter">
            <span className="at-chapter-n">CH 04</span>
            <h3>Return</h3>
            <span>1:58:04</span>
          </div>
        </section>

        <footer className="at-foot">
          <div className="at-foot-row">
            <span>HALO PICTURES · DOLBY ATMOS · IMAX 1.43:1</span>
            <span>FOR THE PEOPLE WHO STAY THROUGH THE CREDITS</span>
          </div>
          <div className="at-foot-bar">
            <div className="at-foot-fill" />
          </div>
        </footer>
      </div>
    </div>
  );
}
