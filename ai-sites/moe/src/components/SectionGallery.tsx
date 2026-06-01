/**
 * Section 03 · 2026 真实生态 · 7 个 MoE
 *
 * 反模板形式：
 *   ─ 不用 accordion + sort（quantization Section 04 用过）
 *   ─ 不用 tab + benchmark 列表（quantization Section 05 用过）
 *   ─ 我用：7 张「架构身份证」卡 · sort 改顺序 · 点卡片切右侧大详情
 *
 * 每张卡视觉锚 = 8×N 的"专家网格" mini（亮 K 个），把 MoE 架构一眼看出来。
 *
 * 可动元素：
 *   ① sort by 4 options · chip 切换（L2）
 *   ② 点卡片选模型 · 右侧大卡同步更新（L2 select-to-detail）
 */
import React, { useState, useMemo } from "react";

type Model = {
  id: string;
  name: string;
  vendor: string;
  totalB: number;
  activeB: number;
  experts: number; // routed experts
  topK: number; // routed top-K
  shared: number; // shared experts
  year: string; // release date short
  bytesPerExpertB: number; // approx
  highlight?: string;
  source: string;
};

const MODELS: Model[] = [
  {
    id: "kimi-k2",
    name: "Kimi K2",
    vendor: "Moonshot",
    totalB: 1000,
    activeB: 32,
    experts: 384,
    topK: 8,
    shared: 1,
    year: "2025·07",
    bytesPerExpertB: 2.5,
    highlight: "1T 总参数，激活 3.2% · 极致稀疏",
    source: "MoonshotAI/Kimi-K2 README",
  },
  {
    id: "ds-v3",
    name: "DeepSeek V3",
    vendor: "DeepSeek",
    totalB: 671,
    activeB: 37,
    experts: 256,
    topK: 8,
    shared: 1,
    year: "2024·12",
    bytesPerExpertB: 2.5,
    highlight: "aux-loss-free 平衡 · 训练只花 2.79M H800 时",
    source: "arXiv:2412.19437v2",
  },
  {
    id: "l4-maverick",
    name: "Llama 4 Maverick",
    vendor: "Meta",
    totalB: 400,
    activeB: 17,
    experts: 128,
    topK: 1,
    shared: 1,
    year: "2025·04",
    bytesPerExpertB: 3,
    highlight: "alternating dense/MoE layers · 单 H100 主机可跑",
    source: "ai.meta.com/blog/Llama-4",
  },
  {
    id: "qwen3-235",
    name: "Qwen3 235B-A22B",
    vendor: "Alibaba",
    totalB: 235,
    activeB: 22,
    experts: 128,
    topK: 8,
    shared: 0,
    year: "2025·04",
    bytesPerExpertB: 1.8,
    highlight: "无 shared 专家 · top-8 路由 · 双模式 thinking",
    source: "docs.api.nvidia.com qwen3-235b-a22b",
  },
  {
    id: "gpt-oss-120",
    name: "GPT-OSS 120B",
    vendor: "OpenAI",
    totalB: 117,
    activeB: 5.1,
    experts: 128,
    topK: 4,
    shared: 0,
    year: "2025·08",
    bytesPerExpertB: 0.9,
    highlight: "MXFP4 量化 · 单 80GB GPU 可跑",
    source: "openai.com/index/introducing-gpt-oss",
  },
  {
    id: "l4-scout",
    name: "Llama 4 Scout",
    vendor: "Meta",
    totalB: 109,
    activeB: 17,
    experts: 16,
    topK: 1,
    shared: 1,
    year: "2025·04",
    bytesPerExpertB: 6.5,
    highlight: "10M 超长上下文 · 粗粒度 16 专家",
    source: "models/llama4 MODEL_CARD.md",
  },
  {
    id: "mixtral-8x7b",
    name: "Mixtral 8×7B",
    vendor: "Mistral",
    totalB: 47,
    activeB: 13,
    experts: 8,
    topK: 2,
    shared: 0,
    year: "2023·12",
    bytesPerExpertB: 5.8,
    highlight: "开源 MoE 启蒙 · 8 个粗粒度专家 top-2",
    source: "arXiv:2401.04088",
  },
];

type SortKey = "total" | "active" | "ratio" | "year";

const SORTS: { id: SortKey; label: string; desc: string }[] = [
  { id: "total", label: "总参数", desc: "总容量大小" },
  { id: "active", label: "激活算力", desc: "每 token 实际算力" },
  { id: "ratio", label: "active 比例", desc: "越小越省" },
  { id: "year", label: "发布时间", desc: "新到旧" },
];

