/**
 * Section 05 · API 价格计算器
 *
 * 让用户当一回采购：选模型 + 拖两条 slider 调输入 / 输出长度 → 看每次调用、每天 1k 次的成本。
 *
 * 反相邻：§04 是横向 bar + chip。这里改用 model pill + 双 slider + 实时数字 + 横向对比条。
 *         主交互是 L4（连续 slider 持续变 + 多模型联动），跟 trace / flip / chip 都不一样。
 *
 * 数据来源 · 全是 2026/05 官方 pricing page 实测：
 *   ofox.ai/blog/ai-api-pricing-comparison-2026
 *   scriptbyai.com/gpt-gemini-claude-pricing
 *   stochasticsandbox.com 2026-05-23
 *   benchlm.ai/blog/posts/context-window-comparison
 */
import React, { useMemo, useState } from "react";

type Model = {
  key: string;
  family: string;
  name: string;
  inPer1M: number; // $ per 1M input tokens
  outPer1M: number; // $ per 1M output tokens
  cachedIn?: number;
  ctx: number; // tokens
  tone: string;
  note: string;
};

const MODELS: Model[] = [
  {
    key: "gpt55",
    family: "OpenAI",
    name: "GPT-5.5",
    inPer1M: 5.0,
    outPer1M: 30.0,
    cachedIn: 0.5,
    ctx: 1_000_000,
    tone: "bg-ink text-cream",
    note: "Flagship · 输出价是输入 6×",
  },
  {
    key: "opus47",
    family: "Anthropic",
    name: "Claude Opus 4.7",
    inPer1M: 5.0,
    outPer1M: 25.0,
    cachedIn: 0.5,
    ctx: 1_000_000,
    tone: "bg-coral text-cream",
    note: "新 tokenizer 同样文本可能多 35% token",
  },
  {
    key: "sonnet46",
    family: "Anthropic",
    name: "Claude Sonnet 4.6",
    inPer1M: 3.0,
    outPer1M: 15.0,
    cachedIn: 0.3,
    ctx: 1_000_000,
    tone: "bg-coral text-cream",
    note: "性价比之选 · 跟 Opus 同 tokenizer",
  },
  {
    key: "gemini31",
    family: "Google",
    name: "Gemini 3.1 Pro",
    inPer1M: 2.0,
    outPer1M: 12.0,
    cachedIn: 0.2,
    ctx: 1_000_000,
    tone: "bg-teal text-cream",
    note: "≤200K 内便宜，>200K 翻倍",
  },
  {
    key: "gemini25flash",
    family: "Google",
    name: "Gemini 2.5 Flash",
    inPer1M: 0.3,
    outPer1M: 2.5,
    ctx: 1_000_000,
    tone: "bg-teal text-cream",
    note: "1M context 里最便宜的多模态",
  },
  {
    key: "ds4pro",
    family: "DeepSeek",
    name: "DeepSeek V4 Pro",
    inPer1M: 0.435,
    outPer1M: 0.87,
    cachedIn: 0.0036,
    ctx: 1_000_000,
    tone: "bg-butter text-ink",
    note: "永久 75% off · cache 命中近乎免费",
  },
  {
    key: "ds4flash",
    family: "DeepSeek",
    name: "DeepSeek V4 Flash",
    inPer1M: 0.14,
    outPer1M: 0.28,
    cachedIn: 0.028,
    ctx: 1_000_000,
    tone: "bg-butter text-ink",
    note: "同价位里质量偏高（2026/05 各家定价页）",
  },
  {
    key: "haiku45",
    family: "Anthropic",
    name: "Claude Haiku 4.5",
    inPer1M: 1.0,
    outPer1M: 5.0,
    cachedIn: 0.1,
    ctx: 200_000,
    tone: "bg-pop text-cream",
    note: "美国 lab 最便宜的前沿模型",
  },
];

const PRESETS = [
  { label: "聊天 1 问 1 答", input: 500, output: 200 },
  { label: "长文档总结", input: 80_000, output: 2_000 },
  { label: "Agent 调工具一轮", input: 8_000, output: 1_500 },
  { label: "塞满 200K 上下文", input: 200_000, output: 4_000 },
];

