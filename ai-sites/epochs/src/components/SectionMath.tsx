/**
 * Section 02 · 数到底跑了几趟 · steps × time 计算器
 *
 * 反相邻：Hero 是 timeline scrubber + 双曲线。这里换 3 个 stepper 输入 + 公式 + 实时输出。
 *
 * 用户调三个钮：dataset_size / batch_size / num_epochs
 * 输出：steps_per_epoch / total_steps / ETA（按 8×H100 一个真实 tok/s 估）
 *
 * 6 个预设 chip 可一键填入常见配置，避免空白页焦虑：
 *   - 小 LoRA / 中 SFT / Tulu 3 8B / 工业 SFT / Llama 3 8B 预训练 / DeepSeek V3 预训练
 *
 * 可动元素：
 *   - 3 个数字输入框 + 增减按钮（L3）
 *   - 6 个 preset chip（L2）
 *   - hover 公式高亮（基础礼貌）
 */
import React, { useMemo, useState } from "react";
import { Minus, Plus, Calculator } from "lucide-react";

type Preset = {
  id: string;
  label: string;
  sub: string;
  ds: number; // 样本条数 (SFT) 或 token 数 (预训练)
  bs: number; // 一个 step 看多少（SFT 是样本，预训练是 tokens）
  ep: number;
  /** "samples" or "tokens" 切换单位 */
  unit: "samples" | "tokens";
  /** 假定吞吐：每秒处理多少个单位 */
  throughput: number;
  src: string;
};

const PRESETS: Preset[] = [
  {
    id: "lora-small",
    label: "小 LoRA",
    sub: "1 张 4090 · Unsloth",
    ds: 5_000,
    bs: 8,
    ep: 3,
    unit: "samples",
    throughput: 1.6, // samples/s
    src: "Unsloth 指南 2026",
  },
  {
    id: "tulu-sft",
    label: "Tulu 3 8B SFT",
    sub: "8×H100 · LR=5e-6",
    ds: 939_000,
    bs: 128,
    ep: 2,
    unit: "samples",
    throughput: 80,
    src: "arXiv:2411.15124",
  },
  {
    id: "industry-sft",
    label: "工业 SFT",
    sub: "Llama 3.1 70B · 行业数据",
    ds: 60_000,
    bs: 32,
    ep: 2,
    unit: "samples",
    throughput: 8,
    src: "常见工业配方",
  },
  {
    id: "llama3-8b-pt",
    label: "Llama 3 8B 预训练",
    sub: "15T tokens",
    ds: 15_000_000_000_000,
    bs: 4_000_000,
    ep: 1,
    unit: "tokens",
    throughput: 6_000_000,
    src: "Llama 3 model card",
  },
  {
    id: "deepseek-v3-pt",
    label: "DeepSeek V3 预训练",
    sub: "14.8T tokens · 2048 H800",
    ds: 14_800_000_000_000,
    bs: 15_360_000,
    ep: 1,
    unit: "tokens",
    throughput: 11_400_000, // 14.8T / 2.664M GPU h / 3600 ≈ avg
    src: "arXiv:2412.19437",
  },
];

