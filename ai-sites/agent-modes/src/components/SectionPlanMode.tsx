/**
 * Section 04 · Plan 模式详解
 *
 * 主交互（L2 单步 trace）：4 阶段顺序解锁
 *   理解需求 → 设计方案 → 方案审查 → 输出计划
 *
 * 每一步：左侧时间线节点高亮，右侧卡片换内容（含 Agent 行为模拟）
 * 视觉跟 Section 03 的「表格 + pill」拉开 —— 这里走纵向时间线 + 终端示例。
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

type Step = {
  num: string;
  title: string;
  oneLine: string;
  agentSays: string[];
  tool: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "理解需求",
    oneLine: "Agent 先读代码、再问你问题 —— 搞清楚到底要什么。",
    agentSays: [
      "(read) src/auth/* · src/middleware/* · src/router.ts",
      "(ask) 这次重构是只动 session，还是把 JWT 也一起换？",
      "(ask) 现有 200+ 调用方，可以同时改还是要保留兼容期？",
    ],
    tool: "Read · Ask",
  },
  {
    num: "02",
    title: "设计方案",
    oneLine: "让 Agent 分头去查代码（你不需要懂怎么查），整理实现思路。",
    agentSays: [
      "(grep) findReferences(useSession) · 48 处",
      "(plan) 分 3 阶段：抽 Provider → 切换调用方 → 删旧实现",
      "(plan) 第 2 阶段拆 4 个独立 PR，便于回滚",
    ],
    tool: "Grep · Sub-task",
  },
  {
    num: "03",
    title: "方案审查",
    oneLine: "交叉检验方案和你原始需求是否对齐。",
    agentSays: [
      "(check) 需求点 #1「保留兼容期」 → 方案第 2 阶段满足",
      "(check) 需求点 #2「不动 JWT」 → 已确认范围，不动 src/jwt/*",
      "(warn) 注意 src/legacy/oldAuth.ts 还在用，需要单独沟通",
    ],
    tool: "Self-review",
  },
  {
    num: "04",
    title: "输出计划",
    oneLine: "把最终方案写进 plan.md，等你确认才动手。",
    agentSays: [
      "(write) .opencode/plans/2026-06-01-auth-refactor.md",
      "(stop) 我已就位 —— 你想切到 Default 还是 Auto 模式执行？",
      "(hint) Shift+Tab 切换；或直接说「按这个计划执行」。",
    ],
    tool: "Write · Stop",
  },
];

const SectionPlanMode: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const step = STEPS[cursor];

  return (
    <section className="relative bg-butter/15 border-y-2 border-ink px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Plan · 先想清楚再动手</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          Plan 模式
          <br />
          会把 Agent 锁进{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">只读</span>
          </span>{" "}
          状态。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          Agent 可以遍历代码、读文件、搜符号，但
          <strong className="text-ink"> 不能改任何东西</strong>。
          输出是一份 Markdown 计划，列出要改哪些文件、分几步、按什么顺序。
        </p>
        <p className="font-mono text-[12px] tracking-[0.04em] text-ink/55 mt-3 max-w-[760px]">
          在 Claude Code 里按 Shift+Tab 进 Plan —— 别的工具找设置里的「Plan / 只读模式」。
        </p>

        {/* trace 主体 */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* 左：时间线 */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-4">
              Claude Code · Plan 四阶段
            </div>
            <ol className="space-y-3">
              {STEPS.map((s, i) => {
                const passed = i < cursor;
                const active = i === cursor;
                return (
                  <li key={s.num}>
                    <button
                      type="button"
                      onClick={() => setCursor(i)}
                      className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-250 ease-spring ${
                        active
                          ? "bg-ink text-cream border-ink shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                          : passed
                          ? "bg-butter border-ink shadow-stamp"
                          : "bg-white border-ink/40 hover:border-ink hover:shadow-stamp"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-mono text-[12px] font-bold ${
                          active
                            ? "bg-coral text-cream"
                            : passed
                            ? "bg-cream text-ink"
                            : "bg-cream text-ink/55"
                        }`}
                      >
                        {s.num}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-display font-extrabold text-[18px] leading-tight ${
                            active ? "text-cream" : "text-ink"
                          }`}
                        >
                          {s.title}
                        </div>
                        <div
                          className={`font-sans text-[13.5px] leading-[1.5] mt-1 ${
                            active ? "text-cream/80" : "text-ink/65"
                          }`}
                        >
                          {s.oneLine}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* 右：终端模拟 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-5 lg:p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pop border border-ink" />
                  <span className="w-2.5 h-2.5 rounded-full bg-butter border border-ink" />
                  <span className="w-2.5 h-2.5 rounded-full bg-teal border border-ink" />
                  <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 ml-2">
                    plan-mode · agent log
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-butter border-2 border-ink rounded-full font-mono text-[9.5px] tracking-[0.18em] uppercase font-bold">
                  {step.tool}
                </span>
              </div>

              <div
                key={cursor}
                className="rounded-2xl bg-ink text-cream p-5 font-mono text-[13.5px] leading-[1.85] animate-enter-fade"
              >
                <div className="text-butter mb-2">
                  &gt; {step.title}
                </div>
                {step.agentSays.map((line, i) => (
                  <div key={i} className="text-cream/85">
                    {line}
                  </div>
                ))}
                <div className="text-ink/0 mt-2 inline-block">
                  <span className="text-cream inline-block w-2 h-4 bg-butter animate-pulse-dot align-middle ml-0" />
                </div>
              </div>

              {/* 控制 */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCursor((c) => Math.max(0, c - 1))}
                  disabled={cursor === 0}
                  className="btn-stamp bg-white text-ink disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="上一步"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2.4} />
                  上一步
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCursor((c) => Math.min(STEPS.length - 1, c + 1))
                  }
                  disabled={cursor === STEPS.length - 1}
                  className="btn-stamp bg-ink text-cream disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="下一步"
                >
                  下一步
                  <ChevronRight className="w-4 h-4" strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  onClick={() => setCursor(0)}
                  className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55 hover:text-ink"
                  aria-label="重置"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.4} />
                  reset
                </button>
              </div>
            </div>

            {/* Armin 引用条 */}
            <div className="mt-5 p-5 rounded-2xl border-2 border-dashed border-ink/35 bg-cream">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5">
                旁注 · Armin Ronacher 拆 Plan 模式
              </div>
              <p className="font-sans text-[14px] leading-[1.65] text-ink/80">
                Flask 作者 Armin Ronacher 拆过 Claude Code 的 Plan：
                <strong className="text-ink"> 技术上就是一段预设 Prompt + 工具白名单 </strong>
                ，你自己写 prompt 也能复现行为。但他承认 ——
                「计划确认 / 一键切到执行模式」这套 UI 是纯 prompt 做不到的。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPlanMode;
