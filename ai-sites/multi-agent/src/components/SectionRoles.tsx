/**
 * SectionRoles · 怎么分工：常见的几个角色
 *
 * 交互：pill 切换 4 个角色（规划/执行/审查/总结），点一个看它的职责 + 一句独白 + 输入输出
 */
import React, { useState } from "react";
import { ClipboardList, Hammer, Search, FileCheck } from "lucide-react";

const ROLES = [
  {
    key: "plan",
    name: "规划",
    en: "Planner",
    icon: ClipboardList,
    color: "#1B4B5A",
    duty: "把一个大任务拆成一步步小任务，排好先后顺序，决定每步交给谁。",
    voice: "「这事得先查三家竞品的价格，再做对比表，最后写结论。我来排单子。」",
    takesIn: "用户的原始需求",
    givesOut: "一份分好步骤的任务清单",
  },
  {
    key: "exec",
    name: "执行",
    en: "Executor",
    icon: Hammer,
    color: "#E07A5F",
    duty: "拿到分好的小任务，真正动手干 —— 调工具、查资料、写内容、跑代码。",
    voice: "「收到第一步：查竞品价格。我去翻官网、调搜索工具，把数据抓回来。」",
    takesIn: "一条具体的小任务",
    givesOut: "这一步干完的结果",
  },
  {
    key: "review",
    name: "审查",
    en: "Reviewer",
    icon: Search,
    color: "#F4D35E",
    duty: "检查执行的结果对不对、全不全，发现问题就打回去重做。",
    voice: "「价格表少了一家，而且有一个数字像是去年的。这步不算过，退回重查。」",
    takesIn: "执行交出的结果",
    givesOut: "通过 / 打回 + 问题说明",
  },
  {
    key: "sum",
    name: "总结",
    en: "Summarizer",
    icon: FileCheck,
    color: "#FF4D74",
    duty: "把各步通过的结果收拢，整理成用户真正想要的那份最终交付。",
    voice: "「三家价格、对比表、结论都齐了。我把它们拼成一份干净的报告交出去。」",
    takesIn: "各步通过后的零散结果",
    givesOut: "一份完整的最终交付",
  },
];

const SectionRoles: React.FC = () => {
  const [active, setActive] = useState("plan");
  const role = ROLES.find((r) => r.key === active)!;
  const Icon = role.icon;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-white/40">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Who Does What</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          活分给谁？最常见的四个角色
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[680px]">
          多数多 Agent 团队里都能找到这几个分工。点一个角色，看它具体管什么、
          手里接进来什么、又交出去什么。
        </p>

        {/* pill 切换 */}
        <div className="mt-10 flex flex-wrap gap-3">
          {ROLES.map((r) => {
            const RIcon = r.icon;
            const on = r.key === active;
            return (
              <button
                key={r.key}
                onClick={() => setActive(r.key)}
                className={[
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-all duration-250 ease-spring",
                  on
                    ? "shadow-stamp -translate-y-0.5 text-ink"
                    : "bg-cream text-ink/60 hover:text-ink hover:-translate-y-0.5",
                ].join(" ")}
                style={on ? { backgroundColor: r.color } : undefined}
              >
                <RIcon className="w-4 h-4" strokeWidth={2.4} />
                {r.name}
              </button>
            );
          })}
        </div>

        {/* 详情卡 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <div className="card-stamp p-7 h-full">
              <div className="flex items-center gap-4 mb-5">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink shadow-stamp"
                  style={{ backgroundColor: role.color }}
                >
                  <Icon className="w-7 h-7 text-ink" strokeWidth={2.2} />
                </span>
                <div>
                  <div className="font-display font-extrabold text-[26px] text-ink leading-none">
                    {role.name}
                  </div>
                  <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-ink/50 mt-1.5">
                    {role.en}
                  </div>
                </div>
              </div>
              <p className="font-sans text-[16px] leading-[1.75] text-ink/80">{role.duty}</p>
              <div className="mt-5 bg-cream border-2 border-dashed border-ink/30 rounded-2xl px-5 py-4">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-1.5">
                  它心里的话
                </div>
                <p className="font-serif italic text-[15px] leading-[1.7] text-ink/80">
                  {role.voice}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 flex-1">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                接进来什么
              </div>
              <div className="font-display font-bold text-[17px] text-ink">{role.takesIn}</div>
            </div>
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 flex-1">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                交出去什么
              </div>
              <div className="font-display font-bold text-[17px] text-ink">{role.givesOut}</div>
            </div>
          </div>
        </div>

        <p className="mt-8 font-sans text-[15px] leading-[1.7] text-ink/65 max-w-[680px]">
          角色不是固定四个 —— 简单任务可能只有「规划 + 执行」，复杂任务可能再加「专家」「质检」。
          但它们怎么连在一起，有几种典型搭法，下一节细看。
        </p>
      </div>
    </section>
  );
};

export default SectionRoles;
