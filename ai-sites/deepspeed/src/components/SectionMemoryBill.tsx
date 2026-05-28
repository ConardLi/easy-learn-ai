/**
 * Section 02 · 显存账单
 *
 * 反直觉钩子放在这里（不抢 Hero 的「是什么」位置）：
 *   「训一个 70B 模型，光是训练状态就要 1.12 TB —— 这还没算激活值。」
 *
 * 形式：horizontal 4-段堆叠柱（区别于 Hero 的 N 个 vertical 柱并排）。
 *   ─ slider 拖 model size (1B → 1T，对数刻度)
 *   ─ 实时 4 段堆叠柱：参数 / 梯度 / 优化器 (m,v) / 激活
 *   ─ 上方 4 个数字方块
 *   ─ 柱下方 H100/H200/8×H100 容量参考线
 *
 * 数据来源：
 *   每参数字节数 · archiesengupta.com 2026 / Lyceum Tech 2026
 *     params 2B (BF16) · grads 2B (BF16) · opt 8B (Adam fp32 master+m+v) · activations ~2B/param (with gradient ckpt)
 */
import React, { useMemo, useState } from "react";

/* 对数刻度模型档位 */
const MODELS = [
  { id: "1b", label: "1B", b: 1 },
  { id: "3b", label: "3B", b: 3 },
  { id: "7b", label: "7B · Llama 3 8B 量级", b: 7 },
  { id: "13b", label: "13B", b: 13 },
  { id: "30b", label: "30B", b: 30 },
  { id: "70b", label: "70B · Llama 3 70B", b: 70 },
  { id: "175b", label: "175B · GPT-3 量级", b: 175 },
  { id: "405b", label: "405B · Llama 3.1", b: 405 },
  { id: "671b", label: "671B · DeepSeek V3", b: 671 },
  { id: "1t", label: "1T · MT-NLG-530B 起", b: 1000 },
];

/* 每参数字节 · BF16 训练 + Adam */
const BYTES = {
  params: 2,
  grads: 2,
  opt: 8,
  act: 2, // 加了 gradient checkpointing 的近似值；纯 forward 会更大
} as const;

/* 参考硬件 */
const HW_LINES = [
  { label: "1× A100 80G", gb: 80, tone: "ink" },
  { label: "1× H200 141G", gb: 141, tone: "ink" },
  { label: "8× H100 (640G)", gb: 640, tone: "ink" },
];

