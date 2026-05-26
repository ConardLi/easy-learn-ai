import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function NewsroomDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="nr-scene">
        <div className="nr-mast">
          <h1>The Newsroom</h1>
          <span className="date">Tuesday, May&nbsp;26,&nbsp;2026</span>
          <span className="vol">Vol. CLXXIV · No. 60,231</span>
        </div>
        <div className="nr-meta">
          <span className="section">技术 · Technology</span>
          <span className="byline">by 林一然 & James Park</span>
          <span className="tag">8&nbsp;min&nbsp;read</span>
        </div>

        <div className="nr-headline">
          <h2>
            <MaskReveal show duration={1100}>
              <span>AI 模型如何在&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={420} duration={1100}>
              <span className="em">六个月内</span>
            </MaskReveal>
            <MaskReveal show delay={800} duration={1100}>
              <span>学会写诗.</span>
            </MaskReveal>
          </h2>
          <p className="deck">
            一份对 200 万行训练日志的复盘 —— 关于偏好、关于品味，
            以及那些藏在 loss 曲线之外的转折时刻.
          </p>
        </div>

        <div className="nr-foot">
          <span>continued on next page</span>
          <span className="pageno">A1</span>
        </div>
      </div>
    );
  }

  return (
    <div className="nr-scene">
      <div className="nr-mast">
        <h1>The Newsroom</h1>
        <span className="date">Tuesday, May&nbsp;26,&nbsp;2026</span>
        <span className="vol">Continued from page A1</span>
      </div>
      <div className="nr-meta">
        <span className="section">技术 · 数据</span>
        <span className="byline">Reported in Beijing & Palo Alto</span>
        <span className="tag">figure&nbsp;01</span>
      </div>

      <div className="nr-feature">
        <div>
          <div className="nr-feature-num">
            2.4
            <small>billion lines</small>
          </div>
        </div>
        <div className="nr-feature-body">
          <div className="label">— Reading List</div>
          <h3>
            <MaskReveal show duration={1000}>
              <span>它读过的，&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={1000}>
              <span className="em">比你想得更多.</span>
            </MaskReveal>
          </h3>
          <p>
            在长达半年的训练里，模型读完了二十四亿行公开文本：
            从十四世纪的宋词，到上个月的 GitHub commit 注释；从
            学术会议论文，到孩子第一次写下的童话.
            它没有偏好——它只是越来越在乎.
          </p>
          <div className="nr-feature-pull">
            “看见越多，越知道什么值得被留下.”
          </div>
        </div>
      </div>

      <div className="nr-foot">
        <span>The Newsroom · technology</span>
        <span className="pageno">A2</span>
      </div>
    </div>
  );
}
