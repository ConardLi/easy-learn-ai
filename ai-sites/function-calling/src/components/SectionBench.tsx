/**
 * Section 05 · 真实评测 · 2026
 *
 * 反直觉钩子：顶级模型在 BFCL v4 上才到 77%。
 * 真实场景看 τ-bench：同一个任务跑 4 次都通过的概率（pass^4），从 0.69 直接掉到 0.46。
 *
 * 主交互（L3）：双 tab 切换 → SVG 横向 bar，每条 bar hover 看模型卡。
 *   ① BFCL v4 总分（2026/04 snapshot）
 *   ② τ-bench retail · pass^1 vs pass^4 consistency 对比
 *
 * 区别于 quantization Section 05 的 tab + 3 数字 + benchmark 列表 + 结尾口语：
 *   ─ 这里主图形是 SVG 横向 bar chart，不是 metric 卡阵列
 *   ─ 第二 tab 不是「另一个生态」而是「同样模型在另一种指标下的崩塌」
 */
import React, { useState } from "react";
import { Trophy, GitFork } from "lucide-react";

type TabId = "bfcl" | "tau";

const TABS: {
  id: TabId;
  label: string;
  sub: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  {
    id: "bfcl",
    label: "BFCL v4 总分",
    sub: "berkeley function-calling · 2026/04",
    Icon: Trophy,
  },
  {
    id: "tau",
    label: "τ-bench retail · pass^k",
    sub: "「跑 4 次都对」的概率塌方",
    Icon: GitFork,
  },
];

/* ─── BFCL v4 数据 · 2026/04/12 snapshot ─── */
/* 来源: gorilla.cs.berkeley.edu/leaderboard + mcpapp-store.com/leaderboard/bfcl-v4 */
const BFCL_ROWS: { model: string; vendor: string; score: number; tone: Tone }[] =
  [
    { model: "Claude Opus 4.6", vendor: "Anthropic", score: 77.47, tone: "coral" },
    { model: "Qwen3.7 Max", vendor: "Alibaba", score: 75.0, tone: "butter" },
    { model: "Claude Sonnet 4.6", vendor: "Anthropic", score: 73.24, tone: "coral" },
    { model: "Gemini 3 Pro", vendor: "Google", score: 72.51, tone: "teal" },
    { model: "Grok 4.1 Fast", vendor: "xAI", score: 69.57, tone: "pop" },
    { model: "Claude Haiku 4.5", vendor: "Anthropic", score: 68.7, tone: "coral" },
    { model: "Gemini 2.5 Flash", vendor: "Google", score: 56.24, tone: "teal" },
  ];

/* ─── τ-bench retail · pass^k 数据 ───
 * 来源: github.com/sierra-research/tau-bench · 2024 原始论文 + 2025/26 更新
 * （tau-bench 已演进到 τ²/τ³-bench，这里用最新公开 retail 分数）
 * 注：retail 比 airline 容易，所以分较高但 pass^k 滑落仍明显
 */
const TAU_ROWS: {
  model: string;
  vendor: string;
  pass1: number;
  pass4: number;
  tone: Tone;
}[] = [
  { model: "Claude 3.5 Sonnet (2024-10)", vendor: "Anthropic", pass1: 69.2, pass4: 46.2, tone: "coral" },
  { model: "Claude 3.5 Sonnet (2024-06)", vendor: "Anthropic", pass1: 62.6, pass4: 38.7, tone: "coral" },
  { model: "GPT-4o", vendor: "OpenAI", pass1: 60.4, pass4: 38.3, tone: "butter" },
];

type Tone = "coral" | "butter" | "teal" | "pop";

