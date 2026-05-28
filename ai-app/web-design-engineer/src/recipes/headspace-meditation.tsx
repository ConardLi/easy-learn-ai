export function HeadspaceDemo() {
  return (
    <div className="demo-hs">
      <div className="hs-sun" aria-hidden />
      <div className="hs-blob hs-blob--coral" aria-hidden />
      <div className="hs-blob hs-blob--lavender" aria-hidden />
      <div className="hs-blob hs-blob--sage" aria-hidden />

      <header className="hs-nav">
        <a className="hs-mark">
          <span className="hs-mark-orb" />
          <span>open · space</span>
        </a>
        <nav>
          <a>Meditate</a>
          <a>Sleep</a>
          <a className="is-current">Today</a>
          <a>Library</a>
        </nav>
        <a className="hs-cta">Start free</a>
      </header>

      <main className="hs-main">
        <section className="hs-greet">
          <p className="hs-eyebrow">TUESDAY · GOOD MORNING, MAYA</p>
          <h1 className="hs-h1">
            Take ten <em>quiet</em> minutes
            <br />
            before the day gets loud.
          </h1>
          <div className="hs-greet-row">
            <span className="hs-streak">
              <span className="hs-streak-dot" />
              <span>14-day streak — your longest yet</span>
            </span>
            <span className="hs-time">07:42 · sunrise in 18 min</span>
          </div>
        </section>

        <section className="hs-card-row">
          <article className="hs-card hs-card--feature">
            <div className="hs-card-orb">
              <div className="hs-card-orb-inner" />
            </div>
            <div className="hs-card-body">
              <span className="hs-card-tag">TODAY · 10 MIN</span>
              <h2>
                Quietly,
                <br />
                <em>back to&nbsp;centre.</em>
              </h2>
              <p>
                A guided breath with Andy. Three rounds of four counts in, six counts out. You can
                do this from a chair, a train, a couch, a kitchen.
              </p>
              <div className="hs-card-row">
                <button className="hs-play">▶</button>
                <div>
                  <strong>Andy Puddicombe</strong>
                  <span>Senior teacher · 14:12 in library</span>
                </div>
                <span className="hs-tag hs-tag--coral">breath</span>
              </div>
              <div className="hs-breath">
                <div className="hs-breath-orb" />
                <div className="hs-breath-copy">
                  <span>breathe in &nbsp;…&nbsp;</span>
                  <em>and gently out</em>
                </div>
              </div>
            </div>
          </article>

          <aside className="hs-sleep">
            <span className="hs-card-tag">FOR TONIGHT</span>
            <h3>A river that doesn’t hurry.</h3>
            <p>An 8-hour soundscape, slow, low, just on the edge of hearing.</p>
            <div className="hs-sleep-row">
              <button className="hs-play hs-play--ghost">▶</button>
              <span>8 hr · sleep sounds</span>
            </div>
            <div className="hs-sleep-art">
              <svg viewBox="0 0 200 100" aria-hidden>
                <path
                  d="M0 60 Q40 40 80 60 T160 60 T240 60"
                  fill="none"
                  stroke="#1B3A47"
                  strokeWidth="2"
                  opacity="0.55"
                />
                <path
                  d="M0 76 Q40 56 80 76 T160 76 T240 76"
                  fill="none"
                  stroke="#1B3A47"
                  strokeWidth="2"
                  opacity="0.35"
                />
                <circle cx="180" cy="22" r="12" fill="#FFD86B" />
                <ellipse cx="40" cy="84" rx="44" ry="6" fill="#1B3A47" opacity="0.16" />
              </svg>
            </div>
          </aside>
        </section>

        <section className="hs-row hs-row--three">
          <article className="hs-pill hs-pill--lavender">
            <span className="hs-pill-icon">☼</span>
            <strong>For the commute</strong>
            <span>3 min · ground in your seat</span>
          </article>
          <article className="hs-pill hs-pill--sage">
            <span className="hs-pill-icon">∿</span>
            <strong>Before the meeting</strong>
            <span>5 min · steady the chest</span>
          </article>
          <article className="hs-pill hs-pill--peach">
            <span className="hs-pill-icon">✷</span>
            <strong>When the inbox roars</strong>
            <span>4 min · soft eyes, soft hands</span>
          </article>
        </section>

        <section className="hs-section">
          <div className="hs-section-h">
            <p className="hs-eyebrow">A WEEK OF QUIET</p>
            <h2>
              Your <em>this week</em>
            </h2>
          </div>

          <div className="hs-week">
            {[
              ["MON", "06", true, "Andy · breath"],
              ["TUE", "07", true, "Eve · body scan"],
              ["WED", "08", true, "Andy · breath"],
              ["THU", "09", true, "Yoni · gratitude"],
              ["FRI", "10", true, "Andy · breath"],
              ["SAT", "11", false, "today"],
              ["SUN", "12", false, "—"],
            ].map(([d, n, done, label]) => (
              <div key={d as string} className={`hs-day ${done ? "is-done" : ""}`}>
                <div className="hs-day-orb">{done ? "✓" : (n as string)}</div>
                <div className="hs-day-d">{d as string}</div>
                <div className="hs-day-lab">{label as string}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="hs-note">
          <span className="hs-note-mark" />
          <p>
            <em>“Take a moment. We&apos;ll wait.”</em>
          </p>
          <span>— a quiet promise · since 2010</span>
        </section>
      </main>

      <footer className="hs-foot">
        <span>open · space &nbsp; — &nbsp; a small, slow company</span>
        <span>Santa Monica · 2026</span>
      </footer>
    </div>
  );
}
