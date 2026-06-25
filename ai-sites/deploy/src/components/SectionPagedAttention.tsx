/**
 * Section 03 · PagedAttention 招牌优化
 *
 * vLLM 最出名的优化就是它。
 *
 * 视觉：
 *   - 上方 toggle 切换「传统 KV cache」vs「Paged KV cache」
 *   - slider 调并发请求数 1-12
 *   - 左 / 右两幅块图对比：
 *     - 传统：每个请求一整段长方形（按 max_seq_len 预分配），实际只用其中一截，剩下都是浪费
 *     - Paged：固定大小块按需分配，几乎无浪费
 *   - 右侧实时统计：浪费率 · 能服务的并发数
 *
 * 数据：
 *   - vLLM PagedAttention 论文：60-80% 浪费 → < 4% 浪费
 *   - vLLM 比 HuggingFace transformers 高 24× 吞吐
 *   - vLLM SoloSoft 2026
 */
import React, { useState, useMemo } from "react";
import { Database, Layers, ExternalLink } from "lucide-react";

/* 模拟 12 个请求 · 每个真实输出长度（token 数）。来自 ShareGPT 分布的样本。 */
const REQ_LENGTHS = [128, 56, 412, 320, 88, 240, 64, 180, 36, 512, 156, 92];
const MAX_LEN = 512; // 传统模式下每个请求按这个数预分配
const BLOCK_SIZE = 16; // paged 模式下每块容纳 16 个 token
const GPU_KV_BUDGET = 80; // 假设 KV cache 总预算 = 80 "格" (每格 = 1 块 = 16 token)
const BUDGET_TOKENS = GPU_KV_BUDGET * BLOCK_SIZE; // 1280 token 总预算

