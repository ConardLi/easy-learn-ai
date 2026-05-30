/**
 * Section 01 · Hero「训练轮数是什么？」
 *
 * Hero 开场纪律：
 *   ─ H1 = 「训练轮数是什么？」 + 一句话陈述定义
 *   ─ 反直觉钩子（"GPT 只看 1 遍"）放在过渡句和 Section 04，不是 H1
 *
 * 反模板（避开 6 个邻居）：
 *   ─ 不抢 quantization 的 7-pill 离散选择（这里 slider 是连续 epoch 数）
 *   ─ 不抢 batch-size 的 1D loss landscape ball drop（这里是双曲线 + cursor）
 *   ─ 不抢 loss 的 chip 选场景（这里直接拖一根 timeline cursor）
 *   ─ 不抢 distill 的 T slider + 5 类柱（这里是 2 条线 + 早停 marker）
 *
 * 视觉锚：用户拖 epoch slider（0..15），cursor 沿 train/val 双曲线扫，
 *   实时显示当前 epoch 的 train_loss / val_loss / 是否过拟合 / 早停最佳点 marker。
 *
 * 可动元素：
 *   - 主 slider（L3 连续 epoch 0..15）
 *   - 4 个 quick-pick chip（SFT / LoRA / 预训练 / 视觉小数据）—— L2，跳到不同曲线 shape
 *   - hover：曲线点位 hover 看精确值（基础礼貌）
 */
import React, { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

/* ─── 曲线参数表 ─── */
/* 不同场景下 train/val loss 的形状，每条曲线 16 个采样点（epoch 0..15）。
   bestEpoch = val loss 最低的那个 epoch ; valExplode = 过拟合开始的 epoch。 */
type Scenario = {
  id: string;
  label: string;
  sub: string;
  /** train loss generator，epoch e -> loss */
  trainFn: (e: number) => number;
  /** val loss generator */
  valFn: (e: number) => number;
  /** 推荐停在哪个 epoch */
  bestEpoch: number;
  note: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "sft",
    label: "SFT 微调",
    sub: "Tulu 3 配方：2 epoch 是甜区",
    trainFn: (e) => 2.4 * Math.exp(-0.85 * e) + 0.32,
    valFn: (e) => {
      const base = 2.5 * Math.exp(-0.75 * e) + 0.48;
      const over = e > 2 ? 0.12 * Math.pow(e - 2, 1.4) : 0;
      return base + over;
    },
    bestEpoch: 2,
    note: "train 还在降，val 在 epoch 2 已经回头",
  },
  {
    id: "lora",
    label: "LoRA 微调",
    sub: "Unsloth 默认：3 epoch",
    trainFn: (e) => 1.9 * Math.exp(-0.55 * e) + 0.42,
    valFn: (e) => {
      const base = 2.0 * Math.exp(-0.5 * e) + 0.55;
      const over = e > 4 ? 0.06 * Math.pow(e - 4, 1.3) : 0;
      return base + over;
    },
    bestEpoch: 4,
    note: "比 SFT 缓，但 5 epoch 后 val 也开始抬头",
  },
  {
    id: "pretrain",
    label: "LLM 预训练",
    sub: "Llama 3 / DeepSeek V3：1 epoch",
    trainFn: (e) => 2.6 * Math.exp(-0.3 * e) + 0.5,
    valFn: (e) => 2.65 * Math.exp(-0.28 * e) + 0.52,
    bestEpoch: 14,
    note: "数据量太大，根本走不完 2 遍 · 两条线一路贴着降",
  },
  {
    id: "small",
    label: "视觉小数据",
    sub: "ResNet on CIFAR-10：30+ epoch",
    trainFn: (e) => 1.6 * Math.exp(-0.18 * e) + 0.2,
    valFn: (e) => 1.7 * Math.exp(-0.16 * e) + 0.42,
    bestEpoch: 12,
    note: "传统 DL：epoch 多正常，早停只在最后微调",
  },
];

const EPOCHS_MAX = 15;
const N_POINTS = EPOCHS_MAX + 1; // 0..15 inclusive

/* SVG 坐标系 */
const VB_W = 560;
const VB_H = 280;
const PAD_L = 44;
const PAD_R = 22;
const PAD_T = 18;
const PAD_B = 38;
const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;
const Y_MAX = 3;

function xAt(epoch: number) {
  return PAD_L + (epoch / EPOCHS_MAX) * PLOT_W;
}
function yAt(loss: number) {
  return PAD_T + (Math.min(loss, Y_MAX) / Y_MAX) * PLOT_H;
}

