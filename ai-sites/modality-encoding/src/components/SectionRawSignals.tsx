import React, { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

const SectionRawSignals: React.FC = () => {
  const [sample, setSample] = useState(35);
  const [mode, setMode] = useState<"pixel" | "wave">("pixel");
  const values = useMemo(() => Array.from({ length: 16 }, (_, i) => Math.round(30 + 220 * Math.abs(Math.sin((i + sample / 9) * 0.72)))), [sample]);

  return (
    <section className="border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">02</span><span className="section-anchor-label">raw input</span></div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">模型先看到数值，<br />还没看到“猫”和“你好”。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>一个像素通常记录红、绿、蓝三种颜色有多强。声波则记录每个时刻空气振动的幅度。</p>
              <p>这些原始数值很密，也很局部。只看一个像素，无法判断整张图是什么；只听一小点振动，也很难认出一个字。</p>
              <p>拖动滑杆，看看换一个位置后，读到的数字怎样变化。编码器的工作从这些数字开始。</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp-lg">
              <div className="mb-4 flex gap-2">
                {(["pixel", "wave"] as const).map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border-2 border-ink px-4 py-2 font-mono text-[11px] font-bold ${mode === item ? "bg-ink text-cream" : "bg-white"}`}>
                    {item === "pixel" ? "像素数字" : "声波数字"}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {values.map((v, i) => (
                  <div key={i} className="rounded-xl border-2 border-ink bg-white p-2 text-center">
                    <div className="mx-auto mb-2 h-12 w-full rounded-md border border-ink/30" style={{ background: mode === "pixel" ? `rgb(${v},${255 - v},${80 + (v % 120)})` : "#1B4B5A", opacity: mode === "wave" ? 0.25 + v / 340 : 1 }} />
                    <span className="font-mono text-[10px]">{v}</span>
                  </div>
                ))}
              </div>
              <label className="mt-5 block">
                <span className="mb-2 flex justify-between text-[12px] font-bold"><span>观察位置</span><span className="font-mono">{sample}%</span></span>
                <input type="range" min="0" max="100" value={sample} onChange={(e) => setSample(Number(e.target.value))} className="w-full accent-[#E07A5F]" />
              </label>
              <button onClick={() => setSample(35)} className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 font-mono text-[10px] font-bold"><RotateCcw className="h-3.5 w-3.5" />重置</button>
              <p className="mt-3 font-mono text-[10px] text-ink/45">示意数值，帮助观察“位置变化会带来输入变化”。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRawSignals;
