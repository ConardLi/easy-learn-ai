/**
 * SectionHero · 训练数据集是什么？
 *
 * Hero 六段骨架。一句话定义只用日常词（「喂给模型学习用的那一大批材料」），不甩 token/语料等术语。
 * 视觉锚：一个「投喂槽」—— 一摞材料卡片往模型里送，模型从空白学成会答话。
 *        teal + butter 主色，跟相邻 pretrain/sft/dpo 的配色错开。
 */
import React from "react";
import { ArrowDown, FileText, BookOpen, MessageSquare } from "lucide-react";

const FEED = [
  { label: "海量网页文章", icon: FileText, fill: "#1B4B5A" },
  { label: "问答对话样例", icon: MessageSquare, fill: "#E07A5F" },
  { label: "教科书 / 代码", icon: BookOpen, fill: "#F4D35E" },
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div className="absolute top-24 right-[8%] hidden md:grid grid-cols-4 gap-2 pointer-events-none opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink/30" />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Training Dataset · 训练数据集
            </span>
          </div>

          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            训练数据集
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-teal">？</span>
            </span>
          </h1>

          <p className="font-display font-bold text-[clamp(1.35rem,2.3vw,1.95rem)] leading-[1.42] mt-9 max-w-[720px] text-ink">
            训练数据集是{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">喂给模型「学习」用的那一大批材料</span>
            </span>
            ，模型把它们读个遍，才学会怎么理解和回话。
          </p>

          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              一个 AI 模型刚造出来时是张白纸，什么都不会。
              它的全部本事，都是从一大堆现成的文字、对话、代码里「看」会的。
              <span className="font-bold text-ink">这堆给它看的材料，就是训练数据集。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              你可以把它想成给学生准备的教材。教材选得好、覆盖得全、没有错字，
              学生就学得扎实；教材又乱又错，学出来也跟着歪。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              所以模型聪不聪明，很大程度不取决于谁更会调参数，
              <span className="font-bold text-ink">而要看它读的这批材料是不是又好又干净。</span>
            </p>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看同一个模型喂不同材料会差多少，再看这批材料分哪几种、从哪来、怎么挑。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* 视觉锚：投喂槽 */}
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                  喂进去的材料
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-teal font-bold">
                  模型在学
                </span>
              </div>

              <div className="space-y-3">
                {FEED.map((f) => {
                  const Icon = f.icon;
                  const lightBg = f.fill === "#F4D35E";
                  return (
                    <div
                      key={f.label}
                      className="flex items-center gap-3 border-2 border-ink rounded-2xl px-4 py-3 shadow-stamp"
                      style={{ backgroundColor: f.fill }}
                    >
                      <Icon
                        className={lightBg ? "w-4 h-4 text-ink" : "w-4 h-4 text-cream"}
                        strokeWidth={2.2}
                      />
                      <span
                        className={[
                          "font-display font-bold text-[14px]",
                          lightBg ? "text-ink" : "text-cream",
                        ].join(" ")}
                      >
                        {f.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="my-4 flex flex-col items-center gap-1">
                <ArrowDown className="w-5 h-5 text-ink/40" strokeWidth={2.4} />
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/40">
                  读个遍
                </span>
              </div>

              <div className="bg-ink text-cream rounded-2xl px-4 py-4 text-center">
                <div className="font-display font-extrabold text-[18px]">学会理解 + 回话的模型</div>
                <p className="mt-1 font-mono text-[10.5px] text-cream/60 leading-relaxed">
                  ↑ 材料越好越全，学出来越靠谱
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
