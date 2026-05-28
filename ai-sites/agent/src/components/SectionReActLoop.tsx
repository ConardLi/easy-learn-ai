/**
 * Section 03 · Agent 的本质：一个循环
 *
 * 设计：
 *   ─ 左侧：SVG 三角循环图，当前活跃节点高亮 + 流向下一节点的箭头加深
 *   ─ 右侧：trace 序列 + Step 控制（上一步/下一步/重置/自动播放）
 *   ─ 用户可以切换 2 个任务：简单（查天气）和复杂（写博客）
 *
 * 这是整个网站最重要的概念：Agent ≠ 一次性生成，Agent = 持续循环。
 * ReAct 论文 (Yao et al., 2022) 提出 Reason+Act 的交错。
 * 这个 section 让用户亲手单步运行一次，理解为什么"循环"是关键。
 */
import React, { useEffect, useState, useMemo } from "react";
import { Play, Pause, SkipBack, ChevronRight } from "lucide-react";

type NodeKey = "think" | "act" | "observe" | "final";

interface LoopStep {
  node: NodeKey;
  title: string;
  detail: string;
  /** 仅 act/observe 有 */
  meta?: string;
}

interface Scenario {
  id: string;
  label: string;
  question: string;
  steps: LoopStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "weather",
    label: "查天气 · 简单循环 (1 圈)",
    question: "今天北京要带伞吗？",
    steps: [
      {
        node: "think",
        title: "理解 + 计划",
        detail:
          "用户问的是「今天的实际天气」+「要不要带伞的建议」。我没有实时数据，需要调用天气工具。",
      },
      {
        node: "act",
        title: "调用工具",
        detail: "weather.get",
        meta: 'city="北京", date="today"',
      },
      {
        node: "observe",
        title: "看结果",
        detail:
          "返回 → 18–24°C，多云转阵雨，11:00 开始降水概率 60%，傍晚减弱。",
      },
      {
        node: "think",
        title: "形成判断",
        detail:
          "60% 概率高于 50% 阈值，且白天会持续约 4 小时。结论：建议带伞。",
      },
      {
        node: "final",
        title: "回复用户",
        detail:
          "今天 11 点开始有 60% 几率下雨，傍晚减弱，建议带把折叠伞，温度不冷可以穿件薄外套。",
      },
    ],
  },
  {
    id: "blog",
    label: "写技术博客 · 多圈循环",
    question: "帮我写一篇 800 字的「2026 年 AI Agent 现状」博客。",
    steps: [
      {
        node: "think",
        title: "拆任务",
        detail: "目标 800 字 · 需先搜索最新数据 → 大纲 → 初稿 → 自查 → 终稿。",
      },
      {
        node: "act",
        title: "搜资料",
        detail: "web.search",
        meta: 'q="AI agent benchmark 2026", limit=5',
      },
      {
        node: "observe",
        title: "得到资料",
        detail:
          "5 篇结果：SWE-bench、Terminal-Bench、OSWorld、Anthropic Effective Agents 论文、MCP 公告。",
      },
      {
        node: "think",
        title: "起大纲",
        detail:
          "三段式：① 从 chatbot 到 agent 的转变 ② 关键评测数字 ③ 仍待解决的挑战。",
      },
      {
        node: "act",
        title: "写初稿",
        detail: "doc.draft",
        meta: "outline=above, target_words=820",
      },
      {
        node: "observe",
        title: "看初稿",
        detail: "返回 → 855 字 · 包含 3 段 · 引用了 4 个数据点。",
      },
      {
        node: "think",
        title: "自查",
        detail:
          "检查：① 数字准确吗 ✔ ② 文风是否一致 ✔ ③ 开头是否抓人 ✗ → 需要换一个故事化的开头。",
      },
      {
        node: "act",
        title: "改开头",
        detail: "doc.edit",
        meta: 'section="intro", style="story-led"',
      },
      {
        node: "observe",
        title: "看修改",
        detail: "返回 → 开头改为「上周三早晨，我让 Claude 帮我订机票...」",
      },
      {
        node: "final",
        title: "交稿",
        detail: "总字数 832 字，已发到你 Notion「Drafts」目录，标记 ready-for-review。",
      },
    ],
  },
];

const NODE_META: Record<
  NodeKey,
  { name: string; color: string; bg: string; cx: number; cy: number }
> = {
  think: { name: "THINK", color: "#1B4B5A", bg: "#FBE891", cx: 100, cy: 50 },
  act: { name: "ACT", color: "#E07A5F", bg: "#FBE891", cx: 175, cy: 165 },
  observe: { name: "OBSERVE", color: "#241C15", bg: "#FBE891", cx: 25, cy: 165 },
  final: { name: "ANSWER", color: "#241C15", bg: "#F4D35E", cx: 100, cy: 220 },
};

