/**
 * Section 05 · Llama 4 三兄弟 · Scout vs Maverick vs Behemoth
 *
 * 形式跟 moe 站「7 张架构身份证 + sort」明确不同：
 *   ─ 这里只 toggle 两个已发模型（Scout / Maverick）
 *   ─ 焦点是「同样 17B active，16 expert vs 128 expert」的容量对比
 *   ─ Behemoth 单独作为「至今未发」事实卡静态展示
 *
 * 数据来源：
 *   - github.com/meta-llama/llama-models/tree/main/models/llama4 MODEL_CARD
 *   - mubibai.com「How Meta trained Llama 4」7.38M H100 GPU 时
 *   - tokenmix.ai/blog/llama-4-behemoth-still-training-2026 (2026-04-23)
 *   - LMArena ELO Maverick chat 1417
 *   - Wall Street Journal 2025-05 Behemoth slip 报道
 */
import React, { useState } from "react";
import { Cpu, Eye } from "lucide-react";

type Variant = {
  id: "scout" | "maverick";
  name: string;
  experts: number; // routed
  shared: number;
  topK: number;
  activeB: number;
  totalB: number;
  context: string;
  tokens: string;
  fitOn: string;
  highlight: string;
  released: string;
};

const VARIANTS: Variant[] = [
  {
    id: "scout",
    name: "Llama 4 Scout",
    experts: 16,
    shared: 1,
    topK: 1,
    activeB: 17,
    totalB: 109,
    context: "10 M tokens",
    tokens: "≈ 40 T 训练 token",
    fitOn: "单张 H100（Int4 量化）",
    highlight: "上下文 10M · 当时整个开源圈唯一",
    released: "2025-04-05",
  },
  {
    id: "maverick",
    name: "Llama 4 Maverick",
    experts: 128,
    shared: 1,
    topK: 1,
    activeB: 17,
    totalB: 400,
    context: "1 M tokens",
    tokens: "≈ 22 T 训练 token",
    fitOn: "单台 H100 主机 8 卡",
    highlight: "LMArena ELO 1417 · 跟 DeepSeek V3 同档",
    released: "2025-04-05",
  },
];

