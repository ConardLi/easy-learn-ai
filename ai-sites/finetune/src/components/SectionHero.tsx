/**
 * Section 01 · Hero
 *
 * 反模板：跟 quantization 的"数轴 + bin 吸附"完全不同 ——
 *   这里是 6 方法横向 chip 对比，点哪个就在右侧大卡里看那一种方法的 5 项指标。
 *
 * 左 = 定义层（H1 +「微调方法是什么」一句话定义 + 白话 3 段）
 * 右 = 6 chip + 当前方法的「参数比例条 + 7B 显存 + 训练速度 + 质量保留 + 推理延迟 + 2026 采纳度」
 *
 * 数据来源（汇总）：
 *   - LoRA: Hu et al. 2021 arXiv:2106.09685
 *   - QLoRA: Dettmers et al. 2023 arXiv:2305.14314
 *   - DoRA: Liu et al. ICML 2024 arXiv:2402.09353
 *   - Adapter: Houlsby et al. ICML 2019 arXiv:1902.00751
 *   - 采纳度：presenc.ai/research/open-rlhf-finetuning-toolchain-2026
 *   - 7B 显存：localaimaster.com / effloow.com / wiki.charleschen.ai 2026/05
 */
import React, { useState } from "react";
import { ArrowDown } from "lucide-react";

type Method = {
  id: string;
  short: string;
  full: string;
  year: string;
  paperShort: string;
  trainableParams: string;
  trainablePct: number;
  vram7b: string;
  vram7bBar: number;
  trainSpeed: string;
  trainSpeedBar: number;
  quality: string;
  qualityBar: number;
  inferDelay: string;
  adoption2026: string;
  oneLiner: string;
};

const METHODS: Method[] = [
  {
    id: "full",
    short: "Full FT",
    full: "全参微调",
    year: "经典",
    paperShort: "Devlin 2018 起",
    trainableParams: "100%",
    trainablePct: 100,
    vram7b: "60-80 GB",
    vram7bBar: 100,
    trainSpeed: "1×（基线）",
    trainSpeedBar: 33,
    quality: "100% · 基线",
    qualityBar: 100,
    inferDelay: "0（原模型）",
    adoption2026: "<5%（只剩前沿实验室）",
    oneLiner: "所有权重都训，最准也最贵。",
  },
  {
    id: "freeze",
    short: "Freeze",
    full: "冻结层微调",
    year: "2018-",
    paperShort: "通用做法",
    trainableParams: "20-40%",
    trainablePct: 30,
    vram7b: "30-45 GB",
    vram7bBar: 55,
    trainSpeed: "1.3×",
    trainSpeedBar: 43,
    quality: "85-92%",
    qualityBar: 88,
    inferDelay: "0（原模型）",
    adoption2026: "存在但少",
    oneLiner: "冻住前 N 层只训后几层，土办法。",
  },
  {
    id: "adapter",
    short: "Adapter",
    full: "Adapter Tuning",
    year: "2019",
    paperShort: "Houlsby ICML 2019",
    trainableParams: "0.5-3%",
    trainablePct: 2,
    vram7b: "14-18 GB",
    vram7bBar: 22,
    trainSpeed: "1.2×",
    trainSpeedBar: 40,
    quality: "92-95%",
    qualityBar: 93,
    inferDelay: "+5-15%（中间多层）",
    adoption2026: "在多任务场景仍用",
    oneLiner: "每层中间插小 bottleneck，只训插件。",
  },
  {
    id: "lora",
    short: "LoRA",
    full: "Low-Rank Adaptation",
    year: "2021",
    paperShort: "Hu et al. arXiv:2106.09685",
    trainableParams: "0.1-1%",
    trainablePct: 0.5,
    vram7b: "10-16 GB",
    vram7bBar: 18,
    trainSpeed: "3×",
    trainSpeedBar: 80,
    quality: "95-98%",
    qualityBar: 96,
    inferDelay: "0（可 merge 回 W）",
    adoption2026: "62% 主流（含 QLoRA）",
    oneLiner: "在 W 旁边并联 BA 两个细矩阵，只训 0.5%。",
  },
  {
    id: "qlora",
    short: "QLoRA",
    full: "Quantized LoRA",
    year: "2023",
    paperShort: "Dettmers arXiv:2305.14314",
    trainableParams: "0.1-1%",
    trainablePct: 0.5,
    vram7b: "5-8 GB",
    vram7bBar: 9,
    trainSpeed: "1.5×（量化拖累）",
    trainSpeedBar: 50,
    quality: "93-97%",
    qualityBar: 95,
    inferDelay: "0（可 merge）",
    adoption2026: "消费级 GPU 首选",
    oneLiner: "base 模型先 4-bit 再 LoRA，单卡训 70B。",
  },
  {
    id: "dora",
    short: "DoRA",
    full: "Weight-Decomposed LoRA",
    year: "2024",
    paperShort: "Liu ICML 2024 Oral",
    trainableParams: "0.1-1% + 0.01%",
    trainablePct: 0.6,
    vram7b: "16-20 GB",
    vram7bBar: 24,
    trainSpeed: "0.8×（拆方向 / 长度）",
    trainSpeedBar: 26,
    quality: "98-100% · 微超 LoRA",
    qualityBar: 99,
    inferDelay: "0（可 merge）",
    adoption2026: "约 7% 上升中",
    oneLiner: "把 ΔW 拆成方向+长度，rank=8 就能赶上 LoRA rank=32。",
  },
];

