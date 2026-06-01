/**
 * Section 05 · Timeline · 6 年关键转折
 *
 * 反模板：
 *   §04 = 4 个 Animation 上下纵向（多种交互混搭）
 *   §05 = 单步切换的水平时间线（next/prev/点节点 · L2）
 *
 * 设计：
 *   - 10 条精选，从 2017 Transformer 论文 → 2026 Agent 化
 *   - 每条 1 句「为啥它发生」+ 1 句「它影响了啥」
 *   - 不背型号清单，没有「时刻更新中」之类的废话
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Beat {
  year: string;
  short: string;
  /** 当时发生了啥 */
  what: string;
  /** 这件事影响了啥 */
  impact: string;
  /** 节点突出色 */
  tone: "ink" | "coral" | "butter" | "teal";
}

const BEATS: Beat[] = [
  {
    year: "2017",
    short: "Transformer 论文",
    what:
      "Google 出了一篇叫《Attention Is All You Need》的论文，把「模型读一段文字时怎么挑重点」做了一种叫 Transformer 的新设计。",
    impact:
      "之后所有大语言模型基本都用这套结构起步。到现在 ChatGPT、Claude、Gemini 还都建在它上面。",
    tone: "ink",
  },
  {
    year: "2020.05",
    short: "GPT-3",
    what:
      "OpenAI 发布 1750 亿参数的 GPT-3。比上一代大了 100 倍，第一次让大家见识到「给几个例子就照学」。",
    impact:
      "「大语言模型」从这里开始被叫 LLM。之前的研究路线被这一款基本盖过去。",
    tone: "butter",
  },
  {
    year: "2022.11",
    short: "ChatGPT",
    what:
      "OpenAI 把 GPT-3 系列再「调教」了一轮（让它按指令做事），起了个名字叫 ChatGPT 上线。",
    impact:
      "5 天用户破百万，2 个月破亿 —— 这是 LLM 第一次走进所有人。",
    tone: "coral",
  },
  {
    year: "2023.03",
    short: "GPT-4",
    what:
      "ChatGPT 半年后 OpenAI 发了 GPT-4，能同时看图文，专业考试达到人类前 10%。同期 Anthropic Claude、Google Bard 出现。",
    impact:
      "ChatGPT 不再只是「会聊天的搜索」，开始能写代码、做表、解题。各家厂商正式入场。",
    tone: "ink",
  },
  {
    year: "2023.07",
    short: "Llama 2 · 开源火起来",
    what: "Meta 把 Llama 2 开源 + 允许商用。",
    impact: "闭源跟开源从这里分两条路。半年后开源能力快速追上。",
    tone: "teal",
  },
  {
    year: "2024.02",
    short: "Gemini 1.5 · 上下文跳到 100 万",
    what:
      "Google Gemini 1.5 Pro 一次性能记住 100 万字。整本《红楼梦》 + 整个项目代码塞进去都不会忘前面。",
    impact: "上下文长度这件事被卷到一个新量级，之后各家陆续跟进。",
    tone: "butter",
  },
  {
    year: "2024.05",
    short: "GPT-4o · 多模态原生化",
    what:
      "OpenAI GPT-4o 用同一个模型处理文字、图片、声音 —— 端到端，能实时跟你视频聊天。",
    impact: "之后「语音陪聊」、「看屏幕指导你操作」这类应用开始变实用。",
    tone: "coral",
  },
  {
    year: "2024.09",
    short: "OpenAI o1 · 推理模型",
    what:
      "OpenAI 发布 o1 ——「先想几步再说」这件事被内化进了训练。模型自己会先打草稿。",
    impact:
      "数学、代码这类要算账的题目准确率跳一档。「推理模型」变成新一类。",
    tone: "ink",
  },
  {
    year: "2025.01",
    short: "DeepSeek-R1 · 开源也能推理",
    what:
      "国产 DeepSeek 把推理模型完全开源 + 论文公开。性能跟 o1 同档，调用价格降到 1/10。",
    impact:
      "全球开源圈震动。之后「开源 = 落后」这个旧印象基本被打破。",
    tone: "teal",
  },
  {
    year: "2026",
    short: "今年 · Agent 化",
    what:
      "Claude Opus 4.7、GPT-5.5、Gemini 3.x 这一批，写代码水平接近资深工程师，开始能自己跑完几小时任务、操作浏览器。",
    impact:
      "LLM 从「会聊」变成「会动手做事」。这一节往后是另一个故事 —— 留给 Agent 那一摊去讲。",
    tone: "coral",
  },
];

const TONE_BG: Record<Beat["tone"], string> = {
  ink: "bg-ink text-cream",
  butter: "bg-butter text-ink",
  coral: "bg-coral text-white",
  teal: "bg-teal text-cream",
};
const TONE_DOT: Record<Beat["tone"], string> = {
  ink: "bg-ink",
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
};