const SectionPagedAttention: React.FC = () => {
  const [mode, setMode] = useState<"trad" | "paged">("trad");
  const [activeReqs, setActiveReqs] = useState(8);

  const stats = useMemo(() => {
    const reqs = REQ_LENGTHS.slice(0, activeReqs);
    const used = reqs.reduce((a, b) => a + b, 0);

    if (mode === "trad") {
      const reserved = reqs.length * MAX_LEN;
      const waste = reserved - used;
      const wastePct = reserved === 0 ? 0 : (waste / reserved) * 100;
      const canServe = Math.floor(BUDGET_TOKENS / MAX_LEN);
      const oom = reserved > BUDGET_TOKENS;
      return {
        reserved,
        used,
        waste,
        wastePct,
        canServe,
        oom,
      };
    } else {
      const reserved = reqs.reduce((a, l) => a + Math.ceil(l / BLOCK_SIZE) * BLOCK_SIZE, 0);
      const waste = reserved - used;
      const wastePct = reserved === 0 ? 0 : (waste / reserved) * 100;
      const avgLen = used / reqs.length || 1;
      const avgBlocks = Math.ceil(avgLen / BLOCK_SIZE);
      const canServe = Math.floor(GPU_KV_BUDGET / Math.max(avgBlocks, 1));
      const oom = reserved > BUDGET_TOKENS;
      return {
        reserved,
        used,
        waste,
        wastePct,
        canServe,
        oom,
      };
    }
  }, [mode, activeReqs]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">paged attention</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          <h2 className="lg:col-span-7 font-display text-display-lg text-ink leading-tight">
            vLLM 快在哪？
            <br />
            <span className="relative inline-block">
              <span className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
              <span className="relative z-10">KV 显存按小块分配，少浪费。</span>
            </span>
          </h2>
          <div className="lg:col-span-5 self-end space-y-3 text-[15px] text-ink/70 leading-relaxed">
            <p>
              先说 <strong className="text-ink">KV cache</strong>：模型每生成一个字，都要把前面聊过的内容记成一份「笔记」存在显存里，聊得越长占得越多。
            </p>
            <p>
              传统做法：每个请求一上来就按最长可能的长度预订一大段连续显存。实际只用前面一截，后面全空着。
            </p>
            <p>
              <strong className="text-ink">PagedAttention</strong>：像分页一样，把显存切成 16-token 的小块，要用了才发一块。浪费从 60-80% 砍到 4% 以下，同一张卡能同时服务的人多 4-10×。
            </p>
          </div>
        </div>

        {/* toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex p-1 bg-white border-2 border-ink rounded-full shadow-stamp">
            {(["trad", "paged"] as const).map((m) => {
              const on = m === mode;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={[
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11.5px] font-bold uppercase tracking-wider transition-all duration-250 ease-spring",
                    on ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
                  ].join(" ")}
                >
                  {m === "trad" ? (
                    <>
                      <Database className="w-3.5 h-3.5" strokeWidth={2.4} />
                      传统 KV
                    </>
                  ) : (
                    <>
                      <Layers className="w-3.5 h-3.5" strokeWidth={2.4} />
                      Paged KV
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-ink/55 uppercase tracking-wider">
              并发请求
            </span>
            <input
              type="range"
              min={1}
              max={12}
              step={1}
              value={activeReqs}
              onChange={(e) => setActiveReqs(Number(e.target.value))}
              className="w-40 accent-coral"
            />
            <span className="font-display text-[22px] font-bold text-ink tabular-nums">
              {activeReqs}
            </span>
          </div>
        </div>

        {/* 主视图：左可视化 + 右数据 */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* 内存视图 */}
          <div className="lg:col-span-8 bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                GPU KV cache · 预算 {GPU_KV_BUDGET} 块 = {BUDGET_TOKENS} tokens
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-ink/55">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-teal border border-ink" />
                  用了
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-coral/30 border border-ink" />
                  浪费
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-cream border border-ink" />
                  空闲
                </span>
              </div>
            </div>

            <MemoryView mode={mode} activeReqs={activeReqs} />

            {stats.oom && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-pop text-white border-2 border-ink rounded-full">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                  OOM · 显存爆了 · 请求要排队
                </span>
              </div>
            )}
          </div>

          {/* 数据面板 */}
          <div className="lg:col-span-4 space-y-3">
            <StatCard
              label="占用 tokens"
              value={`${stats.reserved}`}
              sub={`真实用了 ${stats.used}`}
              accent={stats.oom ? "pop" : "ink"}
            />
            <StatCard
              label="浪费率"
              value={`${stats.wastePct.toFixed(0)}%`}
              sub={`${stats.waste} 个空 token 槽`}
              accent={stats.wastePct > 40 ? "coral" : "teal"}
            />
            <StatCard
              label="同卡能稳服务"
              value={`≈ ${stats.canServe}`}
              sub="个并发请求"
              accent="butter"
            />
          </div>
        </div>

        {/* 另一半：continuous batching */}
        <div className="mt-8 p-5 bg-white border-2 border-ink rounded-2xl shadow-stamp max-w-3xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
            和它搭档的另一半 · continuous batching 连续批处理
          </div>
          <p className="text-[14px] text-ink/75 leading-relaxed">
            省下显存只是第一步。还得让显卡别闲着：
            <strong className="text-ink">谁先答完，就立刻把新请求顶上那个空位</strong>，不用等一整批人都答完再换。
            这就是连续批处理 —— 和 PagedAttention 一起，让一张卡同时接住几十上百个人。
          </p>
          <a
            href="../continuous-batching/index.html"
            className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-butter border-2 border-ink rounded-full shadow-stamp hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            <ExternalLink className="w-3 h-3 text-ink" strokeWidth={2.6} />
            <span className="font-sans text-[12px] text-ink/80">
              去《Continuous Batching》亲手推进每一轮，看请求怎样进入、完成和补位
            </span>
          </a>
        </div>

        <p className="mt-6 font-mono text-[10.5px] text-ink/45 max-w-3xl">
          数据：vLLM PagedAttention 论文 (Kwon et al., SOSP 2023) · 60-80% 浪费 → &lt;4% ·
          solosoft.dev 2026 · 2-4× 吞吐 vs FasterTransformer/Orca · vs HuggingFace transformers 高 24×
        </p>
      </div>
    </section>
  );
};

/* ─────────── 内存视图 ─────────── */

const COLS = 20; // 一行 20 格
const ROWS = 4; // 共 4 行 = 80 格 = GPU_KV_BUDGET
const REQ_COLORS = [
  "#1B4B5A",
  "#E07A5F",
  "#E5BD3A",
  "#FF4D74",
  "#1B4B5A",
  "#E07A5F",
  "#E5BD3A",
  "#FF4D74",
  "#1B4B5A",
  "#E07A5F",
  "#E5BD3A",
  "#FF4D74",
];

