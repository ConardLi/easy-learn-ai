/**
 * SectionAsk · 同一个需求，问法不同结果差很多
 *
 * 交互：pill 切换（L2）。两种问法投同一个模型，左边 prompt 右边它回的话（示意）。
 * 教学点：模糊问法 → AI 只能瞎猜，回得泛；具体问法 → 给足信息，回得能直接用。
 */
import React, { useState } from "react";

type Variant = {
  id: string;
  pill: string;
  tag: string;
  tagColor: string;
  prompt: string;
  reply: string[];
  verdict: string;
};

const VARIANTS: Variant[] = [
  {
    id: "vague",
    pill: "模糊问法",
    tag: "信息不够 · AI 只能瞎猜",
    tagColor: "#E07A5F",
    prompt: "帮我写个活动文案",
    reply: [
      "好的！这是一段活动文案：",
      "「精彩活动，等你来参加！丰富内容，超值体验，名额有限，速速报名！」",
    ],
    verdict:
      "你没说什么活动、给谁看、要多长，AI 只能套一段谁都能用的空话。拿到手还得自己从头改。",
  },
  {
    id: "specific",
    pill: "具体问法",
    tag: "信息给足 · AI 答得能直接用",
    tagColor: "#1B4B5A",
    prompt:
      "帮我写一条朋友圈文案，宣传周六下午的少儿编程体验课。面向 6-10 岁孩子的家长，语气轻松，60 字以内，结尾带一句报名引导。",
    reply: [
      "周六下午，带娃来玩一节编程体验课吧！",
      "搭小游戏、动手做，孩子边玩边学逻辑。6-10 岁都合适，名额不多，戳我报名占座～",
    ],
    verdict:
      "你说清了渠道、对象、语气、字数、还要什么收尾。AI 照着填，回来基本能直接发。",
  },
];

const SectionAsk: React.FC = () => {
  const [active, setActive] = useState(VARIANTS[0].id);
  const cur = VARIANTS.find((v) => v.id === active)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink/10">
      <div className="max-w-[1000px] mx-auto">
        {/* 段标 */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">两种问法</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[720px] leading-tight">
          同一个需求，换种问法，AI 回的差很多
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/75 max-w-[640px]">
          下面是同一件事 ——「写活动文案」—— 的两种问法。点开关换一换，看左边你打的话变了之后，右边
          AI 回的话变成什么样。两边用的是同一个模型。
        </p>

        {/* pill 切换 */}
        <div className="mt-8 inline-flex p-1 bg-cream border-2 border-ink rounded-full shadow-stamp">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`px-5 py-2 rounded-full font-sans font-bold text-[14px] transition-all duration-250 ease-spring ${
                active === v.id
                  ? "bg-ink text-cream shadow-stamp"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              {v.pill}
            </button>
          ))}
        </div>

        {/* 对比主体 */}
        <div key={cur.id} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 左：你打的话 */}
          <div className="border-2 border-ink rounded-2xl bg-cream shadow-stamp overflow-hidden">
            <div className="px-4 py-2.5 bg-ink flex items-center justify-between">
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream">
                你打的话 · PROMPT
              </span>
            </div>
            <div className="p-5">
              <p className="font-sans text-[15px] leading-[1.7] text-ink">{cur.prompt}</p>
            </div>
          </div>

          {/* 右：AI 回的话 */}
          <div className="border-2 border-ink rounded-2xl bg-white shadow-stamp overflow-hidden">
            <div className="px-4 py-2.5 flex items-center justify-between" style={{ backgroundColor: cur.tagColor }}>
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream">
                AI 回的话 · 示意
              </span>
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-cream/80 px-1.5 py-0.5 border border-cream/50 rounded">
                示意
              </span>
            </div>
            <div className="p-5 space-y-2">
              {cur.reply.map((line, i) => (
                <p key={i} className="font-sans text-[14px] leading-[1.7] text-ink/85">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* 判语 */}
        <div
          className="mt-5 flex items-start gap-3 px-5 py-4 border-2 border-ink rounded-2xl"
          style={{ backgroundColor: active === "specific" ? "#FEF6D3" : "#fff" }}
        >
          <span
            className="flex-shrink-0 w-3 h-3 rounded-full mt-1.5 border-2 border-ink"
            style={{ backgroundColor: cur.tagColor }}
          />
          <div>
            <p className="font-sans font-bold text-[14px] text-ink">{cur.tag}</p>
            <p className="mt-1 font-sans text-[14px] leading-[1.65] text-ink/75">{cur.verdict}</p>
          </div>
        </div>

        <p className="mt-7 font-serif italic text-[15px] text-ink/65 max-w-[600px]">
          具体问法好用，是因为你多给了几样信息。下一节就把这几样拆开看。
        </p>
      </div>
    </section>
  );
};

export default SectionAsk;
