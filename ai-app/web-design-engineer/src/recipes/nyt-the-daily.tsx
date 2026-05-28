export function NytTheDailyDemo() {
  return (
    <div className="demo-nyt">
      <header className="nyt-masthead">
        <div className="nyt-masthead-row">
          <div className="nyt-date">Tuesday, May 26, 2026 · Today’s Paper · ¥320</div>
          <div className="nyt-weather">
            <span>NY · 18°</span>
            <span>·</span>
            <span>Cloudy, light wind</span>
          </div>
        </div>
        <div className="nyt-title">The Standard</div>
        <div className="nyt-tagline">
          “All the considered analysis fit to print.” &nbsp;— Vol. CLXXIV · No. 60,212
        </div>
        <nav className="nyt-nav">
          <a>U.S.</a>
          <a>World</a>
          <a className="is-current">Business</a>
          <a>Opinion</a>
          <a>Tech</a>
          <a>Climate</a>
          <a>Arts</a>
          <a>Magazine</a>
          <a>Style</a>
          <a>Cooking</a>
        </nav>
      </header>

      <main className="nyt-main">
        <section className="nyt-lead">
          <div className="nyt-lead-text">
            <div className="nyt-kicker">INVESTIGATION</div>
            <h1>
              How a Quiet Standards Body Became
              <br />
              the Pivot Point of the Energy Transition
            </h1>
            <p className="nyt-dek">
              <em>
                Twelve months of meetings — most of them unminuted, all of them consequential — show
                how a 47-person committee in Geneva is now setting the pace for what the grid will
                look like in 2030.
              </em>
            </p>
            <div className="nyt-byline">
              <span>By Hana Lewis and Kenji Otsuka</span>
              <span>Photographs by Lia Mahon</span>
              <span>Updated 9:42 a.m. ET</span>
            </div>
            <p className="nyt-body">
              <span className="nyt-dropcap">G</span>ENEVA — For most of the eighteen years that
              Helena Mahler has chaired Working Group 14, the room above the Place du Cirque has
              been mostly empty by mid-afternoon. Now, on a grey Tuesday in late May, it is full
              before the coffee is poured. Three ministries, eleven utilities, a Canadian senator
              and a small Korean delegation are all waiting to hear, in painstaking technical
              language, how a grid stabiliser ought to be re-defined.
            </p>
            <p className="nyt-body">
              The committee, formally known as IEC TC57/WG14, does not write headlines. It writes
              <em> conformance tests</em>. But for the past eighteen months, those tests have been
              the quiet thing holding up — or, more accurately, holding back — the largest
              transmission projects in five countries.
            </p>
            <p className="nyt-body">
              “The interesting question,” Ms. Mahler said, in a meeting that had to be held twice
              because the first one ran out of interpreters, “isn’t whether we will publish the
              standard. It’s what we name it.”
            </p>
          </div>
          <figure className="nyt-lead-image">
            <div className="nyt-photo" />
            <figcaption>
              Helena Mahler in the Place du Cirque, Geneva, on a working morning. The IEC building,
              behind her, is the unlikely choke-point of a global build-out. <em>Lia Mahon for The Standard</em>
            </figcaption>
          </figure>
        </section>

        <div className="nyt-rule" />

        <section className="nyt-grid">
          <article className="nyt-second">
            <div className="nyt-kicker">ANALYSIS</div>
            <h2>
              Why the Fed’s March pause might be its quietest move yet
            </h2>
            <p className="nyt-dek">
              <em>
                Inflation has cooled within the comfort band, but the committee is staring at three
                charts that look nothing alike.
              </em>
            </p>
            <p className="nyt-body">
              For a central bank that has spent two years calibrating language as carefully as
              rates, the next decision is not really about the policy path. It is about whether
              labor-market data has decoupled from the consumer-spending data...
            </p>
            <div className="nyt-byline">
              <span>By Robert Shen</span>
              <span>p. B1</span>
            </div>
          </article>

          <article className="nyt-third">
            <div className="nyt-kicker">OPINION</div>
            <h3>
              <em>The civic case for slow software.</em>
            </h3>
            <p className="nyt-body">
              An argument for the things that don’t need to ship every Tuesday — courts, ballots,
              the parking meter on the corner. Not everything that runs the country needs the same
              release cadence as a streaming app.
            </p>
            <div className="nyt-byline">
              <span>By Anna Lurie · Contributing Opinion</span>
            </div>
          </article>

          <article className="nyt-third">
            <div className="nyt-kicker">CLIMATE</div>
            <h3>What we know about the heat dome forming over the Plains</h3>
            <p className="nyt-body">
              A briefing prepared with the National Weather Service, the European Centre, and three
              utility load forecasters. The short version: it is not unprecedented, but it is
              early.
            </p>
            <div className="nyt-byline">
              <span>By M. Olsen and J. Pereira</span>
            </div>
          </article>
        </section>

        <div className="nyt-rule" />

        <section className="nyt-pull">
          <span className="nyt-pull-quote">
            “The interesting question isn&apos;t whether we will publish the standard. It&apos;s what we
            name it.”
          </span>
          <span className="nyt-pull-cite">— Helena Mahler, Working Group 14</span>
        </section>

        <section className="nyt-daily">
          <div className="nyt-daily-id">
            <div className="nyt-kicker">THE DAILY</div>
            <h2>Listen — Tuesday’s episode.</h2>
          </div>
          <article className="nyt-daily-card">
            <div className="nyt-daily-art" />
            <div className="nyt-daily-body">
              <div className="nyt-kicker">EPISODE 2,184 · 28 MIN</div>
              <h3>The Forty-Seven People Building Tomorrow’s Grid</h3>
              <p>
                Hosted by Michael Barbaro. Today, Hana Lewis explains why a quiet standards body
                might be the most consequential committee you’ve never heard of.
              </p>
              <div className="nyt-daily-controls">
                <button className="nyt-play">▶</button>
                <div className="nyt-daily-bar">
                  <div className="nyt-daily-fill" />
                </div>
                <div className="nyt-daily-time">07:32 · 28:14</div>
              </div>
              <div className="nyt-daily-meta">
                <span>Listen on Apple Podcasts</span>
                <span>·</span>
                <span>Spotify</span>
                <span>·</span>
                <span>Standard Audio</span>
              </div>
            </div>
          </article>
        </section>

        <section className="nyt-bottom">
          <div className="nyt-bottom-h">More in Business</div>
          <ul>
            <li>
              <strong>The new pickup line —</strong> EV truck sales are flat. The hybrids are
              quietly winning the truck war.
            </li>
            <li>
              <strong>Coffee, refigured —</strong> Why the futures market is mispricing 2026 by
              about twenty cents.
            </li>
            <li>
              <strong>How Stripe spent $1.4B on a quieter year —</strong> A look at the books, with
              one disclaimer.
            </li>
            <li>
              <strong>Inside the slow death of the freebie startup —</strong> What a generation of
              founders are learning the hard way.
            </li>
          </ul>
        </section>
      </main>

      <footer className="nyt-foot">
        <div>The Standard · 620 Eighth Avenue, New York</div>
        <div>© 2026 The Standard Company · Subscriber edition</div>
      </footer>
    </div>
  );
}
