/**
 * Section 03 · 任务：把 70B 塞进 4090
 *
 * 任务驱动叙事，区别于 llm/agent/rag 三站任何 section 的形式。
 * 用户选「模型 + 硬件」两个 chip 阵列 → 自动算「该用什么量化方案 + 显存 + 速度 + 质量」。
 *
 * 数据来源：llmhardware.io · insiderllm.com · nordicsilicon.io 2026/03-05 综合实测
 */
import React, { useState, useMemo } from "react";
import { Sparkles, AlertTriangle, ExternalLink } from "lucide-react";

/* ─── 数据 ─── */

type Model = {
  id: string;
  label: string;
  fp16GB: number; // FP16 完整体积
  note?: string;
  speedFactor: number; // 越大越快（小模型快）
};

const MODELS: Model[] = [
  { id: "8b", label: "Llama 3 8B", fp16GB: 16, speedFactor: 5, note: "轻量 · 单卡即可" },
  { id: "14b", label: "Qwen2.5 14B", fp16GB: 28, speedFactor: 3 },
  { id: "70b", label: "Llama 3 70B", fp16GB: 140, speedFactor: 1, note: "消费级 70B 标杆" },
  { id: "qwen72b", label: "Qwen3 72B", fp16GB: 144, speedFactor: 1 },
  { id: "ds-distill", label: "DeepSeek R1 Distill 70B", fp16GB: 140, speedFactor: 1 },
  { id: "ds-v3", label: "DeepSeek V3 671B", fp16GB: 1342, speedFactor: 0.5, note: "MoE · 激活 37B" },
];

type Hardware = {
  id: string;
  label: string;
  vramGB: number;
  speedBase: number; // 基础 tok/s（70B Q4 时的参考速度）
  price: string;
};

const HARDWARE: Hardware[] = [
  { id: "4090", label: "RTX 4090", vramGB: 24, speedBase: 24, price: "$1.6k" },
  { id: "5090", label: "RTX 5090", vramGB: 32, speedBase: 30, price: "$2.0k" },
  { id: "2x4090", label: "双 RTX 4090", vramGB: 48, speedBase: 22, price: "$3.2k" },
  { id: "m4-pro", label: "Mac M4 Pro 48G", vramGB: 48, speedBase: 11, price: "$1.8k" },
  { id: "m4-max", label: "Mac M4 Max 128G", vramGB: 128, speedBase: 14, price: "$4.0k" },
  { id: "a100", label: "A100 80GB", vramGB: 80, speedBase: 30, price: "$15k" },
  { id: "8xh100", label: "8× H100", vramGB: 640, speedBase: 80, price: "datacenter" },
];

/* 各方案：每参数所占字节 + 质量保留 + 名字 */
const SCHEMES = [
  { bits: 16, label: "FP16", bytesPerParam: 2, quality: 100 },
  { bits: 8, label: "Q8_0", bytesPerParam: 1, quality: 99.5 },
  { bits: 4, label: "Q4_K_M", bytesPerParam: 0.5, quality: 99 },
  { bits: 3, label: "Q3_K_M", bytesPerParam: 0.375, quality: 95 },
  { bits: 2, label: "Q2_K", bytesPerParam: 0.25, quality: 76 },
] as const;

const OVERHEAD = 1.15; // KV cache + activation 杂项 15% 余量

/* ─── 推荐逻辑 ─── */

function recommend(model: Model, hw: Hardware) {
  /* 实际权重数：FP16 体积 / 2 */
  const paramBillions = model.fp16GB / 2;
  /* 从最高精度往下试，找第一个能放下的 */
  for (const s of SCHEMES) {
    const need = paramBillions * s.bytesPerParam * OVERHEAD;
    if (need <= hw.vramGB) {
      /* 速度估算：基础 × 模型 speedFactor × bit boost */
      const bitBoost = 16 / s.bits;
      const tokS = Math.round(hw.speedBase * model.speedFactor * Math.pow(bitBoost, 0.4));
      return {
        ok: true as const,
        scheme: s,
        need: Math.round(need * 10) / 10,
        tokS,
        headroom: Math.round(((hw.vramGB - need) / hw.vramGB) * 100),
      };
    }
  }
  return { ok: false as const };
}

