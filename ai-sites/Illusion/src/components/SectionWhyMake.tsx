/**
 * Section 02 · 为什么 LLM 一本正经地编
 *
 * 反直觉钩子在这里揭开（不放 Hero）：GPT-5.5 在 AA-Omniscience 上 86% 答错，
 * 因为它最敢答。然后 4 个机制 accordion，挨个解释「编」是从哪冒出来的。
 *
 * 交互：左边一个 stat 大字 + 来源；右边 4 行 accordion，点开看机制 + 小示意图。
 */
import React, { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

type Cause = {
  id: string;
  title: string;
  short: string;
  detail: string;
  illust: React.ReactNode;
};

/* 概率分布小条 · 用于"必须答"机制：展示「我不知道」从未被采样 */
const ProbBarsTraining: React.FC = () => (
  <svg viewBox="0 0 220 110" className="w-full h-auto" aria-hidden>
    <text x="6" y="14" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
      SFT 训练阶段的 next-token 概率
    </text>
    {[
      { y: 28, label: "梅西", w: 132, on: true },
      { y: 46, label: "C 罗", w: 70, on: false },
      { y: 64, label: "我不知道", w: 6, on: false, ghost: true },
      { y: 82, label: "随便编一个", w: 92, on: false },
    ].map((b) => (
      <g key={b.label}>
        <text x="6" y={b.y + 9} fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15">
          {b.label}
        </text>
        <rect
          x="68"
          y={b.y}
          width={b.w}
          height="11"
          fill={b.on ? "#E07A5F" : b.ghost ? "#FBEFE3" : "#241C15"}
          stroke="#241C15"
          strokeWidth={b.ghost ? "1.2" : "0"}
          strokeDasharray={b.ghost ? "2 2" : ""}
          opacity={b.on ? 1 : b.ghost ? 1 : 0.5}
        />
        {b.ghost && (
          <text
            x="76"
            y={b.y + 9}
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fill="#88837C"
            fontStyle="italic"
          >
            从来没在训练集里出现过
          </text>
        )}
      </g>
    ))}
    <text x="6" y="105" fontFamily="Geist Mono, monospace" fontSize="8" fill="#88837C">
      SFT 数据全是"问 → 答"，模型学到「碰到问题就给个 token」
    </text>
  </svg>
);

/* RLHF 让模型更自信 · 概率分布尖锐化 */
const PreRLHF: React.FC = () => (
  <svg viewBox="0 0 220 110" className="w-full h-auto" aria-hidden>
    <text x="6" y="14" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
      RLHF 前后 · top-1 token 的置信度
    </text>
    {/* 平缓的分布 */}
    <g>
      <text x="6" y="40" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15">
        前
      </text>
      <path
        d="M 28 65 Q 48 45 68 50 Q 88 55 108 48 Q 128 42 148 52 Q 168 60 188 55"
        stroke="#241C15"
        strokeWidth="1.6"
        fill="none"
      />
      <text x="195" y="58" fontFamily="Geist Mono, monospace" fontSize="8" fill="#88837C">
        平
      </text>
    </g>
    {/* 锐的分布 */}
    <g>
      <text x="6" y="92" fontFamily="Geist Mono, monospace" fontSize="9" fill="#E07A5F">
        后
      </text>
      <path
        d="M 28 100 L 78 100 L 88 70 L 100 70 L 108 100 L 188 100"
        stroke="#E07A5F"
        strokeWidth="1.8"
        fill="none"
      />
      <text x="195" y="92" fontFamily="Geist Mono, monospace" fontSize="8" fill="#E07A5F">
        尖
      </text>
    </g>
    <text x="6" y="104" fontFamily="Geist Mono, monospace" fontSize="8" fill="#88837C">
      被人偏好「干脆答」奖励 → 错也答得很自信
    </text>
  </svg>
);

/* 长 context 注意力分布 · lost-in-the-middle */
const LostMiddle: React.FC = () => (
  <svg viewBox="0 0 220 110" className="w-full h-auto" aria-hidden>
    <text x="6" y="14" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
      32k context · 注意力强度分布
    </text>
    <path
      d="M 12 80 Q 30 30 50 55 Q 110 100 170 55 Q 190 30 208 80"
      stroke="#E07A5F"
      strokeWidth="2"
      fill="#E07A5F"
      fillOpacity="0.12"
    />
    <line x1="12" y1="92" x2="208" y2="92" stroke="#241C15" strokeWidth="1.2" />
    <text x="14" y="103" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">
      开头
    </text>
    <text x="98" y="103" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">
      中段（盲区）
    </text>
    <text x="178" y="103" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">
      结尾
    </text>
    <g transform="translate(108,68)">
      <rect x="-22" y="-7" width="44" height="14" rx="3" fill="#241C15" />
      <text
        x="0"
        y="3"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fontWeight="700"
        fill="#F4D35E"
      >
        看不见
      </text>
    </g>
  </svg>
);

/* 训练数据本身就错 / 过时 · 三个"事实"在三个时间点对错不同 */
const StaleData: React.FC = () => (
  <svg viewBox="0 0 220 110" className="w-full h-auto" aria-hidden>
    <text x="6" y="14" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
      训练数据 cutoff · 知识有保质期
    </text>
    <line x1="20" y1="58" x2="200" y2="58" stroke="#241C15" strokeWidth="1.6" />
    {[
      { x: 30, label: "2023" },
      { x: 100, label: "cutoff" },
      { x: 170, label: "2026 现在" },
    ].map((p) => (
      <g key={p.label} transform={`translate(${p.x},58)`}>
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#241C15" strokeWidth="1.4" />
        <text
          y="18"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fill="#241C15"
        >
          {p.label}
        </text>
      </g>
    ))}
    <g transform="translate(30,40)">
      <text textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8.5" fill="#241C15">
        英国首相 = Rishi
      </text>
      <text y="-12" textAnchor="middle" fontSize="11" fill="#1B4B5A">
        ✓
      </text>
    </g>
    <g transform="translate(170,40)">
      <text textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8.5" fill="#E07A5F">
        英国首相 = Rishi
      </text>
      <text y="-12" textAnchor="middle" fontSize="11" fill="#E07A5F">
        ✗
      </text>
    </g>
    <text x="6" y="103" fontFamily="Geist Mono, monospace" fontSize="8" fill="#88837C">
      模型记得的世界停在 cutoff 那天，再往后的事它只能猜
    </text>
  </svg>
);

const CAUSES: Cause[] = [
  {
    id: "must-answer",
    title: "SFT 教它「必须答」",
    short: "训练样本全是「问 → 答」，没人示范「不会就说不会」",
    detail:
      "SFT（指令微调）阶段，每条样本都是漂亮的问答对。模型从来没见过「我不知道」作为一个合法回答出现。久而久之它学到的规则就是：碰到问题，挑下一个最可能的 token 写下去。\n\n所以哪怕它对答案完全没把握，它也会编一个看着合理的答案 —— 因为「不回答」对它来说从来不是选项。",
    illust: <ProbBarsTraining />,
  },
  {
    id: "rlhf",
    title: "RLHF 让它更敢、更顺",
    short: "人类偏好「干脆利落的答」，模型学会把不确定塞进自信的语气里",
    detail:
      "RLHF 阶段，标注员对比两份回答，倾向选更确定、更干脆的那份。模型把这个偏好内化为：哪怕错，也要答得自信。\n\n2026 年 4 月 OpenAI 公开的 AA-Omniscience 评测里，GPT-5.5 整体准确率 57% 是史上最高，但当它不知道答案时，它选择编的概率也是史上最高 —— 86%（CometAPI 2026/04）。Claude Opus 4.7 同维度只有 36%，因为它更愿意拒答。",
    illust: <PreRLHF />,
  },
  {
    id: "lost-middle",
    title: "长 context 中间看不见",
    short: "32k / 200k context 里，模型注意力集中在头尾，中段细节会漏",
    detail:
      "Stanford 2023 「Lost in the Middle」实验把同一份关键信息放在 prompt 的不同位置，发现放在开头/结尾时模型答对率 75%+，放在中间时跌到 50% 上下。\n\n后果就是：你给它一份 50 页的合同，它能很自信地概括出「第 7 条规定…」，但那条根本不在合同里 —— 它根本没读到那里，它在脑补一个合理的第 7 条。",
    illust: <LostMiddle />,
  },
  {
    id: "stale",
    title: "训练数据 cutoff 之后的世界，它在编",
    short: "知识有保质期。问它今天的事，它答的是 cutoff 那天的世界",
    detail:
      "每个模型都有训练数据 cutoff 日期。Cutoff 之后发生的事（新模型发布、新闻、新人事任命、新论文），它一概不知道，但它不会承认 —— 它会基于已有知识「合理推测」一个版本。\n\n推测出来的内容看着仍然像真知识：人名、日期、数字、引用都齐全。但任何一个都查不到。",
    illust: <StaleData />,
  },
];

const SectionWhyMake: React.FC = () => {
  const [open, setOpen] = useState<string>("must-answer");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        {/* 段标 */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">why · 病因学</span>
        </div>

        {/* 反直觉钩子 · 大字 stat */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10 lg:mb-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-tight">
              它答错的时候，<br />
              通常正是它最
              <span className="relative inline-block ml-2">
                <span className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-pop/70 -z-0" aria-hidden />
                <span className="relative z-10">自信</span>
              </span>
              的时候。
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-ink/75 leading-relaxed">
              业内对幻觉的研究指向同一件事：它写错，
              往往是因为不知道可以回答「我不知道」。
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-2">
                AA-Omniscience · 2026-04
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-[60px] lg:text-[72px] font-bold text-pop leading-none tabular-nums">
                  86<span className="text-[36px]">%</span>
                </span>
              </div>
              <p className="text-[14px] text-cream/90 leading-relaxed mb-3">
                GPT-5.5 在不知道答案时，依然选择编一个答案的概率。
              </p>
              <div className="pt-3 border-t border-cream/15 grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <div className="text-cream/55 font-mono text-[10px] uppercase tracking-[0.18em] mb-0.5">
                    Claude Opus 4.7
                  </div>
                  <div className="font-display font-bold text-[20px] text-teal">36%</div>
                </div>
                <div>
                  <div className="text-cream/55 font-mono text-[10px] uppercase tracking-[0.18em] mb-0.5">
                    Gemini 3.1 Pro
                  </div>
                  <div className="font-display font-bold text-[20px] text-butter">50%</div>
                </div>
              </div>
              <p className="mt-3 font-mono text-[9.5px] text-cream/40 leading-snug">
                CometAPI 2026/04 · AA-Omniscience benchmark
              </p>
            </div>
          </div>
        </div>

        {/* accordion 前总述 */}
        <p className="max-w-3xl text-[15px] text-ink/75 leading-relaxed mb-6">
          训练时只教它答、不教它拒答，人类又奖励它答得干脆 —— 所以越自信越可能编。
          下面 4 个机制，一个一个看「编」是从哪冒出来的。
        </p>

        {/* 4 个 accordion */}
        <div className="space-y-3">
          {CAUSES.map((c, i) => {
            const isOpen = open === c.id;
            return (
              <div
                key={c.id}
                className={[
                  "border-2 border-ink rounded-2xl bg-white overflow-hidden transition-shadow duration-300",
                  isOpen ? "shadow-stamp-lg" : "shadow-stamp",
                ].join(" ")}
              >
                <button
                  onClick={() => setOpen(isOpen ? "" : c.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-butter-tint transition-colors"
                >
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center bg-butter border-2 border-ink rounded-full font-mono text-[11px] font-bold">
                    0{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-[17px] lg:text-[18px] text-ink leading-tight">
                      {c.title}
                    </div>
                    <div className="mt-0.5 text-[13px] text-ink/65 leading-snug">
                      {c.short}
                    </div>
                  </div>
                  <ChevronDown
                    className={[
                      "w-5 h-5 shrink-0 text-ink transition-transform duration-300",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                    strokeWidth={2.5}
                  />
                </button>

                {isOpen && (
                  <div className="grid md:grid-cols-5 gap-4 lg:gap-6 px-5 pb-5 pt-1 border-t-2 border-ink/10">
                    <div className="md:col-span-3 text-[14px] text-ink/80 leading-relaxed space-y-3 pt-3">
                      {c.detail.split("\n\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                    <div className="md:col-span-2 bg-cream border-2 border-ink rounded-xl p-3.5">
                      {c.illust}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 互链卡：memory 分锅 —— 记错被当真话讲是另一种病 */}
        <a
          href="../agent-memory/index.html"
          className="mt-6 inline-flex items-start gap-3 max-w-3xl px-4 py-3.5 bg-white border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-butter border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">这里讲的是「不知道也硬编」。</span>
            <span className="text-ink/70">
              {" "}
              还有一种很像的毛病：记忆系统里事实过期、漂移，让你听到「很自信的错误」——
              那是记错被当真话讲，另算一种病，见《Agent 记忆》。
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionWhyMake;
