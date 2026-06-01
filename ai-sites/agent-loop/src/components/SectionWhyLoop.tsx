/**
 * Section 02 · 为啥需要 Loop？
 *
 * 用 4 个真实任务对比 Single-pass vs Loop 的处理路径：
 *   - 简单问题：Single-pass 一来一回就够
 *   - 复杂任务：Single-pass 给不了答案，必须拆成多步靠 Loop
 *
 * 交互：pill 切换 4 个任务，左右两栏同步变。每个 Loop 步骤 hover 看说明。
 */
import React, { useState } from "react";
import {
  Check,
  X,
  Search,
  Filter,
  BarChart3,
  FileText,
  Calculator,
  Image as ImageIcon,
  ListChecks,
  ArrowRight,
} from "lucide-react";

type StepIcon =
  | "search"
  | "filter"
  | "chart"
  | "doc"
  | "calc"
  | "img"
  | "check";

type Task = {
  id: string;
  label: string;
  prompt: string;
  isComplex: boolean;
  singlePassReply: string;
  singlePassVerdict: string;
  loopSteps: Array<{ icon: StepIcon; title: string; detail: string }>;
};

const ICONS: Record<StepIcon, React.ElementType> = {
  search: Search,
  filter: Filter,
  chart: BarChart3,
  doc: FileText,
  calc: Calculator,
  img: ImageIcon,
  check: ListChecks,
};

const TASKS: Task[] = [
  {
    id: "quantum",
    label: "量子纠缠科普",
    prompt: "量子纠缠是什么？用大白话解释一下。",
    isComplex: false,
    singlePassReply:
      "量子纠缠是指两个粒子之间存在的一种特殊关联：测量其中一个的状态时，另一个会瞬间呈现关联的状态，无论相距多远。这是量子力学最反直觉的现象之一。",
    singlePassVerdict: "一句回答搞定 · 不需要 Loop",
    loopSteps: [
      {
        icon: "check",
        title: "其实不需要循环",
        detail:
          "这种纯解释类问题，LLM 一次回答就够 —— 不用开循环，开了也是白花钱。",
      },
    ],
  },
  {
    id: "astock",
    label: "A 股涨幅分析",
    prompt:
      "帮我查最近三个月 A 股涨幅最大的 10 只股票，分析行业分布，画一张可视化图表。",
    isComplex: true,
    singlePassReply:
      "（编造一个看似合理但完全没法验证的列表，比如某新能源 + 半导体股票名 + 涨幅数字）—— 但这些数据是模型脑补的，今天到底涨没涨它不知道。也没法给你画图。",
    singlePassVerdict: "搞不定 · LLM 没联网、没绘图工具",
    loopSteps: [
      {
        icon: "search",
        title: "调行情 API",
        detail: "搜索最近三个月 A 股全市场涨幅榜单",
      },
      {
        icon: "filter",
        title: "排序取 Top 10",
        detail: "对返回结果按涨幅排序，取前 10",
      },
      {
        icon: "search",
        title: "查每只股票行业",
        detail: "对 10 只股票分别查所属申万一级行业",
      },
      {
        icon: "calc",
        title: "聚合行业分布",
        detail: "按行业分组计数，得出分布占比",
      },
      {
        icon: "chart",
        title: "生成柱状图",
        detail: "调可视化工具，把分布数据画成图",
      },
    ],
  },
  {
    id: "translate",
    label: "翻译片段",
    prompt: '把这句翻成中文："Trust the process, even when it is messy."',
    isComplex: false,
    singlePassReply: "信任这个过程，哪怕它现在看起来一团糟。",
    singlePassVerdict: "翻译就一步 · 不需要 Loop",
    loopSteps: [
      {
        icon: "check",
        title: "其实不需要循环",
        detail:
          "翻译是经典的 Single-pass 场景，LLM 一次生成就完。Agent Loop 适合多步任务，不适合这种。",
      },
    ],
  },
  {
    id: "compare-llm",
    label: "对比开源 LLM",
    prompt:
      "2026 年最值得关注的 5 个开源大模型是哪些？做一张多维度对比表。",
    isComplex: true,
    singlePassReply:
      "（说出训练数据截止前的几个老模型 —— 但 2026 年的新模型它根本没见过，给的列表是过时的。）",
    singlePassVerdict: "搞不定 · 训练数据有截止，没法知道 2026 新模型",
    loopSteps: [
      {
        icon: "search",
        title: "搜 2026 开源 LLM",
        detail: "调搜索引擎，关键词「2026 open source LLM ranking」",
      },
      {
        icon: "filter",
        title: "筛 Top 5",
        detail: "按下载量 / star 数 / benchmark 综合取前 5",
      },
      {
        icon: "doc",
        title: "查每个模型详情",
        detail: "对 5 个模型分别拉技术报告，提取参数量、训练数据、上下文长度",
      },
      {
        icon: "search",
        title: "查 benchmark 分数",
        detail: "查 MMLU / GSM8K / HumanEval 等公开榜单分数",
      },
      {
        icon: "chart",
        title: "组装对比表",
        detail: "把 5 个模型 × 6 个维度组成 markdown 表格输出",
      },
    ],
  },
];

