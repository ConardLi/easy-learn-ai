/**
 * Section 04 · GPT-3 in-context learning · 真实跑分
 *
 * 主交互（L3）：拖示例数 slider（0 / 1 / 4 / 16 / 32 / 64）
 *   ─ 看 GPT-3 175B 在 3 个真实任务上的准确率怎么变
 *   ─ 同时看左边 prompt 视觉演示：N 个 example 塞进 prompt 里
 * 次交互（L2）：top 3 个任务 pill 切换
 *
 * 真实跑分来自 arXiv:2005.14165 Table & Figures：
 *   ─ TriviaQA closed-book：0=64.3, 1=68.0, 64=71.2（变化温和）
 *   ─ Fr→En 翻译 BLEU：0=21.2, 1=33.7, 64=39.2（0→1 跳得最猛）
 *   ─ SuperGLUE avg：0=46.0, 1=52.0, 32=71.8（一路稳涨）
 *
 * 三条曲线形状完全不同 —— 这是论文真正想表达的：in-context 不是"越多越好"，
 * 是"任务自己决定 shape"。
 */
import React, { useMemo, useState } from "react";

type TaskKey = "trivia" | "trans" | "superglue";

type Task = {
  key: TaskKey;
  short: string;
  full: string;
  metric: string;
  /* shot → score（论文里有的几个点，其他线性插值） */
  scores: { k: number; v: number }[];
  baseline: { label: string; v: number };
  exampleQ: string;
  exampleA: string;
  note: string;
  tone: string;
};

const TASKS: Task[] = [
  {
    key: "trivia",
    short: "TriviaQA",
    full: "TriviaQA · 闭卷问答（不让查资料）",
    metric: "% 准确率",
    scores: [
      { k: 0, v: 64.3 },
      { k: 1, v: 68.0 },
      { k: 4, v: 70.3 },
      { k: 16, v: 71.0 },
      { k: 32, v: 71.2 },
      { k: 64, v: 71.2 },
    ],
    baseline: { label: "T5-11B fine-tuned", v: 60.5 },
    exampleQ: "Q: Who painted the Mona Lisa?\nA:",
    exampleA: "Leonardo da Vinci",
    note: "GPT-3 不查资料 · 知识全靠预训练记住",
    tone: "#1B4B5A",
  },
  {
    key: "trans",
    short: "Fr→En 翻译",
    full: "Fr → En 机器翻译 · BLEU",
    metric: "BLEU 分",
    scores: [
      { k: 0, v: 21.2 },
      { k: 1, v: 33.7 },
      { k: 4, v: 37.5 },
      { k: 16, v: 38.8 },
      { k: 32, v: 39.1 },
      { k: 64, v: 39.2 },
    ],
    baseline: { label: "fine-tuned SOTA", v: 45.6 },
    exampleQ: "sea otter => loutre de mer",
    exampleA: "cheese => fromage",
    note: "0 → 1 shot 跳 12.5 分 · 「看一个例子就知道任务长啥样」",
    tone: "#E07A5F",
  },
  {
    key: "superglue",
    short: "SuperGLUE",
    full: "SuperGLUE · 综合语言理解",
    metric: "平均分",
    scores: [
      { k: 0, v: 46.0 },
      { k: 1, v: 52.5 },
      { k: 4, v: 64.3 },
      { k: 8, v: 68.2 },
      { k: 16, v: 70.6 },
      { k: 32, v: 71.8 },
    ],
    baseline: { label: "BERT-Large fine-tuned", v: 69.0 },
    exampleQ: "Boolean: Does France share a border with Spain?",
    exampleA: "True",
    note: "32-shot 反超 fine-tuned BERT-Large（71.8 vs 69.0）",
    tone: "#F4D35E",
  },
];

const SHOT_STOPS = [0, 1, 4, 8, 16, 32, 64];

function scoreAt(task: Task, k: number): number {
  /* 数组中找最近的两个点线性插值 */
  const pts = task.scores;
  for (let i = 0; i < pts.length; i++) {
    if (pts[i].k === k) return pts[i].v;
  }
  for (let i = 1; i < pts.length; i++) {
    if (k < pts[i].k) {
      const a = pts[i - 1];
      const b = pts[i];
      const t = (k - a.k) / (b.k - a.k);
      return a.v + (b.v - a.v) * t;
    }
  }
  return pts[pts.length - 1].v;
}

