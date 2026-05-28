export function RaycastDemo() {
  return (
    <div className="demo-raycast">
      <div className="rc-bg" aria-hidden>
        <div className="rc-bg-blob rc-bg-blob--coral" />
        <div className="rc-bg-blob rc-bg-blob--magenta" />
        <div className="rc-bg-blob rc-bg-blob--gold" />
      </div>

      <header className="rc-nav">
        <div className="rc-nav-left">
          <span className="rc-mark">
            <span className="rc-mark-pill" />
            <span>Beam</span>
          </span>
          <nav>
            <a>Store</a>
            <a>Pro</a>
            <a>Changelog</a>
            <a>Manual</a>
          </nav>
        </div>
        <div className="rc-nav-right">
          <a className="rc-link">Download</a>
          <a className="rc-cta">Get Pro</a>
        </div>
      </header>

      <main className="rc-main">
        <section className="rc-hero">
          <div className="rc-pill">
            <span className="rc-pill-dot" />
            <span>v2.62 · AI Quick links</span>
            <span className="rc-kbd">⌘ + K</span>
          </div>
          <h1>
            Everything you do,
            <br />
            one&nbsp;keystroke&nbsp;away.
          </h1>
          <p>
            Beam is a fast, extendable launcher for the macOS keyboard-first. Switch windows,
            translate text, watch a pipeline, paste a snippet — without leaving the home row.
          </p>

          <div className="rc-palette">
            <div className="rc-palette-bar">
              <span className="rc-palette-icon" />
              <span className="rc-palette-input">
                Search apps, files, snippets…
                <span className="rc-palette-caret">|</span>
              </span>
              <span className="rc-palette-mode">⌘ ⏎ for full menu</span>
            </div>

            <ul className="rc-palette-list">
              {[
                { name: "Open Foundry · today's triage", icon: "F", color: "#5E6AD2", action: "Open", kbd: "⏎" },
                { name: "Translate selection to Japanese", icon: "translate", color: "#FF6363", action: "Run", kbd: "⌘ ⏎" },
                { name: "Send to Inbox — Maya", icon: "M", color: "#8AB67A", action: "Compose", kbd: "⌘ ⇧ M" },
                { name: "Snippet — meeting notes template", icon: "/", color: "#F5C162", action: "Paste", kbd: "⌘ V" },
                { name: "Window — left half", icon: "▥", color: "#B0A5D1", action: "Tile", kbd: "⌃ ⌥ ←" },
                { name: "Set Do Not Disturb — 90 minutes", icon: "•", color: "#FF8AA3", action: "Run", kbd: "⌘ D" },
              ].map((r, i) => (
                <li key={r.name} className={`rc-row ${i === 0 ? "is-focused" : ""}`}>
                  <span className="rc-row-icon" style={{ background: r.color }}>
                    {typeof r.icon === "string" ? r.icon : ""}
                  </span>
                  <span className="rc-row-name">{r.name}</span>
                  <span className="rc-row-action">{r.action}</span>
                  <span className="rc-kbd">{r.kbd}</span>
                </li>
              ))}
            </ul>

            <div className="rc-palette-foot">
              <span>
                <span className="rc-kbd">⏎</span> open
              </span>
              <span>
                <span className="rc-kbd">⌘ ⏎</span> actions
              </span>
              <span>
                <span className="rc-kbd">⌥</span> alt action
              </span>
              <span>
                <span className="rc-kbd">esc</span> close
              </span>
            </div>
          </div>

          <div className="rc-cta-row">
            <a className="rc-cta-big">Download for macOS — 12 MB</a>
            <a className="rc-link">
              Browse the store ↗
            </a>
            <span className="rc-meta">free · ad-free · forever</span>
          </div>
        </section>

        <section className="rc-extensions">
          <div className="rc-eyebrow">EXTENSIONS · 1,402 today</div>
          <h2>A store, full of single-key superpowers.</h2>

          <div className="rc-tiles">
            {[
              { n: "Notion", color: "#B0A5D1", d: "Open any page, in any workspace", k: "⌘ N" },
              { n: "GitHub", color: "#3F3F46", d: "Switch PRs, run actions, copy links", k: "⌘ G" },
              { n: "Linear", color: "#5E6AD2", d: "Triage issues without opening Linear", k: "⌘ L" },
              { n: "Translate", color: "#FF6363", d: "DeepL right under your cursor", k: "⌘ T" },
              { n: "Clipboard", color: "#F5C162", d: "Paste anything from the last 30 days", k: "⌘ V" },
              { n: "Window Tiler", color: "#8AB67A", d: "Bind any layout to a chord", k: "⌃ ⌥" },
              { n: "Snippets", color: "#9CCFE8", d: "Type ;mtg and watch it expand", k: ";;" },
              { n: "AI Quick", color: "#FF8AA3", d: "GPT and Claude as a launcher action", k: "⌘ /" },
            ].map((t) => (
              <article key={t.n} className="rc-tile">
                <div className="rc-tile-icon" style={{ background: t.color }} />
                <div>
                  <h3>{t.n}</h3>
                  <p>{t.d}</p>
                </div>
                <span className="rc-kbd">{t.k}</span>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="rc-foot">
        <div>Beam · keyboard-first for macOS · 2026</div>
        <div>
          <span className="rc-kbd">⌘ ⌃ Space</span> opens the launcher
        </div>
      </footer>
    </div>
  );
}
