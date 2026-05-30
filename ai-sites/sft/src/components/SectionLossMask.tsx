/**
 * Section 03 · Loss mask · 哪些 token 才该让模型学
 *
 * SFT 训练时一个 catch：完整序列里只有 assistant 那部分该算 loss，
 * 其它（system / user）的位置 label 设成 -100，cross-entropy 直接跳过。
 *
 * 交互（L4 + 视觉锚）：用户点 token 切换"算 loss / 不算 loss"，
 * 错点位置就翻车，正确标完出现 ✓ 通关。让用户当一回数据工程师。
 */
import React, { useState } from "react";
import { Check, AlertTriangle } from "lucide-react";

/* 一个简化的 ChatML 序列，已经按"块"切好。
   should = true 表示这块应该算 loss（assistant 输出 + 它的结束 token）。 */
type Block = {
  text: string;
  should: boolean;
  /** 显示用：special / system / user / asst */
  kind: "special" | "sys" | "user" | "asst";
  /** 注释 */
  note: string;
};

const TOKENS: Block[] = [
  { text: "<|im_start|>", kind: "special", should: false, note: "turn 起始符" },
  { text: "system", kind: "sys", should: false, note: "角色名" },
  { text: "你是简洁助手。", kind: "sys", should: false, note: "system 提示" },
  { text: "<|im_end|>", kind: "special", should: false, note: "turn 结束符" },
  { text: "<|im_start|>", kind: "special", should: false, note: "turn 起始符" },
  { text: "user", kind: "user", should: false, note: "角色名" },
  { text: "员工年假怎么算？", kind: "user", should: false, note: "user 提问" },
  { text: "<|im_end|>", kind: "special", should: false, note: "turn 结束符" },
  { text: "<|im_start|>", kind: "special", should: false, note: "turn 起始符" },
  { text: "assistant", kind: "asst", should: false, note: "角色名 · 不算 loss" },
  { text: "入职满 1 年起，每年 5 天。", kind: "asst", should: true, note: "★ 这才是模型要学着输出的" },
  { text: "<|im_end|>", kind: "special", should: true, note: "★ 学会在这里停下来" },
];

