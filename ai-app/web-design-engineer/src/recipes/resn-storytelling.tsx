export function ResnStorytellingDemo() {
  return (
    <div className="demo-resn">
      <div className="rs-noise" aria-hidden />
      <div className="rs-curtain rs-curtain--left" aria-hidden />
      <div className="rs-curtain rs-curtain--right" aria-hidden />

      <header className="rs-nav">
        <span className="rs-mark">
          <span className="rs-mark-glyph">RZ</span>
          <span className="rs-mark-name">A Slow Telling</span>
        </span>
        <nav>
          <a>Scenes</a>
          <a>Cast</a>
          <a className="is-current">Now playing</a>
          <a>Reservations</a>
        </nav>
      </header>

      <main className="rs-main">
        <section className="rs-stage">
          <div className="rs-spot" aria-hidden />
          <div className="rs-stage-floor" aria-hidden />
          <div className="rs-meta">
            <span>SCENE 03 / 09</span>
            <span>The Garden, at Dusk</span>
          </div>
          <h1 className="rs-stage-h">
            <span className="rs-stage-h-line">
              <em>A small</em>&nbsp;
            </span>
            <span className="rs-stage-h-line">
              animal listens
            </span>
            <span className="rs-stage-h-line">
              <em>and decides</em>
            </span>
            <span className="rs-stage-h-line">
              not&nbsp;to&nbsp;run.
            </span>
          </h1>
          <p>
            A 12-minute scroll experience commissioned by Le Sénat, set in the orangerie at the
            Jardin du Luxembourg, on the slow afternoon of the longest day.
          </p>
          <div className="rs-stage-cue">
            <span className="rs-cue-dot" />
            <span>Scroll to continue · cursor responds · audio fades on hover</span>
          </div>
        </section>

        <section className="rs-beats">
          <article className="rs-beat">
            <div className="rs-beat-no">I.</div>
            <h3>
              The light <em>changes</em>.
            </h3>
            <p>
              The frame opens with a single shaft falling through a glass roof. Dust drifts in a
              column. Behind the type, a brass instrument warms up — once, twice, then settles.
            </p>
          </article>
          <article className="rs-beat">
            <div className="rs-beat-no">II.</div>
            <h3>
              A&nbsp;voice
              <br />
              <em>arrives.</em>
            </h3>
            <p>
              From off-stage, a narrator begins. The room around the type is rebuilt every two
              hundred pixels — a topiary, an iron chair, the corner of a fountain.
            </p>
          </article>
          <article className="rs-beat">
            <div className="rs-beat-no">III.</div>
            <h3>
              The animal
              <br />
              <em>is&nbsp;seen.</em>
            </h3>
            <p>
              A small grey fox moves through the lower margin of the page, pausing once to look up
              at the cursor. Each visitor agrees, without saying so, not to scare it.
            </p>
          </article>
        </section>

        <section className="rs-credits">
          <div className="rs-credits-h">
            <span>CREDITS</span>
            <span>09 SCENES · 12 MINUTES · 96 INTERACTIONS</span>
          </div>
          <ul className="rs-credits-list">
            <li>
              <span>Direction &amp; choreography</span>
              <span>Camille Roussel</span>
            </li>
            <li>
              <span>Art direction</span>
              <span>Theo Akande</span>
            </li>
            <li>
              <span>Voice</span>
              <span>Annie Ratti</span>
            </li>
            <li>
              <span>Composition</span>
              <span>Hiroshi Ueno</span>
            </li>
            <li>
              <span>Sound design</span>
              <span>Field Foley Co.</span>
            </li>
            <li>
              <span>Engineering</span>
              <span>Resona Studio</span>
            </li>
          </ul>
          <div className="rs-credits-foot">
            Performed nightly, on demand. Best with sound. The fox is real and unpaid.
          </div>
        </section>
      </main>
    </div>
  );
}
