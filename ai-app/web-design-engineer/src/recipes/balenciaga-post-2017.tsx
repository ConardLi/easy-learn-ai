export function BalenciagaDemo() {
  return (
    <div className="demo-bal">
      <header className="bl-nav">
        <a className="bl-mark">UNTITLED</a>
        <nav>
          <a>WOMEN</a>
          <a>MEN</a>
          <a className="is-current">COLLECTION 47</a>
          <a>STORES</a>
          <a>WORLD</a>
        </nav>
        <a className="bl-cart">SHOPPING BAG ( 0 )</a>
      </header>

      <section className="bl-strap">
        <span>SS 27 — COLLECTION 47</span>
        <span>NEW</span>
        <span>NEW</span>
        <span>NEW</span>
        <span>NEW</span>
        <span>SS 27 — COLLECTION 47</span>
        <span>NEW</span>
        <span>NEW</span>
      </section>

      <main className="bl-main">
        <h1 className="bl-h1">COLLECTION&nbsp;47</h1>
        <p className="bl-sub">NEW SEASON · WOMEN · DELIVERED MAY 26.</p>

        <section className="bl-grid">
          {[
            { code: "759810A8C8/0027", name: "POLO SHIRT", color: "WHITE / BLACK", price: "1,290" },
            { code: "758914TX0/9000", name: "OVERSIZED COAT", color: "BLACK", price: "3,250" },
            { code: "750402X0M/1000", name: "DENIM JEAN", color: "WORN BLUE", price: "1,150" },
            { code: "748921V2C/4000", name: "LEATHER BOOT", color: "BLACK", price: "1,890" },
            { code: "747105K7C/0027", name: "PRINTED T-SHIRT", color: "WHITE", price: "650" },
            { code: "746822L1B/9000", name: "TAILORED PANT", color: "BLACK", price: "1,420" },
            { code: "746118J0Z/0100", name: "TRENCH COAT", color: "STONE", price: "3,490" },
            { code: "745811C2P/9000", name: "LOGO SCARF", color: "BLACK / WHITE", price: "390" },
          ].map((p, i) => (
            <article key={p.code} className="bl-card">
              <div className="bl-card-photo">
                <div className={`bl-figure bl-figure--${i % 3}`} />
                <span className="bl-card-flag">NEW</span>
                <span className="bl-card-meta">LOOK {String(i + 1).padStart(2, "0")} / 47</span>
              </div>
              <div className="bl-card-meta-row">
                <span>{p.code}</span>
              </div>
              <div className="bl-card-name">{p.name}</div>
              <div className="bl-card-color">{p.color}</div>
              <div className="bl-card-price">£&nbsp;{p.price}</div>
              <a className="bl-card-link">ADD TO BAG</a>
            </article>
          ))}
        </section>

        <section className="bl-credits">
          <div className="bl-credits-h">CREDITS</div>
          <ul>
            <li>
              <span>CREATIVE DIRECTION</span>
              <span>UNTITLED STUDIO</span>
            </li>
            <li>
              <span>PHOTOGRAPHY</span>
              <span>TAKAYUKI HORI</span>
            </li>
            <li>
              <span>MODEL</span>
              <span>A. SUMIYOSHI</span>
            </li>
            <li>
              <span>SET</span>
              <span>STUDIO 9, PARIS</span>
            </li>
            <li>
              <span>LIGHT</span>
              <span>DIRECT FLASH · NO RETOUCH</span>
            </li>
          </ul>
        </section>

        <section className="bl-stores">
          <div className="bl-stores-h">STORES</div>
          <ul>
            <li>
              <strong>PARIS</strong>
              <span>336 RUE SAINT-HONORÉ — OPEN 11–19</span>
            </li>
            <li>
              <strong>NEW YORK</strong>
              <span>620 MADISON AVENUE — OPEN 10–19</span>
            </li>
            <li>
              <strong>TOKYO</strong>
              <span>OMOTESANDŌ HILLS, B1F — OPEN 11–20</span>
            </li>
            <li>
              <strong>SEOUL</strong>
              <span>11 APGUJEONG-RO 75-GIL — OPEN 11–20</span>
            </li>
            <li>
              <strong>SHANGHAI</strong>
              <span>NO. 1 ZHONG SHAN ROAD — OPEN 10–22</span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="bl-foot">
        <div>SUBSCRIBE</div>
        <input className="bl-foot-input" placeholder="EMAIL ADDRESS" />
        <a className="bl-foot-link">SUBMIT →</a>
        <div className="bl-foot-meta">UNTITLED · WORLD WIDE · MMXXVI</div>
      </footer>
    </div>
  );
}
