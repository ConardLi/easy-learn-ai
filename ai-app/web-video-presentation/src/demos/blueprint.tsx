import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function BlueprintDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="bl-scene">
        <div className="bl-mast">
          <span className="brand">BLUEPRINT / 蓝图</span>
          <span className="id">— DOC ID: bp-2026-04 · sheet 01 of 12</span>
          <span className="ver">v 2.4 · current</span>
        </div>

        <div className="bl-cover">
          <div className="body">
            <span className="id-tag">— system architecture · public draft</span>
            <h1>
              <MaskReveal show duration={1000}>
                <span>Forge&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={400} duration={1000}>
                <span className="em">Runtime</span>
              </MaskReveal>
              <MaskReveal show delay={760} duration={1000}>
                <span>.</span>
              </MaskReveal>
            </h1>
            <p>
              一份描述 Forge 推理引擎 v2.4 的设计文档：8 个模块 / 32 个
              数据流 / 3 条关键路径——这一页是 1:200 总览，下一页放
              核心子系统的数字.
            </p>
            <div className="meta">
              <div><span>scope</span><span>runtime</span></div>
              <div><span>scale</span><span>1 : 200</span></div>
              <div><span>author</span><span>YL / JP</span></div>
              <div><span>rev</span><span>2026.04</span></div>
              <div><span>sheet</span><span>01 / 12</span></div>
              <div><span>status</span><span>review</span></div>
            </div>
          </div>

          <div className="bl-blueprint">
            <span className="corner tl" /><span className="corner tr" />
            <span className="corner bl" /><span className="corner br" />
            <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
              <g fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--accent)" }}>
                {/* input nodes */}
                <rect x="40" y="60" width="120" height="64" strokeDasharray="6 4" />
                <rect x="40" y="160" width="120" height="64" strokeDasharray="6 4" />
                <rect x="40" y="260" width="120" height="64" strokeDasharray="6 4" />
                {/* core */}
                <rect x="240" y="170" width="180" height="120" strokeWidth="3" />
                <rect x="252" y="186" width="156" height="88" strokeDasharray="3 3" strokeWidth="1" />
                {/* output */}
                <rect x="500" y="170" width="64" height="120" strokeDasharray="6 4" />
                {/* connections */}
                <line x1="160" y1="92" x2="240" y2="200" />
                <line x1="160" y1="192" x2="240" y2="220" />
                <line x1="160" y1="292" x2="240" y2="252" />
                <line x1="420" y1="230" x2="500" y2="230" />
                {/* feedback */}
                <path d="M 330 290 Q 100 470 100 380 L 100 324" strokeDasharray="3 5" />
                {/* tick marks */}
                <line x1="50" y1="510" x2="550" y2="510" />
                <g>
                  {Array.from({ length: 11 }, (_, i) => (
                    <line key={i} x1={50 + i * 50} y1="506" x2={50 + i * 50} y2="514" />
                  ))}
                </g>
                <text x="50" y="540" fill="currentColor" fontSize="14" fontFamily="IBM Plex Mono">0</text>
                <text x="540" y="540" fill="currentColor" fontSize="14" fontFamily="IBM Plex Mono">5 ms</text>
              </g>
              <g fill="var(--text)" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="0.1em">
                <text x="50" y="50">INPUT A</text>
                <text x="50" y="150">INPUT B</text>
                <text x="50" y="250">INPUT C</text>
                <text x="290" y="160">CORE / scheduler</text>
                <text x="510" y="160">OUT</text>
              </g>
            </svg>
            <span className="l-cap" style={{ top: 12, right: 12 }}>fig. 01</span>
            <span className="l-cap" style={{ bottom: 12, left: 12 }}>scale 1 : 200</span>
          </div>
        </div>

        <div className="bl-foot">
          <span>BLUEPRINT · runtime v2.4</span>
          <span>doc id bp-2026-04 / sheet 01 / 12</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bl-scene">
      <div className="bl-mast">
        <span className="brand">BLUEPRINT / 蓝图</span>
        <span className="id">— sheet 02 · runtime numbers</span>
        <span className="ver">v 2.4 · figure 03</span>
      </div>

      <div className="bl-figure">
        <div className="bl-figure-diagram">
          <span className="ref">— fig. 03</span>
          <h3>core / scheduler latency budget</h3>
          <div className="bl-figure-rows">
            <div className="row"><span className="id">01</span><span className="what">tokenize input</span><span className="v">12 ms</span><span className="v">— P50</span></div>
            <div className="row"><span className="id">02</span><span className="what">route to worker</span><span className="v">4 ms</span><span className="v">— P50</span></div>
            <div className="row"><span className="id">03</span><span className="what">core inference</span><span className="v em">48 ms</span><span className="v">— P50</span></div>
            <div className="row"><span className="id">04</span><span className="what">stream first chunk</span><span className="v">12 ms</span><span className="v">— P50</span></div>
            <div className="row"><span className="id">05</span><span className="what">— total · first byte</span><span className="v em">80 ms</span><span className="v em">target ≤ 100</span></div>
          </div>
        </div>

        <div className="bl-figure-body">
          <span className="label">— sheet 02 · numbers, briefly</span>
          <h2>
            <MaskReveal show duration={1000}>
              <span>每一段延迟，&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={1000}>
              <span className="em">都被量过.</span>
            </MaskReveal>
          </h2>
          <p>
            没有一段延迟是"差不多够"——每一段都有自己的 budget 表，
            每一次回归测试都会比较各 P50 的 5 ms 窗口.
          </p>
          <span className="stamp">— budget locked · 2026.04</span>
        </div>
      </div>

      <div className="bl-foot">
        <span>BLUEPRINT · runtime v2.4 · figure 03</span>
        <span>sheet 02 / 12 · review</span>
      </div>
    </div>
  );
}
