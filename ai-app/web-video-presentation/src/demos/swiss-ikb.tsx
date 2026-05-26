import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function SwissIkbDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="si-scene">
        <div className="si-top">
          <span className="brand">— Swiss / IKB</span>
          <span className="sub">a study in restraint</span>
          <span className="meta">Lecture 04 · 2026 · ETH</span>
        </div>

        <div className="si-cover">
          <div>
            <div className="label">— Lecture · International Style 04</div>
            <h1>
              <MaskReveal show duration={900}>
                <span>Less,&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={320} duration={900}>
                <span className="em">but more&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={680} duration={900}>
                <span>specifically.</span>
              </MaskReveal>
            </h1>
          </div>
          <div className="deck">
            <div>
              <div className="num">04</div>
              <div className="num-cap">— a lecture · 60 min · in 4 acts</div>
            </div>
            <p>
              本课的目标不是让你能"做出"瑞士风格 ——
              而是让你能在做任何风格的时候，问自己"还能再去掉什么".
            </p>
            <p style={{ color: "var(--text-mute)", fontSize: 14 }}>
              click stage to enter act 01 · 12 min
            </p>
          </div>
        </div>

        <div className="si-bottom">
          <span>ETH · D-ARCH · spring semester · 2026</span>
          <span>lecture 04 / 14</span>
        </div>
      </div>
    );
  }

  return (
    <div className="si-scene">
      <div className="si-top">
        <span className="brand">— Swiss / IKB</span>
        <span className="sub">act 01 · four rules</span>
        <span className="meta">lecture 04 · sheet 02</span>
      </div>

      <div className="si-grid4">
        <div className="si-cell">
          <span className="ord">— 01 / grid</span>
          <div className="num">64</div>
          <div>
            <h3>One grid</h3>
            <span className="tail">single 64px module — applied to everything.</span>
          </div>
        </div>
        <div className="si-cell">
          <span className="ord">— 02 / type</span>
          <div className="num">200</div>
          <div>
            <h3>Extra-light</h3>
            <span className="tail">Inter 200 — the bigger it gets, the thinner.</span>
          </div>
        </div>
        <div className="si-cell is-accent">
          <span className="ord">— 03 / accent</span>
          <div className="num">IKB</div>
          <div>
            <h3>One color</h3>
            <span className="tail">international klein blue — used as a fact, not decoration.</span>
          </div>
        </div>
        <div className="si-cell">
          <span className="ord">— 04 / rule</span>
          <div className="num">1<span style={{ fontSize: 60 }}>px</span></div>
          <div>
            <h3>Hairline</h3>
            <span className="tail">solid 1px on #e0e0e0 — the only weight.</span>
          </div>
        </div>
        <div className="si-cell">
          <span className="ord">— 05 / radius</span>
          <div className="num">0</div>
          <div>
            <h3>No radius</h3>
            <span className="tail">direct rectangles, no apologies.</span>
          </div>
        </div>
        <div className="si-cell">
          <span className="ord">— 06 / motion</span>
          <div className="num">400</div>
          <div>
            <h3>400 ms linear</h3>
            <span className="tail">no overshoot — Swiss isn't springy.</span>
          </div>
        </div>
        <div className="si-cell">
          <span className="ord">— 07 / language</span>
          <div className="num">2</div>
          <div>
            <h3>2 languages</h3>
            <span className="tail">English &amp; numbers. Everything else is decoration.</span>
          </div>
        </div>
        <div className="si-cell">
          <span className="ord">— 08 / margin</span>
          <div className="num">96</div>
          <div>
            <h3>96 px frame</h3>
            <span className="tail">the page breathes before it speaks.</span>
          </div>
        </div>
      </div>

      <div className="si-bottom">
        <span>D-ARCH · lecture 04 · act 01</span>
        <span>sheet 02 / 60</span>
      </div>
    </div>
  );
}
