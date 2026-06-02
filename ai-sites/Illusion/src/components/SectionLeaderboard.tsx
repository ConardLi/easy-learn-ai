/**
 * Section 06 · 2026 旗舰模型 hallucination 横排
 *
 * 反模板：用手写 SVG 横向 bar + benchmark tab，不是 recharts。
 * 数据来自三个真实公开评测（每个的"幻觉"定义不同 —— 这本身就是 takeaway）。
 *
 * 用户操作：点 tab 切换 benchmark，bar 实时排序、数字渐变。
 */
import React, { useMemo, useState } from "react";

type Bench = "vectara" | "facts" | "aaomni";

const BENCHES: Record<
  Bench,
  { name: string; gist: string; metric: string; lowerBetter: boolean; src: string; date: string }
> = {
  vectara: {
    name: "Vectara HHEM",
    gist: "给一段原文让模型总结，看总结里有多少跟原文对不上的句子（faithfulness）。",
    metric: "hallucination rate %",
    lowerBetter: true,
    src: "Hughes Hallucination Eval Model · vectara.com leaderboard",
    date: "2026-04-20",
  },
  facts: {
    name: "FACTS Grounding",
    gist: "Google DeepMind 2025 出的事实性 grounded summarization 测试，看搜索增强下的事实保真度。",
    metric: "accuracy %",
    lowerBetter: false,
    src: "DeepMind FACTS Grounding · facts-grounding.ai",
    date: "2025-12",
  },
  aaomni: {
    name: "AA-Omniscience",
    gist: "Artificial Analysis 2026 出的应力测试 —— 6000 个长尾事实问题，专门看模型「不知道也答」的程度。",
    metric: "hallucination rate %（不知道时编的比例）",
    lowerBetter: true,
    src: "Artificial Analysis · CometAPI 转载",
    date: "2026-04",
  },
};

type Row = { model: string; vectara: number; facts: number; aaomni: number; family: "openai" | "anthropic" | "google" | "meta" | "deepseek" | "xai" };

/* 数值参考 presenc.ai / dikehomme / cometapi · 取近似值 */
const ROWS: Row[] = [
  { model: "GPT-5.5 Pro", vectara: 1.0, facts: 88, aaomni: 86, family: "openai" },
  { model: "Claude Opus 4.7", vectara: 1.2, facts: 87, aaomni: 36, family: "anthropic" },
  { model: "Claude Sonnet 4.6", vectara: 1.5, facts: 80, aaomni: 38, family: "anthropic" },
  { model: "Gemini 2.5 Pro", vectara: 1.4, facts: 85, aaomni: 50, family: "google" },
  { model: "Gemini 3 Pro", vectara: 13.6, facts: 84, aaomni: 88, family: "google" },
  { model: "GPT-5.4-nano", vectara: 3.1, facts: 70, aaomni: 78, family: "openai" },
  { model: "Llama 4 405B", vectara: 2.3, facts: 76, aaomni: 70, family: "meta" },
  { model: "DeepSeek V4", vectara: 3.4, facts: 72, aaomni: 65, family: "deepseek" },
  { model: "Grok 4.5", vectara: 5.8, facts: 68, aaomni: 60, family: "xai" },
];

const FAMILY_COLOR: Record<Row["family"], string> = {
  openai: "#10A37F",
  anthropic: "#DA7756",
  google: "#4285F4",
  meta: "#0866FF",
  deepseek: "#4D6BFE",
  xai: "#241C15",
};

const FAMILY_LABEL: Record<Row["family"], string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
  meta: "Meta",
  deepseek: "DeepSeek",
  xai: "xAI",
};

