/**
 * Section 02 · loss 病曲线诊断
 *
 * 反直觉钩子开场：loss 在降，benchmark 没动 —— 业内叫 loss-task gap，
 *   是 LLM 后训练阶段最常见的坑。
 *
 * 5 张训练 loss 缩略图 chip，用户选一张，下方大图 + 诊断卡（症状 / 成因 / 改法）。
 *
 * 反相邻：上一节是 slider + 多曲线（L4）。这里换 chip 阵列选择（L2）+ 静态大图诊断。
 */
import React, { useMemo, useState } from "react";

type Scenario = {
  id: string;
  label: string;
  pillNote: string;
  /** 主 panel 视图 */
  primary: { points: number[]; label: string; color: string };
  /** 次 panel 视图 */
  secondary: { points: number[]; label: string; color: string; dashed?: boolean };
  /** 诊断 */
  symptom: string;
  cause: string;
  fix: string;
  /** y 轴最大值，控制画布缩放 */
  yMax: number;
};

const N_STEPS = 50;

/** 简易 noise（确定性的） */
function n(i: number, seed: number, amp: number): number {
  const v = Math.sin(i * (12.9898 + seed * 0.13) + seed * 7.13) * 43758.5453;
  return (v - Math.floor(v) - 0.5) * 2 * amp;
}

const SCENARIOS: Scenario[] = [
  {
    id: "healthy",
    label: "健康",
    pillNote: "train + val 同步下降",
    primary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        return 3 * Math.exp(-3.2 * t) + 0.42 + n(i, 1, 0.04);
      }),
      label: "train loss",
      color: "#241C15",
    },
    secondary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        return 3.1 * Math.exp(-2.7 * t) + 0.55 + n(i, 2, 0.05);
      }),
      label: "val loss",
      color: "#1B4B5A",
      dashed: true,
    },
    symptom: "train 和 val 一起从 3 滑到 ~0.5，两条线贴得很近。",
    cause: "数据量、模型容量、学习率都匹配 —— 这是基线，你应该看到的。",
    fix: "别动它，继续训，注意 val 什么时候开始抬头。",
    yMax: 3.5,
  },
  {
    id: "underfit",
    label: "卡平台",
    pillNote: "train loss 早早躺平",
    primary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        return 3 - 1.0 * (1 - Math.exp(-8 * t)) + n(i, 3, 0.03);
      }),
      label: "train loss",
      color: "#241C15",
    },
    secondary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        return 3.05 - 1.0 * (1 - Math.exp(-7 * t)) + n(i, 4, 0.04);
      }),
      label: "val loss",
      color: "#1B4B5A",
      dashed: true,
    },
    symptom: "train 一开始降得很快，到 2.0 就停下，怎么训都不动。",
    cause: "模型容量不够，或学习率太小，或数据没归一化 —— 进不去更深的解。",
    fix: "先把 LR 往大调（×3），不行就换更大模型 / 加 epoch / 检查归一化。",
    yMax: 3.5,
  },
  {
    id: "overfit",
    label: "过拟合",
    pillNote: "train 继续降，val 抬头",
    primary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        return 3 * Math.exp(-3.6 * t) + 0.18 + n(i, 5, 0.025);
      }),
      label: "train loss",
      color: "#241C15",
    },
    secondary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        const dip = 2.8 * Math.exp(-3.5 * t) + 0.6;
        const climb = t > 0.4 ? (t - 0.4) * 2.2 : 0;
        return dip + climb + n(i, 6, 0.04);
      }),
      label: "val loss",
      color: "#E07A5F",
      dashed: true,
    },
    symptom: "step 20 以后 train 还在降，val 调头往上爬，gap 越拉越大。",
    cause: "模型在背训练集 —— 容量过剩 / 数据太少 / 没正则。",
    fix: "加 weight decay 0.1、dropout 0.1、或直接早停在 val 的拐点。",
    yMax: 3.5,
  },
  {
    id: "explode",
    label: "LR 炸",
    pillNote: "loss 大幅震荡 / 飞掉",
    primary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        const base = 3 * Math.exp(-2 * t) + 0.5;
        const spike = Math.abs(n(i, 7, 1.6));
        const nan = i === 22 || i === 35 ? 2.5 : 0;
        return base + spike + nan;
      }),
      label: "train loss",
      color: "#241C15",
    },
    secondary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        return 3 * Math.exp(-1.8 * t) + 0.7 + Math.abs(n(i, 8, 1.2));
      }),
      label: "val loss",
      color: "#FF4D74",
      dashed: true,
    },
    symptom: "loss 在 1~5 之间剧烈摇摆，偶尔窜到天花板（NaN 前兆）。",
    cause: "学习率太大，或 batch 太小，或没做 gradient clipping。",
    fix: "LR 直接砍 ×0.3，加 warmup ≥ 2 K steps，clip_grad_norm=1.0 兜底。",
    yMax: 5,
  },
  {
    id: "taskgap",
    label: "loss-task gap",
    pillNote: "loss 在降，benchmark 不动",
    primary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        return 1.8 * Math.exp(-2.4 * t) + 0.32 + n(i, 9, 0.015);
      }),
      label: "train loss · NLL",
      color: "#241C15",
    },
    secondary: {
      points: Array.from({ length: N_STEPS }, (_, i) => {
        const t = i / (N_STEPS - 1);
        return 1.55 - 0.05 * t + n(i, 10, 0.06);
      }),
      label: "benchmark loss · MMLU 反推",
      color: "#E5BD3A",
      dashed: true,
    },
    symptom: "next-token NLL 一直在降，下游 benchmark 分数纹丝不动。",
    cause: "loss 在优化「下一 token 概率」，跟「答对题」是两件事 —— 这是 LLM 后训练里最难诊断的坑。",
    fix: "换 DPO / GRPO 等偏好或奖励驱动的 loss；或直接在评测集上挑 checkpoint，别只看 train loss。",
    yMax: 2.0,
  },
];

