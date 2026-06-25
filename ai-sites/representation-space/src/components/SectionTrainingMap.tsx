import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const LABELS = [
  { label: "猫", group: 0 }, { label: "小猫", group: 0 }, { label: "橘猫", group: 0 },
  { label: "汽车", group: 1 }, { label: "公交", group: 1 }, { label: "卡车", group: 1 },
  { label: "年假", group: 2 }, { label: "请假", group: 2 }, { label: "调休", group: 2 },
];
const COLORS = ["#F4D35E", "#1B4B5A", "#E07A5F"];
const CENTERS = [{ x: 85, y: 90 }, { x: 265, y: 90 }, { x: 180, y: 215 }];

const SectionTrainingMap: React.FC = () => {
  const [step, setStep] = useState(0);
  return (
    <section className="bg-pop px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">03</span><span className="section-anchor-label">training shapes space</span></div>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">空间里的位置，是训练慢慢推出来的。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/75">
              <p>模型先从近乎随机的位置开始。训练任务会给出反馈，让合适的内容靠近，让不合适的内容分开。</p>
              <p>“合适”由训练目标决定。做搜索时可能强调意思；做识图时可能强调物体类别；处理声音时也会保留发音和说话人线索。</p>
              <p>逐步推进，观察三组内容怎样从混在一起变成三个区域。</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-xl">
              <svg viewBox="0 0 360 280" className="w-full rounded-2xl border-2 border-ink bg-cream">
                {LABELS.map((item, i) => {
                  const startX = 50 + ((i * 83) % 260);
                  const startY = 42 + ((i * 57) % 190);
                  const center = CENTERS[item.group];
                  const t = step / 4;
                  const x = startX * (1 - t) + (center.x + (i % 3 - 1) * 25) * t;
                  const y = startY * (1 - t) + (center.y + (i % 3 - 1) * 18) * t;
                  return <g key={item.label} style={{ transition: "all 300ms" }}><circle cx={x} cy={y} r="13" fill={COLORS[item.group]} stroke="#241C15" strokeWidth="2" /><text x={x} y={y - 19} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700">{item.label}</text></g>;
                })}
              </svg>
              <div className="mt-5 flex items-center justify-between gap-3">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink disabled:opacity-30"><ChevronLeft /></button>
                <div className="flex-1 text-center"><div className="font-display text-xl font-bold">{step === 0 ? "随机起点" : step < 4 ? `第 ${step} 轮调整` : "形成任务需要的分组"}</div><div className="font-mono text-[10px] text-ink/45">示意过程，不代表真实训练轮数</div></div>
                <button onClick={() => setStep(Math.min(4, step + 1))} disabled={step === 4} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink disabled:opacity-30"><ChevronRight /></button>
              </div>
              <button onClick={() => setStep(0)} className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1.5 font-mono text-[10px] font-bold"><RotateCcw className="h-3.5 w-3.5" />从头看</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTrainingMap;
