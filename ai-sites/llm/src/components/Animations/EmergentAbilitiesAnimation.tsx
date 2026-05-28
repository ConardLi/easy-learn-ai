/**
 * 涌现能力动画 · 交互式相变曲线
 *
 * 设计：
 *   ─ 用户切换任务 + 拖动"模型规模"滑块，观察准确率突变
 *   ─ X 轴：训练算力（log FLOPs），Y 轴：任务准确率
 *   ─ 曲线在某个规模附近从"近乎随机"跃迁到"高准确率" —— 即涌现现象
 *   ─ 滑块当前位置实时高亮 + 状态标签（未达到 / 临界点 / 已涌现）
 *   ─ 3 个 representative task 来自 Wei et al. 2022 论文 Figure 2
 *
 * 数据来源：
 *   ─ Wei, J. et al. "Emergent Abilities of Large Language Models" (TMLR 2022)
 *   ─ 准确率为论文图示拟合值；FLOPs 为公开训练规模估算
 */
import React, { useMemo, useState } from "react";

interface TaskCurve {
  id: string;
  name: string;
  benchmark: string;
  baseline: number; // 随机基线
  /** 拐点 FLOPs（log10） */
  pivot: number;
  /** [logFlops, accuracy] 点 */
  curve: [number, number][];
  insight: string;
}

const TASKS: TaskCurve[] = [
  {
    id: "math_add",
    name: "8 位数加法",
    benchmark: "Modular Arithmetic",
    baseline: 0,
    pivot: 22,
    curve: [
      [18, 0.01], [19, 0.01], [20, 0.02], [21, 0.04],
      [22, 0.15], [22.5, 0.45], [23, 0.82], [24, 0.95],
    ],
    insight: "BERT、GPT-2 几乎完全做不对；GPT-3 之后能力突然解锁。",
  },
  {
    id: "gsm8k",
    name: "GSM8K · 数学应用题",
    benchmark: "Chain-of-Thought 推理",
    baseline: 0,
    pivot: 23,
    curve: [
      [18, 0.01], [19, 0.01], [20, 0.02], [21, 0.03],
      [22, 0.05], [22.5, 0.10], [23, 0.35], [23.5, 0.60], [24, 0.78],
    ],
    insight: "需要超大模型 + 思维链提示才能解锁，是涌现能力的典型代表。",
  },
  {
    id: "wic",
    name: "Word-in-Context · 语义判断",
    benchmark: "Big-Bench Hard 子任务",
    baseline: 0.5,
    pivot: 22.8,
    curve: [
      [18, 0.50], [19, 0.50], [20, 0.50], [21, 0.50],
      [22, 0.51], [22.5, 0.55], [23, 0.68], [24, 0.78],
    ],
    insight: "二选一任务从 50% 随机开始，规模够大后突破到 78%+。",
  },
];

/* 参考模型在 log FLOPs 轴上的位置 */
const ANCHORS: { name: string; flops: number; tone: "ink" | "coral" }[] = [
  { name: "BERT", flops: 19, tone: "ink" },
  { name: "GPT-3", flops: 22.5, tone: "coral" },
  { name: "PaLM", flops: 23.5, tone: "ink" },
];

const X_MIN = 18;
const X_MAX = 24;

