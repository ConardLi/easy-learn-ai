export function PentagramDemo() {
  return (
    <div className="demo-pentagram">
      <header className="pg-nav">
        <span className="pg-mark">PG/SCHER</span>
        <nav>
          <a>Work</a>
          <a>Studio</a>
          <a>Writing</a>
          <a className="is-current">Identity</a>
          <a>Contact</a>
        </nav>
        <span className="pg-nav-meta">Project 047 · 2026</span>
      </header>

      <main className="pg-main">
        <section className="pg-hero">
          <div className="pg-hero-meta">
            <div className="pg-eyebrow">
              <span>047</span>
              <span>·</span>
              <span>VISUAL IDENTITY</span>
              <span>·</span>
              <span>THE PUBLIC THEATER, NEW SEASON</span>
            </div>
          </div>
          <h1 className="pg-hero-h">
            <span className="pg-hero-word pg-hero-word--1">BUILD</span>
            <span className="pg-hero-word pg-hero-word--2">A</span>
            <span className="pg-hero-word pg-hero-word--3">STAGE</span>
            <span className="pg-hero-word pg-hero-word--4 pg-hero-word--blue">LOUD</span>
            <span className="pg-hero-word pg-hero-word--5">ENOUGH</span>
            <span className="pg-hero-word pg-hero-word--6">TO</span>
            <span className="pg-hero-word pg-hero-word--7 pg-hero-word--brick">BE&nbsp;HEARD</span>
            <span className="pg-hero-word pg-hero-word--8">FROM&nbsp;THE&nbsp;STREET.</span>
          </h1>
          <div className="pg-hero-foot">
            <span>FOR THE NEW SEASON · 2026 — 2027</span>
            <span>D. KENZIE / P. SCHER / J. AMODT</span>
            <span>SCROLL ↓</span>
          </div>
        </section>

        <section className="pg-block pg-block--blue">
          <div className="pg-block-no">02</div>
          <div className="pg-block-h">
            <h2>
              FROM <span className="pg-tight">/</span> A <span className="pg-tight">/</span> SINGLE
              <br />
              TYPEFACE.
            </h2>
            <p>
              One bold grotesque, set bigger than the column it lives in. Every poster, programme,
              and projection runs on the same single tool — the size is the headline, the colour is
              the cue.
            </p>
          </div>
          <ul className="pg-block-list">
            <li>
              <span>01</span> KENNERLEY BOLD CONDENSED — DISPLAY
            </li>
            <li>
              <span>02</span> KENNERLEY REGULAR — RUNNING TEXT
            </li>
            <li>
              <span>03</span> AKZIDENZ MEDIUM — METADATA &amp; CAPTIONS
            </li>
          </ul>
        </section>

        <section className="pg-spec">
          <div className="pg-section-bar">
            <span>03 · SPECIMEN</span>
            <span>SET IN KENNERLEY BOLD CONDENSED, ALL CAPS</span>
          </div>
          <div className="pg-spec-grid">
            <div className="pg-spec-cell">
              <div className="pg-spec-figure">A</div>
              <span>aperture · open</span>
            </div>
            <div className="pg-spec-cell">
              <div className="pg-spec-figure">R</div>
              <span>leg · curved</span>
            </div>
            <div className="pg-spec-cell">
              <div className="pg-spec-figure">&amp;</div>
              <span>ampersand · italic</span>
            </div>
            <div className="pg-spec-cell">
              <div className="pg-spec-figure">7</div>
              <span>tabular figure</span>
            </div>
          </div>
        </section>

        <section className="pg-block pg-block--brick">
          <div className="pg-block-no">04</div>
          <div className="pg-block-h">
            <h2>
              POSTERS THAT
              <br />
              READ FROM ACROSS
              <br />
              42<sup>nd</sup> STREET.
            </h2>
          </div>
          <div className="pg-poster-row">
            <div className="pg-poster pg-poster--1">
              <span>HAMLET</span>
              <span>NOW THRU MAY</span>
            </div>
            <div className="pg-poster pg-poster--2">
              <span>FOR&nbsp;US</span>
              <span>OPENING APR 09</span>
            </div>
            <div className="pg-poster pg-poster--3">
              <span>HOWL</span>
              <span>POETRY NIGHTS · WED</span>
            </div>
          </div>
        </section>

        <section className="pg-table">
          <div className="pg-section-bar">
            <span>05 · DELIVERABLES</span>
            <span>SEASON 26 — 27</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>NO.</th>
                <th>OBJECT</th>
                <th>FORMAT</th>
                <th>PRINT</th>
                <th>QTY</th>
                <th>READY</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["01", "Season poster", "27 × 41 in", "2C silkscreen", "1,200", "12 / 03"],
                ["02", "Programme", "12 × 18 in", "Newsprint", "8,000", "12 / 17"],
                ["03", "Lobby projection", "8K loop", "Digital", "—", "01 / 04"],
                ["04", "Membership card", "85 × 55 mm", "Letterpress", "4,500", "12 / 28"],
                ["05", "Donor wall", "Site-specific", "Vinyl cut", "1", "02 / 11"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((c, i) => (
                    <td key={i} className={i === 1 ? "pg-table-name" : ""}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="pg-foot">
        <div>PG/SCHER · 204 FIFTH AVENUE · NY 10010</div>
        <div>END / 047</div>
      </footer>
    </div>
  );
}
