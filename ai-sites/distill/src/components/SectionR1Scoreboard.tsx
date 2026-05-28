/**
 * Section 04 · 一份真实的成绩单 · DeepSeek R1 蒸馏家族
 *
 * 反直觉锚：一个 7B 蒸馏出来的小模型，在 AIME 2024 上 55.5 分 ——
 * 把 GPT-4o (9.3) 和 Claude 3.5 Sonnet (16.0) 远远抛开。
 * 14B 已经追上 o1-mini 的水平。
 *
 * 形式：4-benchmark tab 切换（L2）+ 横向 SVG bar，按 score 自动排序。
 * 副交互：「只看 R1 蒸馏 / 全部」filter toggle（L2）。
 *
 * 数据：DeepSeek-R1 GitHub README · arXiv:2501.12948 · 2025-01-20 发布。
 */
import React, { useMemo, useState } from "react";

type Model = {
  id: string;
  name: string;
  base?: string;
  family: "distill" | "frontier" | "reasoning";
  size: string;
  scores: Record<string, number>; // benchmark id → score (0-100)
};

const BENCHMARKS = [
  { id: "aime", label: "AIME 2024", desc: "高中数学奥赛级", unit: "% pass@1", max: 100 },
  { id: "math500", label: "MATH-500", desc: "标准数学题集", unit: "% pass@1", max: 100 },
  { id: "gpqa", label: "GPQA Diamond", desc: "博士级科学题", unit: "% pass@1", max: 100 },
  { id: "livecode", label: "LiveCodeBench", desc: "新鲜竞赛题，防训练泄露", unit: "% pass@1", max: 100 },
] as const;

const MODELS: Model[] = [
  /* DeepSeek-R1 蒸馏六件套 */
  { id: "rd-qwen-1.5", name: "R1-Distill-Qwen-1.5B", base: "Qwen2.5-Math-1.5B", family: "distill", size: "1.5B", scores: { aime: 28.9, math500: 83.9, gpqa: 33.8, livecode: 16.9 } },
  { id: "rd-qwen-7", name: "R1-Distill-Qwen-7B", base: "Qwen2.5-Math-7B", family: "distill", size: "7B", scores: { aime: 55.5, math500: 92.8, gpqa: 49.1, livecode: 37.6 } },
  { id: "rd-llama-8", name: "R1-Distill-Llama-8B", base: "Llama-3.1-8B", family: "distill", size: "8B", scores: { aime: 50.4, math500: 89.1, gpqa: 49.0, livecode: 39.6 } },
  { id: "rd-qwen-14", name: "R1-Distill-Qwen-14B", base: "Qwen2.5-14B", family: "distill", size: "14B", scores: { aime: 69.7, math500: 93.9, gpqa: 59.1, livecode: 53.1 } },
  { id: "rd-qwen-32", name: "R1-Distill-Qwen-32B", base: "Qwen2.5-32B", family: "distill", size: "32B", scores: { aime: 72.6, math500: 94.3, gpqa: 62.1, livecode: 57.2 } },
  { id: "rd-llama-70", name: "R1-Distill-Llama-70B", base: "Llama-3.3-70B", family: "distill", size: "70B", scores: { aime: 70.0, math500: 94.5, gpqa: 65.2, livecode: 57.5 } },
  /* 对照组 · 非蒸馏 */
  { id: "gpt4o", name: "GPT-4o (2024-05)", family: "frontier", size: "?", scores: { aime: 9.3, math500: 74.6, gpqa: 49.9, livecode: 32.9 } },
  { id: "sonnet35", name: "Claude 3.5 Sonnet", family: "frontier", size: "?", scores: { aime: 16.0, math500: 78.3, gpqa: 65.0, livecode: 38.9 } },
  { id: "o1mini", name: "OpenAI o1-mini", family: "reasoning", size: "?", scores: { aime: 63.6, math500: 90.0, gpqa: 60.0, livecode: 53.8 } },
  { id: "qwq", name: "QwQ-32B-Preview", family: "reasoning", size: "32B", scores: { aime: 44.0, math500: 90.6, gpqa: 54.5, livecode: 41.9 } },
];

const FAMILY_TONE: Record<Model["family"], { bar: string; tag: string; tagBg: string }> = {
  distill: { bar: "#E07A5F", tag: "蒸馏", tagBg: "#E07A5F" },
  frontier: { bar: "#88837C", tag: "对照 · 大模型", tagBg: "#241C15" },
  reasoning: { bar: "#1B4B5A", tag: "对照 · 推理", tagBg: "#1B4B5A" },
};

