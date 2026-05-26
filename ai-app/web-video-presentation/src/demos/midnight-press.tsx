import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function MidnightPressDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="mp-scene">
        <div className="mp-mast">
          <span className="brand">Midnight Press</span>
          <span className="issue">Issue 04 · 2026 · Dev Notes</span>
        </div>
        <div className="mp-rule" />

        <div className="mp-cover-kicker">— 编辑器内核 / deep dive 04</div>
        <h1 className="mp-cover-h">
          <MaskReveal show duration={1100}>
            <span>我们如何让&nbsp;</span>
          </MaskReveal>
          <MaskReveal show delay={420} duration={1100}>
            <span className="em">补全延迟</span>
          </MaskReveal>
          <MaskReveal show delay={820} duration={1100}>
            <span>掉到 80&thinsp;ms.</span>
          </MaskReveal>
        </h1>

        <div className="mp-cover-foot">
          <span className="dot-accent" />
          <span>chapter 01 · 30 min read · click to start</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mp-scene">
      <div className="mp-mast">
        <span className="brand">Midnight Press</span>
        <span className="issue">Chapter 01 · The Bottleneck</span>
      </div>
      <div className="mp-rule" />

      <div className="mp-stat-row">
        <div className="mp-stat-num">80</div>
        <div className="mp-stat-body">
          <div className="kicker-mono">P50 latency · after rewrite</div>
          <h2>
            <MaskReveal show duration={900}>
              <span>从&nbsp;620&thinsp;ms&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={900}>
              <span style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-display-en)", fontWeight: 400 }}>
                干到 80
              </span>
            </MaskReveal>
            <MaskReveal show delay={620} duration={900}>
              <span>&nbsp;靠的是这三件事.</span>
            </MaskReveal>
          </h2>
          <p>
            预测式缓存、提前 tokenize、流式渲染 —— 三个机制叠加之后，
            人眼根本看不出延迟。
          </p>
          <span className="mp-stat-tag">milliseconds · production</span>
        </div>
      </div>
    </div>
  );
}