const SectionLossMask: React.FC = () => {
  /* 每个 block 的状态：on = 用户标了"算 loss" */
  const [marks, setMarks] = useState<boolean[]>(() => TOKENS.map(() => false));
  const [revealed, setRevealed] = useState(false);

  const toggle = (i: number) => {
    setMarks((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const correct = marks.every((m, i) => m === TOKENS[i].should);
  const trainedTokens = marks.filter(Boolean).length;
  const idealTokens = TOKENS.filter((t) => t.should).length;

  /* 错误统计 */
  const wrongOver = marks.filter((m, i) => m && !TOKENS[i].should).length;
  const wrongMiss = marks.filter((m, i) => !m && TOKENS[i].should).length;

  const reset = () => {
    setMarks(TOKENS.map(() => false));
    setRevealed(false);
  };
  const showAnswer = () => {
    setMarks(TOKENS.map((t) => t.should));
    setRevealed(true);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-butter-tint/40">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">LOSS MASK</span>
        </div>

        <h2 className="font-display text-display-lg mb-3">
          没有 loss mask 的 SFT 是垃圾 SFT
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-2">
          模型默认会对每个 token 都算一遍 loss，意思就是「你要学会从头到尾输出整段，包括用户的提问」。这显然是在浪费算力 —— 用户已经把提问敲进来了，模型不需要学会再写一遍。
        </p>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          做法：把 user / system 那些 token 的 label 设成 <code className="font-mono bg-cream px-1 rounded border border-ink/20">-100</code>，PyTorch 的 cross-entropy 自动跳过它们。下面这条序列，<strong>你来点哪些 token 该算 loss</strong>，对了就通关。
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 主交互区 */}
          <div className="lg:col-span-2 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5">
            <div className="flex items-baseline justify-between mb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                点击下面的 token 块切换 · 灰 = 跳过 · 亮 = 算 loss
              </div>
              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="px-2.5 py-1 bg-white border-2 border-ink rounded-md font-mono text-[10.5px] font-semibold hover:bg-cream transition-colors"
                >
                  重来
                </button>
                <button
                  onClick={showAnswer}
                  className="px-2.5 py-1 bg-butter border-2 border-ink rounded-md font-mono text-[10.5px] font-semibold hover:shadow-stamp transition-all"
                >
                  看答案
                </button>
              </div>
            </div>

            {/* token 块组 */}
            <div className="bg-cream rounded-xl border-2 border-ink p-3.5 flex flex-wrap gap-1.5">
              {TOKENS.map((b, i) => {
                const on = marks[i];
                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className={[
                      "group relative px-2 py-1 rounded-md border-2 font-mono text-[11.5px] transition-all duration-200 ease-spring",
                      on
                        ? b.should
                          ? "bg-butter border-ink text-ink shadow-[2px_2px_0_0_#241C15] font-bold"
                          : "bg-pop text-white border-ink shadow-[2px_2px_0_0_#241C15]"
                        : b.should && revealed
                        ? "bg-white border-pop border-dashed text-ink/45"
                        : "bg-white border-ink/35 text-ink/45 hover:border-ink hover:text-ink",
                    ].join(" ")}
                    title={b.note}
                  >
                    {b.text}
                  </button>
                );
              })}
            </div>

            {/* 状态条 */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Stat
                label="标了算 loss"
                value={`${trainedTokens} / ${TOKENS.length}`}
              />
              <Stat
                label="应该算 loss"
                value={`${idealTokens} / ${TOKENS.length}`}
                emph
              />
              <Stat
                label="错了几处"
                value={`${wrongOver + wrongMiss}`}
                bad={wrongOver + wrongMiss > 0}
              />
            </div>

            {/* 通关 banner */}
            {correct && (
              <div className="mt-4 p-3 bg-teal text-cream border-2 border-ink rounded-xl flex items-center gap-2 animate-enter-pop">
                <Check className="w-4 h-4" strokeWidth={3} />
                <span className="font-mono text-[12.5px] font-bold">
                  对了！只在 assistant 段算 loss，其余跳过。这就是 SFT 数据准备的全部秘密。
                </span>
              </div>
            )}
            {!correct && (wrongOver > 0 || wrongMiss > 0) && (
              <div className="mt-4 p-3 bg-pop/10 border-2 border-pop rounded-xl flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-pop mt-0.5" strokeWidth={2.5} />
                <div>
                  {wrongOver > 0 && (
                    <p className="font-mono text-[11.5px] text-ink">
                      多选了 {wrongOver} 处 —— 这些位置算 loss 会让模型学会「重写一遍用户的话」。
                    </p>
                  )}
                  {wrongMiss > 0 && (
                    <p className="font-mono text-[11.5px] text-ink">
                      漏选了 {wrongMiss} 处 —— 这些是模型该学输出的内容。
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 右：原理说明 */}
          <div className="space-y-4">
            <div className="bg-white border-2 border-ink rounded-2xl p-5 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-2">
                Why · 为什么这样做
              </div>
              <ul className="space-y-2.5 text-[13px] text-ink/80 leading-relaxed">
                <li>
                  <strong>省算力</strong> ·
                  prompt 部分有时占整段 80%。算 loss 等于浪费一大半梯度更新。
                </li>
                <li>
                  <strong>防错学</strong> ·
                  如果在 user 上算 loss，模型会学到「听到这个提问要回答它 + 同时再写一遍这个提问」，输出错乱。
                </li>
                <li>
                  <strong>专心学回答</strong> ·
                  SFT 的目的是教格式和风格，所有梯度都集中在「应该说什么」上。
                </li>
              </ul>
            </div>

            <div className="bg-ink text-cream border-2 border-ink rounded-2xl p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-2">
                实现 · TRL 一行搞定
              </div>
              <pre className="font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap">{`from trl import (
  SFTTrainer, DataCollator-
  ForCompletionOnlyLM,
)

collator = DataCollator-
  ForCompletionOnlyLM(
  response_template="<|im_start|>assistant\\n",
  tokenizer=tok,
)`}</pre>
              <p className="mt-3 font-mono text-[10px] text-cream/65 leading-relaxed">
                指定 response_template，TRL 帮你把它之前的 token 全设成 -100。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Stat({
  label,
  value,
  emph,
  bad,
}: {
  label: string;
  value: string;
  emph?: boolean;
  bad?: boolean;
}) {
  return (
    <div
      className={[
        "px-3 py-2 border-2 rounded-lg",
        bad
          ? "bg-pop/10 border-pop"
          : emph
          ? "bg-butter-tint border-ink"
          : "bg-cream border-ink/30",
      ].join(" ")}
    >
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">
        {label}
      </div>
      <div className="font-display text-[20px] font-bold text-ink tabular-nums leading-none mt-0.5">
        {value}
      </div>
    </div>
  );
}

export default SectionLossMask;
