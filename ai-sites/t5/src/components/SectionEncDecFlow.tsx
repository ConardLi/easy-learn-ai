/**
 * Section 04 · 「encoder 读完，decoder 一个个 token 写」
 *
 * 反模板：跟 bert SectionTrain（MLM 6 步单步 trace）/ transformer SectionQKV（Q/K/V 6 步）
 * 都不同 ——
 *   ─ 没有 next / prev 按钮
 *   ─ 用户点 decoder 任一目标 token → 看 cross-attention 柱条（哪些源 token 贡献最多）
 *   ─ 同步在 SVG 里画出箭头从 encoder 抽到 decoder
 *   ─ 用户可在 3 个预设句对里切换
 *
 * 这是 L3 交互（点击 + 切预设）+ L1 hover（鼠标飘 decoder token 也能看）。
 */
import React, { useState, useMemo } from "react";

/* 预设三组 source → target，每个 target token 配 cross-attention 概率分布（手挑） */
type Pair = {
  id: string;
  task: string;
  source: string[]; // encoder 输入 token
  target: string[]; // decoder 输出 token
  /** target[i] 对 source 每个 token 的 cross-attention 权重，长度 == source.length */
  attn: number[][];
};

const PAIRS: Pair[] = [
  {
    id: "trans",
    task: "translate English to Chinese:",
    source: ["The", "cat", "sat", "on", "the", "mat", "."],
    target: ["猫", "坐", "在", "垫子", "上", "。"],
    attn: [
      [0.05, 0.78, 0.04, 0.02, 0.03, 0.07, 0.01], // 猫 ← cat
      [0.02, 0.05, 0.82, 0.04, 0.02, 0.04, 0.01], // 坐 ← sat
      [0.02, 0.04, 0.18, 0.62, 0.06, 0.06, 0.02], // 在 ← on
      [0.02, 0.06, 0.02, 0.04, 0.18, 0.66, 0.02], // 垫子 ← mat
      [0.02, 0.04, 0.03, 0.48, 0.08, 0.32, 0.03], // 上 ← on+mat
      [0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.64], // 。← .
    ],
  },
  {
    id: "sum",
    task: "summarize:",
    source: [
      "Google", "released", "the", "T5", "paper", "in", "2019", "proposing",
      "text", "-", "to", "-", "text",
    ],
    target: ["T5", "is", "Google", "'s", "2019", "text", "-", "to", "-", "text", "model", "."],
    attn: [
      [0.04, 0.04, 0.02, 0.78, 0.04, 0.02, 0.02, 0.02, 0.0, 0.0, 0.0, 0.0, 0.02],   // T5
      [0.12, 0.42, 0.04, 0.08, 0.06, 0.04, 0.06, 0.12, 0.02, 0.0, 0.02, 0.0, 0.02], // is
      [0.78, 0.04, 0.02, 0.06, 0.02, 0.02, 0.02, 0.02, 0.0, 0.0, 0.0, 0.0, 0.02],   // Google
      [0.62, 0.06, 0.04, 0.08, 0.04, 0.04, 0.04, 0.02, 0.02, 0.0, 0.02, 0.0, 0.02], // 's
      [0.02, 0.02, 0.02, 0.04, 0.04, 0.08, 0.72, 0.02, 0.02, 0.0, 0.02, 0.0, 0.0],  // 2019
      [0.0, 0.0, 0.0, 0.04, 0.04, 0.0, 0.0, 0.04, 0.74, 0.02, 0.04, 0.02, 0.06],    // text
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.04, 0.06, 0.78, 0.06, 0.04, 0.02],      // -
      [0.0, 0.0, 0.0, 0.04, 0.02, 0.0, 0.0, 0.02, 0.04, 0.0, 0.78, 0.04, 0.06],     // to
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.04, 0.04, 0.04, 0.78, 0.08],      // -
      [0.0, 0.0, 0.0, 0.04, 0.02, 0.0, 0.0, 0.02, 0.04, 0.0, 0.04, 0.04, 0.78],     // text
      [0.04, 0.08, 0.02, 0.18, 0.42, 0.02, 0.02, 0.18, 0.02, 0.0, 0.0, 0.0, 0.02],  // model
      [0.04, 0.04, 0.02, 0.04, 0.62, 0.04, 0.04, 0.04, 0.04, 0.0, 0.04, 0.0, 0.04], // .
    ],
  },
  {
    id: "qa",
    task: "question: who founded Ant? context:",
    source: ["Jack", "Ma", "founded", "Ant", "Group", "in", "Hangzhou", "."],
    target: ["Jack", "Ma"],
    attn: [
      [0.82, 0.06, 0.04, 0.02, 0.02, 0.02, 0.02, 0.0], // Jack
      [0.04, 0.84, 0.04, 0.02, 0.02, 0.02, 0.02, 0.0], // Ma
    ],
  },
];

