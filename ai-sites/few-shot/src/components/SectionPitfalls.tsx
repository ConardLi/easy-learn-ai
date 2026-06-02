/**
 * SectionPitfalls · 给例子也会翻车，三种最常见
 *
 * 交互（L2 accordion）：三个并列的翻车点，点开看「现场 + 怎么修」。
 * 默认展开第一个，避免一上来一片折叠。
 */
import React, { useState } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";

const PITFALLS = [
  {
    tag: "例子选偏了",
    title: "几个例子全偏一边，把模型带歪",
    scene:
      "想分类商品评论，结果随手给的 3 个例子全是「负面」。模型一看你给的全是负面，新评论也跟着几乎全标成负面。",
    fix: "例子要覆盖你想要的各种情况 —— 正面、负面、中性都给一点，别让某一类占满。",
    color: "#E07A5F",
  },
  {
    tag: "格式不统一",
    title: "每个例子答得不一样，模型不知道学谁",
    scene:
      "第一个例子答「负面」，第二个答「这条偏负面哦」，第三个答「负面情绪打 8 分」。三个长得都不一样，模型只好猜，输出五花八门。",
    fix: "所有例子用同一个格式：输出长一个样、字段一个样。它照得准，回答才稳。",
    color: "#1B4B5A",
  },
  {
    tag: "例子太长",
    title: "例子贴太长，把模型的可视范围塞满",
    scene:
      "每个例子都贴一整段长文，还给了十几个。结果正题还没开始，这段 prompt 已经很长 —— 要么变慢变贵，要么前面的内容被挤出去。",
    fix: "例子尽量短，只留关键的那几句。够用就行，别贪多。模型能看到的篇幅是有限的。",
    color: "#7A28CB",
  },
];

const SectionPitfalls: React.FC = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-ink text-cream">
      <div className="max-w-[900px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num" style={{ background: "#F4D35E" }}>
            05
          </span>
          <span className="section-anchor-label" style={{ color: "#FBE891" }}>
            三种翻车
          </span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg max-w-[700px] leading-[1.1]">
          给例子也会翻车，三种最常见
        </h2>
        <p className="mt-5 font-sans text-[16.5px] leading-[1.75] text-cream/75 max-w-[640px]">
          给例子不是丢几句进去就行。下面三种是新手最容易踩的，点开看现场和怎么修。
        </p>

        <div className="mt-10 space-y-3">
          {PITFALLS.map((p, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="border-2 border-cream/30 rounded-2xl overflow-hidden bg-cream/[0.04]"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left"
                >
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-xl border-2 border-cream/40 grid place-items-center"
                    style={{ backgroundColor: p.color }}
                  >
                    <AlertTriangle className="w-4 h-4 text-cream" strokeWidth={2.4} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-mono text-[10.5px] tracking-[0.16em] uppercase text-cream/55">
                      {p.tag}
                    </span>
                    <span className="block font-display font-bold text-[17px] text-cream leading-snug mt-0.5">
                      {p.title}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cream/60 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={2.4}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 animate-enter-fade">
                    <div className="pl-12 space-y-3">
                      <div>
                        <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-coral">
                          现场
                        </span>
                        <p className="mt-1 font-sans text-[14.5px] leading-[1.7] text-cream/80">
                          {p.scene}
                        </p>
                      </div>
                      <div className="bg-cream/10 border-2 border-cream/25 rounded-xl px-4 py-3">
                        <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-butter">
                          怎么修
                        </span>
                        <p className="mt-1 font-sans text-[14.5px] leading-[1.7] text-cream">
                          {p.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionPitfalls;
