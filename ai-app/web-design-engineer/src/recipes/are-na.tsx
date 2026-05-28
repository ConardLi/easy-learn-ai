export function ArenaDemo() {
  const blocks = [
    { kind: "Image", title: "Bus stop, Niigata, ca. 1986", who: "kentaro / found", at: "2 days ago", connect: 142 },
    { kind: "Text", title: "“If a clock is correct, what is it for?” — D. Sudjic", who: "ema / on time", at: "3 days ago", connect: 88 },
    { kind: "Link", title: "Are.na — manuals & guides (the page that started this channel)", who: "ema / on time", at: "3 days ago", connect: 21 },
    { kind: "Image", title: "Soviet milk crate, 1971", who: "antosh / industrial", at: "4 days ago", connect: 56 },
    { kind: "Text", title: "Notes towards a smaller internet — fragment 04", who: "luca / drafts", at: "4 days ago", connect: 18 },
    { kind: "Image", title: "Hand-drawn metro map, Kobe earthquake response 1995", who: "kentaro / found", at: "5 days ago", connect: 207 },
    { kind: "Link", title: "Marshall Berman — All That Is Solid Melts Into Air, p. 142", who: "ana / library", at: "1 week ago", connect: 39 },
    { kind: "Image", title: "Risograph test, two colours, Tokyo", who: "kentaro / found", at: "1 week ago", connect: 91 },
    { kind: "Channel", title: "A reader for slow Sundays (12 blocks)", who: "ema / on time", at: "1 week ago", connect: 12 },
    { kind: "Image", title: "Office signage, BBC Television Centre 1972", who: "ana / library", at: "2 weeks ago", connect: 73 },
    { kind: "Text", title: "“Maintenance is not a question of repair, but of dignity.” — M. Ratti", who: "luca / drafts", at: "2 weeks ago", connect: 26 },
    { kind: "Link", title: "Stewart Brand — How Buildings Learn (chapter 6)", who: "ana / library", at: "3 weeks ago", connect: 60 },
  ];

  return (
    <div className="demo-arena">
      <header className="ar-head">
        <div className="ar-head-row">
          <a className="ar-mark">are·book</a>
          <input className="ar-search" placeholder="Search" defaultValue="manuals &amp; guides" />
          <nav>
            <a>Explore</a>
            <a>Random</a>
            <a>Profile</a>
            <a>Settings</a>
            <a>Sign out</a>
          </nav>
        </div>
        <div className="ar-head-trail">
          <a>kentaro</a>
          <span>/</span>
          <a>found</a>
          <span>/</span>
          <strong>manuals &amp; guides for repairing the everyday</strong>
        </div>
      </header>

      <main className="ar-main">
        <section className="ar-channel-meta">
          <div>
            <h1>Manuals &amp; guides for repairing the everyday</h1>
            <p>
              A reading list collected since 2019. Manuals, photographs, and texts about the
              ordinary maintenance of public things — buses, streets, hospitals, the small civic
              objects we walk past. Open to <a>contributors</a>; quiet by design.
            </p>
            <ul className="ar-meta-list">
              <li>
                <strong>Started</strong> April 4, 2019
              </li>
              <li>
                <strong>By</strong> <a>kentaro</a>, with <a>ema</a>, <a>ana</a>, <a>luca</a>, <a>antosh</a>
              </li>
              <li>
                <strong>Privacy</strong> Open, with light moderation
              </li>
              <li>
                <strong>Counted</strong> 311 blocks · 27 contributors · 142 connections this month
              </li>
              <li>
                <strong>License</strong> Creative Commons CC-BY 4.0
              </li>
            </ul>
            <div className="ar-actions">
              <a>Follow channel</a>
              <a>Connect a block</a>
              <a>Open in app</a>
              <a>Export as JSON</a>
            </div>
          </div>
          <aside className="ar-related">
            <strong>Connected to</strong>
            <ul>
              <li>
                <a>quiet internet (ema / on time)</a>
              </li>
              <li>
                <a>slow infrastructure (luca / drafts)</a>
              </li>
              <li>
                <a>industrial objects (antosh)</a>
              </li>
              <li>
                <a>the unromantic city (ana / library)</a>
              </li>
              <li>
                <a>civic photography (mei)</a>
              </li>
              <li>
                <a>repairing things (kentaro / found)</a>
              </li>
            </ul>
            <strong>Recent contributors</strong>
            <ul>
              <li>kentaro</li>
              <li>ema</li>
              <li>ana</li>
              <li>luca</li>
              <li>antosh</li>
              <li>mei</li>
              <li>theo</li>
              <li>+ 20 more</li>
            </ul>
          </aside>
        </section>

        <section className="ar-blocks">
          <div className="ar-blocks-toolbar">
            <span>
              311 blocks · sorted by <a>recently added</a> · view as <a>grid</a> | <strong>list</strong>
            </span>
            <span>
              <a>Connect a block to this channel</a>
            </span>
          </div>

          <table className="ar-table">
            <thead>
              <tr>
                <th>Block</th>
                <th>Kind</th>
                <th>Connected by</th>
                <th>Added</th>
                <th>Connections</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((b) => (
                <tr key={b.title}>
                  <td>
                    <a>{b.title}</a>
                  </td>
                  <td>{b.kind}</td>
                  <td>
                    <a>{b.who}</a>
                  </td>
                  <td>{b.at}</td>
                  <td>
                    <a>{b.connect}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="ar-paging">
            <a>← previous</a> &nbsp; page 1 of 26 &nbsp; <a>next →</a>
          </p>
        </section>

        <section className="ar-notes">
          <h2>Notes on this channel</h2>
          <p>
            This channel sits next to four others — quiet internet, slow infrastructure,
            industrial objects, and the unromantic city. If you find a block that belongs in more
            than one, please connect it to all of them. Connections, not categories.
          </p>
          <p>
            The channel is intentionally text-heavy and image-light. Photographs are welcome, but
            ask: does the image describe a repair, a manual, or an ordinary public object? If yes,
            include it. If it&apos;s an aesthetic mood-board photo without a referent — probably
            no.
          </p>
          <p>
            — kentaro, April 4, 2019 (revised three times since)
          </p>
        </section>
      </main>

      <footer className="ar-foot">
        <a>about</a> · <a>blog</a> · <a>terms</a> · <a>privacy</a> · <a>code</a> · <a>support</a> ·{" "}
        <a>contact</a> · <a>jobs</a> · <a>shop</a> · made on the small internet, 2026
      </footer>
    </div>
  );
}
