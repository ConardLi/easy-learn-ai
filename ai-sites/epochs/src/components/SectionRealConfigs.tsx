/**
 * Section 06 · 真实大模型的 epoch 横切
 *
 * 反相邻：Recipes 是 accordion。这里换 pill 阵列（按训练阶段）+ 横向 bar matrix。
 * 每个 LLM 一行：预训练 token 量（粗灰条，固定 1 epoch）/ SFT 阶段（窄 butter 条 ×N epoch）/
 *   后训练 epoch 数。
 * 点击 pill 切换 view：「按 token 量」/「按训练阶段」/「按 epoch 数」
 *
 * 数据全部 2024-2026 公开来源。
 */
import React, { useMemo, useState } from "react";

type Model = {
  id: string;
  name: string;
  org: string;
  pretrainTokensT: number; // 单位：万亿 tokens
  pretrainEpoch: number;
  sftEpoch: number;
  sftSamples?: string;
  postEpoch?: number; // DPO / RLHF / RL 阶段
  postLabel?: string;
  released: string;
  src: string;
  highlight?: string;
};

const MODELS: Model[] = [
  {
    id: "llama3-405b",
    name: "Llama 3.1 405B",
    org: "Meta",
    pretrainTokensT: 15.6,
    pretrainEpoch: 1,
    sftEpoch: 2,
    sftSamples: "10M+ 人工标注 + 25M+ 合成",
    postEpoch: 1,
    postLabel: "DPO",
    released: "2024-07",
    src: "arXiv:2407.21783",
    highlight: "1.2M steps × cosine LR",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    org: "DeepSeek",
    pretrainTokensT: 14.8,
    pretrainEpoch: 1,
    sftEpoch: 2,
    sftSamples: "1.5M instruction tuning",
    postEpoch: 1,
    postLabel: "GRPO",
    released: "2024-12",
    src: "arXiv:2412.19437",
    highlight: "2.664M H800·h · FP8 训练",
  },
  {
    id: "tulu3-70b",
    name: "Tulu 3 70B",
    org: "AI2 / Allen",
    pretrainTokensT: 15.6,
    pretrainEpoch: 1,
    sftEpoch: 2,
    sftSamples: "939K Tulu 3 SFT mix",
    postEpoch: 1,
    postLabel: "DPO + RLVR",
    released: "2024-11",
    src: "arXiv:2411.15124",
    highlight: "num_train_epochs=2 写死在脚本",
  },
  {
    id: "qwen3-32b",
    name: "Qwen 3 32B",
    org: "Alibaba",
    pretrainTokensT: 36,
    pretrainEpoch: 1,
    sftEpoch: 3,
    sftSamples: "多语言 instruction",
    postEpoch: 2,
    postLabel: "DPO",
    released: "2025-04",
    src: "Qwen3 Tech Report 2025/04",
    highlight: "数据规模冠军 · 36 T tokens",
  },
  {
    id: "mistral-large-2",
    name: "Mistral Large 2",
    org: "Mistral",
    pretrainTokensT: 9,
    pretrainEpoch: 1,
    sftEpoch: 2,
    sftSamples: "未公开",
    postEpoch: 1,
    postLabel: "DPO",
    released: "2024-07",
    src: "Mistral release notes 2024/07",
    highlight: "123B 密集架构",
  },
  {
    id: "gemma-3-27b",
    name: "Gemma 3 27B",
    org: "Google",
    pretrainTokensT: 14,
    pretrainEpoch: 1,
    sftEpoch: 2,
    sftSamples: "未公开 mix",
    postEpoch: 1,
    postLabel: "RLHF",
    released: "2025-03",
    src: "Gemma 3 Tech Report 2025/03",
    highlight: "多模态 · 128K ctx",
  },
];

type View = "tokens" | "epoch" | "all";

