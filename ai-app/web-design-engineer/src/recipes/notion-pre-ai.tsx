export function NotionPreAIDemo() {
  return (
    <div className="demo-notion">
      <header className="nt-nav">
        <span className="nt-mark">
          <span className="nt-mark-icon">🪴</span>
          <span>Greenhouse</span>
        </span>
        <span className="nt-nav-crumb">Workspaces · Atelier · Spring planning</span>
        <div className="nt-nav-right">
          <span className="nt-nav-avatar">M</span>
          <span className="nt-nav-avatar">A</span>
          <span className="nt-nav-avatar">+</span>
          <a className="nt-share">Share</a>
        </div>
      </header>

      <div className="nt-shell">
        <aside className="nt-side">
          <div className="nt-side-section">Workspaces</div>
          <div className="nt-side-item">
            <span className="nt-side-icon">🪴</span>
            <span>Atelier</span>
          </div>
          <div className="nt-side-item nt-side-sub">
            <span className="nt-side-icon">📓</span>
            <span>Journal</span>
          </div>
          <div className="nt-side-item nt-side-sub is-current">
            <span className="nt-side-icon">🌱</span>
            <span>Spring planning</span>
          </div>
          <div className="nt-side-item nt-side-sub">
            <span className="nt-side-icon">📖</span>
            <span>Reading list</span>
          </div>
          <div className="nt-side-item nt-side-sub">
            <span className="nt-side-icon">🧪</span>
            <span>Experiments</span>
          </div>
          <div className="nt-side-section">Shared</div>
          <div className="nt-side-item">
            <span className="nt-side-icon">🐣</span>
            <span>Team handbook</span>
          </div>
          <div className="nt-side-item">
            <span className="nt-side-icon">🪞</span>
            <span>Retros</span>
          </div>
          <div className="nt-side-section">Trash</div>
        </aside>

        <main className="nt-page">
          <div className="nt-cover" aria-hidden />
          <div className="nt-page-emoji">🌱</div>
          <h1 className="nt-page-h1">Spring planning</h1>
          <div className="nt-page-meta">
            <div className="nt-page-row">
              <span className="nt-page-key">📅 Window</span>
              <span>March 01 → June 30</span>
            </div>
            <div className="nt-page-row">
              <span className="nt-page-key">👥 People</span>
              <span className="nt-pill nt-pill--mint">Maya</span>
              <span className="nt-pill nt-pill--peach">Andre</span>
              <span className="nt-pill nt-pill--rose">Lin</span>
              <span className="nt-pill nt-pill--sand">+ 3 more</span>
            </div>
            <div className="nt-page-row">
              <span className="nt-page-key">🎯 Status</span>
              <span className="nt-pill nt-pill--mint">Active</span>
            </div>
          </div>

          <p className="nt-paragraph">
            Welcome to the planning page. The intent is to keep this whole season on one scroll. Add
            things as you think of them — order can be sorted later. Use <code>/</code> to insert
            blocks; drag with the <span className="nt-handle">⋮⋮</span> handle on hover.
          </p>

          <div className="nt-callout nt-callout--mint">
            <span className="nt-callout-icon">💡</span>
            <div>
              <strong>How this page works.</strong> Everything is a block — toggle to hide, link to
              promote into its own page, drag to reorder. The header table is just a database in
              disguise.
            </div>
          </div>

          <h2 className="nt-h2">📦 What we&apos;re shipping</h2>

          <details open className="nt-toggle">
            <summary>
              <span className="nt-handle">⋮⋮</span>
              <span className="nt-toggle-chev">▾</span>
              <span>🌿 Season theme — &quot;letting things grow&quot;</span>
            </summary>
            <div className="nt-toggle-body">
              <p>
                Less plumbing, more leaves. We&apos;re investing in the parts of the product that
                customers tell us they live in — and resisting the urge to ship the new shiny
                module two of us secretly want.
              </p>
              <ul className="nt-list">
                <li>
                  <span className="nt-check is-on" /> Land the editor refresh
                </li>
                <li>
                  <span className="nt-check is-on" /> Move signals into onboarding
                </li>
                <li>
                  <span className="nt-check" /> Run one big experiment (see below)
                </li>
                <li>
                  <span className="nt-check" /> Two writing weeks (March 18, May 13)
                </li>
              </ul>
            </div>
          </details>

          <details className="nt-toggle">
            <summary>
              <span className="nt-handle">⋮⋮</span>
              <span className="nt-toggle-chev">▸</span>
              <span>🛠️ Engineering — themes &amp; carve-outs</span>
            </summary>
          </details>

          <details className="nt-toggle">
            <summary>
              <span className="nt-handle">⋮⋮</span>
              <span className="nt-toggle-chev">▸</span>
              <span>🪶 Design — what we want to feel like</span>
            </summary>
          </details>

          <h2 className="nt-h2">🌼 Things we&apos;re trying</h2>

          <div className="nt-board">
            <div className="nt-col">
              <div className="nt-col-h">
                <span>Seedlings</span>
                <span className="nt-col-c">4</span>
              </div>
              <div className="nt-card">
                <div className="nt-card-icon">🐛</div>
                <strong>“What if the editor were quieter?”</strong>
                <p>Strip the rail until only the page remains.</p>
                <div className="nt-card-tags">
                  <span className="nt-pill nt-pill--peach">Andre</span>
                  <span className="nt-pill nt-pill--mint">design</span>
                </div>
              </div>
              <div className="nt-card">
                <div className="nt-card-icon">🪴</div>
                <strong>“Pages that water themselves.”</strong>
                <p>Auto-archive untouched for 60 days; revivable on click.</p>
                <div className="nt-card-tags">
                  <span className="nt-pill nt-pill--rose">Lin</span>
                </div>
              </div>
            </div>

            <div className="nt-col">
              <div className="nt-col-h">
                <span>Growing</span>
                <span className="nt-col-c">3</span>
              </div>
              <div className="nt-card">
                <div className="nt-card-icon">🌳</div>
                <strong>Editor refresh, beta.</strong>
                <p>Half the team is on it; opt-in toggle ships next Tuesday.</p>
                <div className="nt-card-tags">
                  <span className="nt-pill nt-pill--mint">Maya</span>
                  <span className="nt-pill nt-pill--sand">eng</span>
                </div>
              </div>
              <div className="nt-card">
                <div className="nt-card-icon">🌻</div>
                <strong>Onboarding signals.</strong>
                <p>Three signals replacing eight steps. A/B framed.</p>
                <div className="nt-card-tags">
                  <span className="nt-pill nt-pill--peach">Andre</span>
                </div>
              </div>
            </div>

            <div className="nt-col">
              <div className="nt-col-h">
                <span>Harvested</span>
                <span className="nt-col-c">2</span>
              </div>
              <div className="nt-card">
                <div className="nt-card-icon">🥕</div>
                <strong>Editor refresh, internal dogfood.</strong>
                <p>Two weeks running; we&apos;re back to writing in the new one.</p>
              </div>
              <div className="nt-card">
                <div className="nt-card-icon">🍅</div>
                <strong>Customer letters, sent.</strong>
                <p>Hand-typed, postal-mailed to twelve power users. Replies came back.</p>
              </div>
            </div>
          </div>

          <div className="nt-callout nt-callout--peach">
            <span className="nt-callout-icon">🌸</span>
            <div>
              <strong>Reminder.</strong> Friday writing time, 13:00 — quiet hours. No meetings, no
              Slack, no Linear. Tea on the counter. See you there.
            </div>
          </div>

          <h2 className="nt-h2">🪶 Notes from the team</h2>
          <p className="nt-paragraph">
            <strong>Maya · Mar 12 —</strong> The editor refresh feels like a different product. I keep
            opening it to write small things just because.
          </p>
          <p className="nt-paragraph">
            <strong>Andre · Mar 14 —</strong> I think we should resist the temptation to add toggles
            for everything. Let&apos;s ship the opinion.
          </p>
          <p className="nt-paragraph">
            <strong>Lin · Mar 18 —</strong> Pages that water themselves <em>is</em> the next
            project. I have a sketch.
          </p>

          <div className="nt-add-block">+ Add a block</div>
        </main>
      </div>
    </div>
  );
}