const SectionLeaderboard: React.FC = () => {
  const [bench, setBench] = useState<Bench>("vectara");
  const b = BENCHES[bench];

  const sorted = useMemo(() => {
    const rows = [...ROWS];
    rows.sort((a, c) => (b.lowerBetter ? a[bench] - c[bench] : c[bench] - a[bench]));
    return rows;
  }, [bench, b.lowerBetter]);

  const max = useMemo(() => Math.max(...ROWS.map((r) => r[bench])), [bench]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">2026 leaderboard</span>
        </div>

        <h2 className="font-display text-display-lg text-ink leading-tight mb-3 max-w-3xl">
          2026 旗舰模型谁更敢编？
        </h2>
        <p className="max-w-2xl text-[15px] text-ink/70 leading-relaxed mb-8">
          下面三个榜测的不是同一件事 —— 有的测「总结是否偏离原文」，有的测「不知道还硬答的比例」。
          所以换着看就一个结论：「最不爱编」的不一定是「准确率最高」的。切 tab 看排名换没换。
        </p>

        {/* Tab 切 bench */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(Object.keys(BENCHES) as Bench[]).map((k) => {
            const on = bench === k;
            return (
              <button
                key={k}
                onClick={() => setBench(k)}
                className={[
                  "px-4 py-2 border-2 border-ink rounded-full font-mono text-[11px] uppercase tracking-[0.16em] font-bold transition-all duration-200",
                  on
                    ? "bg-ink text-cream shadow-stamp -translate-x-0.5 -translate-y-0.5"
                    : "bg-white text-ink/70 hover:bg-butter-tint",
                ].join(" ")}
              >
                {BENCHES[k].name}
              </button>
            );
          })}
        </div>

        {/* 描述卡 */}
        <div className="bg-white border-2 border-ink rounded-2xl p-4 mb-5 shadow-stamp">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
            <span className="font-display font-bold text-[18px]">{b.name}</span>
            <span className="font-mono text-[10.5px] text-ink/55 uppercase tracking-[0.18em]">
              {b.lowerBetter ? "↓ 越低越好" : "↑ 越高越好"} · {b.date}
            </span>
          </div>
          <p className="text-[13.5px] text-ink/75 leading-relaxed">{b.gist}</p>
        </div>

        {/* Bar chart */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-7" key={bench}>
          <div className="flex items-center justify-between mb-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
            <span>model</span>
            <span>{b.metric}</span>
          </div>

          <div className="space-y-2">
            {sorted.map((r, idx) => {
              const v = r[bench];
              const w = (v / max) * 100;
              const isWinner = idx === 0;
              return (
                <div key={r.model} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-4 flex items-center gap-2 min-w-0">
                    <span
                      className="shrink-0 w-2.5 h-2.5 rounded-full border border-ink"
                      style={{ background: FAMILY_COLOR[r.family] }}
                      title={FAMILY_LABEL[r.family]}
                    />
                    <span
                      className={[
                        "text-[13px] truncate",
                        isWinner ? "font-bold text-ink" : "text-ink/80",
                      ].join(" ")}
                    >
                      {r.model}
                    </span>
                  </div>

                  <div className="col-span-7 relative h-7 bg-ink/5 border border-ink/10 rounded overflow-hidden">
                    <div
                      className={[
                        "absolute inset-y-0 left-0 transition-all duration-700 ease-spring",
                        isWinner ? "bg-teal" : "bg-ink",
                      ].join(" ")}
                      style={{ width: `${w}%` }}
                    />
                    {isWinner && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/85">
                        winner
                      </div>
                    )}
                  </div>

                  <div className="col-span-1 text-right font-display font-bold text-[15px] tabular-nums">
                    {v.toFixed(v < 10 ? 1 : 0)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t-2 border-ink/10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10.5px]">
            {(["openai", "anthropic", "google", "meta", "deepseek", "xai"] as Row["family"][]).map((f) => (
              <div key={f} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full border border-ink"
                  style={{ background: FAMILY_COLOR[f] }}
                />
                <span className="text-ink/65">{FAMILY_LABEL[f]}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 font-mono text-[10.5px] text-ink/50 leading-relaxed">
          src · {b.src}
        </p>

        {/* takeaway 卡 */}
        <div className="mt-7 grid lg:grid-cols-3 gap-4">
          <div className="bg-pop/8 border-2 border-ink rounded-2xl p-4 shadow-stamp">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-pop font-bold mb-1.5">
              0.86 vs 0.36
            </div>
            <p className="text-[13px] text-ink leading-relaxed">
              同样的 AA-Omniscience 题面，GPT-5.5 编的概率是 Claude Opus 4.7 的 2.4 倍。
              GPT 准确率更高，因为它什么都答；Claude 不会就拒。
            </p>
          </div>
          <div className="bg-butter-tint border-2 border-ink rounded-2xl p-4 shadow-stamp">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink font-bold mb-1.5">
              reasoning ↑ ≠ 幻觉 ↓
            </div>
            <p className="text-[13px] text-ink leading-relaxed">
              Vectara 2026 数据：开了 thinking 的 Gemini 3 Pro 13.6% > Gemini 2.5 Flash 3.3%。
              推理步数多了，多出来的步骤也可能变成编造。
            </p>
          </div>
          <div className="bg-teal/8 border-2 border-ink rounded-2xl p-4 shadow-stamp">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-teal font-bold mb-1.5">
              联网 −3× ~ −5×
            </div>
            <p className="text-[13px] text-ink leading-relaxed">
              Presenc 2026 实测：同一 prompt 开了 web search，frontier 模型 hallucination rate 砍到原来的 1/5。
              查得到的就别靠记忆。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLeaderboard;
