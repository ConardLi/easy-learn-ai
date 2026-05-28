/**
 * Section 02 · 「BERT 用两只眼睛读句子」
 *
 * 反直觉钩子放在这里（不是 Hero）：8 年前的论文，2026 年大公司搜索引擎里还在跑。
 *
 * 核心交互：
 *   ─ pill 切换 BERT (双向) / GPT (单向) 两种 attention
 *   ─ 用户点句子里第 i 个 token，看 attention 矩阵第 i 行高亮：
 *       BERT 可以看所有 8 个 token （包括左右）
 *       GPT 只能看 ≤ i 的 token （因果 mask，未来不可见）
 *   ─ 同一句话两种 attention 矩阵并不并列，是切换看 —— 视觉差更冲击
 */
import React, { useMemo, useState } from "react";

const SENTENCE = ["今天", "天气", "真", "好", "我", "想", "出去", "跑步"];

type Mode = "bert" | "gpt";

/**
 * 给定 (row, col)，返回一个稳定的 attention 权重（0~1）。
 * 真实 BERT 的 attention 是学出来的，这里用确定的伪随机分布，让画面"看起来真"。
 *
 * 规则：
 *   ─ 对角线附近 (|row - col| ≤ 1) 权重较高
 *   ─ 与 [CLS] / [SEP] 类似的边界 token 也有一定关注
 *   ─ 其他位置概率梯度衰减
 */
function rawAttention(row: number, col: number): number {
  const d = Math.abs(row - col);
  const base = Math.exp(-d / 2.5);
  const seed = ((row + 1) * 131 + (col + 1) * 17) % 97;
  const noise = (seed / 97) * 0.35;
  return Math.min(1, base * 0.7 + noise * 0.5);
}

/**
 * 根据模式做 row-wise softmax-like 归一化：
 *   ─ BERT：所有 col 都参与（双向）
 *   ─ GPT：col > row 的位置被强制设 0，只在 ≤ row 上归一化（因果）
 */
function attentionRow(row: number, mode: Mode, n: number): number[] {
  const raw: number[] = [];
  for (let col = 0; col < n; col++) {
    if (mode === "gpt" && col > row) raw.push(0);
    else raw.push(rawAttention(row, col));
  }
  const sum = raw.reduce((a, b) => a + b, 0);
  if (sum === 0) return raw;
  return raw.map((v) => v / sum);
}

