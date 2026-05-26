import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function PaperPressDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="pp-scene">
        <div className="pp-mast">
          <span className="brand">Paper Press</span>
          <span className="issue">No. 12 · Editor's Notes</span>
        </div>
        <div className="pp-rule" />

        <div className="pp-cover-body">
          <div className="pp-kicker">— a letter from the editor</div>
          <h1 className="pp-h">
            <MaskReveal show duration={1100}>
              <span>为什么我们决定&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={420} duration={1100}>
              <span className="em">重写&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={760} duration={1100}>
              <span>编辑器内核.</span>
            </MaskReveal>
          </h1>
          <div className="pp-foot">
            <span className="dot-accent" />
            <span>click to keep reading · 3 min</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pp-scene">
      <div className="pp-mast">
        <span className="brand">Paper Press</span>
        <span className="issue">No. 12 · Why · Page 02</span>
      </div>
      <div className="pp-rule" />

      <div className="pp-split">
        <div>
          <div className="pp-num">3</div>
          <div className="pp-num-cap">years on the old kernel</div>
        </div>
        <div className="pp-body">
          <h2>
            <MaskReveal show duration={1000}>
              <span>每一次补丁，&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={380} duration={1000}>
              <span className="em">都在挖&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={720} duration={1000}>
              <span>更深的坑.</span>
            </MaskReveal>
          </h2>
          <p>
            36 个月里我们改了 1,800 个 commit、踩烂了三套抽象。
            到最后，所有人都同意：要么砍掉重练，要么再也别动。
          </p>
          <div className="pp-body-pull">
            <q>那就砍掉重练 —— 至少能跟未来的自己交代得过去.</q>
          </div>
        </div>
      </div>
    </div>
  );
}
