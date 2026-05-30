/**
 * Section 03 · 「每一代加了一招」· 架构演进
 *
 * 用户勾选想看哪几代（1 / 2 / 3 / 3.1 / 4），右侧的"transformer 积木图"
 * 上对应的招数模块就会亮起。多选叠加，不选则全灰 base。
 *
 * 跟 transformer 站「Q/K/V 单步 trace」、bert 站「双向 vs 单向矩阵」、
 * pretrain 站「Chinchilla 散点」全不重 —— 这里是"勾选 ＋ 累积视觉差"组合 (L3)。
 *
 * 数据来源：
 *   - Llama 1: arXiv:2302.13971 RMSNorm + SwiGLU + RoPE
 *   - Llama 2: arXiv:2307.09288 70B 引入 GQA
 *   - Llama 3: arXiv:2407.21783 全系 GQA / 词表 128K / RoPE θ=500K
 *   - Llama 3.1: arXiv:2407.21783 405B 上下文 128K
 *   - Llama 4: github.com/meta-llama/llama-models/llama4 MoE + 早期融合多模态
 */
import React, { useState } from "react";
import { Check } from "lucide-react";

type Trick = {
  gen: string;
  ymd: string;
  name: string;
  what: string;
  why: string;
  // 在右侧 SVG 里要点亮的 module key
  module: "rms" | "swiglu" | "rope" | "gqa" | "moe" | "mm";
};

const TRICKS: Trick[] = [
  {
    gen: "Llama 1",
    ymd: "2023·02",
    name: "RMSNorm 替掉 LayerNorm",
    what: "在每个子层之前归一化，但去掉 LayerNorm 的减均值步骤，只保留缩放。",
    why: "少一次减法 + 不需要存均值，训练快约 7%，效果跟 LayerNorm 几乎一样。",
    module: "rms",
  },
  {
    gen: "Llama 1",
    ymd: "2023·02",
    name: "SwiGLU 替掉 GELU",
    what: "FFN 激活换成 Swish · GLU 门控组合，Gated Linear Unit。",
    why: "PaLM 论文证实在 LM 任务上稳定优于 ReLU / GELU，代价是参数变 1.5×。",
    module: "swiglu",
  },
  {
    gen: "Llama 1",
    ymd: "2023·02",
    name: "RoPE 旋转位置编码",
    what: "把位置信息塞进 Q / K 的旋转矩阵，不再用绝对/相对加法。",
    why: "外推到训练没见过的长度更稳。后来扩 context window 主要靠调 RoPE base。",
    module: "rope",
  },
  {
    gen: "Llama 2",
    ymd: "2023·07",
    name: "GQA · Grouped-Query Attention（仅 70B）",
    what: "多个 Query head 共享一组 K/V head，不再每个 Q 配一组 K/V。",
    why: "推理时 KV cache 直接砍掉一半显存。70B 模型从此能塞进单机 8 卡。",
    module: "gqa",
  },
  {
    gen: "Llama 3",
    ymd: "2024·04",
    name: "GQA 下放到 8B / 70B 全系",
    what: "Llama 2 只在 70B 上 GQA，Llama 3 起 8 个 KV head 是全系标配。",
    why: "8B 模型也能拿 GQA 的 KV cache 红利，长上下文部署性价比飞涨。",
    module: "gqa",
  },
  {
    gen: "Llama 3.1",
    ymd: "2024·07",
    name: "RoPE 基频调到 500 000，context 128K",
    what: "把 RoPE 的旋转基频 θ 从 10 000 拉到 500 000。",
    why: "让位置 embedding 在长序列上不「撞车」，把可用上下文从 8K 一路推到 128K。",
    module: "rope",
  },
  {
    gen: "Llama 4",
    ymd: "2025·04",
    name: "MoE · 16 / 128 expert 路由",
    what: "FFN 拆成 N 个专家，每 token 只走 1 个 routed expert + 1 个 shared expert。",
    why: "Scout 17B active / 109B total，Maverick 17B active / 400B total。计算量像小模型，容量像大模型。",
    module: "moe",
  },
  {
    gen: "Llama 4",
    ymd: "2025·04",
    name: "原生多模态 · 早期融合",
    what: "图像 patch 跟文本 token 在同一个 transformer 里被处理，不再外挂视觉塔。",
    why: "Scout 跨文图 grounding 是在 base 训练阶段就联合学的，不是事后 vision adapter。",
    module: "mm",
  },
];

const ALL_GENS = ["Llama 1", "Llama 2", "Llama 3", "Llama 3.1", "Llama 4"];

