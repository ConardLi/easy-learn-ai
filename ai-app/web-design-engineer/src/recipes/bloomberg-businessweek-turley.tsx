export function BusinessweekTurleyDemo() {
  return (
    <div className="demo-bw">
      <header className="bw-nav">
        <span className="bw-mark">EXEC&amp;WEEK</span>
        <nav>
          <a>News</a>
          <a>Markets</a>
          <a>Tech</a>
          <a>Politics</a>
          <a className="is-current">Features</a>
          <a>Magazine</a>
        </nav>
        <span className="bw-issue">Issue No. 09 — 26 May 2026</span>
      </header>

      <main className="bw-main">
        <section className="bw-cover">
          <div className="bw-cover-flash">
            <span>BREAKING</span>
            <span>↗</span>
          </div>
          <h1 className="bw-cover-h">
            <span className="bw-cover-h-1">The</span>
            <span className="bw-cover-h-2">$2,000,000,000,000</span>
            <span className="bw-cover-h-3">Mistake.</span>
          </h1>
          <p className="bw-cover-dek">
            How four boardrooms, three regulators and one very tired CFO turned the &quot;safest
            trade of the decade&quot; into the most expensive footnote in the FT.
          </p>
          <div className="bw-cover-bits">
            <span className="bw-sticker bw-sticker--blue">★ WINNER · LOSER</span>
            <span className="bw-sticker bw-sticker--orange">⚠ FORENSIC</span>
            <span className="bw-sticker bw-sticker--black">P.42</span>
            <span className="bw-arrow">→ 22 pages</span>
          </div>
          <div className="bw-cover-byline">
            <span>BY ALEX OKONKWO, MEI ARITA &amp; TODD GRANT</span>
            <span>PHOTOGRAPHS BY THE TYPE STUDIO</span>
          </div>
        </section>

        <div className="bw-divider">
          <span>· · · · · · · · · · ·</span>
        </div>

        <section className="bw-features">
          <article className="bw-feature">
            <span className="bw-kicker bw-kicker--orange">FORENSIC · 42</span>
            <h2>
              FOUR
              <br />
              SIGN-OFFS,
              <br />
              ONE&nbsp;DAY,
              <br />
              ZERO&nbsp;EXIT.
            </h2>
            <p>
              A reconstruction of the 18 hours that lost $1.4 billion. We obtained twelve emails
              and one boarding pass.
            </p>
          </article>
          <article className="bw-feature bw-feature--photo">
            <div className="bw-photo">
              <span className="bw-photo-arrow">↖</span>
              <span className="bw-photo-tag">subject A</span>
              <span className="bw-photo-tag bw-photo-tag--alt">subject B</span>
              <span className="bw-photo-cap">photo · the boardroom, that morning</span>
            </div>
          </article>
          <article className="bw-feature">
            <span className="bw-kicker bw-kicker--blue">WHO PAID · 58</span>
            <h2>
              WHO
              <br />
              ACTUALLY
              <br />
              <span className="bw-feature-strike">PAID</span>?
            </h2>
            <p>
              Eight pension funds, one sovereign wealth manager and a man in Sacramento. Their
              quotes, fully unredacted, on page 60.
            </p>
          </article>
        </section>

        <section className="bw-data">
          <span className="bw-kicker bw-kicker--black">DATA · 64</span>
          <h2>FOUR FIGURES THAT TELL THE WHOLE STORY.</h2>

          <div className="bw-stat-row">
            <div className="bw-stat bw-stat--orange">
              <strong>$2.0T</strong>
              <span>notional exposure across counterparties</span>
            </div>
            <div className="bw-stat bw-stat--blue">
              <strong>$1.4B</strong>
              <span>realised loss after closeout</span>
            </div>
            <div className="bw-stat bw-stat--black">
              <strong>18 hr</strong>
              <span>from first margin call to public statement</span>
            </div>
            <div className="bw-stat bw-stat--white">
              <strong>0</strong>
              <span>resignations at the desk that signed</span>
            </div>
          </div>

          <div className="bw-chart">
            <svg viewBox="0 0 800 220" aria-hidden>
              <rect width="800" height="220" fill="#FFE600" />
              <line x1="0" y1="180" x2="800" y2="180" stroke="#000" strokeWidth="2" />
              {[
                ["MON", 60],
                ["TUE", 90],
                ["WED", 80],
                ["THU", 50],
                ["FRI", 168],
              ].map(([d, h], i) => (
                <g key={d as string}>
                  <rect
                    x={80 + i * 140}
                    y={180 - (h as number)}
                    width={80}
                    height={h as number}
                    fill={i === 4 ? "#FF3D00" : "#001AFF"}
                    stroke="#000"
                    strokeWidth={2}
                  />
                  <text
                    x={120 + i * 140}
                    y={200}
                    textAnchor="middle"
                    fontFamily="Bebas Neue, Anton, Impact"
                    fontSize="22"
                    fill="#000"
                  >
                    {d as string}
                  </text>
                </g>
              ))}
              <text x={730} y={36} fontFamily="Bebas Neue, Anton, Impact" fontSize="58" fill="#000">
                +228%
              </text>
              <text x={520} y={64} fontFamily="Bebas Neue, Anton, Impact" fontSize="24" fill="#000">
                FRIDAY VOLUME
              </text>
            </svg>
          </div>
        </section>

        <section className="bw-quote">
          <div className="bw-quote-icon">“</div>
          <p>
            We had a&nbsp;<span className="bw-mark-text">RISK MEMO</span>. A few of us read it.
            Most of us didn&apos;t. We didn&apos;t&nbsp;<em>not</em>&nbsp;read it. We just had a lot of
            other risk memos that week.
          </p>
          <span className="bw-quote-cite">— DESK HEAD, NORTH AMERICA · UNNAMED PER NDA</span>
        </section>

        <section className="bw-grid">
          <span className="bw-kicker bw-kicker--orange">ALSO INSIDE</span>
          <div className="bw-grid-rows">
            <article>
              <strong>P. 12 / OPENING BELL</strong>
              <p>What broke the index, and what we said when it did.</p>
            </article>
            <article>
              <strong>P. 28 / POLICY</strong>
              <p>The very loud, very quiet end of the friend-shoring decade.</p>
            </article>
            <article>
              <strong>P. 76 / CULTURE</strong>
              <p>Why we&apos;ve all started taking the bus again. Apparently.</p>
            </article>
            <article>
              <strong>P. 88 / COVER</strong>
              <p>Designed in a kitchen, printed before sunrise.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="bw-foot">
        <span>EXEC&amp;WEEK · PRINTED IN BROOKLYN · DISTRIBUTED EVERYWHERE</span>
        <span>END · 26 / 5 / 26</span>
      </footer>
    </div>
  );
}
