export function AppleHIGDemo() {
  return (
    <div className="demo-apple-hig">
      <header className="ah-nav">
        <div className="ah-nav-inner">
          <span className="ah-mark"></span>
          <nav>
            <a>Store</a>
            <a>Mac</a>
            <a>iPad</a>
            <a>iPhone</a>
            <a className="is-current">Vision</a>
            <a>Accessories</a>
            <a>Support</a>
          </nav>
          <div className="ah-nav-utility">
            <span>⌕</span>
            <span>⌁</span>
          </div>
        </div>
      </header>

      <main className="ah-main">
        <section className="ah-hero">
          <div className="ah-eyebrow">New · Spatial Audio</div>
          <h1 className="ah-headline">
            Aether Pods.
            <br />
            <span className="ah-headline-soft">Listening, redefined.</span>
          </h1>
          <p className="ah-deck">
            Computational acoustics tuned in real time. From{" "}
            <span className="ah-deck-stat">
              <strong>$249</strong>
            </span>{" "}
            or <a className="ah-link">$20.75/mo. for 12 mo.</a>
          </p>

          <div className="ah-cta-row">
            <a className="ah-cta">Buy</a>
            <a className="ah-link">Learn more &gt;</a>
          </div>

          <div className="ah-product">
            <div className="ah-product-stage">
              <div className="ah-product-pod ah-product-pod--left"></div>
              <div className="ah-product-pod ah-product-pod--right"></div>
              <div className="ah-product-shadow" />
            </div>
            <div className="ah-product-caption">Aether Pods · Titanium White</div>
          </div>
        </section>

        <section className="ah-section ah-section--specs">
          <div className="ah-section-eyebrow">Spatial Engine</div>
          <h2 className="ah-section-h">A head-tracked sound stage that follows the world, not you.</h2>
          <p className="ah-section-p">
            The A-series N6 chip reconstructs 1,024 spatial cues every millisecond, anchoring each
            source to a stable point in the room — even as you turn your head.
          </p>

          <div className="ah-stats">
            <div>
              <div className="ah-stat-figure">
                <span>1,024</span>
              </div>
              <div className="ah-stat-label">spatial cues per ms</div>
            </div>
            <div>
              <div className="ah-stat-figure">
                <span>32</span>
                <small>h</small>
              </div>
              <div className="ah-stat-label">battery with case</div>
            </div>
            <div>
              <div className="ah-stat-figure">
                <span>‑42</span>
                <small>dB</small>
              </div>
              <div className="ah-stat-label">adaptive noise floor</div>
            </div>
            <div>
              <div className="ah-stat-figure">
                <span>0.6</span>
                <small>ms</small>
              </div>
              <div className="ah-stat-label">end-to-end latency</div>
            </div>
          </div>
        </section>

        <section className="ah-section ah-section--anatomy">
          <div className="ah-anatomy">
            <div className="ah-anatomy-figure">
              <div className="ah-anatomy-pod"></div>
              <div className="ah-anatomy-line ah-anatomy-line--1">
                <span>Vent-balanced driver</span>
              </div>
              <div className="ah-anatomy-line ah-anatomy-line--2">
                <span>Force-cancelling mic array</span>
              </div>
              <div className="ah-anatomy-line ah-anatomy-line--3">
                <span>Capacitive pressure stem</span>
              </div>
            </div>
            <div className="ah-anatomy-copy">
              <div className="ah-eyebrow">Engineering</div>
              <h3>
                Designed at the
                <br />
                molecular layer.
              </h3>
              <p>
                A single piece of medical-grade titanium, machined to 50 microns. The driver,
                microphone, and battery share one acoustic chamber — each tuned in concert.
              </p>
            </div>
          </div>
        </section>

        <section className="ah-section ah-section--lineup">
          <div className="ah-section-eyebrow">The line-up</div>
          <h2 className="ah-section-h">Three ways to listen.</h2>

          <div className="ah-lineup">
            {[
              { name: "Aether Pods", price: "From $249", color: "Titanium White", tag: "Most popular" },
              { name: "Aether Pods Pro", price: "From $399", color: "Graphite", tag: "Adaptive ANC" },
              { name: "Aether Pods Max", price: "From $599", color: "Sky Blue", tag: "Over-ear" },
            ].map((p) => (
              <article key={p.name} className="ah-lineup-card">
                <div className="ah-lineup-tag">{p.tag}</div>
                <div className="ah-lineup-image"></div>
                <h4>{p.name}</h4>
                <div className="ah-lineup-price">{p.price}</div>
                <div className="ah-lineup-color">{p.color}</div>
                <a className="ah-link">Buy &gt;</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="ah-foot">
        <div className="ah-foot-rule" />
        <div className="ah-foot-row">
          <span>Free delivery and returns. Trade in any iPhone for credit.</span>
          <span className="ah-foot-meta">United States · English</span>
        </div>
      </footer>
    </div>
  );
}
