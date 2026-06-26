/**
 * SectionPipeline · 清洗五步走（L3 单步 trace → 数据量逐步缩水）
 *
 * 交互：单步走 去重 → 去噪 → 低质过滤 → 有害过滤 → 格式统一，
 *   每步看在干嘛 + 一个剩余量数字逐步下降的「料堆」可视化。
 */
import React, { useState } from "react";
import { Copy, Eraser, Gauge, ShieldX, AlignLeft, ArrowRight, RotateCcw } from "lucide-react";

const STEPS = [
  {
    key: "dedup",
    icon: Copy,
    title: "去重",
    color: "#8a6d1f",
    body: "把一模一样、或几乎一样的内容删到只剩一份。网上同一篇文章常被转载几百遍。",
    remain: 64,
  },
  {
    key: "denoise",
    icon: Eraser,
    title: "去噪",
    color: "#1B4B5A",
    body: "清掉网页标签、广告、乱码、导航栏这些跟正文无关的杂物。",
    remain: 52,
  },
  {
    key: "lowq",
    icon: Gauge,
    title: "低质过滤",
    color: "#E07A5F",
    body: "扔掉太短、语句不通、信息量太低的内容。留着只会拉低整体质量。",
    remain: 41,
  },
  {
    key: "toxic",
    icon: ShieldX,
    title: "有害过滤",
    color: "#FF4D74",
    body: "过滤掉辱骂、违法、不安全的内容，免得模型学会说这些。",
    remain: 37,
  },
  {
    key: "format",
    icon: AlignLeft,
    title: "格式统一",
    color: "#241C15",
    body: "把编码、标点、字段格式统一成一个样，模型才好成批读取。",
    remain: 36,
  },
];

const SectionPipeline: React.FC = () => {
  const [step, setStep] = useState(0);
  const cur = STEPS[step];
  const Icon = cur.icon;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">The Cleaning Line</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          清洗是条流水线，分五步
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          清洗不是一刀切，而是一道道工序往下走。点「下一步」，跟着一堆原始数据
          走完五道工序，看它一步步缩水、变干净。
        </p>

        {/* 进度轨 */}
        <div className="mt-9 flex items-center gap-1">
          {STEPS.map((s, i) => {
            const done = i <= step;
            const Ic = s.icon;
            return (
              <React.Fragment key={s.key}>
                <button
                  onClick={() => setStep(i)}
                  className={["flex flex-col items-center gap-1.5 transition-all", done ? "opacity-100" : "opacity-40"].join(" ")}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink"
                    style={{ backgroundColor: done ? s.color : "#FBEFE3" }}
                  >
                    <Ic className={done ? "h-4 w-4 text-cream" : "h-4 w-4 text-ink"} strokeWidth={2.3} />
                  </span>
                  <span className="font-display font-bold text-[11px] sm:text-[12px] text-ink text-center leading-tight">
                    {s.title}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 bg-ink/20 relative top-[-9px]">
                    <div className="h-full bg-ink transition-all duration-400" style={{ width: i < step ? "100%" : "0%" }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div key={cur.key} className="card-stamp p-7 animate-enter-fade h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink" style={{ backgroundColor: cur.color }}>
                  <Icon className="h-5 w-5 text-cream" strokeWidth={2.3} />
                </span>
                <h3 className="font-display font-extrabold text-[22px] text-ink">
                  第 {step + 1} 步 · {cur.title}
                </h3>
              </div>
              <p className="font-sans text-[16.5px] leading-[1.8] text-ink/85 max-w-[640px]">{cur.body}</p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
                  disabled={step === STEPS.length - 1}
                  className="btn-stamp bg-ink text-cream disabled:opacity-30 disabled:pointer-events-none"
                >
                  下一步
                  <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                </button>
                <button onClick={() => setStep(0)} className="btn-stamp bg-cream text-ink">
                  <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
                  重来
                </button>
              </div>
            </div>
          </div>

          {/* 剩余量可视化 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">
                还剩多少数据（示意）
              </div>
              <div className="font-display font-extrabold text-[52px] leading-none text-ink">
                {cur.remain}
                <span className="font-mono text-[15px] text-ink/45 ml-1">%</span>
              </div>
              <div className="mt-4 h-5 bg-cream border-2 border-ink rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-spring"
                  style={{ width: `${cur.remain}%`, backgroundColor: cur.color }}
                />
              </div>
              <p className="mt-5 font-sans text-[14px] leading-[1.65] text-ink/75 flex-1">
                每过一道工序，数据都少一截。最后剩下的可能只有原来的三分之一 —— 但全是能用的。
              </p>
              <p className="mt-3 font-mono text-[10px] text-ink/40">示意数值，帮你感受趋势，不是精确统计。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPipeline;
