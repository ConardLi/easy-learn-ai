import React, { useState } from "react";
import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { LinkCard, SectionHead } from "./SectionBits";

const STEPS = [
  {
    title: "文字先切成小段",
    detail: "模型处理的基本小段叫 token。一个汉字常常占一个或几个 token，英文单词也可能被拆开。",
    cells: ["猫", "趴", "在", "窗", "边"],
    tone: "bg-butter",
  },
  {
    title: "每层都做阅读标记",
    detail: "大模型内部有很多连续的处理步骤，工程里把每一步叫一层。文字每经过一层，这一层都会为每个 token 算出自己的 K 和 V。",
    cells: ["K₁ V₁", "K₂ V₂", "K₃ V₃", "K₄ V₄", "K₅ V₅"],
    tone: "bg-coral",
  },
  {
    title: "K 帮忙找到相关位置",
    detail: "K 可以理解成索引线索。模型写下一段时，用它判断该回头看前文的哪里。",
    cells: ["谁", "动作", "位置", "地点", "状态"],
    tone: "bg-teal text-cream",
  },
  {
    title: "V 带回那里的信息",
    detail: "V 装着可取用的信息。K 找到位置后，模型从对应的 V 中拿内容。",
    cells: ["猫", "趴着", "靠近", "窗边", "安静"],
    tone: "bg-pop text-white",
  },
];

const SectionWhereKVComesFrom: React.FC = () => {
  const [step, setStep] = useState(0);
  const active = STEPS[step];

  return (
    <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead
          number="02"
          label="K 和 V 从哪来"
          title="每读一小段，模型都会留下两份标记"
          intro={
            <>
              <p>
                模型会把文字切成一个个小段，这种小段叫 <strong className="text-ink">token</strong>。
                K 和 V 是模型阅读 token 时算出的两组数字。
              </p>
              <p className="mt-3">
                这里先抓住用途。K 帮模型找位置，V 带回那个位置的信息。
              </p>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="card-stamp p-5 lg:col-span-8 lg:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
                第 {step + 1} 步 / {STEPS.length}
              </div>
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-3 py-1.5 text-xs font-bold"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                重来
              </button>
            </div>

            <div key={step} className="mt-6 animate-enter-fade">
              <h3 className="font-display text-2xl font-bold">{active.title}</h3>
              <p className="mt-3 max-w-[680px] text-[15px] leading-[1.75] text-ink/70">
                {active.detail}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                {active.cells.map((cell, index) => (
                  <React.Fragment key={`${cell}-${index}`}>
                    <span
                      className={`min-w-[72px] rounded-xl border-2 border-ink px-3 py-3 text-center font-mono text-[12px] font-bold ${active.tone}`}
                    >
                      {cell}
                    </span>
                    {index < active.cells.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-ink/35" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep((value) => Math.min(STEPS.length - 1, value + 1))}
              disabled={step === STEPS.length - 1}
              className="btn-stamp mt-8 bg-butter text-ink disabled:cursor-default disabled:opacity-45"
            >
              {step === STEPS.length - 1 ? "这份标记会存进缓存" : "看下一步"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-3xl border-2 border-ink bg-butter-tint p-5 shadow-stamp">
              <BookOpen className="h-7 w-7 text-coral" />
              <h3 className="mt-4 font-display text-xl font-bold">先不用学矩阵</h3>
              <p className="mt-2 text-sm leading-[1.7] text-ink/70">
                K、V 实际上是一排排数字。理解 KV Cache 时，先记住“位置线索”和“可取信息”就够了。
              </p>
            </div>
            <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp">
              <h3 className="font-display text-xl font-bold">Q 也在这套计算里</h3>
              <p className="mt-2 text-sm leading-[1.7] text-ink/70">
                模型还会为当前 token 算出 Q。Q 和前文各处的 K 比较，决定该看哪里，再从对应的 V 取回信息。这套过程叫注意力。
              </p>
            </div>
            <LinkCard
              href="../transformer/index.html"
              title="Q、K、V 的完整计算"
              desc="这里先记用途。数字怎样比较、怎样汇总，放在 Transformer 站继续讲。"
              compact
            />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default SectionWhereKVComesFrom;