const SectionTricks: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(["Llama 1"]));

  const toggle = (gen: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(gen)) next.delete(gen);
      else next.add(gen);
      return next;
    });
  };

  /* 当前已激活的 module 集合 */
  const activeModules = new Set<string>();
  TRICKS.forEach((t) => {
    if (selected.has(t.gen)) activeModules.add(t.module);
  });

  /* 当前展示的招数列表 */
  const visibleTricks = TRICKS.filter((t) => selected.has(t.gen));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">tricks each generation added</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          每一代，
          <br />
          就加
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">一两招</span>
          </span>
          。
        </h2>

        <p className="max-w-2xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          Llama 不是一次推翻一次。底子从 1 到 4 都是 decoder-only transformer，每代往里加 1-2 个工程小招。
          下面勾几代看看，右边的 transformer 积木上，对应的模块就会亮起来。
        </p>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* 左：勾选器 + 招数清单 */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 mb-5">
              {ALL_GENS.map((g) => {
                const on = selected.has(g);
                return (
                  <button
                    key={g}
                    onClick={() => toggle(g)}
                    className={[
                      "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[12px] font-bold transition-all duration-200 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                        : "bg-white text-ink/65 hover:bg-butter/30",
                    ].join(" ")}
                  >
                    {on && <Check className="w-3 h-3" strokeWidth={3} />}
                    {g}
                  </button>
                );
              })}
              <button
                onClick={() => setSelected(new Set(ALL_GENS))}
                className="px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold bg-butter text-ink shadow-stamp hover:translate-y-[-2px] transition-transform"
              >
                全选
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="px-3 py-1.5 rounded-full border-2 border-ink/30 font-mono text-[11px] font-bold bg-white text-ink/55"
              >
                清空
              </button>
            </div>

            <div className="space-y-3">
              {visibleTricks.length === 0 && (
                <div className="bg-white border-2 border-dashed border-ink/30 rounded-2xl p-6 text-center">
                  <p className="font-mono text-[12px] text-ink/55">
                    没勾任何代 · 右侧只是裸 transformer 骨架
                  </p>
                </div>
              )}
              {visibleTricks.map((t) => (
                <div
                  key={t.gen + t.name}
                  className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 lg:p-5 animate-enter-fade"
                >
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="font-display text-[16px] font-bold text-ink leading-tight">
                      {t.name}
                    </div>
                    <div className="font-mono text-[10px] text-ink/45 tracking-wider">
                      {t.ymd}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral mb-2">
                    {t.gen}
                  </div>
                  <p className="text-[13.5px] text-ink/80 leading-relaxed mb-1.5">{t.what}</p>
                  <p className="text-[12.5px] text-ink/60 leading-relaxed">{t.why}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 右：transformer 积木 SVG，模块按勾选累积亮起 */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                Llama 一层 transformer 积木
              </div>

              <BlockDiagram active={activeModules} />

              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[10.5px]">
                <Legend on={activeModules.has("rms")} label="RMSNorm" tone="coral" />
                <Legend on={activeModules.has("swiglu")} label="SwiGLU FFN" tone="butter" />
                <Legend on={activeModules.has("rope")} label="RoPE 位置" tone="teal" />
                <Legend on={activeModules.has("gqa")} label="GQA 注意力" tone="pop" />
                <Legend on={activeModules.has("moe")} label="MoE 路由" tone="ink" />
                <Legend on={activeModules.has("mm")} label="多模态早期融合" tone="ink" />
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40 leading-relaxed">
                来源：arXiv:2302.13971 / 2307.09288 / 2407.21783 · github.com/meta-llama/llama-models
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Legend: React.FC<{ on: boolean; label: string; tone: string }> = ({ on, label, tone }) => {
  const dotMap: Record<string, string> = {
    coral: "bg-coral",
    butter: "bg-butter",
    teal: "bg-teal",
    pop: "bg-pop",
    ink: "bg-ink",
  };
  return (
    <div className={["flex items-center gap-1.5", on ? "text-ink" : "text-ink/30"].join(" ")}>
      <span
        className={[
          "w-2.5 h-2.5 rounded-full border border-ink",
          on ? dotMap[tone] : "bg-white",
        ].join(" ")}
      />
      <span className="font-bold tracking-wide">{label}</span>
    </div>
  );
};

/** transformer 单层骨架 SVG · 280×360 */
const BlockDiagram: React.FC<{ active: Set<string> }> = ({ active }) => {
  const onColor = (key: string, color: string) =>
    active.has(key) ? color : "#FFFFFF";
  const onText = (key: string) => (active.has(key) ? "#241C15" : "#88837C");

  return (
    <svg
      viewBox="0 0 280 360"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 输入 */}
      <g>
        <rect
          x="20"
          y="10"
          width="240"
          height="28"
          rx="8"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.75"
        />
        <text
          x="140"
          y="29"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="11"
          fontWeight="700"
          fill="#241C15"
        >
          token + image patch（多模态时）
        </text>
        {/* 多模态早期融合提示 */}
        {active.has("mm") && (
          <rect
            x="20"
            y="10"
            width="240"
            height="28"
            rx="8"
            fill="none"
            stroke="#1B4B5A"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />
        )}
      </g>

      {/* RoPE 应用提示（环绕 attention） */}
      <g
        transform="translate(140, 56)"
        opacity={active.has("rope") ? 1 : 0.25}
      >
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          fill={active.has("rope") ? "#1B4B5A" : "#88837C"}
          letterSpacing="1.2"
        >
          RoPE θ = {active.has("rope") ? "500K" : "—"}
        </text>
      </g>

      {/* RMSNorm pre-attention */}
      <g>
        <rect
          x="20"
          y="68"
          width="240"
          height="26"
          rx="6"
          fill={onColor("rms", "#E07A5F")}
          stroke="#241C15"
          strokeWidth="1.75"
        />
        <text
          x="140"
          y="86"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10.5"
          fontWeight="700"
          fill={active.has("rms") ? "#FBEFE3" : onText("rms")}
        >
          RMSNorm（pre-attn）
        </text>
      </g>

      {/* Attention block */}
      <g>
        <rect
          x="20"
          y="104"
          width="240"
          height="62"
          rx="10"
          fill={active.has("gqa") ? "#FF4D74" : "#FFFFFF"}
          stroke="#241C15"
          strokeWidth="1.75"
        />
        <text
          x="140"
          y="125"
          textAnchor="middle"
          fontFamily="Smiley Sans, sans-serif"
          fontSize="14"
          fontWeight="700"
          fill={active.has("gqa") ? "#FBEFE3" : "#241C15"}
        >
          {active.has("gqa") ? "Grouped-Query Attention" : "Multi-Head Attention"}
        </text>
        <text
          x="140"
          y="145"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fill={active.has("gqa") ? "#FBEFE3" : "#88837C"}
        >
          {active.has("gqa") ? "32 Q · 8 KV head（KV cache ↓4×）" : "32 Q · 32 KV head"}
        </text>
        <text
          x="140"
          y="159"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fill={active.has("gqa") ? "#FBE891" : "#88837C"}
        >
          {active.has("rope") ? "Q,K 旋转位置注入" : "vanilla position add"}
        </text>
      </g>

      {/* RMSNorm pre-FFN */}
      <g>
        <rect
          x="20"
          y="178"
          width="240"
          height="26"
          rx="6"
          fill={onColor("rms", "#E07A5F")}
          stroke="#241C15"
          strokeWidth="1.75"
        />
        <text
          x="140"
          y="196"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10.5"
          fontWeight="700"
          fill={active.has("rms") ? "#FBEFE3" : onText("rms")}
        >
          RMSNorm（pre-ffn）
        </text>
      </g>

      {/* FFN block - 可能是 MoE 也可能是 SwiGLU */}
      <g>
        <rect
          x="20"
          y="214"
          width="240"
          height="80"
          rx="10"
          fill={
            active.has("moe")
              ? "#241C15"
              : active.has("swiglu")
                ? "#F4D35E"
                : "#FFFFFF"
          }
          stroke="#241C15"
          strokeWidth="1.75"
        />
        <text
          x="140"
          y="234"
          textAnchor="middle"
          fontFamily="Smiley Sans, sans-serif"
          fontSize="14"
          fontWeight="700"
          fill={active.has("moe") ? "#FBE891" : "#241C15"}
        >
          {active.has("moe") ? "MoE · routed FFN" : "Feed-Forward Network"}
        </text>

        {/* MoE 时画 16 个小专家方块 */}
        {active.has("moe") ? (
          <g transform="translate(40, 250)">
            {Array.from({ length: 16 }).map((_, i) => {
              const cx = (i % 8) * 25;
              const cy = Math.floor(i / 8) * 16;
              const isActive = i === 3;
              return (
                <rect
                  key={i}
                  x={cx}
                  y={cy}
                  width="20"
                  height="11"
                  rx="2"
                  fill={isActive ? "#FF4D74" : "#5A5147"}
                  stroke="#88837C"
                  strokeWidth="0.6"
                />
              );
            })}
            <text
              x="200"
              y="22"
              textAnchor="end"
              fontFamily="Geist Mono, monospace"
              fontSize="9"
              fill="#FBE891"
            >
              top-1 routed
            </text>
          </g>
        ) : (
          <text
            x="140"
            y="258"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="10.5"
            fill={active.has("swiglu") ? "#241C15" : "#88837C"}
            fontWeight="700"
          >
            {active.has("swiglu")
              ? "SwiGLU · w · σ(Wx) · Vx"
              : "GELU · Wx + b"}
          </text>
        )}
        {!active.has("moe") && active.has("swiglu") && (
          <text
            x="140"
            y="276"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9.5"
            fill="#5A5147"
          >
            参数 ≈ 1.5 × 普通 FFN
          </text>
        )}
      </g>

      {/* 输出 */}
      <g>
        <rect
          x="20"
          y="306"
          width="240"
          height="28"
          rx="8"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.75"
        />
        <text
          x="140"
          y="325"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="11"
          fontWeight="700"
          fill="#241C15"
        >
          → 下一层 ×N（N: 32 / 80 / 126）
        </text>
      </g>

      {/* 残差连线 */}
      <g stroke="#241C15" strokeWidth="1.2" fill="none">
        <path d="M 10 168 Q 5 168 5 88 Q 5 80 10 80" strokeDasharray="3 3" opacity="0.4" />
        <path d="M 270 296 Q 275 296 275 198 Q 275 190 270 190" strokeDasharray="3 3" opacity="0.4" />
      </g>
    </svg>
  );
};

export default SectionTricks;