const SectionRealConfigs: React.FC = () => {
  const [view, setView] = useState<View>("all");
  const [hoverId, setHoverId] = useState<string | null>(null);

  /* 排序 */
  const sorted = useMemo(() => {
    const arr = [...MODELS];
    if (view === "tokens") arr.sort((a, b) => b.pretrainTokensT - a.pretrainTokensT);
    if (view === "epoch")
      arr.sort((a, b) => b.sftEpoch + (b.postEpoch ?? 0) - (a.sftEpoch + (a.postEpoch ?? 0)));
    return arr;
  }, [view]);

  const maxTokens = Math.max(...MODELS.map((m) => m.pretrainTokensT));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">真实账本 · 2024-2026</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <h2 className="font-display text-display-lg text-ink max-w-3xl">
            主流大模型，预训练几乎都只跑 1 遍。
          </h2>
          <div className="inline-flex items-center gap-1 bg-white border-2 border-ink rounded-full p-1 shadow-stamp">
            {(
              [
                ["all", "全栈"],
                ["tokens", "按 token"],
                ["epoch", "按 epoch"],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={[
                  "px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all duration-200",
                  view === v ? "bg-ink text-cream" : "text-ink/65 hover:text-ink",
                ].join(" ")}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <p className="max-w-3xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          6 个最近放出技术报告的开源大模型，看看它们 epoch 数到底怎么填。
          一个规律：预训练永远是 1，SFT 永远是 1-3，后训练永远是 1-2。
        </p>

        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp overflow-hidden">
          {/* 表头 */}
          <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-2.5 bg-cream border-b-2 border-ink font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 font-semibold">
            <div className="col-span-3">模型 · 发布</div>
            <div className="col-span-5">预训练（1 epoch · 越宽 = token 越多）</div>
            <div className="col-span-2 text-center">SFT epoch</div>
            <div className="col-span-2 text-center">后训练</div>
          </div>

          <div>
            {sorted.map((m, i) => {
              const widthPct = (m.pretrainTokensT / maxTokens) * 100;
              const hovered = hoverId === m.id;
              return (
                <div
                  key={m.id}
                  onMouseEnter={() => setHoverId(m.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={[
                    "grid grid-cols-12 gap-3 px-5 py-3.5 border-t-2 border-ink/10 transition-colors duration-200",
                    hovered ? "bg-cream/70" : "bg-white",
                    i === 0 ? "border-t-0" : "",
                  ].join(" ")}
                >
                  {/* col 1: name */}
                  <div className="col-span-12 lg:col-span-3">
                    <div className="font-display text-[16px] font-bold text-ink leading-tight">
                      {m.name}
                    </div>
                    <div className="font-mono text-[10.5px] text-ink/55 mt-0.5">
                      {m.org} · {m.released}
                    </div>
                  </div>

                  {/* col 2: pretrain bar */}
                  <div className="col-span-12 lg:col-span-5">
                    <div className="relative h-7 bg-ink/8 border-2 border-ink rounded-md overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-ink transition-all duration-400 ease-spring"
                        style={{ width: `${widthPct}%` }}
                      />
                      <div
                        className="absolute inset-y-0 left-2 right-2 flex items-center justify-between font-mono text-[11px] tabular-nums"
                        aria-hidden
                      >
                        <span className="text-cream font-bold">
                          {m.pretrainTokensT} T tokens
                        </span>
                        <span
                          className={[
                            "font-bold",
                            widthPct < 30 ? "text-ink" : "text-cream/85",
                          ].join(" ")}
                        >
                          × 1 epoch
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* col 3: sft */}
                  <div className="col-span-6 lg:col-span-2 flex lg:justify-center">
                    <div className="px-2.5 py-1 bg-butter border-2 border-ink rounded-md inline-flex items-baseline gap-1.5">
                      <span className="font-display text-[18px] font-bold text-ink leading-none tabular-nums">
                        {m.sftEpoch}
                      </span>
                      <span className="font-mono text-[10px] text-ink/65 uppercase">
                        epoch
                      </span>
                    </div>
                  </div>

                  {/* col 4: post */}
                  <div className="col-span-6 lg:col-span-2 flex lg:justify-center items-center gap-2">
                    {m.postEpoch ? (
                      <div className="px-2.5 py-1 bg-coral border-2 border-ink rounded-md inline-flex items-baseline gap-1.5">
                        <span className="font-display text-[18px] font-bold text-cream leading-none tabular-nums">
                          {m.postEpoch}
                        </span>
                        <span className="font-mono text-[10px] text-cream/80 uppercase">
                          {m.postLabel}
                        </span>
                      </div>
                    ) : (
                      <div className="font-mono text-[10px] text-ink/40">—</div>
                    )}
                  </div>

                  {/* hover 注解条 */}
                  {hovered && (
                    <div className="col-span-12 mt-1.5 px-3 py-2 bg-ink text-cream rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 animate-enter-fade">
                      <span className="font-mono text-[10.5px] text-cream/75 uppercase tracking-[0.15em]">
                        细节
                      </span>
                      <span className="text-[12.5px]">
                        <span className="text-cream/65">SFT: </span>
                        {m.sftSamples ?? "未公开"}
                      </span>
                      {m.highlight && (
                        <span className="text-[12.5px] text-butter">{m.highlight}</span>
                      )}
                      <span className="font-mono text-[10px] text-cream/55 sm:ml-auto">
                        {m.src}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 收尾 callout */}
        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          <CalloutHard
            num="1"
            unit="epoch"
            label="预训练全部如此"
            note="数据太多走不完两遍，2026 年还没人改这个数字。"
          />
          <CalloutHard
            num="2"
            unit="epoch"
            label="SFT 的默认值"
            note="Tulu 3 / Llama 3 后训练 / Qwen3 / Mistral / Gemma 3 都用 2。"
          />
          <CalloutHard
            num="≤3"
            unit="epoch"
            label="后训练上限"
            note="DPO / RLHF / GRPO 一律在 1-3 之间，再多就 reward hack。"
          />
        </div>

        <p className="mt-6 font-mono text-[11px] text-ink/45 leading-relaxed">
          来源：Llama 3 (arXiv:2407.21783) · DeepSeek V3 (arXiv:2412.19437) ·
          Tulu 3 (arXiv:2411.15124) · Qwen3 Tech Report (2025/04) ·
          Mistral release notes · Gemma 3 Tech Report (2025/03)。
        </p>
      </div>
    </section>
  );
};

const CalloutHard: React.FC<{
  num: string;
  unit: string;
  label: string;
  note: string;
}> = ({ num, unit, label, note }) => {
  return (
    <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp p-4">
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="font-display text-[32px] font-bold text-ink leading-none tabular-nums">
          {num}
        </span>
        <span className="font-mono text-[11px] text-ink/55 uppercase tracking-[0.18em]">
          {unit}
        </span>
      </div>
      <div className="font-display text-[14px] font-bold text-ink leading-snug">
        {label}
      </div>
      <p className="text-[12px] text-ink/65 leading-relaxed mt-1">{note}</p>
    </div>
  );
};

export default SectionRealConfigs;
