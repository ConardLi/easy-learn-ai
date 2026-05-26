import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function SunsetZineDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="sz-scene">
        <div className="sz-top">
          <span className="brand">Sunset Zine · No. 7</span>
          <span className="stamp">risograph · 2c print</span>
        </div>

        <div className="sz-cover">
          <h1>
            <MaskReveal show duration={900}>
              <span>独立&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={320} duration={900}>
              <span className="em">编辑部</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={620} duration={900}>
              <span>在&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={920} duration={900}>
              <span className="ul">2026</span>
            </MaskReveal>
            <MaskReveal show delay={1200} duration={900}>
              <span>&nbsp;还有意义吗.</span>
            </MaskReveal>
          </h1>
          <div className="deck">
            <span className="kicker">— 创刊语</span>
            <p>七期之后，我们想做的还是那件事：把别人不愿意细写的东西，
              用我们愿意花一整周的方式写完.</p>
            <span className="tag">click&nbsp;to&nbsp;flip&nbsp;→</span>
          </div>
        </div>

        <div className="sz-bottom">
          <span className="pageno">01</span>
          <span className="scissor">— — — cut here · cut here · cut here — — —</span>
          <span className="scissor">printed · binding · stapled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="sz-scene">
      <div className="sz-top">
        <span className="brand">Sunset Zine · 内页</span>
        <span className="stamp">第 7 期 · 6 篇 · 60 页</span>
      </div>

      <div className="sz-grid">
        <div className="sz-tile is-tilt">
          <span className="ord">01</span>
          <h3>菜市场<br />田野调查</h3>
          <span className="tail">— 一个摊主一周的早晨</span>
        </div>
        <div className="sz-tile is-accent">
          <span className="ord">02 · 封面故事</span>
          <h3>当 AI 写完了所有的爆款</h3>
          <span className="tail">— 那留给我们什么</span>
        </div>
        <div className="sz-tile is-tilt2">
          <span className="ord">03</span>
          <h3>读者来信选登</h3>
          <span className="tail">— 27 封信里挑出的 5 封</span>
        </div>
        <div className="sz-tile is-tilt2">
          <span className="ord">04</span>
          <h3>专栏</h3>
          <span className="tail">— 关于"重新慢下来"</span>
          <span className="stamp">column</span>
        </div>
        <div className="sz-tile is-tilt">
          <span className="ord">05</span>
          <h3>书摘 · 200 页里挑 4 段</h3>
          <span className="tail">《被忽略的工艺》</span>
        </div>
        <div className="sz-tile">
          <span className="ord">06 · 后记</span>
          <h3>下一期：城市的<br />边缘</h3>
          <span className="tail">— 7 月上旬寄出</span>
        </div>
      </div>

      <div className="sz-bottom">
        <span className="pageno">02</span>
        <span className="scissor">— — — folded · stapled · sealed — — —</span>
        <span className="scissor">issue 07 · summer 2026</span>
      </div>
    </div>
  );
}