/* viewBox 600×220 */
const VB = { w: 600, h: 220 };
const PADL = 38;
const PADR = 20;
const PADT = 18;
const PADB = 32;

function mkPath(points: number[], yMax: number): string {
  const w = VB.w - PADL - PADR;
  const h = VB.h - PADT - PADB;
  return (
    "M " +
    points
      .map((y, i) => {
        const x = PADL + (i / (points.length - 1)) * w;
        const yy = PADT + h - (Math.min(Math.max(y, 0), yMax) / yMax) * h;
        return `${x.toFixed(1)} ${yy.toFixed(1)}`;
      })
      .join(" L ")
  );
}

const SectionCurveDoctor: React.FC = () => {
  const [picked, setPicked] = useState<string>("taskgap");
  const scn = useMemo(() => SCENARIOS.find((s) => s.id === picked)!, [picked]);

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">read the curve</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          loss 一直在降，
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">benchmark 一动不动</span>
          </span>
          ——
          <br />
          业内管这个叫 loss-task gap。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          训练 loss 是模型的私下复习成绩，benchmark 才是公开模考。两者背离时
          loss 给的好消息毫无意义。下面 5 种曲线是工程师最常遇到的几个 loss 故事，挑一张看诊断。
        </p>

        {/* chip 阵列 */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 mb-5">
          {SCENARIOS.map((s) => {
            const on = s.id === picked;
            return (
              <button
                key={s.id}
                onClick={() => setPicked(s.id)}
                className={[
                  "p-3 rounded-2xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp-lg"
                    : "bg-cream text-ink hover:bg-butter shadow-[2px_2px_0_0_#241C15] hover:shadow-stamp",
                ].join(" ")}
                aria-pressed={on}
              >
                <div
                  className={[
                    "font-mono text-[9px] uppercase tracking-[0.18em] mb-1",
                    on ? "text-butter" : "text-ink/55",
                  ].join(" ")}
                >
                  case 0{SCENARIOS.indexOf(s) + 1}
                </div>
                <div className="font-display text-[15px] font-bold leading-tight mb-1.5">
                  {s.label}
                </div>
                {/* mini sparkline */}
                <svg viewBox="0 0 100 36" className="w-full h-7">
                  <path
                    d={miniSparklinePath(s.secondary.points, s.yMax)}
                    fill="none"
                    stroke={on ? "#FBE891" : s.secondary.color}
                    strokeWidth="1.6"
                    strokeDasharray={s.secondary.dashed ? "2 2" : undefined}
                  />
                  <path
                    d={miniSparklinePath(s.primary.points, s.yMax)}
                    fill="none"
                    stroke={on ? "#FBEFE3" : s.primary.color}
                    strokeWidth="1.8"
                  />
                </svg>
                <div
                  className={[
                    "mt-1 font-mono text-[10px] leading-snug",
                    on ? "text-cream/70" : "text-ink/55",
                  ].join(" ")}
                >
                  {s.pillNote}
                </div>
              </button>
            );
          })}
        </div>

        {/* 大图诊断 */}
        <div className="grid lg:grid-cols-12 gap-4" key={scn.id}>
          {/* 左：大图 */}
          <div className="lg:col-span-7 bg-cream border-2 border-ink rounded-2xl shadow-stamp p-4 animate-enter-fade">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                training step → · y = loss
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-ink/65">
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-0.5" style={{ background: scn.primary.color }} />
                  {scn.primary.label}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span
                    className="w-3 h-0.5"
                    style={{
                      background: scn.secondary.color,
                      backgroundImage: scn.secondary.dashed
                        ? `repeating-linear-gradient(90deg, ${scn.secondary.color} 0 4px, transparent 4px 7px)`
                        : undefined,
                    }}
                  />
                  {scn.secondary.label}
                </span>
              </div>
            </div>
            <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-auto">
              {/* 网格 y */}
              {Array.from({ length: 4 }).map((_, i) => {
                const y = PADT + ((i + 1) / 5) * (VB.h - PADT - PADB);
                return (
                  <line
                    key={`gy-${i}`}
                    x1={PADL}
                    y1={y}
                    x2={VB.w - PADR}
                    y2={y}
                    stroke="#241C15"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                    opacity="0.18"
                  />
                );
              })}
              {/* y 刻度 */}
              {Array.from({ length: 5 }).map((_, i) => {
                const y = PADT + ((i + 1) / 5) * (VB.h - PADT - PADB);
                const label = scn.yMax * (1 - (i + 1) / 5);
                return (
                  <text
                    key={`yt-${i}`}
                    x={PADL - 6}
                    y={y + 3}
                    textAnchor="end"
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    fill="#88837C"
                  >
                    {label.toFixed(1)}
                  </text>
                );
              })}
              <line
                x1={PADL}
                y1={VB.h - PADB}
                x2={VB.w - PADR}
                y2={VB.h - PADB}
                stroke="#241C15"
                strokeWidth="1.5"
              />
              <line x1={PADL} y1={PADT} x2={PADL} y2={VB.h - PADB} stroke="#241C15" strokeWidth="1" opacity="0.5" />
              <text
                x={VB.w - PADR}
                y={VB.h - PADB + 22}
                textAnchor="end"
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#88837C"
              >
                step
              </text>

              {/* 次曲线 */}
              <path
                d={mkPath(scn.secondary.points, scn.yMax)}
                fill="none"
                stroke={scn.secondary.color}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeDasharray={scn.secondary.dashed ? "4 4" : undefined}
              />
              {/* 主曲线 */}
              <path
                d={mkPath(scn.primary.points, scn.yMax)}
                fill="none"
                stroke={scn.primary.color}
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 右：诊断三卡 */}
          <div className="lg:col-span-5 space-y-3 animate-enter-fade">
            <DiagCard tag="症状" tone="ink" text={scn.symptom} />
            <DiagCard tag="成因" tone="coral" text={scn.cause} />
            <DiagCard tag="改法" tone="teal" text={scn.fix} />
          </div>
        </div>
      </div>
    </section>
  );
};

const DiagCard: React.FC<{ tag: string; text: string; tone: "ink" | "coral" | "teal" }> = ({
  tag,
  text,
  tone,
}) => {
  const dot = tone === "ink" ? "bg-ink" : tone === "coral" ? "bg-coral" : "bg-teal";
  return (
    <div className="p-4 border-2 border-ink rounded-2xl bg-white shadow-stamp">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 font-semibold">
          {tag}
        </span>
      </div>
      <div className="text-[14.5px] text-ink leading-relaxed">{text}</div>
    </div>
  );
};

function miniSparklinePath(points: number[], yMax: number): string {
  const w = 100;
  const h = 36;
  return (
    "M " +
    points
      .map((y, i) => {
        const x = (i / (points.length - 1)) * w;
        const yy = h - (Math.min(Math.max(y, 0), yMax) / yMax) * h;
        return `${x.toFixed(1)} ${yy.toFixed(1)}`;
      })
      .join(" L ")
  );
}

export default SectionCurveDoctor;
