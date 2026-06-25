import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = [
  { title: "编码前", image: "一小块颜色和亮度", audio: "一小段空气振动", color: "#FBEFE3" },
  { title: "前几层", image: "边缘、纹理、方向", audio: "音高、响度、节奏", color: "#F4D35E" },
  { title: "中间层", image: "眼睛、轮廓、物体部件", audio: "发音单位、重音、短音节", color: "#E07A5F" },
  { title: "后几层", image: "这像一只狗，位于画面左边", audio: "这段声音像在说「你好」", color: "#1B4B5A" },
];

const SectionFeatureLayers: React.FC = () => {
  const [step, setStep] = useState(0);
  const item = STEPS[step];
  return (
    <section className="bg-butter-soft px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">05</span><span className="section-anchor-label">feature layers</span></div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">编码器一层层组合线索。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>特征就是对任务有用的线索。前面的层常保留局部变化，后面的层会把多个局部线索组合起来。</p>
              <p>前几层多记录边缘和声音起伏，后几层会把这些线索组合起来，用于识别物体或话语。具体每层学到什么，会随模型、数据和训练任务变化。</p>
              <p>用左右按钮走一遍，观察图片和声音怎样从局部数值变成可用线索。</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-white p-6 shadow-stamp-xl">
              <div className="mb-5 flex items-center justify-between">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white disabled:opacity-30"><ChevronLeft /></button>
                <span className="font-mono text-[11px] font-bold">当前阶段 · {item.title}</span>
                <button onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))} disabled={step === STEPS.length - 1} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white disabled:opacity-30"><ChevronRight /></button>
              </div>
              <div key={step} className="rounded-3xl border-2 border-ink p-6 animate-enter-pop" style={{ backgroundColor: item.color, color: step === 3 ? "#FBEFE3" : "#241C15" }}>
                <div className="mb-5 font-display text-3xl font-bold">{item.title}</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border-2 border-ink bg-white p-5 text-ink"><div className="mb-2 font-mono text-[10px] uppercase tracking-[.18em] text-ink/50">图片</div><p className="font-bold">{item.image}</p></div>
                  <div className="rounded-2xl border-2 border-ink bg-white p-5 text-ink"><div className="mb-2 font-mono text-[10px] uppercase tracking-[.18em] text-ink/50">声音</div><p className="font-bold">{item.audio}</p></div>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                {STEPS.map((_, i) => <button key={i} aria-label={`跳到第 ${i + 1} 步`} onClick={() => setStep(i)} className={`h-3 flex-1 rounded-full border-2 border-ink ${i <= step ? "bg-teal" : "bg-cream"}`} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFeatureLayers;
