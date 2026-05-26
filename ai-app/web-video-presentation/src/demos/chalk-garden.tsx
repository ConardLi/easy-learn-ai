import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function ChalkGardenDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="cg-scene">
        <div className="cg-mast">
          <span className="brand">— Chalk Garden</span>
          <span className="sub">Mrs. Yan's classroom</span>
          <span className="meta">lesson 12 · spring · third grade</span>
        </div>

        <div className="cg-cover">
          <div className="doodle">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 12 78 Q 20 30 50 30 Q 80 30 88 78" />
              <circle cx="36" cy="58" r="3.5" fill="currentColor" />
              <circle cx="64" cy="58" r="3.5" fill="currentColor" />
              <path d="M 36 70 Q 50 80 64 70" />
            </svg>
            <span className="label">— today's question</span>
          </div>
          <h1>
            <MaskReveal show duration={900}>
              <span>为什么</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={320} duration={900}>
              <span>会有&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={680} duration={900}>
              <span className="em">四季</span>
            </MaskReveal>
            <MaskReveal show delay={1020} duration={900}>
              <span>？</span>
            </MaskReveal>
          </h1>
          <p>
            上节课讲了地球绕着太阳转。今天我们来看，它"歪着头"转，
            会发生什么有趣的事——准备一支铅笔和一张纸.
          </p>
          <div className="cg-foot">
            <span style={{ fontSize: 36, color: "var(--accent)" }}>✦</span>
            <span>click to start the diagram →</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cg-scene">
      <div className="cg-mast">
        <span className="brand">— Chalk Garden</span>
        <span className="sub">step 2 / 6 · the tilt</span>
        <span className="meta">lesson 12 · key idea</span>
      </div>

      <div className="cg-lesson">
        <div className="cg-lesson-equation">
          <span className="term">地球公转</span>
          <span className="arrow">+</span>
          <span className="term em">23.5° 倾角</span>
          <span className="arrow">＝</span>
          <br />
          <span className="ans">四 季</span>
          <div className="ans-label">— 这就是答案的全部</div>
        </div>

        <div className="cg-lesson-card">
          <span className="tab">key idea</span>
          <h3>
            <MaskReveal show duration={900}>
              <span>地球并不"直立"，</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={400} duration={900}>
              <span>它一边转，一边&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={780} duration={900}>
              <span style={{ color: "var(--accent)" }}>歪着脑袋</span>
            </MaskReveal>
            <MaskReveal show delay={1100} duration={900}>
              <span>.</span>
            </MaskReveal>
          </h3>
          <p>
            就因为这个 23.5 度的小倾角，地球某半边在公转的不同位置上
            被太阳照得多一点、少一点——半年热半年冷，四季就来了.
          </p>
          <svg className="arrow-doodle" viewBox="0 0 100 30" width="100" height="30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 5 15 Q 50 5 95 15" />
            <path d="M 86 8 L 95 15 L 86 22" />
          </svg>
        </div>
      </div>
    </div>
  );
}
