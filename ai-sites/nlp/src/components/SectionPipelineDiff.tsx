/**
 * Section 05 · 2016 vs 2026 管线对比
 *
 * 同一句任务「翻译这条评论的情感」走两种 pipeline：
 *   - 2016 LEGACY：tokenize → lemmatize → POS → parse → sentiment classifier → 后处理（6 步）
 *   - 2026 LLM：prompt → LLM 一步出结果（1 步）
 *
 * before/after toggle，配横排步骤节点 + hover 看每步要干啥。
 *
 * 反模板：moe 用 before/after toggle 看专家利用率训练步数；
 *        这里 toggle 切的是"管线长度本身"，节点也是两套截然不同的。
 */
import React, { useState } from "react";
import { CheckCircle2, Zap, History } from "lucide-react";

type Step = {
  num: string;
  name: string;
  detail: string;
  tone: "ink" | "butter" | "coral" | "teal" | "cream";
};

const LEGACY_STEPS: Step[] = [
  {
    num: "01",
    name: "Tokenize",
    detail: "切词。中文要先 jieba，英文按空格 + 子词。",
    tone: "butter",
  },
  {
    num: "02",
    name: "Lemmatize",
    detail: "running → run。把变形还原成词根。",
    tone: "butter",
  },
  {
    num: "03",
    name: "POS 标注",
    detail: "标每个词的词性（名 / 动 / 形）。",
    tone: "coral",
  },
  {
    num: "04",
    name: "句法 parse",
    detail: "建依存树，弄清主谓宾。",
    tone: "coral",
  },
  {
    num: "05",
    name: "情感分类器",
    detail: "把特征喂给一个专门训练的 BERT / SVM。",
    tone: "teal",
  },
  {
    num: "06",
    name: "后处理 + 翻译",
    detail: "再走一遍翻译管线，套模板出最终答案。",
    tone: "teal",
  },
];

const LLM_STEPS: Step[] = [
  {
    num: "01",
    name: "写一句 prompt",
    detail: "「把下面这条评论译成英文，并打 1–5 分情感分。」",
    tone: "butter",
  },
  {
    num: "02",
    name: "LLM 直接出",
    detail: "GPT-5 / Claude 一次响应同时给翻译 + 评分 + 理由。",
    tone: "ink",
  },
];

const TONE_BG: Record<Step["tone"], string> = {
  ink: "bg-ink",
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
  cream: "bg-cream",
};
const TONE_TEXT: Record<Step["tone"], string> = {
  ink: "text-cream",
  butter: "text-ink",
  coral: "text-cream",
  teal: "text-cream",
  cream: "text-ink",
};

