/**
 * SectionHero · Chain of Thought 是什么？
 *
 * 开场纪律：
 *   1. eyebrow：Chain of Thought · 思维链
 *   2. H1「Chain of Thought 是什么？」直白发问
 *   3. 一句话定义（display 字 + butter 高亮）：让模型先写一步步的推理，再给答案
 *   4. 白话 2-3 段：全用日常词，铺垫「推理过程」「先想再答」
 *   5. 视觉锚：右侧两行对比 —— 上「直接蹦答案」一跳到结果（叉）；下「先想再答」一串相连的推理小方块走到答案（勾）
 *      —— 跟 context-window 的「横向玻璃长条」、agent 的「循环轨道」都不撞
 *   6. 过渡句剧透下一节 + 极简滚动提示（不带数字）
 */
import React from "react";
import { ArrowDown } from "lucide-react";

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：右上散落的小步骤点 */}
      <div className="absolute top-16 right-[7%] hidden md:flex gap-2 pointer-events-none opacity-60">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block w-2.5 h-2.5 rounded-sm border-2 border-ink"
            style={{ backgroundColor: i === 3 ? "#F4D35E" : "#FBEFE3" }}
          />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Chain of Thought · 思维链
            </span>
          </div>

          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            Chain of Thought
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-pop">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[660px] text-ink">
            让 ChatGPT 这类聊天 AI 在给出答案前，先把{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">一步步的推理过程写出来</span>
            </span>
            。
          </p>

          {/* 白话铺垫 —— 全日常词 */}
          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              拿一道要绕几个弯才能算对的题去问 ChatGPT，它经常张口就给你一个答案 ——
              <span className="font-bold text-ink">看着挺像样，一验算却是错的</span>。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              换个问法：让它别急着报结果，
              <span className="font-bold text-ink">先把每一步怎么想的写下来，最后再下结论</span>。
              同样一道题，先写过程再答，做对的明显多了。这套「先想再答」的写法，英文叫 Chain of Thought（简称 CoT），中文常叫思维链。
              <span className="block mt-1.5 text-ink/60 text-[14px]">
                技术文章里常把 ChatGPT 这类聊天 AI 背后的程序叫「模型」，下面为了跟别处对齐也这么叫，指的就是它。
              </span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              触发它只要一句话，比如在题目后面补一句「我们一步一步来想」；
              <span className="block mt-1.5 text-ink/65 text-[14.5px]">
                这招出自 Google 2022 年的一篇论文（Wei 等人），后面会讲它具体怎么用。
              </span>
            </p>
          </div>

          {/* 过渡句 + 滚动提示 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先拿一道真会算错的题，对比「直接答」和「先想再答」差多少。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 —— 两行对比 ─── */}
        <div className="lg:col-span-5">
          <div className="relative border-[3px] border-ink rounded-2xl bg-cream shadow-stamp-lg p-5">
            <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-4">
              同一道题 · 两种答法
            </div>

            {/* 上行：直接蹦答案 */}
            <div className="mb-5">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45 mb-2">
                直接答
              </div>
              <div className="flex items-center gap-2">
                <ChipBox label="题目" tone="q" />
                <Hop />
                <ChipBox label="答案" tone="wrong" mark="✕" />
              </div>
            </div>

            {/* 下行：先想再答 —— 推理链 */}
            <div className="rounded-xl border-2 border-ink bg-white p-3.5 shadow-stamp">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-pop mb-2 font-bold">
                先想再答 · Chain of Thought
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <ChipBox label="题目" tone="q" small />
                <Link />
                <ChipBox label="第1步" tone="step" small />
                <Link />
                <ChipBox label="第2步" tone="step" small />
                <Link />
                <ChipBox label="第3步" tone="step" small />
                <Link />
                <ChipBox label="答案" tone="right" mark="✓" small />
              </div>
              <p className="font-sans text-[12px] text-ink/65 leading-[1.55] mt-3">
                中间这几块就是「推理过程」，一块接一块推到最后的答案。
              </p>
            </div>

            <div className="mt-4 font-mono text-[10px] text-ink/45 leading-relaxed">
              示意图 · 帮你感受两种答法的差别
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── 小方块 ── */
const ChipBox: React.FC<{
  label: string;
  tone: "q" | "step" | "right" | "wrong";
  mark?: string;
  small?: boolean;
}> = ({ label, tone, mark, small }) => {
  const styles: Record<string, { bg: string; fg: string }> = {
    q: { bg: "#1B4B5A", fg: "#FBEFE3" },
    step: { bg: "#7A28CB", fg: "#FBEFE3" },
    right: { bg: "#F4D35E", fg: "#241C15" },
    wrong: { bg: "#FBEFE3", fg: "#241C15" },
  };
  const s = styles[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 ${
        small ? "px-2 py-1.5 text-[10.5px]" : "px-3 py-2 text-[12px]"
      } rounded-lg border-2 border-ink font-sans font-bold leading-none`}
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {label}
      {mark && (
        <span style={{ color: tone === "wrong" ? "#FF4D74" : "#241C15" }}>{mark}</span>
      )}
    </span>
  );
};

const Hop: React.FC = () => (
  <svg width="44" height="24" viewBox="0 0 44 24" fill="none" className="flex-shrink-0">
    <path
      d="M 2 20 Q 22 -6 42 20"
      stroke="#241C15"
      strokeWidth="2"
      strokeDasharray="3 3"
      fill="none"
      strokeLinecap="round"
    />
    <path d="M 36 16 L 42 20 L 36 22" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Link: React.FC = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" className="flex-shrink-0">
    <path d="M 1 6 H 10" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />
    <path d="M 7 2.5 L 11 6 L 7 9.5" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SectionHero;
