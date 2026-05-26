import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function DuneDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="du-scene">
        <div className="du-mast">
          <span className="brand">DUNE / STUDIO</span>
          <span className="sub">— quiet architecture</span>
          <span className="meta">portfolio · 2017–2026 · 14 works</span>
        </div>

        <div className="du-cover">
          <div className="body">
            <span className="label">— Project 09 / Atelier No. 4</span>
            <h1>
              <MaskReveal show duration={1100}>
                <span>A house&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={400} duration={1100}>
                <span className="em">made of light&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={780} duration={1100}>
                <span>and pauses.</span>
              </MaskReveal>
            </h1>
            <p>
              一座建造时长 28 个月、室内只用两种材料、
              开窗朝向只考虑两个时刻（清晨 6:40，黄昏 18:10）的住宅.
              我们叫它 Atelier No. 4.
            </p>
          </div>

          <div className="du-plate">
            <div className="frame" />
            <div className="frame inner" />
            <div className="silhouette" />
            <div className="axis" />
            <div className="axis-h" />
            <span className="label l1">North elevation · 1 : 200</span>
            <span className="label l2">Sun · 18°</span>
            <span className="label l3">grade ±0.000</span>
          </div>
        </div>

        <div className="du-bottom">
          <span>Dune Studio · founded 2017</span>
          <span>project no. 09 · 2024–2026</span>
        </div>
      </div>
    );
  }

  return (
    <div className="du-scene">
      <div className="du-mast">
        <span className="brand">DUNE / STUDIO</span>
        <span className="sub">— Atelier No. 4 · specifications</span>
        <span className="meta">spec sheet · 1 of 4</span>
      </div>

      <div className="du-spec">
        <div className="du-spec-num">
          28
          <small>— months on site</small>
        </div>
        <div className="du-spec-body">
          <span className="label">— Numbers, briefly</span>
          <h2>
            <MaskReveal show duration={1000}>
              <span>慢，但是&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={1000}>
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>不慢得没道理.</span>
            </MaskReveal>
          </h2>
          <p>
            把工期从平均 14 个月拉到 28 个月，做对了三件事：
            一次现浇、一次开窗、一次铺地——每一次都是一次性的.
          </p>
          <div className="specs">
            <div><span>floor area</span><span>248 m²</span></div>
            <div><span>materials</span><span>2</span></div>
            <div><span>operable openings</span><span>4</span></div>
            <div><span>budget</span><span>± 8%</span></div>
            <div><span>orientation</span><span>N 18°</span></div>
            <div><span>structure</span><span>cast in place</span></div>
            <div><span>completion</span><span>2026.04</span></div>
            <div><span>award</span><span>— pending</span></div>
          </div>
        </div>
      </div>

      <div className="du-bottom">
        <span>Dune Studio · Atelier No. 4</span>
        <span>sheet 1 / 4</span>
      </div>
    </div>
  );
}
