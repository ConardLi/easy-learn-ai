import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function SplitCanvasDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="sc-scene">
        <div className="sc-side left">
          <div className="sc-tag">
            <span className="pill">SIDE A</span>
            <span>— 设计师视角</span>
          </div>
          <div className="sc-body">
            <h1>
              <MaskReveal show duration={900}>
                <span>先把</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={320} duration={900}>
                <span className="em">「为什么」</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={680} duration={900}>
                <span>讲清楚.</span>
              </MaskReveal>
            </h1>
            <p>
              没有动机的功能就只是 UI；先把"用户为什么会用这一步"
              拍清楚，剩下的设计自然就稳了.
            </p>
          </div>
          <div className="sc-foot">
            <span className="dot-accent" />
            <span>chapter 02 · perspective A</span>
          </div>
        </div>

        <div className="sc-side right">
          <div className="sc-tag">
            <span className="pill is-accent">SIDE B</span>
            <span>— 工程师视角</span>
          </div>
          <div className="sc-body">
            <h1>
              <MaskReveal show duration={900}>
                <span>先把</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={320} duration={900}>
                <span className="em">「能不能做」</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={680} duration={900}>
                <span>量清楚.</span>
              </MaskReveal>
            </h1>
            <p>
              一个写好需求的功能，要先估出 P95、容错、回滚成本——
              否则交付的不是产品，是承诺.
            </p>
          </div>
          <div className="sc-foot">
            <span style={{ color: "var(--accent)" }}>●</span>
            <span>chapter 02 · perspective B</span>
          </div>
        </div>

        <div className="sc-vs">vs</div>
      </div>
    );
  }

  return (
    <div className="sc-scene">
      <div className="sc-side left">
        <div className="sc-tag">
          <span className="pill">SIDE A</span>
          <span>— 设计师</span>
        </div>
        <div className="sc-body">
          <h1 style={{ fontSize: 88 }}>
            <MaskReveal show duration={800}>
              <span>4 件&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={800}>
              <span className="em">先想清楚</span>
            </MaskReveal>
            <MaskReveal show delay={620} duration={800}>
              <span>的事.</span>
            </MaskReveal>
          </h1>
          <div className="sc-compare">
            <div className="row"><span className="a">三步内可达</span><span className="key">flow</span><span className="b">≤ 95th P95</span></div>
            <div className="row"><span className="a">必填字段≤5</span><span className="key">friction</span><span className="b">字段加载&lt;200ms</span></div>
            <div className="row"><span className="a">回滚一次点击</span><span className="key">undo</span><span className="b">tombstone &amp; replay</span></div>
            <div className="row"><span className="a">空状态文案</span><span className="key">empty</span><span className="b">fallback &amp; retry</span></div>
          </div>
        </div>
        <div className="sc-foot"><span className="dot-accent" /><span>side A · synthesis</span></div>
      </div>

      <div className="sc-side right">
        <div className="sc-tag">
          <span className="pill is-accent">SIDE B</span>
          <span>— 工程师</span>
        </div>
        <div className="sc-body">
          <h1 style={{ fontSize: 88 }}>
            <MaskReveal show duration={800}>
              <span>同一张&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={800}>
              <span className="em">表格</span>
            </MaskReveal>
            <MaskReveal show delay={620} duration={800}>
              <span>，两种语言.</span>
            </MaskReveal>
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 14, lineHeight: 1.6, opacity: 0.8 }}>
            把它打印贴在白板上 —— 两边争论的不再是"谁对"，
            而是"哪一行还没量过".
          </p>
        </div>
        <div className="sc-foot"><span style={{ color: "var(--accent)" }}>●</span><span>side B · synthesis</span></div>
      </div>

      <div className="sc-vs" style={{ fontSize: 56 }}>=</div>
    </div>
  );
}
