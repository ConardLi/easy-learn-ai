export function StripePressDemo() {
  return (
    <div className="demo-sp">
      <header className="sp-nav">
        <a className="sp-mark">
          <span>Press</span>
          <span className="sp-mark-rule" />
        </a>
        <nav>
          <a>Books</a>
          <a>Series</a>
          <a>About</a>
          <a className="is-current">Reading room</a>
        </nav>
        <span className="sp-nav-meta">Cart · Subscribers · Search</span>
      </header>

      <main className="sp-main">
        <section className="sp-hero">
          <div className="sp-hero-meta">
            <span className="sp-eyebrow">A NEW VOLUME</span>
            <h1>
              The Patient Engine.
              <br />
              <em>How institutions outlast their founders.</em>
            </h1>
            <p>
              The fourth book in the Patient Capital series. Eight years of fieldwork inside the
              organisations — railways, learned societies, universities, ports — that have managed
              to be useful for more than one human lifetime.
            </p>
            <div className="sp-hero-meta-row">
              <span>By Maya Olufsen</span>
              <span>·</span>
              <span>318 pp.</span>
              <span>·</span>
              <span>foiled cloth, sewn</span>
              <span>·</span>
              <span>$32.00</span>
            </div>
            <div className="sp-hero-cta-row">
              <a className="sp-cta">Order the book — $32</a>
              <a className="sp-link">Read the introduction <em>↗</em></a>
            </div>
            <div className="sp-hero-foil">
              <span className="sp-foil-dot" />
              <span>foiled in deep teal · printed by Wassermann, Germany</span>
            </div>
          </div>
          <figure className="sp-hero-book">
            <div className="sp-book">
              <div className="sp-book-spine" />
              <div className="sp-book-cover">
                <div className="sp-book-eye" />
                <div className="sp-book-rule" />
                <div className="sp-book-title">
                  <span>The</span>
                  <span>Patient</span>
                  <span>Engine</span>
                </div>
                <div className="sp-book-author">Maya Olufsen</div>
                <div className="sp-book-imprint">Press, IV.</div>
              </div>
              <div className="sp-book-shadow" />
            </div>
            <figcaption>318 pp. · 152 × 220 mm · cloth case · two-colour foil</figcaption>
          </figure>
        </section>

        <section className="sp-pull">
          <p>
            <em>
              “The institutions that lasted were not the ones that planned the longest. They were
              the ones that built habits people defended when no one was watching.”
            </em>
          </p>
          <span>— from chapter II, &quot;A Boring Sort of Care&quot;</span>
        </section>

        <section className="sp-twoup">
          <article>
            <span className="sp-eyebrow">FROM THE BOOK</span>
            <h2>
              <em>An excerpt — chapter II, paragraph 04.</em>
            </h2>
            <p>
              On a wet morning in 2018, in a low brick building in Halifax, three people met for
              twenty minutes to decide whether the postage on a particular kind of envelope ought
              to remain second-class. The room had a kettle. The room had a window onto a yard
              with a single rosemary bush. The decision they made would, eventually, save the
              institution about £18,400 a year — enough to keep three afternoon programmes
              running, which had been threatened for the better part of a decade.
            </p>
            <p>
              None of this is dramatic. None of it is even visible. It is the boring middle of an
              organisation behaving like an organisation. And yet, this is the kind of meeting
              that, in aggregate, makes institutions last.
            </p>
            <p>
              <em>
                One of the difficulties of writing about patient capital is that the people who
                practice it are exquisitely uninterested in being written about.
              </em>
            </p>
          </article>
          <aside className="sp-side">
            <div className="sp-side-card">
              <span className="sp-eyebrow">DETAILS</span>
              <ul>
                <li>
                  <span>Format</span>
                  <span>Hardcover, cloth-bound</span>
                </li>
                <li>
                  <span>Dimensions</span>
                  <span>152 × 220 mm</span>
                </li>
                <li>
                  <span>Extent</span>
                  <span>318 pages</span>
                </li>
                <li>
                  <span>Typeset</span>
                  <span>Galliard 11/15 pt</span>
                </li>
                <li>
                  <span>Paper</span>
                  <span>Munken Pure, 90 gsm</span>
                </li>
                <li>
                  <span>Printer</span>
                  <span>Wassermann, Germany</span>
                </li>
                <li>
                  <span>ISBN</span>
                  <span>978‑1‑953953‑18‑6</span>
                </li>
                <li>
                  <span>Edition</span>
                  <span>First — May 2026</span>
                </li>
              </ul>
            </div>
            <div className="sp-side-card sp-side-card--quiet">
              <span className="sp-eyebrow">SERIES</span>
              <p>
                Volume IV in the <em>Patient Capital</em> series.
                <br />
                Earlier volumes: I.&nbsp;<em>The Long View</em> · II.&nbsp;<em>What Holds</em> ·
                III.&nbsp;<em>Slow Ports</em>.
              </p>
            </div>
          </aside>
        </section>

        <section className="sp-shelf">
          <div className="sp-shelf-h">
            <span className="sp-eyebrow">ALSO IN THE LIBRARY</span>
            <h2>Other volumes from the Press.</h2>
          </div>
          <div className="sp-shelf-grid">
            {[
              { title: "What Holds", author: "Maya Olufsen", foil: "burnt sienna", n: "Vol. II" },
              { title: "Slow Ports", author: "Imani Boateng", foil: "deep teal", n: "Vol. III" },
              { title: "The Long View", author: "Jiro Hatanaka", foil: "gold", n: "Vol. I" },
              { title: "Field Notes", author: "Hari Ito", foil: "olive", n: "Companion" },
            ].map((b) => (
              <article key={b.title} className={`sp-shelf-card sp-shelf-card--${b.foil.split(" ")[0]}`}>
                <div className="sp-shelf-book">
                  <div className="sp-shelf-spine" />
                  <span className="sp-shelf-title">{b.title}</span>
                  <span className="sp-shelf-byline">{b.author}</span>
                  <span className="sp-shelf-foot">{b.n}</span>
                </div>
                <div className="sp-shelf-meta">
                  <strong>{b.title}</strong>
                  <span>{b.author}</span>
                  <span>{b.foil} foil · cloth</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="sp-foot">
        <div>
          <em>Press</em> — books for people who think with their hands.
        </div>
        <div>Established 2018 · 510 Townsend Street, San Francisco</div>
      </footer>
    </div>
  );
}