const SectionPipelineDiff: React.FC = () => {
  const [mode, setMode] = useState<"legacy" | "llm">("llm");
  const steps = mode === "legacy" ? LEGACY_STEPS : LLM_STEPS;
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 05</span>
          <span className="section-anchor-label">pipeline · before / after</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          同一个任务，2016 走 6 步，<br className="hidden md:block" />
          2026 走 1 步。中间这堵墙被推平了。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          任务：「把这条中文用户评论译成英文，再给个 1–5 分的情感分。」 切换看老 NLP 管线和今天 LLM 一步流的差距。
        </p>

        {/* 任务 prompt 卡 */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-1">
            input · 用户评论
          </div>
          <div className="font-serif italic text-[16px] text-ink leading-snug">
            「这款耳机降噪绝了，地铁里像戴了消音器；但充电盒做工对不起这个价。」
          </div>
        </div>

        {/* toggle */}
        <div className="inline-flex items-center bg-white border-2 border-ink rounded-full shadow-stamp p-1 mb-10">
          <button
            onClick={() => setMode("legacy")}
            className={[
              "inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-250 ease-spring",
              mode === "legacy"
                ? "bg-coral text-cream shadow-[2px_2px_0_0_#241C15]"
                : "text-ink/55 hover:text-ink",
            ].join(" ")}
          >
            <History className="w-3.5 h-3.5" strokeWidth={2.5} />
            2016 老管线
          </button>
          <button
            onClick={() => setMode("llm")}
            className={[
              "inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-250 ease-spring",
              mode === "llm"
                ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                : "text-ink/55 hover:text-ink",
            ].join(" ")}
          >
            <Zap className="w-3.5 h-3.5" strokeWidth={2.5} />
            2026 LLM 一步
          </button>
        </div>

        {/* pipeline 横排 */}
        <div
          key={mode}
          className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8 mb-8 animate-enter-fade"
        >
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                {mode === "legacy" ? "legacy · 2016" : "modern · 2026"}
              </div>
              <div className="font-display font-extrabold text-[22px] text-ink">
                {steps.length} 步 · {mode === "legacy" ? "~ 300 ms + 6 个组件" : "~ 1.5 s · 1 个 API call"}
              </div>
            </div>
            <div
              className={[
                "inline-flex items-center gap-1 px-3 py-1 rounded-full border-2 border-ink font-mono text-[11px] font-bold",
                mode === "legacy" ? "bg-coral text-cream" : "bg-butter text-ink",
              ].join(" ")}
            >
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
              {mode === "legacy" ? "F1 ≈ 0.83" : "F1 ≈ 0.91 zero-shot"}
            </div>
          </div>

          {/* 节点条 */}
          <div className="relative">
            {/* 横线 */}
            <div
              className="absolute left-6 right-6 top-[28px] h-[2px] bg-ink/30"
              aria-hidden
            />
            <div
              className={
                mode === "legacy"
                  ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative"
                  : "grid grid-cols-1 sm:grid-cols-2 gap-6 relative max-w-2xl"
              }
            >
              {steps.map((s, i) => {
                const hovered = hoverIdx === i;
                return (
                  <div
                    key={s.num + s.name}
                    className="flex flex-col items-center text-center"
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                  >
                    <div
                      className={[
                        "relative z-10 w-14 h-14 rounded-full border-2 border-ink flex items-center justify-center font-mono font-extrabold text-[14px] mb-3 transition-all duration-300 ease-spring",
                        TONE_BG[s.tone],
                        TONE_TEXT[s.tone],
                        hovered
                          ? "shadow-stamp-lg -translate-y-1 scale-105"
                          : "shadow-stamp",
                      ].join(" ")}
                    >
                      {s.num}
                    </div>
                    <div className="font-display font-extrabold text-[13.5px] text-ink leading-tight mb-1">
                      {s.name}
                    </div>
                    <div className="font-sans text-[11.5px] text-ink/60 leading-snug min-h-[42px] px-1">
                      {s.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* output 行 */}
          <div className="mt-8 pt-5 border-t border-ink/15 grid sm:grid-cols-2 gap-4 text-[13px]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink/45 mb-1">
                output · 翻译
              </div>
              <div className="font-serif italic text-ink/85">
                "This headphone's noise cancellation is unreal — like wearing a mute button on the subway. But the charging case feels cheap for the price."
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink/45 mb-1">
                output · 情感分
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-[28px] text-ink">3.8</span>
                <span className="font-mono text-[11px] text-ink/55">/ 5（混合正负）</span>
              </div>
            </div>
          </div>
        </div>

        {/* 三张对照小卡 */}
        <div className="grid md:grid-cols-3 gap-4">
          <Stat
            label="工程文件数"
            legacy="6 个独立模型"
            llm="1 行 API call"
            tone="coral"
          />
          <Stat
            label="标注数据量"
            legacy="每任务 5–10 万条"
            llm="0（zero-shot）"
            tone="teal"
          />
          <Stat
            label="新加一种任务"
            legacy="再训一个分类头"
            llm="改 prompt 而已"
            tone="butter"
          />
        </div>

        {/* 灰底注脚 */}
        <p className="mt-8 font-mono text-[10.5px] text-ink/45 leading-relaxed max-w-3xl">
          数据来源：BERT-base SST-2 fine-tuned 94.7%（GLUE 官方）；GPT-4 zero-shot SST-2 95.3%。 任务越窄、标注越多，fine-tuned BERT 仍能反超 —— 见下一章对照。
        </p>
      </div>
    </section>
  );
};

const Stat: React.FC<{
  label: string;
  legacy: string;
  llm: string;
  tone: "coral" | "teal" | "butter";
}> = ({ label, legacy, llm, tone }) => {
  const toneBg =
    tone === "coral"
      ? "bg-coral"
      : tone === "teal"
        ? "bg-teal"
        : "bg-butter";
  const toneText =
    tone === "butter" ? "text-ink" : "text-cream";
  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">
        {label}
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-[10px] text-ink/45 uppercase tracking-wider">
            2016
          </span>
          <span className="font-sans font-bold text-[13.5px] text-ink/70">
            {legacy}
          </span>
        </div>
        <div
          className={[
            "flex items-baseline justify-between gap-2 px-3 py-2 rounded-lg",
            toneBg,
          ].join(" ")}
        >
          <span
            className={[
              "font-mono text-[10px] uppercase tracking-wider",
              toneText,
              "opacity-80",
            ].join(" ")}
          >
            2026
          </span>
          <span
            className={[
              "font-sans font-extrabold text-[13.5px]",
              toneText,
            ].join(" ")}
          >
            {llm}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionPipelineDiff;
