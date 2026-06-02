/**
 * Section 04 · 四个零件
 *
 * 任何 Agent 都是 4 个零件的不同组合：
 *   ① Brain (LLM)
 *   ② Tools
 *   ③ Memory
 *   ④ Planning
 *
 * 设计：
 *   ─ 4 张大卡片（lg 2×2 / md 1 列）
 *   ─ 每张卡片有自己的迷你交互（切换 / 勾选 / 选项卡）
 *   ─ 卡片之间没有联动，但视觉上属于同一系列
 *
 * 这一节不堆数字，目的是让"四个零件"具体起来。
 */
import React, { useState } from "react";
import {
  Brain,
  Wrench,
  Database,
  Map as MapIcon,
  Check,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

const SectionBuildingBlocks: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 lg:py-32 bg-white border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor mb-4">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">the four parts</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          它由四个零件拼起来。
        </h2>
        <p className="font-sans text-[17px] text-ink/65 max-w-2xl mb-10 leading-relaxed">
          再花哨的 Agent，拆开看也就这四件套：一个会想的{" "}
          <strong className="text-ink">脑子</strong>、一组能用的{" "}
          <strong className="text-ink">工具</strong>、一个能存东西的{" "}
          <strong className="text-ink">记忆</strong>、一套排活儿的{" "}
          <strong className="text-ink">章法</strong>。
        </p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-7">
          <BrainCard />
          <ToolsCard />
          <MemoryCard />
          <PlanningCard />
        </div>

        {/* hub 聚合卡：四个零件 + 干活机制各有专站 */}
        <div className="mt-10 px-4 py-3.5 bg-butter border-2 border-ink rounded-2xl shadow-stamp max-w-[680px]">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
            </span>
            <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
              <span className="font-bold text-ink">每个零件都有一站讲透。</span>
              <span className="text-ink/65">
                {" "}
                想顺着某一块往深里看，从下面任意一个入口进去。
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pl-10">
            <a
              href="../llm/index.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              脑子 · LLM <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
            </a>
            <a
              href="../function-calling/index.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              工具 · Function Calling{" "}
              <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
            </a>
            <a
              href="../context-window/index.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              短期记忆 · Context Window{" "}
              <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
            </a>
            <a
              href="../agent-memory/index.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              长期记忆 · Agent Memory{" "}
              <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
            </a>
            <a
              href="../agent-loop/index.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              干活机制 · Agent Loop{" "}
              <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────
 * Block ① · Brain (LLM)
 * 切换不同 LLM 看上下文 / 推理 / 价格
 * ────────────────────────────────────────── */

interface BrainModel {
  id: string;
  name: string;
  vendor: string;
  context: string;
  reasoning: number; // 0-100
  speed: number; // 0-100
  costIn: string;
  costOut: string;
  highlight: string;
}

const BRAIN_MODELS: BrainModel[] = [
  {
    id: "opus47",
    name: "Claude Opus 4.7",
    vendor: "Anthropic · 2026.03",
    context: "1M tokens",
    reasoning: 96,
    speed: 60,
    costIn: "$15",
    costOut: "$75",
    highlight: "长任务最稳，工具调用质量第一",
  },
  {
    id: "gpt55",
    name: "GPT-5.5",
    vendor: "OpenAI · 2026.04",
    context: "400K tokens",
    reasoning: 95,
    speed: 72,
    costIn: "$10",
    costOut: "$40",
    highlight: "通用平衡，生态最大",
  },
  {
    id: "gemini35",
    name: "Gemini 3.5 Flash",
    vendor: "Google · 2026.05",
    context: "2M tokens",
    reasoning: 86,
    speed: 95,
    costIn: "$0.30",
    costOut: "$2.50",
    highlight: "便宜、快，海量上下文场景首选",
  },
  {
    id: "v4",
    name: "DeepSeek-V4",
    vendor: "DeepSeek · 2026.02",
    context: "256K tokens",
    reasoning: 91,
    speed: 78,
    costIn: "$0.27",
    costOut: "$1.10",
    highlight: "开源 · 自托管首选",
  },
];

const BrainCard: React.FC = () => {
  const [active, setActive] = useState(BRAIN_MODELS[0]);

  return (
    <BlockCard
      step="01"
      icon={<Brain className="w-5 h-5" />}
      tone="butter"
      title="脑子 · The Brain"
      subtitle="LLM"
      lead="负责理解任务、推理、决定接下来调用哪个工具。换一个脑子，Agent 的上限就变了。"
    >
      <div className="space-y-3.5">
        <div className="px-3 py-2 bg-butter/30 rounded-lg border border-ink/10 font-sans text-[12px] text-ink/70 leading-relaxed">
          <strong className="text-ink">小贴士</strong>：下面的「上下文」=
          模型一次能「记住」多少字。1M tokens ≈ 70 万汉字量级 ——
          一篇 8 万字的小说塞进去还有富余。
        </div>
        {/* 模型选择器 */}
        <div className="flex flex-wrap gap-1.5">
          {BRAIN_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold border-2 transition-all duration-250 ${
                active.id === m.id
                  ? "bg-ink text-cream border-ink"
                  : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* 当前模型详情 */}
        <div className="p-4 bg-cream rounded-2xl border border-ink/10">
          <div className="flex items-baseline justify-between mb-3">
            <div className="font-display text-[18px] font-bold text-ink">
              {active.name}
            </div>
            <div className="font-mono text-[10px] text-ink/50 tracking-wider">
              {active.vendor}
            </div>
          </div>

          <div className="space-y-2.5">
            <SpecBar label="推理质量" value={active.reasoning} accent="#E07A5F" />
            <SpecBar label="响应速度" value={active.speed} accent="#1B4B5A" />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-ink/10">
            <SpecChip label="上下文" value={active.context} />
            <SpecChip label="输入 / M" value={active.costIn} />
            <SpecChip label="输出 / M" value={active.costOut} />
          </div>

          <p className="mt-3 font-sans text-[12px] text-ink/65 italic leading-snug">
            「{active.highlight}」
          </p>
        </div>

        <CardLink href="../llm/index.html">
          这个「脑子」就是背后那个大模型，它怎么接话、强在哪 →{" "}
          <strong className="text-ink">《LLM》</strong>
        </CardLink>
      </div>
    </BlockCard>
  );
};

/* ──────────────────────────────────────────
 * Block ② · Tools
 * 勾选工具 → 看能解锁什么
 * ────────────────────────────────────────── */

interface ToolDef {
  id: string;
  name: string;
  desc: string;
}
const TOOLS: ToolDef[] = [
  { id: "web", name: "web.search", desc: "实时联网检索" },
  { id: "py", name: "python.exec", desc: "运行任意 Python" },
  { id: "fs", name: "file.read/write", desc: "本地文件读写" },
  { id: "sh", name: "shell.run", desc: "执行命令行" },
  { id: "br", name: "browser.act", desc: "浏览器点击/填表" },
  { id: "db", name: "db.query", desc: "数据库 SQL" },
  { id: "mail", name: "email.send", desc: "发邮件" },
  { id: "cal", name: "calendar.create", desc: "日历操作" },
];

interface UnlockRule {
  pattern: (selected: Set<string>) => boolean;
  text: string;
}
const UNLOCKS: UnlockRule[] = [
  {
    pattern: (s) => s.has("web") && s.has("py"),
    text: "✨ 数据分析师 · 联网拉数据 + 跑代码画图",
  },
  {
    pattern: (s) => s.has("br") && s.has("mail"),
    text: "✨ 数字秘书 · 浏览器操作 + 邮件触达",
  },
  {
    pattern: (s) => s.has("fs") && s.has("sh") && s.has("py"),
    text: "✨ Coding Agent · 文件 + 命令行 + 代码执行",
  },
  {
    pattern: (s) => s.has("db") && s.has("mail"),
    text: "✨ 数据看板 · 定时跑 SQL 推送结论",
  },
  {
    pattern: (s) => s.has("web") && s.has("cal") && s.has("mail"),
    text: "✨ 行程助手 · 联网查 + 排日历 + 发邀请",
  },
];

const ToolsCard: React.FC = () => {
  const [sel, setSel] = useState<Set<string>>(new Set(["web", "py"]));
  const toggle = (id: string) => {
    setSel((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const unlocked = UNLOCKS.filter((r) => r.pattern(sel));

  return (
    <BlockCard
      step="02"
      icon={<Wrench className="w-5 h-5" />}
      tone="coral"
      title="工具 · The Hands"
      subtitle="Tools"
      lead="LLM 自己什么都做不了，所有「动作」都靠工具。给它装什么工具，它就只能做什么事。"
    >
      <div className="space-y-3.5">
        {/* 工具勾选 */}
        <div className="grid grid-cols-2 gap-1.5">
          {TOOLS.map((t) => {
            const on = sel.has(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`flex items-start gap-2 px-2.5 py-2 rounded-xl border-2 text-left transition-all duration-200 ${
                  on
                    ? "bg-coral/15 border-coral"
                    : "bg-white border-ink/12 hover:border-ink/30"
                }`}
              >
                <div
                  className={`shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 ${
                    on ? "bg-coral border-coral text-cream" : "bg-white border-ink/30"
                  }`}
                >
                  {on && <Check className="w-3 h-3" strokeWidth={3} />}
                </div>
                <div>
                  <div className="font-mono text-[11px] text-ink font-bold leading-tight">
                    {t.name}
                  </div>
                  <div className="font-sans text-[11px] text-ink/55 mt-0.5">
                    {t.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 解锁的能力 */}
        <div className="p-3.5 bg-cream rounded-2xl border border-ink/10 min-h-[80px]">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-1.5">
            unlocked roles · {unlocked.length}
          </div>
          {unlocked.length === 0 ? (
            <p className="font-sans text-[12px] text-ink/45 italic">
              试试勾选 web + python，或者 fs + shell + python...
            </p>
          ) : (
            <ul className="space-y-1">
              {unlocked.map((u, i) => (
                <li
                  key={i}
                  className="font-sans text-[12.5px] text-ink leading-snug animate-enter-fade"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {u.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        <CardLink href="../function-calling/index.html">
          这些动作怎么落地成一次工具调用、参数怎么传 →{" "}
          <strong className="text-ink">《Function Calling》</strong>
        </CardLink>
      </div>
    </BlockCard>
  );
};

/* ──────────────────────────────────────────
 * Block ③ · Memory
 * 短期 / 长期 / 检索式
 * ────────────────────────────────────────── */

const MEMORY_TYPES: {
  id: string;
  name: string;
  eng: string;
  desc: string;
  use: string;
  limit: string;
  cost: string;
  link?: { href: string; lead: string; book: string };
}[] = [
  {
    id: "short",
    name: "短期记忆",
    eng: "context window",
    desc: "当前对话的上下文，跟着对话长大，到上限就截断。",
    use: "聊天 · 多轮指令",
    limit: "受 context 长度限制",
    cost: "💰 便宜",
    link: {
      href: "../context-window/index.html",
      lead: "短期记忆就装在 context window 里，能装多少、为什么会满",
      book: "Context Window",
    },
  },
  {
    id: "long",
    name: "长期记忆",
    eng: "persistent memory",
    desc: "把对话里的关键事实抽出来，存进数据库，下次主动召回。",
    use: "个性化助手 · 用户偏好",
    limit: "需要抽取 + 召回策略",
    cost: "💰💰 中等",
    link: {
      href: "../agent-memory/index.html",
      lead: "长期记忆怎么抽取、怎么存、怎么召回",
      book: "Agent Memory",
    },
  },
  {
    id: "rag",
    name: "检索式记忆",
    eng: "RAG",
    desc: "外挂知识库：像先翻公司文档再回答 —— 具体做法后面「RAG」专题再讲，这里知道 Agent 可以接就行。",
    use: "知识问答 · 内部文档",
    limit: "见 RAG 专题",
    cost: "💰💰 中等",
  },
];

const MemoryCard: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const m = MEMORY_TYPES[idx];

  return (
    <BlockCard
      step="03"
      icon={<Database className="w-5 h-5" />}
      tone="teal"
      title="记忆 · The Notebook"
      subtitle="Memory"
      lead="没有记忆，Agent 就是金鱼。它每次都从零开始 —— 而真实任务总要跨多轮、跨天、跨周。"
    >
      <div className="space-y-3.5">
        <div className="flex gap-1.5">
          {MEMORY_TYPES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setIdx(i)}
              className={`flex-1 px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-bold tracking-wider transition-all duration-250 border-2 ${
                idx === i
                  ? "bg-teal text-cream border-teal"
                  : "bg-white text-ink/60 border-ink/15 hover:border-ink/30"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="p-4 bg-cream rounded-2xl border border-ink/10">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-1">
            {m.eng}
          </div>
          <div className="font-display text-[18px] font-bold text-ink mb-2">
            {m.name}
          </div>
          <p className="font-sans text-[13px] text-ink/75 leading-relaxed mb-3">
            {m.desc}
          </p>

          <MemoryDiagram type={m.id} />

          <div className="mt-3 grid grid-cols-3 gap-2">
            <MiniSpec label="典型场景" value={m.use} />
            <MiniSpec label="限制" value={m.limit} />
            <MiniSpec label="开销" value={m.cost} />
          </div>

          {m.link && (
            <div className="mt-3">
              <CardLink href={m.link.href}>
                {m.link.lead} →{" "}
                <strong className="text-ink">《{m.link.book}》</strong>
              </CardLink>
            </div>
          )}
        </div>
      </div>
    </BlockCard>
  );
};

const MemoryDiagram: React.FC<{ type: string }> = ({ type }) => {
  if (type === "short") {
    return (
      <svg viewBox="0 0 240 56" className="w-full h-14">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect
              x={4 + i * 46}
              y="12"
              width="42"
              height="32"
              rx="6"
              fill={i === 4 ? "#F4D35E" : "#FFFFFF"}
              stroke="#241C15"
              strokeWidth="1.5"
            />
            <text
              x={25 + i * 46}
              y="32"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="9"
              fill="#241C15"
              fontWeight="600"
            >
              {`turn ${i + 1}`}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  if (type === "long") {
    return (
      <svg viewBox="0 0 240 56" className="w-full h-14">
        {/* 当前对话 */}
        <rect x="6" y="14" width="60" height="28" rx="6" fill="#FFFFFF" stroke="#241C15" strokeWidth="1.5" />
        <text x="36" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" fontWeight="600">现在</text>
        {/* 箭头 */}
        <line x1="70" y1="28" x2="100" y2="28" stroke="#241C15" strokeWidth="1.5" markerEnd="url(#arr2)" />
        {/* DB */}
        <ellipse cx="135" cy="28" rx="32" ry="14" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
        <text x="135" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#FBEFE3" fontWeight="700">memory db</text>
        {/* 召回 */}
        <line x1="170" y1="28" x2="200" y2="28" stroke="#E07A5F" strokeWidth="1.5" markerEnd="url(#arr1)" strokeDasharray="3 2" />
        <rect x="202" y="14" width="34" height="28" rx="6" fill="#FBE891" stroke="#241C15" strokeWidth="1.5" />
        <text x="219" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15" fontWeight="600">recall</text>
        <defs>
          <marker id="arr1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#E07A5F" /></marker>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#241C15" /></marker>
        </defs>
      </svg>
    );
  }
  // rag
  return (
    <svg viewBox="0 0 240 56" className="w-full h-14">
      <rect x="6" y="14" width="44" height="28" rx="6" fill="#FFFFFF" stroke="#241C15" strokeWidth="1.5" />
      <text x="28" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" fontWeight="600">query</text>
      <line x1="54" y1="28" x2="80" y2="28" stroke="#241C15" strokeWidth="1.5" markerEnd="url(#arr3)" />
      {/* 多个文档块 */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={84 + i * 18} y="14" width="14" height="28" rx="2" fill="#FBEFE3" stroke="#241C15" strokeWidth="1" />
      ))}
      <text x="115" y="50" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">embed search</text>
      <line x1="158" y1="28" x2="180" y2="28" stroke="#E07A5F" strokeWidth="1.5" markerEnd="url(#arr4)" strokeDasharray="3 2" />
      <rect x="184" y="14" width="52" height="28" rx="6" fill="#F4D35E" stroke="#241C15" strokeWidth="1.5" />
      <text x="210" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" fontWeight="700">top-k ctx</text>
      <defs>
        <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#241C15" /></marker>
        <marker id="arr4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#E07A5F" /></marker>
      </defs>
    </svg>
  );
};

/* ──────────────────────────────────────────
 * Block ④ · Planning
 * CoT / ReAct / Plan-and-Execute
 * ────────────────────────────────────────── */

const PLANS = [
  {
    id: "cot",
    name: "Chain-of-Thought",
    short: "CoT",
    desc: "想一步答一步，全程在 prompt 里推理。",
    fit: "数学题 · 逻辑题",
    code: `Q: 用户问题
Let's think step by step:
1) 先...
2) 然后...
3) 所以答案 = ...`,
  },
  {
    id: "react",
    name: "ReAct",
    short: "React",
    desc: "把推理和动作交错，每想完一步就立刻去做。",
    fit: "需要查资料的复杂任务",
    code: `Thought: 我需要先查 X
Action: web.search("X")
Observation: 得到结果 Y
Thought: 基于 Y, 我应该 …
Action: …`,
  },
  {
    id: "plan",
    name: "Plan-and-Execute",
    short: "Plan→Exec",
    desc: "先一口气出完整计划，再让 worker 执行每一步。",
    fit: "目标明确 · 步骤可预知",
    code: `Planner:
  1. 调 API_A
  2. 拼接结果
  3. 调 API_B
  4. 汇总输出

Worker: 按 1→4 依次执行`,
  },
];

const PlanningCard: React.FC = () => {
  const [idx, setIdx] = useState(1);
  const p = PLANS[idx];
  return (
    <BlockCard
      step="04"
      icon={<MapIcon className="w-5 h-5" />}
      tone="ink"
      title="章法 · The Plan"
      subtitle="Planning"
      lead="同样的大脑和工具，编排方式不同，效果差很多 —— 怎么排步骤，是调 Agent 时最常改的地方。"
    >
      <div className="space-y-3.5">
        <div className="flex gap-1.5">
          {PLANS.map((pl, i) => (
            <button
              key={pl.id}
              onClick={() => setIdx(i)}
              className={`flex-1 px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-bold tracking-wider transition-all duration-250 border-2 ${
                idx === i
                  ? "bg-ink text-cream border-ink"
                  : "bg-white text-ink/60 border-ink/15 hover:border-ink/30"
              }`}
            >
              {pl.short}
            </button>
          ))}
        </div>

        <div className="p-4 bg-cream rounded-2xl border border-ink/10">
          <div className="font-display text-[18px] font-bold text-ink mb-1.5">
            {p.name}
          </div>
          <p className="font-sans text-[13px] text-ink/75 leading-relaxed mb-3">
            {p.desc}
          </p>

          <pre className="font-mono text-[11px] text-ink/85 bg-ink/[0.04] p-3 rounded-lg whitespace-pre-wrap leading-relaxed border border-ink/10">
            {p.code}
          </pre>

          <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 bg-butter/55 rounded-full border border-ink/15">
            <span className="font-mono text-[10px] text-ink/55 tracking-wider">
              best fit
            </span>
            <span className="font-sans text-[12px] font-semibold text-ink">
              {p.fit}
            </span>
          </div>
        </div>
      </div>
    </BlockCard>
  );
};

/* ──────────────────────────────────────────
 * 共用：BlockCard 外壳
 * ────────────────────────────────────────── */
const BlockCard: React.FC<{
  step: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  lead: string;
  tone: "butter" | "coral" | "teal" | "ink";
  children: React.ReactNode;
}> = ({ step, icon, title, subtitle, lead, tone, children }) => {
  const toneClass = {
    butter: "bg-butter text-ink",
    coral: "bg-coral text-cream",
    teal: "bg-teal text-cream",
    ink: "bg-ink text-cream",
  }[tone];

  return (
    <div className="card-stamp p-6 lg:p-7">
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`shrink-0 w-11 h-11 ${toneClass} border-2 border-ink rounded-xl flex items-center justify-center shadow-[3px_3px_0_0_#241C15]`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-0.5">
            <div className="font-display text-[20px] font-bold text-ink leading-tight">
              {title}
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-ink/40">
              § {step}
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
            {subtitle}
          </div>
        </div>
      </div>

      <p className="font-sans text-[13.5px] text-ink/70 leading-relaxed mb-5">
        {lead}
      </p>

      {children}
    </div>
  );
};

/* 卡底小链 · 通往邻站（紧凑邮戳卡） */
const CardLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className="flex items-start gap-2.5 px-3.5 py-2.5 bg-white border-2 border-ink rounded-xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
  >
    <ExternalLink className="w-3.5 h-3.5 text-ink shrink-0 mt-0.5" strokeWidth={2.4} />
    <span className="font-sans text-[12px] text-ink/75 leading-snug">
      {children}
    </span>
  </a>
);

const SpecBar: React.FC<{ label: string; value: number; accent: string }> = ({
  label,
  value,
  accent,
}) => (
  <div>
    <div className="flex items-baseline justify-between mb-1">
      <span className="font-mono text-[10px] uppercase tracking-wider text-ink/55">
        {label}
      </span>
      <span className="font-mono text-[11px] font-bold text-ink">{value}</span>
    </div>
    <div className="h-2 bg-ink/8 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, background: accent }}
      />
    </div>
  </div>
);

const SpecChip: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <div className="font-mono text-[9px] text-ink/40 tracking-wider uppercase">
      {label}
    </div>
    <div className="font-sans text-[12.5px] font-bold text-ink">{value}</div>
  </div>
);

const MiniSpec: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="text-left">
    <div className="font-mono text-[9px] text-ink/40 uppercase tracking-wider mb-0.5">
      {label}
    </div>
    <div className="font-sans text-[11px] font-semibold text-ink leading-tight">
      {value}
    </div>
  </div>
);

export default SectionBuildingBlocks;