const SectionPriceCalc: React.FC = () => {
  const [modelKey, setModelKey] = useState(MODELS[0].key);
  const [input, setInput] = useState(8_000);
  const [output, setOutput] = useState(1_500);

  const m = MODELS.find((x) => x.key === modelKey)!;

  const oneCall = useMemo(
    () => (input / 1_000_000) * m.inPer1M + (output / 1_000_000) * m.outPer1M,
    [input, output, m],
  );
  const cachedOneCall = useMemo(
    () =>
      ((input / 1_000_000) * (m.cachedIn ?? m.inPer1M)) +
      (output / 1_000_000) * m.outPer1M,
    [input, output, m],
  );
  const daily1k = oneCall * 1_000;
  const monthly10k = oneCall * 10_000 * 30;

  /* 同样调用对比：算所有 8 个模型一次成本 */
  const compare = MODELS.map((x) => ({
    ...x,
    cost: (input / 1_000_000) * x.inPer1M + (output / 1_000_000) * x.outPer1M,
  }));
  const maxCompare = Math.max(...compare.map((x) => x.cost));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 05</span>
          <span className="section-anchor-label">$ · token = bill</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          token 不是抽象数，是发票。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          API 按输入 + 输出 token 分别计价，输出通常贵 4-6 倍。
          下面拖 slider 当一次采购：同一笔请求，8 家模型分别要多少钱。
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：控制面板 */}
          <div className="lg:col-span-7 bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
            {/* 模型选 */}
            <div className="mb-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① 选模型
              </div>
              <div className="flex flex-wrap gap-1.5">
                {MODELS.map((opt) => {
                  const on = opt.key === modelKey;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setModelKey(opt.key)}
                      className={[
                        "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[10.5px] font-bold transition-all duration-200 ease-spring",
                        on
                          ? `${opt.tone} shadow-stamp`
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      {opt.name}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2.5 font-mono text-[10.5px] text-ink/55">
                {m.note}
              </p>
            </div>

            {/* 预设 chip */}
            <div className="mb-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ② 用例预设
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setInput(p.input);
                      setOutput(p.output);
                    }}
                    className="px-3 py-1.5 rounded-full bg-cream border-2 border-ink/50 font-mono text-[10.5px] font-bold text-ink hover:bg-butter hover:border-ink transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* slider */}
            <div className="mb-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ③ 输入 tokens
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[22px] font-bold text-ink tabular-nums">
                    {input.toLocaleString()}
                  </span>
                  <span className="font-mono text-[10px] text-ink/55">tok</span>
                </div>
              </div>
              <input
                type="range"
                min={100}
                max={500_000}
                step={100}
                value={input}
                onChange={(e) => setInput(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none accent-coral bg-cream border border-ink/15 cursor-pointer"
              />
              <div className="mt-1 flex justify-between font-mono text-[9.5px] text-ink/40">
                <span>100</span>
                <span>500K</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ④ 输出 tokens
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[22px] font-bold text-ink tabular-nums">
                    {output.toLocaleString()}
                  </span>
                  <span className="font-mono text-[10px] text-ink/55">tok</span>
                </div>
              </div>
              <input
                type="range"
                min={50}
                max={50_000}
                step={50}
                value={output}
                onChange={(e) => setOutput(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none accent-coral bg-cream border border-ink/15 cursor-pointer"
              />
              <div className="mt-1 flex justify-between font-mono text-[9.5px] text-ink/40">
                <span>50</span>
                <span>50K</span>
              </div>
            </div>

            {/* 三个数 */}
            <div className="mt-6 pt-5 border-t border-ink/10 grid grid-cols-3 gap-3">
              <div className="bg-cream border-2 border-ink/15 rounded-xl px-3 py-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
                  单次调用
                </div>
                <div className="font-display text-[22px] lg:text-[26px] font-bold text-ink leading-none tabular-nums">
                  ${oneCall.toFixed(oneCall < 0.01 ? 5 : 4)}
                </div>
              </div>
              <div className="bg-cream border-2 border-ink/15 rounded-xl px-3 py-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
                  每天 1k 次
                </div>
                <div className="font-display text-[22px] lg:text-[26px] font-bold text-ink leading-none tabular-nums">
                  ${daily1k.toFixed(2)}
                </div>
              </div>
              <div className="bg-ink text-cream rounded-xl px-3 py-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/60 mb-0.5">
                  每月 10k/天
                </div>
                <div className="font-display text-[22px] lg:text-[26px] font-bold leading-none tabular-nums">
                  ${monthly10k.toFixed(0)}
                </div>
              </div>
            </div>

            {/* cache 命中 */}
            {m.cachedIn != null && (
              <div className="mt-4 px-4 py-3 bg-butter border-2 border-ink rounded-xl flex items-baseline justify-between gap-3">
                <div className="font-mono text-[11px] font-bold text-ink leading-snug">
                  prompt cache 命中：单次降到 <span className="font-display text-[16px]">${cachedOneCall.toFixed(cachedOneCall < 0.01 ? 5 : 4)}</span>
                </div>
                <div className="font-mono text-[10px] text-ink/65 whitespace-nowrap">
                  cache ${m.cachedIn}/M
                </div>
              </div>
            )}
          </div>

          {/* 右：8 家对比柱 */}
          <div className="lg:col-span-5 bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
              同一笔调用 · 8 家成本
            </div>
            <div className="font-display text-[14.5px] font-bold text-ink mb-5 leading-snug">
              {input.toLocaleString()} 输入 + {output.toLocaleString()} 输出
            </div>

            <div className="space-y-2" key={`comp-${modelKey}-${input}-${output}`}>
              {compare
                .slice()
                .sort((a, b) => a.cost - b.cost)
                .map((c) => {
                  const w = (c.cost / maxCompare) * 100;
                  const isMine = c.key === modelKey;
                  return (
                    <div key={c.key} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-5">
                        <div
                          className={[
                            "font-display text-[12.5px] font-bold leading-tight truncate",
                            isMine ? "text-ink" : "text-ink/70",
                          ].join(" ")}
                        >
                          {c.name}
                        </div>
                      </div>
                      <div className="col-span-4 relative h-6">
                        <div className="absolute inset-0 rounded-md border border-ink/15 bg-cream overflow-hidden">
                          <div
                            className={[
                              "h-full transition-all duration-300 ease-spring",
                              c.tone.split(" ")[0],
                              isMine ? "" : "opacity-65",
                            ].join(" ")}
                            style={{ width: `${Math.max(w, 1.2)}%` }}
                          />
                        </div>
                      </div>
                      <div className="col-span-3 text-right">
                        <span
                          className={[
                            "font-mono text-[11px] font-bold tabular-nums",
                            isMine ? "text-ink" : "text-ink/55",
                          ].join(" ")}
                        >
                          ${c.cost.toFixed(c.cost < 0.01 ? 5 : c.cost < 1 ? 4 : 2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <p className="mt-5 font-mono text-[10px] text-ink/40 leading-relaxed">
              价格自 2026/05 各家官方 page · ofox.ai · scriptbyai.com · stochasticsandbox.com
            </p>
          </div>
        </div>

        {/* 底部 takeaway */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 font-sans text-[12.5px] text-ink/75 leading-relaxed">
          <div className="bg-cream border-2 border-ink/15 rounded-xl p-3">
            <strong className="text-ink block mb-0.5 font-display text-[14px]">
              输出比输入贵 4-6×
            </strong>
            让模型「简洁回答」≠ 玩梗，是实实在在省钱。
          </div>
          <div className="bg-cream border-2 border-ink/15 rounded-xl p-3">
            <strong className="text-ink block mb-0.5 font-display text-[14px]">
              cache 命中近乎免费
            </strong>
            DeepSeek V4 Pro 缓存命中 $0.0036/M·把固定 prompt 缓住，重复请求基本不要钱。
          </div>
          <div className="bg-cream border-2 border-ink/15 rounded-xl p-3">
            <strong className="text-ink block mb-0.5 font-display text-[14px]">
              超 200K 翻倍
            </strong>
            Gemini 3.1 Pro / GPT-5.5 都有长上下文加价。能拆短就拆短。
          </div>
          <div className="bg-cream border-2 border-ink/15 rounded-xl p-3">
            <strong className="text-ink block mb-0.5 font-display text-[14px]">
              旗舰差 30 倍
            </strong>
            GPT-5.5 vs DeepSeek V4 Pro，同 SWE-Verified 跑分输出价差 34×。看任务挑模型。
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPriceCalc;
