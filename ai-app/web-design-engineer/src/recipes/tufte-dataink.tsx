function Sparkline({ data, color = "#A6300E", w = 80, h = 18 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 2) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="td-sparkline" aria-hidden>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={1} />
      <circle cx={(data.length - 1 ? 1 : 0) * w} cy={h - ((data[data.length - 1] - min) / span) * (h - 2) - 1} r={1.4} fill={color} />
    </svg>
  );
}

function SmallMultiple({ title, data, color }: { title: string; data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  return (
    <div className="td-mult">
      <div className="td-mult-h">{title}</div>
      <svg viewBox="0 0 200 64" className="td-mult-svg" aria-hidden>
        <line x1="0" y1="32" x2="200" y2="32" stroke="#D8D2C2" strokeWidth={0.5} />
        <polyline
          points={data
            .map((v, i) => `${(i / (data.length - 1)) * 200},${64 - ((v - min) / span) * 56 - 4}`)
            .join(" ")}
          fill="none"
          stroke={color}
          strokeWidth={1}
        />
      </svg>
      <div className="td-mult-meta">
        <span>{min.toFixed(0)}</span>
        <span>{max.toFixed(0)}</span>
      </div>
    </div>
  );
}

export function TufteDataInkDemo() {
  const sparkA = [12, 14, 13, 17, 15, 18, 22, 19, 23, 28, 26, 31, 30, 34, 38, 36, 41, 44, 42, 47, 49];
  const sparkB = [4, 6, 8, 7, 9, 12, 14, 13, 16, 19, 17, 21, 24, 22, 26, 28, 27, 31, 33, 36, 38];

  return (
    <div className="demo-tufte">
      <article className="td-article">
        <header className="td-head">
          <div className="td-head-meta">
            <span>The Data Annual · Volume X</span>
            <span>04 · Climate &amp; Energy</span>
          </div>
          <h1>
            The quiet acceleration:
            <br />
            <em>a decade of small numbers, charted small.</em>
          </h1>
          <p className="td-lede">
            By Helen Park · with figures prepared in the manner of E. R. Tufte
          </p>
        </header>

        <section className="td-prose">
          <p>
            From 2014 to 2025, the average residential <strong>kWh consumed</strong> per household
            in temperate North America fell by 11.4&nbsp;<Sparkline data={sparkA.slice().reverse()} />
            &nbsp;— a number small enough to look like noise on a quarterly readout, but settled
            and consistent across <em>every</em> measured region. Solar capacity over the same span
            grew 6.2× &nbsp;<Sparkline data={sparkB} color="#3E4A5C" /> &nbsp;, an entirely
            different shape: not a slope, but a steady ramp with two visible inflections — in Q1
            2019 (state-level tax credits) and Q3 2022 (federal IRA passage).
          </p>
          <p>
            <span className="td-margin">
              <sup>1</sup> Figures are pooled from 14 utilities in zones 4–7 (Köppen). Households
              under 1 200 sq.&nbsp;ft. excluded to avoid skew from apartment metering.
            </span>
            Read alongside, the two series describe a household that consumes less and produces
            more — but neither curve, in isolation, justifies the policy mood of either year.
          </p>
          <p>
            The <strong>direct labels</strong> below replace what would normally be a legend; the
            box around the chart is gone, the gridlines reduced to faint reference rules. There is
            no third dimension. The page is the chart. The chart is the page.
          </p>
        </section>

        <figure className="td-figure">
          <figcaption className="td-figure-cap">
            <strong>Figure 1.</strong> Residential energy use vs. installed solar capacity, 14
            utilities, 2014 — 2025. Two series, two endpoints, no legend.
          </figcaption>

          <svg viewBox="0 0 720 320" className="td-figure-svg" aria-label="Residential energy chart">
            {/* faint reference rules */}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={i} x1={60} y1={40 + i * 56} x2={680} y2={40 + i * 56} stroke="#E6DEC5" strokeWidth={0.5} />
            ))}
            {/* x labels */}
            {["’14", "’16", "’18", "’20", "’22", "’24"].map((l, i) => (
              <text
                key={l}
                x={60 + (i * 620) / 5}
                y={310}
                fontFamily="Newsreader, Georgia, serif"
                fontSize="11"
                fill="#5C5550"
                textAnchor="middle"
              >
                {l}
              </text>
            ))}
            {/* energy series A — declining red */}
            <polyline
              points="60,90 124,98 188,108 252,118 316,126 380,138 444,146 508,156 572,170 636,184 680,202"
              fill="none"
              stroke="#A6300E"
              strokeWidth={1.4}
            />
            <text x={684} y={206} fontFamily="Newsreader" fontSize="11" fill="#A6300E">
              kWh / household
            </text>
            {/* solar series B — rising slate */}
            <polyline
              points="60,266 124,262 188,254 252,232 316,210 380,178 444,140 508,112 572,90 636,72 680,52"
              fill="none"
              stroke="#3E4A5C"
              strokeWidth={1.4}
            />
            <text x={684} y={56} fontFamily="Newsreader" fontSize="11" fill="#3E4A5C">
              kW solar installed
            </text>
            {/* annotation */}
            <line x1={336} y1={140} x2={336} y2={228} stroke="#A6300E" strokeWidth={0.5} strokeDasharray="2 3" />
            <text x={344} y={148} fontFamily="Newsreader" fontStyle="italic" fontSize="10" fill="#A6300E">
              IRA passes
            </text>
          </svg>
        </figure>

        <section className="td-multiples">
          <div className="td-multiples-h">
            <h3>
              <em>Small multiples.</em> Same chart, ten regions.
            </h3>
            <p>
              Variation between regions is smaller than the popular framing suggests. The Carolinas
              and the Pacific North-west move in step within two percentage points. The outlier is
              not a region — it is the year 2020.
            </p>
          </div>

          <div className="td-multiples-grid">
            {[
              ["New England", "#3E4A5C"],
              ["Mid-Atlantic", "#3E4A5C"],
              ["Carolinas", "#3E4A5C"],
              ["South-east", "#3E4A5C"],
              ["Great Lakes", "#3E4A5C"],
              ["Plains", "#3E4A5C"],
              ["South-west", "#A6300E"],
              ["Rockies", "#A6300E"],
              ["California", "#3E4A5C"],
              ["Pacific NW", "#3E4A5C"],
            ].map(([t, c], i) => (
              <SmallMultiple
                key={t}
                title={t}
                color={c}
                data={Array.from({ length: 21 }).map((_, j) => 10 + Math.sin((j + i) / 2) * 4 + j * 0.6 + (i % 3))}
              />
            ))}
          </div>
        </section>

        <section className="td-table">
          <h3>Table 1. — Annual averages, ten regions, 2014 / 2025.</h3>
          <table>
            <thead>
              <tr>
                <th>Region</th>
                <th>kWh ’14</th>
                <th>kWh ’25</th>
                <th>Δ %</th>
                <th>Solar ’14</th>
                <th>Solar ’25</th>
                <th>×</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["New England", 11420, 9981, -12.6, 142, 882, 6.2],
                ["Mid-Atlantic", 12110, 10402, -14.1, 198, 1241, 6.3],
                ["Carolinas", 13420, 12010, -10.5, 220, 1620, 7.4],
                ["South-east", 14502, 13208, -8.9, 188, 1502, 8.0],
                ["Great Lakes", 11820, 10412, -11.9, 102, 718, 7.0],
                ["Plains", 12918, 11402, -11.7, 88, 612, 6.9],
                ["South-west", 14601, 12832, -12.1, 412, 2810, 6.8],
                ["Rockies", 13420, 11982, -10.7, 188, 1411, 7.5],
                ["California", 11210, 9620, -14.2, 802, 5611, 6.9],
                ["Pacific NW", 11820, 10210, -13.6, 220, 1620, 7.4],
              ].map((r) => (
                <tr key={r[0] as string}>
                  <td>{r[0]}</td>
                  <td>{(r[1] as number).toLocaleString()}</td>
                  <td>{(r[2] as number).toLocaleString()}</td>
                  <td className="td-table-neg">{(r[3] as number).toFixed(1)}</td>
                  <td>{(r[4] as number).toLocaleString()}</td>
                  <td>{(r[5] as number).toLocaleString()}</td>
                  <td>{(r[6] as number).toFixed(1)}×</td>
                  <td className="td-table-mini">
                    <Sparkline data={[r[1] as number, r[2] as number]} w={36} h={14} color="#A6300E" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="td-foot">
          <p>
            Sources: utility filings (EIA-861), state solar registries, author’s spreadsheets.
            Figures prepared without 3-D, without legend boxes, and with no colour used for
            decoration. Where colour appears, it encodes a difference of <em>magnitude</em>, not
            of mood.
          </p>
          <p className="td-foot-meta">
            <em>The Data Annual.</em> Set in Newsreader and Inter. Printed in two colours on warm
            stock.
          </p>
        </footer>
      </article>
    </div>
  );
}