const SectionBothEyes: React.FC = () => {
  const [mode, setMode] = useState<Mode>("bert");
  const [activeRow, setActiveRow] = useState(2);

  const n = SENTENCE.length;

  /* 当前激活行的 attention 分布 */
  const activeWeights = useMemo(
    () => attentionRow(activeRow, mode, n),
    [activeRow, mode, n],
  );

  /* 整张矩阵 —— 给小热力图用 */
  const matrix = useMemo(() => {
    const m: number[][] = [];
    for (let row = 0; row < n; row++) m.push(attentionRow(row, mode, n));
    return m;
  }, [mode, n]);

  const visibleCount =
    mode === "bert" ? n : Math.min(n, activeRow + 1);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Two Eyes / 双向</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* 左：文字 */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-5">
              它能同时
              <br />
              看左边和右边。
            </h2>

            <p className="text-[16px] text-ink/75 leading-relaxed mb-4">
              GPT 一类的 decoder 模型是从左往右写字，看后一个词的时候，后面的词还没出现。BERT 不写字，它只读 —— 所以可以同时看前后。
            </p>
            <p className="text-[16px] text-ink/75 leading-relaxed mb-4">
              这就是「<span className="font-mono text-[14px] bg-butter px-1.5 py-0.5 rounded">B</span>idirectional」的来历。中间一个被盖住的词，左边告诉你「我想去」，右边告诉你「天很热」，两边一夹，答案是「游泳」。
            </p>

            <div className="mt-6 p-4 border-2 border-ink rounded-2xl bg-butter/35">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 mb-1">
                反直觉
              </div>
              <p className="font-display text-[18px] font-bold text-ink leading-snug">
                2018 年发表的论文，2019 年起跑在 Google Search 里，2026 年还没下线。
              </p>
              <p className="mt-2 text-[13px] text-ink/65 leading-relaxed">
                Google 官方 blog 2019-10-25 宣布 BERT 影响 10% 英文搜索查询，随后扩到所有语言。搜索排序、featured snippet 至今仍在用 BERT 系。来源：blog.google/products-and-platforms/products/search/search-language-understanding-bert 2019-10-25。
              </p>
            </div>
          </div>

          {/* 右：attention 矩阵 + 模式切换 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* mode 切换 */}
              <div className="flex items-center gap-2 mb-5">
                {(
                  [
                    { id: "bert" as const, label: "BERT · 双向 encoder" },
                    { id: "gpt" as const, label: "GPT · 单向 decoder" },
                  ] as const
                ).map((m) => {
                  const on = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={[
                        "flex-1 py-2.5 px-3 rounded-xl border-2 border-ink font-mono text-[11px] font-bold tracking-wide transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>

              {/* 句子 + 当前选中的 query token */}
              <div className="mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  点一个词，看它能「看到」哪些其他词
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SENTENCE.map((t, i) => {
                    const isActive = i === activeRow;
                    return (
                      <button
                        key={`q-${i}`}
                        onClick={() => setActiveRow(i)}
                        className={[
                          "inline-flex items-center px-2.5 py-1.5 rounded-md border-2 border-ink font-mono text-[12px] font-semibold transition-all duration-250 ease-spring",
                          isActive
                            ? "bg-coral text-cream shadow-[2px_2px_0_0_#241C15]"
                            : "bg-white text-ink/80 hover:bg-butter",
                        ].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* attention 矩阵热力图 */}
              <div className="mt-5">
                <div className="grid grid-cols-[44px_1fr] gap-1.5">
                  {/* 顶部 column header（key 词） */}
                  <div />
                  <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
                  >
                    {SENTENCE.map((t, i) => (
                      <div
                        key={`ch-${i}`}
                        className="font-mono text-[9.5px] text-ink/55 text-center truncate"
                        title={t}
                      >
                        {t}
                      </div>
                    ))}
                  </div>

                  {/* 矩阵正文 */}
                  {SENTENCE.map((rowTok, row) => (
                    <React.Fragment key={`row-${row}`}>
                      <button
                        onClick={() => setActiveRow(row)}
                        className={[
                          "font-mono text-[10.5px] font-semibold text-right pr-1.5 transition-colors",
                          row === activeRow ? "text-coral" : "text-ink/55 hover:text-ink",
                        ].join(" ")}
                      >
                        {rowTok}
                      </button>
                      <div
                        className="grid gap-1"
                        style={{
                          gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                        }}
                      >
                        {matrix[row].map((w, col) => {
                          const isMaskedFuture =
                            mode === "gpt" && col > row;
                          const isActiveCell =
                            row === activeRow && !isMaskedFuture;
                          return (
                            <div
                              key={`c-${row}-${col}`}
                              className={[
                                "aspect-square rounded-[3px] border transition-all duration-300 ease-spring",
                                isMaskedFuture
                                  ? "border-ink/15 bg-ink/[0.04]"
                                  : isActiveCell
                                    ? "border-ink"
                                    : "border-ink/15",
                              ].join(" ")}
                              style={{
                                backgroundColor: isMaskedFuture
                                  ? undefined
                                  : `rgba(36, 28, 21, ${w * 0.85 + 0.06})`,
                                opacity: row === activeRow ? 1 : 0.4,
                              }}
                              title={
                                isMaskedFuture
                                  ? "GPT 因果 mask · 不可见"
                                  : `attn=${(w * 100).toFixed(1)}%`
                              }
                            />
                          );
                        })}
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {/* 灰条注释 */}
                <div className="mt-4 flex items-center gap-4 font-mono text-[10px] text-ink/55">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-3 rounded-[2px] bg-ink/80" />
                    高 attention
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-3 rounded-[2px] bg-ink/15" />
                    低
                  </div>
                  {mode === "gpt" && (
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block w-3 h-3 rounded-[2px] bg-ink/[0.04] border border-ink/15" />
                      未来 · 被 mask
                    </div>
                  )}
                </div>
              </div>

              {/* 底栏：选中行的可见 token 数 */}
              <div className="mt-5 pt-4 border-t border-ink/10 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    query
                  </div>
                  <div className="font-display text-[20px] font-bold text-ink">
                    {SENTENCE[activeRow]}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    能看到几个词
                  </div>
                  <div className="font-display text-[20px] font-bold tabular-nums">
                    <span
                      className={
                        mode === "bert" ? "text-teal" : "text-coral"
                      }
                    >
                      {visibleCount}
                    </span>
                    <span className="text-ink/45"> / {n}</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    模型类型
                  </div>
                  <div className="font-display text-[20px] font-bold text-ink">
                    {mode === "bert" ? "Encoder" : "Decoder"}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 font-mono text-[10.5px] text-ink/45 px-2 leading-relaxed">
              attention 权重为示意分布；GPT 用因果 mask 屏蔽未来 token，这是 decoder-only 跟 encoder-only 最本质的训练差异。源头：arXiv:1810.04805 § 3 · arXiv:2005.14165 § 2。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBothEyes;