const SectionReActLoop: React.FC = () => {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [cursor, setCursor] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === scenarioId)!,
    [scenarioId],
  );
  const steps = scenario.steps;
  const current = steps[cursor];
  const nextNode = steps[cursor + 1]?.node;
  const loopCount = useMemo(
    () => steps.slice(0, cursor + 1).filter((s) => s.node === "think").length,
    [cursor, steps],
  );

  useEffect(() => {
    setCursor(0);
    setAutoplay(false);
  }, [scenarioId]);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => {
      if (cursor < steps.length - 1) {
        setCursor((c) => c + 1);
      } else {
        setAutoplay(false);
      }
    }, 1400);
    return () => clearTimeout(t);
  }, [autoplay, cursor, steps.length]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 lg:py-32 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor mb-4">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">the core loop</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          它的本质，就是这一个{" "}
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-coral/55 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">循环</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[17px] text-ink/65 max-w-2xl mb-10 leading-relaxed">
          所有"看起来很复杂"的 Agent，去掉包装后都是这三个动作的反复：
          <strong className="text-ink">想想 → 做做 → 看看 → 再想想…</strong>
          每多转一圈，离用户的目标就更近一步。
        </p>

        {/* 场景切换 */}
        <div className="mb-8 flex flex-wrap gap-3">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setScenarioId(s.id)}
              className={`px-4 py-2.5 border-2 border-ink rounded-full font-sans text-[13px] font-semibold transition-all duration-250 ease-spring ${
                scenarioId === s.id
                  ? "bg-ink text-cream shadow-stamp"
                  : "bg-white text-ink hover:bg-butter/40 shadow-[2px_2px_0_0_#241C15]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* 主舞台 */}
        <div className="grid lg:grid-cols-12 gap-7 lg:gap-10">
          {/* ─── 左：SVG 循环图 ─── */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <div className="eyebrow">the loop</div>
                <div className="font-mono text-[11px] text-ink/55 tracking-wider">
                  iter · {loopCount}
                </div>
              </div>

              <LoopDiagram
                currentNode={current.node}
                nextNode={nextNode}
              />

              {/* 用户问 */}
              <div className="mt-4 px-3.5 py-2.5 bg-butter/40 border border-ink/15 rounded-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                  user · prompt
                </div>
                <p className="font-sans text-[13px] text-ink/85 leading-snug">
                  {scenario.question}
                </p>
              </div>
            </div>
          </div>

          {/* ─── 右：Step trace ─── */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-6 lg:p-7">
              {/* 控制条 */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-ink/10">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  trace · {cursor + 1} / {steps.length}
                </div>
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => {
                      setCursor(0);
                      setAutoplay(false);
                    }}
                    aria-label="reset"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </IconButton>
                  <IconButton
                    onClick={() => setAutoplay((a) => !a)}
                    aria-label="autoplay"
                    primary
                  >
                    {autoplay ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </IconButton>
                  <button
                    onClick={() =>
                      setCursor((c) => Math.min(c + 1, steps.length - 1))
                    }
                    disabled={cursor >= steps.length - 1}
                    className="px-3.5 py-2 bg-ink text-cream rounded-full font-sans text-[12.5px] font-semibold inline-flex items-center gap-1 border-2 border-ink shadow-[2px_2px_0_0_#241C15] hover:shadow-stamp transition-all duration-250 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    下一步 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* trace 列表 */}
              <div className="space-y-2.5">
                {steps.slice(0, cursor + 1).map((step, i) => (
                  <TraceRow
                    key={`${scenarioId}-${i}`}
                    step={step}
                    index={i}
                    isCurrent={i === cursor}
                  />
                ))}
              </div>

              {cursor < steps.length - 1 && (
                <div className="mt-4 px-3 py-2 text-center font-mono text-[11px] text-ink/35 tracking-wider">
                  …还有 {steps.length - cursor - 1} 步未展开
                </div>
              )}
            </div>

            {/* takeaway */}
            <div className="mt-5 px-5 py-4 bg-ink text-cream rounded-2xl flex items-start gap-3 shadow-stamp">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-butter shrink-0 mt-0.5">
                takeaway
              </div>
              <p className="font-sans text-[13.5px] leading-relaxed">
                每一次 <code className="font-mono text-butter">Think</code> 之后必须接{" "}
                <code className="font-mono text-butter">Act</code>，每一次{" "}
                <code className="font-mono text-butter">Act</code> 之后必须等{" "}
                <code className="font-mono text-butter">Observe</code> ——
                这个节奏不能跳，否则就退化成「闭眼蒙答案」。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── SVG 三角循环图 ─── */
const LoopDiagram: React.FC<{
  currentNode: NodeKey;
  nextNode?: NodeKey;
}> = ({ currentNode, nextNode }) => {
  /** 几何点 */
  const nodes: Record<NodeKey, { x: number; y: number; r: number }> = {
    think: { x: 100, y: 60, r: 30 },
    act: { x: 175, y: 175, r: 30 },
    observe: { x: 25, y: 175, r: 30 },
    final: { x: 100, y: 245, r: 22 },
  };

  /** 三角形流向路径（带箭头） */
  const Arrow: React.FC<{
    from: NodeKey;
    to: NodeKey;
    active: boolean;
  }> = ({ from, to, active }) => {
    const f = nodes[from];
    const t = nodes[to];
    // 向量缩短到圆边
    const dx = t.x - f.x;
    const dy = t.y - f.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const sx = f.x + ux * f.r;
    const sy = f.y + uy * f.r;
    const ex = t.x - ux * t.r;
    const ey = t.y - uy * t.r;

    return (
      <g>
        <line
          x1={sx}
          y1={sy}
          x2={ex}
          y2={ey}
          stroke={active ? "#E07A5F" : "#241C15"}
          strokeWidth={active ? 3 : 1.6}
          strokeDasharray={active ? "5 4" : "0"}
          opacity={active ? 1 : 0.25}
          className={active ? "animate-dash-flow" : ""}
          strokeLinecap="round"
        />
        {/* 箭头 */}
        <polygon
          points={`${ex},${ey} ${ex - ux * 8 - uy * 5},${ey - uy * 8 + ux * 5} ${ex - ux * 8 + uy * 5},${ey - uy * 8 - ux * 5}`}
          fill={active ? "#E07A5F" : "#241C15"}
          opacity={active ? 1 : 0.25}
        />
      </g>
    );
  };

  const Node: React.FC<{ k: NodeKey }> = ({ k }) => {
    const n = nodes[k];
    const meta = NODE_META[k];
    const isCurrent = currentNode === k;
    const isFinal = k === "final";
    return (
      <g>
        {/* 外层 glow */}
        {isCurrent && (
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r + 8}
            fill="none"
            stroke={meta.color}
            strokeWidth={2}
            opacity={0.25}
            className="animate-pulse-dot"
          />
        )}
        <circle
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={isCurrent ? (isFinal ? "#F4D35E" : "#FBE891") : "#FFFFFF"}
          stroke="#241C15"
          strokeWidth={2.5}
        />
        <text
          x={n.x}
          y={n.y + 4}
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.1em"
          fill="#241C15"
        >
          {meta.name}
        </text>
      </g>
    );
  };

  return (
    <svg
      viewBox="-15 0 230 280"
      className="w-full h-auto"
      role="img"
      aria-label="Think-Act-Observe loop diagram"
    >
      {/* 三角箭头：think→act→observe→think */}
      <Arrow from="think" to="act" active={currentNode === "think" && nextNode === "act"} />
      <Arrow
        from="act"
        to="observe"
        active={currentNode === "act" && nextNode === "observe"}
      />
      <Arrow
        from="observe"
        to="think"
        active={currentNode === "observe" && nextNode === "think"}
      />
      {/* think → final（结束分支） */}
      <Arrow
        from="think"
        to="final"
        active={currentNode === "think" && nextNode === "final"}
      />

      {/* 节点 */}
      <Node k="think" />
      <Node k="act" />
      <Node k="observe" />
      <Node k="final" />
    </svg>
  );
};

/* ─── trace 单行 ─── */
const TraceRow: React.FC<{
  step: LoopStep;
  index: number;
  isCurrent: boolean;
}> = ({ step, index, isCurrent }) => {
  const meta = NODE_META[step.node];

  return (
    <div
      className={`group flex items-stretch gap-3 transition-all duration-300 ${
        isCurrent
          ? "scale-[1.01]"
          : "opacity-65 hover:opacity-90"
      }`}
    >
      {/* 编号 + 节点标签 */}
      <div className="shrink-0 w-20 flex flex-col items-end gap-1 pt-1">
        <div className="font-mono text-[10px] text-ink/35">{String(index + 1).padStart(2, "0")}</div>
        <div
          className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold tracking-[0.12em] border"
          style={{
            background: isCurrent ? meta.bg : "#FFFFFF",
            color: meta.color,
            borderColor: meta.color,
          }}
        >
          {meta.name}
        </div>
      </div>

      {/* 卡片 */}
      <div
        className={`flex-1 rounded-2xl px-4 py-3 border-2 ${
          isCurrent
            ? "border-ink bg-white shadow-stamp"
            : "border-ink/15 bg-white"
        }`}
      >
        <div className="font-sans text-[13.5px] font-semibold text-ink mb-1">
          {step.title}
        </div>
        <p className="font-sans text-[12.5px] text-ink/70 leading-relaxed">
          {step.detail}
        </p>
        {step.meta && (
          <code className="block mt-1.5 font-mono text-[11px] text-coral break-words">
            {step.meta}
          </code>
        )}
      </div>
    </div>
  );
};

const IconButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }
> = ({ children, primary, className = "", ...rest }) => (
  <button
    {...rest}
    className={`w-9 h-9 inline-flex items-center justify-center rounded-full border-2 border-ink transition-all duration-250 ${
      primary
        ? "bg-butter text-ink shadow-[2px_2px_0_0_#241C15] hover:shadow-stamp"
        : "bg-white text-ink hover:bg-cream shadow-[2px_2px_0_0_#241C15]"
    } ${className}`}
  >
    {children}
  </button>
);

export default SectionReActLoop;
