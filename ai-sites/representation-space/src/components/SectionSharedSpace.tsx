import React, { useMemo, useState } from "react";
import { Link2 } from "lucide-react";
import { SourceNote } from "./common";

const PAIRS = [
  { image: "一只金毛", text: "a golden retriever", match: true },
  { image: "一只金毛", text: "a city bus", match: false },
  { image: "一辆公交", text: "public transport", match: true },
];

const SectionSharedSpace: React.FC = () => {
  const [pair, setPair] = useState(0);
  const [training, setTraining] = useState(62);
  const item = PAIRS[pair];
  const distance = useMemo(() => item.match ? 120 - training : 65 + training * .9, [item, training]);
  return (
    <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">06</span><span className="section-anchor-label">shared space</span></div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="min-w-0 lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">图片和文字也能被训练到同一张地图。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>图片编码器和文字编码器可以各自输出一组数字，再把两边整理成同样多个数字。这样，图片和文字的位置才能直接比较。</p>
              <p>训练会拉近配对的图文，推远不匹配的图文。这样，“金毛的照片”和“a golden retriever”能成为邻居。</p>
              <p>选择图文对，再拖动训练强度，观察两点距离。</p>
            </div>
            <SourceNote>依据：CLIP, arXiv:2103.00020。论文用大量图文对训练图像与文本编码器，并比较两边表示的相似度。</SourceNote>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <div className="min-w-0 overflow-hidden rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-lg">
              <div className="mb-4 flex flex-wrap gap-2">
                {PAIRS.map((p, i) => <button key={i} onClick={() => setPair(i)} className={`rounded-full border-2 border-ink px-3 py-2 text-[12px] font-bold ${pair === i ? "bg-ink text-cream" : "bg-cream"}`}>组合 {i + 1}</button>)}
              </div>
              <div className="relative h-64 min-w-0 overflow-hidden rounded-2xl border-2 border-ink bg-butter-soft">
                <div className="absolute left-8 top-1/2 -translate-y-1/2 rounded-2xl border-2 border-ink bg-coral p-4 font-bold shadow-stamp">{item.image}</div>
                <div className="absolute top-1/2 -translate-y-1/2 rounded-2xl border-2 border-ink bg-teal p-4 font-bold text-cream shadow-stamp transition-all duration-250" style={{ left: `${Math.min(73, 18 + distance / 3.4)}%` }}>{item.text}</div>
                <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full border-2 border-ink bg-white px-3 py-1 font-mono text-[10px] font-bold"><Link2 className="mr-1 inline h-3 w-3" />距离 {Math.round(distance)}</div>
              </div>
              <label className="mt-5 block rounded-2xl border-2 border-ink bg-cream p-4">
                <span className="mb-2 flex justify-between text-[12px] font-bold"><span>训练推动程度</span><span className="font-mono">{training}%</span></span>
                <input type="range" min="0" max="100" value={training} onChange={(e) => setTraining(Number(e.target.value))} className="w-full accent-[#E07A5F]" />
              </label>
              <p className="mt-3 font-mono text-[10px] text-ink/45">距离为教学示意。真实训练同时比较一批图文对。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSharedSpace;
