/**
 * Section 04 · Fitcheck
 *
 * 「70B 装得下吗？」 —— 选硬件 + 选上下文长度，看 9 种 quant 哪些能跑。
 *
 * 反模板：
 *   ─ quantization 站用过「双 chip 模型 × 硬件」组合，本站是「硬件 + 上下文长度」两轴
 *   ─ deploy 站用过「PagedAttention 内存格」，本站没有 cell grid，是横排 quant 状态条
 *
 * 数据：
 *   ─ Llama 3.3/3.1 70B Instruct 各 quant 文件大小：insiderllm.com 2026/04 · bartowski HF GGUF page
 *   ─ KV cache 公式：num_layers(80) × num_kv_heads(8) × head_dim(128) × 2(K+V) × FP16(2B) / token
 *     = 327680 B/token ≈ 0.327 KB/token
 *     4K ctx → 1.3 GB · 32K → 10.5 GB · 128K → 42 GB
 */
import React, { useState } from "react";
import { Cpu, MemoryStick, Check, X, AlertTriangle } from "lucide-react";

type Hardware = {
  id: string;
  name: string;
  vram: number;
  /** 标签：消费级 / 工作站 / 数据中心 */
  cls: "consumer" | "pro" | "dc" | "mac";
  /** 一句话场景 */
  sub: string;
};

const HARDWARE: Hardware[] = [
  { id: "rtx5070", name: "RTX 5070", vram: 12, cls: "consumer", sub: "12 GB · 主流游戏卡" },
  { id: "m3max-16", name: "Mac M3 Pro", vram: 18, cls: "mac", sub: "18 GB · MacBook 起步" },
  { id: "rtx4090", name: "RTX 4090", vram: 24, cls: "consumer", sub: "24 GB · 单卡天花板" },
  { id: "rtx5090", name: "RTX 5090", vram: 32, cls: "consumer", sub: "32 GB · 2026 新旗舰" },
  { id: "rtx6000", name: "RTX 6000 Ada", vram: 48, cls: "pro", sub: "48 GB · 工作站卡" },
  { id: "m4max-64", name: "Mac M4 Max", vram: 64, cls: "mac", sub: "64 GB · 统一内存" },
  { id: "h100-80", name: "H100 SXM", vram: 80, cls: "dc", sub: "80 GB · 数据中心卡" },
  { id: "m3ultra", name: "Mac M3 Ultra", vram: 192, cls: "mac", sub: "192 GB · Mac Studio 顶配" },
];

type Quant = {
  name: string;
  /** 文件大小（GB） */
  fileGB: number;
  /** 颜色 token */
  tone: "pop" | "coral" | "butter" | "teal" | "ink";
  /** 简短质量描述 */
  q: string;
};

const QUANTS: Quant[] = [
  { name: "F16", fileGB: 141.2, tone: "ink", q: "原始" },
  { name: "Q8_0", fileGB: 75.0, tone: "teal", q: "近无损" },
  { name: "Q6_K", fileGB: 57.9, tone: "teal", q: "高质" },
  { name: "Q5_K_M", fileGB: 50.0, tone: "teal", q: "高质" },
  { name: "Q4_K_M", fileGB: 42.5, tone: "butter", q: "甜区" },
  { name: "IQ4_XS", fileGB: 38.4, tone: "butter", q: "甜区" },
  { name: "Q3_K_M", fileGB: 34.3, tone: "coral", q: "省空间" },
  { name: "IQ3_M", fileGB: 32.0, tone: "coral", q: "省空间" },
  { name: "Q2_K", fileGB: 26.4, tone: "pop", q: "极限" },
];

/** KV cache GB / token (Llama 3.1 70B, FP16) */
const KV_GB_PER_TOKEN = 0.327680 / 1024; // ~0.32 KB/token → /1024 GB/token