/* 给一句口语建议 */
function commentary(model: Model, hw: Hardware, r: ReturnType<typeof recommend>): string {
  if (!r.ok) return `就算压到 Q2_K，${model.label} 也塞不进 ${hw.label}。换更小的模型，或换更大显存的硬件。`;
  const { scheme, tokS, headroom } = r;
  if (scheme.quality < 80) return `勉强能跑，但 ${scheme.label} 质量明显下降。能换硬件就换。`;
  if (tokS < 5) return `能跑，但 ${tokS} tok/s 像在打字。批处理还行，对话就别想了。`;
  if (tokS < 12) return `${tokS} tok/s · 凑合用。如果是日常对话能接受，写代码可能等到睡着。`;
  if (tokS < 30) return `${tokS} tok/s · 流畅日常对话。还有 ${headroom}% 显存余量给长上下文。`;
  return `${tokS} tok/s · 飞起来了。${hw.label} 跑 ${model.label} 是性能溢出。`;
}

/* ─── Component ─── */

const SectionFitTask: React.FC = () => {
  const [modelId, setModelId] = useState("70b");
  const [hwId, setHwId] = useState("2x4090");

  const model = MODELS.find((m) => m.id === modelId)!;
  const hw = HARDWARE.find((h) => h.id === hwId)!;
  const r = useMemo(() => recommend(model, hw), [model, hw]);
  const comment = useMemo(() => commentary(model, hw, r), [model, hw, r]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">a real task</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          实战：你手里这卡，
          <br />
          能塞下{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">什么模型</span>
          </span>
          ？
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          下面左侧选你的<strong className="text-ink">模型</strong>、右侧选你的<strong className="text-ink">硬件</strong> ——
          自动告诉你该用哪个量化方案、占多少显存、能跑多快、质量损失多少。
        </p>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：两个 chip 阵列竖排 */}
          <div className="lg:col-span-5 space-y-5">
            <ChipPickerColumn
              title="① 模型"
              chips={MODELS.map((m) => ({
                id: m.id,
                label: m.label,
                sub: `${m.fp16GB} GB · FP16`,
                note: m.note,
              }))}
              activeId={modelId}
              onSelect={setModelId}
            />
            <ChipPickerColumn
              title="② 硬件"
              chips={HARDWARE.map((h) => ({
                id: h.id,
                label: h.label,
                sub: `${h.vramGB} GB · ${h.price}`,
              }))}
              activeId={hwId}
              onSelect={setHwId}
            />
          </div>

          {/* 右：推荐卡 */}
          <div className="lg:col-span-7">
            <RecommendCard model={model} hw={hw} r={r} comment={comment} />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 子组件 ─── */

type Chip = { id: string; label: string; sub: string; note?: string };

const ChipPickerColumn: React.FC<{
  title: string;
  chips: Chip[];
  activeId: string;
  onSelect: (id: string) => void;
}> = ({ title, chips, activeId, onSelect }) => (
  <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
      {title}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
      {chips.map((c) => {
        const on = c.id === activeId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={[
              "text-left px-3 py-2.5 rounded-lg border-2 border-ink transition-all duration-250 ease-spring",
              on
                ? "bg-ink text-cream shadow-stamp"
                : "bg-cream text-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
            ].join(" ")}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-[13.5px] font-bold leading-tight">
                {c.label}
              </span>
              <span
                className={[
                  "shrink-0 font-mono text-[10px]",
                  on ? "text-cream/55" : "text-ink/45",
                ].join(" ")}
              >
                {c.sub}
              </span>
            </div>
            {c.note && (
              <div className={["mt-0.5 text-[11px]", on ? "text-butter" : "text-ink/50"].join(" ")}>
                {c.note}
              </div>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

const RecommendCard: React.FC<{
  model: Model;
  hw: Hardware;
  r: ReturnType<typeof recommend>;
  comment: string;
}> = ({ model, hw, r, comment }) => {
  if (!r.ok) {
    return (
      <div className="h-full bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-coral" strokeWidth={2.5} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral font-bold">
            no fit
          </span>
        </div>
        <div className="font-display text-[28px] font-bold text-ink mb-2 leading-tight">
          {hw.label} 装不下{" "}
          <span className="text-coral">{model.label}</span>
        </div>
        <p className="text-[15px] text-ink/70 leading-relaxed mt-2">{comment}</p>
        <div className="mt-auto pt-5 grid grid-cols-3 gap-2 text-center">
          <div className="p-3 bg-white border-2 border-ink rounded-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">需要至少</div>
            <div className="font-display text-[18px] font-bold text-coral">
              {Math.round((model.fp16GB / 8) * 1.15)}+ GB
            </div>
          </div>
          <div className="p-3 bg-white border-2 border-ink rounded-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">你的硬件</div>
            <div className="font-display text-[18px] font-bold text-ink">
              {hw.vramGB} GB
            </div>
          </div>
          <div className="p-3 bg-white border-2 border-ink rounded-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">差额</div>
            <div className="font-display text-[18px] font-bold text-coral">
              −{Math.max(0, Math.round((model.fp16GB / 8) * 1.15 - hw.vramGB))} GB
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { scheme, need, tokS, headroom } = r;
  return (
    <div className="h-full bg-ink text-cream rounded-3xl shadow-stamp-xl p-6 lg:p-7 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-butter" strokeWidth={2.5} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter font-bold">
          recommended
        </span>
      </div>

      <div className="font-display text-[34px] lg:text-[40px] font-bold leading-none mb-2">
        <span className="text-butter">{scheme.label}</span>
        <span className="ml-3 font-mono text-[14px] text-cream/55 align-middle">
          {scheme.bits}-bit
        </span>
      </div>
      <p className="text-[14px] text-cream/65 leading-relaxed max-w-md">
        在 {hw.label} 上跑 {model.label}，
        {scheme.bits < 4 ? "压到底" : scheme.bits >= 16 ? "可以裸跑无损精度" : "压到 4-bit 平衡点"}
        。
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Metric label="占显存" value={`${need}`} unit="GB" tone="cream" />
        <Metric label="预期速度" value={`${tokS}`} unit="tok/s" tone="coral" />
        <Metric label="质量保留" value={`${scheme.quality}`} unit="%" tone={scheme.quality >= 95 ? "teal" : "butter"} />
        <Metric label="显存余量" value={`${headroom}`} unit="%" tone="cream" />
      </div>

      <div className="mt-auto pt-6">
        <div className="px-4 py-3 bg-cream/8 border border-cream/15 rounded-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter/80 mb-1">
            verdict
          </div>
          <p className="text-[14px] text-cream/90 leading-relaxed">{comment}</p>
        </div>

        {scheme.label.startsWith("Q") && (
          <a
            href="../gguf/index.html"
            className="mt-3 flex items-start gap-2.5 px-4 py-3 bg-cream/8 border border-cream/15 rounded-xl hover:bg-cream/15 transition-colors duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5 text-butter mt-0.5 shrink-0" strokeWidth={2.5} />
            <span className="text-[13px] text-cream/80 leading-relaxed">
              <span className="font-mono text-cream">{scheme.label}</span> 是 GGUF 文件里的档位名（4-bit、K-quant 方案、Medium 大小），不是一种单独算法。
              这串名字怎么读
              <span className="font-semibold text-butter"> → 详见《GGUF》</span>。
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

const Metric: React.FC<{
  label: string;
  value: string;
  unit: string;
  tone: "cream" | "coral" | "butter" | "teal";
}> = ({ label, value, unit, tone }) => {
  const colors = {
    cream: "text-cream",
    coral: "text-coral",
    butter: "text-butter",
    teal: "text-butter", // tail 在 ink 底上用 butter 更醒目
  }[tone];
  return (
    <div className="px-3 py-2.5 bg-cream/8 rounded-lg border border-cream/15">
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream/55 mb-0.5">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`font-display text-[22px] font-bold tabular-nums ${colors}`}>
          {value}
        </span>
        <span className="font-mono text-[10px] text-cream/45">{unit}</span>
      </div>
    </div>
  );
};

export default SectionFitTask;