const SectionR1Scoreboard: React.FC = () => {
  const [bench, setBench] = useState<typeof BENCHMARKS[number]["id"]>("aime");
  const [onlyDistill, setOnlyDistill] = useState(false);

  const sorted = useMemo(() => {
    const list = onlyDistill ? MODELS.filter((m) => m.family === "distill") : MODELS;
    return [...list].sort((a, b) => b.scores[bench] - a.scores[bench]);
  }, [bench, onlyDistill]);

  const benchInfo = BENCHMARKS.find((b) => b.id === bench)!;
  const topScore = sorted[0]?.scores[bench] ?? 100;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">real scoreboard</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">7B 的学生</span>
          </span>
          ，
          <br className="hidden lg:block" />
          把 GPT-4o 按在地上。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          DeepSeek 把 R1 的推理能力蒸馏到 Qwen / Llama 6 个尺寸上，2025 年 1 月开源。
          <strong className="text-ink">7B 在 AIME 2024 拿 55.5 分</strong>
          ，比 GPT-4o (9.3) 高 6 倍。14B 已经基本追平 o1-mini。
        </p>

        {/* 控制条 */}
        <div className="flex flex-wrap items-center gap-3 mb-7">
          {/* benchmark tabs */}
          <div className="inline-flex flex-wrap rounded-full border-2 border-ink bg-cream overflow-hidden shadow-stamp">
            {BENCHMARKS.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setBench(b.id)}
                className={[
                  "px-3.5 py-2 font-mono text-[11px] font-bold transition-all duration-250",
                  i > 0 ? "border-l-2 border-ink" : "",
                  bench === b.id
                    ? "bg-ink text-cream"
                    : "bg-cream text-ink/70 hover:bg-butter-tint",
                ].join(" ")}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* filter toggle */}
          <button
            onClick={() => setOnlyDistill((v) => !v)}
            className={[
              "px-3.5 py-2 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 shadow-stamp",
              onlyDistill ? "bg-coral text-cream" : "bg-white text-ink/65 hover:-translate-y-0.5",
            ].join(" ")}
          >
            {onlyDistill ? "✓ 只看蒸馏 6 件套" : "只看蒸馏 6 件套"}
          </button>

          <div className="ml-auto font-mono text-[10px] text-ink/45">
            ↑ 按 {benchInfo.label} 自动排名
          </div>
        </div>

        {/* 当前 benchmark 注解 */}
        <div className="mb-6 px-4 py-2.5 bg-cream border-2 border-ink rounded-lg flex items-baseline gap-2">
          <span className="font-display text-[14px] font-bold text-ink">{benchInfo.label}</span>
          <span className="font-mono text-[10px] text-ink/45">·</span>
          <span className="text-[13px] text-ink/65">{benchInfo.desc}</span>
          <span className="font-mono text-[10px] text-ink/40 ml-auto">unit: {benchInfo.unit}</span>
        </div>

        {/* bar list */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
          <div className="space-y-2.5" key={bench + "-" + (onlyDistill ? "d" : "a")}>
            {sorted.map((m, idx) => {
              const score = m.scores[bench];
              const tone = FAMILY_TONE[m.family];
              const widthPct = (score / 100) * 100;
              return (
                <div
                  key={m.id}
                  className="group/row flex items-center gap-3 animate-enter-fade"
                  style={{ animationDelay: `${idx * 35}ms`, animationDuration: "0.5s" }}
                >
                  {/* rank */}
                  <div className="w-7 shrink-0 font-mono text-[11px] text-ink/40 text-right tabular-nums">
                    {idx + 1}
                  </div>
                  {/* name + base */}
                  <div className="w-[180px] lg:w-[220px] shrink-0">
                    <div className="font-display text-[13.5px] font-bold text-ink leading-tight">
                      {m.name}
                    </div>
                    <div className="font-mono text-[10px] text-ink/45 mt-0.5">
                      {m.base ? `base: ${m.base}` : `closed model · size unknown`}
                    </div>
                  </div>
                  {/* family tag */}
                  <div
                    className="hidden sm:block shrink-0 px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-[0.1em]"
                    style={{
                      backgroundColor: tone.tagBg,
                      color: m.family === "frontier" ? "#FBEFE3" : "#FBEFE3",
                    }}
                  >
                    {tone.tag}
                  </div>
                  {/* bar */}
                  <div className="flex-1 h-7 bg-white border-2 border-ink rounded-md relative overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 ease-spring group-hover/row:brightness-110"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: tone.bar,
                      }}
                    />
                    {/* 置顶虚线 = 当前最高 */}
                    {idx === 0 && (
                      <div
                        className="absolute top-0 bottom-0 border-l-2 border-dashed border-ink/30"
                        style={{ left: `${(topScore / 100) * 100}%` }}
                      />
                    )}
                  </div>
                  {/* score */}
                  <div className="w-14 shrink-0 text-right">
                    <span className="font-display text-[17px] font-bold text-ink tabular-nums">
                      {score.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 解读 */}
        <div className="mt-7 grid md:grid-cols-3 gap-4">
          <Insight
            tone="coral"
            num="55.5"
            unit="AIME"
            text="R1-Distill-Qwen-7B 在 AIME 2024，是 GPT-4o（9.3）的 6 倍。"
          />
          <Insight
            tone="butter"
            num="94.5"
            unit="MATH-500"
            text="R1-Distill-Llama-70B 在标准数学题集上 94.5，几乎逼平母模型 R1。"
          />
          <Insight
            tone="teal"
            num="800k"
            unit="样本"
            text="6 个学生模型，全部由同一份 800k 推理轨迹训出来的。"
          />
        </div>

        <p className="mt-5 font-mono text-[10px] text-ink/40">
          来源：DeepSeek-R1 GitHub README · arXiv:2501.12948 · 2025-01-20 开源 ·
          全部 score 摘自官方 evaluation 表格
        </p>
      </div>
    </section>
  );
};

const Insight: React.FC<{ tone: "coral" | "butter" | "teal"; num: string; unit: string; text: string }> = ({ tone, num, unit, text }) => {
  const numColor = { coral: "text-coral", butter: "text-butter-deep", teal: "text-teal" }[tone];
  return (
    <div className="card-stamp px-5 py-4">
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className={`font-display text-[28px] font-bold tabular-nums ${numColor}`}>
          {num}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
          {unit}
        </span>
      </div>
      <p className="text-[13px] text-ink/70 leading-snug">{text}</p>
    </div>
  );
};

export default SectionR1Scoreboard;