const SectionEncDecFlow: React.FC = () => {
  const [pairId, setPairId] = useState<string>("trans");
  const [targetIdx, setTargetIdx] = useState<number>(0);

  const pair = PAIRS.find((p) => p.id === pairId)!;
  const attnRow = pair.attn[targetIdx] || [];
  const maxAttn = Math.max(0.001, ...attnRow);

  /* 切预设时重置选中 target */
  const switchPair = (id: string) => {
    setPairId(id);
    setTargetIdx(0);
  };

  /* 找贡献最大的源 token index */
  const topSrcIdx = useMemo(() => {
    let max = -1;
    let idx = 0;
    attnRow.forEach((v, i) => {
      if (v > max) {
        max = v;
        idx = i;
      }
    });
    return idx;
  }, [attnRow]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Cross-attention</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-7">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              encoder 一次读完，
              <br />
              decoder 一个一个吐。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              encoder 双向读源句、做出一组 hidden states 摆着。decoder 自回归一个 token 一个 token 生成，每生成一个就跑一次 cross-attention 看看「该看源句子的哪里」。
            </p>
          </div>
        </div>

        {/* 预设 pill */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PAIRS.map((p) => {
            const on = p.id === pairId;
            return (
              <button
                key={p.id}
                onClick={() => switchPair(p.id)}
                className={[
                  "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11.5px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                    : "bg-white text-ink/65 hover:bg-butter hover:-translate-y-[1px] hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
              >
                {p.task}
              </button>
            );
          })}
        </div>

        {/* 主卡 */}
        <div
          key={pair.id}
          className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8 animate-enter-up"
        >
          {/* encoder 行 */}
          <div className="mb-5">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
                encoder · 源 token（双向 attention · 一次全部读完）
              </div>
              <div className="font-mono text-[10px] text-ink/40">
                高亮 = 当前 decoder token 重点看的位置
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pair.source.map((tk, i) => {
                const w = attnRow[i] || 0;
                const intensity = Math.min(1, w / maxAttn);
                const isTop = i === topSrcIdx && w > 0.1;
                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center"
                    style={{ minWidth: 32 }}
                  >
                    <div
                      className={[
                        "px-2.5 py-2 border-2 rounded-md font-mono text-[12.5px] font-bold transition-all duration-300 ease-spring",
                        isTop
                          ? "border-coral bg-coral text-cream shadow-[3px_3px_0_0_#241C15] -translate-y-0.5"
                          : "border-ink/30 bg-cream text-ink",
                      ].join(" ")}
                      style={{
                        opacity: 0.35 + intensity * 0.65,
                      }}
                    >
                      {tk}
                    </div>
                    {/* 概率柱 */}
                    <div className="mt-1 w-full h-1.5 bg-ink/8 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-coral transition-all duration-300 ease-spring"
                        style={{ width: `${intensity * 100}%` }}
                      />
                    </div>
                    <div className="mt-0.5 font-mono text-[9px] text-ink/45 tabular-nums">
                      {(w * 100).toFixed(0)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 中间：cross-attention 概念条 */}
          <div className="flex items-center gap-2 my-5">
            <div className="flex-1 h-px bg-ink/15" />
            <div className="px-3 py-1 bg-ink text-cream rounded-full font-mono text-[10px] uppercase tracking-[0.2em]">
              cross-attention
            </div>
            <div className="flex-1 h-px bg-ink/15" />
          </div>

          {/* decoder 行（可点击） */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral">
                decoder · 目标 token（点任一个看它怎么看源）
              </div>
              <div className="font-mono text-[10px] text-ink/40">
                因果 mask · 只能看自己左边
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pair.target.map((tk, i) => {
                const on = i === targetIdx;
                return (
                  <button
                    key={i}
                    onClick={() => setTargetIdx(i)}
                    onMouseEnter={() => setTargetIdx(i)}
                    className={[
                      "px-3 py-2 border-2 border-ink rounded-md font-mono text-[12.5px] font-bold transition-all duration-250 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F] -translate-y-0.5"
                        : "bg-white text-ink/75 hover:bg-butter",
                    ].join(" ")}
                  >
                    {tk}
                  </button>
                );
              })}
              <span className="self-center px-2 py-1 ml-1 font-mono text-[10.5px] text-ink/45 italic">
                … 一个个吐 · &lt;/s&gt; 收尾
              </span>
            </div>
          </div>

          {/* 当前选中说明 */}
          <div
            key={`info-${pair.id}-${targetIdx}`}
            className="mt-5 grid grid-cols-[auto_1fr] gap-3 items-center px-4 py-3 bg-butter/30 border-2 border-ink/20 rounded-xl animate-enter-fade"
          >
            <div className="px-3 py-1.5 bg-ink text-cream rounded-md font-mono text-[12px] font-bold">
              「{pair.target[targetIdx]}」
            </div>
            <p className="font-mono text-[12.5px] text-ink leading-snug">
              主要看源句子第 {topSrcIdx + 1} 个 token「
              <span className="font-bold text-coral">{pair.source[topSrcIdx]}</span>
              」（{((attnRow[topSrcIdx] || 0) * 100).toFixed(0)}%）。剩下的注意力分给上下文做歧义消解。
            </p>
          </div>
        </div>

        {/* 旁边讲一句关键差异 */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="px-4 py-3 bg-white border-2 border-ink rounded-2xl shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal mb-1.5">
              encoder 的两个特权
            </div>
            <p className="text-[13.5px] text-ink/80 leading-relaxed">
              ① 双向 attention：每个源 token 能看到全句。② 一次跑完 hidden states 摆着，decoder 后面任意 token 反复抽都不再算 encoder。
            </p>
          </div>
          <div className="px-4 py-3 bg-white border-2 border-ink rounded-2xl shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1.5">
              decoder 的两个约束
            </div>
            <p className="text-[13.5px] text-ink/80 leading-relaxed">
              ① 因果 mask：生成第 i 个 token 时只能看前面 i-1 个。② cross-attention：必看 encoder hidden states，输出强绑定输入。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionEncDecFlow;
