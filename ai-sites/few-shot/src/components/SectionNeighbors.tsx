/**
 * SectionNeighbors · Few-shot 在大图里是哪一块？
 *
 * 1. 分锅句：写好提示词整体 = prompt 那篇；这站只讲「给示例」这一招。
 * 2. pill 切换（L2）：给示例 vs 微调，4 个维度对比 —— 再钉一次「few-shot 不改模型」。
 * 3. hub 聚合卡：一排 pill 链向兄弟站 + 微调 + 上游概念。
 */
import React, { useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const COMPARE = {
  fewshot: {
    name: "给示例（few-shot）",
    color: "#1B4B5A",
    rows: [
      { k: "动模型吗", v: "不动。模型一个参数都没变" },
      { k: "效果存哪", v: "只在这次对话里。关掉就没了，得重新给" },
      { k: "要准备啥", v: "几个写好的例子，复制进 prompt 就行" },
      { k: "适合啥", v: "临时让它照着某个格式 / 口味答" },
    ],
  },
  finetune: {
    name: "微调（fine-tuning）",
    color: "#7A28CB",
    rows: [
      { k: "动模型吗", v: "动。拿一批数据重新训练，改它的参数" },
      { k: "效果存哪", v: "存进模型里。以后不给例子也记得" },
      { k: "要准备啥", v: "成百上千条数据 + 训练流程 + 算力" },
      { k: "适合啥", v: "让它长期、稳定地学会某种能力或风格" },
    ],
  },
};

type Key = keyof typeof COMPARE;

const LINKS = [
  { href: "../prompt/index.html", label: "怎么写好提示词 · Prompt" },
  { href: "../system-prompt/index.html", label: "给它定人设 · System Prompt" },
  { href: "../chain-of-thought/index.html", label: "让它先想再答 · CoT" },
  { href: "../whyfinetune/index.html", label: "什么时候该微调 · Fine-tuning" },
  { href: "../context-window/index.html", label: "例子占的空间 · 上下文窗口" },
  { href: "../llm/index.html", label: "照着做的那个模型 · LLM" },
];

const SectionNeighbors: React.FC = () => {
  const [active, setActive] = useState<Key>("fewshot");
  const data = COMPARE[active];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">在大图里的位置</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[700px] leading-[1.1]">
          Few-shot 在大图里是哪一块？
        </h2>
        <p className="mt-5 font-sans text-[16.5px] leading-[1.75] text-ink/80 max-w-[680px]">
          Few-shot 只是写 prompt 时的一招 —— 多附几个例子。怎么把整段 prompt 写好、怎么给模型定人设、
          怎么让它先想再答，是隔壁几篇各自的事；这篇只盯「给示例」这一下。
        </p>

        {/* few-shot vs 微调 */}
        <div className="mt-8">
          <p className="font-sans text-[15px] leading-[1.7] text-ink/75 max-w-[680px] mb-5">
            这里要先说一句<span className="font-bold text-ink">微调（fine-tuning）</span>：
            拿一批数据把模型重新训练一遍，让它把某种本事记进自己身上。
            它和给示例常被拿来比，点下面两个切一切看差在哪。
          </p>
          <div className="inline-flex p-1 bg-white border-2 border-ink rounded-full shadow-stamp mb-5">
            {(Object.keys(COMPARE) as Key[]).map((k) => (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`px-4 py-2 rounded-full font-mono text-[12.5px] font-bold tracking-[0.04em] transition-colors duration-200 ${
                  active === k ? "bg-ink text-cream" : "text-ink/60 hover:text-ink"
                }`}
              >
                {COMPARE[k].name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start" key={active}>
            <div className="border-[3px] border-ink rounded-2xl bg-white shadow-stamp-lg overflow-hidden animate-enter-fade">
              <div
                className="px-5 py-3 font-display font-extrabold text-[18px] text-cream"
                style={{ backgroundColor: data.color }}
              >
                {data.name}
              </div>
              <div className="divide-y-2 divide-ink/10">
                {data.rows.map((r, i) => (
                  <div key={i} className="px-5 py-3.5">
                    <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-ink/50 mb-1">
                      {r.k}
                    </div>
                    <div className="font-sans text-[14.5px] text-ink leading-snug">{r.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 收尾硬规则 callout */}
            <div className="bg-butter border-2 border-ink rounded-2xl p-5 shadow-stamp">
              <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-ink/55 mb-2">
                到底选哪个
              </div>
              <p className="font-display font-bold text-[18px] text-ink leading-snug">
                只想这次让它照着做 → 给例子。
              </p>
              <p className="mt-2 font-display font-bold text-[18px] text-ink leading-snug">
                想让它永久学会某种本事 → 那是微调的活。
              </p>
              <p className="mt-3 font-sans text-[13.5px] text-ink/70 leading-relaxed">
                绝大多数日常场景，给几个例子就够了，根本用不上微调 —— 省钱省事，改起来也快。
              </p>
            </div>
          </div>
        </div>

        {/* 常和 CoT 一起用 */}
        <div className="mt-8 bg-white border-2 border-ink rounded-2xl px-5 py-4 shadow-stamp">
          <p className="font-sans text-[14.5px] leading-[1.7] text-ink/85">
            <span className="font-bold text-ink">小技巧：</span>
            如果例子里的「输出」不只写答案，还把
            <span className="font-bold text-ink">推理的几步</span>
            一起写出来，模型也会照着先一步步想再给答案 —— 这个组合常被叫做 few-shot CoT，
            对算术、推理这类题特别有用。
          </p>
        </div>

        {/* hub 聚合卡 */}
        <div className="mt-10 bg-butter border-2 border-ink rounded-3xl p-6 shadow-stamp-lg">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-4 h-4 text-ink" strokeWidth={2.4} />
            </span>
            <div>
              <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight">
                顺着这招往外看
              </h3>
              <p className="mt-1 font-sans text-[14px] text-ink/70 leading-relaxed max-w-[560px]">
                给示例是写 prompt 的一招。下面这几篇，挨着它讲。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border-2 border-ink rounded-full font-mono text-[11.5px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                {l.label}
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionNeighbors;
