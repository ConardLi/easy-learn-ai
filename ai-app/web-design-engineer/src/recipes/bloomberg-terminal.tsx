export function BloombergTerminalDemo() {
  const tickers = [
    ["NQ1", "20,418.75", "+0.42%", "up"],
    ["ES1", "5,841.50", "+0.18%", "up"],
    ["DXY", "104.21", "-0.06%", "down"],
    ["US10Y", "4.218", "+1.2bp", "up"],
    ["BTC", "98,420.10", "+2.7%", "up"],
    ["WTI", "78.94", "-0.31%", "down"],
    ["EURUSD", "1.0712", "+0.05%", "up"],
    ["XAU", "2,718.40", "+0.8%", "up"],
    ["JPY", "157.18", "-0.42%", "down"],
    ["VIX", "14.21", "-3.1%", "down"],
  ];

  const positions = [
    ["LONG", "AAPL US", "1,200", "189.42", "194.18", "+5,712", "+2.51%", "up"],
    ["LONG", "NVDA US", "640", "142.18", "146.92", "+3,033", "+3.33%", "up"],
    ["SHORT", "META US", "320", "548.21", "541.04", "+2,295", "+1.30%", "up"],
    ["LONG", "TSM US", "880", "188.50", "186.21", "-2,015", "-1.22%", "down"],
    ["LONG", "ASML NA", "240", "682.10", "691.50", "+2,256", "+1.38%", "up"],
    ["SHORT", "ARM US", "180", "118.40", "121.02", "-471", "-2.21%", "down"],
    ["LONG", "MSFT US", "520", "418.20", "421.80", "+1,872", "+0.86%", "up"],
    ["LONG", "AVGO US", "140", "1,612.00", "1,628.50", "+2,310", "+1.02%", "up"],
  ];

  const news = [
    ["09:42", "FED", "Bostic: rate path data-dependent, no cuts before Q2"],
    ["09:38", "EU", "ECB minutes — most members ready to ease in March"],
    ["09:31", "TECH", "NVIDIA tops on cloud capex guidance; AVGO follows"],
    ["09:24", "OIL", "WTI extends slide as inventories build, Cushing +1.2M"],
    ["09:18", "FX", "Yen weakens past 157 as BoJ deputy walks back hike chatter"],
    ["09:11", "CHN", "PBOC trims RRR by 25 bp; CSI 300 +1.4%"],
    ["09:04", "M&A", "Vertex confirms talks to acquire Alnara at $48/share"],
    ["08:58", "RATES", "10Y auction tails 0.6 bp; bid-to-cover 2.51"],
    ["08:51", "EARN", "MSFT after-hours: cloud +28% YoY, AI revenue $4.1bn"],
    ["08:42", "GEO", "Suez canal traffic now -4% MTD; reroute premia widen"],
  ];

  return (
    <div className="demo-bb">
      <div className="bb-shell">
        <div className="bb-titlebar">
          <span className="bb-titlebar-id">BLPRO &lt;HELP&gt; — KENWOOD &amp; CO. · DESK 04 · 09:42:18 EST</span>
          <span className="bb-titlebar-meta">U:CTRADER · F1 HELP · F2 DASH · F3 BLOTTER · F4 NEWS</span>
        </div>

        <div className="bb-ticker">
          <div className="bb-ticker-track">
            {[...tickers, ...tickers].map((t, i) => (
              <span key={i} className={`bb-ticker-cell bb-${t[3]}`}>
                <span className="bb-ticker-sym">{t[0]}</span>
                <span className="bb-ticker-px">{t[1]}</span>
                <span className="bb-ticker-chg">{t[2]}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="bb-grid">
          <section className="bb-pane bb-pane--positions">
            <header>
              <span>BLOTTER · DESK04</span>
              <span>+13,992 USD · 8 LIVE</span>
            </header>
            <table>
              <thead>
                <tr>
                  <th>SIDE</th>
                  <th>SYMBOL</th>
                  <th>QTY</th>
                  <th>AVG</th>
                  <th>LAST</th>
                  <th>P&amp;L</th>
                  <th>Δ</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((p) => (
                  <tr key={p[1]}>
                    <td className={`bb-side bb-side--${p[0].toLowerCase()}`}>{p[0]}</td>
                    <td className="bb-sym">{p[1]}</td>
                    <td>{p[2]}</td>
                    <td>{p[3]}</td>
                    <td>{p[4]}</td>
                    <td className={`bb-${p[7]}`}>{p[5]}</td>
                    <td className={`bb-${p[7]}`}>{p[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bb-pane bb-pane--chart">
            <header>
              <span>NDX · 1D · 5M</span>
              <span>20,418.75 · +85.20 · +0.42%</span>
            </header>
            <svg viewBox="0 0 600 220" className="bb-chart">
              <defs>
                <linearGradient id="bbGlow" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#FFA02F" stopOpacity="0.32" />
                  <stop offset="1" stopColor="#FFA02F" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* faint gridlines */}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={i} x1={0} x2={600} y1={i * 36} y2={i * 36} stroke="#2A3050" strokeWidth={0.6} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1={i * 75} x2={i * 75} y1={0} y2={220} stroke="#2A3050" strokeWidth={0.6} />
              ))}
              <path
                d="M0,160 L40,150 L80,164 L120,140 L160,148 L200,132 L240,118 L280,128 L320,108 L360,90 L400,98 L440,76 L480,62 L520,80 L560,52 L600,46 L600,220 L0,220 Z"
                fill="url(#bbGlow)"
              />
              <path
                d="M0,160 L40,150 L80,164 L120,140 L160,148 L200,132 L240,118 L280,128 L320,108 L360,90 L400,98 L440,76 L480,62 L520,80 L560,52 L600,46"
                fill="none"
                stroke="#FFA02F"
                strokeWidth={1.6}
              />
              <text x={580} y={50} fontFamily="IBM Plex Mono" fontSize="9" fill="#FFA02F">
                20,418.75
              </text>
            </svg>
            <div className="bb-chart-foot">
              <span>O 20,332.10</span>
              <span>H 20,438.50</span>
              <span>L 20,318.20</span>
              <span>VOL 4.21B</span>
            </div>
          </section>

          <section className="bb-pane bb-pane--news">
            <header>
              <span>NEWS · TOP</span>
              <span>F4 — DRILL</span>
            </header>
            <ul className="bb-news">
              {news.map((n) => (
                <li key={n[2]}>
                  <span className="bb-news-time">{n[0]}</span>
                  <span className="bb-news-tag">{n[1]}</span>
                  <span className="bb-news-head">{n[2]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bb-pane bb-pane--depth">
            <header>
              <span>DEPTH · ESH6</span>
              <span>SPREAD 0.25</span>
            </header>
            <table className="bb-depth">
              <thead>
                <tr>
                  <th>BID</th>
                  <th>SIZE</th>
                  <th>·</th>
                  <th>SIZE</th>
                  <th>ASK</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["5,841.50", "412", "382", "5,841.75"],
                  ["5,841.25", "318", "291", "5,842.00"],
                  ["5,841.00", "204", "248", "5,842.25"],
                  ["5,840.75", "188", "168", "5,842.50"],
                  ["5,840.50", "166", "142", "5,842.75"],
                  ["5,840.25", "112", "120", "5,843.00"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="bb-up">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>·</td>
                    <td>{r[2]}</td>
                    <td className="bb-down">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bb-pane bb-pane--watch">
            <header>
              <span>WATCH · MEGA-CAP</span>
              <span>11 SYM</span>
            </header>
            <table>
              <thead>
                <tr>
                  <th>SYM</th>
                  <th>LAST</th>
                  <th>CHG</th>
                  <th>VOL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["AAPL", "194.18", "+2.51%", "21.4M", "up"],
                  ["MSFT", "421.80", "+0.86%", "14.2M", "up"],
                  ["NVDA", "146.92", "+3.33%", "188M", "up"],
                  ["GOOG", "182.10", "+1.04%", "9.8M", "up"],
                  ["AMZN", "212.45", "+0.71%", "12.1M", "up"],
                  ["META", "541.04", "-1.30%", "6.4M", "down"],
                  ["TSLA", "238.40", "-2.18%", "84M", "down"],
                  ["AVGO", "1,628.50", "+1.02%", "2.1M", "up"],
                  ["TSM", "186.21", "-1.22%", "10.4M", "down"],
                  ["ASML", "691.50", "+1.38%", "1.4M", "up"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="bb-sym">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td className={`bb-${r[4]}`}>{r[2]}</td>
                    <td>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bb-pane bb-pane--cmd">
            <header>
              <span>COMMAND</span>
              <span>GO</span>
            </header>
            <div className="bb-cmd">
              <div className="bb-cmd-line">
                <span className="bb-cmd-prompt">&gt;</span>
                <span>SPX &lt;Index&gt; HP &lt;GO&gt;</span>
              </div>
              <div className="bb-cmd-line">
                <span className="bb-cmd-prompt">&gt;</span>
                <span>NVDA US &lt;Equity&gt; EV &lt;GO&gt;</span>
              </div>
              <div className="bb-cmd-line bb-cmd-line--active">
                <span className="bb-cmd-prompt">&gt;</span>
                <span>CFTR &lt;Curncy&gt; FRD &lt;GO&gt;</span>
                <span className="bb-caret">█</span>
              </div>
              <div className="bb-cmd-help">
                <span>F9 TRADE</span>
                <span>F10 ROUTE</span>
                <span>F11 ALERT</span>
                <span>F12 BLOOMBERG</span>
              </div>
            </div>
          </section>
        </div>

        <footer className="bb-foot">
          <span>SESSION 09:42:18 EST</span>
          <span>UPTIME 04D 11:22</span>
          <span>HEARTBEAT OK</span>
          <span>QUOTES NMS REAL-TIME</span>
          <span>© BLPRO 2026</span>
        </footer>
      </div>
    </div>
  );
}
