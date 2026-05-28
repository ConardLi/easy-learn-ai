export function VercelMeshDemo() {
  return (
    <div className="demo-vercel">
      <div className="vc-mesh" aria-hidden>
        <div className="vc-mesh-blob vc-mesh-blob--cyan" />
        <div className="vc-mesh-blob vc-mesh-blob--magenta" />
        <div className="vc-mesh-blob vc-mesh-blob--orange" />
      </div>
      <div className="vc-grain" aria-hidden />

      <header className="vc-nav">
        <div className="vc-nav-left">
          <span className="vc-mark">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
              <polygon points="11,2 21,20 1,20" fill="#fff" />
            </svg>
            <span>Halo</span>
          </span>
          <nav>
            <a>Solutions</a>
            <a>Customers</a>
            <a className="is-current">Pricing</a>
            <a>Docs</a>
            <a>Changelog</a>
          </nav>
        </div>
        <div className="vc-nav-right">
          <a className="vc-link">Sign in</a>
          <a className="vc-cta">Deploy</a>
        </div>
      </header>

      <main className="vc-main">
        <section className="vc-hero">
          <div className="vc-pill">
            <span className="vc-pill-tag">NEW</span>
            <span>Edge Cache v3 — 24 ms global. </span>
            <span className="vc-pill-link">Read changelog ↗</span>
          </div>
          <h1>
            Ship the front end
            <br />
            of the&nbsp;internet.
          </h1>
          <p className="vc-dek">
            Halo is the developer cloud purpose-built for the front end. Push to <code>main</code>,
            get a preview URL, ship to production — across 36 regions, in 8 seconds.
          </p>
          <div className="vc-cta-row">
            <a className="vc-cta">Deploy free</a>
            <a className="vc-cta vc-cta--ghost">
              <span className="vc-prompt">$</span>
              <span>npx halo deploy</span>
            </a>
          </div>

          <div className="vc-terminal">
            <div className="vc-terminal-chrome">
              <span className="vc-chrome-dot" />
              <span className="vc-chrome-dot" />
              <span className="vc-chrome-dot" />
              <span className="vc-chrome-tab">~/standard.app · zsh</span>
            </div>
            <div className="vc-terminal-body">
              <div>
                <span className="vc-term-prompt">$</span> npx halo deploy --prod
              </div>
              <div className="vc-term-dim">→ Reading halo.config.ts</div>
              <div className="vc-term-dim">→ Building 14 routes · 4.2 s</div>
              <div className="vc-term-dim">→ Uploading 218 files · 1.1 s · 14 MB</div>
              <div>
                <span className="vc-term-tick">✓</span> Production deployment ready
              </div>
              <div className="vc-term-dim">→ Cached at 36 edge regions</div>
              <div>
                <span className="vc-term-tick">✓</span> https://
                <span className="vc-term-link">standard.app</span>
              </div>
              <div className="vc-term-dim">→ p95 globally: 24 ms · LCP 0.78 s</div>
              <div className="vc-term-blink">
                <span className="vc-term-prompt">$</span>
                <span className="vc-term-caret">█</span>
              </div>
            </div>
          </div>
        </section>

        <section className="vc-metrics">
          {[
            ["24 ms", "p95 global edge"],
            ["36", "regions"],
            ["8 s", "build to production"],
            ["0.78 s", "median LCP"],
          ].map(([k, v]) => (
            <div key={k} className="vc-metric">
              <div className="vc-metric-k">{k}</div>
              <div className="vc-metric-v">{v}</div>
            </div>
          ))}
        </section>

        <section className="vc-bands">
          <div className="vc-band-h">
            <span className="vc-eyebrow">Why teams ship here</span>
            <h2>Built for the people who deploy on Fridays.</h2>
          </div>
          <div className="vc-band-grid">
            <article className="vc-band">
              <div className="vc-band-icon">
                <span />
                <span />
              </div>
              <h3>Previews on every push</h3>
              <p>Every commit gets a URL. Designers, PMs, and contractors review in real time.</p>
            </article>
            <article className="vc-band">
              <div className="vc-band-icon">
                <span />
              </div>
              <h3>Functions where users are</h3>
              <p>Run code 5 km from your visitor. No region picker, no cold starts, no babysitting.</p>
            </article>
            <article className="vc-band">
              <div className="vc-band-icon">
                <span />
                <span />
                <span />
              </div>
              <h3>Observability that loads in 200 ms</h3>
              <p>Real user metrics, no sampling, no dashboards-of-dashboards.</p>
            </article>
          </div>
        </section>

        <section className="vc-cta-final">
          <h2>Deploy a frontend in 8 seconds.</h2>
          <div className="vc-cta-row">
            <a className="vc-cta">Start free</a>
            <a className="vc-cta vc-cta--ghost">Talk to sales</a>
          </div>
          <p className="vc-cta-sub">
            <span className="vc-prompt">$</span> npx halo deploy — no credit card required
          </p>
        </section>
      </main>

      <footer className="vc-foot">
        <div>HALO — the developer cloud</div>
        <div>System ⏵ operational · 24 ms · 36 regions</div>
      </footer>
    </div>
  );
}
