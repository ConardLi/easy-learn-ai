/**
 * Section 05 · 三种主流 Loop 模式
 *
 * - ReAct: 边想边做
 * - Plan-and-Execute: 先想好再做
 * - Reflexion: 做完回头看
 *
 * 交互：pill 切换三种模式，右侧轨迹用 3 种不同的视觉表现：
 *   ReAct = 思 / 做 / 看 三色环状循环
 *   Plan-and-Execute = 顶部 Plan 大卡 + 下面串行 Execute 序列
 *   Reflexion = 两次 try + 中间反思箭头 + 错题本 icon
 *
 * 三种轨迹用同一个任务（公司市值对比）做对照，方便用户感受机制差异。
 */
import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  ArrowDown,
  Brain,
  Zap,
  Eye,
} from "lucide-react";

type ModeId = "react" | "plan" | "reflexion";

type Mode = {
  id: ModeId;
  name: string;
  cn: string;
  fullName: string;
  origin: string;
  kernel: string;
  pros: string[];
  cons: string[];
  fit: string;
  metric: string;
};

const MODES: Mode[] = [
  {
    id: "react",
    name: "ReAct",
    cn: "边想边做",
    fullName: "Reasoning + Acting",
    origin: "2022 · 普林斯顿 + Google",
    kernel:
      "每一步先想（Thought）、再做（Action）、看结果（Observation），反复循环。想完做，做完看，看完再想。",
    pros: ["灵活：每步都可以根据上步结果调策略", "容错强：碰到意外能随时应变"],
    cons: ["每轮都调 LLM，Token 消耗高", "步骤越多越费钱 + 延迟越高"],
    fit: "探索性任务 · 路径不确定 · 需要随时纠偏",
    metric: "ALFWorld 比纯推理高 34% / WebShop 高 10%",
  },
  {
    id: "plan",
    name: "Plan-and-Execute",
    cn: "先想好再做",
    fullName: "Plan-and-Execute",
    origin: "工程界长期实践",
    kernel:
      "把规划和执行彻底拆开。先让 Planner 生成完整任务计划，再让 Executor 按计划逐步走。走完所有步骤，任务结束。",
    pros: [
      "LLM 调用次数少：规划只做 1 次，执行不用重新推理",
      "比 ReAct 快很多",
    ],
    cons: [
      "计划错了或环境变了，整个流程容易跑偏",
      "灵活性天然弱于 ReAct",
    ],
    fit: "步骤清晰 · 环境稳定 · 对成本敏感",
    metric: "LLMCompiler 比 ReAct 快 3.6×（ICML 2024）",
  },
  {
    id: "reflexion",
    name: "Reflexion",
    cn: "做完回头看",
    fullName: "Reflexion",
    origin: "2023 NeurIPS · Noah Shinn 等",
    kernel:
      "在 ReAct 基础上加一层反思。Actor 干活 → Evaluator 打分 → Self-Reflection 复盘哪里错、为什么错、下次怎么办 → 反思笔记写进 episodic memory（错题本）。",
    pros: [
      "能从失败中学习",
      "不改模型权重，只靠自然语言反馈持续进步",
    ],
    cons: [
      "Token 消耗三种里最高（多一次反思 = 多一次 LLM 调用）",
      "依赖明确的成功 / 失败信号",
    ],
    fit: "需要迭代提升 · 有清晰评估标准的任务",
    metric: "代码生成 / 推理任务上比 ReAct 显著高",
  },
];

