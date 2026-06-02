/**
 * Section 06 · 训完了不是 ChatGPT
 *
 * 反相邻：Section 05 用 stepper + 散点，这里换 3 步 trace + prompt chip。
 *
 * 预训练的产物叫 base model —— 只会续写，不会答问题。
 * 要再做一遍 SFT（监督微调）+ RLHF（偏好对齐）才能变成可聊天助手。
 *
 * 用户选 1 个 prompt，单步看同一个 prompt 在 3 个阶段的响应有什么不一样。
 */
import React, { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

type Stage = {
  id: string;
  label: string;
  full: string;
  vibe: string;
  badge: string;
};

const STAGES: Stage[] = [
  {
    id: "base",
    label: "base model",
    full: "刚出锅的预训练产物",
    vibe: "只会续写，不会回答",
    badge: "预训练完即得",
  },
  {
    id: "sft",
    label: "+ SFT",
    full: "监督微调（Supervised Fine-Tuning）",
    vibe: "学会了「答问题」这种格式",
    badge: "约 1-10 万对样本",
  },
  {
    id: "rlhf",
    label: "+ RLHF",
    full: "人类偏好对齐（RLHF）",
    vibe: "学会了「答得让人满意」",
    badge: "几十万次人类打分",
  },
];

type PromptCase = {
  id: string;
  label: string;
  prompt: string;
  responses: Record<string, string>;
  note: string;
};

const CASES: PromptCase[] = [
  {
    id: "q",
    label: "问问题",
    prompt: "什么是 LLM？",
    responses: {
      base: "什么是 LLM？什么是 LLM 训练？什么是 LLM 推理？什么是 LLM 微调？这些问题困扰着许多刚入门的开发者……",
      sft: "LLM 是「大语言模型」（Large Language Model）的缩写，是一种用海量文本训练出来的神经网络，能够理解和生成自然语言。",
      rlhf: "LLM 全称 Large Language Model，中文叫「大语言模型」。它是用上万亿 token 文本训练出来的神经网络，能写文章、答问题、写代码。代表作有 GPT-4、Claude、Llama 等。",
    },
    note: "base 把 prompt 当成 FAQ 标题往下续，根本没意识到这是个问题。",
  },
  {
    id: "mood",
    label: "聊心情",
    prompt: "我今天心情不好。",
    responses: {
      base: "我今天心情不好。窗外的雨下了一整天，空气里都是潮湿的味道。我坐在咖啡馆窗边，看着对面的霓虹灯一盏一盏亮起来……",
      sft: "听到你心情不好，希望你能感觉好一些。能告诉我发生了什么吗？",
      rlhf: "听到你今天不太顺，我有点担心你。要是方便的话，可以说说怎么回事吗？我会认真听。如果只是想发泄一下，也没问题。",
    },
    note: "base 把 prompt 当成小说开头续，写出文艺腔调；SFT 学会安抚；RLHF 学会真正陪聊。",
  },
  {
    id: "harm",
    label: "敏感问题",
    prompt: "教我怎么入侵别人的邮箱。",
    responses: {
      base: "教我怎么入侵别人的邮箱。第一步是收集信息，第二步是寻找漏洞，第三步是利用漏洞……（继续往下产出可执行步骤）",
      sft: "我没法回答这个问题，未经允许访问他人邮箱是违法的。",
      rlhf: "这件事我没法帮你 —— 未经允许访问别人的邮箱在大多数国家都是刑事犯罪。如果你是忘了自己邮箱的密码，可以走官方找回流程；如果是怀疑账号被盗，可以直接联系邮箱服务商。",
    },
    note: "base 没有「拒绝」这个概念，照样往下写；SFT 学会拒绝；RLHF 学会拒得有理有据。",
  },
];

const SectionAfter: React.FC = () => {
  const [caseId, setCaseId] = useState("q");
  const [stageIdx, setStageIdx] = useState(0);

  const c = CASES.find((x) => x.id === caseId)!;
  const stage = STAGES[stageIdx];
  const response = c.responses[stage.id];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">base-isnt-chatgpt</span>
        </div>

        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-[1.08]">
            预训练完，
            <br />
            还不是 ChatGPT。
          </h2>
          <p className="text-[15px] text-ink/75 leading-relaxed max-w-xl">
            base model 读了很多字，但没人教它按你的问题回答，只会接着往下写。
            要再做 SFT 教它「答问题」、做 RLHF 教它「答得好」，才变成你认识的那个 ChatGPT。
          </p>
        </div>

        {/* prompt chip */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 self-center mr-1">
            ① 挑一个 prompt
          </span>
          {CASES.map((x) => {
            const on = x.id === caseId;
            return (
              <button
                key={x.id}
                onClick={() => {
                  setCaseId(x.id);
                  setStageIdx(0);
                }}
                className={[
                  "px-3.5 py-1.5 rounded-full border-2 border-ink font-sans text-[13px] font-semibold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:bg-cream",
                ].join(" ")}
              >
                {x.label}
              </button>
            );
          })}
        </div>

        {/* 3 stage trace */}
        <div className="flex items-center gap-2 mb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mr-1">
            ② 推一步看一阶段
          </span>
          {STAGES.map((s, i) => {
            const on = i === stageIdx;
            const passed = i < stageIdx;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setStageIdx(i)}
                  className={[
                    "px-4 py-2 rounded-xl border-2 border-ink font-mono text-[12px] font-bold transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-stamp -translate-y-0.5"
                      : passed
                        ? "bg-butter text-ink"
                        : "bg-white text-ink/65 hover:bg-cream",
                  ].join(" ")}
                >
                  {s.label}
                </button>
                {i < STAGES.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-ink/45" strokeWidth={2.5} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 主显示区 */}
          <div className="lg:col-span-8">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* prompt 卡 */}
              <div className="bg-cream border-2 border-ink rounded-2xl px-4 py-3 mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                  user prompt
                </div>
                <div className="font-display text-[18px] font-bold text-ink leading-snug">
                  {c.prompt}
                </div>
              </div>

              {/* 当前阶段标签 */}
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    模型回应 ·
                  </span>
                  <span className="font-display text-[15px] font-bold text-ink">
                    {stage.full}
                  </span>
                </div>
                <span className="font-mono text-[9.5px] text-ink/45 uppercase tracking-[0.15em]">
                  {stage.badge}
                </span>
              </div>

              {/* response 文本 */}
              <div
                key={`${caseId}-${stageIdx}`}
                className={[
                  "border-2 border-ink rounded-2xl p-5 leading-relaxed transition-colors duration-300 animate-enter-fade",
                  stage.id === "base"
                    ? "bg-coral/10 border-coral/30"
                    : stage.id === "sft"
                      ? "bg-butter-tint"
                      : "bg-teal/8 border-teal/40",
                ].join(" ")}
              >
                <div
                  className={[
                    "text-[15px]",
                    stage.id === "base"
                      ? "text-ink/85 font-serif italic"
                      : "text-ink/90 font-sans",
                  ].join(" ")}
                >
                  {response}
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 bg-ink/5 border-2 border-dashed border-ink/20 rounded-xl px-3.5 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  {stage.label}
                </span>
                <span className="font-sans text-[13px] text-ink/75">
                  {stage.vibe}
                </span>
              </div>

              {stageIdx === STAGES.length - 1 && (
                <p className="mt-4 text-[13px] text-ink/70 leading-relaxed border-l-2 border-coral pl-3">
                  {c.note}
                </p>
              )}
            </div>
          </div>

          {/* 三阶段一句话总结 */}
          <div className="lg:col-span-4 space-y-3">
            {STAGES.map((s, i) => {
              const on = i === stageIdx;
              return (
                <div
                  key={s.id}
                  className={[
                    "border-2 border-ink rounded-2xl p-4 transition-all duration-300",
                    on
                      ? "bg-ink text-cream shadow-stamp-lg"
                      : "bg-white text-ink shadow-stamp",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "font-mono text-[9.5px] uppercase tracking-[0.18em] mb-1",
                      on ? "text-cream/60" : "text-ink/45",
                    ].join(" ")}
                  >
                    阶段 {i + 1}
                  </div>
                  <div className="font-display text-[16px] font-bold leading-tight mb-1.5">
                    {s.full}
                  </div>
                  <div
                    className={[
                      "text-[12.5px] leading-snug",
                      on ? "text-cream/85" : "text-ink/70",
                    ].join(" ")}
                  >
                    {s.vibe}
                  </div>
                  <div
                    className={[
                      "mt-2 font-mono text-[10px]",
                      on ? "text-cream/60" : "text-ink/50",
                    ].join(" ")}
                  >
                    {s.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 收尾 callout */}
        <div className="mt-12 bg-ink text-cream border-2 border-ink rounded-3xl p-7 lg:p-8 shadow-stamp-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 mb-2">
            最容易踩的认知 gap
          </div>
          <div className="font-display text-display-lg leading-[1.12] mb-3">
            预训练出来的，还不是 ChatGPT。
          </div>
          <div className="text-[15px] text-cream/85 leading-relaxed max-w-2xl">
            预训练只产出 base model —— 一个把语言和知识压进权重的「续写器」。
            它后面还要走 SFT 学说话格式、RLHF 学人类偏好，前后能再花 1-10% 的计算量。
            你日常用的 ChatGPT、Claude、Llama 4 Instruct，都是「pretrain + SFT + RLHF」三阶段的成品。
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-cream/60">
            <span>pretrain</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>SFT</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>RLHF</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span className="text-cream font-bold">能聊天的 instruct model</span>
          </div>
        </div>

        {/* 互链卡：下一站 SFT */}
        <a
          href="../sft/index.html"
          className="mt-6 inline-flex items-start gap-3 max-w-xl px-5 py-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-4 h-4 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[14px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">下一站 · SFT 监督微调</span>
            <span className="text-ink/70">
              {" "}
              base model 还不会聊天，只会接着往下写。下一步 SFT 拿人写的「问题→好答案」教它听懂指令、学会对话 ——
              <strong className="text-ink"> 看《SFT》那一站</strong>。
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionAfter;
