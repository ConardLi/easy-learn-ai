import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function CreativeVoltageDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="cv-scene">
        <div className="cv-mast">
          <span className="brand">VOLTAGE / studio</span>
          <span className="id">— design week · 2026 · halls 03</span>
          <span className="ver">opening · 19:00</span>
        </div>

        <div className="cv-cover">
          <div className="body">
            <span className="kicker">— Design Week 2026 · Hall 03</span>
            <h1>
              <MaskReveal show duration={900}>
                <span>Why&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={320} duration={900}>
                <span className="em">type</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={620} duration={900}>
                <span>still&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={920} duration={900}>
                <span className="ul">shouts</span>
              </MaskReveal>
              <MaskReveal show delay={1240} duration={900}>
                <span>.</span>
              </MaskReveal>
            </h1>
            <p className="deck">
              一个关于字体、海报、和"为什么大字总是赢"的展览——
              17 位设计师、8 个国家、3 个小时的步行长度.
            </p>
          </div>

          <div className="cv-poster">
            <div className="tag">— exhibit 04 · halls 03</div>
            <div className="big">
              <h3>SHOUT<br />BACK</h3>
            </div>
            <div className="bottom">
              <span>tickets · ¥ 88 / free for students</span>
              <span className="date">05.26 — 06.10</span>
            </div>
          </div>
        </div>

        <div className="cv-foot">
          <span>VOLTAGE · design week 2026 · opener</span>
          <span>slide 01 / 18 · halls 03</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-scene">
      <div className="cv-mast">
        <span className="brand">VOLTAGE / studio</span>
        <span className="id">— program · 4 talks tonight</span>
        <span className="ver">19:00 — 22:30</span>
      </div>

      <div className="cv-callout">
        <div className="cv-tile is-tilt">
          <span className="ord">— headliner / talk 03</span>
          <h2>
            <MaskReveal show duration={800}>
              <span>"all type</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={320} duration={800}>
              <span>is&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={620} duration={800}>
              <span>voice."</span>
            </MaskReveal>
          </h2>
          <div className="stat">21:00<small></small></div>
          <div className="tail">
            — Aoi Tanaka · type designer · Tokyo<br />
            45 分钟 · 现场示范 · 中英双语字幕
          </div>
        </div>

        <div className="cv-list">
          <div className="item">
            <span className="ord">01</span>
            <div className="what">
              The new poster
              <small>— Lina Sotomayor / São Paulo · 20 min</small>
            </div>
            <span className="v">19:00</span>
          </div>
          <div className="item">
            <span className="ord">02</span>
            <div className="what">
              Letters as architecture
              <small>— Marc Holst / Berlin · 30 min</small>
            </div>
            <span className="v">19:40</span>
          </div>
          <div className="item is-on">
            <span className="ord">03</span>
            <div className="what">
              All type is voice
              <small>— Aoi Tanaka / Tokyo · 45 min · 现场示范</small>
            </div>
            <span className="v">21:00</span>
          </div>
          <div className="item">
            <span className="ord">04</span>
            <div className="what">
              Panel · type in 2030
              <small>— 4 speakers · 35 min · live Q&amp;A</small>
            </div>
            <span className="v">22:00</span>
          </div>
        </div>
      </div>

      <div className="cv-foot">
        <span>VOLTAGE · program · night 01</span>
        <span>4 talks · 3.5 hours · halls 03</span>
      </div>
    </div>
  );
}
