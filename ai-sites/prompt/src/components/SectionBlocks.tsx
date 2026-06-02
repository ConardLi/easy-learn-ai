/**
 * SectionBlocks · 一个清楚的 prompt 通常有哪几块
 *
 * 交互：拼装式编辑器（L4）。任务必选，背景/格式/约束三块用开关勾选，
 *       右侧实时拼出完整 prompt。让用户「摸到」每加一块，prompt 变具体一截。
 */
import React, { useState } from "react";
import { Check } from "lucide-react";

type Block = {
  id: string;
  label: string;
  role: string;
  color: string;
  text: string;
  required?: boolean;
};

const BLOCKS: Block[] = [
  {
    id: "task",
    label: "任务",
    role: "你到底要它干啥",
    color: "#1B4B5A",
    text: "帮我写一条朋友圈文案，宣传周六下午的少儿编程体验课。",
    required: true,
  },
  {
    id: "context",
    label: "背景",
    role: "它需要先知道的情况",
    color: "#E07A5F",
    text: "课程面向 6-10 岁孩子的家长，主打动手做小游戏、边玩边学。",
  },
  {
    id: "format",
    label: "输出格式",
    role: "你想要它长什么样",
    color: "#F4D35E",
    text: "控制在 60 字以内，结尾带一句报名引导。",
  },
  {
    id: "limit",
    label: "约束",
    role: "有哪些不能踩的线",
    color: "#7A28CB",
    text: "语气轻松一点，别用「速速报名」这种夸张促销词。",
  },
];

const SectionBlocks: React.FC = () => {
  const [on, setOn] = useState<Record<string, boolean>>({
    task: true,
    context: false,
    format: false,
    limit: false,
  });

  const toggle = (id: string, required?: boolean) => {
    if (required) return;
    setOn((p) => ({ ...p, [id]: !p[id] }));
  };

  const picked = BLOCKS.filter((b) => on[b.id]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-[1040px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">拆开看几块</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px] leading-tight">
          一个好用的 prompt，通常拼了这几块
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/75 max-w-[660px]">
          上一节那条「具体问法」，其实是几样信息拼起来的。勾上左边的开关，看右边的 prompt
          怎么一块一块长出来。任务这块是底，去不掉；另外三块加上越多，AI 越不用猜。
        </p>

        <div className="mt-9 grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          {/* 左：四块开关 */}
          <div className="space-y-3">
            {BLOCKS.map((b) => {
              const active = on[b.id];
              return (
                <button
                  key={b.id}
                  onClick={() => toggle(b.id, b.required)}
                  className={`w-full text-left flex items-start gap-3.5 px-4 py-3.5 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring ${
                    active
                      ? "bg-white shadow-stamp -translate-x-0.5 -translate-y-0.5"
                      : "bg-cream/60 shadow-none hover:bg-white"
                  } ${b.required ? "cursor-default" : "cursor-pointer"}`}
                >
                  {/* 勾选框 */}
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-md border-2 border-ink flex items-center justify-center mt-0.5 transition-colors duration-200"
                    style={{ backgroundColor: active ? b.color : "transparent" }}
                  >
                    {active && (
                      <Check
                        className="w-4 h-4"
                        strokeWidth={3.2}
                        style={{ color: b.id === "format" ? "#241C15" : "#FBEFE3" }}
                      />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="font-display font-bold text-[16px] text-ink">{b.label}</span>
                      {b.required && (
                        <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink/50 px-1.5 py-0.5 border border-ink/30 rounded">
                          必填
                        </span>
                      )}
                    </span>
                    <span className="block font-sans text-[12.5px] text-ink/55 mt-0.5">{b.role}</span>
                    <span className="block font-sans text-[13px] leading-[1.55] text-ink/75 mt-1.5">
                      {b.text}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* 右：实时拼出的 prompt */}
          <div className="lg:sticky lg:top-8">
            <div className="border-[3px] border-ink rounded-2xl bg-cream shadow-stamp-lg overflow-hidden">
              <div className="px-4 py-2.5 bg-ink flex items-center justify-between">
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream">
                  拼出来的 PROMPT
                </span>
                <span className="font-mono text-[10.5px] text-butter">
                  {picked.length} / 4 块
                </span>
              </div>
              <div className="p-5 min-h-[180px]">
                <p className="font-sans text-[15px] leading-[1.85] text-ink">
                  {picked.map((b) => (
                    <span
                      key={b.id}
                      className="transition-all duration-300"
                      style={{
                        boxShadow: `inset 0 -0.55em 0 ${b.color}55`,
                      }}
                    >
                      {b.text}
                    </span>
                  ))}
                </p>
              </div>
              {/* 当前块图例 */}
              <div className="px-5 pb-4 flex flex-wrap gap-2">
                {picked.map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-ink rounded-full font-mono text-[10px] font-bold text-ink"
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-ink" style={{ backgroundColor: b.color }} />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-4 font-sans text-[13px] leading-[1.65] text-ink/60">
              {picked.length <= 1
                ? "只有任务这一块时，AI 知道你要文案，但不知道给谁看、要多长 —— 它只能自己猜。"
                : picked.length === 4
                ? "四块都加上，AI 几乎不用猜了。它回来的东西，大概率能直接用。"
                : "每加一块，AI 要猜的就少一点。先把对你最重要的那几块加上。"}
            </p>
          </div>
        </div>

        <p className="mt-9 font-serif italic text-[15px] text-ink/65 max-w-[600px]">
          这四块怎么排、要不要给 AI 一个角色，老手手里有几套现成的套路。往下看。
        </p>
      </div>
    </section>
  );
};

export default SectionBlocks;
