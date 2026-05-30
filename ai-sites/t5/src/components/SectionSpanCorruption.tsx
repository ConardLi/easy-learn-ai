/**
 * Section 02 · 「预训练时它在做完形填空」
 *
 * 反模板：跟 bert SectionTrain（MLM 6 步单步 trace + NSP）不同
 *   ─ bert：mask 单个 token，BERT 一次性预测；走单步 trace
 *   ─ T5：mask 连续 span，每个 span 整体替换成一个 sentinel token（<X>, <Y>, <Z>），
 *         decoder 输出 sentinel + span 内容（也是字符串拼接）
 *
 * 交互：
 *   ─ slider 调 noise 比例（5% / 10% / 15% / 25% / 50%，默认 15%）
 *   ─ textarea 用户可改训练源文
 *   ─ 实时分两栏：encoder 输入（带 sentinel 的源句子）、decoder 目标（sentinel + span 文本）
 *   ─ 一行小字：spans 数量 / mean span length 3 / 来源
 *
 * mock 算法（不抠真实分布，目标是看懂"span 怎么被换成 sentinel"）：
 *   ─ 用确定性 PRNG（基于 noise % 做种子）选 spans
 *   ─ 平均 span len = 3
 *   ─ sentinel 用 <X> <Y> <Z> ...（最多 8 个）
 */
import React, { useMemo, useState } from "react";

const DEFAULT_TEXT =
  "Thank you for inviting me to your party last week. The food was great and the music was loud.";

const NOISE_OPTIONS = [5, 10, 15, 25, 50];

/* 简单 hash 基础的 PRNG —— 给定 (seed, i) 出 [0,1)。结果可重复，跟 React 渲染兼容 */
function rand(seed: number, i: number): number {
  let x = seed * 9301 + i * 49297 + 233280;
  x = Math.sin(x) * 10000;
  return x - Math.floor(x);
}

/* 把 text 切成 token（空格分隔；标点跟单词粘） */
function tokenize(text: string): string[] {
  return text.split(/(\s+)/).filter((t) => t.length > 0);
}

/* 决定哪些 token index 进入 corrupted spans。
 * 算法：依次扫，按 noise 比例随机起一个新 span；span 长度按平均 3 的简化几何采样。
 * 输出：spans = [{startIdx, len}]，按 startIdx 排好 */
function pickSpans(tokens: string[], noisePct: number, seed: number): { startIdx: number; len: number }[] {
  const total = tokens.filter((t) => /\S/.test(t)).length;
  const targetCorrupt = Math.max(1, Math.round((total * noisePct) / 100));
  const spans: { startIdx: number; len: number }[] = [];

  let consumed = 0;
  let i = 0;
  let attempt = 0;
  while (consumed < targetCorrupt && i < tokens.length && attempt < 200) {
    attempt++;
    /* 跳过空白 token */
    if (!/\S/.test(tokens[i])) {
      i++;
      continue;
    }
    /* 用 PRNG 决定是否起 span */
    const p = rand(seed * 7 + 11, i);
    if (p < 0.35) {
      /* span 长度从简化几何：rand 决定，mean ≈ 3 */
      let len = 1;
      while (len < 6 && rand(seed * 13 + 3, i * 31 + len) > 0.34) len++;
      /* 让 len 不超出剩余 token 数 */
      let avail = 0;
      for (let j = i; j < tokens.length && avail < len; j++) {
        if (/\S/.test(tokens[j])) avail++;
      }
      const actualLen = Math.min(len, avail, targetCorrupt - consumed);
      if (actualLen > 0) {
        spans.push({ startIdx: i, len: actualLen });
        consumed += actualLen;
        /* 跳过本 span 占的 token 数（包括中间空白）*/
        let countedNonWs = 0;
        while (i < tokens.length && countedNonWs < actualLen) {
          if (/\S/.test(tokens[i])) countedNonWs++;
          i++;
        }
        /* 至少跳一个 token 间隔 */
        if (i < tokens.length && !/\S/.test(tokens[i])) i++;
        continue;
      }
    }
    i++;
  }
  return spans;
}

const SENTINELS = ["<X>", "<Y>", "<Z>", "<W>", "<V>", "<U>", "<T>", "<S>"];

