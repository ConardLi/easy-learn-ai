import { MaskReveal } from "../components/MaskReveal";
import type { DemoStepProps } from "./index";

export default function ForestInkDemo({ step }: DemoStepProps) {
  if (step === 0) {
    return (
      <div className="fi-scene">
        <div className="fi-mast">
          <span className="brand">FOREST INK</span>
          <span className="sub">— field journal · vol. 09</span>
          <span className="meta">Reportage · 2026 · Western Yunnan</span>
        </div>

        <div className="fi-cover">
          <div className="body">
            <span className="label">— Issue 09 · Cover Story</span>
            <h1>
              <MaskReveal show duration={1100}>
                <span>The&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={400} duration={1100}>
                <span className="em">last&nbsp;</span>
              </MaskReveal>
              <MaskReveal show delay={780} duration={1100}>
                <span>tea forest.</span>
              </MaskReveal>
            </h1>
            <p>
              海拔 2,400 米，云南西部一片 800 年的茶林——
              30 户人家，60 棵被命名过的老树，以及一种我们以为已经
              消失的，跟山林相处的方式.
            </p>
          </div>

          <div className="fi-stamp">
            <div className="fi-stamp-img" />
            <div className="fi-stamp-meta">
              <span>Plate I · Mount Jingmai</span>
              <span>34° 31′ N</span>
            </div>
          </div>
        </div>

        <div className="fi-bottom">
          <span>Forest Ink · independent reportage</span>
          <span>Vol. 09 · 2026 · ISSN 0089-2255</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fi-scene">
      <div className="fi-mast">
        <span className="brand">FOREST INK</span>
        <span className="sub">— figure 03 / continued from p. 18</span>
        <span className="meta">vol. 09 · p. 22</span>
      </div>

      <div className="fi-figure">
        <div className="fi-figure-body">
          <span className="label">— Figure 03 · the count</span>
          <div className="num">
            792<small>&nbsp;trees</small>
          </div>
        </div>
        <div className="fi-figure-aside">
          <h3>
            <MaskReveal show duration={1000}>
              <span>每一棵</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={300} duration={1000}>
              <span>都&nbsp;</span>
            </MaskReveal>
            <MaskReveal show delay={500} duration={1000}>
              <span className="em">有名字</span>
            </MaskReveal>
            <MaskReveal show delay={860} duration={1000}>
              <span>.</span>
            </MaskReveal>
          </h3>
          <p>
            2025 年秋天的复查里，村里的老岩约带着三个年轻人，
            把整片茶林又走了一遍——和上一次复查比，老树少了 4 棵.
            每一棵都被记到了名字本上.
          </p>
          <div className="footnote">
            "名字本"是村里世代手抄的记录册，最早一页可追溯至 1857 年.
          </div>
        </div>
      </div>

      <div className="fi-bottom">
        <span>Forest Ink · vol. 09 · figure 03</span>
        <span>p. 22 / 64</span>
      </div>
    </div>
  );
}