const SectionHero: React.FC = () => {
  const [scenarioId, setScenarioId] = useState<string>("sft");
  const [epoch, setEpoch] = useState<number>(2);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];

  /* 预计算两条曲线全部点 */
  const trainPoints = useMemo(
    () => Array.from({ length: N_POINTS }, (_, i) => scenario.trainFn(i)),
    [scenario],
  );
  const valPoints = useMemo(
    () => Array.from({ length: N_POINTS }, (_, i) => scenario.valFn(i)),
    [scenario],
  );

  const trainPath = useMemo(() => makePath(trainPoints), [trainPoints]);
  const valPath = useMemo(() => makePath(valPoints), [valPoints]);

  const curTrain = trainPoints[epoch];
  const curVal = valPoints[epoch];
  const gap = curVal - curTrain;
  const overfit = epoch > scenario.bestEpoch && curVal > valPoints[scenario.bestEpoch] + 0.02;

  /* 切场景时把 epoch 跳到推荐最佳 epoch */
  function switchScenario(id: string) {
    const s = SCENARIOS.find((x) => x.id === id);
    if (!s) return;
    setScenarioId(id);
    setEpoch(s.bestEpoch);
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动小装饰 */}
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Epochs · 训练轮数
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              训练轮数
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  一个 epoch 是模型把整份训练数据完整看一遍。训几个 epoch 是个超参。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                训练时不可能一口气把全部数据塞进显卡，所以拆成小批次（batch）。
                把全部 batch 跑一轮，叫一个 epoch。
              </p>
              <p>
                训太少 = 模型还没学会题型；训太多 = 把训练题背下来，新题反而做不对。
                这中间有个最甜的 epoch 数。
              </p>
              <p>
                业内 2026 年的共识：LLM 预训练只跑 1 遍数据；SFT 跑 2 遍；LoRA 跑 3 遍。
                往上加都得想清楚为什么。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡，是把训练过程「倒带」给你看。
              拖 epoch slider，看 train 和 val 两条 loss 曲线什么时候开始分家。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 6 章 · ~10 分钟
              </div>
            </div>
          </div>

          {/* 右：可视化卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              {/* 场景 chip 阵列 */}
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 训练任务
                </div>
                <div className="font-mono text-[10px] text-ink/45">
                  {scenario.sub}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mb-5">
                {SCENARIOS.map((s) => {
                  const on = s.id === scenarioId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => switchScenario(s.id)}
                      className={[
                        "py-2 px-2 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring leading-tight",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/65 hover:bg-cream",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* 双曲线图 */}
              <div className="rounded-xl border-2 border-ink/15 bg-cream/40 p-2">
                <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto" aria-hidden>
                  {/* 网格 + 坐标 */}
                  <g>
                    {[0, 1, 2, 3].map((y) => (
                      <line
                        key={`hg-${y}`}
                        x1={PAD_L}
                        x2={VB_W - PAD_R}
                        y1={yAt(y)}
                        y2={yAt(y)}
                        stroke="#241C15"
                        strokeOpacity={y === 0 ? 0.5 : 0.08}
                        strokeWidth={y === 0 ? 1.4 : 1}
                      />
                    ))}
                    {Array.from({ length: 6 }, (_, i) => i * 3).map((x) => (
                      <line
                        key={`vg-${x}`}
                        x1={xAt(x)}
                        x2={xAt(x)}
                        y1={PAD_T}
                        y2={VB_H - PAD_B}
                        stroke="#241C15"
                        strokeOpacity={0.06}
                        strokeWidth={1}
                      />
                    ))}
                    {/* x 轴 label */}
                    {[0, 3, 6, 9, 12, 15].map((x) => (
                      <text
                        key={`xl-${x}`}
                        x={xAt(x)}
                        y={VB_H - PAD_B + 16}
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="10"
                        fill="#88837C"
                      >
                        {x}
                      </text>
                    ))}
                    {/* y 轴 label */}
                    {[0, 1, 2, 3].map((y) => (
                      <text
                        key={`yl-${y}`}
                        x={PAD_L - 8}
                        y={yAt(y) + 4}
                        textAnchor="end"
                        fontFamily="Geist Mono, monospace"
                        fontSize="10"
                        fill="#88837C"
                      >
                        {y.toFixed(1)}
                      </text>
                    ))}
                    <text
                      x={VB_W - PAD_R - 4}
                      y={VB_H - PAD_B + 16}
                      textAnchor="end"
                      fontFamily="Geist Mono, monospace"
                      fontSize="10"
                      fill="#241C15"
                      fontWeight="600"
                    >
                      epoch →
                    </text>
                    <text
                      x={PAD_L - 36}
                      y={PAD_T + 4}
                      fontFamily="Geist Mono, monospace"
                      fontSize="10"
                      fill="#241C15"
                      fontWeight="600"
                    >
                      loss
                    </text>
                  </g>

                  {/* train 曲线（实线 · ink） */}
                  <path
                    d={trainPath}
                    fill="none"
                    stroke="#241C15"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* val 曲线（虚线 · coral） */}
                  <path
                    d={valPath}
                    fill="none"
                    stroke="#E07A5F"
                    strokeWidth="2.4"
                    strokeDasharray="6 4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* best epoch 早停标记（绿色 teal 竖虚线 + 小标签） */}
                  <line
                    x1={xAt(scenario.bestEpoch)}
                    x2={xAt(scenario.bestEpoch)}
                    y1={PAD_T}
                    y2={VB_H - PAD_B}
                    stroke="#1B4B5A"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                  />
                  <g transform={`translate(${xAt(scenario.bestEpoch)},${PAD_T - 2})`}>
                    <rect
                      x="-30"
                      y="-12"
                      width="60"
                      height="14"
                      rx="3"
                      fill="#1B4B5A"
                      stroke="#241C15"
                      strokeWidth="1.4"
                    />
                    <text
                      x="0"
                      y="-2"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="9"
                      fontWeight="700"
                      fill="#FBEFE3"
                    >
                      best · e={scenario.bestEpoch}
                    </text>
                  </g>

                  {/* cursor 竖线（butter）+ 两个圆点 */}
                  <line
                    x1={xAt(epoch)}
                    x2={xAt(epoch)}
                    y1={PAD_T}
                    y2={VB_H - PAD_B}
                    stroke="#241C15"
                    strokeWidth="2"
                  />
                  <circle
                    cx={xAt(epoch)}
                    cy={yAt(curTrain)}
                    r="5.5"
                    fill="#FBEFE3"
                    stroke="#241C15"
                    strokeWidth="2"
                  />
                  <circle
                    cx={xAt(epoch)}
                    cy={yAt(curVal)}
                    r="5.5"
                    fill="#E07A5F"
                    stroke="#241C15"
                    strokeWidth="2"
                  />

                  {/* 过拟合区填充（cursor 在 bestEpoch 之后才显示） */}
                  {overfit && (
                    <rect
                      x={xAt(scenario.bestEpoch)}
                      y={PAD_T}
                      width={xAt(epoch) - xAt(scenario.bestEpoch)}
                      height={PLOT_H}
                      fill="#E07A5F"
                      fillOpacity="0.08"
                    />
                  )}
                </svg>
              </div>

              {/* slider + 实时数 */}
              <div className="mt-4 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                      ② 拖动到第几个 epoch
                    </span>
                    <span className="font-display text-[20px] font-bold text-ink tabular-nums">
                      e = {epoch}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={EPOCHS_MAX}
                    step={1}
                    value={epoch}
                    onChange={(e) => setEpoch(parseInt(e.target.value, 10))}
                    className="w-full accent-coral"
                  />
                </div>
                <div className="col-span-5 grid grid-cols-2 gap-2">
                  <div className="px-2 py-1.5 bg-cream border-2 border-ink rounded-md">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
                      train
                    </div>
                    <div className="font-display text-[16px] font-bold text-ink tabular-nums">
                      {curTrain.toFixed(3)}
                    </div>
                  </div>
                  <div className="px-2 py-1.5 bg-cream border-2 border-ink rounded-md">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
                      val
                    </div>
                    <div
                      className={[
                        "font-display text-[16px] font-bold tabular-nums",
                        overfit ? "text-coral" : "text-ink",
                      ].join(" ")}
                    >
                      {curVal.toFixed(3)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 状态条 */}
              <div className="mt-3 px-3 py-2 bg-cream border-2 border-ink rounded-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "inline-block w-2.5 h-2.5 rounded-full",
                      overfit ? "bg-coral animate-pulse-dot" : "bg-teal",
                    ].join(" ")}
                  />
                  <span className="font-mono text-[11px] text-ink font-semibold">
                    {overfit
                      ? "过拟合区 · val 已经回升"
                      : epoch < scenario.bestEpoch
                      ? "欠拟合区 · 两条线还在下降"
                      : "甜区 · val loss 最低点附近"}
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-ink/55">
                  gap = {gap.toFixed(3)}
                </span>
              </div>

              <p className="mt-3 font-mono text-[10px] text-ink/40 leading-relaxed">
                曲线形状参照：Tulu 3 SFT recipe (arXiv:2411.15124) · Unsloth LoRA 指南 ·
                Llama 3 / DeepSeek V3 预训练公开记录
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 把 N 个 loss 值转成 SVG path */
function makePath(points: number[]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(p).toFixed(1)}`)
    .join(" ");
}

export default SectionHero;
