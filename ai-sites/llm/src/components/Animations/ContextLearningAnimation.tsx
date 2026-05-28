/**
 * 上下文学习动画 · 交互式（你来当 LLM）
 *
 * 设计：
 *   ─ 用户编辑 / 增删 few-shot examples，输入 query
 *   ─ 系统模拟 LLM：示例越多越完整，置信度越高
 *   ─ 0 示例：纯 zero-shot，置信度低；1 示例：onset；3+ 示例：高置信
 *   ─ 同步显示"LLM 推断出的任务模式"
 *   ─ 强调 ICL = 模式匹配，不是真理解
 *
 * 教学点：
 *   ─ Few-shot 比 zero-shot 大幅提升准确率（GPT-3 论文核心发现）
 *   ─ 示例数量决定模式归纳的稳定性
 *   ─ 模型不更新参数，只通过 context 学习
 */
import React, { useMemo, useState } from "react";
import { Plus, X, Sparkles, Brain } from "lucide-react";

interface Task {
  id: string;
  name: string;
  pattern: string;
  emoji: string;
  defaultExamples: { input: string; output: string }[];
  /** 知识库 query -> 答案；不在表中的 query 会标记"模型不确定" */
  knowledge: Record<string, string>;
  /** 可选纯函数转换（如大小写）—— 若提供则覆盖 knowledge */
  transform?: (s: string) => string;
}

const TASKS: Task[] = [
  {
    id: "antonym",
    name: "反义词",
    pattern: "找出英文形容词的反义词",
    emoji: "↔",
    defaultExamples: [
      { input: "hot", output: "cold" },
      { input: "tall", output: "short" },
      { input: "happy", output: "sad" },
    ],
    knowledge: {
      hot: "cold",
      tall: "short",
      happy: "sad",
      light: "dark",
      strong: "weak",
      fast: "slow",
      big: "small",
      smart: "stupid",
      old: "young",
      good: "bad",
      hard: "easy",
      rich: "poor",
      open: "closed",
      full: "empty",
    },
  },
  {
    id: "emoji",
    name: "Emoji 情感",
    pattern: "把 emoji 翻译为情感词",
    emoji: "🎭",
    defaultExamples: [
      { input: "😊", output: "happy" },
      { input: "😢", output: "sad" },
      { input: "😡", output: "angry" },
    ],
    knowledge: {
      "😊": "happy",
      "😢": "sad",
      "😡": "angry",
      "😍": "loving",
      "😎": "cool",
      "😭": "crying",
      "🤔": "thinking",
      "😴": "sleepy",
      "😱": "shocked",
      "🥳": "celebrating",
      "😌": "relieved",
    },
  },
  {
    id: "upper",
    name: "全大写",
    pattern: "把英文单词转为全大写",
    emoji: "A",
    defaultExamples: [
      { input: "hello", output: "HELLO" },
      { input: "world", output: "WORLD" },
      { input: "ai", output: "AI" },
    ],
    knowledge: {},
    transform: (s) => s.toUpperCase(),
  },
];

