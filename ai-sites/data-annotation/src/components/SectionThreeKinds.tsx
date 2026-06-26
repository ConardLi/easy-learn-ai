/**
 * SectionThreeKinds · 三种标注对应三种训练（L3 切换 → 样例形变）
 *
 * 交互：点三种标注方式，右侧实时换「这种标注长啥样」+ 用在哪种训练。
 * 出站互链：sft（指令对）/ dpo（偏好对）/ evaluation（评估标注，若已建）。
 * 分锅：只讲「怎么标 / 标成什么样」，数据来源在训练数据集站。
 */
import React, { useState } from "react";
import StampLink from "./StampLink";

type Kind = "instruct" | "preference" | "eval";

const KINDS: Record<
  Kind,
  {
    title: string;
    usedFor: string;
    color: string;
    how: string;
    sample: React.ReactNode;
    link: { href: string; title: string; desc: string };
  }
> = {
  instruct: {
    title: "指令标注",
    usedFor: "用于监督微调（SFT）",
    color: "#E07A5F",
    how: "给一条指令，人工写出或修订一个「理想回答」，让模型照着学怎么办事。",
    sample: (
      <div className="font-mono text-[13.5px] leading-[1.75] text-ink/85">
        <span className="text-coral font-bold">指令：</span>用一句话解释什么是光合作用。
        <br />
        <span className="text-teal font-bold">标注的理想回答：</span>
        植物利用阳光，把二氧化碳和水变成养分和氧气。
      </div>
    ),
    link: {
      href: "../sft/index.html",
      title: "这种标注喂去哪？",
      desc: "去《轻松理解 SFT》，看指令数据怎么把模型调成会听话的助手。",
    },
  },
  preference: {
    title: "偏好标注",
    usedFor: "用于偏好对齐（DPO / RLHF）",
    color: "#FF4D74",
    how: "同一个问题给两个回答，人工标出「哪个更好」，让模型学人的喜好。",
    sample: (
      <div className="font-mono text-[13.5px] leading-[1.75] text-ink/85">
        <span className="text-ink/45">问题：</span>朋友失恋了，怎么安慰？
        <br />
        <span className="text-teal font-bold">A（标为更好）：</span>先陪着，让他说，别急着给建议。
        <br />
        <span className="text-ink/40">B：</span>下一个会更好，别难过了。
      </div>
    ),
    link: {
      href: "../dpo/index.html",
      title: "这种标注喂去哪？",
      desc: "去《轻松理解 DPO》，看偏好数据怎么让回答更合人心意。",
    },
  },
  eval: {
    title: "评估标注",
    usedFor: "用于衡量模型好不好",
    color: "#1B4B5A",
    how: "给模型的回答打分或判对错，攒成一套「考卷+标准答案」，用来检验模型水平。",
    sample: (
      <div className="font-mono text-[13.5px] leading-[1.75] text-ink/85">
        <span className="text-ink/45">题：</span>3 的平方是多少？
        <br />
        <span className="text-teal font-bold">标准答案：</span>9
        <br />
        <span className="text-coral font-bold">模型答「6」→ 标注：错</span>
      </div>
    ),
    link: {
      href: "../evaluation/index.html",
      title: "怎么用它考模型？",
      desc: "去《轻松理解 模型评估》，看带标准答案的测试集怎么打分。",
    },
  },
};

const ORDER: Kind[] = ["instruct", "preference", "eval"];

const SectionThreeKinds: React.FC = () => {
  const [active, setActive] = useState<Kind>("instruct");
  const k = KINDS[active];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Three Flavors</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          标注不止一种，看你拿来干嘛
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          训练的不同阶段，需要不同样子的标注。点下面三种，看每种
          <span className="font-bold text-ink">具体怎么标、标出来长啥样</span>。
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          {ORDER.map((key) => {
            const on = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={[
                  "px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-all duration-250 ease-spring",
                  on ? "text-cream shadow-stamp -translate-y-0.5" : "bg-cream text-ink/60 hover:text-ink",
                ].join(" ")}
                style={on ? { backgroundColor: KINDS[key].color } : undefined}
              >
                {KINDS[key].title}
              </button>
            );
          })}
        </div>

        <div key={active} className="mt-7 animate-enter-fade grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full">
              <div
                className="inline-block rounded-full px-3 py-1 font-mono text-[10.5px] tracking-[0.16em] uppercase text-cream font-bold"
                style={{ backgroundColor: k.color }}
              >
                {k.usedFor}
              </div>
              <h3 className="font-display font-extrabold text-[24px] text-ink mt-4">{k.title}</h3>
              <p className="mt-3 font-sans text-[15.5px] leading-[1.75] text-ink/80">{k.how}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">
                这种标注长啥样
              </div>
              <div className="flex-1 bg-cream border-2 border-ink rounded-2xl p-5">{k.sample}</div>
              <div className="mt-5">
                <StampLink href={k.link.href} title={k.link.title} desc={k.link.desc} compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThreeKinds;