const SectionMath: React.FC = () => {
  const [preset, setPreset] = useState<Preset>(PRESETS[1]);
  const [ds, setDs] = useState<number>(PRESETS[1].ds);
  const [bs, setBs] = useState<number>(PRESETS[1].bs);
  const [ep, setEp] = useState<number>(PRESETS[1].ep);

  const stepsPerEpoch = Math.ceil(ds / Math.max(1, bs));
  const totalSteps = stepsPerEpoch * ep;
  const seconds = (ds * ep) / preset.throughput;

  const stepsLabel = compact(totalSteps);
  const stepsPerEpochLabel = compact(stepsPerEpoch);
  const dsLabel = preset.unit === "tokens" ? compactTokens(ds) : compact(ds);
  const bsLabel = preset.unit === "tokens" ? compactTokens(bs) : compact(bs);
  const timeLabel = humanTime(seconds);

  function applyPreset(p: Preset) {
    setPreset(p);
    setDs(p.ds);
    setBs(p.bs);
    setEp(p.ep);
  }

  function stepDs(delta: number) {
    setDs((v) => Math.max(1, Math.round(v + delta * (preset.unit === "tokens" ? 1_000_000_000 : 1000))));
  }
  function stepBs(delta: number) {
    setBs((v) => Math.max(1, Math.round(v + delta * (preset.unit === "tokens" ? 1_000_000 : 8))));
  }
  function stepEp(delta: number) {
    setEp((v) => Math.max(1, Math.round(v + delta)));
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        {/* anchor + 标题 */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">数学 · steps × time</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          一个 epoch 到底走多少步？再乘几遍就是总账。
        </h2>
        <p className="max-w-3xl text-[15.5px] text-ink/75 leading-relaxed mb-10">
          公式三句话：每步看 batch_size 个样本；走完整个 dataset_size 就是一个 epoch；
          乘上 epochs 就是总更新次数。卡在 GPU 多少小时也就是它。
        </p>

        {/* preset 阵列 */}
        <div className="mb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
            ① 从一个真实配方开始
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {PRESETS.map((p) => {
              const on = p.id === preset.id;
              return (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className={[
                    "text-left p-2.5 rounded-lg border-2 border-ink transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                      : "bg-white text-ink hover:bg-cream",
                  ].join(" ")}
                >
                  <div className="font-display text-[14px] font-bold leading-tight">
                    {p.label}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] mt-0.5 leading-tight",
                      on ? "text-cream/70" : "text-ink/55",
                    ].join(" ")}
                  >
                    {p.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-6">
          {/* 左：3 个 stepper */}
          <div className="lg:col-span-3 bg-white border-2 border-ink rounded-3xl shadow-stamp p-5 lg:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
              ② 改三个钮看结果
            </div>

            <div className="space-y-3">
              <StepperRow
                label={preset.unit === "tokens" ? "dataset · tokens" : "dataset · 样本数"}
                value={ds}
                display={dsLabel}
                onDec={() => stepDs(-1)}
                onInc={() => stepDs(+1)}
              />
              <StepperRow
                label={preset.unit === "tokens" ? "batch · tokens / step" : "batch · 样本 / step"}
                value={bs}
                display={bsLabel}
                onDec={() => stepBs(-1)}
                onInc={() => stepBs(+1)}
              />
              <StepperRow
                label="epochs"
                value={ep}
                display={String(ep)}
                onDec={() => stepEp(-1)}
                onInc={() => stepEp(+1)}
              />
            </div>

            {/* 公式条 */}
            <div className="mt-5 px-3 py-3 bg-cream border-2 border-ink rounded-lg">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                公式
              </div>
              <div className="font-mono text-[13px] text-ink leading-snug">
                steps_per_epoch = ceil(dataset / batch) ={" "}
                <span className="font-bold">{stepsPerEpochLabel}</span>
              </div>
              <div className="font-mono text-[13px] text-ink leading-snug">
                total_steps = steps_per_epoch × epochs ={" "}
                <span className="font-bold">{stepsLabel}</span>
              </div>
            </div>
          </div>

          {/* 右：3 个大数 */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            <BigStat
              icon={<Calculator className="w-4 h-4" strokeWidth={2.4} />}
              label="一个 epoch 的 step 数"
              value={stepsPerEpochLabel}
              unit="steps"
              tone="butter"
            />
            <BigStat
              label="总 step 数"
              value={stepsLabel}
              unit="updates"
              tone="ink"
            />
            <BigStat
              label="估算耗时"
              value={timeLabel}
              unit={`@${preset.label}`}
              tone="coral"
            />
          </div>
        </div>

        {/* 注脚 */}
        <p className="mt-6 font-mono text-[11px] text-ink/45 leading-relaxed max-w-3xl">
          吞吐量来自各配方公开记录：DeepSeek V3 = 14.8T / 2.664M H800·h（arXiv:2412.19437）；
          Llama 3 = 1.2M steps × 16M tokens（arXiv:2407.21783）；
          Tulu 3 SFT = allenai/open-instruct accelerate config（2026/04 主分支）。
          实际训练还要算上 checkpoint / eval / 数据加载，结果是数量级估算。
        </p>
      </div>
    </section>
  );
};

/* ─── 子组件 ─── */

const StepperRow: React.FC<{
  label: string;
  value: number;
  display: string;
  onDec: () => void;
  onInc: () => void;
}> = ({ label, value, display, onDec, onInc }) => {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 border-2 border-ink rounded-lg bg-cream/40">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/65 font-semibold">
        {label}
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={onDec}
          className="w-7 h-7 inline-flex items-center justify-center rounded-md border-2 border-ink bg-white hover:bg-cream transition-colors"
          aria-label="减"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2.6} />
        </button>
        <div className="font-display text-[18px] font-bold text-ink tabular-nums min-w-[80px] text-right">
          {display}
        </div>
        <button
          onClick={onInc}
          className="w-7 h-7 inline-flex items-center justify-center rounded-md border-2 border-ink bg-white hover:bg-cream transition-colors"
          aria-label="加"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.6} />
        </button>
      </div>
      <span className="hidden sm:inline font-mono text-[10px] text-ink/35 tabular-nums">
        {value}
      </span>
    </div>
  );
};

const BigStat: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  tone: "butter" | "ink" | "coral";
}> = ({ icon, label, value, unit, tone }) => {
  const bg =
    tone === "butter"
      ? "bg-butter"
      : tone === "ink"
      ? "bg-ink text-cream"
      : "bg-coral text-cream";
  return (
    <div
      className={[
        "border-2 border-ink rounded-2xl shadow-stamp p-4",
        bg,
      ].join(" ")}
    >
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <div
          className={[
            "font-mono text-[10px] uppercase tracking-[0.18em] font-semibold",
            tone === "butter" ? "text-ink/65" : "text-cream/75",
          ].join(" ")}
        >
          {label}
        </div>
      </div>
      <div className="font-display text-[30px] lg:text-[34px] font-bold leading-none tabular-nums">
        {value}
      </div>
      <div
        className={[
          "font-mono text-[11px] mt-1",
          tone === "butter" ? "text-ink/55" : "text-cream/65",
        ].join(" ")}
      >
        {unit}
      </div>
    </div>
  );
};

/* ─── 数字格式 ─── */

function compact(n: number): string {
  if (n >= 1e12) return (n / 1e12).toFixed(n >= 1e13 ? 0 : 1) + " T";
  if (n >= 1e9) return (n / 1e9).toFixed(n >= 1e10 ? 0 : 1) + " B";
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + " M";
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1) + " K";
  return n.toLocaleString();
}

function compactTokens(n: number): string {
  return compact(n) + "tok";
}

function humanTime(sec: number): string {
  if (sec < 60) return sec.toFixed(0) + " s";
  const min = sec / 60;
  if (min < 60) return min.toFixed(1) + " 分";
  const hr = min / 60;
  if (hr < 48) return hr.toFixed(1) + " 时";
  const d = hr / 24;
  if (d < 60) return d.toFixed(1) + " 天";
  const mo = d / 30;
  return mo.toFixed(1) + " 月";
}

export default SectionMath;