const SectionSpanCorruption: React.FC = () => {
  const [text, setText] = useState<string>(DEFAULT_TEXT);
  const [noiseIdx, setNoiseIdx] = useState<number>(2); // 默认 15%

  const noise = NOISE_OPTIONS[noiseIdx];

  /* seed 用 text 长度 + noise，让"换了 noise 就重新挑 span"看起来合理 */
  const tokens = useMemo(() => tokenize(text), [text]);
  const spans = useMemo(
    () => pickSpans(tokens, noise, text.length + noise),
    [tokens, noise, text],
  );

  /* 渲染 encoder 输入：把 span 内 token 替换成 sentinel */
  const encoderRender = useMemo(() => {
    const out: { kind: "kept" | "sentinel"; text: string }[] = [];
    let curSpan = 0;
    let countedNonWs = 0;
    let i = 0;
    while (i < tokens.length) {
      const isWs = !/\S/.test(tokens[i]);
      if (
        !isWs &&
        curSpan < spans.length &&
        spans[curSpan].startIdx === i
      ) {
        /* 进入 span：吐 sentinel */
        out.push({ kind: "sentinel", text: SENTINELS[curSpan % SENTINELS.length] });
        /* 跳过 span 长度（按非空白计） */
        let consumed = 0;
        while (i < tokens.length && consumed < spans[curSpan].len) {
          if (/\S/.test(tokens[i])) consumed++;
          i++;
        }
        curSpan++;
        countedNonWs += spans[curSpan - 1].len;
        continue;
      }
      out.push({ kind: "kept", text: tokens[i] });
      if (!isWs) countedNonWs++;
      i++;
    }
    return out;
  }, [tokens, spans]);

  /* 渲染 decoder 目标：sentinel + span 内容拼起来，最后跟 </s> */
  const decoderTarget = useMemo(() => {
    const out: { kind: "sentinel" | "span"; text: string }[] = [];
    spans.forEach((s, idx) => {
      out.push({ kind: "sentinel", text: SENTINELS[idx % SENTINELS.length] });
      /* 收集 span 内 token */
      let consumed = 0;
      let i = s.startIdx;
      const parts: string[] = [];
      while (i < tokens.length && consumed < s.len) {
        const tk = tokens[i];
        if (/\S/.test(tk)) {
          parts.push(tk);
          consumed++;
        } else if (parts.length > 0) {
          parts.push(tk);
        }
        i++;
      }
      out.push({ kind: "span", text: parts.join("") });
    });
    return out;
  }, [tokens, spans]);

  const totalNonWs = tokens.filter((t) => /\S/.test(t)).length;
  const consumedTokens = spans.reduce((acc, s) => acc + s.len, 0);
  const realPct = totalNonWs > 0 ? Math.round((consumedTokens / totalNonWs) * 100) : 0;
  const meanLen = spans.length > 0 ? (consumedTokens / spans.length).toFixed(1) : "—";

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Span corruption</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-7">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              预训练时它在做
              <br />
              「完形填空」。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              T5 没有先看过翻译/摘要这些任务。它先在 C4 语料（750 GB 英文清洗网页）上做一件事：随机扣掉一段连续文字，让 decoder 把扣掉的那段还原。
            </p>
          </div>
        </div>

        {/* 主交互卡 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
          {/* slider + 文本输入 */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 你的源文（可改）
                </div>
                <div className="font-mono text-[10px] text-ink/40">
                  {totalNonWs} tokens
                </div>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 bg-cream border-2 border-ink rounded-md font-mono text-[12.5px] text-ink leading-relaxed resize-none focus:outline-none focus:bg-butter/30 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② 扣掉的比例（noise %）
                </div>
                <div className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                  {noise}
                  <span className="font-mono text-[12px] text-ink/55 ml-0.5">%</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={NOISE_OPTIONS.length - 1}
                step={1}
                value={noiseIdx}
                onChange={(e) => setNoiseIdx(parseInt(e.target.value))}
                className="w-full accent-coral"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-ink/50">
                {NOISE_OPTIONS.map((n) => (
                  <span key={n}>{n}%</span>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10.5px] text-ink/55 leading-relaxed">
                T5 论文实测 10%~25% 都差不多，最终选 <strong className="text-coral">15%</strong> 当默认。span 平均长 3 个 token。
              </p>
            </div>
          </div>

          {/* 输出：encoder 输入 / decoder 目标 */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* encoder 输入 */}
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral">
                  encoder 输入 · 把 span 换成 sentinel
                </div>
                <div className="font-mono text-[10px] text-ink/40">
                  {spans.length} spans
                </div>
              </div>
              <div
                key={`enc-${noise}-${text.length}`}
                className="px-3.5 py-3 bg-cream border-2 border-ink rounded-md font-mono text-[13px] leading-[1.85] text-ink min-h-[140px] animate-enter-fade"
              >
                {encoderRender.map((seg, i) =>
                  seg.kind === "sentinel" ? (
                    <span
                      key={i}
                      className="inline-flex items-center px-1.5 py-0.5 mx-0.5 bg-ink text-butter rounded font-bold"
                    >
                      {seg.text}
                    </span>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  ),
                )}
              </div>
            </div>

            {/* decoder 目标 */}
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
                  decoder 目标 · sentinel + 原 span 拼起来
                </div>
                <div className="font-mono text-[10px] text-ink/40">
                  实际 {realPct}% · 均长 {meanLen}
                </div>
              </div>
              <div
                key={`dec-${noise}-${text.length}`}
                className="px-3.5 py-3 bg-butter/25 border-2 border-ink rounded-md font-mono text-[13px] leading-[1.85] text-ink min-h-[140px] animate-enter-fade"
              >
                {decoderTarget.length === 0 && (
                  <span className="text-ink/40">（noise 太低，没有 span。把 % 拉高试试。）</span>
                )}
                {decoderTarget.map((seg, i) =>
                  seg.kind === "sentinel" ? (
                    <span
                      key={i}
                      className="inline-flex items-center px-1.5 py-0.5 mx-0.5 bg-ink text-butter rounded font-bold"
                    >
                      {seg.text}
                    </span>
                  ) : (
                    <span key={i} className="text-ink/80">
                      {seg.text}
                    </span>
                  ),
                )}
                <span className="inline-flex items-center px-1.5 py-0.5 mx-0.5 bg-coral text-cream rounded font-bold">
                  &lt;/s&gt;
                </span>
              </div>
            </div>
          </div>

          {/* 反直觉 callout */}
          <div className="mt-6 px-4 py-3 bg-ink text-cream rounded-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-1">
              反直觉
            </div>
            <p className="text-[14px] leading-relaxed">
              decoder 不还原整段原文，只输出「sentinel + 被扣掉的内容」 —— 比让模型重写全文便宜得多。T5 用这招在 34 B token C4 子集上完成预训练，BERT 同期是 137 B。
            </p>
            <p className="mt-2 font-mono text-[10px] text-cream/55">
              来源：T5 paper arXiv:1910.10683 · cameronrwolfe.substack T5 part2
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSpanCorruption;