const SectionHero: React.FC = () => {
  const [pick, setPick] = useState("lora");
  const m = METHODS.find((x) => x.id === pick)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div aria-hidden className="absolute top-24 right-[7%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="w-9 h-9 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Fine-Tuning Methods · 微调方法
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              微调方法
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
                  改 LLM 部分或全部权重让它学你的任务，从全改 100% 到只训 0.1%，2026 主流有 6 种玩法。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                一个 7B 模型有 70 亿个权重。全改一次要 60 GB 显存，训得动的只剩前沿实验室。
              </p>
              <p>
                LoRA 在原权重旁边并联两个细矩阵（B 和 A），只训这两个。新参数量 0.1% 起，效果能到全改的 95-98%。
              </p>
              <p>
                QLoRA 把 base 先压成 4-bit 再挂 LoRA，70B 模型一张 A100 80G 就能 fine-tune。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边 6 个 chip 是 6 种方法。点哪个，下方就显示那一种的训练参数比例、显存、速度、质量、推理延迟、2026 采纳度。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 章 · ~12 分钟
              </div>
            </div>
          </div>

          {/* 右：6 chip + 当前方法的指标卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* chip 行 */}
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 选一种方法
                </div>
                <div className="font-mono text-[10px] text-ink/40">
                  {m.year} · {m.paperShort}
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-6">
                {METHODS.map((x) => {
                  const on = x.id === pick;
                  return (
                    <button
                      key={x.id}
                      onClick={() => setPick(x.id)}
                      className={[
                        "py-2 px-1 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring leading-tight",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/65 hover:bg-cream",
                      ].join(" ")}
                    >
                      {x.short}
                    </button>
                  );
                })}
              </div>

              {/* 当前方法 ─ 头部 */}
              <div className="mb-5" key={m.id}>
                <div className="flex items-baseline gap-2 mb-1 animate-enter-up">
                  <span className="font-display text-[26px] lg:text-[30px] font-bold text-ink leading-none">
                    {m.full}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/45">
                    {m.short}
                  </span>
                </div>
                <p className="font-sans text-[14px] text-ink/70 leading-snug animate-enter-fade">
                  {m.oneLiner}
                </p>
              </div>

              {/* 5 项指标 */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 pt-4 border-t border-ink/10">
                <Metric
                  label="② 训练参数比例"
                  value={m.trainableParams}
                  bar={m.trainablePct === 100 ? 100 : Math.max(1.5, m.trainablePct * 1.5)}
                  barColor="bg-coral"
                  hint={m.trainablePct < 5 ? `仅 ${m.trainablePct}% · 几乎不动 base` : `${m.trainablePct}%`}
                />
                <Metric
                  label="③ 7B 训练显存"
                  value={m.vram7b}
                  bar={m.vram7bBar}
                  barColor="bg-ink"
                />
                <Metric
                  label="④ 训练速度"
                  value={m.trainSpeed}
                  bar={m.trainSpeedBar}
                  barColor="bg-teal"
                />
                <Metric
                  label="⑤ 质量保留"
                  value={m.quality}
                  bar={m.qualityBar}
                  barColor={
                    m.qualityBar >= 96
                      ? "bg-teal"
                      : m.qualityBar >= 90
                        ? "bg-butter-deep"
                        : "bg-coral"
                  }
                />
                <div className="col-span-2 grid grid-cols-2 gap-x-4 pt-3 border-t border-ink/10">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-0.5">
                      ⑥ 推理延迟
                    </div>
                    <div className="font-display text-[15px] font-bold text-ink leading-tight">
                      {m.inferDelay}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-0.5">
                      ⑦ 2026 采纳度
                    </div>
                    <div className="font-display text-[15px] font-bold text-ink leading-tight">
                      {m.adoption2026}
                    </div>
                  </div>
                </div>
              </div>

              {/* 注脚 */}
              <p className="mt-5 font-mono text-[10px] text-ink/40">
                来源：presenc.ai 2026/04 · localaimaster.com 2026/05 · effloow.com 2026 · arXiv 编号见各 section
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Metric: React.FC<{
  label: string;
  value: string;
  bar: number;
  barColor: string;
  hint?: string;
}> = ({ label, value, bar, barColor }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-0.5">
      {label}
    </div>
    <div className="font-display text-[17px] font-bold text-ink leading-tight tabular-nums mb-1.5">
      {value}
    </div>
    <div className="h-1.5 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
      <div
        className={`h-full ${barColor} transition-all duration-500 ease-spring`}
        style={{ width: `${Math.max(2, Math.min(100, bar))}%` }}
      />
    </div>
  </div>
);

export default SectionHero;
