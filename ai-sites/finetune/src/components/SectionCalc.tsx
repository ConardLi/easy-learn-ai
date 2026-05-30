/**
 * Section 04 · 训练计算器（L4 拼装实时反映）
 *
 * 4 维输入 chip：
 *   - 模型大小：1B / 3B / 7B / 13B / 34B / 70B
 *   - 方法：Full / LoRA / QLoRA / DoRA
 *   - GPU：RTX 4060 8G / RTX 4090 24G / A100 80G / 8× A100
 *   - 数据条数：500 / 5K / 50K
 *
 * 算出：估算 VRAM / 估算训练时长 / 是否可行 / 推荐
 *
 * 跟 whyfinetune 的"5 维 segmented 拼装诊断器"叙事不一样 ——
 *   那是「该选 RAG / 微调 / context」三选一，这里是「选完微调后该用哪个方法 + 一张 GPU 跑不跑得动」。
 *
 * 数据来源：
 *   - localaimaster.com/blog/qlora-fine-tuning-guide 2026/05 各模型显存表
 *   - effloow.com/articles/llm-fine-tuning-lora-qlora-guide-2026
 *   - jarvislabs.ai/ai-faqs/best-gpu-for-fine-tuning-llms
 *   - itsmostafa/llm-engineering-skills qlora skill 2026
 */
import React, { useState } from "react";
import { Check, X, Zap } from "lucide-react";

type ModelKey = "1B" | "3B" | "7B" | "13B" | "34B" | "70B";
type MethodKey = "full" | "lora" | "qlora" | "dora";
type GpuKey = "4060" | "4090" | "a100" | "8xa100";
type DataKey = "500" | "5k" | "50k";

const MODELS: { key: ModelKey; label: string; params: string }[] = [
  { key: "1B", label: "1B", params: "Qwen2.5-1.5B / Gemma-2-2B" },
  { key: "3B", label: "3B", params: "Llama-3.2-3B" },
  { key: "7B", label: "7B", params: "Llama-3.1-8B / Mistral-7B" },
  { key: "13B", label: "13B", params: "Qwen2.5-14B" },
  { key: "34B", label: "34B", params: "Qwen2.5-32B" },
  { key: "70B", label: "70B", params: "Llama-3.3-70B" },
];

const METHODS: { key: MethodKey; label: string; note: string }[] = [
  { key: "full", label: "Full FT", note: "全改 100%" },
  { key: "lora", label: "LoRA (r=16)", note: "并联 BA" },
  { key: "qlora", label: "QLoRA (4-bit)", note: "base 4-bit + LoRA" },
  { key: "dora", label: "DoRA (r=16)", note: "拆 m+方向" },
];

const GPUS: { key: GpuKey; label: string; vram: number; price: string; throughput: number }[] = [
  { key: "4060", label: "RTX 4060", vram: 8, price: "¥2.5k 自有", throughput: 0.5 },
  { key: "4090", label: "RTX 4090", vram: 24, price: "¥0.59/h 云", throughput: 1 },
  { key: "a100", label: "A100 80G", vram: 80, price: "$1.49/h", throughput: 2.5 },
  { key: "8xa100", label: "8× A100", vram: 640, price: "$12/h", throughput: 18 },
];

const DATAS: { key: DataKey; label: string; count: number }[] = [
  { key: "500", label: "500 条", count: 500 },
  { key: "5k", label: "5K 条", count: 5000 },
  { key: "50k", label: "50K 条", count: 50000 },
];

/* 每个 (model, method) → 显存（GB），数据来自 effloow.com 2026 + localaimaster.com 2026/05 */
const VRAM_TABLE: Record<ModelKey, Record<MethodKey, number>> = {
  "1B": { full: 12, lora: 8, qlora: 5, dora: 9 },
  "3B": { full: 48, lora: 14, qlora: 6, dora: 16 },
  "7B": { full: 80, lora: 16, qlora: 8, dora: 18 },
  "13B": { full: 200, lora: 28, qlora: 14, dora: 32 },
  "34B": { full: 520, lora: 70, qlora: 24, dora: 78 },
  "70B": { full: 1040, lora: 160, qlora: 46, dora: 170 },
};

