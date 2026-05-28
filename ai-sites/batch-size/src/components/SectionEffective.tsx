/**
 * Section 04 · effective batch 乘法器
 *
 * 反相邻：上一节是 pill + 1D landscape。这里换成 3 个 stepper（+/−）+ 场景预设。
 *
 * 主交互：
 *   ① 3 个 stepper：micro batch / gradient accumulation / data parallel GPU 数 —— L3
 *   ② 4 个预设场景按钮（消费级 / 单 H100 / 8×H100 / Llama 3 405B）
 *   ③ 实时输出：effective batch · 单卡显存 · OOM 风险（颜色阶）
 *
 * 教育意图：让用户亲手算出「effective = micro × accum × dp」这个最常被搞错的等式，
 *   并理解显存只跟 micro 走，accum 不耗额外显存。
 */
import React, { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";

type Scenario = {
  name: string;
  note: string;
  micro: number;
  accum: number;
  dp: number;
  /** 单卡显存 GB（参考） */
  vramGB: number;
};

const SCENARIOS: Scenario[] = [
  {
    name: "RTX 4090 · QLoRA",
    note: "Unsloth 默认 · 单卡 24 GB",
    micro: 2,
    accum: 4,
    dp: 1,
    vramGB: 24,
  },
  {
    name: "H100 · 单卡全参微调",
    note: "Axolotl 全参微调 · Llama 8B",
    micro: 4,
    accum: 4,
    dp: 1,
    vramGB: 80,
  },
  {
    name: "8 × H100 · DDP",
    note: "工业微调常见配置",
    micro: 4,
    accum: 8,
    dp: 8,
    vramGB: 80,
  },
  {
    name: "Llama 3 405B · 预训练",
    note: "16K H100 · global=16 M tokens · seq=8K",
    micro: 1,
    accum: 16,
    dp: 128,
    vramGB: 80,
  },
];

/** 每个 micro batch 的近似显存 GB（按 seq_len=4096 · 7 B 模型的粗估 · LoRA） */
function vramPerMicro(micro: number): number {
  return 8 + micro * 3.5; // 基线 8 GB（模型本体 + 优化器）+ 每 micro 3.5 GB activations
}

const SectionEffective: React.FC = () => {
  const [micro, setMicro] = useState(2);
  const [accum, setAccum] = useState(4);
  const [dp, setDp] = useState(1);
  const [vramCap, setVramCap] = useState(24);

  const effective = micro * accum * dp;
  const vram = vramPerMicro(micro);
  const oomPct = (vram / vramCap) * 100;
  const oomTag =
    oomPct > 95 ? "OOM 风险" : oomPct > 75 ? "紧" : oomPct > 40 ? "正常" : "宽松";
  const oomColor =
    oomPct > 95 ? "text-coral" : oomPct > 75 ? "text-ink" : oomPct > 40 ? "text-teal" : "text-ink-tertiary";

  /* effective batch tokens（按 seq=4096） */
  const effTokens = effective * 4096;

  const pickScenario = (s: Scenario) => {
    setMicro(s.micro);
    setAccum(s.accum);
    setDp(s.dp);
    setVramCap(s.vramGB);
  };

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">effective = micro × accum × dp</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一个 step 真正用了多少样本？
          <br />
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">三个数字相乘</span>
          </span>
          就是。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          单卡塞不下大 batch？把它拆三层。
          <strong className="text-ink">micro</strong> 是一次塞进显存的样本数，
          <strong className="text-ink">accum</strong> 是攒几次梯度才更新，
          <strong className="text-ink">dp</strong> 是几张卡并行同步。三个相乘 = effective batch。
          显存只跟 micro 走 —— 这是 grad accumulation 能省显存的根本原因。
        </p>

        {/* 预设场景 4 卡 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {SCENARIOS.map((s) => {
            const on = s.micro === micro && s.accum === accum && s.dp === dp && s.vramGB === vramCap;
            return (
              <button
                key={s.name}
                onClick={() => pickScenario(s)}
                className={[
                  "p-3 rounded-2xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp-lg"
                    : "bg-cream text-ink hover:bg-butter shadow-[2px_2px_0_0_#241C15] hover:shadow-stamp",
                ].join(" ")}
              >
                <div
                  className={[
                    "font-mono text-[9px] uppercase tracking-[0.18em] mb-1",
                    on ? "text-butter" : "text-ink/55",
                  ].join(" ")}
                >
                  preset
                </div>
                <div className="font-display text-[14px] font-bold leading-tight">
                  {s.name}
                </div>
                <div
                  className={[
                    "mt-1 font-mono text-[10px]",
                    on ? "text-cream/65" : "text-ink/55",
                  ].join(" ")}
                >
                  {s.note}
                </div>
              </button>
            );
          })}
        </div>

        {/* 主体：3 stepper + 结果卡 */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：3 stepper */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-3">
            <Stepper
              label="micro batch"
              sub="一次塞进显存"
              value={micro}
              min={1}
              max={64}
              step={1}
              onChange={setMicro}
              accent="coral"
            />
            <Stepper
              label="grad accum"
              sub="攒几次再更新"
              value={accum}
              min={1}
              max={64}
              step={1}
              onChange={setAccum}
              accent="teal"
            />
            <Stepper
              label="dp (GPUs)"
              sub="数据并行卡数"
              value={dp}
              min={1}
              max={1024}
              step={dp >= 64 ? 8 : 1}
              onChange={setDp}
              accent="butter-deep"
            />
          </div>

          {/* 右：结果卡 */}
          <div className="lg:col-span-5 p-5 border-2 border-ink rounded-2xl bg-butter/30 shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
              effective batch · micro × accum × dp
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-[44px] font-bold text-ink tabular-nums leading-none">
                {effective.toLocaleString()}
              </span>
              <span className="font-mono text-[12px] text-ink/55">samples</span>
            </div>
            <div className="font-mono text-[12px] text-ink/65 mb-4">
              ≈ <span className="font-bold text-ink">{formatTokens(effTokens)}</span> tokens · 按 seq=4 K 算
            </div>

            {/* 公式 */}
            <div className="p-3 border-2 border-ink rounded-xl bg-ink text-cream font-mono text-[12px] mb-3">
              <span className="text-coral font-bold tabular-nums">{micro}</span>
              <span className="text-cream/55 mx-1.5">×</span>
              <span className="text-teal font-bold tabular-nums" style={{ color: "#7FD8C5" }}>
                {accum}
              </span>
              <span className="text-cream/55 mx-1.5">×</span>
              <span className="text-butter font-bold tabular-nums">{dp}</span>
              <span className="text-cream/55 mx-2">=</span>
              <span className="text-cream font-bold tabular-nums">{effective.toLocaleString()}</span>
            </div>

            {/* 显存条 */}
            <div className="border-t border-ink/15 pt-3">
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  per-GPU VRAM · 7 B model
                </div>
                <div className={["font-mono text-[11px] font-bold", oomColor].join(" ")}>
                  {oomTag}
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[20px] font-bold text-ink tabular-nums leading-none">
                  {vram.toFixed(1)}
                </span>
                <span className="font-mono text-[11px] text-ink/55">/ {vramCap} GB</span>
              </div>
              <div className="mt-1.5 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                <div
                  className={[
                    "h-full transition-all duration-400 ease-spring",
                    oomPct > 95 ? "bg-coral" : oomPct > 75 ? "bg-butter-deep" : "bg-teal",
                  ].join(" ")}
                  style={{ width: `${Math.min(100, oomPct)}%` }}
                />
              </div>
              <div className="mt-2 font-mono text-[10px] text-ink/55 leading-snug">
                {oomPct > 95
                  ? "OOM 风险 · 把 micro 降到 1，accum 拉到 16，effective 不变"
                  : oomPct > 75
                    ? "已经吃满 · 可以试 packing=True 再压一压"
                    : "余量充足 · 可以加 micro 跑得更快"}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-[10px] text-ink/40">
          来源：Unsloth LoRA Hyperparameters Guide 2026 · Axolotl QLoRA config · DeepSeek V3 / Llama 3 实际配置
        </p>
      </div>
    </section>
  );
};

const Stepper: React.FC<{
  label: string;
  sub: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  accent: "coral" | "teal" | "butter-deep";
}> = ({ label, sub, value, min, max, step, onChange, accent }) => {
  const accentCls =
    accent === "coral" ? "bg-coral" : accent === "teal" ? "bg-teal" : "bg-butter-deep";
  return (
    <div className="p-4 border-2 border-ink rounded-2xl bg-cream relative overflow-hidden">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-0.5">
        {label}
      </div>
      <div className="font-mono text-[10px] text-ink/45 mb-3">{sub}</div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={value <= min}
          className="w-9 h-9 flex items-center justify-center border-2 border-ink rounded-full bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-butter transition-all duration-200"
          aria-label={`decrease ${label}`}
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>

        <div className="flex-1 text-center">
          <div className="font-display text-[34px] font-bold text-ink tabular-nums leading-none">
            {value}
          </div>
        </div>

        <button
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          className="w-9 h-9 flex items-center justify-center border-2 border-ink rounded-full bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-butter transition-all duration-200"
          aria-label={`increase ${label}`}
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>

      {/* 装饰小条 */}
      <div className="mt-3 h-1.5 bg-ink/8 rounded-full overflow-hidden">
        <div
          className={`h-full ${accentCls} transition-all duration-400`}
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
    </div>
  );
};

function formatTokens(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + " M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + " K";
  return n.toString();
}

export default SectionEffective;
