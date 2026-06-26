/**
 * SectionPipeline · 一条数据上桌前要过哪几关（hub 节，串起四站）
 *
 * 交互：单步 trace（收集 → 清洗 → 标注 → 构建打包），每步高亮 + 文字。
 * 这是「训练数据」小族的 hub：清洗 / 标注 / 构建 各挂出站互链。
 */
import React, { useState } from "react";
import { ArrowRight, RotateCcw, Database, Filter, Tag, Package } from "lucide-react";
import StampLink from "./StampLink";

const STEPS = [
  {
    key: "collect",
    icon: Database,
    title: "收集",
    color: "#1B4B5A",
    body: "从网页、公开集、人工、合成等来源，先把一大堆原始材料攒到一起。这时候它又多又乱。",
    link: null,
  },
  {
    key: "clean",
    icon: Filter,
    title: "清洗",
    color: "#E07A5F",
    body: "把重复的、乱码的、低质的、有害的样本剔掉，再统一格式。洗完量变少，但变干净了。",
    link: {
      href: "../data-cleaning/index.html",
      title: "怎么洗？",
      desc: "去《轻松理解 数据清洗》，看去重、去噪、过滤这套流程。",
    },
  },
  {
    key: "annotate",
    icon: Tag,
    title: "标注",
    color: "#F4D35E",
    body: "给数据加上「标签 / 标准答案」：指令配回答、两个回答比好坏。让模型有正确的方向可学。",
    link: {
      href: "../data-annotation/index.html",
      title: "怎么标？",
      desc: "去《轻松理解 数据标注》，看人工和半自动怎么给数据加标签。",
    },
  },
  {
    key: "build",
    icon: Package,
    title: "打包构建",
    color: "#FF4D74",
    body: "把整理好的数据切块、配比、转成模型能读的格式，导出成可以直接喂进训练的数据集。",
    link: {
      href: "../dataset-construction/index.html",
      title: "怎么打包？",
      desc: "去《轻松理解 数据集构建》，看用 Easy Dataset 把全流程自动跑通。",
    },
  },
];

const SectionPipeline: React.FC = () => {
  const [step, setStep] = useState(0);
  const cur = STEPS[step];
  const Icon = cur.icon;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">From Raw To Ready</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          一条数据，要过四关才能上桌
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          原始材料不能直接喂给模型，得先走一条流水线。
          点「下一步」，跟着一条数据走完
          <span className="font-bold text-ink">收集 → 清洗 → 标注 → 打包</span>。
          后面三关，每关都有一个专门的章节细讲。
        </p>

        {/* 进度轨 */}
        <div className="mt-9 flex items-center gap-1 sm:gap-2">
          {STEPS.map((s, i) => {
            const done = i <= step;
            const Ic = s.icon;
            return (
              <React.Fragment key={s.key}>
                <button
                  onClick={() => setStep(i)}
                  className={[
                    "flex flex-col items-center gap-1.5 transition-all duration-250",
                    done ? "opacity-100" : "opacity-40",
                  ].join(" ")}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink"
                    style={{ backgroundColor: done ? s.color : "#FBEFE3" }}
                  >
                    <Ic className={done ? "h-5 w-5 text-cream" : "h-5 w-5 text-ink"} strokeWidth={2.2} />
                  </span>
                  <span className="font-display font-bold text-[12px] sm:text-[13px] text-ink">
                    {s.title}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 bg-ink/20 relative top-[-9px]">
                    <div
                      className="h-full bg-ink transition-all duration-400"
                      style={{ width: i < step ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 当前步骤详情 */}
        <div key={cur.key} className="mt-8 animate-enter-fade">
          <div className="card-stamp p-7">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink"
                style={{ backgroundColor: cur.color }}
              >
                <Icon className="h-4 w-4 text-cream" strokeWidth={2.4} />
              </span>
              <h3 className="font-display font-extrabold text-[22px] text-ink">
                第 {step + 1} 关 · {cur.title}
              </h3>
            </div>
            <p className="font-sans text-[16.5px] leading-[1.8] text-ink/85 max-w-[760px]">{cur.body}</p>
            {cur.link && (
              <div className="mt-5 max-w-xl">
                <StampLink href={cur.link.href} title={cur.link.title} desc={cur.link.desc} compact />
              </div>
            )}
          </div>
        </div>

        {/* 控制 */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
            disabled={step === STEPS.length - 1}
            className="btn-stamp bg-ink text-cream disabled:opacity-30 disabled:pointer-events-none"
          >
            下一步
            <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
          </button>
          <button
            onClick={() => setStep(0)}
            className="btn-stamp bg-cream text-ink"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
            重来
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionPipeline;
