/**
 * Section 06 · Calc · 三档月成本怎么算
 *
 * 用 slider 调每月请求数，看三档真实月成本曲线（基于 2026 公开 API 价格）。
 *
 * 价格基线（2026/05）：
 *   GPT-4.1：$2.00/M input · $8.00/M output（pricepertoken.com）
 *   FT GPT-4.1：训练 $25/M token；推理 1.5x base = $3/M in · $12/M out（aicostcheck.com）
 *   FT GPT-4o-mini 托管：$1.70/hr ≈ $1224/mo（tokenmix.ai 2026/02）
 *   向量库（Pinecone / Qdrant Cloud 基础包）：约 $70-90/mo
 *
 * 不复制 mcp / quantization 站的 cost bar，这里走「slider + 双坐标曲线 + 三档卡」。
 */
import React, { useState, useMemo } from "react";

type Complexity = "small" | "mid" | "large";

const COMP: { id: Complexity; label: string; sub: string; ctxK: number }[] = [
  { id: "small", label: "5K tokens / 请求", sub: "QA · 短摘要", ctxK: 5 },
  { id: "mid", label: "50K / 请求", sub: "员工手册 QA", ctxK: 50 },
  { id: "large", label: "200K / 请求", sub: "整合同 review", ctxK: 200 },
];

const OUT_K = 0.5;
// 价格 / 1M token
const PRICE = {
  inBase: 2.0,
  outBase: 8.0,
  inFt: 3.0,
  outFt: 12.0,
};
const RAG_CTX_K = 8; // RAG 检索后塞的 context
const FT_CTX_K = 2; // FT 后短 prompt
const RAG_INFRA = 80; // 月固定
const FT_HOST = 1224; // 月固定
const FT_TRAIN_AMORT = 15.6; // 一次性 187.5 / 12 摊销

/** 计算月成本（$） */
function monthly(reqs: number, ctxK: number): { ctx: number; rag: number; ft: number } {
  // long context per req
  const ctxPer = (ctxK / 1000) * PRICE.inBase + (OUT_K / 1000) * PRICE.outBase;
  // RAG per req
  const ragPer = (RAG_CTX_K / 1000) * PRICE.inBase + (OUT_K / 1000) * PRICE.outBase;
  // FT per req
  const ftPer = (FT_CTX_K / 1000) * PRICE.inFt + (OUT_K / 1000) * PRICE.outFt;
  return {
    ctx: reqs * ctxPer,
    rag: reqs * ragPer + RAG_INFRA,
    ft: reqs * ftPer + FT_HOST + FT_TRAIN_AMORT,
  };
}

/** log 10 反射：slider 0-100 → 请求数 100..10_000_000 */
function sliderToReqs(v: number): number {
  const min = 2; // 10^2 = 100
  const max = 7; // 10^7 = 10M
  return Math.round(Math.pow(10, min + (v / 100) * (max - min)));
}
function reqsToSlider(r: number): number {
  return ((Math.log10(r) - 2) / 5) * 100;
}
function fmtUSD(v: number): string {
  if (v >= 100000) return `$${Math.round(v / 1000)}k`;
  if (v >= 10000) return `$${(v / 1000).toFixed(1)}k`;
  if (v >= 1000) return `$${(v / 1000).toFixed(2)}k`;
  return `$${v.toFixed(v < 10 ? 2 : 0)}`;
}
function fmtReqs(r: number): string {
  if (r >= 1_000_000) return `${(r / 1_000_000).toFixed(r >= 5_000_000 ? 0 : 1)}M`;
  if (r >= 1000) return `${(r / 1000).toFixed(r >= 10000 ? 0 : 1)}k`;
  return `${r}`;
}

