import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function MonochromePrintDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="mc-scene">
        <div className="mc-mast">
          <span className="brand">Monochrome</span>
          <span className="sec">— Long Reads</span>
          <span className="meta">Issue 24 · Spring 2026 · ¥ 60</span>
        </div>

        <div className="mc-cover">
          <div className="num">24</div>
          <div className="body">
            <div className="label">— No. 24 / The Quiet Issue</div>
            <h2>
              <MaskReveal show duration={1100}>
                <span>慢一点，&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={400} duration={1100}>
                <span style={{ fontFamily: "var(--font-display-en)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
                  也是&nbsp;
                </span>
              </MaskReveal>
              <MaskReveal show delay={800} duration={1100}>
                <span>一种立场.</span>
              </MaskReveal>
            </h2>
            <p>
              在所有人都在加快的时候，我们做了 24 期。每一期 60 页，
              每一段都校三遍，每一个图说都重写过.
            </p>
            <div className="mc-cover-cta" style={{ display: "flex", gap: "16px", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-mute)" }}>
              <span className="dot-accent" />
              <span>click to read · spread 02</span>
            </div>
          </div>
        </div>

        <div className="mc-bottom">
          <span>Monochrome · printed slowly</span>
          <span>spread 01 · page 02 / 03</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-scene">
      <div className="mc-mast">
        <span className="brand">Monochrome</span>
        <span className="sec">— Editor's Note</span>
        <span className="meta">Spread 03 · Pull Quote</span>
      </div>

      <div className="mc-quote-page">
        <div className="label">— from page 18</div>
        <blockquote>
          <MaskReveal show duration={1100}>
            <span>“一本被人慢慢读完的杂志，&nbsp;</span>
          </MaskReveal>
          <MaskReveal show delay={500} duration={1100}>
            <span className="em">本身就是&nbsp;</span>
          </MaskReveal>
          <MaskReveal show delay={900} duration={1100}>
            <span>一种回应.”</span>
          </MaskReveal>
        </blockquote>
        <div className="byline">— 主编手记 · Issue 24</div>

        <div className="meta-row">
          <span>Monochrome · long reads · since 2018</span>
          <span>page 18 / 60</span>
        </div>
      </div>
    </div>
  );
}
