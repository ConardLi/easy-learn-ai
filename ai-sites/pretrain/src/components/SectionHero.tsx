/**
 * Section 01 · Hero
 *
 * 反模板：Hero 主交互不是「钩子」，是 2026 年 4 个真实旗舰 base model 的训练账本。
 * 切 chip 看每个模型烧了多少 token / 几张 GPU / 多少天 / 估算成本。
 * 拖 slider 调 GPU 单价，成本数字实时变。
 *
 * 视觉：左 = H1「预训练是什么？」+ 一句话定义 + 白话 3 段 + 过渡 ；右 = 训练账本卡。
 */
import React, { useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";

/**
 * 4 个 2026 年里程碑级 base model 训练账本
 * 来源标注：
 *  - GPT-4：Stanford AI Index 2025 / SemiAnalysis ykk648 gist / Epoch AI arXiv:2405.21015
 *  - Llama 3.1 405B：The Llama 3 Herd of Models arXiv:2407.21783
 *  - DeepSeek-V3：DeepSeek-V3 Technical Report arXiv:2412.19437
 *  - Phi-4：microsoft/phi-4 HuggingFace model card 2024-12
 */
type Receipt = {
  id: string;
  name: string;
  org: string;
  date: string;
  params: string;
  tokensT: number;
  ratio: string; // token : param
  gpus: number;
  gpuType: string;
  gpuHoursM: number; // millions
  daysApprox: number;
  knownCostUSD: number | null; // 已公布的成本（million USD）
  highlight: string; // 一句话特征
  source: string;
};

const RECEIPTS: Receipt[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    org: "OpenAI",
    date: "2023-03",
    params: "≈1.8T (MoE)",
    tokensT: 13,
    ratio: "≈7 : 1",
    gpus: 25000,
    gpuType: "A100",
    gpuHoursM: 57,
    daysApprox: 95,
    knownCostUSD: null,
    highlight: "Altman 公开承认「不止 1 亿美元」",
    source: "Epoch AI arXiv:2405.21015 · Stanford AI Index 2025",
  },
  {
    id: "llama3-405b",
    name: "Llama 3.1 405B",
    org: "Meta",
    date: "2024-07",
    params: "405B (dense)",
    tokensT: 15.6,
    ratio: "38 : 1",
    gpus: 16000,
    gpuType: "H100",
    gpuHoursM: 30.84,
    daysApprox: 80,
    knownCostUSD: null,
    highlight: "目前最大开源 dense base model",
    source: "The Llama 3 Herd of Models arXiv:2407.21783",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek-V3",
    org: "DeepSeek",
    date: "2024-12",
    params: "671B (37B active, MoE)",
    tokensT: 14.8,
    ratio: "22 : 1",
    gpus: 2048,
    gpuType: "H800",
    gpuHoursM: 2.664,
    daysApprox: 56,
    knownCostUSD: 5.328,
    highlight: "$5.6M 烧出对标 GPT-4o 的 base model",
    source: "DeepSeek-V3 Technical Report arXiv:2412.19437",
  },
  {
    id: "phi-4",
    name: "Phi-4",
    org: "Microsoft",
    date: "2024-12",
    params: "14B (dense)",
    tokensT: 9.8,
    ratio: "≈700 : 1",
    gpus: 1920,
    gpuType: "H100",
    gpuHoursM: 0.967,
    daysApprox: 21,
    knownCostUSD: null,
    highlight: "40% 合成数据，14B 比肩 70B",
    source: "Microsoft Phi-4 Technical Report arXiv:2412.08905",
  },
];

