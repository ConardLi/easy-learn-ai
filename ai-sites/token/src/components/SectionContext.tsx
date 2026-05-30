/**
 * Section 06 · Context window · 模型一次能"看"多少 token
 *
 * 反相邻：§05 已经是 slider + bar chart。这里改用：
 *   ─ 主交互：模式 pill 切换（短信 / 文章 / 小说 / 整本书 / 代码库 / 视频）→
 *     6 个 size 长条 hover 同步显示「能装多少个」
 *   ─ 副交互：点 size 看哪些模型在这条线上
 *
 * 数据来源 2026/05：
 *   ─ devtk.ai / tokenmix.ai / wildandfreetools.com / aioutlooks.com
 *   ─ benchlm.ai 2026/04 advertised vs effective
 *
 * 真实大小（log 比例画图）：
 *   4K · 32K · 128K · 200K · 1M · 10M
 */
import React, { useState } from "react";

type Mode = {
  key: string;
  label: string;
  unitLabel: string; // 一个 unit 占多少 token
  unitTokens: number;
  hint: string;
};

const MODES: Mode[] = [
  {
    key: "sms",
    label: "短信",
    unitLabel: "条 160 字短信",
    unitTokens: 200,
    hint: "一条 160 字短信约 200 token",
  },
  {
    key: "article",
    label: "文章",
    unitLabel: "篇 1500 字博客",
    unitTokens: 2_000,
    hint: "一篇 1500 字博客约 2k token",
  },
  {
    key: "novel",
    label: "整本小说",
    unitTokens: 100_000,
    unitLabel: "本 10 万字小说",
    hint: "一本中长篇小说 ~10 万字 ≈ 100k token",
  },
  {
    key: "code",
    label: "代码库",
    unitLabel: "个 5 万行 repo",
    unitTokens: 250_000,
    hint: "5 万行 TypeScript 中型 repo ≈ 250k token",
  },
  {
    key: "movie",
    label: "电影字幕",
    unitLabel: "部 2h 电影字幕",
    unitTokens: 20_000,
    hint: "一部 2 小时电影台词约 20k token",
  },
];

type Window = {
  size: number;
  label: string;
  models: string[];
  notes: string;
  tone: string;
};

const WINDOWS: Window[] = [
  {
    size: 4_000,
    label: "4K",
    models: ["GPT-3.5 老版", "Llama 2 base"],
    notes: "2022 标配 · 今天看像石器时代",
    tone: "bg-ink/20",
  },
  {
    size: 32_000,
    label: "32K",
    models: ["GPT-4 32k", "Mixtral 8x7B"],
    notes: "2023 高端 · 一份长合同够用",
    tone: "bg-teal/30",
  },
  {
    size: 128_000,
    label: "128K",
    models: ["GPT-4 Turbo", "Mistral Large 3", "DeepSeek V3"],
    notes: "2024 主流 · 一本短小说",
    tone: "bg-butter",
  },
  {
    size: 200_000,
    label: "200K",
    models: ["Claude Haiku 4.5", "Claude Sonnet 4 老版", "GLM-5.1"],
    notes: "Claude 长期主战场 · 一本中长篇",
    tone: "bg-coral",
  },
  {
    size: 1_000_000,
    label: "1M",
    models: [
      "GPT-5.5",
      "Claude Opus 4.7",
      "Gemini 3.1 Pro",
      "DeepSeek V4 Pro",
      "Llama 4 Maverick",
      "Grok 4 (2M)",
    ],
    notes: "2026 旗舰标配 · 一整个代码库 / 5-7 本书",
    tone: "bg-pop",
  },
  {
    size: 10_000_000,
    label: "10M",
    models: ["Llama 4 Scout", "Gemini 2.5 Pro 实验"],
    notes: "理论上限 · 100+ 本书 · 实际用很贵",
    tone: "bg-ink",
  },
];

const TONE_TEXT: Record<string, string> = {
  "bg-ink/20": "text-ink",
  "bg-teal/30": "text-ink",
  "bg-butter": "text-ink",
  "bg-coral": "text-cream",
  "bg-pop": "text-cream",
  "bg-ink": "text-cream",
};

/* log-scale：把 4k → 10M 映射到 0-100% 宽度 */
function logPct(size: number) {
  const min = Math.log10(4_000);
  const max = Math.log10(10_000_000);
  return ((Math.log10(size) - min) / (max - min)) * 100;
}

