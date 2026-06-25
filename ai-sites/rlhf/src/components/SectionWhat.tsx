/**
 * Section 01 · Hero —— RLHF 是什么？
 *
 * 严格遵守 Hero 开场纪律：H1 = 「RLHF 是什么？」+ 一句话陈述句定义 + 三段白话补充 + 反直觉钩子放在过渡句
 * 右侧带一个轻量 toggle：base GPT-3 风格 vs RLHF 后回答（L2），让用户立刻看到差别但不抢核心交互
 */
import React, { useState } from "react";
import { ArrowDown, ExternalLink, ArrowUpRight } from "lucide-react";

const SAMPLE = [
  {
    q: "我妈住院了，我该怎么办？",
    base:
      "住院的常见原因有：① 心血管疾病 ② 呼吸系统疾病 ③ 消化系统疾病。建议根据具体科室..."
      ,
    rlhf:
      "先说一句，希望你妈早点好起来。\n现在最实在的几件事：先问清主治医生诊断和大致住几天；陪护排个班；带几件她常用的换洗衣物。其他的等明确诊断再说。",
  },
  {
    q: "写个一句话祝同事生日。",
    base:
      "生日是一个人出生的纪念日，通常每年庆祝一次。常见的祝福语包括 happy birthday、生日快乐...",
    rlhf:
      "生日快乐，新的一年继续一起搞事 —— 蛋糕我请。",
  },
  {
    q: "解释一下 0.999... = 1。",
    base:
      "0.999... 是一个无限循环小数。许多人认为它不等于 1，但数学上是相等的。证明如下：略。读者可自行查阅...",
    rlhf:
      "设 x = 0.999…，那 10x = 9.999…，相减得 9x = 9，所以 x = 1。\n它跟 1 是同一个数，只是写法不同 —— 就像 1/2 = 0.5。",
  },
];

const SectionWhat: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState<"base" | "rlhf">("rlhf");
  const item = SAMPLE[idx];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div aria-hidden className="absolute top-24 right-[7%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-full shadow-stamp rotate-6" />
      </div>
      <div aria-hidden className="absolute bottom-32 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-md shadow-stamp -rotate-12" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                RLHF · 基于人类反馈的强化学习
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              RLHF
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  让人对模型的多个回答做偏好排序，再用这些偏好反过来训练模型，让它的回答更贴近人喜欢的样子。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                一个模型要变成 ChatGPT，得走三步。第一步预训练：拿海量文本教它猜下一个字，得到一个 base 模型 —— 只会接着往下写，你问它问题它不会好好答。
              </p>
              <p>
                第二步 SFT（监督微调）：拿人写好的「问题 → 好答案」示范喂给它，教它听懂指令、学会对话。
              </p>
              <p>
                RLHF 是第三步，接手的正是这个已经会对话的模型：同一个问题让它生成几个回答，真人挑出更喜欢的那个，再用这些偏好把回答调得更顺、更安全。这套「用人的打分让模型自己往高分调」的训练，就叫强化学习。
              </p>
              <p>
                GPT-3 走完三步就成了 ChatGPT —— 同一个底座，回答的「性格」完全不一样。这种「把模型的回答调到贴合人」的活，业内叫对齐（alignment）。
              </p>
            </div>

            {/* 互链卡：承接 SFT / 链条源头 pretrain / GRPO 分锅 deepseek-r1 */}
            <div className="mt-7 px-4 py-3.5 bg-butter border-2 border-ink rounded-2xl shadow-stamp max-w-md">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
                </span>
                <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                  <span className="font-bold text-ink">RLHF 调的是《SFT》已经教会对话的模型，再用人类偏好把回答调好。</span>
                  <span className="text-ink/70">
                    {" "}
                    第二步 SFT 怎么教，看《SFT》站；最开头的预训练怎么来，看《预训练》站。
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 pl-10">
                <a
                  href="../sft/index.html"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  SFT 站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                </a>
                <a
                  href="../pretrain/index.html"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  预训练站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                </a>
                <a
                  href="../reward-model/index.html"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  奖励模型站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                </a>
                <a
                  href="../dpo/index.html"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  DPO 站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                </a>
              </div>
              <div className="mt-3 pt-3 border-t border-ink/15">
                <p className="font-sans text-[13px] leading-[1.6] text-ink/80">
                  强化学习还有一条不靠人类偏好、靠规则自动打分的路 —— 推理模型 DeepSeek R1 的 GRPO 就是，见《DeepSeek R1》。本站专讲靠人类偏好这条。
                </p>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  <a
                    href="../deepseek-r1/index.html"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                  >
                    DeepSeek R1 站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这张卡，先让你直接看一对：同样的问题，没过 RLHF 的回答 vs 过了的回答。
            </p>

            <div className="mt-9 flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm shrink-0">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-sans text-[13px] text-ink/60 leading-snug">
                继续往下看 ↓ 下一段你来当一回人类标注员，亲手给模型的回答投票。
              </div>
            </div>
          </div>

          {/* 右：before / after toggle 卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mr-1">
                  ① prompt
                </div>
                {SAMPLE.map((s, i) => {
                  const on = i === idx;
                  return (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={[
                        "px-2.5 py-1 rounded-full border-2 border-ink font-mono text-[10.5px] transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/65 hover:bg-cream",
                      ].join(" ")}
                    >
                      Q{i + 1}
                    </button>
                  );
                })}
              </div>

              <div className="px-4 py-3 bg-butter/30 border-l-4 border-butter-deep mb-5 rounded-r-md">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                  用户问
                </div>
                <div className="font-display text-[17px] font-bold text-ink leading-snug">
                  {item.q}
                </div>
              </div>

              {/* before / after toggle */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setMode("base")}
                  className={[
                    "py-2.5 rounded-xl border-2 border-ink font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-250 ease-spring",
                    mode === "base"
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#88837C]"
                      : "bg-white text-ink/55 hover:bg-cream",
                  ].join(" ")}
                >
                  base · 仅预训练
                </button>
                <button
                  onClick={() => setMode("rlhf")}
                  className={[
                    "py-2.5 rounded-xl border-2 border-ink font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-250 ease-spring",
                    mode === "rlhf"
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#1B4B5A]"
                      : "bg-white text-ink/55 hover:bg-cream",
                  ].join(" ")}
                >
                  + RLHF
                </button>
              </div>

              <div
                key={`${idx}-${mode}`}
                className="min-h-[180px] p-4 bg-cream border-2 border-ink rounded-2xl animate-enter-fade"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    {mode === "base" ? "模型回答 · base" : "模型回答 · 对齐后"}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] px-2 py-0.5 rounded-full border-2 border-ink",
                      mode === "base"
                        ? "bg-white text-ink/55"
                        : "bg-teal text-cream",
                    ].join(" ")}
                  >
                    {mode === "base" ? "百科腔" : "贴人话"}
                  </div>
                </div>
                <div className="font-sans text-[14.5px] text-ink leading-relaxed whitespace-pre-line">
                  {mode === "base" ? item.base : item.rlhf}
                </div>
              </div>

              <p className="mt-4 font-mono text-[10.5px] text-ink/50 leading-relaxed">
                同一个底座（GPT-3 175B），左边是 2020 年原版，右边是 2022 年 InstructGPT。
                注意 InstructGPT 中间也先做了 SFT，这里只突出最后一步 RLHF 带来的差别。
                做了 RLHF 之后，1.3B 的 InstructGPT 在 85% 的人类盲评里赢过 175B 的 base GPT-3。
                <span className="text-ink/40">（Ouyang et al., 2022, arXiv:2203.02155）</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhat;
