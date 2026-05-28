export function AesopDemo() {
  return (
    <div className="demo-aesop">
      <header className="ae-nav">
        <div className="ae-nav-mark">AESÖL</div>
        <nav>
          <a>Skin</a>
          <a>Hair</a>
          <a>Body</a>
          <a>Fragrance</a>
          <a>Home</a>
          <a>Read</a>
        </nav>
        <div className="ae-nav-utility">
          <a>Account</a>
          <span>·</span>
          <a>Cart (0)</a>
        </div>
      </header>

      <main className="ae-main">
        <section className="ae-product">
          <figure className="ae-product-figure">
            <div className="ae-product-bottle" aria-hidden />
            <div className="ae-product-prop" aria-hidden />
            <figcaption className="ae-product-cap">Photograph · George Brown, 2026</figcaption>
          </figure>

          <article className="ae-product-side">
            <div className="ae-product-eyebrow">PARSLEY SEED RANGE — 09</div>
            <h1 className="ae-product-h1">
              Béyond Hydrating
              <br />
              <em>Serum Concentrate.</em>
            </h1>
            <p className="ae-product-deck">
              A weightless aqueous serum formulated to deliver hydration to all skin types,
              particularly skin that is dry, dehydrated, or compromised by the elements.
            </p>

            <div className="ae-product-row">
              <div className="ae-product-vol">
                <div className="ae-label">VOLUME</div>
                <div className="ae-value">100 mL</div>
              </div>
              <div className="ae-product-price">
                <div className="ae-label">PRICE</div>
                <div className="ae-value">£74</div>
              </div>
            </div>

            <button className="ae-buy">Add to cart — £74</button>
            <a className="ae-link">Find a store &nbsp;→</a>

            <div className="ae-rule" />

            <dl className="ae-product-spec">
              <div>
                <dt>Skin Type</dt>
                <dd>Normal, dry, dehydrated</dd>
              </div>
              <div>
                <dt>Aroma</dt>
                <dd>Earthy, herbaceous, with a green-floral lift</dd>
              </div>
              <div>
                <dt>Texture</dt>
                <dd>A clear aqueous fluid; absorbed without residue</dd>
              </div>
              <div>
                <dt>Custodianship</dt>
                <dd>Store at room temperature, away from direct sunlight</dd>
              </div>
            </dl>
          </article>
        </section>

        <section className="ae-section">
          <div className="ae-section-grid">
            <div className="ae-section-col">
              <div className="ae-eyebrow">INGREDIENTS</div>
              <p>
                The formulation marries three considered hydrators — Beta-Glucan from oat,
                Hyaluronic Acid, and Glycerin — with botanical extracts of <em>Petroselinum
                crispum</em> (parsley) and <em>Salvia officinalis</em>.
              </p>
              <ul className="ae-list">
                <li>Beta-Glucan</li>
                <li>Hyaluronic Acid (low &amp; high MW)</li>
                <li>Vegetal Glycerin</li>
                <li>Parsley Seed Extract</li>
                <li>Sage Leaf Extract</li>
              </ul>
            </div>

            <div className="ae-section-col">
              <div className="ae-eyebrow">RITUAL</div>
              <p>
                Apply two pipettes to clean skin, morning and evening. Press, do not rub, into the
                face, neck, and décolletage. Follow with a cream of appropriate weight for the
                season.
              </p>
              <ol className="ae-list ae-list--ordered">
                <li>Cleanse — Parsley Seed Facial Cleanser</li>
                <li>Tone — Lightweight Toning Lotion</li>
                <li>Serum — Béyond Hydrating Concentrate</li>
                <li>Cream — Mandarin Facial Hydrating Cream</li>
              </ol>
            </div>

            <div className="ae-section-col">
              <div className="ae-eyebrow">CONSULTATION</div>
              <p>
                For composite enquiries — sensitivity, layering, gifts — our consultants reply
                within a working day. We do not believe in hurry.
              </p>
              <a className="ae-link">Write to us &nbsp;→</a>
              <div className="ae-amber-rule" />
            </div>
          </div>
        </section>

        <section className="ae-essay">
          <div className="ae-eyebrow">FROM THE LIBRARY</div>
          <h2 className="ae-essay-h">
            <em>“To soften the air around the skin.”</em>
          </h2>
          <p>
            From an unpublished essay by Janine di Giovanni, written in Marrakesh, the morning after
            a long fast. We sent her three bottles, asking for nothing, and she sent back five
            pages.
          </p>
          <a className="ae-link">Read the essay &nbsp;→</a>
        </section>
      </main>

      <footer className="ae-foot">
        <div>AESÖL · 153 Curtain Road, London EC2A</div>
        <div>Established 1987 · Trading Hours 10:00 – 19:00</div>
      </footer>
    </div>
  );
}
