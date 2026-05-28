export function MonocleMagazineDemo() {
  return (
    <div className="demo-monocle">
      <header className="mc-nav">
        <div className="mc-nav-mark">
          <span className="mc-nav-mark-name">MONOCLE</span>
          <span className="mc-nav-mark-issue">Issue 173 · Volume 14</span>
        </div>
        <nav>
          <a>Affairs</a>
          <a>Business</a>
          <a>Culture</a>
          <a>Design</a>
          <a>Food</a>
          <a className="is-current">Cities</a>
        </nav>
        <div className="mc-nav-cities">
          <span>Tokyo 14°</span>
          <span>Lisbon 17°</span>
          <span>Beirut 22°</span>
          <span>Helsinki 4°</span>
        </div>
      </header>

      <main className="mc-main">
        <div className="mc-issue-strip">
          <div>
            <div className="mc-eyebrow">CONTENTS — WINTER ’26</div>
            <h1>
              The Capital&nbsp;
              <em>Issue.</em>
            </h1>
            <p className="mc-deck">
              Where the next decade of soft power is being assembled — over coffee in Lisbon, in
              private libraries in Kyoto, at the kerbside in Mexico City.
            </p>
          </div>
          <div className="mc-issue-meta">
            <div>
              <strong>173</strong>
              <span>this issue</span>
            </div>
            <div>
              <strong>284</strong>
              <span>pages</span>
            </div>
            <div>
              <strong>17</strong>
              <span>cities</span>
            </div>
            <div>
              <strong>£12</strong>
              <span>at the kiosk</span>
            </div>
          </div>
        </div>

        <section className="mc-features">
          <article className="mc-feature mc-feature--lead">
            <div className="mc-feature-image">
              <div className="mc-feature-image-frame" />
              <span className="mc-feature-image-tag">No. 04 — Lisbon</span>
            </div>
            <div className="mc-feature-body">
              <div className="mc-kicker">FEATURE</div>
              <h2>
                The slow capital — how a sleepy southern city became the residence of choice for
                Europe’s new founders.
              </h2>
              <p className="mc-dek">
                <em>
                  In the second of a four-part series, Sophie Grove walks the Bairro Alto with the
                  architects writing the next chapter of Portuguese hospitality.
                </em>
              </p>
              <div className="mc-byline">
                <span>By Sophie Grove · Photography by André Cepeda</span>
                <span>p. 062 — 081</span>
              </div>
            </div>
          </article>

          <div className="mc-feature-rest">
            <article className="mc-feature mc-feature--side">
              <div className="mc-feature-side-image" />
              <div>
                <div className="mc-kicker">DESIGN</div>
                <h3>
                  Tokyo&apos;s back-street stationers,
                  <em>charted.</em>
                </h3>
                <div className="mc-byline">
                  <span>By Junichi Toyofuku</span>
                  <span>p. 088</span>
                </div>
              </div>
            </article>

            <article className="mc-feature mc-feature--side">
              <div className="mc-feature-side-image mc-feature-side-image--alt" />
              <div>
                <div className="mc-kicker">AFFAIRS</div>
                <h3>
                  Helsinki&apos;s quiet defence — what
                  <em> nordic readiness</em> looks like.
                </h3>
                <div className="mc-byline">
                  <span>By Annu Nieminen</span>
                  <span>p. 102</span>
                </div>
              </div>
            </article>

            <article className="mc-feature mc-feature--side">
              <div className="mc-feature-side-image mc-feature-side-image--food" />
              <div>
                <div className="mc-kicker">FOOD</div>
                <h3>
                  Beirut after dark —
                  <em> sourdough, anise, and stubborn joy.</em>
                </h3>
                <div className="mc-byline">
                  <span>By Sara Karam</span>
                  <span>p. 118</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="mc-briefings">
          <div className="mc-section-bar">
            <span>The Briefings</span>
            <span>02 — 048</span>
          </div>

          <div className="mc-briefings-grid">
            {[
              {
                kicker: "EDITOR’S LETTER",
                h: "Why we still measure a city by its breakfast.",
                meta: "Tyler Brûlé · p. 014",
              },
              {
                kicker: "DESPATCHES",
                h: "Mexico City — the kerbside as living room.",
                meta: "p. 022",
              },
              {
                kicker: "ARCHITECTURE",
                h: "A new wing for the Aalto library, drawn in patience.",
                meta: "p. 030",
              },
              {
                kicker: "BUSINESS",
                h: "The independent bookshop is becoming a soft-power asset.",
                meta: "p. 036",
              },
              {
                kicker: "TRANSPORT",
                h: "Night trains, again — and what Vienna decided differently.",
                meta: "p. 042",
              },
              {
                kicker: "FROM A READER",
                h: "On the small civic miracle of a covered market.",
                meta: "p. 048",
              },
            ].map((b) => (
              <article key={b.h} className="mc-briefing">
                <div className="mc-kicker">{b.kicker}</div>
                <h4>{b.h}</h4>
                <div className="mc-briefing-meta">{b.meta}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mc-quote">
          <p>
            <em>“A city is not the buildings it puts up. It is the conversations it leaves room
            for.”</em>
          </p>
          <div className="mc-quote-byline">— Pedro Cabrita Reis, p. 074</div>
        </section>
      </main>

      <footer className="mc-foot">
        <div>MONOCLE — Midori House, 1 Dorset Street, London W1U</div>
        <div>For the subscription list: monocle.com / shop</div>
      </footer>
    </div>
  );
}
