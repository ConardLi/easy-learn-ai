/**
 * 模型规模动画 · 交互式（2026 版）
 *
 * 设计：
 *   ─ 用户拖动滑块在 7 个里程碑模型之间切换，所见即所得
 *   ─ 中央大圆按 log(参数量) 比例缩放，直观感知规模差距
 *   ─ 右侧 stat 栏实时显示：年份 / 参数量 / 训练 token / 时代标签
 *   ─ 底部增长曲线，节点位置同步高亮
 *   ─ 数据基于公开论文与 2026 年 5 月最新发布信息
 *
 * 数据准确性：
 *   ─ BERT、GPT-2、GPT-3、PaLM 来自论文
 *   ─ Llama 3.1 405B / DeepSeek-V3 来自官方 model card
 *   ─ Claude Opus 4.7 / Gemini 3.5 Flash 参数未公开，标注"未披露"
 */
import React, { useMemo, useState } from "react";

interface ModelData {
  name: string;
  year: number | string;
  /** 参数量（B = 十亿）；string 表示未公开（用于 chart 比例计算时按 estimate 处理） */
  paramsB: number;
  /** 显示用文案 */
  paramsText: string;
  /** 训练 token（T = 万亿）；未公开记 -1 */
  tokensT: number;
  tokensText: string;
  era: string;
  note?: string;
}

const MODELS: ModelData[] = [
  {
    name: "BERT-base",
    year: 2018,
    paramsB: 0.11,
    paramsText: "110 M",
    tokensT: 0.003,
    tokensText: "3.3 B",
    era: "预训练时代开端",
    note: "Encoder · Google",
  },
  {
    name: "GPT-2",
    year: 2019,
    paramsB: 1.5,
    paramsText: "1.5 B",
    tokensT: 0.04,
    tokensText: "40 B",
    era: "Decoder 路线确立",
    note: "OpenAI",
  },
  {
    name: "GPT-3",
    year: 2020,
    paramsB: 175,
    paramsText: "175 B",
    tokensT: 0.3,
    tokensText: "300 B",
    era: "LLM 时代开端",
    note: "OpenAI · in-context learning 首次显现",
  },
  {
    name: "PaLM",
    year: 2022,
    paramsB: 540,
    paramsText: "540 B",
    tokensT: 0.78,
    tokensText: "780 B",
    era: "Pathways 范式",
    note: "Google · dense decoder",
  },
  {
    name: "Llama 3.1 405B",
    year: 2024,
    paramsB: 405,
    paramsText: "405 B",
    tokensT: 15,
    tokensText: "15 T",
    era: "开源追平闭源",
    note: "Meta · 训练 token 50× 于 GPT-3",
  },
  {
    name: "DeepSeek-V3",
    year: 2024,
    paramsB: 671,
    paramsText: "671 B (激活 37 B)",
    tokensT: 14.8,
    tokensText: "14.8 T",
    era: "MoE 高效化",
    note: "DeepSeek · 训练成本仅 ~$558 万",
  },
  {
    name: "Claude Opus 4.7",
    year: 2026,
    paramsB: 3000, // 估算，仅用于图表比例
    paramsText: "未公开",
    tokensT: -1,
    tokensText: "未披露",
    era: "Frontier 2026",
    note: "Anthropic · 87.6% SWE-bench",
  },
];