const SectionGallery: React.FC = () => {
  const [sort, setSort] = useState<SortKey>("total");
  const [selectedId, setSelectedId] = useState<string>("kimi-k2");

  const ordered = useMemo(() => {
    const arr = [...MODELS];
    switch (sort) {
      case "total":
        return arr.sort((a, b) => b.totalB - a.totalB);
      case "active":
        return arr.sort((a, b) => b.activeB - a.activeB);
      case "ratio":
        return arr.sort((a, b) => a.activeB / a.totalB - b.activeB / b.totalB);
      case "year":
        return arr.sort((a, b) => b.year.localeCompare(a.year));
    }
  }, [sort]);

  const selected = MODELS.find((m) => m.id === selectedId)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">the 2026 MoE zoo</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          2026 年七个
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">开源 MoE 模型</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          从 2023 年 Mixtral 启蒙到 2025 年 Kimi K2 的 1 万亿参数，开源 MoE 越做越大，
          但每个词真正参与计算的参数占比越来越小 —— 这就是
          <strong className="text-ink">稀疏（sparse）＝参数很多，但每次只用一小部分</strong>。
          换 4 种角度看顺序，点任一卡片看细节。
        </p>

        {/* sort chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 self-center mr-2">
            sort by ·
          </span>
          {SORTS.map((s) => {
            const on = s.id === sort;
            return (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={[
                  "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
                title={s.desc}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：7 张卡 */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ordered.map((m) => (
              <ModelCard
                key={m.id}
                model={m}
                selected={m.id === selectedId}
                onSelect={() => setSelectedId(m.id)}
              />
            ))}
          </div>

          {/* 右：sticky 详情 */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-6">
              <DetailCard model={selected} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 模型卡片 ─── */
const ModelCard: React.FC<{
  model: Model;
  selected: boolean;
  onSelect: () => void;
}> = ({ model, selected, onSelect }) => {
  const ratio = (model.activeB / model.totalB) * 100;
  return (
    <button
      onClick={onSelect}
      className={[
        "text-left p-3.5 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring",
        selected
          ? "bg-ink text-cream shadow-stamp-lg"
          : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="font-display text-[15px] font-bold leading-tight truncate">
            {model.name}
          </div>
          <div className={[
            "font-mono text-[10px] mt-0.5",
            selected ? "text-cream/55" : "text-ink/50",
          ].join(" ")}>
            {model.vendor} · {model.year}
          </div>
        </div>
        <div className={[
          "font-mono text-[10.5px] px-1.5 py-0.5 rounded shrink-0 border",
          selected ? "border-butter text-butter" : "border-ink/20 text-ink/65",
        ].join(" ")}>
          {ratio.toFixed(1)}%
        </div>
      </div>

      {/* total / active bar */}
      <div className={[
        "px-2 py-1.5 rounded-md mb-2",
        selected ? "bg-cream/8" : "bg-cream",
      ].join(" ")}>
        <div className="flex items-baseline justify-between mb-1">
          <span className={["font-mono text-[9.5px] uppercase tracking-[0.16em]", selected ? "text-cream/55" : "text-ink/55"].join(" ")}>
            total · active
          </span>
          <span className={["font-mono text-[10.5px] tabular-nums", selected ? "text-butter" : "text-ink"].join(" ")}>
            {formatB(model.totalB)} / <span className="text-coral font-bold">{formatB(model.activeB)}</span>
          </span>
        </div>
        <div className={["h-1.5 rounded-full overflow-hidden border", selected ? "bg-cream/15 border-cream/15" : "bg-ink/8 border-ink/10"].join(" ")}>
          <div
            className="h-full bg-coral"
            style={{ width: `${Math.max(2, ratio)}%` }}
          />
        </div>
      </div>

      {/* expert mini grid */}
      <ExpertMini
        experts={model.experts}
        topK={model.topK}
        shared={model.shared}
        invert={selected}
      />
    </button>
  );
};

/** 把 N 个 expert 渲染成尽量方的小网格，亮 topK 个；可选 shared 在左侧单独显示 */
const ExpertMini: React.FC<{
  experts: number;
  topK: number;
  shared: number;
  invert?: boolean;
}> = ({ experts, topK, shared, invert }) => {
  /* 选 cols 让网格尽量方 */
  const cols = Math.min(experts, Math.ceil(Math.sqrt(experts * 1.3)));
  /* 用确定算法选 topK 个亮的位置（每次刷新一样） */
  const litSet = useMemo(() => {
    const s = new Set<number>();
    let seed = experts * 7919 + topK * 31;
    while (s.size < topK) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      s.add(seed % experts);
    }
    return s;
  }, [experts, topK]);

  return (
    <div className="flex items-center gap-2">
      {shared > 0 && (
        <div className="flex flex-col items-center gap-0.5">
          <div className={[
            "w-2 h-3 rounded-sm border",
            invert ? "bg-butter border-cream" : "bg-coral border-ink",
          ].join(" ")} />
          <span className={["font-mono text-[8px] uppercase", invert ? "text-cream/45" : "text-ink/45"].join(" ")}>sh</span>
        </div>
      )}
      <div className="flex-1">
        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: experts }).map((_, i) => {
            const on = litSet.has(i);
            return (
              <div
                key={i}
                className={[
                  "aspect-square rounded-[2px]",
                  on
                    ? invert ? "bg-butter" : "bg-coral"
                    : invert ? "bg-cream/15" : "bg-ink/10",
                ].join(" ")}
              />
            );
          })}
        </div>
        <div className={["mt-1 font-mono text-[9px]", invert ? "text-cream/55" : "text-ink/55"].join(" ")}>
          top-{topK} of {experts}{shared > 0 ? ` (+${shared} sh)` : ""}
        </div>
      </div>
    </div>
  );
};

