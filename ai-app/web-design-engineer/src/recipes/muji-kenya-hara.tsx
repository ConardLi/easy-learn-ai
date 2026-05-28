export function MujiKenyaHaraDemo() {
  return (
    <div className="demo-muji">
      <header className="mj-nav">
        <span>MUJIRYOAN</span>
        <nav>
          <a>Objects</a>
          <a>Rooms</a>
          <a>Notebook</a>
          <a>About</a>
        </nav>
        <span className="mj-nav-locale">JP / EN</span>
      </header>

      <main className="mj-main">
        <section className="mj-opening">
          <p className="mj-opening-line">空っぽは、いちばん豊かな器である。</p>
          <p className="mj-opening-trans">Emptiness is the most generous vessel.</p>
          <p className="mj-opening-cite">— from a series of unremarkable objects, 2026</p>
        </section>

        <section className="mj-piece">
          <div className="mj-piece-label">01 — Cotton</div>
          <div className="mj-piece-image">
            <div className="mj-piece-orb mj-piece-orb--cotton" />
          </div>
          <div className="mj-piece-caption">
            <h2>A towel that learns water.</h2>
            <p>
              Three hundred grams. Long-staple cotton, spun loose, dried in air. After thirty washes,
              it holds more of you than the first day.
            </p>
            <div className="mj-piece-meta">
              <span>Weight 300 g</span>
              <span>Cotton 100%</span>
              <span>Imabari, Ehime</span>
            </div>
          </div>
        </section>

        <section className="mj-piece mj-piece--reverse">
          <div className="mj-piece-label">02 — Ash</div>
          <div className="mj-piece-image">
            <div className="mj-piece-orb mj-piece-orb--ash" />
          </div>
          <div className="mj-piece-caption">
            <h2>A bowl that remembers fire.</h2>
            <p>
              Mountain clay, ash glaze, twelve hours in the kiln. Each piece is a slightly different
              colour of forgotten weather.
            </p>
            <div className="mj-piece-meta">
              <span>⌀ 142 mm</span>
              <span>Stoneware</span>
              <span>Mashiko, Tochigi</span>
            </div>
          </div>
        </section>

        <section className="mj-piece">
          <div className="mj-piece-label">03 — Paper</div>
          <div className="mj-piece-image">
            <div className="mj-piece-orb mj-piece-orb--paper" />
          </div>
          <div className="mj-piece-caption">
            <h2>A notebook the wind opens.</h2>
            <p>
              Single sheet, folded once, sewn with a length of linen thread. Sixty-four pages, an
              everyday quantity. Best used for things that will not be reread.
            </p>
            <div className="mj-piece-meta">
              <span>A6 · 64 pp</span>
              <span>Cotton paper</span>
              <span>Echizen, Fukui</span>
            </div>
          </div>
        </section>

        <section className="mj-coda">
          <div className="mj-coda-label">A note from Hara-san</div>
          <p>
            We do not design objects. We design the space objects make around a person — the way a
            cup leaves a quiet ring on a table, the way a chair waits.
          </p>
          <div className="mj-coda-mark" />
        </section>
      </main>

      <footer className="mj-foot">
        <span>MUJIRYOAN — a small catalogue of unremarkable objects</span>
        <span>Issue 14 · Winter 2026</span>
      </footer>
    </div>
  );
}
