/**
 * Section 04 · 多轮串起来 · 走一个完整 demo
 *
 * 任务：「找 2026 年引用量最高的 Agent Memory 论文，总结核心发现。」
 * 三轮循环搞定。
 *
 * 交互：顶部 slider 控制时间线推进到第几轮，纵向堆叠展开
 *      （视觉上能"摸到时间的推进"）。每轮卡片三列：推理 / 行动 / 观察。
 *
 * 跟 S3 的视觉差异：S3 是横向 5 圆点 + 焦点切换，这里是纵向 3 大块时间堆叠。
 */
import React, { useState } from "react";
import {
  User,
  Brain,
  Zap,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowDown,
} from "lucide-react";

type Round = {
  n: number;
  reasoning: string;
  action: {
    tool: string;
    args: string;
    noTool?: boolean;
  };
  observation: string;
  resultBadge: string;
};

const ROUNDS: Round[] = [
  {
    n: 1,
    reasoning: "目标是找一篇论文。第一步得先有个候选列表，要调学术搜索。",
    action: {
      tool: "academic_search",
      args: 'query="agent memory", year=2026, sort="citations"',
    },
    observation:
      "返回 15 篇论文 · 引用数从 340 到 12 不等 · 最高引用：Reflective Memory Networks (340)",
    resultBadge: "拿到候选列表",
  },
  {
    n: 2,
    reasoning: "引用最高那篇是 340 次的 Reflective Memory Networks，我要拿全文才能总结。",
    action: {
      tool: "doc_retrieval",
      args: 'paper_id="2026.arxiv.18293"',
    },
    observation: "成功拿到摘要 + 核心章节（5 节）· 关键贡献：Episodic + Semantic 双轨记忆",
    resultBadge: "信息齐了",
  },
  {
    n: 3,
    reasoning: "信息够了。这轮不需要再调工具，直接输出总结就完事。",
    action: {
      tool: "（不调工具，直接生成）",
      args: "",
      noTool: true,
    },
    observation:
      "输出 3 段总结 + 1 张架构示意 · LLM 判断 done = True · 退出循环",
    resultBadge: "任务完成 → 退出",
  },
];

const FINAL_ANSWER =
  "📄 Reflective Memory Networks（2026, 340 引用）提出双轨记忆架构：Episodic 记录具体事件序列、Semantic 抽取通用模式。Agent 完成任务后由 reflection 模块决定写入哪一轨，下次类似任务从对应轨取出。在 SWE-Bench 上比无记忆 Agent 高 22%。";