const EmergentAbilitiesAnimation: React.FC = () => {
  const [taskId, setTaskId] = useState(TASKS[0].id);
  const [flops, setFlops] = useState(22); // log10 FLOPs

  const task = useMemo(
    () => TASKS.find((t) => t.id === taskId) ?? TASKS[0],
    [taskId],
  );

  /* 在当前 flops 下用线性插值算准确率 */
  const accuracy = useMemo(() => {
    const c = task.curve;
    if (flops <= c[0][0]) return c[0][1];
    if (flops >= c[c.length - 1][0]) return c[c.length - 1][1];
    for (let i = 0; i < c.length - 1; i++) {
      if (flops >= c[i][0] && flops <= c[i + 1][0]) {
        const t = (flops - c[i][0]) / (c[i + 1][0] - c[i][0]);
        return c[i][1] + t * (c[i + 1][1] - c[i][1]);
      }
    }
    return 0;
  }, [flops, task]);

  /* 当前状态（基于 pivot） */
  const state = useMemo(() => {
    const margin = 0.4;
    if (flops < task.pivot - margin) return { label: "🔇 未达到", color: "ink/45" };
    if (flops < task.pivot + margin) return { label: "⚡ 临界点", color: "coral" };
    return { label: "✅ 已涌现", color: "teal" };
  }, [flops, task]);

  /* SVG 坐标映射：viewBox 100x100 */
  const xMap = (x: number) => ((x - X_MIN) / (X_MAX - X_MIN)) * 100;
  const yMap = (y: number) => 100 - y * 100;

  const pathD = useMemo(
    () =>
      task.curve
        .map((p, i) => `${i === 0 ? "M" : "L"}${xMap(p[0])},${yMap(p[1])}`)
        .join(" "),
    [task],
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1.5">
            INTERACTIVE · 拖动观察相变
          </div>
          <h3 className="font-display font-extrabold text-[20px] text-ink">
            涌现能力 · Emergent Abilities
          </h3>
        </div>
      </div>

      {/* 任务切换 chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TASKS.map((t) => {
          const active = t.id === task.id;
          return (
            <button
              key={t.id}
              onClick={() => setTaskId(t.id)}
              className={`px-3 py-1.5 border-2 border-ink rounded-full font-sans font-bold text-[11px] transition-all duration-200 ease-spring ${
                active
                  ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                  : "bg-white text-ink hover:bg-butter hover:-translate-y-[1px]"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      {/* SVG Chart */}
      <div className="relative bg-cream border-2 border-ink rounded-2xl p-4 mb-5">
        <svg viewBox="0 0 100 100" className="w-full h-[220px]" preserveAspectRatio="none">
          {/* 网格线 */}
          {[0.25, 0.5, 0.75].map((y) => (
            <line
              key={`gy-${y}`}
              x1="0"
              x2="100"
              y1={yMap(y)}
              y2={yMap(y)}
              stroke="#241C15"
              strokeOpacity="0.1"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* baseline */}
          {task.baseline > 0 && (
            <line
              x1="0"
              x2="100"
              y1={yMap(task.baseline)}
              y2={yMap(task.baseline)}
              stroke="#88837C"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          )}

          {/* 涌现拐点垂直线 */}
          <line
            x1={xMap(task.pivot)}
            x2={xMap(task.pivot)}
            y1="0"
            y2="100"
            stroke="#E07A5F"
            strokeOpacity="0.35"
            strokeDasharray="4 2"
            vectorEffect="non-scaling-stroke"
          />

          {/* 曲线 */}
          <path
            d={pathD}
            fill="none"
            stroke="#241C15"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 曲线节点 */}
          {task.curve.map(([x, y], i) => (
            <circle
              key={i}
              cx={xMap(x)}
              cy={yMap(y)}
              r="1.6"
              fill="#241C15"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* 锚点模型标签 */}
          {ANCHORS.map((a) => (
            <g key={a.name}>
              <line
                x1={xMap(a.flops)}
                x2={xMap(a.flops)}
                y1="0"
                y2="100"
                stroke={a.tone === "coral" ? "#E07A5F" : "#241C15"}
                strokeOpacity="0.15"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}

          {/* 当前位置游标 */}
          <line
            x1={xMap(flops)}
            x2={xMap(flops)}
            y1="0"
            y2="100"
            stroke="#1B4B5A"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={xMap(flops)}
            cy={yMap(accuracy)}
            r="4"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* X 轴标签 */}
        <div className="flex justify-between mt-2 font-mono text-[9px] uppercase tracking-wide text-ink/55">
          <span>10¹⁸</span>
          <span>10²⁰</span>
          <span>10²²</span>
          <span>10²⁴</span>
        </div>
        <div className="text-center font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mt-1">
          训练算力（FLOPs · log scale）
        </div>

        {/* Y 轴标签 */}
        <div className="absolute -left-1 top-4 font-mono text-[9px] uppercase tracking-wide text-ink/55">
          100%
        </div>
        <div className="absolute -left-1 bottom-12 font-mono text-[9px] uppercase tracking-wide text-ink/55">
          0%
        </div>

        {/* 锚点模型 chip */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {ANCHORS.map((a) => (
            <div
              key={a.name}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/95 border border-ink/30 rounded-md font-mono text-[9px] text-ink"
            >
              <span
                className={`w-1 h-1 rounded-full ${
                  a.tone === "coral" ? "bg-coral" : "bg-ink"
                }`}
              />
              {a.name}
            </div>
          ))}
        </div>
      </div>

      {/* 滑块 */}
      <div className="mb-5">
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
            模型规模（log FLOPs）
          </span>
          <span className="font-display font-extrabold text-[14px] text-ink">
            10<sup>{flops.toFixed(1)}</sup>
          </span>
        </div>
        <input
          type="range"
          min={X_MIN}
          max={X_MAX}
          step={0.1}
          value={flops}
          onChange={(e) => setFlops(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Stats 行 */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatBox
          label="当前准确率"
          value={`${Math.round(accuracy * 100)}%`}
          accent="coral"
        />
        <StatBox
          label="任务基线"
          value={`${Math.round(task.baseline * 100)}%`}
          accent="ink"
        />
        <StatBox label="状态" value={state.label} accent={state.color} />
      </div>

      {/* Insight 提示 */}
      <div className="px-4 py-3 bg-butter/40 border border-ink/15 rounded-lg">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-1">
          § 关于这个任务
        </div>
        <div className="font-sans text-[12px] text-ink/75 leading-relaxed">
          <strong className="font-bold">{task.benchmark}：</strong>
          {task.insight}
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string; accent: string }> = ({
  label,
  value,
  accent,
}) => {
  const colorMap: Record<string, string> = {
    coral: "text-coral",
    ink: "text-ink",
    teal: "text-teal",
    "ink/45": "text-ink/45",
  };
  return (
    <div className="bg-cream border-2 border-ink rounded-xl px-3 py-2.5">
      <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55 mb-1">
        {label}
      </div>
      <div
        className={`font-display font-extrabold text-[16px] leading-tight ${colorMap[accent] ?? "text-ink"}`}
      >
        {value}
      </div>
    </div>
  );
};

export default EmergentAbilitiesAnimation;