/* ─── 详情卡 ─── */
const DetailCard: React.FC<{ model: Model }> = ({ model }) => {
  const ratio = (model.activeB / model.totalB) * 100;
  const dormantB = model.totalB - model.activeB;

  return (
    <div key={model.id} className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 animate-enter-fade">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
        {model.vendor} · {model.year}
      </div>
      <div className="font-display text-[28px] font-bold text-ink leading-tight mb-2">
        {model.name}
      </div>
      {model.highlight && (
        <p className="text-[14.5px] text-ink/70 leading-relaxed mb-5">{model.highlight}</p>
      )}

      {/* 三角对比 */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <Stat label="总参数" value={formatB(model.totalB)} unit="B" tone="ink" />
        <Stat label="激活算力" value={formatB(model.activeB)} unit="B" tone="coral" />
        <Stat label="active 比例" value={`${ratio.toFixed(1)}`} unit="%" tone="teal" />
      </div>

      {/* 架构详情 */}
      <div className="space-y-2 mb-5">
        <SpecRow label="routed 专家数" value={model.experts.toString()} />
        <SpecRow label="每 token top-K" value={`${model.topK}${model.shared > 0 ? ` + ${model.shared} shared` : ""}`} />
        <SpecRow label="每专家大小" value={`~${model.bytesPerExpertB.toFixed(1)} B 参数`} />
        <SpecRow label="休眠参数" value={`${formatB(dormantB)} B（每 token 不算）`} />
      </div>

      {/* 视觉条 */}
      <div className="px-3 py-2.5 bg-cream border-2 border-ink rounded-xl mb-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
          每 token 算力账
        </div>
        <div className="h-3 bg-ink/8 rounded-full overflow-hidden border border-ink/15 relative">
          <div
            className="absolute inset-y-0 left-0 bg-coral rounded-full"
            style={{ width: `${Math.max(2, ratio)}%` }}
          />
          <div
            className="absolute inset-y-0 right-0 font-mono text-[8.5px] flex items-center pr-2 text-ink/55"
            style={{ left: `${Math.max(2, ratio)}%` }}
          >
            ← 这部分原地待命
          </div>
        </div>
      </div>

      <p className="font-mono text-[10px] text-ink/40">来源 · {model.source}</p>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string; unit: string; tone: "ink" | "coral" | "teal" }> = ({ label, value, unit, tone }) => (
  <div className="p-3 bg-cream border-2 border-ink rounded-xl">
    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">{label}</div>
    <div className="flex items-baseline gap-0.5">
      <span className={[
        "font-display text-[20px] font-bold tabular-nums leading-none",
        tone === "ink" ? "text-ink" : tone === "coral" ? "text-coral" : "text-teal",
      ].join(" ")}>
        {value}
      </span>
      <span className="font-mono text-[10px] text-ink/45">{unit}</span>
    </div>
  </div>
);

const SpecRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-3 py-1 border-b border-ink/8 last:border-b-0">
    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/55">{label}</span>
    <span className="font-mono text-[12px] text-ink font-semibold tabular-nums">{value}</span>
  </div>
);

function formatB(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}T`;
  if (v < 10) return v.toFixed(1);
  return Math.round(v).toString();
}

export default SectionGallery;
