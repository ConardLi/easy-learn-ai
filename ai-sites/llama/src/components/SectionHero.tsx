/**
 * Section 01 · Hero
 *
 * 反模板：定义层先给到（H1 是「Llama 是什么？」），右边主交互是
 * 「拖年份 → 当月 Llama 旗舰 + 闭源对手 + 关键事件」三联快照（L3）。
 *
 * 跟 quantization Hero（bit pill）形式不同 —— 这里是连续 slider 拖出快照卡。
 * 跟 transformer Hero（RNN vs Transformer 时序）也不同 —— 那是按帧播，这里是按月跳。
 *
 * 数据来源：
 *   - LLaMA 1 release 2023-02-24, leaked 2023-03-03 · arXiv:2302.13971 / DeepLearning.ai The Batch
 *   - Llama 2 release 2023-07-18 · ai.meta.com/llama2 / 700M MAU 红线 · Llama 2 Community License Section 2
 *   - Llama 3 release 2024-04-18 · ai.meta.com/blog/meta-llama-3
 *   - Llama 3.1 release 2024-07-23 · arXiv:2407.21783
 *   - Llama 3.2 vision/edge release 2024-09-25 · ai.meta.com
 *   - Llama 3.3 70B release 2024-12-06 · meta-llama/llama-models MODEL_CARD.md
 *   - Llama 4 Scout/Maverick release 2025-04-05 · github.com/meta-llama/llama-models/tree/main/models/llama4
 *   - Muse Spark release 2026-04-08（Meta 离开 Llama 品牌）· about.fb.com/news/2026/04
 */
