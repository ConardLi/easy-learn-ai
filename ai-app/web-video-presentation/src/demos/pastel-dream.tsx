import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

const RIBBON_COLORS = [
  "#9bb59f", // sage
  "#e7c79d", // peach
  "#d8a8c2", // pink
  "#a8b5d8", // lavender
  "#e8d59a", // butter
];

export default function PastelDreamDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="pd-scene">
        <div className="pd-ribbon">
          {RIBBON_COLORS.map((c, i) => <span key={i} style={{ background: c }} />)}
        </div>

        <div className="pd-mast">
          <span className="brand">Pastel · onboarding</span>
          <span className="meta">step 0 / 3 · welcome</span>
        </div>

        <div className="pd-cover">
          <span className="kicker">— 第一次见面 / hi there</span>
          <h1>
            <MaskReveal show duration={900}>
              <span>欢迎，&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={320} duration={900}>
              <span className="em">慢慢来</span>
            </MaskReveal>
            <MaskReveal show delay={680} duration={900}>
              <span>就好.</span>
            </MaskReveal>
          </h1>
          <p>
            接下来三步，我们一起把账户配好——大概两分钟，每一步都有"跳过"，
            随时回来都行.
          </p>
          <div className="pd-cta">
            <span className="pd-cta-btn">开始设置 · let's go →</span>
            <span className="pd-cta-hint">click stage · 推进下一步</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-scene">
      <div className="pd-ribbon">
        {RIBBON_COLORS.map((c, i) => <span key={i} style={{ background: c, opacity: i === 1 ? 1 : 0.45 }} />)}
      </div>

      <div className="pd-mast">
        <span className="brand">Pastel · onboarding</span>
        <span className="meta">step 2 / 3 · profile</span>
      </div>

      <div className="pd-steps">
        <div className="pd-steps-h">
          <h2>
            <MaskReveal show duration={900}>
              <span>差&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={900}>
              <span className="em">两步</span>
            </MaskReveal>
            <MaskReveal show delay={620} duration={900}>
              <span>&nbsp;就好了.</span>
            </MaskReveal>
          </h2>
          <span className="lab">click to advance · skip anytime</span>
        </div>

        <div className="pd-step is-done">
          <div className="num">1</div>
          <div className="who">绑定邮箱 <small>已经收到验证码</small></div>
          <div className="v">done</div>
        </div>
        <div className="pd-step is-now">
          <div className="num">2</div>
          <div className="who">填一下自我介绍 <small>给协作的人一个能记住你的标签</small></div>
          <div className="v">now</div>
        </div>
        <div className="pd-step">
          <div className="num">3</div>
          <div className="who">挑一个工作区主题 <small>5 种配色，随时改</small></div>
          <div className="v">next</div>
        </div>
      </div>
    </div>
  );
}
