import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function IndigoPorcelainDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="ip-scene">
        <div className="ip-mast">
          <span className="brand">Indigo Quarterly</span>
          <span className="vol">Vol. XII · No. 4 · 2026 · Spring</span>
        </div>

        <div className="ip-cover">
          <div className="body">
            <span className="label">— A Critical Essay</span>
            <h1>
              <MaskReveal show duration={1100}>
                <span>论&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={400} duration={1100}>
                <span className="underline">注意力</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={800} duration={1100}>
                <span>作为&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={1100} duration={1100}>
                <span className="em">一种伦理</span>
              </MaskReveal>
              <MaskReveal show delay={1400} duration={1100}>
                <span>.</span>
              </MaskReveal>
            </h1>
            <p>
              在这个所有人都在分发注意力的时代，
              花时间认真"看"一件东西、读完一段话，
              已经构成一种道德选择——而不是一种习惯.
            </p>
            <div className="footnote">
              选自《靛蓝评论》第十二卷第四期，2026 年春。下接 P14 — P32.
            </div>
          </div>

          <div className="ip-mark">
            <div className="seal">
              <div className="seal-en">XII</div>
              <div className="seal-cn">注意力</div>
              <div className="seal-y">spring · 2026</div>
            </div>
          </div>
        </div>

        <div className="ip-bottom">
          <span>Indigo Quarterly · ISSN 2710-0144</span>
          <span>page 01 / 60</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ip-scene">
      <div className="ip-mast">
        <span className="brand">Indigo Quarterly</span>
        <span className="vol">— continued · attention as ethics</span>
      </div>

      <div className="ip-essay">
        <div className="ip-essay-no">II</div>
        <div className="ip-essay-body">
          <div className="kicker">— 第二节 / on slow reading</div>
          <h2>
            <MaskReveal show duration={1000}>
              <span>所谓&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={350} duration={1000}>
              <span style={{ color: "var(--accent)", fontFamily: "var(--font-display-en)", fontStyle: "italic" }}>慢读</span>
            </MaskReveal>
            <MaskReveal show delay={700} duration={1000}>
              <span>，是一种道义.</span>
            </MaskReveal>
          </h2>
          <p>
            把同一段话看三遍，不是为了记住更多，而是为了把它放进
            自己的语境——这件事看似低效，实际上是把一段文本
            真正"读完"的唯一方式.
          </p>
          <p>
            当一切都可以被概括成 280 个字，慢读就成了一种对抗：
            它把"理解"从一种产能，重新拉回到一种关系.
          </p>
          <blockquote>
            "认真读 100 个字，比扫过 10,000 个字更接近作者."
          </blockquote>
        </div>
      </div>

      <div className="ip-bottom">
        <span>Indigo Quarterly · 2026 spring</span>
        <span>page 16 / 60</span>
      </div>
    </div>
  );
}
