import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function BauhausBoldDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="bb-scene">
        <div className="bb-top">
          <div className="bb-mark">
            <span className="square" />
            <span className="circle" />
            <span className="tri" />
            <span style={{ marginLeft: 8 }}>FORM · FUNCTION · FUTURE</span>
          </div>
          <div className="bb-mast">
            <span>vol. 03</span>
            <span>·</span>
            <span>2026</span>
          </div>
        </div>

        <div className="bb-manifest">
          <h1>
            <span className="row">
              <MaskReveal show duration={500}>DESIGN</MaskReveal>
            </span>
            <span className="row">
              <MaskReveal show delay={260} duration={500}>IS&nbsp;NOT</MaskReveal>
            </span>
            <span className="row">
              <MaskReveal show delay={520} duration={500}>
                <span className="em">DECORATION.</span>
              </MaskReveal>
            </span>
          </h1>
          <div className="deck">
            <p className="deck-p">
              它是把一团乱告诉你"是什么"、是把"该这样"告诉你"为什么"。
              所有花的，都是结构没立住的借口.
            </p>
            <span className="deck-tag">manifesto · 1 / 8</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bb-scene">
      <div className="bb-top">
        <div className="bb-mark">
          <span className="square" />
          <span className="circle" />
          <span className="tri" />
          <span style={{ marginLeft: 8 }}>FORM · FUNCTION · FUTURE</span>
        </div>
        <div className="bb-mast">
          <span>section 02</span>
          <span>·</span>
          <span>numbers</span>
        </div>
      </div>

      <div className="bb-stat">
        <div className="bb-stat-card">
          <div className="lab">SHIPPED</div>
          <div className="v">
            01<small>/ 26</small>
          </div>
          <div className="note">
            第一版发布，距离立项整整 26 周——没有一行借口的代码.
          </div>
        </div>
        <div className="bb-stat-list">
          <div className="item">
            <span className="ord">01</span>
            <span className="what">REMOVE ROUNDING</span>
            <span className="v">−9</span>
          </div>
          <div className="item">
            <span className="ord">02</span>
            <span className="what">KILL DROP-SHADOW</span>
            <span className="v">−4</span>
          </div>
          <div className="item">
            <span className="ord">03</span>
            <span className="what">THICKEN BORDERS</span>
            <span className="v">+4px</span>
          </div>
          <div className="item">
            <span className="ord">04</span>
            <span className="what">ONE FONT FAMILY</span>
            <span className="v">1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
