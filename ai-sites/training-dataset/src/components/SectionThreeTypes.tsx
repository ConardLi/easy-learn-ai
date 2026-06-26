/**
 * SectionThreeTypes · 数据分三种，对应训练三阶段（L3 切换 + 真实样例形变）
 *
 * 交互：点三种数据类型，右侧「一条数据长啥样」实时换样例 + 标出喂在哪个训练阶段。
 * 互链：pretrain / sft / dpo（每种类型对应一个已建训练线站）。
 * 分锅：这里只讲「数据分哪几类、各长啥样」，不讲怎么标（→ 数据标注站）。
 */
import React, { useState } from "react";
import StampLink from "./StampLink";

type TypeKey = "pretrain" | "sft" | "preference";

const TYPES: Record<
  TypeKey,
  {
    title: string;
    stage: string;
    color: string;
    chip: string;
    purpose: string;
    sample: React.ReactNode;
    link: { href: string; title: string; desc: string };
  }
> = {
  pretrain: {
    title: "预训练语料",
    stage: "第 1 阶段 · 预训练",
    color: "#1B4B5A",
    chip: "海量、原始、不带标准答案",
    purpose: "让模型先把语言本身学明白：词怎么搭、句子怎么接、世界大概是什么样。",
    sample: (
      <div className="font-mono text-[13.5px] leading-[1.7] text-ink/85">
        <span className="text-ink/45">// 一大段连续的文字，模型学着「接下去会是什么」</span>
        <br />
        北宋的活字印刷由毕昇发明，比欧洲早了约四百年。这项技术用胶泥刻字，烧硬后……
      </div>
    ),
    link: {
      href: "../pretrain/index.html",
      title: "这堆料怎么喂？",
      desc: "去《轻松理解 预训练》，看第一阶段怎么让模型读海量文字。",
    },
  },
  sft: {
    title: "指令数据（SFT）",
    stage: "第 2 阶段 · 监督微调",
    color: "#E07A5F",
    chip: "一问一答，带「标准答案」",
    purpose: "教模型「听懂人话、按要求办事」—— 给一个指令，配一个理想回答。",
    sample: (
      <div className="font-mono text-[13.5px] leading-[1.7] text-ink/85">
        <span className="text-coral font-bold">指令：</span>把这句话翻译成英文：今天天气很好。
        <br />
        <span className="text-teal font-bold">理想回答：</span>The weather is nice today.
      </div>
    ),
    link: {
      href: "../sft/index.html",
      title: "这堆料怎么喂？",
      desc: "去《轻松理解 SFT》，看指令数据怎么把模型调成会听话的助手。",
    },
  },
  preference: {
    title: "偏好数据",
    stage: "第 3 阶段 · 偏好对齐",
    color: "#FF4D74",
    chip: "同一个问题，两个回答比好坏",
    purpose: "告诉模型「人更喜欢哪种回答」—— 同一问题给两个答案，标出哪个更好。",
    sample: (
      <div className="font-mono text-[13.5px] leading-[1.7] text-ink/85">
        <span className="text-ink/45">问题：</span>怎么安慰一个考砸的朋友？
        <br />
        <span className="text-teal font-bold">✓ 更好：</span>先听他说，别急着讲道理，陪一会儿。
        <br />
        <span className="text-ink/40 line-through">✗ 较差：</span>考砸了就多努力呗。
      </div>
    ),
    link: {
      href: "../dpo/index.html",
      title: "这堆料怎么喂？",
      desc: "去《轻松理解 DPO》，看偏好数据怎么让模型答得更合人心意。",
    },
  },
};

const ORDER: TypeKey[] = ["pretrain", "sft", "preference"];

const SectionThreeTypes: React.FC = () => {
  const [active, setActive] = useState<TypeKey>("pretrain");
  const t = TYPES[active];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Three Kinds</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          训练数据集不是一锅烩，
          <br />
          它分三种
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          一个模型从白纸到能干活，要分几个阶段学，每个阶段喂的材料长得完全不一样。
          点下面三个类型，看每种数据
          <span className="font-bold text-ink">具体长什么样、喂在哪一步</span>。
        </p>

        {/* 阶段进度条式切换 */}
        <div className="mt-9 grid grid-cols-3 gap-2 sm:gap-3 max-w-[760px]">
          {ORDER.map((k, i) => {
            const on = k === active;
            return (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={[
                  "rounded-2xl border-2 border-ink px-3 py-3 text-left transition-all duration-250 ease-spring",
                  on ? "shadow-stamp -translate-y-0.5 text-cream" : "bg-cream text-ink/60 hover:text-ink",
                ].join(" ")}
                style={on ? { backgroundColor: TYPES[k].color } : undefined}
              >
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-70">
                  STEP {i + 1}
                </div>
                <div className="font-display font-bold text-[14px] sm:text-[15px] mt-0.5 leading-tight">
                  {TYPES[k].title}
                </div>
              </button>
            );
          })}
        </div>

        {/* 详情卡 */}
        <div key={active} className="mt-7 animate-enter-fade grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full">
              <div
                className="inline-block rounded-full px-3 py-1 font-mono text-[10.5px] tracking-[0.16em] uppercase text-cream font-bold"
                style={{ backgroundColor: t.color }}
              >
                {t.stage}
              </div>
              <h3 className="font-display font-extrabold text-[24px] text-ink mt-4">{t.title}</h3>
              <div className="mt-2 inline-block bg-butter border-2 border-ink rounded-full px-3 py-1 font-bold text-[13px] text-ink">
                {t.chip}
              </div>
              <p className="mt-4 font-sans text-[15.5px] leading-[1.75] text-ink/80">{t.purpose}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">
                一条这种数据长啥样
              </div>
              <div className="flex-1 bg-cream border-2 border-ink rounded-2xl p-5">{t.sample}</div>
              <div className="mt-5">
                <StampLink href={t.link.href} title={t.link.title} desc={t.link.desc} compact />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 font-serif italic text-[16px] text-ink/70 max-w-[760px]">
          三种数据各管一个阶段：先用海量语料把底子打牢，再用指令数据教它听话，
          最后用偏好数据把回答的口味调到人喜欢。缺哪种，模型就缺哪块本事。
        </p>
      </div>
    </section>
  );
};

export default SectionThreeTypes;
