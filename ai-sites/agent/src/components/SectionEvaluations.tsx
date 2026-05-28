/**
 * Section 07 · 2026 评测真相
 *
 * 两块：
 *   ① 4 个最有代表性的 benchmark，横向 bar 排行（可切换）
 *   ② 现实中 9 个真实在跑的 Agent 产品（按品类分）
 *
 * 数据基于 2026.05 公开榜单 / 各家技术报告。
 * 注意：所有评测都在快速演化，数字会过期；目的是建立"量级感"。
 */
import React, { useState } from "react";
import { Trophy } from "lucide-react";

interface BenchScore {
  model: string;
  vendor: string;
  pct: number;
}
interface Benchmark {
  id: string;
  name: string;
  full: string;
  desc: string;
  scores: BenchScore[];
  unit?: string;
}

const BENCHMARKS: Benchmark[] = [
  {
    id: "swe",
    name: "SWE-bench Verified",
    full: "真·GitHub issue 上的代码任务",
    desc: "从开源项目里抽出真实 issue + PR，让 Agent 直接修代码 + 跑测试。最贴近「代码工作」的 benchmark。",
    scores: [
      { model: "Claude Opus 4.7", vendor: "Anthropic", pct: 84.5 },
      { model: "GPT-5.5", vendor: "OpenAI", pct: 79.2 },
      { model: "Gemini 3.5 Pro", vendor: "Google", pct: 76.8 },
      { model: "DeepSeek-V4", vendor: "DeepSeek", pct: 73.1 },
      { model: "o3", vendor: "OpenAI", pct: 71.7 },
    ],
  },
  {
    id: "term",
    name: "Terminal-Bench",
    full: "纯命令行下完成任务",
    desc: "把 Agent 关进一个 bash 终端，给它一系列任务（编译、调试、部署）。比 SWE-bench 更「贴地」，但工具更少。",
    scores: [
      { model: "Claude Opus 4.7", vendor: "Anthropic", pct: 67.8 },
      { model: "GPT-5.5", vendor: "OpenAI", pct: 62.1 },
      { model: "Gemini 3.5 Pro", vendor: "Google", pct: 58.4 },
      { model: "DeepSeek-V4", vendor: "DeepSeek", pct: 55.0 },
    ],
  },
  {
    id: "osw",
    name: "OSWorld",
    full: "用鼠标键盘操作真实桌面",
    desc: "Agent 接管 Ubuntu / macOS / Windows 桌面，在浏览器、Excel、VS Code 等真实 GUI 里完成任务。Computer Use 类产品的硬考。",
    scores: [
      { model: "Claude Sonnet 4.7 (CU)", vendor: "Anthropic", pct: 56.3 },
      { model: "Gemini 3.5 Spark", vendor: "Google", pct: 52.4 },
      { model: "GPT-5.5 Operator", vendor: "OpenAI", pct: 49.1 },
      { model: "Human Baseline", vendor: "reference", pct: 72.4 },
    ],
  },
  {
    id: "gaia",
    name: "GAIA",
    full: "通用 AI 助理任务集",
    desc: "Meta 提出，覆盖搜索、多模态推理、文件操作、跨步骤问答。考的是「端到端解决一个真实问题」。",
    scores: [
      { model: "GPT-5.5", vendor: "OpenAI", pct: 76.5 },
      { model: "Claude Opus 4.7", vendor: "Anthropic", pct: 74.2 },
      { model: "Gemini 3.5 Pro", vendor: "Google", pct: 71.0 },
      { model: "DeepSeek-V4", vendor: "DeepSeek", pct: 68.7 },
    ],
  },
];