/* 每个 (model, method) 单卡 RTX 4090 训 1K 条 1 epoch 的"基线小时数"，
   后面再按数据量缩放、GPU 缩放、QLoRA 多 30% 调整 */
const HOUR_BASE: Record<ModelKey, Record<MethodKey, number>> = {
  "1B": { full: 0.6, lora: 0.3, qlora: 0.4, dora: 0.35 },
  "3B": { full: 2.5, lora: 0.8, qlora: 1.0, dora: 0.9 },
  "7B": { full: 6, lora: 1.5, qlora: 2, dora: 1.8 },
  "13B": { full: 14, lora: 3.5, qlora: 4.5, dora: 4 },
  "34B": { full: 40, lora: 9, qlora: 13, dora: 11 },
  "70B": { full: 100, lora: 22, qlora: 30, dora: 26 },
};

const SectionCalc: React.FC = () => {
  const [model, setModel] = useState<ModelKey>("7B");
  const [method, setMethod] = useState<MethodKey>("qlora");
  const [gpu, setGpu] = useState<GpuKey>("4090");
  const [data, setData] = useState<DataKey>("5k");

  const vram = VRAM_TABLE[model][method];
  const baseHours = HOUR_BASE[model][method];
  const gpuObj = GPUS.find((g) => g.key === gpu)!;
  const dataObj = DATAS.find((d) => d.key === data)!;

  const dataScale = dataObj.count / 1000;
  const gpuScale = 1 / gpuObj.throughput;
  const hours = baseHours * dataScale * gpuScale;

  const fit = vram <= gpuObj.vram;
  const tight = !fit && vram <= gpuObj.vram * 1.25;

  /* 推荐策略 */
  const recommend = (() => {
    if (fit) return null;
    if (method === "full") {
      const q = VRAM_TABLE[model].qlora;
      if (q <= gpuObj.vram) {
        return `换 QLoRA 只要 ${q} GB，能塞进 ${gpuObj.label}。质量降 2-5% 多数任务能接受。`;
      }
      return `Full FT 这个 GPU 装不下。先升 GPU 或改 QLoRA + 多卡。`;
    }
    if (method === "lora") {
      const q = VRAM_TABLE[model].qlora;
      if (q <= gpuObj.vram) {
        return `换 QLoRA 只要 ${q} GB（base 走 4-bit）。质量差 2-3% 多数任务能接受。`;
      }
    }
    return `换张大显存的 GPU，或拆多卡用 DeepSpeed ZeRO-3。`;
  })();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">budget check</span>
        </div>

        <div className="mb-10 lg:mb-12 max-w-3xl">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-tight">
            选完方法，<br className="lg:hidden" />
            <span className="relative inline-block">
              <span
                className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">这张 GPU 跑不跑得动？</span>
            </span>
          </h2>
          <p className="text-[15px] lg:text-[16px] text-ink/70 max-w-2xl leading-relaxed">
            4 维 chip 一路点完，立刻看显存够不够、得跑多久、要不要换方法。数据按 2026/05 公开实测整理。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* 左 · 4 维输入 */}
          <div className="lg:col-span-7 space-y-5">
            <ChipGroup
              num="① 模型大小"
              items={MODELS.map((x) => ({ key: x.key, label: x.label, sub: x.params }))}
              active={model}
              onPick={(k) => setModel(k as ModelKey)}
            />
            <ChipGroup
              num="② 微调方法"
              items={METHODS.map((x) => ({ key: x.key, label: x.label, sub: x.note }))}
              active={method}
              onPick={(k) => setMethod(k as MethodKey)}
            />
            <ChipGroup
              num="③ 训练 GPU"
              items={GPUS.map((x) => ({
                key: x.key,
                label: x.label,
                sub: `${x.vram} GB · ${x.price}`,
              }))}
              active={gpu}
              onPick={(k) => setGpu(k as GpuKey)}
            />
            <ChipGroup
              num="④ 数据量"
              items={DATAS.map((x) => ({ key: x.key, label: x.label, sub: "instruction 对" }))}
              active={data}
              onPick={(k) => setData(k as DataKey)}
            />
          </div>

          {/* 右 · 实时输出 */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="flex items-center gap-2 mb-5">
                <Zap className="w-4 h-4 text-coral" strokeWidth={2.5} />
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65 font-semibold">
                  实时估算
                </div>
              </div>

              {/* 可行性 stamp */}
              <div
                className={[
                  "border-2 border-ink rounded-2xl p-4 mb-5 transition-colors",
                  fit ? "bg-butter" : tight ? "bg-butter-soft" : "bg-coral text-cream",
                ].join(" ")}
              >
                <div className="flex items-center gap-2 mb-1">
                  {fit ? (
                    <Check className="w-5 h-5" strokeWidth={2.6} />
                  ) : (
                    <X className="w-5 h-5" strokeWidth={2.6} />
                  )}
                  <div className="font-display text-[20px] font-bold leading-none">
                    {fit ? "能跑" : tight ? "勉强" : "装不下"}
                  </div>
                </div>
                <div className="font-mono text-[11.5px] opacity-85">
                  {vram} GB &nbsp;vs&nbsp; {gpuObj.label} {gpuObj.vram} GB
                </div>
              </div>

              {/* 显存条 */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55">
                    显存占用
                  </span>
                  <span className="font-display text-[15px] font-bold text-ink tabular-nums">
                    {vram} / {gpuObj.vram} GB
                  </span>
                </div>
                <div className="h-3 bg-ink/8 rounded-full overflow-hidden border-2 border-ink/20 relative">
                  <div
                    className={[
                      "h-full transition-all duration-500 ease-spring",
                      fit ? "bg-teal" : "bg-coral",
                    ].join(" ")}
                    style={{ width: `${Math.min(100, (vram / gpuObj.vram) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 时间 */}
              <div className="mb-5">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                  估算训练时长 · 1 epoch
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[36px] font-bold text-ink leading-none tabular-nums">
                    {hours < 1
                      ? (hours * 60).toFixed(0)
                      : hours < 10
                        ? hours.toFixed(1)
                        : hours.toFixed(0)}
                  </span>
                  <span className="font-mono text-[12px] text-ink/55">
                    {hours < 1 ? "分钟" : "小时"}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[10px] text-ink/40">
                  {dataObj.label} · {gpuObj.label} · {METHODS.find((x) => x.key === method)?.label}
                </div>
              </div>

              {/* 推荐 */}
              {recommend ? (
                <div className="pt-4 border-t border-ink/15">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-coral font-bold mb-1.5">
                    推荐
                  </div>
                  <p className="text-[13px] text-ink/85 leading-relaxed">{recommend}</p>
                </div>
              ) : (
                <div className="pt-4 border-t border-ink/15">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-teal font-bold mb-1.5">
                    建议
                  </div>
                  <p className="text-[13px] text-ink/85 leading-relaxed">
                    显存还有 {gpuObj.vram - vram} GB 余量。把 batch_size 调大、或开 max_seq_length=2048。
                  </p>
                </div>
              )}

              <p className="mt-5 font-mono text-[10px] text-ink/40">
                来源：localaimaster.com 2026/05 · effloow.com 2026 · jarvislabs.ai 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChipGroup: React.FC<{
  num: string;
  items: { key: string; label: string; sub: string }[];
  active: string;
  onPick: (k: string) => void;
}> = ({ num, items, active, onPick }) => {
  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 lg:p-5">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 font-semibold mb-3">
        {num}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const on = it.key === active;
          return (
            <button
              key={it.key}
              onClick={() => onPick(it.key)}
              className={[
                "px-3.5 py-2 rounded-md border-2 border-ink text-left transition-all duration-250 ease-spring",
                on
                  ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                  : "bg-white text-ink hover:bg-cream",
              ].join(" ")}
            >
              <div className={`font-display text-[14px] font-bold leading-tight ${on ? "text-cream" : "text-ink"}`}>
                {it.label}
              </div>
              <div className={`font-mono text-[9.5px] mt-0.5 ${on ? "text-cream/65" : "text-ink/45"}`}>
                {it.sub}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionCalc;
