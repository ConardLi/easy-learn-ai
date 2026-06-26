/**
 * Section 03 · 四种格式并排比，看「范围 vs 精度」的取舍
 *
 * 把 FP32 / FP16 / BF16 / FP8 四种格式放一起，用两根条（范围 / 精度）
 * 直观看每种格式在「能多大」和「有多准」上各让了多少。
 *
 * 交互：可勾选要对比的格式（默认全开），下面的条随勾选实时变化；
 *       底部一句话点出每种的典型用途。
 */
import React, { useState } from "react";

type Row = {
  id: string;
  name: string;
  bits: number;
  exp: number;
  mant: number;
  rangePct: number; // 范围条长度（示意）
  precPct: number; // 精度条长度（示意）
  use: string;
  tone: string;
};

const ROWS: Row[] = [
  { id: "fp32", name: "FP32", bits: 32, exp: 8, mant: 23, rangePct: 100, precPct: 100, use: "训练时的「标准答案」，最准最稳，但最占空间", tone: "bg-teal" },
  { id: "fp16", name: "FP16", bits: 16, exp: 5, mant: 10, rangePct: 42, precPct: 56, use: "省一半空间，但能表示的范围窄，遇到很大的数会「装不下」（下一节细讲）", tone: "bg-coral" },
  { id: "bf16", name: "BF16", bits: 16, exp: 8, mant: 7, rangePct: 100, precPct: 40, use: "同样 16 位，范围跟 FP32 一样宽，训练首选", tone: "bg-butter-deep" },
  { id: "fp8", name: "FP8", bits: 8, exp: 4, mant: 3, rangePct: 60, precPct: 18, use: "再砍一半，又小又快，2026 训练推理新热点", tone: "bg-pop" },
];

const SectionCompare: React.FC = () => {
  const [on, setOn] = useState<Record<string, boolean>>({
    fp32: true,
    fp16: true,
    bf16: true,
    fp8: true,
  });
  const visible = ROWS.filter((r) => on[r.id]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">range vs precision</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          四种格式排一排，看各让了什么
        </h2>
        <p className="max-w-2xl text-ink/70 text-[16px] mb-8">
          位是有限的，给了范围就少了精度，反过来也一样。每种格式都是在这两件事之间挑了个平衡点。勾掉几个，对比更清楚。
        </p>

        {/* 勾选 */}
        <div className="flex flex-wrap gap-2 mb-7">
          {ROWS.map((r) => {
            const checked = on[r.id];
            return (
              <button
                key={r.id}
                onClick={() => setOn((s) => ({ ...s, [r.id]: !s[r.id] }))}
                className={[
                  "inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-ink font-mono text-[12px] font-bold transition-all duration-250 ease-spring",
                  checked ? "bg-ink text-cream" : "bg-white text-ink/45",
                ].join(" ")}
              >
                <span className={[checked ? r.tone : "bg-ink/15", "w-3 h-3 rounded-full border border-ink/40"].join(" ")} />
                {r.name}
              </button>
            );
          })}
        </div>

        {/* 表 */}
        <div className="space-y-3">
          {visible.map((r) => (
            <div key={r.id} className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                <span className="font-display text-[20px] font-bold text-ink">{r.name}</span>
                <span className="font-mono text-[12px] text-ink/55">{r.bits} 位</span>
                <span className="font-mono text-[11px] text-ink/45">
                  指数 {r.exp} · 尾数 {r.mant}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                <Bar label="能表示的范围" pct={r.rangePct} color="bg-coral" />
                <Bar label="存数的精度" pct={r.precPct} color="bg-butter-deep" />
              </div>

              <p className="mt-4 text-[13.5px] text-ink/70 leading-relaxed">{r.use}</p>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="px-5 py-10 text-center text-ink/45 text-[14px] border-2 border-dashed border-ink/20 rounded-2xl">
              全勾掉了，上面点开至少一个看看。
            </div>
          )}
        </div>

        <p className="mt-6 font-mono text-[10px] text-ink/40">
          ↑ 条长度为示意，帮你感受相对差距，不是精确数值。范围由指数位决定，精度由尾数位决定。
        </p>
      </div>
    </section>
  );
};

const Bar: React.FC<{ label: string; pct: number; color: string }> = ({ label, pct, color }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1.5">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/55">{label}</span>
    </div>
    <div className="h-4 bg-cream border-2 border-ink rounded-full overflow-hidden">
      <div
        className={[color, "h-full rounded-full transition-all duration-500 ease-spring"].join(" ")}
        style={{ width: `${pct}%` }}
      />
    </div>
  </div>
);

export default SectionCompare;
