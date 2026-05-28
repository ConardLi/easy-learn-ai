export function LinearDemo() {
  return (
    <div className="demo-linear">
      <div className="ln-bg-mesh" aria-hidden />
      <header className="ln-nav">
        <div className="ln-nav-left">
          <span className="ln-mark">
            <span className="ln-mark-dot" />
            <span>Foundry</span>
          </span>
          <span className="ln-mark-meta">
            v3.18 · <span className="ln-kbd">⌘K</span>
          </span>
          <nav>
            <a>Product</a>
            <a>Method</a>
            <a>Changelog</a>
            <a>Customers</a>
            <a>Docs</a>
          </nav>
        </div>
        <div className="ln-nav-right">
          <a className="ln-link">Sign in</a>
          <a className="ln-cta">Get started</a>
        </div>
      </header>

      <main className="ln-main">
        <section className="ln-hero">
          <span className="ln-pill">
            <span className="ln-pill-dot" /> NEW · v3.18 — granular triage
          </span>
          <h1>
            The issue tracker
            <br />
            <span className="ln-hero-soft">for teams that ship.</span>
          </h1>
          <p>
            Foundry is the system that engineering organisations move into when they stop pretending
            to enjoy the previous tool. Built for keyboard-first workflows, sub-100&nbsp;ms
            interactions, and the discipline of a single accent colour.
          </p>
          <div className="ln-cta-row">
            <a className="ln-cta">Get started — free</a>
            <a className="ln-link">
              Read the method <span aria-hidden>↗</span>
            </a>
            <span className="ln-meta">
              <span className="ln-meta-dot" /> trusted by 14,200 teams
            </span>
          </div>

          <div className="ln-screenshot">
            <div className="ln-screenshot-chrome">
              <span className="ln-chrome-dot ln-chrome-dot--r" />
              <span className="ln-chrome-dot ln-chrome-dot--y" />
              <span className="ln-chrome-dot ln-chrome-dot--g" />
              <span className="ln-chrome-tab">FND-3142 · Triage cleanup for cycle 21</span>
              <span className="ln-chrome-spacer" />
              <span className="ln-chrome-meta">⌘ + K</span>
            </div>
            <div className="ln-screenshot-body">
              <aside className="ln-side">
                <div className="ln-side-section">
                  <span>Workspace</span>
                </div>
                {[
                  ["Inbox", "12"],
                  ["My issues", "4"],
                  ["Active", "27"],
                  ["Backlog", "311"],
                  ["Archive", null],
                ].map(([n, c]) => (
                  <div key={n as string} className={`ln-side-item ${n === "Active" ? "is-current" : ""}`}>
                    <span className="ln-side-icon" />
                    <span>{n}</span>
                    {c ? <span className="ln-side-count">{c}</span> : null}
                  </div>
                ))}
                <div className="ln-side-section">
                  <span>Cycles</span>
                </div>
                {["Cycle 21 · ships Fri", "Cycle 22 · planning", "Cycle 23 · scoped"].map((n) => (
                  <div key={n} className="ln-side-item">
                    <span className="ln-side-icon" />
                    <span>{n}</span>
                  </div>
                ))}
              </aside>

              <div className="ln-list">
                <div className="ln-list-head">
                  <span>27 active in cycle 21</span>
                  <span>
                    <span className="ln-kbd">F</span> filter · <span className="ln-kbd">⌘ ⇧ P</span> sort
                  </span>
                </div>
                {[
                  ["FND-3142", "Triage cleanup for cycle 21", "Tom", "high", "in-progress"],
                  ["FND-3140", "Inline preview for code blocks", "Sara", "med", "in-progress"],
                  ["FND-3139", "Reduce hover lag on grouped lists", "Andre", "med", "review"],
                  ["FND-3138", "Sticky filters in board view", "Mei", "low", "todo"],
                  ["FND-3137", "Restore archived view shortcuts", "Tom", "high", "todo"],
                  ["FND-3136", "Mention rendering in plain-text fields", "Sara", "med", "review"],
                  ["FND-3135", "Triage queue empty state", "Andre", "low", "todo"],
                  ["FND-3134", "Tab-key cycle preview", "Mei", "med", "review"],
                ].map((r, i) => (
                  <div key={r[0]} className={`ln-row ${i === 0 ? "is-focused" : ""}`}>
                    <span className={`ln-status ln-status--${r[4]}`} />
                    <span className="ln-id">{r[0]}</span>
                    <span className="ln-title">{r[1]}</span>
                    <span className="ln-tag ln-tag--mono">{r[2]}</span>
                    <span className={`ln-priority ln-priority--${r[3]}`}>{r[3]}</span>
                    <span className="ln-date">May 26</span>
                  </div>
                ))}
                <div className="ln-list-foot">
                  <span className="ln-list-foot-acc">⏎</span> open · <span className="ln-list-foot-acc">M</span> move ·{" "}
                  <span className="ln-list-foot-acc">P</span> priority · <span className="ln-list-foot-acc">A</span> assign
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ln-bands">
          <div className="ln-band-h">
            <div className="ln-eyebrow">Why teams switch</div>
            <h2>Less framework. More instinct.</h2>
          </div>
          <div className="ln-band-grid">
            <article className="ln-band">
              <div className="ln-band-no">01</div>
              <h3>Keyboard-first by default</h3>
              <p>
                Triage 200 issues without lifting your hands. Every action has a shortcut, and the
                command palette knows the next one before you do.
              </p>
              <div className="ln-band-row">
                <span className="ln-kbd">⌘ K</span>
                <span className="ln-kbd">⏎</span>
                <span className="ln-kbd">⌘ ⇧ N</span>
              </div>
            </article>
            <article className="ln-band">
              <div className="ln-band-no">02</div>
              <h3>The cycle is the unit</h3>
              <p>
                A week, two weeks, four — the cadence is yours. Cycles enforce the most useful
                conversation: what is shipping, and what is not.
              </p>
              <div className="ln-band-row">
                <span className="ln-tag">cycle 21 · 4d 12h</span>
              </div>
            </article>
            <article className="ln-band">
              <div className="ln-band-no">03</div>
              <h3>Built like a desktop app</h3>
              <p>
                Optimistic UI, local-first reads, sub-100&nbsp;ms interactions on every view. Hover
                lift in 150&nbsp;ms. Layout in 350&nbsp;ms. Never bouncy.
              </p>
              <div className="ln-band-row">
                <span className="ln-tag">p99 · 98 ms</span>
              </div>
            </article>
          </div>
        </section>

        <section className="ln-changelog">
          <div className="ln-band-h">
            <div className="ln-eyebrow">Changelog · v3.18</div>
            <h2>What we shipped last cycle.</h2>
          </div>
          <ul className="ln-changelog-list">
            <li>
              <span className="ln-changelog-tag">improved</span>
              <span>Triage now respects per-project priority weights.</span>
            </li>
            <li>
              <span className="ln-changelog-tag">new</span>
              <span>Inline preview for code blocks in issues and comments.</span>
            </li>
            <li>
              <span className="ln-changelog-tag">fixed</span>
              <span>Cycle target dates no longer jump on DST boundaries.</span>
            </li>
            <li>
              <span className="ln-changelog-tag">api</span>
              <span>
                New <code>views.archive</code> endpoint, available on v3+ keys.
              </span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="ln-foot">
        <div>Foundry · the issue tracker for teams that ship · est. 2022</div>
        <div>
          <span className="ln-kbd">⌘ K</span> · open anywhere
        </div>
      </footer>
    </div>
  );
}