const SectionContext: React.FC = () => {
  const [modeKey, setModeKey] = useState(MODES[2].key);
  const [activeSize, setActiveSize] = useState<number | null>(1_000_000);

  const mode = MODES.find((m) => m.key === modeKey)!;
  const activeWin = WINDOWS.find((w) => w.size === activeSize) ?? null;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 06</span>
          <span className="section-anchor-label">window · 模型一次能看多少</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          context window = 模型一次能盯着多少 token。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          从 2022 年的 4K（一封邮件）到 2026 年的 10M（100 本小说）。
          下面是 log 刻度的长条对比 —— 切换不同「单位」看每条窗口能装多少个。
        </p>

        {/* 模式 pill */}
        <div className="flex flex-wrap gap-2 mb-7">
          {MODES.map((m) => {
            const on = m.key === modeKey;
            return (
              <button
                key={m.key}
                onClick={() => setModeKey(m.key)}
                className={[
                  "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:bg-butter",
                ].join(" ")}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* bar 卡 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                现在显示：能装多少 {mode.label}
              </div>
              <div className="font-display text-[14.5px] font-bold text-ink">
                {mode.hint}
              </div>
            </div>
            <div className="font-mono text-[10px] text-ink/45">
              横轴 log10 · 4K ~ 10M 跨 3.4 个数量级
            </div>
          </div>

          {/* 刻度线 */}
          <div className="relative mb-4 hidden sm:block">
            <div className="absolute inset-0 flex justify-between font-mono text-[9px] text-ink/40">
              {[4_000, 32_000, 128_000, 1_000_000, 10_000_000].map((m) => (
                <div
                  key={m}
                  className="flex flex-col items-center"
                  style={{ position: "absolute", left: `${logPct(m)}%`, transform: "translateX(-50%)" }}
                >
                  <span>{m >= 1_000_000 ? `${m / 1_000_000}M` : `${m / 1_000}K`}</span>
                </div>
              ))}
            </div>
            <div className="h-3" />
          </div>

          {/* 长条 */}
          <div className="space-y-3" key={`bars-${modeKey}`}>
            {WINDOWS.map((w) => {
              const pct = logPct(w.size);
              const units = w.size / mode.unitTokens;
              const isActive = activeSize === w.size;
              return (
                <button
                  key={w.size}
                  onClick={() => setActiveSize(w.size)}
                  className="w-full text-left grid grid-cols-12 gap-3 items-center group"
                >
                  {/* label */}
                  <div className="col-span-2 sm:col-span-1">
                    <span
                      className={[
                        "inline-flex items-center justify-center min-w-[44px] px-2 py-1 rounded-md border-2 border-ink font-mono text-[11.5px] font-bold transition-all",
                        isActive ? "bg-ink text-cream shadow-stamp" : "bg-cream text-ink",
                      ].join(" ")}
                    >
                      {w.label}
                    </span>
                  </div>
                  {/* bar */}
                  <div className="col-span-7 sm:col-span-8 relative h-8">
                    <div className="absolute inset-0 rounded-md border-2 border-ink/15 bg-cream overflow-hidden">
                      <div
                        className={[
                          "h-full border-r-2 transition-all duration-500 ease-spring",
                          w.tone,
                          isActive ? "border-ink" : "border-ink/40",
                          isActive ? "" : "opacity-80 group-hover:opacity-100",
                        ].join(" ")}
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                  </div>
                  {/* unit count */}
                  <div className="col-span-3 sm:col-span-3 text-right">
                    <span
                      className={[
                        "font-display font-bold tabular-nums leading-none",
                        units >= 1 ? "text-[15px] sm:text-[17px] text-ink" : "text-[13px] text-ink/50",
                      ].join(" ")}
                    >
                      {units >= 1
                        ? `${units >= 100 ? Math.round(units) : units.toFixed(units >= 10 ? 0 : 1)}`
                        : `~${(units * 100).toFixed(0)}%`}
                    </span>
                    <span className="ml-1 font-mono text-[10px] text-ink/50">
                      {units >= 1 ? mode.unitLabel.split(" ")[0] : "条"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 选中后展开 · 哪些模型 + 备注 */}
          {activeWin && (
            <div className="mt-7 pt-6 border-t border-ink/10" key={activeWin.size}>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className={[
                    "inline-flex items-center px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[12px] font-bold",
                    activeWin.tone,
                    TONE_TEXT[activeWin.tone] || "text-ink",
                  ].join(" ")}
                >
                  {activeWin.label}
                </span>
                <div className="font-display text-[16px] font-bold text-ink leading-tight">
                  {activeWin.size.toLocaleString()} tokens · {activeWin.notes}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {activeWin.models.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-cream border-2 border-ink/30 font-mono text-[11px] font-bold text-ink"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 font-mono text-[10px] text-ink/40">
            来源：tokenmix.ai 2026/04 · benchlm.ai 2026/04 advertised vs effective · devtk.ai
          </p>
        </div>

        {/* 注意事项 */}
        <div className="mt-8 grid md:grid-cols-2 gap-4 font-sans text-[13px] text-ink/75 leading-relaxed">
          <p>
            <strong className="text-ink">大 ≠ 一定好用：</strong>
            10M 标称的 Llama 4 Scout 实测在中段「lost in the middle」严重。1M 的 Gemini 3.1 Pro 在 500K-1M 段反而稳。
          </p>
          <p>
            <strong className="text-ink">大 = 一定更贵：</strong>
            塞满 1M context 调用一次 GPT-5.5 大约 $5。同样塞满 Gemini 2.5 Flash 只要 $0.15 —— 差 33×。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionContext;
