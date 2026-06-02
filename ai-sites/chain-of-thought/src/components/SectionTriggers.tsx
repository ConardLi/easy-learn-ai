/**
 * SectionTriggers · 怎么让模型先想再答
 *
 * L3 chip 阵列 + 实时预览：
 *   - 点不同触发方式，右侧实时拼出「你发出去的 prompt」+ 模型大概的反应（示意）
 *   - 4 种：一句「一步一步想」(zero-shot) / 给带推理的例子 (few-shot CoT) / 直接要求先列步骤 / 用推理模型不用触发
 *   - few-shot 那条挂互链到 few-shot 站；推理模型那条挂到 deepseek-r1 站
 */
import React, { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

type Trigger = {
  id: string;
  tab: string;
  name: string;
  en: string;
  /** 你在题目后面（或前面）补的话 */
  added: string;
  /** 模型大概的反应 */
  react: string;
  /** 备注 / 出处 */
  note: string;
  link?: { href: string; label: string };
};

const TRIGGERS: Trigger[] = [
  {
    id: "lets",
    tab: "加一句话",
    name: "「我们一步一步来想」",
    en: "ZERO-SHOT COT",
    added: "……请我们一步一步来想。",
    react:
      "模型会先列出每一步的推算，最后才给结论 —— 不用给它任何例子，加这一句就够。",
    note: "出自 Kojima 等人 2022 年的论文，英文原句是 “Let’s think step by step”。最省事的触发法。",
  },
  {
    id: "fewshot",
    tab: "给例子",
    name: "给几个带推理过程的例子",
    en: "FEW-SHOT COT",
    added:
      "（先贴 2-3 道做法类似的题，每道都写清「先算什么、再算什么、最后答案」，然后才问你真正要问的题。）",
    react:
      "模型照着例子的格式，也把自己的推理一步步写出来。例子越贴近你的题，效果越稳。",
    note: "这是 Google 2022 年原论文（Wei 等人）提出的做法 —— 用带推理的示例去带模型。",
    link: { href: "../few-shot/index.html", label: "给例子这招 · Few-shot" },
  },
  {
    id: "ask",
    tab: "直接要求",
    name: "明说「先列步骤，再给答案」",
    en: "明确要求格式",
    added: "……先把解题步骤一条条列出来，最后单独一行写出答案。",
    react:
      "模型按你指定的格式走：先一条条列步骤，答案单独放最后。要的就是能一眼对照检查。",
    note: "适合你想让输出格式固定下来、方便核对每一步的时候。",
  },
  {
    id: "reasoning",
    tab: "换个模型",
    name: "用推理模型，啥都不用加",
    en: "换个会自己想的模型",
    added: "（什么都不用补，直接把题发过去。）",
    react:
      "这类模型默认就会先推理再回答，你不提它也会自己先想一长串，再给结论。",
    note: "2026 年有些新版 AI 叫推理模型（如 DeepSeek-R1、OpenAI 的 o 系列）。你什么都不用加，它自己就会先写一长串推算再给答案；普通聊天模式通常还得你补一句「一步步想」。",
    link: { href: "../deepseek-r1/index.html", label: "推理模型 · DeepSeek-R1" },
  },
];

const SectionTriggers: React.FC = () => {
  const [activeId, setActiveId] = useState(TRIGGERS[0].id);
  const active = TRIGGERS.find((t) => t.id === activeId)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-[#FEF6D3] border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Triggers · 怎么触发</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          怎么让它
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-white -z-0" />
            <span className="relative z-10">先想再答</span>
          </span>
          ？有几种招
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          <span className="font-bold text-ink">点下面的标签</span>
          ，右边实时拼出你要发给模型的话，再看它大概会怎么反应。
          <span className="block mt-1.5 text-ink/60 text-[14px]">
            两个常听到的叫法：只加一句话、不给例子，叫 zero-shot；先贴几道带过程的例题再问，叫 few-shot。名字记不住没关系。
          </span>
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：chip 阵列 */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-3">
              {TRIGGERS.map((t) => {
                const on = t.id === activeId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    className={`text-left px-4 py-3.5 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring ${
                      on
                        ? "bg-ink text-cream shadow-stamp-lg -translate-x-0.5 -translate-y-0.5"
                        : "bg-white text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-sans font-bold text-[11px] px-2.5 py-0.5 rounded-full border-2 ${
                          on ? "border-cream/40 text-butter" : "border-ink/20 text-ink/55"
                        }`}
                      >
                        {t.tab}
                      </span>
                    </div>
                    <div className="font-display font-bold text-[16px] mt-1.5 leading-tight">
                      {t.name}
                    </div>
                    <div className={`font-mono text-[9.5px] tracking-[0.15em] mt-1 ${on ? "text-cream/50" : "text-ink/40"}`}>
                      {t.en}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 右：实时预览 */}
          <div className="lg:col-span-8">
            <div key={active.id} className="animate-enter-fade space-y-4">
              {/* 拼好的 prompt */}
              <div className="rounded-2xl border-2 border-ink bg-white shadow-stamp-lg overflow-hidden">
                <div className="px-5 py-3 border-b-2 border-ink/10 bg-cream font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/60">
                  你发出去的话
                </div>
                <div className="px-5 py-4 font-mono text-[13.5px] leading-[1.7] text-ink/85">
                  <span className="text-ink/45">［你那道要绕弯的题］</span>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-[#7A28CB]/15 text-ink font-bold border border-[#7A28CB]/40">
                    {active.added}
                  </span>
                </div>
              </div>

              {/* 模型反应 */}
              <div className="rounded-2xl border-2 border-ink bg-white shadow-stamp overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3 border-b-2 border-ink/10 bg-cream">
                  <span className="w-6 h-6 rounded-full border-2 border-ink bg-pop flex items-center justify-center font-mono text-[10px] font-bold text-cream">
                    AI
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/60">
                    模型大概会怎么做（示意）
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="font-sans text-[15px] leading-[1.7] text-ink/85">{active.react}</p>
                </div>
              </div>

              {/* 备注 + 互链 */}
              <div className="rounded-2xl border-2 border-ink bg-butter px-5 py-4 shadow-stamp">
                <p className="font-sans text-[13.5px] leading-[1.6] text-ink/85">{active.note}</p>
                {active.link && (
                  <a
                    href={active.link.href}
                    className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                  >
                    <ExternalLink className="w-3 h-3 text-ink" strokeWidth={2.6} />
                    {active.link.label}
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTriggers;
