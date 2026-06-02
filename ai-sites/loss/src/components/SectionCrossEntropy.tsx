/**
 * Section 04 · 分类族 · Cross-Entropy 算账本
 *
 * 反相邻：上一节是 SVG 拖点 + 数字 card。这里换成 toggle + slider + 公式逐项展开。
 *
 * 教育核心：分类不用 MSE，是因为 CE 对「自信错」给的惩罚是平方级的几十倍。
 *   用户调 y∈{0,1} 和 p∈(0,1)，看 BCE 与 MSE 当场打多少分。
 */
import React, { useMemo, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const VB = { w: 600, h: 280 };
const PADL = 44;
const PADR = 20;
const PADT = 20;
const PADB = 36;
const Y_MAX = 5;

const xScale = (p: number) => PADL + p * (VB.w - PADL - PADR);
const yScale = (v: number) =>
  PADT + (1 - Math.min(v, Y_MAX) / Y_MAX) * (VB.h - PADT - PADB);

function pathFor(fn: (p: number) => number): string {
  const N = 100;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const p = 0.005 + (i / N) * 0.99;
    pts.push(`${xScale(p).toFixed(1)} ${yScale(fn(p)).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

type PresetId = "right" | "ok" | "uncertain" | "wrong" | "disaster";
const PRESETS: { id: PresetId; label: string; y: 0 | 1; p: number; tone: string }[] = [
  { id: "right", label: "自信对", y: 1, p: 0.95, tone: "teal" },
  { id: "ok", label: "稳健对", y: 1, p: 0.75, tone: "teal" },
  { id: "uncertain", label: "拿不准", y: 1, p: 0.5, tone: "ink" },
  { id: "wrong", label: "犹豫错", y: 1, p: 0.3, tone: "coral" },
  { id: "disaster", label: "自信错", y: 1, p: 0.05, tone: "coral" },
];

const SectionCrossEntropy: React.FC = () => {
  const [y, setY] = useState<0 | 1>(1);
  const [p, setP] = useState(0.85);

  const ce = useMemo(() => {
    const pp = Math.max(1e-6, Math.min(1 - 1e-6, p));
    return -(y * Math.log(pp) + (1 - y) * Math.log(1 - pp));
  }, [y, p]);
  const mse = useMemo(() => (y - p) ** 2, [y, p]);

  /* 曲线根据 y 切换 */
  const ceFn = (pp: number) =>
    y === 1 ? -Math.log(Math.max(pp, 1e-6)) : -Math.log(Math.max(1 - pp, 1e-6));
  const mseFn = (pp: number) => (y - pp) ** 2;
  const cePath = useMemo(() => pathFor(ceFn), [y]);
  const msePath = useMemo(() => pathFor(mseFn), [y]);

  /* 比例 ratio */
  const ratio = mse > 0 ? ce / mse : 0;

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">cross-entropy ledger</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          分类为什么不用猜数字那套？
          <br />
          因为模型越
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">自信地猜错</span>
          </span>
          ，罚得越狠。
        </h2>
        <p className="max-w-2xl text-ink/75 text-[16px] mb-4 leading-relaxed">
          先用一句话记住 cross-entropy（交叉熵）：
          <strong className="text-ink">模型给正确答案的概率越低，罚得越狠</strong> ——
          罚分就是「给正确答案那个概率，取 −log」。概率 0.9 罚一点点，概率 0.05 罚一大笔。
        </p>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          写成公式：二分类真值 y 只有 0 或 1，模型输出概率 p，
          <strong className="text-ink">BCE = −[y·log p + (1−y)·log(1−p)]</strong>。
          当 p 朝错的方向冲到 0.05，−log 0.05 ≈ 3.00，把 MSE 的 0.90 打得稀碎。
        </p>

        {/* 控件 */}
        <div className="grid sm:grid-cols-12 gap-4 mb-5">
          <div className="sm:col-span-4 p-4 bg-cream border-2 border-ink rounded-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
              真值 y · toggle
            </div>
            <div className="flex gap-2">
              {[1, 0].map((v) => {
                const on = v === y;
                return (
                  <button
                    key={v}
                    onClick={() => setY(v as 0 | 1)}
                    className={[
                      "flex-1 py-2 rounded-xl border-2 border-ink font-display text-[20px] font-bold transition-all duration-250 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-stamp"
                        : "bg-white text-ink/55 hover:bg-butter shadow-[2px_2px_0_0_#241C15]",
                    ].join(" ")}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
            <div className="mt-2 font-mono text-[10px] text-ink/45 leading-snug">
              {y === 1 ? "正类 · 期望 p → 1" : "负类 · 期望 p → 0"}
            </div>
          </div>

          <div className="sm:col-span-8 p-4 bg-cream border-2 border-ink rounded-2xl">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                预测概率 p · drag
              </div>
              <div className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                {p.toFixed(2)}
              </div>
            </div>
            <input
              type="range"
              min={0.01}
              max={0.99}
              step={0.01}
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
              className="w-full accent-coral cursor-pointer"
              aria-label="预测概率"
            />
            <div className="flex justify-between mt-1 font-mono text-[10px] text-ink/40">
              <span>0.01 · 完全反方向</span>
              <span>0.5 · 犹豫</span>
              <span>0.99 · 自信</span>
            </div>
          </div>
        </div>

        {/* 5 个 preset chip */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-5">
          {PRESETS.map((s) => {
            const on = s.y === y && Math.abs(s.p - p) < 0.005;
            const accent =
              s.tone === "teal"
                ? "bg-teal text-cream"
                : s.tone === "coral"
                  ? "bg-coral text-cream"
                  : "bg-ink text-cream";
            return (
              <button
                key={s.id}
                onClick={() => {
                  setY(s.y);
                  setP(s.p);
                }}
                className={[
                  "px-2.5 py-2 rounded-xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                  on ? `${accent} shadow-stamp` : "bg-white text-ink hover:bg-cream shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
              >
                <div className={["font-display text-[13px] font-bold leading-tight", on ? "" : "text-ink"].join(" ")}>
                  {s.label}
                </div>
                <div className={["font-mono text-[10px] mt-0.5", on ? "opacity-70" : "text-ink/50"].join(" ")}>
                  y={s.y} · p={s.p}
                </div>
              </button>
            );
          })}
        </div>

        {/* 主面板 */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：曲线图 */}
          <div className="lg:col-span-7 bg-cream border-2 border-ink rounded-2xl shadow-stamp p-4">
            <div className="flex items-baseline justify-between mb-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                两条 loss 曲线 · 当前 y = {y}
              </div>
              <div className="flex gap-3 font-mono text-[10px] text-ink/65">
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-ink" /> BCE
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-0.5" style={{ background: "#88837C" }} /> MSE
                </span>
              </div>
            </div>
            <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-auto">
              {/* 网格 */}
              {[1, 2, 3, 4, 5].map((v) => (
                <g key={`gy-${v}`}>
                  <line
                    x1={PADL}
                    y1={yScale(v)}
                    x2={VB.w - PADR}
                    y2={yScale(v)}
                    stroke="#241C15"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                    opacity="0.18"
                  />
                  <text
                    x={PADL - 6}
                    y={yScale(v) + 3}
                    textAnchor="end"
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    fill="#88837C"
                  >
                    {v}
                  </text>
                </g>
              ))}
              {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                <g key={`gx-${v}`}>
                  <line
                    x1={xScale(v)}
                    y1={PADT}
                    x2={xScale(v)}
                    y2={VB.h - PADB}
                    stroke="#241C15"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                    opacity="0.12"
                  />
                  <text
                    x={xScale(v)}
                    y={VB.h - PADB + 18}
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    fill="#88837C"
                  >
                    {v.toFixed(2)}
                  </text>
                </g>
              ))}
              <line
                x1={PADL}
                y1={VB.h - PADB}
                x2={VB.w - PADR}
                y2={VB.h - PADB}
                stroke="#241C15"
                strokeWidth="1.5"
              />
              <text
                x={VB.w - PADR}
                y={VB.h - PADB + 32}
                textAnchor="end"
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#88837C"
              >
                p →
              </text>

              {/* MSE 曲线 */}
              <path d={msePath} fill="none" stroke="#88837C" strokeWidth="2" strokeDasharray="5 3" />
              {/* BCE 曲线 */}
              <path d={cePath} fill="none" stroke="#241C15" strokeWidth="2.4" strokeLinejoin="round" />

              {/* 当前 p 竖线 */}
              <line
                x1={xScale(p)}
                y1={PADT}
                x2={xScale(p)}
                y2={VB.h - PADB}
                stroke="#E07A5F"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.65"
              />
              {/* BCE 点 */}
              <circle
                cx={xScale(p)}
                cy={yScale(ce)}
                r="5.5"
                fill="#241C15"
                stroke="#FBEFE3"
                strokeWidth="2"
              />
              {/* MSE 点 */}
              <circle
                cx={xScale(p)}
                cy={yScale(mse)}
                r="5"
                fill="#88837C"
                stroke="#FBEFE3"
                strokeWidth="2"
              />
              {/* label 当前值 */}
              <text
                x={xScale(p)}
                y={Math.max(PADT + 12, yScale(ce) - 12)}
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="11"
                fontWeight="700"
                fill="#241C15"
              >
                BCE {ce.toFixed(3)}
              </text>
            </svg>
          </div>

          {/* 右：算账本 */}
          <div className="lg:col-span-5">
            <div className="p-5 bg-ink text-cream rounded-2xl shadow-stamp-lg font-mono text-[13px] leading-relaxed">
              <div className="text-butter mb-2 text-[10px] uppercase tracking-[0.2em]">
                算账本 · step by step
              </div>
              <div className="space-y-1.5">
                <Row k="y" v={y.toString()} />
                <Row k="p" v={p.toFixed(2)} />
                <div className="border-t border-cream/15 my-2" />
                <div className="text-cream/70">
                  BCE = −[ y·log p + (1−y)·log(1−p) ]
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;= −[ <span className="text-butter">{y}</span>·log({p.toFixed(2)}) +{" "}
                  <span className="text-butter">{1 - y}</span>·log({(1 - p).toFixed(2)}) ]
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;= −[{" "}
                  {y === 1 ? `log(${p.toFixed(2)})` : `log(${(1 - p).toFixed(2)})`} ]
                </div>
                <div className="text-coral font-bold text-[18px] pt-1">
                  &nbsp;&nbsp;&nbsp;&nbsp;= {ce.toFixed(4)} 分
                </div>
                <div className="text-cream/45 text-[10px]">
                  &nbsp;&nbsp;&nbsp;&nbsp;（这个罚分数字越大，罚得越重 · 学名 nats）
                </div>
              </div>

              <div className="border-t border-cream/15 my-3" />
              <div className="text-cream/70">
                MSE = (y − p)² = ({y} − {p.toFixed(2)})² ={" "}
                <span className="text-butter font-bold">{mse.toFixed(4)}</span>
              </div>

              <div className="mt-3 p-2 bg-cream/10 rounded-lg">
                <div className="text-[11px] text-cream/70 mb-1">BCE / MSE 比值</div>
                <div className="text-[22px] font-bold text-butter tabular-nums">
                  ×{ratio.toFixed(1)}
                </div>
                <div className="text-[11px] text-cream/70 mt-1">
                  {ratio > 5
                    ? "CE 在死磕这个错 · MSE 几乎没反应"
                    : ratio > 1.5
                      ? "CE 比 MSE 重 · 但还能接受"
                      : "两者接近 · 当前 p 不在病态区"}
                </div>
              </div>
            </div>

            <p className="mt-3 font-mono text-[10px] text-ink/40">
              LLM 的 next-token loss = 对每个 token 算一遍 CE 再平均 · 这就是 NLL（negative log-likelihood）
            </p>

            {/* 互链卡：CE 在预训练里怎么用 → pretrain 站 */}
            <a
              href="../pretrain/index.html"
              className="mt-3 flex items-start gap-3 px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13px] leading-[1.55] text-ink/85">
                <span className="font-bold text-ink">这个 CE 在「猜下一个字」上长什么样？</span>
                <span className="text-ink/70">
                  {" "}
                  《预训练》那站把它当主线讲：模型怎么靠猜下一个 token 把整本互联网读进去。
                </span>
                <span className="inline-flex items-center gap-1 ml-1 font-mono text-[11px] font-bold text-ink">
                  预训练站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* 类别极不均衡的变体：Focal Loss，给 §06 小测铺垫 */}
        <div className="mt-8 max-w-3xl p-5 bg-cream border-2 border-ink rounded-2xl shadow-stamp">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
            一种常见变体 · Focal Loss
          </div>
          <p className="text-[14.5px] text-ink/85 leading-relaxed">
            如果一类样本占了 99%、另一类只有 1%（比如找罕见病灶），普通 CE 会被海量「简单的多数类」带跑。
            Focal Loss 在 CE 前面乘一个因子 (1−pₜ)^γ：已经分对的样本自动降权，模型把力气留给难的少数类。
            常用 γ=2 —— 下一节小测会用到它。
          </p>
        </div>
      </div>
    </section>
  );
};

const Row: React.FC<{ k: string; v: string }> = ({ k, v }) => (
  <div className="flex items-baseline justify-between">
    <span className="text-cream/65">{k}</span>
    <span className="font-bold text-butter">{v}</span>
  </div>
);

export default SectionCrossEntropy;
