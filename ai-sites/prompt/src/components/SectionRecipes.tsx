/**
 * SectionRecipes · 几种常见写法套路
 *
 * 交互：chip 阵列筛选（点套路看说明）+ 输入框 live preview（L3）。
 *       用户在输入框写自己的问题，选一个套路，下方实时套出完整 prompt。
 */
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

type Recipe = {
  id: string;
  name: string;
  when: string;
  color: string;
  /** wrap 接收用户的问题，返回套好套路的完整 prompt */
  wrap: (q: string) => string;
};

const RECIPES: Recipe[] = [
  {
    id: "direct",
    name: "直接问",
    when: "事情简单、要得急，一句话说清就够了。",
    color: "#1B4B5A",
    wrap: (q) => q,
  },
  {
    id: "role",
    name: "给它一个角色",
    when: "想要某个行当的口吻或专业度，先告诉它「你是谁」。",
    color: "#E07A5F",
    wrap: (q) => `你是一位经验丰富的编辑。${q}`,
  },
  {
    id: "steps",
    name: "让它分步来",
    when: "事情有点绕，让它先想清楚步骤再动手，少出错。",
    color: "#7A28CB",
    wrap: (q) => `${q}\n请先列出你打算怎么做的步骤，再按步骤完成。`,
  },
  {
    id: "format",
    name: "指定输出格式",
    when: "你想要它回成表格、列表、或固定结构，先把样子说死。",
    color: "#E5BD3A",
    wrap: (q) => `${q}\n请用表格输出，两列：第一列写要点，第二列写说明。`,
  },
];

const SectionRecipes: React.FC = () => {
  const [active, setActive] = useState(RECIPES[0].id);
  const [q, setQ] = useState("帮我把这段会议记录整理成重点");
  const cur = RECIPES.find((r) => r.id === active)!;
  const output = cur.wrap(q.trim() || "（在上面写下你的问题）");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink/10">
      <div className="max-w-[1000px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">几套现成写法</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[720px] leading-tight">
          老手常用的四套写法
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/75 max-w-[660px]">
          没有标准答案，但有几套用得最顺的套路。先在框里写下你自己的问题，再点不同套路，
          看它怎么把你这句话套成一个更完整的 prompt。
        </p>

        {/* 输入框 */}
        <div className="mt-8 max-w-[640px]">
          <label className="block font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55 mb-2">
            你想问 AI 的事
          </label>
          <textarea
            value={q}
            onChange={(e) => setQ(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 bg-cream border-2 border-ink rounded-xl font-sans text-[15px] text-ink resize-none focus:outline-none focus:shadow-stamp transition-shadow"
            placeholder="比如：帮我写一段产品介绍"
          />
        </div>

        {/* chip 阵列 */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          {RECIPES.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              className={`px-4 py-2 rounded-full border-2 border-ink font-sans font-bold text-[14px] transition-all duration-250 ease-spring ${
                active === r.id
                  ? "text-cream shadow-stamp -translate-y-0.5"
                  : "bg-white text-ink/70 hover:text-ink"
              }`}
              style={active === r.id ? { backgroundColor: r.color } : undefined}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* 说明 + 实时输出 */}
        <div key={active} className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-5 items-start">
          {/* 这套什么时候用 */}
          <div className="md:col-span-2 border-2 border-ink rounded-2xl bg-cream shadow-stamp p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full border-2 border-ink" style={{ backgroundColor: cur.color }} />
              <span className="font-display font-bold text-[16px] text-ink">{cur.name}</span>
            </div>
            <p className="font-sans text-[14px] leading-[1.7] text-ink/75">{cur.when}</p>
          </div>

          {/* 套出来的 prompt */}
          <div className="md:col-span-3 border-2 border-ink rounded-2xl bg-cream shadow-stamp overflow-hidden">
            <div className="px-4 py-2.5 bg-ink flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-butter" strokeWidth={2.6} />
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream">
                套好的 PROMPT
              </span>
            </div>
            <div className="p-5">
              <p className="font-sans text-[14.5px] leading-[1.8] text-ink whitespace-pre-line">{output}</p>
            </div>
          </div>
        </div>

        <p className="mt-7 font-sans text-[13.5px] leading-[1.65] text-ink/60 max-w-[640px]">
          这四套能叠着用：给个角色 + 让它分步 + 指定格式，常常一起上。挑顺手的开始，写多了自然有感觉。
        </p>

        <p className="mt-6 font-serif italic text-[15px] text-ink/65 max-w-[600px]">
          知道怎么写好，也得知道哪些写法会翻车。下一节挑三个新手最常踩的。
        </p>
      </div>
    </section>
  );
};

export default SectionRecipes;