import React, { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

type Snapshot = {
  monthIdx: number; // 自 2023-01 的偏移
  year: string;
  ym: string; // YYYY-MM
  metaModel: {
    name: string;
    sizes: string;
    flag?: string;
    license: "research" | "commercial" | "closed";
  };
  rivals: { name: string; vendor: string }[];
  event?: string;
};

/**
 * 月份 → Meta 当月最新旗舰 + 闭源对手快照
 * 月份取关键转折点 + 几个常态月，避免数组太密
 */
const SNAPSHOTS: Snapshot[] = [
  {
    monthIdx: 1,
    year: "2023",
    ym: "2023-02",
    metaModel: {
      name: "LLaMA 1",
      sizes: "7 / 13 / 33 / 65 B",
      flag: "non-commercial",
      license: "research",
    },
    rivals: [
      { name: "GPT-3.5", vendor: "OpenAI" },
      { name: "Claude 1", vendor: "Anthropic（3 月发）" },
    ],
    event: "Meta 在论文里说 LLaMA-13B 跑分超过 GPT-3 175B（arXiv:2302.13971）",
  },
  {
    monthIdx: 2,
    year: "2023",
    ym: "2023-03",
    metaModel: {
      name: "LLaMA 1（已泄露）",
      sizes: "7 / 13 / 33 / 65 B",
      flag: "leaked on 4chan",
      license: "research",
    },
    rivals: [
      { name: "GPT-4", vendor: "OpenAI" },
      { name: "Claude 1", vendor: "Anthropic" },
    ],
    event: "3-3 4chan 用户 Laminon 泄露权重；3-13 Stanford Alpaca 上线",
  },
  {
    monthIdx: 6,
    year: "2023",
    ym: "2023-07",
    metaModel: {
      name: "Llama 2",
      sizes: "7 / 13 / 70 B",
      flag: "首次允许商用 · MAU < 7 亿",
      license: "commercial",
    },
    rivals: [
      { name: "GPT-4", vendor: "OpenAI" },
      { name: "Claude 2", vendor: "Anthropic" },
    ],
    event: "训 2T tokens · 公开 RLHF + SFT 配方 · 与微软 Azure 联合发布",
  },
  {
    monthIdx: 15,
    year: "2024",
    ym: "2024-04",
    metaModel: {
      name: "Llama 3",
      sizes: "8 / 70 B",
      flag: "训 15T tokens",
      license: "commercial",
    },
    rivals: [
      { name: "GPT-4 Turbo", vendor: "OpenAI" },
      { name: "Claude 3 Opus", vendor: "Anthropic" },
    ],
    event: "8B 跑分超过 Llama 2 70B · 词表从 32K 扩到 128K · 全系上 GQA",
  },
  {
    monthIdx: 18,
    year: "2024",
    ym: "2024-07",
    metaModel: {
      name: "Llama 3.1",
      sizes: "8 / 70 / 405 B",
      flag: "首个开源 405B",
      license: "commercial",
    },
    rivals: [
      { name: "GPT-4o", vendor: "OpenAI" },
      { name: "Claude 3.5 Sonnet", vendor: "Anthropic" },
    ],
    event: "405B 在 MMLU / GSM8K 接近 GPT-4o · 上下文扩到 128K",
  },
  {
    monthIdx: 23,
    year: "2024",
    ym: "2024-12",
    metaModel: {
      name: "Llama 3.3",
      sizes: "70 B（仅 instruct）",
      flag: "重训 alignment 接近 405B",
      license: "commercial",
    },
    rivals: [
      { name: "GPT-4o（12 月版）", vendor: "OpenAI" },
      { name: "Claude 3.5 Sonnet", vendor: "Anthropic" },
    ],
    event: "MMLU 86.0 vs Llama 3.1 405B 87.3 · 1/5 激活参数追到 1 分内",
  },
  {
    monthIdx: 27,
    year: "2025",
    ym: "2025-04",
    metaModel: {
      name: "Llama 4 Scout / Maverick",
      sizes: "17B active · 109 / 400 B total",
      flag: "MoE + 原生多模态",
      license: "commercial",
    },
    rivals: [
      { name: "GPT-4.5", vendor: "OpenAI" },
      { name: "Claude 3.7 Sonnet", vendor: "Anthropic" },
    ],
    event: "首个 MoE Llama · Scout 10M context · Behemoth 同日宣布「还在训」",
  },
  {
    monthIdx: 39,
    year: "2026",
    ym: "2026-04",
    metaModel: {
      name: "Muse Spark（不再叫 Llama）",
      sizes: "未公开",
      flag: "Meta 改闭源 · Llama 暂停",
      license: "closed",
    },
    rivals: [
      { name: "GPT-5.4", vendor: "OpenAI" },
      { name: "Claude Opus 4.7", vendor: "Anthropic" },
    ],
    event: "Meta Superintelligence Labs 推 Muse Spark 顶替 Llama 旗舰位 · Behemoth 仍未发",
  },
];

const TOTAL_MONTHS = SNAPSHOTS[SNAPSHOTS.length - 1].monthIdx;

const SectionHero: React.FC = () => {
  const [pos, setPos] = useState(15); // 默认 2024-04（Llama 3 发布月）

  const snap = useMemo(() => {
    /* 找 monthIdx ≤ pos 的最后一个 snapshot（"上一个仍在持续的旗舰"） */
    let chosen = SNAPSHOTS[0];
    for (const s of SNAPSHOTS) {
      if (s.monthIdx <= pos) chosen = s;
    }
    return chosen;
  }, [pos]);

  const flagTone =
    snap.metaModel.license === "research"
      ? "bg-coral text-cream"
      : snap.metaModel.license === "closed"
        ? "bg-ink text-cream"
        : "bg-butter text-ink";

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-teal border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-coral border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Llama · Meta 大模型系列
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              Llama
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
                  Meta 从 2023 年开始开源的一系列大模型，按 1 / 2 / 3 / 4 编号，是全球下载量最高的开源 LLM。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                由 Meta（也就是 Facebook 的母公司）训练。跟 GPT 不一样，权重不藏在 API 后面，直接放给你下载。
              </p>
              <p>
                架构是 decoder-only transformer，跟 GPT 是同一类。Llama 1 起就用 RMSNorm + SwiGLU + RoPE 三件套，后面每代加新招。
              </p>
              <p>
                到 2026 年，Llama 已经发了 4 代。Llama 4 是首个 MoE + 原生多模态版本。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边那块卡，拖一下月份，看当月 Meta 的 Llama 旗舰是哪一代，对手又是谁。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 章 · ~12 分钟
              </div>
            </div>
          </div>

          {/* 右：年份 slider 快照卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 顶部：当月日期 + license tag */}
              <div className="flex items-baseline justify-between mb-1.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  当月时间
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[34px] lg:text-[40px] font-bold text-ink leading-none tabular-nums">
                    {snap.ym}
                  </span>
                </div>
              </div>

              {/* slider */}
              <div className="mb-6">
                <input
                  type="range"
                  min={1}
                  max={TOTAL_MONTHS}
                  step={1}
                  value={pos}
                  onChange={(e) => setPos(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer"
                  aria-label="拖动选择月份"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-ink/45">
                  <span>2023-02</span>
                  <span>2024-04</span>
                  <span>2025-04</span>
                  <span>2026-04</span>
                </div>
                {/* 8 个事件锚点 dot */}
                <div className="relative h-3 mt-1">
                  {SNAPSHOTS.map((s) => {
                    const left = ((s.monthIdx - 1) / (TOTAL_MONTHS - 1)) * 100;
                    const isActive = s.monthIdx === snap.monthIdx;
                    return (
                      <button
                        key={s.ym}
                        onClick={() => setPos(s.monthIdx)}
                        className="absolute top-0 -translate-x-1/2 transition-transform duration-200 ease-spring hover:scale-125"
                        style={{ left: `${left}%` }}
                        title={`${s.ym} · ${s.metaModel.name}`}
                      >
                        <span
                          className={[
                            "block w-2.5 h-2.5 rounded-full border-2 border-ink",
                            isActive ? "bg-coral" : "bg-white",
                          ].join(" ")}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 主快照卡 · Meta 旗舰 */}
              <div
                key={snap.ym + "-meta"}
                className="bg-cream border-2 border-ink rounded-2xl p-4 lg:p-5 mb-3 animate-enter-fade"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    Meta 旗舰
                  </span>
                  <span
                    className={[
                      "font-mono text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border-2 border-ink",
                      flagTone,
                    ].join(" ")}
                  >
                    {snap.metaModel.flag ?? snap.metaModel.license}
                  </span>
                </div>
                <div className="font-display text-[26px] lg:text-[30px] font-bold text-ink leading-tight mb-1">
                  {snap.metaModel.name}
                </div>
                <div className="font-mono text-[12px] text-ink/65 mb-2">
                  {snap.metaModel.sizes}
                </div>
                {snap.event && (
                  <p className="text-[13.5px] text-ink/75 leading-relaxed">{snap.event}</p>
                )}
              </div>

              {/* 闭源对手 */}
              <div
                key={snap.ym + "-rivals"}
                className="grid grid-cols-2 gap-2.5 animate-enter-fade"
              >
                {snap.rivals.map((r) => (
                  <div
                    key={r.name}
                    className="bg-white border-2 border-ink rounded-xl p-3"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
                      闭源对手
                    </div>
                    <div className="font-display text-[15px] font-bold text-ink leading-tight">
                      {r.name}
                    </div>
                    <div className="font-mono text-[11px] text-ink/55">{r.vendor}</div>
                  </div>
                ))}
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                来源：arXiv:2302.13971 / 2407.21783 · ai.meta.com/blog · about.fb.com/news 2026-04
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
