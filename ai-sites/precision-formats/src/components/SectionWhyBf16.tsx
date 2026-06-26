/**
 * Section 04 · 同样 16 位，为什么训练偏爱 BF16
 *
 * 核心矛盾：FP16 和 BF16 都是 16 位，但切法不同。
 *   - FP16：指数 5 位（范围窄）+ 尾数 10 位（精度高）
 *   - BF16：指数 8 位（范围跟 FP32 一样宽）+ 尾数 7 位（精度低）
 * 训练时常出现很大或很小的数，范围窄的 FP16 容易「装不下」变成 inf/0，训练崩。
 * BF16 牺牲一点精度换来宽范围，训练更稳。
 *
 * 交互：单步走一遍训练里数值变大的过程，看 FP16 在哪一步溢出、BF16 扛住。
 */
import React, { useState } from "react";
import { RotateCcw, ChevronRight } from "lucide-react";

type Step = {
  label: string;
  value: string;
  fp16: string;
  bf16: string;
  fp16Bad?: boolean;
};

const STEPS: Step[] = [
  { label: "第 1 步 · 普通的数", value: "3.14", fp16: "3.14", bf16: "3.14" },
  { label: "第 2 步 · 数变大了", value: "1,200", fp16: "1,200", bf16: "1,200" },
  { label: "第 3 步 · 继续变大", value: "48,000", fp16: "48,000", bf16: "48,000" },
  { label: "第 4 步 · 超过 6.5 万", value: "90,000", fp16: "inf 溢出", bf16: "90,016", fp16Bad: true },
  { label: "第 5 步 · 更大", value: "5,000,000", fp16: "inf 溢出", bf16: "约 5,001,216", fp16Bad: true },
];

const SectionWhyBf16: React.FC = () => {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  const atEnd = i === STEPS.length - 1;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-t-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">why bf16 for training</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          都是 16 位，BF16 凭什么是训练首选
        </h2>
        <div className="max-w-2xl space-y-3 text-ink/75 text-[16px] mb-9">
          <p>
            FP16 和 BF16 都只用 16 位，但切法不一样。FP16 把更多位给了尾数（存得准），指数只有 5 位，能表示的最大数约 6.5 万。
          </p>
          <p>
            BF16 反过来：指数留足 8 位，范围跟 FP32 一样宽，代价是尾数只剩 7 位（存得糙一点）。
          </p>
          <p>
            训练时数值经常飙得很大，FP16 一超过 6.5 万就「装不下」，直接变成 inf（无穷大），训练就崩了。点下面走一遍看看。
          </p>
        </div>

        {/* 两种切法对比 */}
        <div className="grid sm:grid-cols-2 gap-3 mb-9">
          <SplitCard name="FP16" exp={5} mant={10} note="范围窄约 6.5 万 · 但更精细" highlight={false} />
          <SplitCard name="BF16" exp={8} mant={7} note="范围宽约 3.4×10³⁸ · 精度糙些" highlight />
        </div>

        {/* 单步 trace */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-6 lg:p-7">
          <div className="flex items-center justify-between mb-5">
            <span className="font-display text-[16px] font-bold text-ink">{s.label}</span>
            <span className="font-mono text-[11px] text-ink/50">{i + 1} / {STEPS.length}</span>
          </div>

          <div className="mb-5 px-4 py-3 bg-white border-2 border-ink rounded-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 mb-1">要存的数</div>
            <div className="font-mono text-[22px] font-bold text-ink tabular-nums">{s.value}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ResultBox name="FP16 存出来" value={s.fp16} bad={s.fp16Bad} />
            <ResultBox name="BF16 存出来" value={s.bf16} bad={false} />
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setI((x) => (atEnd ? x : x + 1))}
              disabled={atEnd}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-cream border-2 border-ink font-semibold text-[14px] shadow-stamp hover:-translate-y-0.5 transition-all duration-250 ease-spring disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {atEnd ? "走到头了" : "下一步"}
              {!atEnd && <ChevronRight className="w-4 h-4" strokeWidth={2.5} />}
            </button>
            <button
              onClick={() => setI(0)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-ink border-2 border-ink font-semibold text-[14px] hover:bg-cream transition-all duration-250"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
              重来
            </button>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] text-ink/40">
          ↑ BF16 那列数值为示意，帮你感受「存得糙一点但没崩」，不是精确换算结果。
        </p>

        <div className="mt-9 px-5 py-4 bg-teal text-cream rounded-2xl border-2 border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1.5">小结</div>
          <p className="text-[15px] leading-relaxed">
            训练时「别溢出」比「多几位小数」更要命。BF16 用宽范围换精度，所以现在大模型训练大多用它。
          </p>
        </div>
      </div>
    </section>
  );
};

const SplitCard: React.FC<{ name: string; exp: number; mant: number; note: string; highlight: boolean }> = ({
  name,
  exp,
  mant,
  note,
  highlight,
}) => {
  const cells = [
    ...Array(1).fill("bg-ink"),
    ...Array(exp).fill("bg-coral"),
    ...Array(mant).fill("bg-butter-deep"),
  ];
  return (
    <div
      className={[
        "px-5 py-4 border-2 border-ink rounded-2xl",
        highlight ? "bg-butter shadow-stamp" : "bg-white",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="font-display text-[17px] font-bold text-ink">{name}</span>
        {highlight && (
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink px-1.5 py-0.5 bg-white border border-ink rounded">
            训练首选
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {cells.map((c, idx) => (
          <div key={idx} className={[c, "h-5 flex-1 min-w-[8px] max-w-[18px] rounded-[2px] border border-ink/40"].join(" ")} />
        ))}
      </div>
      <p className="font-mono text-[11px] text-ink/65 leading-snug">{note}</p>
    </div>
  );
};

const ResultBox: React.FC<{ name: string; value: string; bad?: boolean }> = ({ name, value, bad }) => (
  <div
    className={[
      "px-4 py-3 border-2 rounded-xl transition-colors duration-300",
      bad ? "bg-pop/10 border-pop" : "bg-white border-ink",
    ].join(" ")}
  >
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-1">{name}</div>
    <div className={["font-mono text-[17px] font-bold tabular-nums", bad ? "text-pop" : "text-ink"].join(" ")}>
      {value}
    </div>
  </div>
);

export default SectionWhyBf16;
