import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function BoldSignalDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="bs-scene">
        <div className="bs-mast">
          <span className="brand">SIGNAL / 03</span>
          <span className="id">— series A pitch · 2026 spring</span>
          <span className="ver">live now · investors only</span>
        </div>

        <div className="bs-cover">
          <div className="bs-focal">
            <span className="ord">— 01 / the moment</span>
            <h2>now or never.</h2>
            <div className="stat">218<small>%</small></div>
            <div className="tail">
              用户 YoY 增长 218%——但下半年增长曲线进入饱和区，
              要么现在加速，要么把空间让给别人.
            </div>
          </div>

          <div className="bs-side">
            <span className="label">— Signal 03 / opener</span>
            <h1>
              <MaskReveal show duration={900}>
                <span>这是&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={320} duration={900}>
                <span className="em">最后一年</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={680} duration={900}>
                <span>我们能&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={1020} duration={900}>
                <span>低调起飞.</span>
              </MaskReveal>
            </h1>
            <p>
              市场的窗口在 12-18 个月内会被填满——
              下一轮融资不是要不要做，是做多大、什么时候关.
            </p>
            <span className="pulse">— now hiring · 28 open roles</span>
          </div>
        </div>

        <div className="bs-foot">
          <span>SIGNAL · series A pitch · April 2026</span>
          <span>slide 01 / 14</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bs-scene">
      <div className="bs-mast">
        <span className="brand">SIGNAL / 03</span>
        <span className="id">— statement · the ask</span>
        <span className="ver">slide 09 / 14</span>
      </div>

      <div className="bs-stmt">
        <div className="bs-stmt-body">
          <span className="label">— the ask · 2026 series A</span>
          <h1>
            <MaskReveal show duration={900}>
              <span>4<span style={{ fontStyle: "italic", color: "var(--accent)" }}>2</span>m,</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={400} duration={900}>
              <span>18 个月，</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={780} duration={900}>
              <span>一次&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={1100} duration={900}>
              <span className="strike">关门</span>
            </MaskReveal>
            <MaskReveal show delay={1420} duration={900}>
              <span>.</span>
            </MaskReveal>
          </h1>
          <div className="bs-stmt-row">
            <div className="stat">
              <span className="v">42 M</span>
              <small>round size · USD</small>
            </div>
            <div className="stat">
              <span className="v">18</span>
              <small>months · runway after round</small>
            </div>
            <div className="stat">
              <span className="v">1</span>
              <small>lead investor · no co-lead</small>
            </div>
            <div className="stat">
              <span className="v">28</span>
              <small>roles · hire by Q4 2026</small>
            </div>
            <div className="stat">
              <span className="v">100×</span>
              <small>distribution scale by 2028</small>
            </div>
          </div>
        </div>
      </div>

      <div className="bs-foot">
        <span>SIGNAL · the ask · clean term sheet</span>
        <span>slide 09 / 14 · 30s on this</span>
      </div>
    </div>
  );
}
