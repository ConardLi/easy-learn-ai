/**
 * Section 03 · 一轮循环里到底在转什么 · 五阶段拆解
 *
 * 五个阶段：感知 → 推理 → 规划 → 行动 → 观察
 *
 * 交互：横向 5 个圆点，按钮控制焦点位置，next / prev / reset；
 *      下方详情卡随焦点切换内容，显示当前阶段的「谁来做 / 在干啥 / 具体例子」。
 *      最后一个圆点结束后弧线回到第一个圆 —— 视觉上暗示这是个循环。
 */
import React, { useState } from "react";
import {
  Eye,
  Brain,
  ListOrdered,
  Zap,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

type StageDoer = "Agent 框架" | "LLM" | "工具系统";

type Stage = {
  id: string;
  cn: string;
  en: string;
  summary: string;
  doer: StageDoer;
  body: string;
  example: string;
  icon: React.ElementType;
  tone: "butter" | "coral" | "teal" | "pop" | "ink";
};

const STAGES: Stage[] = [
  {
    id: "perceive",
    cn: "感知",
    en: "Perceive",
    summary: "Agent 把当前能拿到的信息塞进上下文",
    doer: "Agent 框架",
    body: "可能是用户的原始指令，可能是上一轮工具返回的结果，也可能是一个报错信息。Agent 框架负责把这些信息整理好，组成新的 messages 列表，准备送给 LLM。",
    example: 'messages = [系统提示, "查 A 股涨幅 Top10", 上一轮工具结果]',
    icon: Eye,
    tone: "butter",
  },
  {
    id: "reason",
    cn: "推理",
    en: "Reason",
    summary: "LLM 思考：现在啥状况，目标到了吗",
    doer: "LLM",
    body: "LLM 拿到当前所有上下文，开始思考：当前是什么状况？目标达成了吗？下一步该干什么？这是循环的大脑。每次调 LLM 推理都要钱，所以推理频率直接决定 Token 成本。",
    example: '"我已经拿到 Top 10 列表，下一步要查每只股票的所属行业。"',
    icon: Brain,
    tone: "coral",
  },
  {
    id: "plan",
    cn: "规划",
    en: "Plan",
    summary: "对复杂任务，先拆子目标再排序",
    doer: "LLM",
    body: "对复杂任务，LLM 会先做任务拆解 —— 把大目标分成几个子步骤，排好优先级。简单任务可能直接跳到执行。规划这一步不一定独立发生，常和「推理」合并在一次 LLM 调用里完成。",
    example: '"1. 查每只股票行业 → 2. 聚合分布 → 3. 画图表"',
    icon: ListOrdered,
    tone: "teal",
  },
  {
    id: "act",
    cn: "行动",
    en: "Act",
    summary: "调用具体工具：API、数据库、代码…",
    doer: "工具系统",
    body: "Agent 执行具体操作：调一个 API、查一次数据库、跑一段代码、发一个 HTTP 请求。这些操作都通过「工具」（Tools）完成。工具的定义包含名称、描述和参数 schema —— LLM 决定调哪个、传什么参数。",
    example: 'call: get_stock_industry(symbols=["000001", "600519", …])',
    icon: Zap,
    tone: "pop",
  },
  {
    id: "observe",
    cn: "观察",
    en: "Observe",
    summary: "看工具返回啥，决定继续还是退出",
    doer: "Agent 框架",
    body: "工具返回结果后，Agent 检查：成功了吗？数据对不对？够不够？任务完成了吗？没完成就把结果追加到上下文里，回到第 1 步继续转。完成了就退出循环，输出最终结果。",
    example: 'result: [{symbol, industry}, ...]  → 数据齐 → 进入下一轮',
    icon: Search,
    tone: "ink",
  },
];

const toneClasses: Record<
  Stage["tone"],
  { bg: string; ring: string; text: string; pill: string }
> = {
  butter: {
    bg: "bg-butter",
    ring: "ring-butter",
    text: "text-ink",
    pill: "bg-butter text-ink",
  },
  coral: {
    bg: "bg-coral",
    ring: "ring-coral",
    text: "text-white",
    pill: "bg-coral text-white",
  },
  teal: {
    bg: "bg-teal",
    ring: "ring-teal",
    text: "text-white",
    pill: "bg-teal text-white",
  },
  pop: {
    bg: "bg-pop",
    ring: "ring-pop",
    text: "text-white",
    pill: "bg-pop text-white",
  },
  ink: {
    bg: "bg-ink",
    ring: "ring-ink",
    text: "text-cream",
    pill: "bg-ink text-cream",
  },
};

const SectionFiveStages: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const current = STAGES[cursor];
  const tone = toneClasses[current.tone];

  const goPrev = () => setCursor((c) => Math.max(0, c - 1));
  const goNext = () => setCursor((c) => Math.min(STAGES.length - 1, c + 1));
  const reset = () => setCursor(0);

  return (
    <section className="relative bg-white border-b-2 border-ink overflow-hidden">
      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Inside · 一轮里的五阶段</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[860px] leading-tight">
          循环跑一轮，{" "}
          <span className="inline-block bg-coral text-white px-2 -mx-2 -mb-1 pb-1">
            内部按五个阶段
          </span>{" "}
          走一遍。
        </h2>
        <p className="font-sans text-[16px] text-ink/75 max-w-[680px] mt-5 leading-relaxed">
          点圆点或下方按钮，一阶段一阶段看清谁在做什么。注意"推理"和"规划"
          常常合并在一次 LLM 调用里完成 —— 阶段划分是逻辑视角，不是物理切片。
        </p>

        {/* 与 Agent 站三步法的对照 */}
        <div className="mt-6 max-w-[860px] bg-butter/40 border-2 border-ink rounded-2xl px-5 py-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1.5">
            ── 跟 Agent 站对照一下 ──
          </div>
          <p className="font-sans text-[14px] text-ink/80 leading-relaxed">
            如果你看过 Agent 那一站，那里讲的是
            <strong className="text-ink"> Think → Act → Observe </strong>三步。
            这里拆成五步是为了看清「谁在干活」（框架 vs LLM vs 工具）：
            <span className="font-mono text-[12.5px] text-ink/85 ml-1">
              感知 + 推理 + 规划 ≈ Think，行动 = Act，观察 = Observe。
            </span>
          </p>
        </div>

        {/* ─── 横向五圆 + SVG 连线 + 循环弧 ─── */}
        <div className="mt-12 relative">
          <svg
            viewBox="0 0 1000 200"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* 连线 */}
            {STAGES.slice(0, -1).map((_, i) => {
              const x1 = 100 + i * 200 + 36;
              const x2 = 100 + (i + 1) * 200 - 36;
              const passed = i < cursor;
              return (
                <line
                  key={`line-${i}`}
                  x1={x1}
                  y1={80}
                  x2={x2}
                  y2={80}
                  stroke="#241C15"
                  strokeWidth={passed ? 3 : 2}
                  strokeDasharray={passed ? "" : "6 5"}
                  opacity={passed ? 1 : 0.45}
                />
              );
            })}

            {/* 末尾→开头 循环弧（暗示这是 loop） */}
            <path
              d="M 936 80 Q 990 120 880 165 L 110 165 Q 0 130 64 90"
              fill="none"
              stroke="#241C15"
              strokeWidth={2}
              strokeDasharray="6 5"
              opacity={cursor === STAGES.length - 1 ? 1 : 0.3}
            />
            <polygon
              points="64,90 56,88 60,80"
              fill="#241C15"
              opacity={cursor === STAGES.length - 1 ? 1 : 0.3}
            />
            <text
              x="500"
              y="190"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="11"
              fill="#241C15"
              opacity={cursor === STAGES.length - 1 ? 0.85 : 0.4}
              letterSpacing="2"
            >
              {cursor === STAGES.length - 1
                ? "↺ 任务没完 · 带着新结果回到第一步"
                : "未完成时回到第 1 阶段继续转"}
            </text>

            {/* 圆点节点 */}
            {STAGES.map((stage, i) => {
              const cx = 100 + i * 200;
              const isActive = i === cursor;
              const isPassed = i < cursor;
              const t = toneClasses[stage.tone];
              return (
                <g
                  key={stage.id}
                  className="cursor-pointer"
                  onClick={() => setCursor(i)}
                >
                  {/* 节点圆 */}
                  <circle
                    cx={cx}
                    cy={80}
                    r={isActive ? 38 : 30}
                    className={`transition-all duration-400 ease-spring ${
                      isActive
                        ? t.bg
                        : isPassed
                          ? t.bg
                          : "fill-white"
                    }`}
                    fill={
                      isActive || isPassed
                        ? stage.tone === "butter"
                          ? "#F4D35E"
                          : stage.tone === "coral"
                            ? "#E07A5F"
                            : stage.tone === "teal"
                              ? "#1B4B5A"
                              : stage.tone === "pop"
                                ? "#FF4D74"
                                : "#241C15"
                        : "#FFFFFF"
                    }
                    stroke="#241C15"
                    strokeWidth={isActive ? 3 : 2}
                  />
                  {/* 阶段编号 */}
                  <text
                    x={cx}
                    y={84}
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize={isActive ? "14" : "12"}
                    fontWeight="700"
                    fill={
                      isActive || isPassed
                        ? stage.tone === "butter"
                          ? "#241C15"
                          : "#FBEFE3"
                        : "#241C15"
                    }
                  >
                    0{i + 1}
                  </text>
                  {/* 阶段名 */}
                  <text
                    x={cx}
                    y={140}
                    textAnchor="middle"
                    fontFamily='"Plus Jakarta Sans", "Noto Sans SC", sans-serif'
                    fontSize="14"
                    fontWeight={isActive ? "800" : "600"}
                    fill="#241C15"
                  >
                    {stage.cn}
                  </text>
                  <text
                    x={cx}
                    y={156}
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    letterSpacing="1.5"
                    fill="#88837C"
                    fontWeight={isActive ? "700" : "500"}
                  >
                    {stage.en.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ─── 控制按钮 ─── */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={goPrev}
            disabled={cursor === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-ink rounded-full font-sans font-semibold text-[13px] shadow-stamp disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-250 ease-spring enabled:hover:-translate-x-[2px] enabled:hover:-translate-y-[2px] enabled:hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            上一步
          </button>
          <span className="font-mono text-[12px] tracking-widest text-ink/60 px-2">
            {String(cursor + 1).padStart(2, "0")} / {STAGES.length}
          </span>
          <button
            onClick={goNext}
            disabled={cursor === STAGES.length - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-cream border-2 border-ink rounded-full font-sans font-semibold text-[13px] shadow-stamp disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-250 ease-spring enabled:hover:-translate-x-[2px] enabled:hover:-translate-y-[2px] enabled:hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            下一步
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-ink/55 hover:text-ink font-sans font-medium text-[12px] transition-colors"
          >
            <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
            重置
          </button>
        </div>

        {/* ─── 详情卡 ─── */}
        <div
          key={current.id}
          className="mt-8 max-w-[920px] mx-auto bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden animate-enter-fade"
        >
          {/* 顶部色块 */}
          <div
            className={`${tone.bg} border-b-2 border-ink px-6 lg:px-7 py-5 flex items-start justify-between gap-4`}
          >
            <div className="flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 bg-white border-2 border-ink rounded-2xl flex items-center justify-center">
                <current.icon className="w-5 h-5 text-ink" strokeWidth={2.2} />
              </span>
              <div>
                <div className={`font-mono text-[10.5px] font-bold tracking-[0.22em] uppercase ${tone.text} opacity-75`}>
                  Stage 0{cursor + 1} · {current.en}
                </div>
                <h3 className={`font-display font-extrabold text-[24px] md:text-[28px] leading-tight mt-0.5 ${tone.text}`}>
                  {current.cn}
                </h3>
              </div>
            </div>
            <span className="hidden md:inline-flex items-center px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[10.5px] font-bold text-ink shadow-[2px_2px_0_0_#241C15] flex-shrink-0">
              谁来做：{current.doer}
            </span>
          </div>

          {/* 内容 */}
          <div className="p-6 lg:p-7">
            <p className="font-sans text-[16px] text-ink/85 leading-[1.75]">
              {current.body}
            </p>
            <div className="mt-5 bg-ink text-cream rounded-2xl border-2 border-ink p-4 lg:p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-2">
                ── 具体例子（A 股任务为例）──
              </div>
              <p className="font-mono text-[13px] leading-[1.7] break-words">
                {current.example}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFiveStages;
