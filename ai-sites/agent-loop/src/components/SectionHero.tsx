/**
 * Hero · Agent Loop 是什么？
 *
 * 按 skill 的 Hero 开场纪律：
 *   1. eyebrow
 *   2. H1 = 「Agent Loop 是什么？」直白发问
 *   3. 一句话定义（display 字体 + butter 高亮）
 *   4. 白话 2 段
 *   5. 伪代码 6 行（最直观的"循环"具象化）
 *   6. 过渡句 + 滚动提示
 */
import React from "react";
import { ArrowDown, RotateCw } from "lucide-react";

const SectionHero: React.FC = () => {
  return (
    <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
      {/* 装饰：右上慢速旋转的虚线圆环（视觉锚 = 循环本身） */}
      <div className="absolute top-10 right-[6%] hidden md:block pointer-events-none">
        <RotateCw
          className="w-24 h-24 text-ink/15 animate-spin-slow"
          strokeWidth={1.5}
        />
      </div>
      {/* 装饰：左下小圆点阵 */}
      <div className="absolute bottom-10 left-[6%] hidden md:grid grid-cols-5 gap-2 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-ink/30"
          />
        ))}
      </div>

      <div className="relative max-w-[1080px] mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-20">
        {/* eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
          <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
          <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
            Agent Loop · 智能体执行循环
          </span>
        </div>

        {/* H1 直白发问 */}
        <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
          Agent Loop
          <br />
          <span className="inline-flex items-baseline gap-2">
            是什么<span className="text-coral">？</span>
          </span>
        </h1>

        {/* 一句话定义：display 字 + butter 高亮 */}
        <p className="font-display font-bold text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.4] mt-9 max-w-[860px] text-ink">
          Agent Loop 是{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-cream -z-0" />
            <span className="relative z-10">AI Agent 的迭代执行循环</span>
          </span>{" "}
          —— LLM 在循环里反复推理、调工具、看结果，直到任务做完。
        </p>

        {/* 白话铺垫 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-10 max-w-[920px]">
          <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
            你跟 ChatGPT 聊天，一问一答就结束 —— 那是{" "}
            <span className="font-bold text-ink">Single-pass（单轮响应）</span>
            。一个来回搞定的事，这种就够用。
          </p>
          <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
            但「搜股票 → 算涨幅 → 画图表」这种多步任务，一个来回不行。
            <span className="font-bold text-ink">需要 LLM 自己转圈干活</span>
            ：看一眼现状、选个工具、跑一下、再看结果 —— 转到完事为止。
            这就是 Agent Loop。
          </p>
        </div>

        {/* 伪代码 —— 6 行讲清"循环"是什么 */}
        <div className="mt-12 max-w-[760px]">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
            ──── 拆成伪代码就 6 行 ────
          </div>
          <pre className="bg-ink text-cream p-5 lg:p-6 rounded-2xl border-2 border-ink shadow-stamp-lg font-mono text-[13px] leading-[1.8] overflow-x-auto">
            <code>
              <span className="text-butter">while</span> <span className="text-coral">not</span> done:{"\n"}
              {"    "}response = call_llm(messages){"\n"}
              {"    "}<span className="text-butter">if</span> response.has_tool_calls:{"\n"}
              {"        "}results = execute_tools(response.tool_calls){"\n"}
              {"        "}messages.append(results){"\n"}
              {"    "}<span className="text-butter">else</span>:{"\n"}
              {"        "}done = <span className="text-coral">True</span>{"\n"}
              <span className="text-butter">return</span> response
            </code>
          </pre>
          <p className="font-sans text-[14px] text-ink/65 mt-3 leading-relaxed">
            就一个 while 循环。LLM 每跑一轮，要么决定调某个工具继续，
            要么判断"够了"就退出。
          </p>
        </div>

        {/* 过渡句 + 滚动提示 */}
        <div className="mt-14 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
          <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
            下面 7 节，把循环里发生的事、业界 3 种主流玩法、生产环境的坑，
            一节一节摊开看。
          </p>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
            <span>往下滚</span>
            <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
