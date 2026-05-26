import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function KraftPaperDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="kp-scene">
        <div className="kp-mast">
          <span className="brand">Kraft Letters</span>
          <span className="kp-stamp">handmade · No. 26</span>
          <span className="meta">— 寄出于 北京 · 2026 春</span>
        </div>

        <div className="kp-cover">
          <div className="num">
            26
            <small>— letter number twenty-six</small>
          </div>
          <div className="body">
            <h1>
              <MaskReveal show duration={1000}>
                <span>给三年后&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={400} duration={1000}>
                <span className="em">还在</span>
              </MaskReveal>
              <MaskReveal show delay={760} duration={1000}>
                <span>做这件事的人.</span>
              </MaskReveal>
            </h1>
            <p>
              如果你在 2029 年读到这封信，意味着我们大概率没死、产品也还在。
              我想留下三件，希望那时的你别忘的事——和一件，希望你能改的事.
            </p>
            <span className="by">— Founder's Notes, vol. III</span>
          </div>
        </div>

        <div className="kp-bottom">
          <span>Kraft Letters · since 2022</span>
          <span>printed on 80 g/m² kraft · single ink</span>
        </div>
      </div>
    );
  }

  return (
    <div className="kp-scene">
      <div className="kp-mast">
        <span className="brand">Kraft Letters</span>
        <span className="kp-stamp">page 2 of 4</span>
        <span className="meta">— letter no. 26</span>
      </div>

      <div className="kp-letter">
        <div className="greet">致 2029 年的我们：</div>
        <div className="body">
          <p>
            如果你还在做这件事，<MaskReveal show duration={900}><span className="em">先别急着夸自己</span></MaskReveal>——
            走到第七年的项目，最难的从来不是"做出来"，
            而是"还在用同一种语气说话".
          </p>
          <p>
            三件别忘：一，给客户写邮件不要超过三段；
            二，每个季度至少有一次产品决定，是"砍掉"而不是"加上"；
            三，每年挑一个我们当年最讨厌的功能，自己重新做一遍.
          </p>
        </div>
        <div className="sign">
          <span className="hand">— 一然 &amp; 团队</span>
          <span className="who">写于 北京 · 2026.05.26</span>
        </div>
      </div>
    </div>
  );
}
