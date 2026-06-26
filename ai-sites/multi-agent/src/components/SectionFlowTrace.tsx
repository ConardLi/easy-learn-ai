/**
 * SectionFlowTrace · 走一遍：一个任务在几个 Agent 间流转
 *
 * 交互（L3）：单步 trace（下一步 / 上一步 / 重置），以主管式为例
 * 看「用户提需求 → 规划拆任务 → 执行干活 → 审查挑错（打回重做）→ 总结汇报」一步步传递
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const STEPS = [
  {
    actor: "用户",
    color: "#241C15",
    title: "提出需求",
    say: "「帮我写一份三家竞品的价格对比报告。」",
    note: "任务进了团队，主管先接住。",
  },
  {
    actor: "规划",
    color: "#1B4B5A",
    title: "拆成小任务",
    say: "「分三步：① 查三家价格 ② 做对比表 ③ 写结论。先做第①步。」",
    note: "大任务被切成有顺序的小任务。",
  },
  {
    actor: "执行",
    color: "#E07A5F",
    title: "动手查价格",
    say: "「调搜索工具，翻三家官网，把价格抓回来了。」",
    note: "执行只管干第一步，不操心后面。",
  },
  {
    actor: "审查",
    color: "#F4D35E",
    title: "挑出问题，打回",
    say: "「第三家的价格像是去年的，不准。退回重查。」",
    note: "审查发现问题，这步不算过 —— 退回执行。",
  },
  {
    actor: "执行",
    color: "#E07A5F",
    title: "补救重查",
    say: "「重新核实第三家，拿到今年最新价。」",
    note: "执行按审查的意见返工。这就是分工的好处：错了能局部重来。",
  },
  {
    actor: "总结",
    color: "#FF4D74",
    title: "拼成最终报告",
    say: "「三家价格、对比表、结论都齐了，整理成一份干净报告。」",
    note: "各步通过后，总结把零散结果收拢交付。",
  },
];

const SectionFlowTrace: React.FC = () => {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-white/40">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Walk Through</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          走一遍：一份报告怎么在团队里转一圈
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[680px]">
          用「主管式」搭法，跟着一个真任务走一步看一步。注意第④步 ——
          审查挑出问题后，活会被退回去重做，这是分工最值钱的地方。
        </p>

        {/* 步骤进度点 */}
        <div className="mt-10 flex items-center gap-2 flex-wrap">
          {STEPS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={[
                "h-2.5 rounded-full border-2 border-ink transition-all duration-250",
                idx === i ? "w-9" : "w-2.5 hover:w-5",
              ].join(" ")}
              style={{ backgroundColor: idx <= i ? s.color : "#FBEFE3" }}
              aria-label={`第 ${idx + 1} 步`}
            />
          ))}
        </div>

        {/* 主卡 */}
        <div className="mt-6 card-stamp p-7 lg:p-9 min-h-[280px] flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="px-4 py-1.5 rounded-full border-2 border-ink font-display font-extrabold text-[16px]"
              style={{
                backgroundColor: step.color,
                color: step.color === "#F4D35E" ? "#241C15" : "#FBEFE3",
              }}
            >
              {step.actor}
            </span>
            <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-ink/50">
              STEP {i + 1} / {STEPS.length}
            </span>
          </div>

          <div className="font-display font-extrabold text-[26px] text-ink mb-4">{step.title}</div>

          <div className="bg-cream border-2 border-ink rounded-2xl px-6 py-5 mb-4">
            <p className="font-serif italic text-[18px] leading-[1.6] text-ink/85">{step.say}</p>
          </div>

          <p className="font-sans text-[15px] leading-[1.7] text-ink/70 mt-auto">{step.note}</p>
        </div>

        {/* 控制 */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
            className="btn-stamp bg-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
            上一步
          </button>
          <button
            onClick={() => setI((v) => Math.min(STEPS.length - 1, v + 1))}
            disabled={i === STEPS.length - 1}
            className="btn-stamp bg-teal text-cream disabled:opacity-30 disabled:cursor-not-allowed"
          >
            下一步
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setI(0)}
            className="btn-stamp bg-cream ml-auto"
            aria-label="重置"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
            重来
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionFlowTrace;