const SectionWhyLoop: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(TASKS[1].id);
  const active = TASKS.find((t) => t.id === activeId) ?? TASKS[0];

  return (
    <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Why · 单轮干不了的事</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[840px] leading-tight">
          一个来回能搞定的事，{" "}
          <span className="inline-block bg-butter px-2 -mx-2 -mb-1 pb-1">
            不需要 Agent Loop。
          </span>
          <br />
          多步任务，就只能靠它。
        </h2>

        <p className="font-sans text-[16px] text-ink/75 max-w-[680px] mt-5 leading-relaxed">
          挑一个任务看看：左边是 ChatGPT 那种 Single-pass 一来一回的回答方式，
          右边是 Agent Loop 把任务拆成多步、调工具去做的方式。
        </p>

        {/* 任务 pill */}
        <div className="mt-9 flex flex-wrap gap-2">
          {TASKS.map((t) => {
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-ink font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
                  isActive
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-stamp"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-mono font-bold ${
                    t.isComplex
                      ? "bg-coral text-white"
                      : "bg-butter text-ink"
                  }`}
                >
                  {t.isComplex ? "M" : "S"}
                </span>
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-3 font-mono text-[11px] text-ink/55">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-butter border border-ink" />
            S = Single 单步可解
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-coral border border-ink" />
            M = Multi 多步必需
          </span>
        </div>

        {/* 用户消息卡 */}
        <div
          key={active.id}
          className="mt-8 max-w-[820px] bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 animate-enter-fade"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
            User · 用户输入
          </div>
          <p className="font-sans text-[15px] text-ink leading-relaxed">
            {active.prompt}
          </p>
        </div>

        {/* 对照双栏 */}
        <div
          key={`${active.id}-cols`}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7 animate-enter-fade"
        >
          {/* 左：Single-pass */}
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b-2 border-ink bg-ink/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg border-2 border-ink bg-cream flex items-center justify-center font-mono font-bold text-[12px] text-ink">
                  S
                </span>
                <div>
                  <div className="font-display font-bold text-[16px] text-ink leading-tight">
                    Single-pass
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink/55">
                    一次推理 · 直接给答案
                  </div>
                </div>
              </div>
              <Verdict ok={!active.isComplex} />
            </div>
            <div className="p-5 flex-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
                LLM 直接回答
              </div>
              <p
                className={`font-sans text-[14.5px] leading-[1.75] ${active.isComplex ? "text-ink/70 italic" : "text-ink"}`}
              >
                {active.singlePassReply}
              </p>
            </div>
            <div
              className={`px-5 py-3 border-t-2 border-ink/15 font-mono text-[11.5px] font-bold ${active.isComplex ? "text-coral" : "text-ink/65"}`}
            >
              {active.singlePassVerdict}
            </div>
          </div>

          {/* 右：Agent Loop */}
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b-2 border-ink bg-coral/8 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg border-2 border-ink bg-coral flex items-center justify-center font-mono font-bold text-[12px] text-white">
                  L
                </span>
                <div>
                  <div className="font-display font-bold text-[16px] text-ink leading-tight">
                    Agent Loop
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink/55">
                    拆步骤 · 调工具 · 循环到完
                  </div>
                </div>
              </div>
              <Verdict ok />
            </div>

            <div className="p-5 flex-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-3 flex items-center justify-between">
                <span>循环里发生了什么</span>
                <span className="text-ink/40">
                  共 {active.loopSteps.length} 步
                </span>
              </div>
              <ol className="space-y-2.5">
                {active.loopSteps.map((step, idx) => (
                  <LoopStep
                    key={`${active.id}-${idx}`}
                    idx={idx}
                    step={step}
                    isLast={idx === active.loopSteps.length - 1}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* 总结小条 */}
        <div className="mt-9 inline-flex items-center gap-2 max-w-full px-4 py-2.5 bg-ink text-cream rounded-full font-mono text-[12px] tracking-wide">
          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
          下一节看：循环里"一轮"到底在做什么 →
        </div>
      </div>
    </section>
  );
};

/* ─────────── 子件 ─────────── */

const Verdict: React.FC<{ ok: boolean }> = ({ ok }) =>
  ok ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal/10 border border-teal/40 font-mono text-[10.5px] font-bold text-teal">
      <Check className="w-3 h-3" strokeWidth={3} />
      OK
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pop/10 border border-pop/40 font-mono text-[10.5px] font-bold text-pop">
      <X className="w-3 h-3" strokeWidth={3} />
      FAIL
    </span>
  );

const LoopStep: React.FC<{
  idx: number;
  step: { icon: StepIcon; title: string; detail: string };
  isLast: boolean;
}> = ({ idx, step, isLast }) => {
  const Icon = ICONS[step.icon];
  const [open, setOpen] = useState(false);
  return (
    <li className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-start gap-3 p-3 rounded-xl border-2 border-ink bg-cream/40 hover:bg-cream transition-colors group/step"
      >
        <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white border-2 border-ink">
          <Icon className="w-4 h-4 text-ink" strokeWidth={2.2} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-ink/55">
              0{idx + 1}
            </span>
            <span className="font-sans font-bold text-[14px] text-ink">
              {step.title}
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-spring ${open ? "max-h-32 mt-1.5 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <p className="font-sans text-[12.5px] text-ink/70 leading-relaxed">
              {step.detail}
            </p>
          </div>
        </div>
        <span
          className={`flex-shrink-0 text-ink/40 font-mono text-[10px] transition-transform duration-300 ${open ? "rotate-90" : ""}`}
        >
          ▶
        </span>
      </button>
      {!isLast && (
        <div className="ml-[26px] h-2 border-l-2 border-dashed border-ink/30" />
      )}
    </li>
  );
};

export default SectionWhyLoop;
