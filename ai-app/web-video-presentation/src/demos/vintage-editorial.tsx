import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function VintageEditorialDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="ve-scene">
        <div className="ve-deco circle" />
        <div className="ve-deco circle-inner" />
        <div className="ve-deco line" />
        <div className="ve-deco dots">
          {Array.from({ length: 18 }, (_, i) => <span key={i} />)}
        </div>

        <div className="ve-mast">
          <span className="brand">Vintage Editorial</span>
          <span className="sub">— Issue 11 · Culture &amp; Crafts</span>
        </div>
        <div className="ve-rule" />

        <div className="ve-cover">
          <div className="ve-kicker">— column · the lost trades</div>
          <h1 className="ve-h">
            <MaskReveal show duration={1000}>
              <span>那些&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={380} duration={1000}>
              <span className="underlined">没人</span>
            </MaskReveal>
            <MaskReveal show delay={720} duration={1000}>
              <span>&nbsp;再做的&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={1080} duration={1000}>
              <span className="accent">手艺.</span>
            </MaskReveal>
          </h1>
          <div className="ve-foot">
            <span className="dot-accent" />
            <span>click to enter chapter 02</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ve-scene">
      <div className="ve-deco circle" style={{ top: "auto", bottom: "-150px", right: "-100px" }} />
      <div className="ve-deco line" style={{ top: "auto", bottom: 220, right: 60, transform: "rotate(15deg)" }} />

      <div className="ve-mast">
        <span className="brand">Vintage Editorial</span>
        <span className="sub">— 4 entries · click to advance</span>
      </div>
      <div className="ve-rule" />

      <div className="ve-cards">
        <div className="ve-card">
          <span className="ord">01</span>
          <div>
            <h3>活字排版</h3>
            <span className="tail">— 28 个匠人，平均年龄 64</span>
          </div>
        </div>
        <div className="ve-card is-accent">
          <span className="ord">02 · 本期推荐</span>
          <div>
            <h3>蓝晒法</h3>
            <span className="tail">— 19 世纪化学，21 世纪复兴</span>
          </div>
        </div>
        <div className="ve-card">
          <span className="ord">03</span>
          <div>
            <h3>装帧 · 锁线</h3>
            <span className="tail">— 一本书的脊背</span>
          </div>
        </div>
        <div className="ve-card">
          <span className="ord">04</span>
          <div>
            <h3>修版 · 罔上色</h3>
            <span className="tail">— 老照片的第二次生</span>
          </div>
        </div>
      </div>
    </div>
  );
}
