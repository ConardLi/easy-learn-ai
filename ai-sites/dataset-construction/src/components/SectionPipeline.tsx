/**
 * SectionPipeline · Easy Dataset 全流程六步（03 · L3 单步 trace）
 *
 * 交互：点「下一步」走完六道工序，每步看在干嘛 + 右侧「料」的形态跟着变（文档 → 块 → 问答 → 带标签 → 洗过 → 成品文件）。
 *   各步顺手挂相关跨站链：分块→chunk，清洗→data-cleaning，标签→data-annotation，评估→evaluation。
 */
import React, { useState } from "react";
import { Upload, Scissors, MessageSquare, Tags, Sparkles, Download, ArrowRight, RotateCcw } from "lucide-react";
import StampLink from "./StampLink";

const STEPS = [
  {
    key: "upload",
    icon: Upload,
    title: "上传文档",
    color: "#1B4B5A",
    body: "把 PDF、Markdown、txt 这些资料丢进去。工具先把它们解析成纯文字，方便后面处理。",
    shape: "一摞原始文档",
    link: null as null | { href: string; title: string; desc: string },
  },
  {
    key: "chunk",
    icon: Scissors,
    title: "智能分块",
    color: "#E07A5F",
    body: "长文档一口吃不下，先按段落、标题切成一小块一小块。每块大小适中，刚好够出一两道题。",
    shape: "切成的一小块一小块",
    link: { href: "../chunk/index.html", title: "为什么要切块？", desc: "去《轻松理解 文本分块》看切块的门道。" },
  },
  {
    key: "qa",
    icon: MessageSquare,
    title: "生成问答对",
    color: "#FF4D74",
    body: "对每一块，让大模型自动出几个问题、再自动作答。这是最核心的一步 —— 文档就这样变成了问答。",
    shape: "一条条「Q + A」",
    link: null,
  },
  {
    key: "label",
    icon: Tags,
    title: "标签管理",
    color: "#8a6d1f",
    body: "给每条问答打上分类标签（比如「退货」「支付」），方便筛选、配比，也方便后面挑着用。",
    shape: "带分类标签的问答",
    link: { href: "../data-annotation/index.html", title: "标签怎么打？", desc: "去《轻松理解 数据标注》看打标签这件事。" },
  },
  {
    key: "clean",
    icon: Sparkles,
    title: "清洗评估",
    color: "#1B4B5A",
    body: "把重复的、答非所问的、质量差的挑出去，再给整批数据打个分，心里有数哪些能用。",
    shape: "洗干净、评过分的问答",
    link: { href: "../data-cleaning/index.html", title: "怎么洗？", desc: "去《轻松理解 数据清洗》看挑脏数据的手法。" },
  },
  {
    key: "export",
    icon: Download,
    title: "导出",
    color: "#241C15",
    body: "把成品导成训练框架认识的格式文件（比如 Alpaca、ShareGPT），直接拿去喂模型。",
    shape: "一个能直接训的文件",
    link: { href: "../evaluation/index.html", title: "训完怎么验？", desc: "去《轻松理解 评估》看怎么打分。" },
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
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">The Full Pipeline</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          一条流水线，分六步走
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          Easy Dataset 把「文档变问答」拆成六道工序，一步接一步往下走。
          点「下一步」，跟着一摞文档走完全程，看它怎么一步步变成能用的数据。
        </p>

        {/* 进度轨 */}
        <div className="mt-9 flex items-center gap-1">
          {STEPS.map((s, i) => {
            const done = i <= step;
            const Ic = s.icon;
            return (
              <React.Fragment key={s.key}>
                <button
                  onClick={() => setStep(i)}
                  className={["flex flex-col items-center gap-1.5 transition-all", done ? "opacity-100" : "opacity-40"].join(" ")}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink"
                    style={{ backgroundColor: done ? s.color : "#FBEFE3" }}
                  >
                    <Ic className={done ? "h-4 w-4 text-cream" : "h-4 w-4 text-ink"} strokeWidth={2.3} />
                  </span>
                  <span className="font-display font-bold text-[10px] sm:text-[11.5px] text-ink text-center leading-tight">
                    {s.title}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 bg-ink/20 relative top-[-9px]">
                    <div className="h-full bg-ink transition-all duration-400" style={{ width: i < step ? "100%" : "0%" }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div key={cur.key} className="card-stamp p-7 animate-enter-fade h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink" style={{ backgroundColor: cur.color }}>
                  <Icon className="h-5 w-5 text-cream" strokeWidth={2.3} />
                </span>
                <h3 className="font-display font-extrabold text-[22px] text-ink">
                  第 {step + 1} 步 · {cur.title}
                </h3>
              </div>
              <p className="font-sans text-[16.5px] leading-[1.8] text-ink/85 max-w-[640px]">{cur.body}</p>

              {cur.link && (
                <div className="mt-5">
                  <StampLink href={cur.link.href} title={cur.link.title} desc={cur.link.desc} compact />
                </div>
              )}

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
                  disabled={step === STEPS.length - 1}
                  className="btn-stamp bg-ink text-cream disabled:opacity-30 disabled:pointer-events-none"
                >
                  下一步
                  <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                </button>
                <button onClick={() => setStep(0)} className="btn-stamp bg-cream text-ink">
                  <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
                  重来
                </button>
              </div>
            </div>
          </div>

          {/* 料的形态可视化 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">
                这会儿手里的「料」长啥样
              </div>
              <div
                key={cur.key}
                className="flex-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-ink/30 px-5 py-10 animate-enter-pop"
                style={{ backgroundColor: `${cur.color}14` }}
              >
                <div className="text-center">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink mb-3"
                    style={{ backgroundColor: cur.color }}
                  >
                    <Icon className="h-6 w-6 text-cream" strokeWidth={2.2} />
                  </span>
                  <div className="font-display font-extrabold text-[19px] text-ink leading-snug">{cur.shape}</div>
                </div>
              </div>
              <p className="mt-4 font-mono text-[10px] text-ink/40">
                第 {step + 1} / {STEPS.length} 步 —— 料一步步从「散文档」变成「成品数据」。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPipeline;