const SectionFewShot: React.FC = () => {
  const [taskKey, setTaskKey] = useState<TaskKey>("trans");
  const [stopIdx, setStopIdx] = useState(1); /* default 1-shot */
  const task = TASKS.find((t) => t.key === taskKey)!;
  const k = SHOT_STOPS[stopIdx];

  const score = useMemo(() => scoreAt(task, k), [task, k]);
  const delta = useMemo(() => score - task.scores[0].v, [task, score]);
  const max = useMemo(() => Math.max(task.baseline.v, ...task.scores.map((s) => s.v)) + 8, [task]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream/40">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">in-context learning · GPT-3</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-4">
              不微调，
              <br />
              <span className="bg-coral/20 px-1.5">把例子塞进 prompt 就行。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              先分清两件事：<strong className="text-ink">微调</strong>是拿标注数据再练一遍、动模型内部的参数；这里要讲的不动一个参数，
              只把几个例子写进输入（prompt），模型当场照着学。
            </p>
            <p className="mt-3 text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              这是 GPT-3 论文最反常识的发现：175 B 模型大到一定程度，新任务不需要再训练。
              你把 0、1、几十个示例写进 prompt，模型直接照着做，准确率猛涨。
              拖示例数看 3 个真实任务的反应 —— 三条曲线形状完全不一样。
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                关键词
              </div>
              <p className="font-display text-[15px] font-bold text-ink leading-snug mb-1.5">
                in-context learning
              </p>
              <p className="font-mono text-[11px] text-ink/55 leading-relaxed">
                示例只放在 prompt 里。权重一个 bit 没改 —— 但模型行为变了。
              </p>
            </div>
          </div>
        </div>

        {/* 主卡 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          {/* task pill */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mr-2">
              换任务
            </div>
            {TASKS.map((t) => {
              const on = t.key === taskKey;
              return (
                <button
                  key={t.key}
                  onClick={() => setTaskKey(t.key)}
                  className={[
                    "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[11.5px] font-bold transition-all duration-250 ease-spring",
                    on
                      ? "text-cream shadow-[3px_3px_0_0_#241C15]"
                      : "bg-white text-ink/70 hover:bg-cream",
                  ].join(" ")}
                  style={on ? { backgroundColor: t.tone, color: t.key === "superglue" ? "#241C15" : "#FBEFE3" } : undefined}
                >
                  {t.short}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* 左：prompt 视觉 */}
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① 实际塞进 prompt 的内容
              </div>
              <div className="p-4 bg-cream/60 border-2 border-ink rounded-2xl min-h-[260px]" key={`${taskKey}-${k}`}>
                <div className="font-mono text-[10.5px] text-ink/55 mb-2">
                  task: <span className="text-ink font-bold">{task.full}</span>
                </div>

                {/* k 个示例 */}
                {Array.from({ length: Math.min(k, 4) }).map((_, i) => (
                  <div
                    key={i}
                    className="mb-2 p-2 bg-butter/40 border-[1.5px] border-ink/85 rounded font-mono text-[11.5px] text-ink leading-relaxed whitespace-pre-line animate-enter-fade"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="text-ink/45 text-[9.5px] mr-1">[ex {i + 1}]</span>{" "}
                    {task.exampleQ.split("\n")[0]}{" "}
                    <span className="text-coral font-bold">{task.exampleA}</span>
                  </div>
                ))}
                {k > 4 && (
                  <div className="mb-2 font-mono text-[10.5px] text-ink/50">
                    ⋮ 再来 {k - 4} 条同类示例
                  </div>
                )}

                {/* 真正要问的 query */}
                <div className="mt-3 p-2 bg-white border-2 border-ink rounded font-mono text-[11.5px] text-ink leading-relaxed">
                  <span className="text-ink/45 text-[9.5px] mr-1">[query]</span>{" "}
                  <span className="font-bold">→</span>{" "}
                  <span className="text-teal italic">GPT-3 这里填答案</span>
                </div>

                <div className="mt-3 font-mono text-[10.5px] text-ink/50">
                  {k === 0
                    ? "zero-shot：什么都没给，光读任务描述"
                    : k === 1
                    ? "one-shot：1 个示范"
                    : `${k}-shot：${k} 条示范填满 prompt 上下文`}
                </div>
              </div>
            </div>

            {/* 右：slider + 分数 + baseline 对比 */}
            <div className="lg:col-span-7">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    ② 示例数 K
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[44px] lg:text-[52px] font-bold text-ink leading-none tabular-nums">
                      {k}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">shot</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    {task.metric}
                  </div>
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span
                      className="font-display text-[40px] font-bold leading-none tabular-nums"
                      style={{ color: task.tone === "#F4D35E" ? "#241C15" : task.tone }}
                    >
                      {score.toFixed(1)}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-ink/55 mt-0.5">
                    {delta >= 0 ? "+" : ""}
                    {delta.toFixed(1)} vs 0-shot
                  </div>
                </div>
              </div>

              {/* slider */}
              <input
                type="range"
                min={0}
                max={SHOT_STOPS.length - 1}
                step={1}
                value={stopIdx}
                onChange={(e) => setStopIdx(parseInt(e.target.value))}
                className="w-full accent-coral cursor-pointer"
                aria-label="示例数"
              />
              <div className="flex justify-between font-mono text-[10px] text-ink/45 mt-1">
                {SHOT_STOPS.map((s, i) => (
                  <span
                    key={s}
                    className={i === stopIdx ? "text-ink font-bold" : ""}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* baseline 对比 bar */}
              <div className="mt-7 space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ③ vs 微调过的对照模型
                </div>

                {/* GPT-3 row */}
                <div className="flex items-center gap-3">
                  <div className="w-32 font-mono text-[11px] font-bold text-ink shrink-0">
                    GPT-3 175B
                  </div>
                  <div className="flex-1 h-7 bg-cream border-2 border-ink rounded-full overflow-hidden relative">
                    <div
                      className="h-full transition-all duration-300 ease-spring"
                      style={{
                        width: `${(score / max) * 100}%`,
                        backgroundColor: task.tone,
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-end pr-3 font-mono text-[11px] font-bold text-ink tabular-nums">
                      {score.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* baseline row */}
                <div className="flex items-center gap-3">
                  <div className="w-32 font-mono text-[10.5px] text-ink/65 shrink-0">
                    {task.baseline.label}
                  </div>
                  <div className="flex-1 h-7 bg-cream border-2 border-ink/30 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-ink/30"
                      style={{ width: `${(task.baseline.v / max) * 100}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-end pr-3 font-mono text-[11px] text-ink/65 tabular-nums">
                      {task.baseline.v.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 font-mono text-[11px] text-ink/65 leading-relaxed bg-cream/60 border-2 border-ink/15 rounded-xl p-3">
                {task.note}
              </p>

              <p className="mt-3 font-mono text-[10px] text-ink/40">
                跑分来源：arXiv:2005.14165 Brown et al. · GPT-3 175B
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFewShot;