const ContextLearningAnimation: React.FC = () => {
  const [taskId, setTaskId] = useState(TASKS[0].id);
  const task = useMemo(() => TASKS.find((t) => t.id === taskId)!, [taskId]);

  const [examples, setExamples] = useState(task.defaultExamples);
  const [query, setQuery] = useState("light");

  /* 切换任务时重置示例与默认 query */
  const switchTask = (newId: string) => {
    setTaskId(newId);
    const t = TASKS.find((x) => x.id === newId)!;
    setExamples(t.defaultExamples);
    /* 默认 query = 第一个知识库 key 中不在 examples 里的 */
    if (t.transform) {
      setQuery("learning");
    } else {
      const usedKeys = new Set(t.defaultExamples.map((e) => e.input));
      const candidate = Object.keys(t.knowledge).find((k) => !usedKeys.has(k));
      setQuery(candidate ?? "");
    }
  };

  /* 置信度：基于示例数量 */
  const confidence = useMemo(() => {
    const n = examples.length;
    if (n === 0) return 0.18;
    if (n === 1) return 0.55;
    if (n === 2) return 0.78;
    if (n === 3) return 0.92;
    return 0.95;
  }, [examples]);

  /* 预测 */
  const prediction = useMemo(() => {
    if (!query.trim()) return { text: "—", uncertain: true };
    if (task.transform) {
      return { text: task.transform(query), uncertain: examples.length === 0 };
    }
    const ans = task.knowledge[query.trim().toLowerCase()];
    if (!ans) return { text: "模型不确定", uncertain: true };
    if (examples.length === 0) {
      return { text: "🤷 zero-shot 无法稳定推断", uncertain: true };
    }
    return { text: ans, uncertain: false };
  }, [query, task, examples]);

  /* 模式识别状态 */
  const patternState = useMemo(() => {
    if (examples.length === 0) return { label: "未观察到示例", color: "ink/45" };
    if (examples.length === 1)
      return { label: "示例不足，无法归纳", color: "coral" };
    return { label: task.pattern, color: "ink" };
  }, [examples, task]);

  const addExample = () => {
    if (task.transform) {
      const samples = ["computer", "language", "model"];
      const used = new Set(examples.map((e) => e.input));
      const next = samples.find((s) => !used.has(s)) ?? "example";
      setExamples([
        ...examples,
        { input: next, output: task.transform(next) },
      ]);
      return;
    }
    /* 从 knowledge 找一个未使用的 */
    const used = new Set(examples.map((e) => e.input));
    const candidate = Object.entries(task.knowledge).find(
      ([k]) => !used.has(k) && k !== query.trim().toLowerCase(),
    );
    if (candidate) {
      setExamples([
        ...examples,
        { input: candidate[0], output: candidate[1] },
      ]);
    }
  };

  const removeExample = (i: number) => {
    setExamples(examples.filter((_, idx) => idx !== i));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1.5">
            INTERACTIVE · 你来当 LLM
          </div>
          <h3 className="font-display font-extrabold text-[20px] text-ink">
            上下文学习 · In-Context Learning
          </h3>
        </div>
      </div>

      {/* 任务切换 */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TASKS.map((t) => {
          const active = t.id === taskId;
          return (
            <button
              key={t.id}
              onClick={() => switchTask(t.id)}
              className={`px-3 py-1.5 border-2 border-ink rounded-full font-sans font-bold text-[11px] transition-all duration-200 ease-spring ${
                active
                  ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                  : "bg-white text-ink hover:bg-butter hover:-translate-y-[1px]"
              }`}
            >
              <span className="mr-1">{t.emoji}</span>
              {t.name}
            </button>
          );
        })}
      </div>

      {/* Few-shot 示例区 */}
      <div className="bg-cream border-2 border-ink rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
            Few-shot 示例 · {examples.length} 条
          </div>
          <button
            onClick={addExample}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border-2 border-ink rounded-md font-sans font-bold text-[11px] text-ink shadow-[2px_2px_0_0_#241C15] hover:bg-butter hover:-translate-y-[1px] transition-all duration-200 ease-spring"
          >
            <Plus className="w-3 h-3" strokeWidth={2.5} />
            加一个
          </button>
        </div>
        <div className="space-y-2">
          {examples.length === 0 && (
            <div className="text-center py-4 font-sans text-[12px] text-ink/45 italic">
              没有示例 = zero-shot；试试拖几个进来观察效果
            </div>
          )}
          {examples.map((ex, i) => (
            <div
              key={`${ex.input}-${i}`}
              className="flex items-center gap-2 bg-white border-2 border-ink rounded-lg px-3 py-2"
            >
              <span className="flex-1 font-mono text-[13px] text-ink truncate">
                {ex.input}
              </span>
              <span className="text-ink/40">→</span>
              <span className="flex-1 font-mono text-[13px] font-bold text-coral truncate">
                {ex.output}
              </span>
              <button
                onClick={() => removeExample(i)}
                className="flex items-center justify-center w-6 h-6 text-ink/45 hover:text-coral hover:bg-coral/10 rounded transition-colors"
                aria-label="删除"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Query 输入 */}
      <div className="mb-4">
        <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
          新输入（Query）
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入要预测的词…"
          className="w-full px-4 py-3 bg-white border-2 border-ink rounded-xl font-mono text-[14px] text-ink shadow-[2px_2px_0_0_#241C15] focus:outline-none focus:bg-butter/30 focus:-translate-y-[1px] focus:[box-shadow:3px_3px_0_0_#241C15] transition-all duration-200 ease-spring"
        />
      </div>

      {/* 推断流水线 */}
      <div className="space-y-3">
        {/* 模式 */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-butter border-2 border-ink rounded-lg shadow-[2px_2px_0_0_#241C15] mt-0.5">
            <Brain className="w-4 h-4 text-ink" strokeWidth={2.2} />
          </div>
          <div className="flex-1 bg-white border-2 border-ink rounded-xl p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
              模型推断模式
            </div>
            <div
              className={`font-sans font-bold text-[14px] ${
                patternState.color === "coral"
                  ? "text-coral"
                  : patternState.color === "ink/45"
                    ? "text-ink/45 italic"
                    : "text-ink"
              }`}
            >
              {patternState.label}
            </div>
            {/* 置信度 bar */}
            <div className="mt-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55">
                  置信度
                </span>
                <span className="font-mono text-[10px] font-bold text-ink">
                  {Math.round(confidence * 100)}%
                </span>
              </div>
              <div className="h-2 bg-cream border border-ink/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ink transition-all duration-400 ease-spring"
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 预测 */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-coral border-2 border-ink rounded-lg shadow-[2px_2px_0_0_#241C15] mt-0.5">
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2.2} />
          </div>
          <div className="flex-1 bg-cream border-2 border-ink rounded-xl p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
              预测输出
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[13px] text-ink/45 truncate max-w-[40%]">
                {query || "—"}
              </span>
              <span className="text-ink/40 text-[14px]">→</span>
              <span
                className={`font-display font-extrabold text-[18px] truncate ${
                  prediction.uncertain ? "text-ink/45 italic" : "text-ink"
                }`}
              >
                {prediction.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 教学提示 */}
      <div className="mt-5 px-4 py-3 bg-butter/40 border border-ink/15 rounded-lg">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-1">
          § 试一试
        </div>
        <div className="font-sans text-[12px] text-ink/75 leading-relaxed">
          删掉所有示例（zero-shot），观察预测置信度暴跌；再逐个加回去，看置信度恢复 ——
          这就是 GPT-3 论文里"few-shot &gt; zero-shot"的核心发现，<strong>模型参数完全没变</strong>，
          只是 context 多了几行就 work 了。
        </div>
      </div>
    </div>
  );
};

export default ContextLearningAnimation;