const CTX_OPTIONS: { id: string; tokens: number; label: string }[] = [
  { id: "4k", tokens: 4096, label: "4K" },
  { id: "8k", tokens: 8192, label: "8K" },
  { id: "32k", tokens: 32768, label: "32K" },
  { id: "128k", tokens: 131072, label: "128K" },
];

/** 静态系统开销 */
const OVERHEAD_GB = 1.5;

type Status = "fits" | "tight" | "oom";

function evaluate(file: number, ctxTokens: number, vram: number): { status: Status; needGB: number } {
  const kv = ctxTokens * KV_GB_PER_TOKEN;
  const need = file + kv + OVERHEAD_GB;
  if (need <= vram - 1) return { status: "fits", needGB: need };
  if (need <= vram + 1.5) return { status: "tight", needGB: need };
  return { status: "oom", needGB: need };
}

const SectionFitcheck: React.FC = () => {
  const [hwId, setHwId] = useState<string>("rtx6000");
  const [ctxId, setCtxId] = useState<string>("8k");

  const hw = HARDWARE.find((h) => h.id === hwId)!;
  const ctx = CTX_OPTIONS.find((c) => c.id === ctxId)!;
  const kvGB = ctx.tokens * KV_GB_PER_TOKEN;

  const results = QUANTS.map((q) => ({
    ...q,
    eval: evaluate(q.fileGB, ctx.tokens, hw.vram),
  }));

  const fits = results.filter((r) => r.eval.status === "fits");
  const bestFit = fits[fits.length - 1] ?? null; // 最大 quant that still fits

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">FITS · 装得下吗</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3 max-w-3xl">
          Llama 3.3 70B 在你的硬件上能跑哪种 quant？
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          算法很简单：文件大小 + KV cache (上下文 × 0.32 KB/token) + 1.5 GB 系统开销 ≤ 显存。
          换硬件、换上下文，下方 9 种 quant 实时变绿 / 黄 / 灰。
        </p>

        {/* 硬件选择 row */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-3.5 h-3.5 text-ink" strokeWidth={2.5} />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              hardware
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {HARDWARE.map((h) => {
              const on = h.id === hwId;
              return (
                <button
                  key={h.id}
                  onClick={() => setHwId(h.id)}
                  className={[
                    "px-3 py-2 rounded-lg border-2 border-ink font-mono text-[11px] font-semibold transition-all duration-200 text-left",
                    on
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                      : "bg-white text-ink/70 hover:bg-butter-tint",
                  ].join(" ")}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold">{h.name}</span>
                    <span className={on ? "text-butter" : "text-ink/45"}>
                      {h.vram}G
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 上下文长度 row */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <MemoryStick className="w-3.5 h-3.5 text-ink" strokeWidth={2.5} />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              context length
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CTX_OPTIONS.map((c) => {
              const on = c.id === ctxId;
              return (
                <button
                  key={c.id}
                  onClick={() => setCtxId(c.id)}
                  className={[
                    "px-3 py-1.5 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200",
                    on
                      ? "bg-coral text-cream shadow-[3px_3px_0_0_#241C15]"
                      : "bg-white text-ink/70 hover:bg-cream",
                  ].join(" ")}
                >
                  {c.label}
                </button>
              );
            })}
            <span className="ml-2 self-center font-mono text-[10.5px] text-ink/50">
              KV cache · {kvGB.toFixed(1)} GB
            </span>
          </div>
        </div>

        {/* 主结果卡 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl overflow-hidden">
          {/* header */}
          <div className="flex flex-wrap items-center gap-3 px-5 lg:px-6 py-4 bg-cream border-b-2 border-ink">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
                配置
              </div>
              <div className="font-display text-[18px] font-bold text-ink">
                {hw.name} <span className="text-ink/50 font-normal">·</span> {ctx.label} ctx
              </div>
              <div className="font-mono text-[11px] text-ink/55 mt-0.5">
                {hw.sub}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
                能跑的最大 quant
              </div>
              <div className="font-display text-[22px] font-bold text-coral">
                {bestFit ? bestFit.name : "— 跑不动"}
              </div>
              <div className="font-mono text-[11px] text-ink/55 mt-0.5">
                {bestFit ? `${bestFit.fileGB} GB · ${bestFit.q}` : "70B 在这块卡上得换更小模型"}
              </div>
            </div>
          </div>

          {/* 9 quant 状态条 */}
          <div className="divide-y-2 divide-ink/10" key={`${hwId}-${ctxId}`}>
            {results.map((r, i) => {
              const isFit = r.eval.status === "fits";
              const isTight = r.eval.status === "tight";
              const utilization = (r.eval.needGB / hw.vram) * 100;
              return (
                <div
                  key={r.name}
                  className={[
                    "flex flex-wrap items-center gap-3 px-5 lg:px-6 py-3 transition-colors duration-200",
                    isFit
                      ? "bg-white"
                      : isTight
                        ? "bg-butter-tint/30"
                        : "bg-ink/[0.02]",
                  ].join(" ")}
                  style={{ animation: `enterFade 400ms ${i * 30}ms ease-out both` }}
                >
                  {/* status icon */}
                  <div
                    className={[
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 border-ink flex-shrink-0",
                      isFit
                        ? "bg-teal text-cream"
                        : isTight
                          ? "bg-butter text-ink"
                          : "bg-cream text-ink/35",
                    ].join(" ")}
                  >
                    {isFit ? (
                      <Check className="w-4 h-4" strokeWidth={3} />
                    ) : isTight ? (
                      <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.5} />
                    ) : (
                      <X className="w-4 h-4" strokeWidth={3} />
                    )}
                  </div>

                  {/* quant name + tag */}
                  <div className="w-24 flex-shrink-0">
                    <div
                      className={[
                        "font-mono text-[13px] font-bold",
                        isFit || isTight ? "text-ink" : "text-ink/40",
                      ].join(" ")}
                    >
                      {r.name}
                    </div>
                    <div className="font-mono text-[10px] text-ink/50 mt-0.5">
                      {r.q}
                    </div>
                  </div>

                  {/* utilization bar */}
                  <div className="flex-1 min-w-[140px]">
                    <div className="h-2.5 bg-ink/8 rounded-full overflow-hidden border border-ink/10">
                      <div
                        className={[
                          "h-full transition-all duration-400 ease-spring",
                          isFit
                            ? "bg-teal"
                            : isTight
                              ? "bg-butter-deep"
                              : "bg-pop/60",
                        ].join(" ")}
                        style={{ width: `${Math.min(100, utilization)}%` }}
                      />
                    </div>
                  </div>

                  {/* 数字 */}
                  <div className="w-44 flex-shrink-0 text-right font-mono text-[11.5px] text-ink/70 tabular-nums">
                    {r.eval.needGB.toFixed(1)} / {hw.vram} GB
                    <span className="ml-2 text-ink/45">
                      ({utilization.toFixed(0)}%)
                    </span>
                  </div>

                  {/* status label */}
                  <div className="w-20 flex-shrink-0 text-right">
                    <span
                      className={[
                        "inline-block px-2 py-0.5 rounded-md font-mono text-[10px] uppercase tracking-[0.18em] font-bold",
                        isFit
                          ? "bg-teal/15 text-teal"
                          : isTight
                            ? "bg-butter-deep/20 text-ink"
                            : "bg-pop/15 text-pop",
                      ].join(" ")}
                    >
                      {isFit ? "fits" : isTight ? "tight" : "OOM"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-5 font-mono text-[10.5px] text-ink/45">
          来源：insiderllm.com 70B VRAM guide · bartowski/Meta-Llama-3.1-70B-Instruct-GGUF · nodepedia.com 2026/04
        </p>
      </div>
    </section>
  );
};

export default SectionFitcheck;
