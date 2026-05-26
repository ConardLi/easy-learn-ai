import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function WarmKeynoteDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="wk-scene">
        <div className="wk-grid" />
        <div className="wk-mast">
          <span className="brand"><span className="dot" />Warm / Workspace</span>
          <span className="nav">
            <span className="on">Product</span>
            <span>Pricing</span>
            <span>Customers</span>
            <span>Blog</span>
          </span>
        </div>

        <div className="wk-cover">
          <div className="body">
            <span className="label">— Spring 2026 · Keynote</span>
            <h1>
              <MaskReveal show duration={900}>
                <span>把一整个工程&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={320} duration={900}>
                <span className="em">浓缩成</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={560} duration={900}>
                <span className="em">一条命令</span>
              </MaskReveal>
              <MaskReveal show delay={860} duration={900}>
                <span>.</span>
              </MaskReveal>
            </h1>
            <p>
              本次发布我们重写了 4 个模块，砍掉了 11 个隐藏开关。
              所有"为了灵活而留的口子"——都被换成了一个更好的默认.
            </p>
          </div>

          <div className="wk-mockup">
            <div className="titlebar"><span /><span /><span /></div>
            <div className="body-area">
              <div className="row"><span className="dot" /><span className="name">workspace · init</span><span className="v">— 2.1s</span></div>
              <div className="row is-active"><span className="dot" /><span className="name">— building from one command</span><span className="v">running</span></div>
              <div className="row"><span className="dot" style={{ background: "var(--text-mute)" }} /><span className="name">deploy · staging</span><span className="v">queued</span></div>
              <div className="row" style={{ borderBottom: 0 }}><span className="dot" style={{ background: "var(--text-faint)" }} /><span className="name">notify · 12 channels</span><span className="v">queued</span></div>
            </div>
          </div>
        </div>

        <div className="wk-bottom">
          <span>warm / workspace · spring keynote</span>
          <span>slide 01 / 28</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wk-scene">
      <div className="wk-grid" />
      <div className="wk-mast">
        <span className="brand"><span className="dot" />Warm / Workspace</span>
        <span className="nav">
          <span>Product</span>
          <span className="on">Numbers</span>
          <span>Customers</span>
          <span>Blog</span>
        </span>
      </div>

      <div className="wk-kpi">
        <div className="wk-kpi-num">
          $&thinsp;2.4<small>B</small>
        </div>
        <div className="wk-kpi-body">
          <span className="label">— platform spend · 2025 · enterprise</span>
          <h2>
            <MaskReveal show duration={900}>
              <span>客户&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={900}>
              <span style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-display-en)" }}>真的在我们上面</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={660} duration={900}>
              <span>跑生意了.</span>
            </MaskReveal>
          </h2>
          <p>
            2025 年，平台上的企业客户合计跑出了 24 亿美元的有效产出——
            这意味着我们已经不是"提效工具"，而是他们生意的一部分.
          </p>
          <div className="stamps">
            <span className="stamp is-on">+ 218% YoY</span>
            <span className="stamp">112,000 paid seats</span>
            <span className="stamp">141% NRR</span>
          </div>
        </div>
      </div>

      <div className="wk-bottom">
        <span>warm / workspace · spring keynote</span>
        <span>slide 09 / 28</span>
      </div>
    </div>
  );
}
