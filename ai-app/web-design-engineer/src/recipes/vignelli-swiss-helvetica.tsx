export function VignelliSwissHelveticaDemo() {
  return (
    <div className="demo-vignelli">
      <header className="vg-bar vg-bar--top">
        <span>MTA · NYC SUBWAY DIAGRAM</span>
        <span>EDITION 26 · DECEMBER 2026</span>
      </header>

      <main className="vg-main">
        <section className="vg-h">
          <div className="vg-h-no">01</div>
          <h1>HOW TO READ</h1>
          <p>One typeface, four colours, an 8 px grid. The map you can read at six metres or six centimetres.</p>
        </section>

        <section className="vg-diagram">
          <svg viewBox="0 0 1200 480" className="vg-diagram-svg" aria-label="Schematic transit diagram">
            <rect x="0" y="0" width="1200" height="480" fill="#FFFFFF" />
            {/* faint baseline grid */}
            {Array.from({ length: 30 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 40}
                y1={0}
                x2={i * 40}
                y2={480}
                stroke="#F2F2F2"
                strokeWidth={1}
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 40}
                x2={1200}
                y2={i * 40}
                stroke="#F2F2F2"
                strokeWidth={1}
              />
            ))}

            {/* Red line */}
            <polyline
              points="40,120 280,120 360,200 760,200 840,120 1160,120"
              fill="none"
              stroke="#E2231A"
              strokeWidth={12}
              strokeLinejoin="miter"
              strokeLinecap="butt"
            />
            {/* Blue line */}
            <polyline
              points="40,200 220,200 300,280 1000,280 1080,200 1160,200"
              fill="none"
              stroke="#0033A0"
              strokeWidth={12}
              strokeLinejoin="miter"
            />
            {/* Yellow line */}
            <polyline
              points="40,360 1160,360"
              fill="none"
              stroke="#F5C518"
              strokeWidth={12}
            />
            {/* Orange transfer */}
            <polyline
              points="600,40 600,440"
              fill="none"
              stroke="#FF6F00"
              strokeWidth={12}
            />

            {/* Stations as circles */}
            {[
              [40, 120, "FOREST HILLS"],
              [280, 120, "TIMES SQ"],
              [600, 120, "5 AV / 53"],
              [840, 120, "QUEENS PLAZA"],
              [1160, 120, "FLUSHING"],
              [40, 200, "242 ST"],
              [600, 200, "GRAND CTRL"],
              [1160, 200, "BROOKLYN BR"],
              [40, 360, "PELHAM BAY"],
              [600, 360, "HERALD SQ"],
              [1160, 360, "CONEY ISL"],
              [600, 280, "UNION SQ"],
            ].map(([x, y, label], i) => (
              <g key={i}>
                <circle cx={x as number} cy={y as number} r={8} fill="#000" />
                <text
                  x={(x as number) + 12}
                  y={(y as number) - 12}
                  fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
                  fontWeight="500"
                  fontSize="11"
                  fill="#000"
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </section>

        <section className="vg-rows">
          <div className="vg-section-bar">
            <span>02 · ROUTES</span>
            <span>NORTHBOUND · 06:00 — 23:00</span>
          </div>

          <table className="vg-table">
            <thead>
              <tr>
                <th>LINE</th>
                <th>SERVICE</th>
                <th>TERMINUS</th>
                <th>HEADWAY</th>
                <th>FIRST</th>
                <th>LAST</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1", "Broadway local", "242 St — South Ferry", "4 min", "05:42", "00:18", "red"],
                ["2", "7 Av express", "Wakefield — Flatbush", "5 min", "05:14", "01:02", "red"],
                ["A", "8 Av express", "Inwood — Far Rockaway", "5 min", "05:05", "00:54", "blue"],
                ["F", "6 Av local", "Jamaica — Coney Island", "6 min", "05:32", "01:11", "orange"],
                ["L", "Canarsie", "8 Av — Canarsie", "4 min", "05:00", "01:30", "gray"],
                ["7", "Flushing", "Times Sq — Flushing", "3 min", "05:21", "00:48", "purple"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td>
                    <span className={`vg-bullet vg-bullet--${r[6]}`}>{r[0]}</span>
                  </td>
                  <td>{r[1]}</td>
                  <td>{r[2]}</td>
                  <td>{r[3]}</td>
                  <td>{r[4]}</td>
                  <td>{r[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="vg-system">
          <div className="vg-section-bar vg-section-bar--yellow">
            <span>03 · SYSTEM</span>
            <span>HELVETICA NEUE · 8 PX BASELINE</span>
          </div>
          <div className="vg-system-grid">
            <div className="vg-cell">
              <div className="vg-cell-h">72</div>
              <span>Hero / Map title</span>
            </div>
            <div className="vg-cell">
              <div className="vg-cell-h" style={{ fontSize: 48 }}>
                48
              </div>
              <span>Section</span>
            </div>
            <div className="vg-cell">
              <div className="vg-cell-h" style={{ fontSize: 32 }}>
                32
              </div>
              <span>Subhead</span>
            </div>
            <div className="vg-cell">
              <div className="vg-cell-h" style={{ fontSize: 24 }}>
                24
              </div>
              <span>Lead</span>
            </div>
            <div className="vg-cell">
              <div className="vg-cell-h" style={{ fontSize: 16 }}>
                16
              </div>
              <span>Body</span>
            </div>
            <div className="vg-cell">
              <div className="vg-cell-h" style={{ fontSize: 12 }}>
                12
              </div>
              <span>Caption</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="vg-bar vg-bar--foot">
        <span>METROPOLITAN TRANSPORTATION AUTHORITY · NEW YORK</span>
        <span>DESIGN: U/V STUDIO · AFTER VIGNELLI 1972</span>
      </footer>
    </div>
  );
}