const SectionThreeModes: React.FC = () => {
  const [activeId, setActiveId] = useState<ModeId>("react");
  const active = MODES.find((m) => m.id === activeId)!;

  return (
    <section className="relative bg-white border-b-2 border-ink overflow-hidden">
      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Modes · 业界三种玩法</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[860px] leading-tight">
          Agent Loop 是统称。LLM 在循环里{" "}
          <span className="inline-block bg-coral text-white px-2 -mx-2 -mb-1 pb-1">
            怎么思考和行动
          </span>
          ，业界演化出三种主流路子。
        </h2>
        <p className="font-sans text-[16px] text-ink/75 max-w-[720px] mt-5 leading-relaxed">
          点 pill 切换，右侧轨迹会换成对应模式的执行方式 ——
          三种用同一个任务（对比 A、B 公司市值），方便你感受机制上的差异。
        </p>

        {/* pill 切换 */}
        <div className="mt-9 flex flex-wrap gap-2">
          {MODES.map((m) => {
            const isActive = m.id === activeId;
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className={`group inline-flex flex-col items-start gap-0.5 px-5 py-3 rounded-2xl border-2 border-ink font-sans transition-all duration-250 ease-spring ${
                  isActive
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-stamp"
                }`}
              >
                <span className="font-display font-extrabold text-[16px] leading-tight">
                  {m.name}
                </span>
                <span
                  className={`font-mono text-[10.5px] tracking-wider uppercase ${isActive ? "text-cream/60" : "text-ink/55"}`}
                >
                  {m.cn} · {m.origin.split(" · ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* 主体：左信息 / 右轨迹 */}
        <div
          key={active.id}
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-7 animate-enter-fade"
        >
          {/* 左：信息卡 */}
          <div className="lg:col-span-5 bg-cream border-2 border-ink rounded-3xl shadow-stamp p-6 lg:p-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-coral mb-1.5">
              {active.origin}
            </div>
            <h3 className="font-display font-extrabold text-[28px] text-ink leading-tight">
              {active.name}
            </h3>
            <p className="font-serif italic text-[14px] text-ink/65 mt-1">
              {active.fullName}
            </p>

            <div className="mt-5 pt-5 border-t-2 border-ink/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
                内核
              </div>
              <p className="font-sans text-[14.5px] text-ink leading-[1.75]">
                {active.kernel}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-teal mb-2">
                  优点
                </div>
                <ul className="space-y-1.5">
                  {active.pros.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 font-sans text-[12.5px] text-ink/85 leading-relaxed">
                      <CheckCircle2 className="w-3 h-3 mt-1 text-teal flex-shrink-0" strokeWidth={2.5} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-pop mb-2">
                  缺点
                </div>
                <ul className="space-y-1.5">
                  {active.cons.map((c) => (
                    <li key={c} className="flex items-start gap-1.5 font-sans text-[12.5px] text-ink/85 leading-relaxed">
                      <XCircle className="w-3 h-3 mt-1 text-pop flex-shrink-0" strokeWidth={2.5} />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t-2 border-ink/15 space-y-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink/55">
                  适合
                </span>
                <span className="font-sans font-semibold text-[13px] text-ink">
                  {active.fit}
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink/55">
                  数据
                </span>
                <span className="font-mono text-[12px] text-ink">
                  {active.metric}
                </span>
              </div>
            </div>
          </div>

          {/* 右：执行轨迹（三种模式各自的视觉） */}
          <div className="lg:col-span-7 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-7 min-h-[480px]">
            <div className="flex items-center justify-between mb-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
                同一任务 · 不同模式的轨迹
              </div>
              <div className="font-sans font-bold text-[13px] text-butter">
                对比 A、B 公司市值
              </div>
            </div>

            {activeId === "react" && <ReactTrace />}
            {activeId === "plan" && <PlanTrace />}
            {activeId === "reflexion" && <ReflexionTrace />}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ────── 三种轨迹的独立视觉 ────── */

const ReactTrace: React.FC = () => {
  const steps = [
    { type: "T" as const, text: "我需要查询 A 公司的市值" },
    { type: "A" as const, text: 'search("A 公司市值")' },
    { type: "O" as const, text: "A 公司市值 5000 亿" },
    { type: "T" as const, text: "OK 接下来对比 B 公司..." },
    { type: "A" as const, text: 'search("B 公司市值")' },
    { type: "O" as const, text: "B 公司市值 3000 亿" },
    { type: "T" as const, text: "两个数据都有了，可以输出对比" },
  ];
  const meta = {
    T: { full: "Thought", color: "bg-butter text-ink", icon: Brain },
    A: { full: "Action", color: "bg-pop text-white", icon: Zap },
    O: { full: "Observation", color: "bg-teal text-white", icon: Eye },
  };
  return (
    <div className="space-y-2.5">
      {steps.map((s, i) => {
        const m = meta[s.type];
        const Icon = m.icon;
        return (
          <div
            key={i}
            className="flex items-start gap-3 animate-enter-fade"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md border-2 border-ink font-mono text-[10px] font-bold ${m.color}`}>
              <Icon className="w-3 h-3" strokeWidth={2.5} />
              {m.full}
            </span>
            <span className="font-mono text-[13px] leading-[1.7] text-cream/90 break-words">
              {s.text}
            </span>
          </div>
        );
      })}
      <div className="pt-3 mt-3 border-t-2 border-dashed border-cream/20 font-mono text-[11px] text-cream/55 leading-relaxed">
        ↺ 每一步都先 Thought → Action → Observation。
        <br />
        每轮 LLM 都做完整推理 → Token 消耗与步骤数线性增长。
      </div>
    </div>
  );
};

const PlanTrace: React.FC = () => {
  const plan = [
    "搜索 A 公司市值",
    "搜索 B 公司市值",
    "计算两者差值",
    "生成对比报告",
  ];
  return (
    <div>
      {/* 顶部 Plan 大卡 */}
      <div className="bg-butter text-ink border-2 border-cream rounded-2xl p-4 mb-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3 h-3" strokeWidth={2.5} />
          Planner 一次性输出完整计划
        </div>
        <ol className="space-y-1">
          {plan.map((step, i) => (
            <li key={i} className="font-mono text-[13px] flex items-start gap-2">
              <span className="font-bold text-coral">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 中间箭头 */}
      <div className="flex justify-center my-3">
        <ArrowDown className="w-5 h-5 text-cream/40" strokeWidth={2.5} />
      </div>

      {/* 串行 Execute */}
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-2 flex items-center gap-1.5">
        <Zap className="w-3 h-3" strokeWidth={2.5} />
        Executor 按计划逐步执行
      </div>
      <div className="space-y-1.5">
        {plan.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cream/8 animate-enter-fade"
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coral text-white flex items-center justify-center font-mono font-bold text-[10px]">
              {i + 1}
            </span>
            <span className="font-mono text-[12.5px] text-cream/90">
              {step}
            </span>
            <span className="ml-auto flex-shrink-0 inline-flex items-center text-teal">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
            </span>
          </div>
        ))}
      </div>
      <div className="pt-4 mt-4 border-t-2 border-dashed border-cream/20 font-mono text-[11px] text-cream/55 leading-relaxed">
        🪶 LLM 只在 Plan 阶段调一次，Execute 阶段每步不重新推理。
        <br />
        Token 消耗远低于 ReAct，但计划错了就翻车。
      </div>
    </div>
  );
};

const ReflexionTrace: React.FC = () => {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-3">
        任务：写函数 dedup_keep_order(strs)
      </div>

      {/* Try 1 */}
      <div className="bg-pop/10 border-2 border-pop/40 rounded-xl p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] font-bold text-pop">
            第 1 次 · Actor 尝试
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-pop">
            <XCircle className="w-3 h-3" strokeWidth={2.5} />
            失败 · 3 个测试过 1 个
          </span>
        </div>
        <pre className="font-mono text-[12px] text-cream/90 leading-relaxed">
{`def dedup(strs):
    return list(set(strs))   # set 不保证顺序`}
        </pre>
      </div>

      {/* 反思箭头 */}
      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 border-t-2 border-dashed border-cream/30" />
        <div className="flex items-center gap-2 px-3 py-1.5 bg-butter text-ink rounded-full border-2 border-cream font-mono text-[11px] font-bold">
          <Lightbulb className="w-3.5 h-3.5" strokeWidth={2.5} />
          Self-Reflection
        </div>
        <div className="flex-1 border-t-2 border-dashed border-cream/30" />
      </div>

      <div className="bg-cream/10 border-2 border-cream/30 rounded-xl p-3 mb-3 italic">
        <p className="font-sans text-[13px] text-cream/85 leading-relaxed">
          "我用了 set() 来去重，但 set 不保证元素顺序。下次应该用 dict.fromkeys() 或手动遍历追踪已出现字符。"
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-cream/55">
          <BookOpen className="w-3 h-3" strokeWidth={2.5} />
          写入 episodic memory（错题本）
        </div>
      </div>

      {/* Try 2 */}
      <div className="bg-teal/15 border-2 border-teal/40 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] font-bold text-teal">
            第 2 次 · 带着反思重写
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-teal">
            <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
            成功 · 测试全过
          </span>
        </div>
        <pre className="font-mono text-[12px] text-cream/90 leading-relaxed">
{`def dedup(strs):
    return list(dict.fromkeys(strs))`}
        </pre>
      </div>

      <div className="pt-4 mt-4 border-t-2 border-dashed border-cream/20 font-mono text-[11px] text-cream/55 leading-relaxed">
        📓 反思笔记进 episodic memory，下次类似任务取出来作为上下文。
        <br />
        没有反思的 Agent 可能在同一个错误上反复撞墙。
      </div>
    </div>
  );
};

export default SectionThreeModes;
