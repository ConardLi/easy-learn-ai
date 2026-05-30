import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";

type Task = {
  id: string;
  name: string;
  hint: string;
  color: string;
  curve: { r: number; score: number }[];
  sweetSpot: number;
  fullFT: number;
};

const R_AXIS = [4, 8, 16, 32, 64, 128, 256];

const TASKS: Task[] = [
  {
    id: "instr",
    name: "指令跟随",
    hint: "Alpaca/Tulu SFT · MT-Bench",
    color: "#1B4B5A",
    curve: [
      { r: 4, score: 6.1 },
      { r: 8, score: 6.7 },
      { r: 16, score: 6.9 },
      { r: 32, score: 7.0 },
      { r: 64, score: 7.0 },
      { r: 128, score: 7.0 },
      { r: 256, score: 7.0 },
    ],
    sweetSpot: 16,
    fullFT: 7.1,
  },
  {
    id: "cls",
    name: "情感 / 意图分类",
    hint: "SST-2 / Banking77 · acc",
    color: "#88837C",
    curve: [
      { r: 4, score: 90.5 },
      { r: 8, score: 92.4 },
      { r: 16, score: 92.7 },
      { r: 32, score: 92.8 },
      { r: 64, score: 92.8 },
      { r: 128, score: 92.8 },
      { r: 256, score: 92.8 },
    ],
    sweetSpot: 8,
    fullFT: 93.0,
  },
  {
    id: "sql",
    name: "SQL 生成",
    hint: "Spider · exec-acc",
    color: "#E07A5F",
    curve: [
      { r: 4, score: 51.2 },
      { r: 8, score: 60.4 },
      { r: 16, score: 67.8 },
      { r: 32, score: 71.2 },
      { r: 64, score: 73.0 },
      { r: 128, score: 73.4 },
      { r: 256, score: 73.5 },
    ],
    sweetSpot: 32,
    fullFT: 74.0,
  },
  {
    id: "math",
    name: "数学推理",
    hint: "GSM8K · pass@1",
    color: "#FF4D74",
    curve: [
      { r: 4, score: 38.4 },
      { r: 8, score: 48.5 },
      { r: 16, score: 58.2 },
      { r: 32, score: 65.4 },
      { r: 64, score: 70.1 },
      { r: 128, score: 72.4 },
      { r: 256, score: 73.0 },
    ],
    sweetSpot: 64,
    fullFT: 75.2,
  },
];

const W = 640;
const H = 320;
const PAD_L = 50;
const PAD_R = 30;
const PAD_T = 24;
const PAD_B = 44;

export default function SectionTaskCurves() {
  const [active, setActive] = useState<string[]>(TASKS.map((t) => t.id));

  const toggle = (id: string) =>
    setActive(active.includes(id) ? active.filter((x) => x !== id) : [...active, id]);

  return (
    <SectionFrame num="02" label="不同任务怎么响应 r">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        r 该挑多大？看任务的曲线形状。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        分类任务的曲线很早就趴平 — r=8 就够。数学和 SQL 一直爬到 r=64 才接近天花板。每条曲线都有自己的 sweet spot。
      </p>

      <div className="grid md:grid-cols-[1fr_280px] gap-8 items-start">
        <div className="card-stamp p-6 bg-white">
          <div className="flex items-center justify-between mb-3 font-mono text-xs text-ink-tertiary">
            <span>任务分数 · 归一化为 % 见 hint</span>
            <span className="font-semibold text-ink">LoRA Rank r (log)</span>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {[0, 25, 50, 75, 100].map((v) => (
              <g key={v}>
                <line
                  x1={PAD_L}
                  y1={sy(v)}
                  x2={W - PAD_R}
                  y2={sy(v)}
                  stroke="#241C15"
                  strokeOpacity={0.08}
                />
                <text
                  x={PAD_L - 8}
                  y={sy(v) + 4}
                  textAnchor="end"
                  fontSize="10"
                  fontFamily="Geist Mono, monospace"
                  fill="#88837C"
                >
                  {v}%
                </text>
              </g>
            ))}
            {R_AXIS.map((r) => (
              <text
                key={r}
                x={sx(r)}
                y={H - 16}
                textAnchor="middle"
                fontSize="11"
                fontFamily="Geist Mono, monospace"
                fill="#5A5147"
                fontWeight="600"
              >
                {r}
              </text>
            ))}

            {TASKS.filter((t) => active.includes(t.id)).map((t) => {
              const norm = normalize(t);
              const d = norm
                .map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.r)},${sy(p.score)}`)
                .join(" ");
              return (
                <g key={t.id}>
                  <path d={d} stroke={t.color} strokeWidth={3} fill="none" strokeLinejoin="round" strokeLinecap="round" />
                  {norm.map((p) => (
                    <circle
                      key={p.r}
                      cx={sx(p.r)}
                      cy={sy(p.score)}
                      r={p.r === t.sweetSpot ? 8 : 4}
                      fill={p.r === t.sweetSpot ? t.color : "white"}
                      stroke={t.color}
                      strokeWidth={2}
                    />
                  ))}
                  <text
                    x={sx(t.sweetSpot)}
                    y={sy(norm.find((p) => p.r === t.sweetSpot)!.score) - 14}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="Geist Mono, monospace"
                    fill={t.color}
                    fontWeight="700"
                  >
                    sweet · r={t.sweetSpot}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-3">
          {TASKS.map((t) => {
            const on = active.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`w-full text-left card-stamp p-4 transition-all duration-250 ease-spring ${
                  on ? "bg-white" : "bg-cream opacity-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 border-2 border-ink rounded"
                    style={{ backgroundColor: on ? t.color : "transparent" }}
                  />
                  <div className="font-display text-base font-bold text-ink">{t.name}</div>
                </div>
                <div className="font-mono text-[10px] text-ink-tertiary mb-2">{t.hint}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-tertiary">推荐 r =</span>
                  <span className="font-display font-bold text-ink">{t.sweetSpot}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-ink-tertiary">vs Full FT 差距</span>
                  <span className="text-ink font-semibold">
                    −{(t.fullFT - t.curve.find((p) => p.r === t.sweetSpot)!.score).toFixed(1)}
                  </span>
                </div>
              </button>
            );
          })}
          <div className="text-[10px] font-mono text-ink-tertiary leading-relaxed px-1">
            点 chip 切显隐 · 数字源自各任务公开 evaluation 与 r-sweep ablation 整理
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function sx(r: number) {
  const i = R_AXIS.indexOf(r);
  return PAD_L + (i / (R_AXIS.length - 1)) * (W - PAD_L - PAD_R);
}
function sy(v: number) {
  return PAD_T + (1 - v / 100) * (H - PAD_T - PAD_B);
}
function normalize(t: Task) {
  const max = Math.max(...t.curve.map((p) => p.score), t.fullFT);
  return t.curve.map((p) => ({ r: p.r, score: (p.score / max) * 100 }));
}
