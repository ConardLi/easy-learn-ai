export function MidCenturyDemo() {
  return (
    <div className="demo-mid">
      <div className="md-grain" aria-hidden />

      <header className="md-nav">
        <span className="md-mark">
          <span className="md-mark-shape" />
          <span>OLIVERA · DESIGN ANNALS</span>
        </span>
        <nav>
          <a>Poster</a>
          <a>Type</a>
          <a className="is-current">Issue 04</a>
          <a>Press</a>
        </nav>
        <span className="md-issue">Number Four · Spring MCMLVII</span>
      </header>

      <main className="md-main">
        <section className="md-poster">
          <div className="md-poster-stage">
            <div className="md-shape md-shape--sun" />
            <div className="md-shape md-shape--moon" />
            <div className="md-shape md-shape--triangle" />
            <div className="md-shape md-shape--line" />
            <div className="md-shape md-shape--bird" />
            <div className="md-poster-num">04</div>
          </div>
          <div className="md-poster-meta">
            <span className="md-eyebrow">A NOTE ABOUT THE COVER</span>
            <h1>
              <em>Honest Geometry,</em>
              <br />
              and the slow return
              <br />
              of the <span className="md-h-block">cut-paper</span>
              <br />
              poster.
            </h1>
            <p>
              An issue devoted to the unglamorous proposition that a shape, cut from paper and
              placed without irony, is still — sixty-eight years after Bass and Rand — the most
              honest mark a designer can make.
            </p>
            <div className="md-poster-bits">
              <span className="md-pill md-pill--mustard">Pages 16</span>
              <span className="md-pill md-pill--brick">4-colour offset</span>
              <span className="md-pill md-pill--teal">Limited 1,200</span>
            </div>
            <a className="md-cta">Order this issue — $14</a>
          </div>
        </section>

        <section className="md-band">
          <span>·</span>
          <span>OLIVERA · ANNALS</span>
          <span>·</span>
          <span>FOUR</span>
          <span>·</span>
          <span>SPRING MCMLVII</span>
          <span>·</span>
          <span>POSTER ANNUAL</span>
          <span>·</span>
        </section>

        <section className="md-contents">
          <span className="md-eyebrow">INSIDE THIS ISSUE</span>
          <div className="md-contents-grid">
            <article className="md-contents-card md-contents-card--mustard">
              <div className="md-contents-no">I.</div>
              <h3>Bass, after hours.</h3>
              <p>
                Three unpublished Saul Bass roughs, scanned from a shoebox in Pasadena, by
                Margaret Sale.
              </p>
              <span className="md-contents-page">→ p. 04</span>
            </article>
            <article className="md-contents-card md-contents-card--teal">
              <div className="md-contents-no">II.</div>
              <h3>
                On the <em>line</em>.
              </h3>
              <p>
                Why a hand-drawn rule, three-quarters of an inch off-axis, makes a poster honest —
                an essay by Lella Vignelli.
              </p>
              <span className="md-contents-page">→ p. 06</span>
            </article>
            <article className="md-contents-card md-contents-card--brick">
              <div className="md-contents-no">III.</div>
              <h3>
                Blue Note,
                <br />a&nbsp;reading list.
              </h3>
              <p>
                Reid Miles, the photographer he stole from, and the typeface he never paid for.
              </p>
              <span className="md-contents-page">→ p. 09</span>
            </article>
            <article className="md-contents-card md-contents-card--cream">
              <div className="md-contents-no">IV.</div>
              <h3>
                Four shapes,
                <br />
                in conversation.
              </h3>
              <p>
                Lustig, Müller-Brockmann, Tomaszewski and Bass — what a triangle, a circle, a
                line, and a half-moon were, in 1957.
              </p>
              <span className="md-contents-page">→ p. 11</span>
            </article>
          </div>
        </section>

        <section className="md-pull">
          <p>
            <em>
              “The shape doesn&apos;t have to mean anything. It has to be honest about not meaning
              anything.”
            </em>
          </p>
          <span>— Alvin Lustig, in conversation with Elaine Lustig, 1953</span>
        </section>

        <section className="md-cred">
          <div className="md-cred-h">COLOPHON</div>
          <ul>
            <li>
              <span>Edited &amp; designed by</span>
              <span>Margaret Olivera, with M. Sale</span>
            </li>
            <li>
              <span>Set in</span>
              <span>Futura · Clarendon · Sabon</span>
            </li>
            <li>
              <span>Paper</span>
              <span>Mohawk Vellum, 80 lb · warm cream</span>
            </li>
            <li>
              <span>Printer</span>
              <span>Acme Letterpress, Los Angeles</span>
            </li>
            <li>
              <span>Edition</span>
              <span>Numbered 1 — 1,200</span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="md-foot">
        <span>OLIVERA · DESIGN ANNALS — Mailed quarterly · Subscriptions $48 / yr</span>
        <span>End of Issue · MMXXVI</span>
      </footer>
    </div>
  );
}
