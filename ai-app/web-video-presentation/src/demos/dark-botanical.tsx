import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function DarkBotanicalDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="db-scene">
        <div className="db-mast">
          <span className="brand">— Atelier Noctis</span>
          <span className="sub">a perfume in three notes</span>
          <span className="meta">campaign · spring · 2026</span>
        </div>

        <div className="db-cover">
          <span className="label">— Eau de Parfum · No. IX</span>
          <h1>
            <MaskReveal show duration={1200}>
              <span>before</span>
            </MaskReveal>
            <MaskReveal show delay={420} duration={1200}>
              <span> the&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={780} duration={1200}>
              <span className="em">night</span>
            </MaskReveal>
            <MaskReveal show delay={1140} duration={1200}>
              <span>,</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={1380} duration={1200}>
              <span>a&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={1620} duration={1200}>
              <span style={{ fontStyle: "italic" }}>quiet light.</span>
            </MaskReveal>
          </h1>
          <p className="sub">
            一款不为浪漫，只为"被记得"而生的香水——
            三个 note，从一个庭院开始，到一封旧信结束.
          </p>
          <div className="db-foot">
            <span style={{ color: "var(--accent)" }}>—</span>
            <span>chapter 01 · click to enter the garden</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="db-scene">
      <div className="db-mast">
        <span className="brand">— Atelier Noctis</span>
        <span className="sub">chapter 01 · top note</span>
        <span className="meta">eau de parfum · No. IX</span>
      </div>

      <div className="db-poem">
        <div className="db-poem-mark">
          <div className="frame" />
          <div className="frame inner" />
          <div className="figure">IX</div>
          <div className="cap">
            <span>plate · IX</span>
            <span>top note</span>
          </div>
        </div>

        <div className="db-poem-body">
          <span className="label">— first 8 minutes on skin</span>
          <h2>
            <MaskReveal show duration={1100}>
              <span>苦橙花、&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={1100}>
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>湿石头，</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={760} duration={1100}>
              <span>与一支&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={1120} duration={1100}>
              <span className="em">未点燃的雪茄.</span>
            </MaskReveal>
          </h2>
          <p>
            前调像是黄昏六点半的庭院——花已经开过，雨刚停过，
            檐口的烟还没被点上。一切都安静、都在等.
          </p>
          <div className="by">— Notes by Aurélie Leroy, parfumeur</div>
        </div>
      </div>
    </div>
  );
}
