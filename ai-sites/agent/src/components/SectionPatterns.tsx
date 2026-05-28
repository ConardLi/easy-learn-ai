/**
 * Section 05 · 设计模式
 *
 * 来源：Anthropic 《Building Effective Agents》(2024.12) 一文里整理的范式。
 * 这是 2025–2026 业内公认的"agentic system 设计语言"。
 *
 * 5 种 workflow 范式 + 1 种 autonomous 范式，共 6 张图。
 * 每张图都是手画感 SVG，节点 stamp 风格 / 流向虚线。
 */
import React, { useState } from "react";

interface Pattern {
  id: string;
  name: string;
  tag: "workflow" | "autonomous";
  oneliner: string;
  body: string;
  useWhen: string;
  example: string;
  diagram: React.ReactNode;
}

const PATTERNS: Pattern[] = [
  /* ──────── 1. Prompt Chaining ──────── */
  {
    id: "chain",
    name: "Prompt Chaining",
    tag: "workflow",
    oneliner: "把大任务拆成几段，前一段的输出喂给下一段。",
    body: "顺序、确定、可调试。中间可以插入 gate 来校验是否继续。结构最简单，也是最稳的选择。",
    useWhen: "任务能干净地切成几段，每段单一职责。",
    example: "翻译 → 校对 → 调整语气",
    diagram: <ChainDiagram />,
  },
  /* ──────── 2. Routing ──────── */
  {
    id: "route",
    name: "Routing",
    tag: "workflow",
    oneliner: "先分类，再把任务投递给最合适的子链。",
    body: "用一个小模型/分类器先判断类型，避免一个 prompt 试图处理所有 case。",
    useWhen: "输入类型差异大，每种类型有专门的处理路径。",
    example: "客服系统：技术问题 → 工程链；退款 → 退款链；闲聊 → 闲聊链",
    diagram: <RouteDiagram />,
  },
  /* ──────── 3. Parallelization ──────── */
  {
    id: "parallel",
    name: "Parallelization",
    tag: "workflow",
    oneliner: "几个 LLM 并发跑，再聚合结果。",
    body: "两种用法：① sectioning（拆成独立子任务并发）② voting（多次跑同一任务投票出最稳的答案）。",
    useWhen: "子任务彼此独立、或要靠多次采样提升可靠性。",
    example: "代码审查 = 安全 + 风格 + 性能 三条并跑，最后汇总；或同一题跑 5 次投票",
    diagram: <ParallelDiagram />,
  },
  /* ──────── 4. Orchestrator-Workers ──────── */
  {
    id: "orchestrator",
    name: "Orchestrator → Workers",
    tag: "workflow",
    oneliner: "主控 LLM 动态拆分任务，分发给若干 worker。",
    body: "和 parallelization 的不同：子任务不是预定义的，而是 orchestrator 现场决定要拆几条、每条干啥。",
    useWhen: "你事先不知道任务该拆成多少步、哪些步。",
    example: "Coding Agent 收到「重构这个模块」→ 自己决定要改哪几个文件，派 worker 并发改",
    diagram: <OrchestratorDiagram />,
  },
  /* ──────── 5. Evaluator-Optimizer ──────── */
  {
    id: "evaluator",
    name: "Evaluator-Optimizer",
    tag: "workflow",
    oneliner: "一个 LLM 写，另一个 LLM 当评委，循环修改。",
    body: "评委给出反馈 → 写手照着改 → 直到达标。和自我反思的区别：评委是独立的、有明确 rubric。",
    useWhen: "有明确的「好坏」标准，且单次生成达不到。",
    example: "文学翻译：译者出稿 → 评委挑毛病 → 译者改稿 → 再评 …",
    diagram: <EvaluatorDiagram />,
  },
  /* ──────── 6. Autonomous Agent ──────── */
  {
    id: "autonomous",
    name: "Autonomous Agent",
    tag: "autonomous",
    oneliner: "不预设流程，模型自己规划 + 执行 + 在环境中收反馈。",
    body: "前面 5 种是「workflow」——人定结构；这一种是「agent」——模型自决。开放性最高，但成本和不可预测性也最高。需要设置 stop 条件防止失控。",
    useWhen: "任务开放、步数难预知、环境会给真实反馈。Claude Computer Use / Cursor Composer 都属于这类。",
    example: "「帮我把这个仓库的 CI 修好」—— 模型自己看 log、改文件、跑测试、再改",
    diagram: <AutonomousDiagram />,
  },
];