const SectionHero: React.FC = () => {
  const [activeId, setActiveId] = useState("deepseek-v3");
  const [pricePerHour, setPricePerHour] = useState(2);

  const active = useMemo(
    () => RECEIPTS.find((r) => r.id === activeId) ?? RECEIPTS[0],
    [activeId],
  );

  const estCost = useMemo(() => {
    return active.gpuHoursM * pricePerHour;
  }, [active, pricePerHour]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-24 right-[8%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-28 left-[6%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:sticky lg:top-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Pretraining · 预训练
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              预训练
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  让模型从零开始，在天量文本上反复学猜下一个字，把语言和知识压进权重。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                一个还没训过的模型，几十亿个权重值是随机数。它什么都不会，给一段话续写下去就是乱码。
              </p>
              <p>
                它的训练任务只有一个 ——
                看一段文本前面几个字，猜下一个字是什么。猜对加分，猜错扣分。
              </p>
              <p>
                这件事重复几万亿次，语法、事实、推理就慢慢压进了那几十亿个权重里。出炉的东西，叫 base model。
              </p>
              <p>
                预训练只是第一步，练出来的 base model 还不会聊天 —— 它只会接着往下写，不会按你的问题回答。后面还要 SFT、RLHF（往下翻到最后一节，看三种回答的对比）。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边卡是 2026 年 4 个真实旗舰 base model 的训练账本。切一个看看，从零训到 base 要烧多少 GPU、多少天、多少钱（token = 模型把文字切成的一小段，约等于一个字 / 词，下面用它数训练量）。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] tracking-[0.08em] text-ink/55">
                继续往下看 ↓ 下一节看它唯一干的事：猜下一个字
              </div>
            </div>
          </div>

          {/* 右：训练账本卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 卡 header */}
              <div className="flex items-baseline justify-between mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 选一个 base model
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                  Training receipt
                </div>
              </div>

              {/* 4 chip 模型选择器 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-7">
                {RECEIPTS.map((r) => {
                  const on = r.id === activeId;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setActiveId(r.id)}
                      className={[
                        "px-3 py-2.5 rounded-xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F] -translate-y-0.5"
                          : "bg-white text-ink/80 hover:bg-cream",
                      ].join(" ")}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-70">
                        {r.org} · {r.date}
                      </div>
                      <div className="font-display text-[15px] font-bold leading-tight mt-0.5">
                        {r.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 主账本 4 行数字 */}
              <div
                key={active.id}
                className="grid grid-cols-2 gap-3 mb-5 animate-enter-fade"
              >
                <ReceiptCell
                  label="② 参数"
                  value={active.params}
                  unit=""
                />
                <ReceiptCell
                  label="③ 训练数据"
                  value={active.tokensT.toString()}
                  unit="T tokens"
                  hint={`token : param ≈ ${active.ratio}`}
                />
                <ReceiptCell
                  label="④ GPU 集群"
                  value={active.gpus.toLocaleString()}
                  unit={`× ${active.gpuType}`}
                  hint={`≈ ${active.daysApprox} 天连转`}
                />
                <ReceiptCell
                  label="⑤ GPU-小时"
                  value={active.gpuHoursM.toFixed(active.gpuHoursM < 10 ? 2 : 1)}
                  unit="M hours"
                  hint={
                    active.knownCostUSD
                      ? `论文公布 $${active.knownCostUSD.toFixed(2)}M`
                      : "成本未公布"
                  }
                />
              </div>

              {/* slider 调 GPU 单价 → 估算成本 */}
              <div className="border-t-2 border-dashed border-ink/15 pt-5">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ⑥ 拖一下 · GPU 时租
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[20px] font-bold text-ink tabular-nums">
                      ${pricePerHour}
                    </span>
                    <span className="font-mono text-[10px] text-ink/55">/ hour</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.5}
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(parseFloat(e.target.value))}
                  className="w-full accent-coral cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9.5px] text-ink/40 mt-1 mb-4">
                  <span>$1 现货</span>
                  <span>$2 论文常用</span>
                  <span>$3 主流</span>
                  <span>$5 紧缺</span>
                </div>

                {/* 总成本 stamp */}
                <div className="flex items-center justify-between bg-butter border-2 border-ink rounded-2xl px-4 py-3 shadow-stamp">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70">
                      估算总成本
                    </div>
                    <div className="font-display text-[28px] lg:text-[32px] font-bold text-ink tabular-nums leading-none mt-1">
                      ${estCost.toFixed(estCost < 10 ? 2 : 1)}M
                    </div>
                  </div>
                  <div className="text-right max-w-[55%]">
                    <div className="font-sans text-[12.5px] text-ink leading-snug font-medium">
                      {active.highlight}
                    </div>
                  </div>
                </div>

                <p className="mt-3 font-mono text-[10px] text-ink/45 leading-relaxed">
                  来源 · {active.source}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReceiptCell: React.FC<{
  label: string;
  value: string;
  unit: string;
  hint?: string;
}> = ({ label, value, unit, hint }) => {
  return (
    <div className="bg-cream border-2 border-ink rounded-xl px-3.5 py-2.5">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-[19px] font-bold text-ink tabular-nums leading-none">
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[10.5px] text-ink/55">{unit}</span>
        )}
      </div>
      {hint && (
        <div className="font-mono text-[9.5px] text-ink/50 mt-1.5">{hint}</div>
      )}
    </div>
  );
};

export default SectionHero;