const SectionLlama4: React.FC = () => {
  const [activeId, setActiveId] = useState<"scout" | "maverick">("scout");
  const v = VARIANTS.find((x) => x.id === activeId)!;

  /* expert 网格行列：Scout 16 = 4×4，Maverick 128 = 8×16 */
  const cols = v.experts === 16 ? 4 : 16;
  const rows = v.experts === 16 ? 4 : 8;
  const cellSize = v.experts === 16 ? 24 : 12;
  const gap = v.experts === 16 ? 5 : 2;

  /* 假装这次 token 走了 expert 索引 = 7（视觉锚） */
  const routedIdx = v.experts === 16 ? 7 : 41;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">llama 4 · the moe pivot</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          Llama 4 把
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-pop/40 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">dense 砍了</span>
          </span>
          ，全家上 MoE。
        </h2>

        <p className="max-w-2xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          Llama 1 到 3 都是 dense decoder-only —— 每个 token 走过所有参数。
          Llama 4 改路：FFN 拆成 N 个专家，每 token 只走 1 routed + 1 shared。
          Meta 同时发了 Scout 和 Maverick 两个尺寸，名字跟 expert 数走，不跟参数走。
        </p>

        {/* toggle */}
        <div className="inline-flex p-1 bg-white border-2 border-ink rounded-full shadow-stamp mb-8">
          {VARIANTS.map((x) => {
            const on = x.id === activeId;
            return (
              <button
                key={x.id}
                onClick={() => setActiveId(x.id)}
                className={[
                  "px-5 py-2 rounded-full font-display text-[14px] font-bold transition-all duration-200 ease-spring",
                  on ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
                ].join(" ")}
              >
                {x.name}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-12">
          {/* 左：核心数字 */}
          <div className="lg:col-span-5 space-y-4">
            <div
              key={v.id + "-card"}
              className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6 animate-enter-fade"
            >
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  17B × {v.experts}E
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                  released {v.released}
                </div>
              </div>
              <h3 className="font-display text-[28px] lg:text-[32px] font-bold text-ink leading-tight mb-3">
                {v.name}
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <Stat label="active params" value={`${v.activeB} B`} />
                <Stat label="total params" value={`${v.totalB} B`} />
                <Stat label="routed experts" value={String(v.experts)} />
                <Stat label="context" value={v.context} />
              </div>

              <div className="bg-cream border border-ink/15 rounded-xl px-3 py-2 mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                  fits on
                </div>
                <div className="text-[13px] text-ink font-semibold">{v.fitOn}</div>
              </div>
              <div className="bg-cream border border-ink/15 rounded-xl px-3 py-2 mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                  trained on
                </div>
                <div className="text-[13px] text-ink font-semibold">{v.tokens}</div>
              </div>
              <div className="bg-ink text-cream rounded-xl px-3 py-2.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-0.5">
                  highlight
                </div>
                <div className="text-[13px]">{v.highlight}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-ink/65">
              <Eye className="w-3.5 h-3.5" strokeWidth={2.4} />
              <p className="font-mono text-[10.5px] leading-relaxed">
                两兄弟都原生多模态：图像 patch 跟文本 token 同一个 transformer 处理。
              </p>
            </div>
          </div>

          {/* 右：expert 网格 */}
          <div className="lg:col-span-7">
            <div
              key={v.id + "-grid"}
              className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6 animate-enter-fade"
            >
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-coral" strokeWidth={2.4} />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 font-bold">
                  {v.experts} routed expert · top-1 路由 · 1 shared 全员都走
                </span>
              </div>

              <div className="bg-cream border-2 border-ink rounded-2xl p-4 lg:p-5">
                <div
                  className="mx-auto"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
                    gridAutoRows: `${cellSize}px`,
                    gap: `${gap}px`,
                    width: `${cols * cellSize + (cols - 1) * gap}px`,
                  }}
                >
                  {Array.from({ length: rows * cols }).map((_, i) => {
                    const isRouted = i === routedIdx;
                    return (
                      <div
                        key={i}
                        className={[
                          "border border-ink rounded-[3px] transition-all duration-300 ease-spring",
                          isRouted ? "bg-coral shadow-[2px_2px_0_0_#241C15] scale-110" : "bg-white",
                        ].join(" ")}
                        style={{ width: cellSize, height: cellSize }}
                      />
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-center gap-5 font-mono text-[10.5px] text-ink/65">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-coral border border-ink rounded-[2px]" />
                    本次 token 路由到的 routed expert
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-white border border-ink rounded-[2px]" />
                    其他未激活
                  </div>
                </div>
              </div>

              {/* 容量对比 footer */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <Mini label="参数总量" value={`${v.totalB} B`} hint={v.experts === 16 ? "小" : "大"} />
                <Mini
                  label="每 token 计算"
                  value={`${v.activeB} B`}
                  hint="两者一样"
                  same
                />
                <Mini
                  label="单 expert 容量"
                  value={`${Math.round(((v.totalB - v.activeB) / v.experts) * 10) / 10} B`}
                  hint={v.experts === 16 ? "粗粒度" : "细粒度"}
                />
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/45">
                来源：meta-llama/llama-models/llama4 MODEL_CARD · mubibai.com 2025-04
              </p>
            </div>
          </div>
        </div>

        {/* Behemoth · 至今未发卡 */}
        <div className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8 relative overflow-hidden">
          <div
            className="absolute top-4 right-5 font-mono text-[10px] uppercase tracking-[0.2em] text-coral font-bold"
          >
            still in training · 384 days +
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-butter mb-2">
            llama 4 behemoth · 三号位
          </div>
          <h3 className="font-display text-[24px] lg:text-[28px] font-bold text-cream leading-tight mb-3">
            「教师模型」 · 至今没发出来
          </h3>

          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <Stat dark label="active" value="288 B" />
            <Stat dark label="total" value="≈ 2 T" />
            <Stat dark label="experts" value="16" />
          </div>

          <p className="text-[14px] text-cream/80 leading-relaxed max-w-3xl">
            2025-04-05 跟 Scout / Maverick 同日「宣布」，但只是宣布还在训练。
            《华尔街日报》5 月报道训练受阻，从夏天推到秋天，再之后官方就不更新了。
            到 2026-05 还是「未发布」。Behemoth 在工程上的角色是给小兄弟做教师模型蒸馏，不打算单发权重。
          </p>

          <p className="mt-4 font-mono text-[10px] text-cream/40 max-w-3xl">
            来源：tokenmix.ai/blog/llama-4-behemoth-still-training-2026 · WSJ 2025-05 · ai.meta.com 公告未更新
          </p>
        </div>
      </div>
    </section>
  );
};

const Stat: React.FC<{ label: string; value: string; dark?: boolean }> = ({
  label,
  value,
  dark,
}) => (
  <div
    className={[
      "rounded-xl px-3 py-2 border-2 border-ink",
      dark ? "bg-ink text-cream" : "bg-cream",
    ].join(" ")}
  >
    <div
      className={[
        "font-mono text-[10px] uppercase tracking-[0.18em] mb-0.5",
        dark ? "text-butter" : "text-ink/55",
      ].join(" ")}
    >
      {label}
    </div>
    <div className="font-display text-[18px] font-bold tabular-nums">{value}</div>
  </div>
);

const Mini: React.FC<{ label: string; value: string; hint: string; same?: boolean }> = ({
  label,
  value,
  hint,
  same,
}) => (
  <div className="bg-white border border-ink/20 rounded-xl px-3 py-2.5">
    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
      {label}
    </div>
    <div className="font-display text-[18px] font-bold text-ink leading-tight tabular-nums">
      {value}
    </div>
    <div
      className={[
        "font-mono text-[9.5px] mt-0.5",
        same ? "text-teal font-bold" : "text-ink/55",
      ].join(" ")}
    >
      {hint}
    </div>
  </div>
);

export default SectionLlama4;