const SectionBench: React.FC = () => {
  const [tab, setTab] = useState<TabId>("bfcl");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">benchmarks · 2026</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          调对工具，比
          <br />
          想象的{" "}
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">难得多</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-2">
          实验室会拿固定题库考模型：该查天气时有没有真的去查、城市名有没有填对。
          下面两块榜单就是这种考试结果。
        </p>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-2">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 mr-1 bg-ink/8 border border-ink/15 rounded font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55 font-bold">
            进阶
          </span>
          BFCL v4（Berkeley Function-Calling Leaderboard）专门看「函数选对没 + 参数填对没」。
          2026/04 顶级模型才 77 分。
        </p>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          更狠的是 τ-bench：同一个任务跑 4 次全对的概率（pass^4），比单次准确率几乎砍半。
          说明：
          <strong className="text-ink">调工具这件事，试一次能过 ≠ 上线就稳。</strong>
        </p>

        {/* tab */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {TABS.map((t) => {
            const on = t.id === tab;
            const Icon = t.Icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={[
                  "flex items-center gap-3 px-4 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-200 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp-lg"
                    : "bg-white text-ink hover:bg-cream hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-9 h-9 rounded-xl border-2 border-ink flex items-center justify-center shrink-0",
                    on ? "bg-butter" : "bg-cream",
                  ].join(" ")}
                >
                  <Icon className="w-4 h-4 text-ink" strokeWidth={2.4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[14.5px] font-bold leading-tight">
                    {t.label}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] mt-0.5",
                      on ? "text-cream/55" : "text-ink/50",
                    ].join(" ")}
                  >
                    {t.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 主图 */}
        {tab === "bfcl" ? <BFCLChart /> : <TauChart />}
      </div>
    </section>
  );
};

/* ─── BFCL 横向 bar chart ─── */

const BFCLChart: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  /* viewBox 600 × (40 + rows × 38) · 左侧 lane 标签 180px，bar 区起 200 */
  const rowH = 38;
  const x0 = 200;
  const width = 360;
  const top = 30;
  const maxScore = 80;
  const xScale = (v: number) => x0 + (v / maxScore) * width;

  return (
    <div key="bfcl" className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden animate-enter-fade">
      <div className="px-5 py-3 bg-ink text-cream flex items-center justify-between">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-butter">
          overall accuracy · % · higher is better
        </div>
        <div className="font-mono text-[10px] text-cream/55">
          n = 44 models · sampled 7
        </div>
      </div>

      <div className="px-3 sm:px-5 py-5">
        <svg
          viewBox={`0 0 600 ${top + BFCL_ROWS.length * rowH + 36}`}
          className="w-full h-auto"
        >
          {/* x 轴刻度 */}
          {[0, 25, 50, 75].map((t) => (
            <g key={t}>
              <line
                x1={xScale(t)}
                y1={top - 6}
                x2={xScale(t)}
                y2={top + BFCL_ROWS.length * rowH + 4}
                stroke="#241C15"
                strokeWidth="0.8"
                opacity="0.18"
                strokeDasharray={t === 0 ? undefined : "3 3"}
              />
              <text
                x={xScale(t)}
                y={top - 10}
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#88837C"
              >
                {t}
              </text>
            </g>
          ))}

          {/* bars */}
          {BFCL_ROWS.map((r, i) => {
            const y = top + i * rowH;
            const w = (r.score / maxScore) * width;
            const isHover = hover === r.model;
            const fill = isHover
              ? "#241C15"
              : r.tone === "coral"
                ? "#E07A5F"
                : r.tone === "butter"
                  ? "#E5BD3A"
                  : r.tone === "teal"
                    ? "#1B4B5A"
                    : "#FF4D74";
            const textFill = isHover ? "#FBEFE3" : "#241C15";
            return (
              <g
                key={r.model}
                onMouseEnter={() => setHover(r.model)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                {/* lane label */}
                <text
                  x={x0 - 12}
                  y={y + 18}
                  textAnchor="end"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontSize="12"
                  fontWeight={isHover ? "700" : "600"}
                  fill="#241C15"
                >
                  {r.model}
                </text>
                <text
                  x={x0 - 12}
                  y={y + 30}
                  textAnchor="end"
                  fontFamily="Geist Mono, monospace"
                  fontSize="9.5"
                  fill="#88837C"
                >
                  {r.vendor}
                </text>
                {/* bar bg */}
                <rect
                  x={x0}
                  y={y + 5}
                  width={width}
                  height={22}
                  rx={2}
                  fill="#FFFFFF"
                  stroke="#241C15"
                  strokeWidth="1.4"
                />
                {/* bar fill */}
                <rect
                  x={x0}
                  y={y + 5}
                  width={w}
                  height={22}
                  rx={2}
                  fill={fill}
                  stroke="#241C15"
                  strokeWidth="1.4"
                  style={{
                    transition:
                      "fill 200ms cubic-bezier(0.22,1,0.36,1), width 400ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
                <text
                  x={x0 + w - 8}
                  y={y + 21}
                  textAnchor="end"
                  fontFamily="Geist Mono, monospace"
                  fontSize="11.5"
                  fontWeight="700"
                  fill={textFill}
                >
                  {r.score.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* x label */}
          <text
            x={x0 + width / 2}
            y={top + BFCL_ROWS.length * rowH + 28}
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            fill="#88837C"
          >
            accuracy %
          </text>
        </svg>

        <p className="mt-3 font-mono text-[10.5px] text-ink/45">
          来源 · gorilla.cs.berkeley.edu/leaderboard last updated 2026-04-12 ·
          MCP App Store mirror (mcpapp-store.com/leaderboard/bfcl-v4) ·
          benchlm.ai/benchmarks/bfclV4 (Qwen3.7 Max 2026-05-22)
        </p>

        <div className="mt-4 px-4 py-3 bg-ink text-cream rounded-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
            verdict
          </div>
          <p className="text-[14px] leading-relaxed">
            前 7 名差距 8 分。换更贵的模型帮助有限；工具说明写清楚、提示词写死、失败了重试，这些更管用。
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── τ-bench pass^1 vs pass^4 ─── */

const TauChart: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  const rowH = 80;
  const x0 = 200;
  const width = 360;
  const top = 30;
  const xScale = (v: number) => x0 + (v / 80) * width;

  return (
    <div key="tau" className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden animate-enter-fade">
      <div className="px-5 py-3 bg-ink text-cream flex items-center justify-between">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-butter">
          τ-bench retail · pass^k · % · 跑 k 次都对
        </div>
        <div className="font-mono text-[10px] text-cream/55">
          tool-calling strategy
        </div>
      </div>

      <div className="px-3 sm:px-5 py-5">
        <svg
          viewBox={`0 0 600 ${top + TAU_ROWS.length * rowH + 36}`}
          className="w-full h-auto"
        >
          {/* x 轴刻度 */}
          {[0, 20, 40, 60, 80].map((t) => (
            <g key={t}>
              <line
                x1={xScale(t)}
                y1={top - 6}
                x2={xScale(t)}
                y2={top + TAU_ROWS.length * rowH + 4}
                stroke="#241C15"
                strokeWidth="0.8"
                opacity="0.18"
                strokeDasharray={t === 0 ? undefined : "3 3"}
              />
              <text
                x={xScale(t)}
                y={top - 10}
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#88837C"
              >
                {t}
              </text>
            </g>
          ))}

          {TAU_ROWS.map((r, i) => {
            const y = top + i * rowH;
            const w1 = (r.pass1 / 80) * width;
            const w4 = (r.pass4 / 80) * width;
            const isHover = hover === r.model;
            const drop = (((r.pass1 - r.pass4) / r.pass1) * 100).toFixed(0);
            return (
              <g
                key={r.model}
                onMouseEnter={() => setHover(r.model)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                {/* lane label */}
                <text
                  x={x0 - 12}
                  y={y + 22}
                  textAnchor="end"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontSize="11.5"
                  fontWeight={isHover ? "700" : "600"}
                  fill="#241C15"
                >
                  {r.model.length > 26 ? r.model.slice(0, 25) + "…" : r.model}
                </text>
                <text
                  x={x0 - 12}
                  y={y + 36}
                  textAnchor="end"
                  fontFamily="Geist Mono, monospace"
                  fontSize="9.5"
                  fill="#88837C"
                >
                  {r.vendor}
                </text>

                {/* pass^1 bar */}
                <rect
                  x={x0}
                  y={y + 6}
                  width={w1}
                  height={20}
                  rx={2}
                  fill="#E07A5F"
                  stroke="#241C15"
                  strokeWidth="1.4"
                />
                <text
                  x={x0 + w1 + 6}
                  y={y + 21}
                  fontFamily="Geist Mono, monospace"
                  fontSize="11"
                  fontWeight="700"
                  fill="#241C15"
                >
                  {r.pass1.toFixed(1)}
                </text>
                <text
                  x={x0 + 8}
                  y={y + 21}
                  fontFamily="Geist Mono, monospace"
                  fontSize="10"
                  fontWeight="700"
                  fill="#FBEFE3"
                >
                  pass^1
                </text>

                {/* pass^4 bar */}
                <rect
                  x={x0}
                  y={y + 32}
                  width={w4}
                  height={20}
                  rx={2}
                  fill="#1B4B5A"
                  stroke="#241C15"
                  strokeWidth="1.4"
                />
                <text
                  x={x0 + w4 + 6}
                  y={y + 47}
                  fontFamily="Geist Mono, monospace"
                  fontSize="11"
                  fontWeight="700"
                  fill="#241C15"
                >
                  {r.pass4.toFixed(1)}
                </text>
                <text
                  x={x0 + 8}
                  y={y + 47}
                  fontFamily="Geist Mono, monospace"
                  fontSize="10"
                  fontWeight="700"
                  fill="#FBEFE3"
                >
                  pass^4
                </text>

                {/* drop label */}
                <g transform={`translate(${x0 + width - 10}, ${y + 64})`}>
                  <rect
                    x={-40}
                    y={-9}
                    width={48}
                    height={14}
                    rx={3}
                    fill="#FF4D74"
                    stroke="#241C15"
                    strokeWidth="1.4"
                  />
                  <text
                    x={-16}
                    y={1}
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="9.5"
                    fontWeight="800"
                    fill="#FBEFE3"
                  >
                    ↓{drop}%
                  </text>
                </g>
              </g>
            );
          })}

          {/* x label */}
          <text
            x={x0 + width / 2}
            y={top + TAU_ROWS.length * rowH + 28}
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            fill="#88837C"
          >
            success rate %
          </text>
        </svg>

        <p className="mt-3 font-mono text-[10.5px] text-ink/45">
          来源 · github.com/sierra-research/tau-bench README (TC = tool-calling
          strategy, retail domain) · τ-bench paper arXiv:2406.12045 · τ²/τ³-bench
          后续更新 2026
        </p>

        <div className="mt-4 px-4 py-3 bg-ink text-cream rounded-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
            verdict
          </div>
          <p className="text-[14px] leading-relaxed">
            pass^1 = 单次成功率；pass^4 = 跑 4 次全对的概率。即使是最强的
            tool-calling 模型，重复跑稳定性都打 6 折以下 —— 上线后同一个操作要能安全重跑（行话叫
            <strong className="text-butter">幂等</strong>，跑两次结果一样）、失败要自动重试、结果要再校验一遍。
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionBench;
