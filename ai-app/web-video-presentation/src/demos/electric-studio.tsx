import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function ElectricStudioDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="es-scene">
        <div className="es-top">
          <span className="es-brand"><span className="mark" /> Electric / Studio</span>
          <span className="es-nav">
            <span>Product</span>
            <span>Solutions</span>
            <span>Pricing</span>
            <span className="is-active">Investors</span>
          </span>
        </div>

        <div className="es-cover">
          <div>
            <div className="kicker">— Series B · 2026 Q2 update</div>
            <h1>
              <MaskReveal show duration={900}>
                <span>从一个&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={320} duration={900}>
                <span className="em">小团队工具，</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={680} duration={900}>
                <span>到企业基建.</span>
              </MaskReveal>
            </h1>
            <p>
              18 个月，从 200 家客户到 4,800 家；ARR 从 1.2M
              到 38M——下面是支撑这个增长的三件事.
            </p>
            <div className="tag-row">
              <span className="tag is-accent">enterprise</span>
              <span className="tag">platform</span>
              <span className="tag">B2B SaaS</span>
              <span className="tag">click to next slide</span>
            </div>
          </div>

          <div className="es-cover-aside">
            <div className="es-card is-accent">
              <span className="lab">ARR · YoY</span>
              <span className="v">38M</span>
              <span className="delta">▲ 218 %</span>
            </div>
            <div className="es-card">
              <span className="lab">paid seats</span>
              <span className="v">112k</span>
              <span className="delta">▲ 11k / month</span>
            </div>
            <div className="es-card">
              <span className="lab">net retention</span>
              <span className="v">141 %</span>
              <span className="delta">stable since Q4</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="es-scene">
      <div className="es-top">
        <span className="es-brand"><span className="mark" /> Electric / Studio</span>
        <span className="es-nav">
          <span>Product</span>
          <span className="is-active">Solutions</span>
          <span>Pricing</span>
          <span>Investors</span>
        </span>
      </div>

      <div className="es-kpi">
        <div className="es-kpi-num">
          141<small>%</small>
        </div>
        <div className="es-kpi-body">
          <div className="kicker">— Net Dollar Retention · Q1 2026</div>
          <h2>
            <MaskReveal show duration={900}>
              <span>每留住&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={320} duration={900}>
              <span className="em">100 块钱</span>
            </MaskReveal>
            <MaskReveal show delay={680} duration={900}>
              <span>，会再多花 41 块.</span>
            </MaskReveal>
          </h2>
          <p>
            企业客户在第二年扩座的速度比首年快 2.4 倍——
            产品已经从"工具"变成"基建"，这是真正的护城河.
          </p>
          <div className="bars">
            <div className="bar"><span className="name">— Y1 expand</span><span className="track"><span className="fill" style={{ ['--w' as unknown as string]: '38%' }} /></span><span className="v">+38%</span></div>
            <div className="bar"><span className="name">— Y2 expand</span><span className="track"><span className="fill" style={{ ['--w' as unknown as string]: '92%' }} /></span><span className="v">+92%</span></div>
            <div className="bar"><span className="name">— Y3 expand</span><span className="track"><span className="fill" style={{ ['--w' as unknown as string]: '141%' }} /></span><span className="v">+141%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