const SectionTimeline: React.FC = () => {
  const [idx, setIdx] = useState(2); // 默认停在 ChatGPT
  const beat = BEATS[idx];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* 段头 */}
        <div className="mb-12 max-w-3xl">
          <div className="section-anchor">
            <span className="section-anchor-num">05</span>
            <span className="section-anchor-label">6 年关键转折</span>
          </div>
          <h2 className="font-display text-display-lg text-ink mb-4">
            6 年里发生了哪 10 件事
          </h2>
          <div className="space-y-3 font-sans text-[15px] text-ink/75 leading-relaxed">
            <p>
              不背型号清单。挑 10 个真正改了行业方向的节点，每个用一句话讲发生了啥、影响了啥。
            </p>
            <p>
              点下面的圆点切换，或用左右按钮一步步走。
            </p>
          </div>
        </div>

        {/* 时间线节点条 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          {/* 节点条 */}
          <div className="relative mb-7">
            {/* 横线 */}
            <div
              aria-hidden
              className="absolute left-3 right-3 top-1/2 h-[3px] bg-ink/20 -translate-y-1/2"
            />
            <div
              aria-hidden
              className="absolute left-3 top-1/2 h-[3px] bg-ink -translate-y-1/2 transition-all duration-400 ease-spring"
              style={{
                width: `calc((100% - 24px) * ${idx / (BEATS.length - 1)})`,
              }}
            />

            <div className="relative flex items-center justify-between">
              {BEATS.map((b, i) => {
                const isActive = i === idx;
                const isPast = i < idx;
                return (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="group relative flex flex-col items-center"
                  >
                    <span
                      className={[
                        "block rounded-full border-2 border-ink transition-all duration-250 ease-spring",
                        isActive
                          ? `w-7 h-7 ${TONE_DOT[b.tone]} shadow-[3px_3px_0_0_#241C15] ring-4 ring-butter/40`
                          : isPast
                            ? "w-4 h-4 bg-ink"
                            : "w-4 h-4 bg-white group-hover:bg-butter group-hover:scale-110",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "absolute top-9 font-mono text-[9.5px] tracking-wide whitespace-nowrap transition-colors",
                        isActive
                          ? "text-ink font-bold"
                          : "text-ink/45 group-hover:text-ink/80",
                      ].join(" ")}
                    >
                      {b.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 当前节点详情 */}
          <div
            key={idx}
            className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-12 animate-enter-fade"
          >
            <div className="lg:col-span-4">
              <div
                className={[
                  "inline-flex items-center gap-1 px-2.5 py-0.5 border-2 border-ink rounded-md font-mono text-[11px] font-bold tracking-wide mb-3",
                  TONE_BG[beat.tone],
                ].join(" ")}
              >
                {beat.year}
              </div>
              <h3 className="font-display font-extrabold text-[24px] lg:text-[28px] text-ink leading-tight">
                {beat.short}
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mt-2">
                №{" "}
                <span className="font-bold text-ink">
                  {String(idx + 1).padStart(2, "0")}
                </span>{" "}
                / {String(BEATS.length).padStart(2, "0")}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral mb-1.5">
                  发生了啥
                </div>
                <p className="font-sans text-[14.5px] text-ink/85 leading-relaxed">
                  {beat.what}
                </p>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral mb-1.5">
                  影响了啥
                </div>
                <p className="font-sans text-[14.5px] text-ink/80 leading-relaxed">
                  {beat.impact}
                </p>
              </div>
            </div>
          </div>

          {/* 控制条 */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-ink/10">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="flex items-center gap-1.5 px-3.5 h-9 rounded-full bg-white border-2 border-ink shadow-stamp font-mono text-[11px] font-bold tracking-wider disabled:opacity-30 disabled:shadow-none transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
            >
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.6} />
              PREV
            </button>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
              点圆点跳转 · 或左右
            </span>
            <button
              onClick={() => setIdx((i) => Math.min(BEATS.length - 1, i + 1))}
              disabled={idx === BEATS.length - 1}
              className="flex items-center gap-1.5 px-3.5 h-9 rounded-full bg-ink text-cream border-2 border-ink shadow-stamp font-mono text-[11px] font-bold tracking-wider disabled:opacity-30 disabled:shadow-none transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
            >
              NEXT
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.6} />
            </button>
          </div>
        </div>

        {/* 过渡 */}
        <p className="mt-10 max-w-3xl font-serif italic text-[14px] text-ink/55 leading-relaxed">
          —— 这 6 年的累积，让今天打开 ChatGPT / Claude / Gemini 的你具体能做什么？下面看 3 件大事 + 1 个大坑。
        </p>
      </div>
    </section>
  );
};

export default SectionTimeline;
