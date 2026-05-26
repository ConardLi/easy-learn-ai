import type { DemoStepProps } from "./index";

export default function TerminalGreenDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="tg-scene">
        <div className="tg-bar">
          <span className="dot r" />
          <span className="dot y" />
          <span className="dot g" />
          <span className="title">— ~/projects/forge · zsh · 1920×1080</span>
          <span className="right">session 04 · 26 may 26 · 19:24</span>
        </div>

        <div className="tg-body">
          <span className="line l1"><span className="cmt"># bootstrapping a presentation in one command</span></span>
          <span className="line l2"><span className="prompt">forge ▸</span> npx create-video-presentation@latest&nbsp;<span className="em">~/talks/forge</span></span>
          <span className="line l3"><span className="ok">✓ resolved scaffold (23 themes available)</span></span>
          <span className="line l4"><span className="ok">✓ wrote 28 files · installed 142 packages · 2.1s</span></span>
          <span className="line l5"><span className="warn">! theme not picked — defaulting to midnight-press</span></span>
          <span className="line l6"><span className="prompt">forge ▸</span> cd ~/talks/forge &amp;&amp; npm run dev</span>
          <span className="line l7"><span className="ok">✓ vite ready · http://localhost:5173</span></span>
          <span className="line l8 pulse"><span className="prompt">forge ▸</span> open http://localhost:5173/?auto=1</span>
        </div>

        <div className="tg-foot">
          <span>$ ./presentation --start · status: OK</span>
          <span>cursor blinking · waiting for input</span>
        </div>
      </div>
    );
  }

  return (
    <div className="tg-scene">
      <div className="tg-bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="title">— ~/talks/forge · runtime metrics</span>
        <span className="right">session 04 · auto-mode · live</span>
      </div>

      <div className="tg-body" style={{ paddingTop: 12 }}>
        <span className="line l1"><span className="prompt">forge ▸</span> stats --human</span>
        <span className="line l2 cmt"># first frame to first scene</span>
        <span className="line l3" />
      </div>

      <div className="tg-headline">
        <span style={{ animation: "rise-in 700ms 800ms both" }}>80&thinsp;ms</span>
        <small style={{ animation: "rise-in 600ms 1200ms both" }}>— first paint, no flash, no shift</small>
      </div>

      <div className="tg-pre">
        <pre className="pre" style={{ animation: "rise-in 600ms 1500ms both" }}>
{`{
  scaffold:     "2.1 s",
  theme:        "terminal-green",
  fonts:        "0 (system mono)",
  first-paint:  "80 ms",   ${"\u00a0"}// <-- humans don't see this
  TTI:          "112 ms",
  chapters:     12,
  steps:        47
}`}
        </pre>

        <div className="meta" style={{ animation: "rise-in 600ms 1800ms both" }}>
          <div className="row"><span>— recording</span><span>?auto=1 · SPACE to start</span></div>
          <div className="row"><span>— audio</span><span>narrations.ts · 47 / 47</span></div>
          <div className="row"><span>— output</span><span>1920 × 1080 · 60 fps</span></div>
          <div className="row"><span>— next</span><span>$ ./record.sh ▍</span></div>
        </div>
      </div>

      <div className="tg-foot">
        <span>terminal · runtime · all green</span>
        <span>ctrl-c · stop · ctrl-z · pause</span>
      </div>
    </div>
  );
}