const ModelSizeAnimation: React.FC = () => {
  const [index, setIndex] = useState(2); // 默认 GPT-3
  const current = MODELS[index];

  /* 圆大小：按 log(params) 映射到 64-180 像素 */
  const radius = useMemo(() => {
    const minB = 0.05;
    const maxB = 3000;
    const t =
      (Math.log10(current.paramsB) - Math.log10(minB)) /
      (Math.log10(maxB) - Math.log10(minB));
    return 64 + t * (180 - 64);
  }, [current.paramsB]);

  /* 当前模型在 chart 上的位置 */
  const chartPoints = useMemo(() => {
    const minB = 0.05;
    const maxB = 3000;
    return MODELS.map((m, i) => {
      const x = (i / (MODELS.length - 1)) * 100;
      const t =
        (Math.log10(m.paramsB) - Math.log10(minB)) /
        (Math.log10(maxB) - Math.log10(minB));
      const y = 100 - t * 100;
      return { x, y, i };
    });
  }, []);

  const pathD = useMemo(() => {
    return chartPoints
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
      .join(" ");
  }, [chartPoints]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
      {/* 标题区 */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1.5">
            INTERACTIVE · 拖动体验
          </div>
          <h3 className="font-display font-extrabold text-[20px] text-ink">
            参数规模演进
          </h3>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45">
            {String(index + 1).padStart(2, "0")} / {MODELS.length}
          </div>
          <div className="font-display font-extrabold text-[18px] text-ink mt-1">
            {current.year}
          </div>
        </div>
      </div>

      {/* 中央展示区 */}
      <div className="relative bg-cream border-2 border-ink rounded-2xl h-[260px] flex items-center justify-center overflow-hidden mb-6">
        {/* 网格背景 */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, #241C15 1px, transparent 1px), linear-gradient(to bottom, #241C15 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />

        {/* 圆 */}
        <div
          className="relative bg-butter border-2 border-ink rounded-full shadow-stamp-lg flex items-center justify-center transition-all duration-500 ease-spring"
          style={{
            width: `${radius * 1.6}px`,
            height: `${radius * 1.6}px`,
          }}
        >
          <div className="text-center px-2">
            <div className="font-display font-extrabold text-ink leading-none"
              style={{ fontSize: `clamp(16px, ${radius / 8}px, 28px)` }}
            >
              {current.paramsText}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/60 mt-1">
              parameters
            </div>
          </div>
        </div>

        {/* 模型名标签 */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0_0_#241C15]">
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-dot" />
          <span className="font-display font-extrabold text-[13px] text-ink">
            {current.name}
          </span>
        </div>

        {/* era 角标 */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-ink text-cream rounded-md font-mono text-[10px] uppercase tracking-[0.15em]">
          {current.era}
        </div>
      </div>

      {/* 滑块 */}
      <div className="mb-6">
        <input
          type="range"
          min={0}
          max={MODELS.length - 1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="w-full"
          aria-label="选择模型"
        />
        {/* 节点标签 */}
        <div className="flex justify-between mt-2.5 px-1">
          {MODELS.map((m, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`font-mono text-[9px] uppercase tracking-wide transition-colors ${
                i === index
                  ? "text-ink font-bold"
                  : "text-ink/35 hover:text-ink/60"
              }`}
              title={m.name}
            >
              {typeof m.year === "string" ? m.year : `'${String(m.year).slice(2)}`}
            </button>
          ))}
        </div>
      </div>

      {/* 增长曲线 + stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 增长曲线 */}
        <div className="bg-cream border-2 border-ink rounded-2xl p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
            参数增长曲线（对数轴）
          </div>
          <svg viewBox="0 0 100 100" className="w-full h-24" preserveAspectRatio="none">
            <path
              d={pathD}
              fill="none"
              stroke="#241C15"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {chartPoints.map((p) => (
              <circle
                key={p.i}
                cx={p.x}
                cy={p.y}
                r={p.i === index ? 3.2 : 1.6}
                fill={p.i === index ? "#E07A5F" : "#241C15"}
                stroke={p.i === index ? "#241C15" : "none"}
                strokeWidth={p.i === index ? 1 : 0}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>

        {/* stats */}
        <div className="bg-cream border-2 border-ink rounded-2xl p-4 space-y-2.5">
          <StatRow label="训练 Token" value={current.tokensText} />
          <StatRow
            label="参数量"
            value={current.paramsText}
            highlight
          />
          {current.note && (
            <div className="pt-2 border-t border-ink/15">
              <div className="font-sans text-[11px] text-ink/60 leading-snug">
                {current.note}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 提示 */}
      <div className="mt-5 px-4 py-2.5 bg-butter/40 border border-ink/15 rounded-lg">
        <div className="font-sans text-[12px] text-ink/75 leading-relaxed">
          <strong className="font-bold">观察：</strong>
          从 BERT 到 2026 年的 Frontier 模型，参数量跨越{" "}
          <span className="font-mono font-bold text-coral">5 个数量级</span>。
          注意 DeepSeek-V3 用 MoE 架构在 671B 总参数下只激活 37B —— 规模不再是唯一的衡量标准。
        </div>
      </div>
    </div>
  );
};

const StatRow: React.FC<{ label: string; value: string; highlight?: boolean }> = ({
  label,
  value,
  highlight,
}) => (
  <div className="flex items-baseline justify-between">
    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">
      {label}
    </span>
    <span
      className={`font-display font-extrabold ${
        highlight ? "text-[16px] text-coral" : "text-[14px] text-ink"
      }`}
    >
      {value}
    </span>
  </div>
);

export default ModelSizeAnimation;