const SectionPatterns: React.FC = () => {
  const [active, setActive] = useState(PATTERNS[0]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 lg:py-32 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor mb-4">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">design patterns</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          6 种"造 Agent"的范式。
        </h2>
        <p className="font-sans text-[17px] text-ink/65 max-w-2xl mb-3 leading-relaxed">
          Anthropic 在 2024 年底总结过：所谓"Agentic System"其实分两类 ——
          <strong className="text-ink"> Workflows</strong>（人定流程、模型当节点）和
          <strong className="text-ink"> Agents</strong>（模型自己决定流程）。
        </p>
        <p className="font-sans text-[14px] text-ink/45 italic mb-10">
          点 pill 切换 · 大多数生产系统是若干种 workflow 的组合，不是 autonomous agent。
        </p>

        {/* tab 选择器 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className={`group relative px-3.5 py-2 border-2 border-ink rounded-full font-sans text-[13px] font-semibold transition-all duration-250 ease-spring flex items-center gap-2 ${
                active.id === p.id
                  ? "bg-ink text-cream shadow-stamp"
                  : "bg-white text-ink hover:bg-butter/40 shadow-[2px_2px_0_0_#241C15]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  active.id === p.id
                    ? p.tag === "workflow"
                      ? "bg-butter"
                      : "bg-coral"
                    : p.tag === "workflow"
                    ? "bg-teal/60"
                    : "bg-coral/70"
                }`}
              />
              {p.name}
            </button>
          ))}
        </div>

        {/* 主区 */}
        <div className="grid lg:grid-cols-5 gap-7">
          {/* 流程图 */}
          <div className="lg:col-span-3">
            <div className="card-stamp p-6 lg:p-8">
              <div className="flex items-baseline justify-between mb-4">
                <div className="eyebrow">{active.tag}</div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-ink/35">
                  pattern · {PATTERNS.findIndex((p) => p.id === active.id) + 1} / 6
                </div>
              </div>
              <div className="bg-cream/60 rounded-2xl border border-ink/10 p-4">
                {active.diagram}
              </div>
            </div>
          </div>

          {/* 解释 */}
          <div className="lg:col-span-2">
            <div className="card-stamp p-6 lg:p-7 sticky top-6">
              <h3 className="font-display text-[22px] font-bold text-ink leading-tight mb-2">
                {active.name}
              </h3>
              <p className="font-sans text-[14px] text-ink/85 leading-relaxed mb-4">
                {active.oneliner}
              </p>
              <p className="font-sans text-[13px] text-ink/65 leading-relaxed mb-5">
                {active.body}
              </p>

              <div className="space-y-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-1">
                    when to use
                  </div>
                  <div className="font-sans text-[13px] text-ink leading-snug">
                    {active.useWhen}
                  </div>
                </div>
                <div className="pt-3 border-t border-ink/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-1">
                    example
                  </div>
                  <div className="font-sans text-[13px] text-ink/75 italic leading-snug">
                    {active.example}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────
 *  6 张流程图 (SVG)
 *  统一风格：cream 背景，stamp 节点，方向箭头
 * ────────────────────────────────────────── */

const Node: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  tone?: "white" | "butter" | "coral" | "teal" | "ink";
  sub?: string;
}> = ({ x, y, w = 70, h = 36, label, tone = "white", sub }) => {
  const palette = {
    white: { bg: "#FFFFFF", text: "#241C15" },
    butter: { bg: "#F4D35E", text: "#241C15" },
    coral: { bg: "#E07A5F", text: "#FBEFE3" },
    teal: { bg: "#1B4B5A", text: "#FBEFE3" },
    ink: { bg: "#241C15", text: "#FBEFE3" },
  }[tone];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={palette.bg}
        stroke="#241C15"
        strokeWidth="1.75"
      />
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 - 4}
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill={palette.text}
          opacity="0.7"
          fontWeight="600"
        >
          {sub}
        </text>
      )}
      <text
        x={x + w / 2}
        y={y + h / 2 + (sub ? 7 : 4)}
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10"
        fontWeight="700"
        fill={palette.text}
      >
        {label}
      </text>
    </g>
  );
};