const MemoryView: React.FC<{ mode: "trad" | "paged"; activeReqs: number }> = ({
  mode,
  activeReqs,
}) => {
  const cellSize = 22;
  const gap = 2;
  const W = COLS * (cellSize + gap);
  const H = ROWS * (cellSize + gap) + 6;

  type Cell = {
    state: "used" | "waste" | "free";
    color?: string;
    req?: number;
  };

  const grid: Cell[] = Array.from({ length: COLS * ROWS }, () => ({ state: "free" }));

  if (mode === "trad") {
    /* 传统：每个请求按 MAX_LEN=512 tokens 预订连续空间。1 格 = 16 tokens。所以每个请求占 32 格。
       80 格预算 → 只能装 2 个完整请求。activeReqs 超过 2 就 OOM。
       但为可视化展示，我们让它"溢出"前先画前几个完整请求。 */
    const blocksPerReq = Math.ceil(MAX_LEN / BLOCK_SIZE); // 32
    let cursor = 0;
    for (let r = 0; r < activeReqs; r++) {
      const usedBlocks = Math.ceil(REQ_LENGTHS[r] / BLOCK_SIZE);
      for (let b = 0; b < blocksPerReq; b++) {
        if (cursor >= grid.length) break;
        grid[cursor] = {
          state: b < usedBlocks ? "used" : "waste",
          color: REQ_COLORS[r % REQ_COLORS.length],
          req: r,
        };
        cursor++;
      }
      if (cursor >= grid.length) break;
    }
  } else {
    /* Paged：每个请求按实际 token 数 / BLOCK_SIZE 取整 + 一块尾部 partial 浪费。
       全部装在一个池子里，紧凑排列。 */
    let cursor = 0;
    for (let r = 0; r < activeReqs; r++) {
      const len = REQ_LENGTHS[r];
      const blocks = Math.ceil(len / BLOCK_SIZE);
      const wasteInLast = blocks * BLOCK_SIZE - len;
      for (let b = 0; b < blocks; b++) {
        if (cursor >= grid.length) break;
        const isPartial = b === blocks - 1 && wasteInLast > 0;
        grid[cursor] = {
          state: isPartial ? "used" : "used", // paged 模式下最后一块部分填满，我们也算成 used；只在 stats 里算成 waste 的一小部分
          color: REQ_COLORS[r % REQ_COLORS.length],
          req: r,
        };
        cursor++;
      }
      if (cursor >= grid.length) break;
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {grid.map((cell, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = col * (cellSize + gap);
        const y = row * (cellSize + gap);

        let fill = "#FBEFE3";
        let opacity = 1;
        let stroke = "#241C15";
        let strokeOpacity = 0.15;

        if (cell.state === "used" && cell.color) {
          fill = cell.color;
          strokeOpacity = 0.7;
        } else if (cell.state === "waste" && cell.color) {
          fill = cell.color;
          opacity = 0.18;
          strokeOpacity = 0.3;
        }

        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            rx={3}
            fill={fill}
            opacity={opacity}
            stroke={stroke}
            strokeOpacity={strokeOpacity}
            strokeWidth={1}
            className="transition-all duration-300 ease-out"
          />
        );
      })}
    </svg>
  );
};

/* ─────────── stat 卡 ─────────── */
const StatCard: React.FC<{
  label: string;
  value: string;
  sub: string;
  accent: "ink" | "coral" | "teal" | "butter" | "pop";
}> = ({ label, value, sub, accent }) => {
  const bg: Record<typeof accent, string> = {
    ink: "bg-white",
    coral: "bg-coral text-white",
    teal: "bg-teal text-white",
    butter: "bg-butter",
    pop: "bg-pop text-white",
  };
  return (
    <div
      className={`p-4 border-2 border-ink rounded-2xl shadow-stamp transition-all duration-300 ${bg[accent]}`}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70 mb-1">
        {label}
      </div>
      <div className="font-display text-[28px] font-bold tabular-nums leading-none">
        {value}
      </div>
      <div className="font-mono text-[11px] opacity-65 mt-1.5">{sub}</div>
    </div>
  );
};

export default SectionPagedAttention;