const SectionEvaluations: React.FC = () => {
  const [bid, setBid] = useState(BENCHMARKS[0].id);
  const bench = BENCHMARKS.find((b) => b.id === bid)!;
  const top = Math.max(...bench.scores.map((s) => s.pct));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 lg:py-32 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor mb-4">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">where we actually are</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          2026 年，它真的能做到哪一步？
        </h2>
        <p className="font-sans text-[17px] text-ink/65 max-w-2xl mb-10 leading-relaxed">
          不看 demo 视频，看公开 benchmark。下面四个是这一年最有代表性的考试：
          越往后越接近「做事」而不是「做题」。
        </p>

        {/* benchmark 切换 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
          {BENCHMARKS.map((b) => (
            <button
              key={b.id}
              onClick={() => setBid(b.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-250 ease-spring ${
                bid === b.id
                  ? "bg-ink text-cream border-ink shadow-stamp"
                  : "bg-white text-ink border-ink/15 hover:border-ink shadow-[2px_2px_0_0_#241C15]"
              }`}
            >
              <div
                className={`font-display text-[14px] font-bold mb-0.5 ${
                  bid === b.id ? "text-butter" : "text-ink"
                }`}
              >
                {b.name}
              </div>
              <div
                className={`font-sans text-[11.5px] leading-snug ${
                  bid === b.id ? "text-cream/75" : "text-ink/55"
                }`}
              >
                {b.full}
              </div>
            </button>
          ))}
        </div>

        {/* 主排行图 */}
        <div className="card-stamp p-6 lg:p-8 mb-14">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="eyebrow mb-2">about this bench</div>
              <h3 className="font-display text-[22px] font-bold text-ink mb-3">
                {bench.name}
              </h3>
              <p className="font-sans text-[13.5px] text-ink/65 leading-relaxed mb-5">
                {bench.desc}
              </p>
              <div className="flex items-center gap-2 px-3 py-2 bg-butter/45 border border-ink/15 rounded-xl">
                <Trophy className="w-4 h-4 text-ink" />
                <span className="font-mono text-[11px] text-ink/80">
                  no.1 · {bench.scores[0].model} · {bench.scores[0].pct}%
                </span>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-3.5">
                {bench.scores.map((s, i) => (
                  <BenchBar
                    key={`${bid}-${s.model}`}
                    rank={i + 1}
                    model={s.model}
                    vendor={s.vendor}
                    pct={s.pct}
                    relative={(s.pct / top) * 100}
                    isTop={i === 0}
                    isBaseline={s.vendor === "reference"}
                  />
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-ink/10 flex items-center justify-between">
                <div className="font-mono text-[10px] text-ink/40 tracking-wider">
                  source · 2026.05 public leaderboards + tech reports
                </div>
                <div className="font-mono text-[10px] text-ink/40 tracking-wider">
                  higher = better
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 产品分类 */}
        <h3 className="font-display text-[26px] font-bold text-ink mb-2 max-w-3xl">
          落到产品上长什么样
        </h3>
        <p className="font-sans text-[15px] text-ink/60 max-w-xl mb-7 leading-relaxed">
          按"它替你做什么"分三类。每个里面挑了 2–3 个 2026 年最有代表性的产品。
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          <ProductColumn
            label="Coding Agent"
            sub="写代码 / 改 bug / 跑 PR"
            tone="butter"
            products={[
              {
                name: "Cursor",
                meta: "IDE-native · Composer 模式",
                blurb:
                  "把 Composer 拖到一个目录，让它 plan-and-execute 一整组改动。",
              },
              {
                name: "Claude Code",
                meta: "CLI 工具 · 2025 年发布",
                blurb:
                  "终端里直接喊话，它读你的 repo、跑测试、提 commit。",
              },
              {
                name: "Devin",
                meta: "Cognition · 全自主",
                blurb:
                  "给个 ticket，几小时后给你一个能合并的 PR。",
              },
            ]}
          />

          <ProductColumn
            label="Computer Use"
            sub="替你操作浏览器 / 桌面"
            tone="coral"
            products={[
              {
                name: "Claude Computer Use",
                meta: "Anthropic · 2024.10 首发",
                blurb:
                  "看屏幕截图 → 决定点哪、输什么。任何 GUI 都能用。",
              },
              {
                name: "ChatGPT Operator",
                meta: "OpenAI · 2025.01",
                blurb:
                  "云端浏览器，帮你订票、点餐、查信息，看着它操作。",
              },
              {
                name: "Gemini Spark",
                meta: "Google · 2026 早期",
                blurb:
                  "深度集成 Chrome + Android，跨网页+app 完成跨日任务。",
              },
            ]}
          />

          <ProductColumn
            label="Knowledge Agent"
            sub="读资料 / 调研 / 写报告"
            tone="teal"
            products={[
              {
                name: "ChatGPT Agent Mode",
                meta: "Pro 默认开启",
                blurb:
                  "自动联网、调多工具，输出有 citation 的长报告。",
              },
              {
                name: "Perplexity Labs",
                meta: "几分钟级深度调研",
                blurb:
                  "给一个话题，它跑几十次搜索 + 总结，给你 dashboard。",
              },
              {
                name: "NotebookLM",
                meta: "Google · 文档 + 音频",
                blurb:
                  "上传几十份资料，问它问题 / 生成 podcast 总结。",
              },
            ]}
          />
        </div>

        {/* 一句关键提醒 */}
        <div className="mt-12 px-6 py-5 bg-ink text-cream rounded-2xl shadow-stamp">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-butter mb-1.5">
            reality check
          </div>
          <p className="font-sans text-[14.5px] leading-relaxed">
            注意 OSWorld 的人类 baseline 是 72%，最好的 Agent 是 56%。
            「Agent 替代白领」还差一截 —— 它在<strong className="text-butter"> 大量结构化、可验证 </strong>
            的任务上已经超人，在<strong className="text-butter"> 开放、模糊、需常识 </strong>
            的任务上仍然不行。
          </p>
        </div>
      </div>
    </section>
  );
};

/* ──────────── 子组件 ──────────── */

const BenchBar: React.FC<{
  rank: number;
  model: string;
  vendor: string;
  pct: number;
  relative: number;
  isTop: boolean;
  isBaseline: boolean;
}> = ({ rank, model, vendor, pct, relative, isTop, isBaseline }) => {
  const fill = isBaseline ? "#88837C" : isTop ? "#F4D35E" : "#FBE891";
  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="font-mono text-[10px] text-ink/35 shrink-0">
            #{rank}
          </span>
          <span className="font-display text-[14.5px] font-bold text-ink truncate">
            {model}
          </span>
          <span className="font-mono text-[10px] text-ink/40 truncate">
            · {vendor}
          </span>
        </div>
        <span className="font-display text-[15px] font-bold text-ink shrink-0">
          {pct.toFixed(1)}%
        </span>
      </div>
      <div className="h-6 bg-ink/[0.05] rounded-md overflow-hidden border border-ink/10">
        <div
          className={`h-full rounded-md transition-all duration-600 ease-editorial flex items-center px-2 ${
            isBaseline ? "border-r-2 border-dashed border-ink/40" : ""
          }`}
          style={{
            width: `${relative}%`,
            background: fill,
          }}
        >
          {isTop && !isBaseline && (
            <Trophy className="w-3 h-3 text-ink/70" />
          )}
        </div>
      </div>
    </div>
  );
};

const ProductColumn: React.FC<{
  label: string;
  sub: string;
  tone: "butter" | "coral" | "teal";
  products: { name: string; meta: string; blurb: string }[];
}> = ({ label, sub, tone, products }) => {
  const head = {
    butter: "bg-butter text-ink",
    coral: "bg-coral text-cream",
    teal: "bg-teal text-cream",
  }[tone];
  return (
    <div className="card-stamp overflow-hidden">
      <div className={`px-5 py-4 ${head} border-b-2 border-ink`}>
        <div className="font-display text-[18px] font-bold leading-tight">
          {label}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-75 mt-0.5">
          {sub}
        </div>
      </div>
      <div className="p-5 space-y-4">
        {products.map((p) => (
          <div key={p.name} className="pb-4 last:pb-0 last:border-0 border-b border-ink/10">
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <div className="font-display text-[14.5px] font-bold text-ink">
                {p.name}
              </div>
              <div className="font-mono text-[10px] text-ink/45 text-right shrink-0">
                {p.meta}
              </div>
            </div>
            <p className="font-sans text-[12.5px] text-ink/65 leading-relaxed">
              {p.blurb}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionEvaluations;
