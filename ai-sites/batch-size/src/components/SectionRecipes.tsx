/**
 * Section 05 · 2026 真实训练配方
 *
 * 反相邻：上一节是 stepper + 预设。这里换成 horizontal bar 横向条 + tab + 排序。
 *
 * 主交互：
 *   ① pretrain vs finetune tab —— L2
 *   ② sort by year / by size pill —— L2
 *   ③ hover 单条看 ramp 策略 / 来源（基础礼貌不算）
 *
 * 数据全部来自官方 paper / 框架文档（注脚带 arXiv / 链接来源）。
 */
import React, { useMemo, useState } from "react";

type Recipe = {
  name: string;
  year: number;
  /** 训练时 global batch · 用 tokens / step 表示 */
  tokens: number;
  /** ramp 策略说明 */
  ramp?: string;
  source: string;
  /** 颜色 tone */
  tone: "ink" | "coral" | "teal" | "butter";
};

/* ── 预训练（global tokens / step） ──────────────────────── */
const PRETRAIN: Recipe[] = [
  {
    name: "GPT-3 175B",
    year: 2020,
    tokens: 3_200_000,
    ramp: "12M tokens warmup → 3.2 M global",
    source: "arXiv:2005.14165 (OpenAI)",
    tone: "ink",
  },
  {
    name: "Llama 1 65B",
    year: 2023,
    tokens: 4_000_000,
    ramp: "固定 4 M · 1.4 T tokens",
    source: "arXiv:2302.13971 (Meta)",
    tone: "teal",
  },
  {
    name: "Llama 3 405B",
    year: 2024,
    tokens: 16_000_000,
    ramp: "4M → 8M (252B tok) → 16M (2.87T tok)",
    source: "arXiv:2407.21783 (Meta)",
    tone: "coral",
  },
  {
    name: "DeepSeek V3 671B",
    year: 2024,
    tokens: 62_914_560, // 15360 × 4096
    ramp: "3072 → 15360 seqs (469B tok) · seq=4K",
    source: "arXiv:2412.19437 (DeepSeek)",
    tone: "butter",
  },
  {
    name: "Llama 4 Maverick",
    year: 2025,
    tokens: 24_000_000, // estimated from public info
    ramp: "未公开 · 7.38M H100 GPU-hours total",
    source: "Meta AI 2025-04-05 · bytegoose docs",
    tone: "ink",
  },
];

/* ── 微调（effective batch · samples · 不是 tokens） ─────── */
const FINETUNE: Recipe[] = [
  {
    name: "Unsloth · LoRA 默认",
    year: 2026,
    tokens: 16, // effective = 2×8
    ramp: "micro 2 × accum 8 · single GPU",
    source: "unsloth.ai/docs 2026",
    tone: "teal",
  },
  {
    name: "Axolotl · QLoRA 推荐",
    year: 2026,
    tokens: 8,
    ramp: "micro 2 × accum 4 · 24 GB GPU",
    source: "axolotl yaml example",
    tone: "butter",
  },
  {
    name: "LocalAIMaster · 70B QLoRA",
    year: 2026,
    tokens: 8,
    ramp: "RTX 4090 · seq 4096",
    source: "localaimaster.com 2026",
    tone: "coral",
  },
  {
    name: "HuggingFace TRL · 默认",
    year: 2025,
    tokens: 8,
    ramp: "8 effective · seq 2048",
    source: "TRL SFTTrainer docs",
    tone: "ink",
  },
  {
    name: "Llama 4 多机微调",
    year: 2025,
    tokens: 256, // 8 GPUs × 4 micro × 8 accum
    ramp: "8 × H100 · micro 4 × accum 8",
    source: "n1n.ai production guide 2026-04",
    tone: "teal",
  },
];

type SortMode = "size" | "year";