const SectionCalc: React.FC = () => {
  const [sliderV, setSliderV] = useState(40); // 默认 ~10k req/mo
  const [comp, setComp] = useState<Complexity>("mid");

  const reqs = sliderToReqs(sliderV);
  const ctxK = COMP.find((c) => c.id === comp)!.ctxK;
  const cost = useMemo(() => monthly(reqs, ctxK), [reqs, ctxK]);

  // 构造曲线数据：51 个点
  const curve = useMemo(() => {
    const pts: { x: number; ctx: number; rag: number; ft: number }[] = [];
    for (let i = 0; i <= 50; i++) {
      const v = i * 2;
      const r = sliderToReqs(v);
      pts.push({ x: v, ...monthly(r, ctxK) });
    }
    return pts;
  }, [ctxK]);

  // 找到所有曲线的最大值做归一化（log）
  const maxY = useMemo(() => {
    const all = curve.flatMap((p) => [p.ctx, p.rag, p.ft]);
    return Math.max(...all, 100);
  }, [curve]);

  /** 把 $ 映射到 y（log） · 110 是底，10 是顶 */
  function toY(v: number): number {
    const safe = Math.max(v, 1);
    const t = Math.log10(safe) / Math.log10(maxY);
    return 110 - t * 90;
  }

  function pathOf(key: "ctx" | "rag" | "ft"): string {
    return curve
      .map((p, i) => {
        const x = (p.x / 100) * 300 + 10;
        const y = toY(p[key]);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }

  const winner =
    cost.ctx <= cost.rag && cost.ctx <= cost.ft
      ? "ctx"
      : cost.rag <= cost.ft
      ? "rag"
      : "ft";

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">monthly cost</span>
        </div>

        <h2 className="font-display text-display-lg text-ink max-w-3xl mb-3">
          算笔账：到几次请求该换档？
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-9">
          拖左下角的 slider 调每月请求数。三条曲线是真实 API 价格摊到月度。
          注意 FT 那条最早高，但请求一多就跌过另两条。
        </p>

        {/* 任务复杂度切换 */}
        <div className="flex flex-wrap items-baseline gap-3 mb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
            ① 每请求要塞多少 context
          </span>
          {COMP.map((c) => {
            const on = c.id === comp;
            return (
              <button
                key={c.id}
                onClick={() => setComp(c.id)}
                className={[
                  "px-3.5 py-2 rounded-full border-2 border-ink transition-all duration-250 ease-spring",
                  on
                    ? "bg-butter text-ink shadow-stamp -translate-y-0.5"
                    : "bg-white text-ink hover:bg-butter-tint",
                ].join(" ")}
              >
                <span className="font-semibold text-[13px]">{c.label}</span>
                <span
                  className={[
                    "ml-2 font-mono text-[10px]",
                    on ? "text-ink/55" : "text-ink/40",
                  ].join(" ")}
                >
                  {c.sub}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-7">
          {/* 主区：曲线 + slider */}
          <div className="lg:col-span-8">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6">
              {/* 主曲线 SVG */}
              <svg viewBox="0 0 320 130" className="w-full h-auto">
                {/* y 网格 */}
                <g stroke="#241C15" strokeWidth="0.5" opacity="0.1">
                  <line x1="10" y1="20" x2="310" y2="20" />
                  <line x1="10" y1="65" x2="310" y2="65" />
                  <line x1="10" y1="110" x2="310" y2="110" />
                </g>
                <g
                  fontFamily="Geist Mono, monospace"
                  fontSize="7"
                  fill="#241C15"
                  opacity="0.4"
                  textAnchor="end"
                >
                  <text x="9" y="22">{fmtUSD(maxY)}</text>
                  <text x="9" y="67">{fmtUSD(Math.sqrt(maxY))}</text>
                  <text x="9" y="113">$1</text>
                </g>
                {/* x label */}
                <g
                  fontFamily="Geist Mono, monospace"
                  fontSize="7"
                  fill="#241C15"
                  opacity="0.45"
                  textAnchor="middle"
                >
                  <text x="10" y="124">100</text>
                  <text x="70" y="124">1k</text>
                  <text x="130" y="124">10k</text>
                  <text x="190" y="124">100k</text>
                  <text x="250" y="124">1M</text>
                  <text x="310" y="124">10M</text>
                </g>

                {/* 三条曲线 */}
                <path d={pathOf("ctx")} fill="none" stroke="#241C15" strokeWidth="2" strokeOpacity="0.85" />
                <path d={pathOf("rag")} fill="none" stroke="#E07A5F" strokeWidth="2.2" />
                <path d={pathOf("ft")} fill="none" stroke="#1B4B5A" strokeWidth="2.2" />

                {/* 当前位置游标 */}
                {(() => {
                  const x = (sliderV / 100) * 300 + 10;
                  return (
                    <g>
                      <line
                        x1={x}
                        y1="15"
                        x2={x}
                        y2="110"
                        stroke="#241C15"
                        strokeWidth="1.2"
                        strokeDasharray="3 2"
                        opacity="0.5"
                      />
                      <circle cx={x} cy={toY(cost.ctx)} r="3.6" fill="#F4D35E" stroke="#241C15" strokeWidth="1.5" />
                      <circle cx={x} cy={toY(cost.rag)} r="3.6" fill="#E07A5F" stroke="#241C15" strokeWidth="1.5" />
                      <circle cx={x} cy={toY(cost.ft)} r="3.6" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
                    </g>
                  );
                })()}

                {/* 图例 */}
                <g fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="600">
                  <g transform="translate(120, 18)">
                    <line x1="0" y1="0" x2="14" y2="0" stroke="#241C15" strokeWidth="2" />
                    <text x="18" y="3" fill="#241C15">long ctx</text>
                  </g>
                  <g transform="translate(180, 18)">
                    <line x1="0" y1="0" x2="14" y2="0" stroke="#E07A5F" strokeWidth="2" />
                    <text x="18" y="3" fill="#E07A5F">RAG</text>
                  </g>
                  <g transform="translate(225, 18)">
                    <line x1="0" y1="0" x2="14" y2="0" stroke="#1B4B5A" strokeWidth="2" />
                    <text x="18" y="3" fill="#1B4B5A">fine-tune</text>
                  </g>
                </g>
              </svg>

              {/* slider */}
              <div className="mt-3">
                <div className="flex justify-between font-mono text-[10px] text-ink/45 uppercase tracking-[0.18em] mb-1">
                  <span>② 每月请求数</span>
                  <span className="text-ink font-bold tabular-nums">{fmtReqs(reqs)} / mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={sliderV}
                  onChange={(e) => setSliderV(Number(e.target.value))}
                  className="w-full accent-coral"
                />
              </div>
            </div>
          </div>

          {/* 右侧：3 档 cost 卡 */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-1">
              当前月成本
            </div>
            <CostCard
              tone="ctx"
              name="长 context"
              sub="塞 prompt"
              dollars={cost.ctx}
              winner={winner === "ctx"}
              breakdown={`每次 ${ctxK}K context → $${((ctxK / 1000) * PRICE.inBase + (OUT_K / 1000) * PRICE.outBase).toFixed(3)}/req`}
            />
            <CostCard
              tone="rag"
              name="RAG"
              sub="让它去查"
              dollars={cost.rag}
              winner={winner === "rag"}
              breakdown={`检索后塞 ${RAG_CTX_K}K · 加 $${RAG_INFRA}/mo 向量库基建`}
            />
            <CostCard
              tone="ft"
              name="微调"
              sub="改它的权重"
              dollars={cost.ft}
              winner={winner === "ft"}
              breakdown={`短 prompt + 1.5x base 推理价 · 加 $${FT_HOST}/mo 托管`}
            />
            <p className="font-mono text-[10px] text-ink/40 leading-relaxed pt-2">
              基线：GPT-4.1 base API 价 + OpenAI FT 托管费 · 不含开发人月
            </p>
          </div>
        </div>

        <p className="mt-7 font-mono text-[10px] text-ink/40">
          数据来源：pricepertoken.com 2026/02 · aicostcheck.com 2026 · tokenmix.ai 2026/02 ·
          模型差异 ±50% 但相对顺序稳定
        </p>
      </div>
    </section>
  );
};

interface CostCardProps {
  tone: "ctx" | "rag" | "ft";
  name: string;
  sub: string;
  dollars: number;
  winner: boolean;
  breakdown: string;
}
function CostCard({ tone, name, sub, dollars, winner, breakdown }: CostCardProps) {
  const toneClass: Record<typeof tone, { dot: string; text: string }> = {
    ctx: { dot: "bg-butter", text: "text-ink" },
    rag: { dot: "bg-coral", text: "text-coral" },
    ft: { dot: "bg-teal", text: "text-teal" },
  };
  return (
    <div
      className={[
        "p-3.5 border-2 rounded-xl transition-all duration-300",
        winner ? "bg-butter-tint border-ink shadow-stamp" : "bg-white border-ink/15",
      ].join(" ")}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full border-2 border-ink ${toneClass[tone].dot}`} />
          <span className={`font-display font-bold text-[14.5px] ${toneClass[tone].text}`}>
            {name}
          </span>
          <span className="font-mono text-[10px] text-ink/40">{sub}</span>
        </div>
        {winner && (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 bg-butter px-1.5 py-0.5 rounded border border-ink/30">
            cheapest
          </span>
        )}
      </div>
      <div className="font-display text-[24px] font-bold text-ink leading-none tabular-nums mb-1.5">
        {fmtUSD(dollars)}
        <span className="font-mono text-[11px] text-ink/45 font-normal ml-1">/ mo</span>
      </div>
      <p className="text-[11.5px] text-ink/60 leading-snug">{breakdown}</p>
    </div>
  );
}

export default SectionCalc;
