import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function NeonCyberDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="nc-scene">
        <div className="nc-mast">
          <span className="brand">NEO/OS</span>
          <span className="id">build · 26.05.0413 / kernel-v9</span>
          <span className="ver"><span className="live">LIVE</span></span>
        </div>

        <div className="nc-cover">
          <div>
            <div className="label">— firmware 9.0 · public reveal</div>
            <h1>
              <MaskReveal show duration={900}>
                <span>欢迎来到</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={460} duration={900}>
                <span className="em">不再等待</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={780} duration={900}>
                <span>的系统.</span>
              </MaskReveal>
            </h1>
            <p className="deck">
              九代内核 / 4 核协同 / 0 ms 主线程冷启动——
              它在你按下按钮的那一刻就已经准备好了.
            </p>
          </div>

          <div className="panel">
            <div className="panel-h">
              <span>SYSTEM ▸ status</span>
              <span className="x">▢ ✕</span>
            </div>
            <div className="panel-row"><span>— kernel</span><span className="v">v 9.0.4</span></div>
            <div className="panel-row"><span>— cores online</span><span className="v">4 / 4</span></div>
            <div className="panel-row"><span>— input latency</span><span className="v">2 ms</span></div>
            <div className="panel-row"><span>— ai co-processor</span><span className="v">SYNCED</span></div>
            <div className="panel-row is-warn"><span>— rebellion log</span><span className="v">3 NEW</span></div>
            <div className="panel-row"><span>— neural mesh</span><span className="v">ACTIVE</span></div>
            <div className="panel-row"><span>— uptime</span><span className="v">∞</span></div>
          </div>
        </div>

        <div className="nc-foot">
          <span>NEO/OS · firmware reveal · 26.05.2026</span>
          <span>node 04 · session live · viewers 12,847</span>
        </div>
      </div>
    );
  }

  return (
    <div className="nc-scene">
      <div className="nc-mast">
        <span className="brand">NEO/OS</span>
        <span className="id">metrics · steady-state · 60 s window</span>
        <span className="ver"><span className="live">LIVE</span></span>
      </div>

      <div className="nc-metrics">
        <div className="nc-metric">
          <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
          <div className="label">— main thread · cold start</div>
          <div className="v">0<small>&nbsp;ms</small></div>
          <h3>真的就是零.</h3>
          <p>
            预热在 boot 阶段全部跑完——用户按下按钮的瞬间，
            主线程已经在等他.
          </p>
        </div>

        <div className="nc-metric is-glow">
          <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
          <div className="label">— input latency · p99</div>
          <div className="v">2<small>&nbsp;ms</small></div>
          <h3>P99 也只有 2 ms.</h3>
          <p>
            键盘 / 触屏 / 手柄——所有 input 都经过同一个调度器，
            最慢的 1% 也只比最快的多 1 ms.
          </p>
        </div>
      </div>

      <div className="nc-foot">
        <span>NEO/OS · runtime metrics · steady-state</span>
        <span>last update 60 s ago · refresh on input</span>
      </div>
    </div>
  );
}