const SectionThreeRoundDemo: React.FC = () => {
  // slider [0, 3]: 0=只看任务 / 1-3=展开到第几轮 / 4=带最终回答
  const [progress, setProgress] = useState(3);
  const maxProgress = 4;

  return (
    <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
      <div className="relative max-w-[1080px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Demo · 三轮搞定一个真任务</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[860px] leading-tight">
          看一遍三轮循环{" "}
          <span className="inline-block bg-teal text-white px-2 -mx-2 -mb-1 pb-1">
            是怎么把任务做完的
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] text-ink/75 max-w-[700px] mt-5 leading-relaxed">
          拖下面的进度条，时间线一轮一轮展开。每轮里 LLM 在想啥、调了哪个工具、拿到啥结果，看得清清楚楚。
        </p>

        {/* ─── 进度条 slider ─── */}
        <div className="mt-10 bg-white border-2 border-ink rounded-3xl shadow-stamp p-5 lg:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/55">
              时间线推进
            </div>
            <div className="font-mono text-[12px] font-bold text-ink">
              {progress === 0
                ? "未开始"
                : progress >= maxProgress
                  ? "已完成"
                  : `第 ${progress} 轮`}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={maxProgress}
            step={1}
            value={progress}
            onChange={(e) => setProgress(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-ink/15 rounded-full appearance-none cursor-pointer accent-coral"
            aria-label="时间线进度"
          />
          <div className="mt-2.5 flex justify-between font-mono text-[10.5px] text-ink/55">
            <Tick label="提问" active={progress >= 0} />
            <Tick label="Round 1" active={progress >= 1} />
            <Tick label="Round 2" active={progress >= 2} />
            <Tick label="Round 3" active={progress >= 3} />
            <Tick label="退出" active={progress >= 4} />
          </div>
        </div>

        {/* ─── 时间线 ─── */}
        <div className="mt-10 relative">
          {/* 中央竖线 */}
          <div className="absolute left-[26px] top-2 bottom-2 w-[2px] bg-ink/20 hidden lg:block" />

          {/* 用户提问 */}
          <TimelineNode
            label="USER"
            icon={User}
            tone="ink"
            visible={progress >= 0}
          >
            <div className="font-sans text-[15px] text-ink leading-relaxed">
              找 2026 年引用量最高的{" "}
              <span className="font-bold">Agent Memory</span> 论文，
              总结核心发现。
            </div>
          </TimelineNode>

          {ROUNDS.map((round) => (
            <RoundCard
              key={round.n}
              round={round}
              visible={progress >= round.n}
            />
          ))}

          {/* 最终回答 */}
          <TimelineNode
            label="LLM · 最终输出"
            icon={Sparkles}
            tone="butter"
            visible={progress >= maxProgress}
          >
            <div className="font-sans text-[14.5px] text-ink leading-[1.75]">
              {FINAL_ANSWER}
            </div>
          </TimelineNode>
        </div>

        {/* 总结小条 */}
        <div className="mt-10 bg-ink text-cream rounded-2xl border-2 border-ink p-5 lg:p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-1">
              复盘
            </div>
            <div className="font-display font-bold text-[20px] text-cream leading-tight">
              3 轮 · 2 次工具调用 · 1 个完整答案
            </div>
          </div>
          <div className="font-mono text-[12px] text-cream/80 max-w-[420px] leading-relaxed">
            Single-pass 根本干不了 —— 你不可能在一次 LLM 调用里同时搜索、检索、总结。
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────── 子件 ─────────── */

const Tick: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
  <span
    className={`inline-flex flex-col items-center gap-1 transition-colors ${active ? "text-ink font-bold" : "text-ink/35"}`}
  >
    <span
      className={`w-2 h-2 rounded-full transition-all ${active ? "bg-coral" : "bg-ink/25"}`}
    />
    {label}
  </span>
);

const TimelineNode: React.FC<{
  label: string;
  icon: React.ElementType;
  tone: "ink" | "butter" | "coral" | "teal";
  visible: boolean;
  children: React.ReactNode;
}> = ({ label, icon: Icon, tone, visible, children }) => {
  const toneMap = {
    ink: "bg-ink text-cream",
    butter: "bg-butter text-ink",
    coral: "bg-coral text-white",
    teal: "bg-teal text-white",
  };

  return (
    <div
      className={`relative pl-0 lg:pl-[68px] py-3 transition-all duration-500 ease-spring ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none h-0 py-0"}`}
      style={{ overflow: visible ? "visible" : "hidden" }}
    >
      {/* 节点圆 */}
      <span
        className={`hidden lg:flex absolute left-0 top-4 w-[54px] h-[54px] items-center justify-center rounded-2xl border-2 border-ink shadow-stamp ${toneMap[tone]}`}
      >
        <Icon className="w-5 h-5" strokeWidth={2.2} />
      </span>

      <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-5 py-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
          {label}
        </div>
        {children}
      </div>
    </div>
  );
};

const RoundCard: React.FC<{
  round: Round;
  visible: boolean;
}> = ({ round, visible }) => {
  return (
    <div
      className={`relative pl-0 lg:pl-[68px] py-3 transition-all duration-500 ease-spring ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none h-0 py-0"}`}
      style={{ overflow: visible ? "visible" : "hidden" }}
    >
      <span className="hidden lg:flex absolute left-0 top-4 w-[54px] h-[54px] items-center justify-center rounded-2xl border-2 border-ink shadow-stamp bg-coral text-white">
        <span className="font-display font-extrabold text-[20px] leading-none">
          {round.n}
        </span>
      </span>

      <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden">
        {/* 头 */}
        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-ink bg-coral/8">
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
            ROUND {round.n}
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-cream rounded-full font-mono text-[10.5px] font-bold">
            <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
            {round.resultBadge}
          </div>
        </div>

        {/* 三列：推理 / 行动 / 观察 */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink/15">
          <Pane label="推理" icon={Brain} tone="butter" content={round.reasoning} />
          <Pane
            label="行动"
            icon={Zap}
            tone="pop"
            content={
              round.action.noTool ? (
                <span className="italic text-ink/65">
                  {round.action.tool}
                </span>
              ) : (
                <>
                  <span className="font-bold">{round.action.tool}</span>
                  <br />
                  <span className="text-ink/70">{round.action.args}</span>
                </>
              )
            }
            mono
          />
          <Pane label="观察" icon={Search} tone="teal" content={round.observation} />
        </div>

        {/* 下一轮箭头 */}
        {round.n < ROUNDS.length && (
          <div className="flex items-center justify-center py-2 bg-cream/40 border-t-2 border-dashed border-ink/15">
            <ArrowDown className="w-4 h-4 text-ink/40" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
};

const Pane: React.FC<{
  label: string;
  icon: React.ElementType;
  tone: "butter" | "pop" | "teal";
  content: React.ReactNode;
  mono?: boolean;
}> = ({ label, icon: Icon, tone, content, mono }) => {
  const toneClasses = {
    butter: "bg-butter/30 text-ink",
    pop: "bg-pop/8 text-pop",
    teal: "bg-teal/8 text-teal",
  };
  return (
    <div className="p-4 lg:p-5">
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold tracking-wider uppercase mb-2 ${toneClasses[tone]}`}>
        <Icon className="w-3 h-3" strokeWidth={2.5} />
        {label}
      </div>
      <div
        className={`text-[13px] leading-[1.7] text-ink/85 ${mono ? "font-mono break-words" : "font-sans"}`}
      >
        {content}
      </div>
    </div>
  );
};

export default SectionThreeRoundDemo;