const SectionRecipes: React.FC = () => {
  const [tab, setTab] = useState<"pretrain" | "finetune">("pretrain");
  const [sort, setSort] = useState<SortMode>("size");
  const [hovered, setHovered] = useState<string | null>(null);

  const list = tab === "pretrain" ? PRETRAIN : FINETUNE;
  const sorted = useMemo(() => {
    const arr = [...list];
    arr.sort((a, b) => {
      if (sort === "size") return b.tokens - a.tokens;
      return b.year - a.year;
    });
    return arr;
  }, [list, sort]);

  const maxTokens = Math.max(...list.map((r) => r.tokens));
  /* log scale，让最小条也可见 */
  const minLog = Math.log10(Math.min(...list.map((r) => r.tokens)));
  const maxLog = Math.log10(maxTokens);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">2026 real-world recipes</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          训得起的 batch，
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">跨了 6 个数量级</span>
          </span>
          ：
          <br />
          从 8 到 60 M。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          预训练阶段，batch 是百万 token 级，还经常分段往上「ramp」。微调阶段，effective batch
          就 8 到 256 之间打转 —— 显存先到位，数学再说。
        </p>

        {/* 控件行：tab + sort */}
        <div className="grid sm:grid-cols-12 gap-3 mb-6">
          {/* tab */}
          <div className="sm:col-span-8 p-1.5 bg-cream border-2 border-ink rounded-2xl flex gap-1.5">
            {[
              { k: "pretrain" as const, label: "预训练 · tokens / step" },
              { k: "finetune" as const, label: "微调 · effective samples" },
            ].map((t) => {
              const on = tab === t.k;
              return (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={[
                    "flex-1 px-4 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                      : "bg-white text-ink/65 hover:bg-butter/50",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          {/* sort */}
          <div className="sm:col-span-4 p-1.5 bg-cream border-2 border-ink rounded-2xl flex gap-1.5">
            {[
              { k: "size" as const, label: "按 size" },
              { k: "year" as const, label: "按年份" },
            ].map((s) => {
              const on = sort === s.k;
              return (
                <button
                  key={s.k}
                  onClick={() => setSort(s.k)}
                  className={[
                    "flex-1 px-3 py-2.5 rounded-xl font-mono text-[10.5px] uppercase tracking-[0.15em] font-bold transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                      : "bg-white text-ink/65 hover:bg-butter/50",
                  ].join(" ")}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 主条图 */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5 lg:p-6">
          <div className="space-y-3" key={`bars-${tab}-${sort}`}>
            {sorted.map((r) => {
              const lf = Math.log10(r.tokens);
              const pct = ((lf - minLog) / (maxLog - minLog)) * 95 + 5; // 5%~100%
              const tone =
                r.tone === "coral"
                  ? "bg-coral"
                  : r.tone === "teal"
                    ? "bg-teal"
                    : r.tone === "butter"
                      ? "bg-butter-deep"
                      : "bg-ink";
              const isHovered = hovered === r.name;
              return (
                <div
                  key={r.name}
                  onMouseEnter={() => setHovered(r.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={[
                    "grid grid-cols-12 gap-3 items-center px-3 py-2.5 rounded-xl border-2 border-ink/15 transition-all duration-200",
                    isHovered ? "bg-cream border-ink/40" : "bg-white",
                  ].join(" ")}
                >
                  {/* 名称 / 年份 */}
                  <div className="col-span-4 sm:col-span-3">
                    <div className="font-display text-[14px] font-bold text-ink leading-tight">
                      {r.name}
                    </div>
                    <div className="font-mono text-[10px] text-ink/55">{r.year}</div>
                  </div>

                  {/* 条 */}
                  <div className="col-span-5 sm:col-span-6 relative h-6">
                    <div className="absolute inset-0 bg-ink/8 rounded-full border border-ink/15" />
                    <div
                      className={[tone, "absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-spring"].join(" ")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* 数值 */}
                  <div className="col-span-3 text-right">
                    <div className="font-display text-[16px] font-bold text-ink tabular-nums leading-tight">
                      {formatRecipe(tab, r.tokens)}
                    </div>
                    <div className="font-mono text-[9px] text-ink/55">
                      {tab === "pretrain" ? "tokens" : "samples"}
                    </div>
                  </div>

                  {/* hover 详情 */}
                  {isHovered && (
                    <div className="col-span-12 mt-1 pt-2 border-t border-ink/10 grid sm:grid-cols-2 gap-2 animate-enter-fade">
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/50">
                          ramp / 策略
                        </div>
                        <div className="font-mono text-[11px] text-ink leading-snug">
                          {r.ramp ?? "无公开记录"}
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/50">
                          来源
                        </div>
                        <div className="font-mono text-[11px] text-ink leading-snug">
                          {r.source}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 横轴刻度 */}
          <div className="mt-5 pt-3 border-t border-ink/15 flex justify-between font-mono text-[10px] text-ink/45">
            <span>{tab === "pretrain" ? "1 M tokens" : "8"}</span>
            <span>{tab === "pretrain" ? "8 M" : "32"}</span>
            <span>{tab === "pretrain" ? "30 M" : "128"}</span>
            <span>{tab === "pretrain" ? "60 M+" : "256+"}</span>
          </div>
        </div>

        {/* 一句话钩子 */}
        <div className="mt-6 grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6 p-4 border-2 border-ink rounded-2xl bg-butter/30 shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
              共同模式
            </div>
            <div className="font-display text-[15px] font-bold text-ink leading-snug">
              预训练 batch 几乎都从小往大 ramp。
            </div>
            <div className="mt-1 font-mono text-[11px] text-ink/65">
              GPT-3 / Llama 3 / DeepSeek V3 全部用阶梯式涨 batch —— 先用小 batch 稳定起步，
              收敛后再换大 batch 提效率。
            </div>
          </div>
          <div className="lg:col-span-6 p-4 border-2 border-ink rounded-2xl bg-coral/15 shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
              微调反着来
            </div>
            <div className="font-display text-[15px] font-bold text-ink leading-snug">
              effective 8-16 是 2026 的标准答案。
            </div>
            <div className="mt-1 font-mono text-[11px] text-ink/65">
              Unsloth / Axolotl / TRL 默认 effective 8 起步，显存不够就 micro=1+accum=16，
              数学等价。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function formatRecipe(tab: "pretrain" | "finetune", n: number): string {
  if (tab === "pretrain") {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + " M";
    if (n >= 1_000) return (n / 1_000).toFixed(0) + " K";
    return n.toString();
  }
  return n.toString();
}

export default SectionRecipes;
