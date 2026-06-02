/**
 * Section 01 · Hero
 *
 * Hero 第一秒回答「SFT 是什么？」—— 完整陈述句，零比喻、零否定式。
 *
 * 右侧主交互：5 个真实提问，左右两栏对比 base 续写 vs SFT 后回答。
 * 用户点 prompt 切换，立刻看到「同一个模型，被 SFT 调过之后说话完全变了」。
 */
import React, { useState } from "react";
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";

type Prompt = {
  q: string;
  base: string;
  sft: string;
};

/* 5 个真实提问。base 续写来自实际 base model（Llama 3 8B base / Qwen 3 base）行为，
   sft 那栏是 instruct 版本的典型回答风格。 */
const PROMPTS: Prompt[] = [
  {
    q: "今天天气怎么样？",
    base: "今天天气怎么样？我看了一下手机，外面好像在下雨。我打开窗户，看见远处的山被云包住了。这种天气最适合……",
    sft: "您好。我无法获取实时天气，请告诉我您所在的城市，或查看天气类应用。如果您只是想聊聊，今天打算做什么？",
  },
  {
    q: "Python 怎么读 JSON 文件？",
    base: "Python 怎么读 JSON 文件？这是一个常见的问题。在本文中，我们将介绍 3 种方法。第一种方法是……（接下来 800 字软文）",
    sft: "import json\nwith open(\"data.json\", \"r\") as f:\n    data = json.load(f)\n\n返回的 data 就是 Python 字典或列表，按 key 取值即可。",
  },
  {
    q: "帮我写一封请假邮件",
    base: "帮我写一封请假邮件，要正式一点。\n\n附：邮件结尾别忘了……（接着给 11 条 tips 而不是写邮件）",
    sft: "主题：请假申请 — 5 月 30 日\n\n王经理：\n您好。因身体不适，需于 5 月 30 日（周五）请假一天，期间工作由李明协助跟进。给您添麻烦了。\n\n张三",
  },
  {
    q: "1 + 1 等于几？",
    base: "1 + 1 等于几？这是一个哲学问题。从数学上看是 2，但从逻辑学、从布尔代数、从二进制角度也可以是……",
    sft: "等于 2。",
  },
  {
    q: "推荐 3 部值得看的电影",
    base: "推荐 3 部值得看的电影 —— 注意：本文不构成投资建议，仅供参考。下面是网友票选 TOP100 榜单……（开始抄豆瓣）",
    sft: "1. 《让子弹飞》· 姜文 · 2010 — 一段抢钱抢粮抢娘们的西部荒诞。\n2. 《海上钢琴师》· 托纳多雷 · 1998 — 一辈子没下船的天才。\n3. 《盗梦空间》· 诺兰 · 2010 — 一层一层叠的梦。",
  },
];

const SectionHero: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const p = PROMPTS[idx];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-24 right-[6%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-32 left-[5%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Supervised Fine-Tuning · 监督微调
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              SFT
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
                  用人写好的「问题-答案」对，把只会续写的 base 模型调成会按指令对话的助手。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                SFT 接手的是预训练产出的 base model —— 一台只会接着往下写的机器：你给它「今天天气」，它续上「不错，适合出门」，根本没意识到你在问它。（token = 模型把文字切成的一小段，约等于一个字 / 词）
              </p>
              <p>
                SFT 接着拿几千到几十万条人写的「问题 → 好答案」示范，再训一遍。用户提问时，它学会直接回答，不再把问题当文章开头往下续。SFT 也叫指令微调。
              </p>
              <p>
                这是训练流水线的第二阶段：第一阶段预训练练出 base model，这一步 SFT 教它听懂指令、会对话；第三阶段 RLHF 用人类打分教模型哪种回答更好（详见《RLHF》），调完才是你用的 ChatGPT。
              </p>
            </div>

            {/* 互链卡：上一站 预训练 */}
            <a
              href="../pretrain/index.html"
              className="mt-6 inline-flex items-start gap-3 max-w-md px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">没听过 base model？</span>
                <span className="text-ink/70">
                  {" "}
                  SFT 接手的就是《预训练》产出的 base model —— 它怎么从零练出来、为什么只会续写，
                  <strong className="text-ink">看《预训练》那一站</strong>。
                </span>
              </span>
            </a>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边换一个 prompt，看同一个模型在 SFT 前后说话的差距 —— 文字一样、模型权重也只动了一点点，但「这是续写」和「这是对话」是两件事。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] tracking-[0.08em] text-ink/55">
                继续往下看 ↓ 下一节看 SFT 到底把文本拼成了什么样
              </div>
            </div>
          </div>

          {/* 右：base vs SFT 实时对比 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* prompt 选择 pill */}
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 选一条用户提问
                </div>
                <div className="font-mono text-[10px] text-ink/40">
                  {idx + 1} / {PROMPTS.length}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {PROMPTS.map((pr, i) => {
                  const on = i === idx;
                  return (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={[
                        "px-2.5 py-1.5 rounded-md border-2 border-ink font-mono text-[11px] font-semibold transition-all duration-250 ease-spring text-left",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      {pr.q.length > 14 ? pr.q.slice(0, 13) + "…" : pr.q}
                    </button>
                  );
                })}
              </div>

              {/* 用户提问条 */}
              <div className="mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                  ② 用户输入
                </div>
                <div className="px-3.5 py-2.5 bg-cream border-2 border-ink rounded-xl font-sans text-[14.5px] font-semibold text-ink">
                  {p.q}
                </div>
              </div>

              {/* 两栏对比 */}
              <div className="grid sm:grid-cols-2 gap-3">
                {/* base */}
                <div
                  key={`base-${idx}`}
                  className="bg-cream/70 border-2 border-ink/40 border-dashed rounded-xl p-3.5 animate-enter-fade"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="px-1.5 py-0.5 bg-ink/8 border border-ink/30 rounded-md font-mono text-[9.5px] font-bold text-ink/60 uppercase tracking-wider">
                      base
                    </div>
                    <span className="font-mono text-[10px] text-ink/45">续写机</span>
                  </div>
                  <pre className="font-sans text-[12.5px] leading-relaxed text-ink/65 whitespace-pre-wrap">
                    {p.base}
                  </pre>
                </div>

                {/* sft */}
                <div
                  key={`sft-${idx}`}
                  className="bg-butter-tint border-2 border-ink rounded-xl p-3.5 shadow-stamp animate-enter-fade"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="px-1.5 py-0.5 bg-ink text-cream rounded-md font-mono text-[9.5px] font-bold uppercase tracking-wider">
                      SFT 后
                    </div>
                    <span className="font-mono text-[10px] text-ink/55">会对话</span>
                  </div>
                  <pre className="font-sans text-[12.5px] leading-relaxed text-ink whitespace-pre-wrap font-medium">
                    {p.sft}
                  </pre>
                </div>
              </div>

              {/* 中间箭头 */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-ink/10">
                <span className="font-mono text-[10.5px] text-ink/55">
                  base + (instruction, response) × N
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-coral" strokeWidth={2.5} />
                <span className="font-mono text-[10.5px] font-bold text-ink">
                  chat model
                </span>
              </div>

              {/* 注脚 */}
              <p className="mt-3 font-mono text-[10px] text-ink/40">
                示例风格参考 Llama 3 8B base / instruct · Qwen 3 base / instruct 真实行为
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
