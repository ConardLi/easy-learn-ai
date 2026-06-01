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
    paramsText: "1.1 亿",
    tokensT: 0.003,
    tokensText: "33 亿字",
    era: "预训练路线起步",
    note: "Google · 当时已经被认为很大了",
  },
  {
    name: "GPT-2",
    year: 2019,
    paramsB: 1.5,
    paramsText: "15 亿",
    tokensT: 0.04,
    tokensText: "400 亿字",
    era: "OpenAI 起步款",
    note: "OpenAI · 接龙模型路线确立",
  },
  {
    name: "GPT-3",
    year: 2020,
    paramsB: 175,
    paramsText: "1750 亿",
    tokensT: 0.3,
    tokensText: "3000 亿字",
    era: "「LLM」开始被叫这个名字",
    note: "OpenAI · 给几个例子就能学新任务",
  },
  {
    name: "PaLM",
    year: 2022,
    paramsB: 540,
    paramsText: "5400 亿",
    tokensT: 0.78,
    tokensText: "7800 亿字",
    era: "Google 加码同台",
    note: "Google · 同年底 ChatGPT 发布",
  },
  {
    name: "Llama 3.1 405B",
    year: 2024,
    paramsB: 405,
    paramsText: "4050 亿",
    tokensT: 15,
    tokensText: "15 万亿字",
    era: "开源也能这么大",
    note: "Meta · 喂的字数是 GPT-3 的 50 倍",
  },
  {
    name: "DeepSeek-V3",
    year: 2024,
    paramsB: 671,
    paramsText: "6710 亿（每次只用 370 亿）",
    tokensT: 14.8,
    tokensText: "14.8 万亿字",
    era: "更省的国产大模型",
    note: "DeepSeek · 训练只花了 $558 万",
  },
  {
    name: "Claude Opus 4.7",
    year: 2026,
    paramsB: 3000, // 估算，仅用于图表比例
    paramsText: "未公开",
    tokensT: -1,
    tokensText: "未公开",
    era: "2026 顶级款",
    note: "Anthropic · 写代码的水平接近资深工程师",
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
            拖滑块体验
          </div>
          <h3 className="font-display font-extrabold text-[20px] text-ink">
            7 款代表模型 · 脑子有多大
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
              个旋钮 · 参数
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
            参数增长曲线 · 纵轴每格 ×10
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
          <StatRow label="读过多少字" value={current.tokensText} />
          <StatRow
            label="脑子里旋钮数"
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
          <strong className="font-bold">看到了吗：</strong>
          从 BERT（1.1 亿）到 2026 顶级款（万亿级别），脑子大了
          <span className="font-mono font-bold text-coral"> 一万倍以上</span>。
          DeepSeek-V3 那一档比较特别 —— 总共有 6710 亿个旋钮，但每次回答只动用其中 370 亿（这种"分组工作"的设计行话叫
          <span className="font-mono text-ink/70"> MoE</span>，知道有这事就行）。
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