const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  color?: string;
}> = ({ x1, y1, x2, y2, dashed, color = "#241C15" }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - ux * 5}
        y2={y2 - uy * 5}
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray={dashed ? "4 3" : "0"}
      />
      <polygon
        points={`${x2},${y2} ${x2 - ux * 6 - uy * 3.5},${y2 - uy * 6 + ux * 3.5} ${x2 - ux * 6 + uy * 3.5},${y2 - uy * 6 - ux * 3.5}`}
        fill={color}
      />
    </g>
  );
};

function ChainDiagram() {
  return (
    <svg viewBox="0 0 480 110" className="w-full h-auto">
      <Node x={20} y={37} label="Input" tone="white" />
      <Arrow x1={90} y1={55} x2={120} y2={55} />
      <Node x={120} y={37} label="LLM 1" tone="butter" sub="DRAFT" />
      <Arrow x1={190} y1={55} x2={220} y2={55} />
      <Node x={220} y={37} label="LLM 2" tone="coral" sub="REFINE" />
      <Arrow x1={290} y1={55} x2={320} y2={55} />
      <Node x={320} y={37} label="LLM 3" tone="teal" sub="POLISH" />
      <Arrow x1={390} y1={55} x2={420} y2={55} />
      <Node x={420} y={37} label="Output" tone="ink" />
      {/* gate 提示 */}
      <text x="240" y="20" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">↳ 可在节点间加 gate (e.g. 校验/拒绝)</text>
    </svg>
  );
}

function RouteDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <Node x={20} y={85} label="Input" />
      <Arrow x1={90} y1={103} x2={130} y2={103} />
      <Node x={130} y={80} w={84} h={44} label="Router" tone="ink" sub="CLASSIFIER" />
      <Arrow x1={214} y1={85} x2={250} y2={45} />
      <Arrow x1={214} y1={103} x2={250} y2={103} />
      <Arrow x1={214} y1={120} x2={250} y2={160} />
      <Node x={250} y={28} label="Tech Chain" tone="butter" />
      <Node x={250} y={86} label="Refund Chain" tone="coral" />
      <Node x={250} y={143} label="Chat Chain" tone="teal" />
      {/* 汇 */}
      <Arrow x1={320} y1={45} x2={400} y2={100} />
      <Arrow x1={320} y1={103} x2={400} y2={103} />
      <Arrow x1={320} y1={160} x2={400} y2={106} />
      <Node x={400} y={85} label="Output" tone="ink" />
    </svg>
  );
}

function ParallelDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <Node x={20} y={85} label="Task" />
      <Arrow x1={90} y1={103} x2={140} y2={45} />
      <Arrow x1={90} y1={103} x2={140} y2={103} />
      <Arrow x1={90} y1={103} x2={140} y2={160} />
      <Node x={140} y={28} label="LLM · 安全" tone="coral" />
      <Node x={140} y={86} label="LLM · 风格" tone="butter" />
      <Node x={140} y={143} label="LLM · 性能" tone="teal" />
      <Arrow x1={210} y1={45} x2={280} y2={100} />
      <Arrow x1={210} y1={103} x2={280} y2={103} />
      <Arrow x1={210} y1={160} x2={280} y2={106} />
      <Node x={280} y={80} w={84} h={44} label="Aggregator" tone="ink" sub="merge" />
      <Arrow x1={364} y1={103} x2={400} y2={103} />
      <Node x={400} y={85} label="Output" />
      <text x="240" y="195" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">独立 LLM 并发 · 最后聚合</text>
    </svg>
  );
}

function OrchestratorDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <Node x={20} y={85} label="Task" />
      <Arrow x1={90} y1={103} x2={130} y2={103} />
      <Node x={130} y={75} w={90} h={56} label="Orchestrator" tone="ink" sub="LLM · 动态拆分" />
      {/* 动态箭头出 */}
      <Arrow x1={220} y1={88} x2={290} y2={45} dashed color="#E07A5F" />
      <Arrow x1={220} y1={103} x2={290} y2={103} dashed color="#E07A5F" />
      <Arrow x1={220} y1={117} x2={290} y2={160} dashed color="#E07A5F" />
      <Node x={290} y={28} label="Worker A" tone="butter" />
      <Node x={290} y={86} label="Worker B" tone="butter" />
      <Node x={290} y={143} label="Worker C" tone="butter" />
      {/* 回 */}
      <Arrow x1={290} y1={45} x2={225} y2={97} dashed color="#1B4B5A" />
      <Arrow x1={290} y1={103} x2={225} y2={107} dashed color="#1B4B5A" />
      <Arrow x1={290} y1={160} x2={225} y2={117} dashed color="#1B4B5A" />
      {/* output */}
      <Arrow x1={220} y1={130} x2={400} y2={120} />
      <Node x={400} y={102} label="Result" tone="ink" />
      <text x="345" y="195" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">虚线 = 运行时动态决定</text>
    </svg>
  );
}

function EvaluatorDiagram() {
  return (
    <svg viewBox="0 0 480 180" className="w-full h-auto">
      <Node x={20} y={70} label="Input" />
      <Arrow x1={90} y1={88} x2={130} y2={88} />
      <Node x={130} y={62} w={88} h={48} label="Generator" tone="butter" sub="WRITER" />
      <Arrow x1={218} y1={86} x2={272} y2={86} />
      <Node x={272} y={62} w={88} h={48} label="Evaluator" tone="coral" sub="JUDGE" />
      {/* 反馈环 */}
      <path
        d="M 316 110 Q 316 150 174 150 Q 130 150 130 116"
        fill="none"
        stroke="#241C15"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <polygon points="130,116 134,108 126,108" fill="#241C15" />
      <text x="225" y="167" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">feedback loop until passing rubric</text>
      <Arrow x1={360} y1={86} x2={400} y2={86} />
      <Node x={400} y={70} label="Output" tone="ink" />
    </svg>
  );
}

function AutonomousDiagram() {
  return (
    <svg viewBox="0 0 480 210" className="w-full h-auto">
      <Node x={20} y={90} label="Task" />
      <Arrow x1={90} y1={108} x2={130} y2={108} />
      <Node x={130} y={82} w={88} h={52} label="LLM Agent" tone="ink" sub="plan + act" />

      {/* Env */}
      <rect
        x={290}
        y={32}
        width={170}
        height={150}
        rx={14}
        fill="#FBEFE3"
        stroke="#241C15"
        strokeWidth="1.75"
        strokeDasharray="5 4"
      />
      <text x="375" y="50" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C" letterSpacing="0.1em">ENVIRONMENT</text>

      {/* tool nodes inside env */}
      <Node x={305} y={62} label="files" tone="white" w={48} h={28} />
      <Node x={365} y={62} label="shell" tone="white" w={48} h={28} />
      <Node x={305} y={100} label="browser" tone="white" w={48} h={28} />
      <Node x={365} y={100} label="git" tone="white" w={48} h={28} />
      <Node x={335} y={138} label="api" tone="white" w={48} h={28} />

      {/* Act → env */}
      <Arrow x1={218} y1={100} x2={295} y2={78} color="#E07A5F" />
      {/* env → observe */}
      <Arrow x1={295} y1={148} x2={218} y2={120} color="#1B4B5A" dashed />

      <text x="255" y="80" fontFamily="Geist Mono, monospace" fontSize="8" fill="#E07A5F">act</text>
      <text x="248" y="143" fontFamily="Geist Mono, monospace" fontSize="8" fill="#1B4B5A">observe</text>

      {/* Stop cond */}
      <text x="174" y="200" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">需要 stop 条件 · 否则可能跑飞</text>
    </svg>
  );
}

export default SectionPatterns;
