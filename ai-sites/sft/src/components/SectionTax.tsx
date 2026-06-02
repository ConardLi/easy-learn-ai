/**
 * Section 06 · Alignment tax · SFT 的代价
 *
 * 让用户切 5 个能力维度，看 base vs SFT 后真实跑分变化。
 * 不止"涨了对话能力"，有些方面真的会掉。
 *
 * 数据：实测 Llama 3 8B base vs instruct 在常见 benchmark 上的差异（公开数据综合）。
 */
import React, { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Cap = {
  id: string;
  name: string;
  desc: string;
  base: number;
  sft: number;
  unit: string;
  note: string;
};

/* 数字综合参考 Llama 3 8B / Llama 3.1 8B 的 base vs instruct 公开评测，
   AlpacaEval / IFEval / MMLU / HumanEval / TriviaQA 等。 */
const CAPS: Cap[] = [
  {
    id: "follow",
    name: "指令遵循",
    desc: "用户让做啥就做啥",
    base: 18,
    sft: 78,
    unit: "IFEval %",
    note: "SFT 的本职工作。base 几乎不会照做。",
  },
  {
    id: "chat",
    name: "对话流畅",
    desc: "AlpacaEval 2 vs GPT-4",
    base: 4,
    sft: 27,
    unit: "WR %",
    note: "续写机变对话机，差距巨大。",
  },
  {
    id: "knowledge",
    name: "事实知识",
    desc: "TriviaQA 上的回忆",
    base: 73,
    sft: 70,
    unit: "EM %",
    note: "微降 · alignment tax 的轻量形态。",
  },
  {
    id: "math",
    name: "数学推理",
    desc: "GSM8K",
    base: 56,
    sft: 80,
    unit: "acc %",
    note: "如果 SFT 数据里有 CoT 样本，会大涨。Tulu 3 专门加了 334K math 桶。",
  },
  {
    id: "code",
    name: "代码生成",
    desc: "HumanEval pass@1",
    base: 33,
    sft: 62,
    unit: "%",
    note: "看你 SFT 数据里有多少 code 样本。",
  },
  {
    id: "diversity",
    name: "输出多样性",
    desc: "self-BLEU · 越低越多样",
    base: 22,
    sft: 41,
    unit: "self-BLEU",
    note: "↑ = 变同质。SFT 后模型说话很像一个人，这就是「模式坍缩」的轻症。",
  },
];

const SectionTax: React.FC = () => {
  const [active, setActive] = useState("follow");
  const cap = CAPS.find((c) => c.id === active)!;

  const delta = cap.sft - cap.base;
  const direction =
    delta === 0
      ? "flat"
      : (cap.id === "diversity"
        ? delta > 0
          ? "down"
          : "up"
        : delta > 0
        ? "up"
        : "down");

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">ALIGNMENT TAX</span>
        </div>

        <h2 className="font-display text-display-lg mb-3">
          SFT 之后，有些能力会掉
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          学界叫这个现象 alignment tax / catastrophic forgetting：模型为了「听话」，悄悄丢掉了一些 pre-train 学的本事。下面 6 个能力，自己切一切，看哪些涨了、哪些掉了。
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：能力切换 chip */}
          <div className="lg:col-span-4 space-y-2">
            {CAPS.map((c) => {
              const on = c.id === active;
              const d = c.sft - c.base;
              const isLoss = (c.id === "knowledge") || (c.id === "diversity");
              const dArrow =
                d === 0
                  ? <Minus className="w-3 h-3" />
                  : (c.id === "diversity"
                    ? d > 0
                      ? <TrendingDown className="w-3 h-3 text-pop" />
                      : <TrendingUp className="w-3 h-3 text-teal" />
                    : d > 0
                    ? <TrendingUp className="w-3 h-3 text-teal" />
                    : <TrendingDown className="w-3 h-3 text-pop" />);
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={[
                    "w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 border-ink text-left transition-all duration-250",
                    on
                      ? "bg-ink text-cream shadow-stamp"
                      : "bg-white text-ink hover:bg-cream",
                  ].join(" ")}
                >
                  <div className="shrink-0">{dArrow}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[14.5px] font-bold leading-tight">
                      {c.name}
                    </div>
                    <div
                      className={[
                        "font-mono text-[10.5px] leading-tight mt-0.5",
                        on ? "text-cream/70" : "text-ink/55",
                      ].join(" ")}
                    >
                      {c.desc}
                    </div>
                  </div>
                  <span
                    className={[
                      "shrink-0 font-mono text-[11.5px] font-bold tabular-nums",
                      on
                        ? "text-cream"
                        : isLoss
                        ? d > 0
                          ? "text-pop"
                          : "text-teal"
                        : d > 0
                        ? "text-teal"
                        : "text-pop",
                    ].join(" ")}
                  >
                    {d > 0 ? "+" : ""}
                    {d}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 右：对比柱 */}
          <div className="lg:col-span-8">
            <div
              key={cap.id}
              className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-6 animate-enter-fade"
            >
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    benchmark
                  </div>
                  <h3 className="font-display text-[22px] font-bold text-ink leading-tight">
                    {cap.name}
                  </h3>
                </div>
                <div className="font-mono text-[10px] text-ink/45">
                  unit · {cap.unit}
                </div>
              </div>

              {/* 双柱 */}
              <div className="space-y-4">
                <BarRow
                  label="base 模型"
                  value={cap.base}
                  max={Math.max(cap.base, cap.sft) * 1.2}
                  tone="muted"
                  caption="pre-train 之后，未做 SFT"
                />
                <BarRow
                  label="SFT 后"
                  value={cap.sft}
                  max={Math.max(cap.base, cap.sft) * 1.2}
                  tone={direction === "down" ? "bad" : "good"}
                  caption="同款 base + ~1M 条 SFT 数据"
                />
              </div>

              {/* δ */}
              <div className="mt-5 flex items-center gap-3 px-4 py-3 bg-cream border-2 border-ink/30 rounded-xl">
                <div className="shrink-0">
                  {direction === "up" ? (
                    <div className="w-9 h-9 rounded-full bg-teal text-cream flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                  ) : direction === "down" ? (
                    <div className="w-9 h-9 rounded-full bg-pop text-cream flex items-center justify-center">
                      <TrendingDown className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-ink/30 text-cream flex items-center justify-center">
                      <Minus className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    delta
                  </div>
                  <div className="font-display text-[20px] font-bold text-ink tabular-nums">
                    {delta > 0 ? "+" : ""}
                    {delta} {cap.unit}
                  </div>
                </div>
                <p className="flex-[2] font-sans text-[13px] text-ink leading-snug">
                  {cap.note}
                </p>
              </div>

              <p className="mt-4 font-mono text-[10.5px] text-ink/45 leading-relaxed">
                数字综合 · Llama 3 8B base vs instruct 公开评测 · AlpacaEval 2 / IFEval / MMLU / GSM8K / HumanEval / TriviaQA · 2024-2025
              </p>
            </div>

            {/* 缓解小贴 */}
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-teal text-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
                  缓解 #1 · replay 旧数据
                </div>
                <p className="font-sans text-[12.5px] leading-relaxed">
                  SFT 时混 5-10% 通用语料（pre-train 数据子集），知识保留率明显回升。
                </p>
              </div>
              <div className="p-3.5 bg-ink text-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
                  缓解 #2 · 别训太久
                </div>
                <p className="font-sans text-[12.5px] leading-relaxed">
                  2-3 epochs 通常够。再多就是用 instruction 当 pre-train 用了，本末倒置。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function BarRow({
  label,
  value,
  max,
  tone,
  caption,
}: {
  label: string;
  value: number;
  max: number;
  tone: "good" | "bad" | "muted";
  caption: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const fillCls =
    tone === "good"
      ? "bg-teal"
      : tone === "bad"
      ? "bg-pop"
      : "bg-ink/45";
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/65">
          {label}
        </span>
        <span className="font-display text-[20px] font-bold text-ink tabular-nums">
          {value}
        </span>
      </div>
      <div className="h-7 bg-cream border-2 border-ink rounded-md overflow-hidden">
        <div
          className={[
            "h-full transition-all duration-500 ease-spring",
            fillCls,
          ].join(" ")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-0.5 font-mono text-[10px] text-ink/45">{caption}</p>
    </div>
  );
}

export default SectionTax;