const SectionMemoryBill: React.FC = () => {
  const [idx, setIdx] = useState(5); // 默认 70B
  const model = MODELS[idx];

  const bill = useMemo(() => {
    const p = model.b;
    return {
      params: p * BYTES.params,
      grads: p * BYTES.grads,
      opt: p * BYTES.opt,
      act: p * BYTES.act,
    };
  }, [model]);

  const total = bill.params + bill.grads + bill.opt + bill.act;

  /* 柱缩放：最高位 (1T) 总和 14000 GB，目标显示宽度 100% */
  const MAX_GB = 1000 * (BYTES.params + BYTES.grads + BYTES.opt + BYTES.act);
  const pct = (gb: number) => (gb / MAX_GB) * 100;

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">the bill</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          训一个 70B 模型，
          <br />
          单张显卡要扛{" "}
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">980 GB</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-9">
          这不是吓人。BF16 训练的每个参数后面挂着四份数据：
          参数自己 (2 字节)、梯度 (2 字节)、优化器状态 (8 字节)、激活值 (~2 字节)。
          拖下面滑块换个模型看账单怎么算。
        </p>

        {/* slider · 对数刻度 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-6 lg:p-7 mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
              选模型规模
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[34px] font-bold text-ink tabular-nums leading-none">
                {model.b >= 1000 ? "1T" : `${model.b}B`}
              </span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={MODELS.length - 1}
            step={1}
            value={idx}
            onChange={(e) => setIdx(parseInt(e.target.value))}
            className="w-full accent-coral"
          />
          <div className="mt-2 grid grid-cols-5 lg:grid-cols-10 gap-1 font-mono text-[9px] text-ink/40">
            {MODELS.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setIdx(i)}
                className={[
                  "text-center px-0.5 py-0.5 rounded transition-colors",
                  i === idx ? "text-ink font-bold" : "hover:text-ink/70",
                ].join(" ")}
              >
                {m.label.split(" ")[0]}
              </button>
            ))}
          </div>
          <p className="mt-2 font-mono text-[11px] text-ink/55">
            当前 · <span className="text-ink font-semibold">{model.label}</span>
          </p>
        </div>

        {/* 4 段堆叠柱（水平） */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          <div className="flex items-baseline justify-between mb-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
              训练状态 · 单卡需要装下的总量
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[36px] lg:text-[44px] font-bold text-ink tabular-nums leading-none">
                {total >= 1000 ? (total / 1000).toFixed(1) : Math.round(total).toString()}
              </span>
              <span className="font-mono text-[12px] text-ink/55">
                {total >= 1000 ? "TB" : "GB"}
              </span>
            </div>
          </div>

          {/* 4 段堆叠柱本体 */}
          <div className="relative h-14 bg-cream border-2 border-ink rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex">
              <Segment
                color="bg-coral"
                widthPct={pct(bill.params)}
                label="参数"
                value={bill.params}
              />
              <Segment
                color="bg-butter-deep"
                widthPct={pct(bill.grads)}
                label="梯度"
                value={bill.grads}
              />
              <Segment
                color="bg-teal"
                widthPct={pct(bill.opt)}
                label="优化器"
                value={bill.opt}
              />
              <Segment
                color="bg-pop"
                widthPct={pct(bill.act)}
                label="激活"
                value={bill.act}
              />
            </div>

            {/* 硬件容量参考线 */}
            {HW_LINES.map((h) => {
              const x = pct(h.gb);
              if (x > 100) return null;
              return (
                <div
                  key={h.label}
                  className="absolute top-0 bottom-0 border-r-2 border-dashed border-ink/40 pointer-events-none"
                  style={{ left: `${x}%` }}
                >
                  <div className="absolute -top-5 -translate-x-1/2 font-mono text-[9px] text-ink/55 whitespace-nowrap">
                    {h.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4 个分项数字 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <BillCell color="bg-coral" name="参数" bytes="2 B / 参数" value={bill.params} note="BF16 权重本体" />
            <BillCell color="bg-butter-deep" name="梯度" bytes="2 B / 参数" value={bill.grads} note="一份等大的 backward 累积" />
            <BillCell color="bg-teal" name="优化器" bytes="8 B / 参数" value={bill.opt} note="Adam · fp32 主权重 + m + v" />
            <BillCell color="bg-pop" name="激活" bytes="~2 B / 参数" value={bill.act} note="grad-ckpt 后近似" />
          </div>

          <div className="mt-6 px-4 py-3 bg-ink text-cream rounded-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
              所以
            </div>
            <p className="text-[14px] leading-relaxed">
              {total >= 1000
                ? `${model.label.split(" ")[0]} 训练状态 ${(total / 1000).toFixed(1)} TB。8 张 H100（640 GB）都装不下。这就是 ZeRO + offload 出现的原因。`
                : total > 80
                ? `${model.label.split(" ")[0]} 训练状态 ${Math.round(total)} GB · 一张 80 GB 卡装不下，多卡分摊就有意义了。`
                : `${model.label.split(" ")[0]} 训练状态 ${Math.round(total)} GB · 单张 A100 80GB 还能塞下。这种规模其实不太需要 DeepSpeed。`}
            </p>
          </div>

          <p className="mt-3 font-mono text-[10px] text-ink/40">
            来源 · archiesengupta.com/blog/memory-efficient-training-deep-dive 2026 · Lyceum Tech 2026
          </p>
        </div>
      </div>
    </section>
  );
};

const Segment: React.FC<{
  color: string;
  widthPct: number;
  label: string;
  value: number;
}> = ({ color, widthPct, label, value }) => (
  <div
    className={`${color} h-full transition-all duration-500 ease-spring relative overflow-hidden`}
    style={{ width: `${widthPct}%` }}
    title={`${label} ${value.toFixed(0)} GB`}
  >
    {widthPct > 8 && (
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-ink/85 truncate px-1">
        {label}
      </span>
    )}
  </div>
);

const BillCell: React.FC<{
  color: string;
  name: string;
  bytes: string;
  value: number;
  note: string;
}> = ({ color, name, bytes, value, note }) => (
  <div className="px-3 py-3 bg-cream border-2 border-ink rounded-xl">
    <div className="flex items-center gap-1.5 mb-1">
      <span className={`w-2.5 h-2.5 ${color} border border-ink rounded-sm`} />
      <span className="font-display text-[14px] font-bold text-ink">{name}</span>
      <span className="font-mono text-[9px] text-ink/45 ml-auto">{bytes}</span>
    </div>
    <div className="flex items-baseline gap-1 mb-0.5">
      <span className="font-display text-[22px] font-bold text-ink tabular-nums">
        {value >= 1000 ? (value / 1000).toFixed(1) : Math.round(value)}
      </span>
      <span className="font-mono text-[10px] text-ink/55">
        {value >= 1000 ? "TB" : "GB"}
      </span>
    </div>
    <div className="font-mono text-[10px] text-ink/55 leading-snug">{note}</div>
  </div>
);

export default SectionMemoryBill;
