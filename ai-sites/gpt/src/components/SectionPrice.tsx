/**
 * Section 05 · 7 年价格演化 · 不是直线下跌
 *
 * 主交互（L3）：滑块拖「每月用多少 M token」，看 11 代 GPT 的真实账单
 * 次交互（L2）：直接点 ladder 上的一行切代际，右侧详情切换
 *
 * 关键叙事：
 *   ─ GPT-3 davinci 2020 → GPT-4o 2024 价格连降 12×（$60 → $5 / 1M token）
 *   ─ 但 2025 开始反向爬 —— GPT-5 $1.25 / $10，5.4 $2.5 / $15，5.5 $5 / $30
 *   ─ 5.5 Pro $30 / $180 重回 4 字头大价
 *
 * 价格来源：
 *   ─ GPT-3 davinci: OpenAI 2020 launch ($0.06/1K)
 *   ─ GPT-3.5 turbo: OpenAI 2023-03 ($0.0015/$0.002 per 1K)
 *   ─ GPT-4: 2023-03 launch ($0.03/$0.06 per 1K · 8K ctx)
 *   ─ GPT-4 Turbo: 2023-11 ($0.01/$0.03)
 *   ─ GPT-4o: 2024-05 launch ($0.005/$0.015)
 *   ─ GPT-4.1: 2025-04-14 ($2/$8 per 1M)
 *   ─ o1: 2024-12 ($15/$60)
 *   ─ GPT-5 / 5.4 / 5.5 / 5.5 Pro: openai.com/api/pricing 抓取 2026/05
 */
import React, { useState } from "react";

type Gen = {
  id: string;
  name: string;
  date: string;
  input: number; /* per 1M token, USD */
  output: number;
  tone: string;
  highlight?: boolean;
  note: string;
};

const GENS: Gen[] = [
  { id: "g3d", name: "GPT-3 davinci", date: "2020-05", input: 60, output: 60, tone: "#88837C", note: "175B 全量 · $0.06/1K · 同价计算输入输出" },
  { id: "g35", name: "GPT-3.5 turbo", date: "2023-03", input: 1.5, output: 2.0, tone: "#88837C", note: "首支廉价对话模型 · $0.0015/$0.002 per 1K" },
  { id: "g4", name: "GPT-4 (8K)", date: "2023-03", input: 30, output: 60, tone: "#241C15", note: "首支多模态 · 输出每百万 $60" },
  { id: "g4t", name: "GPT-4 Turbo", date: "2023-11", input: 10, output: 30, tone: "#241C15", note: "128K 上下文 · 一刀砍到 1/3" },
  { id: "g4o", name: "GPT-4o", date: "2024-05", input: 5, output: 15, tone: "#241C15", highlight: true, note: "原生多模态 · 后期再降到 $2.5/$10" },
  { id: "o1", name: "o1", date: "2024-12", input: 15, output: 60, tone: "#1B4B5A", note: "reasoning 贵 · 思考 token 算 output" },
  { id: "g41", name: "GPT-4.1", date: "2025-04", input: 2, output: 8, tone: "#241C15", note: "1M ctx · 比 4o 还便宜 · API 专供" },
  { id: "g5", name: "GPT-5", date: "2025-08", input: 1.25, output: 10, tone: "#E07A5F", highlight: true, note: "三合一 · input 价历史最低" },
  { id: "g54", name: "GPT-5.4", date: "2026-03", input: 2.5, output: 15, tone: "#E07A5F", note: "5 的「Sonnet 版」 · 价格翻倍" },
  { id: "g55", name: "GPT-5.5", date: "2026-04", input: 5, output: 30, tone: "#FF4D74", highlight: true, note: "回到 4 字头大价 · 1.05M 上下文" },
  { id: "g55p", name: "GPT-5.5 Pro", date: "2026-04", input: 30, output: 180, tone: "#FF4D74", note: "高精度变体 · output $180 历史最高" },
];

const MAX_PRICE = 200; /* 用于 log scale 归一 */

/* 对数刻度把 [$0.10, $200] 映射到 0~1 */
function logScale(p: number): number {
  const min = 0.5;
  const max = MAX_PRICE;
  return (Math.log10(p + min) - Math.log10(min)) / (Math.log10(max + min) - Math.log10(min));
}

const SectionPrice: React.FC = () => {
  const [gid, setGid] = useState("g5");
  const [mtok, setMtok] = useState(20); /* 每月 M token */
  const g = GENS.find((x) => x.id === gid)!;

  /* 假设 30% input / 70% output（典型对话产品） */
  const monthlyCost = (g.input * mtok * 0.3 + g.output * mtok * 0.7);
  const gpt3RefCost = 60 * mtok; /* 全 davinci 同价 */

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">price · 6 years</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-4">
              价格不是一路降，
              <br />
              <span className="bg-pop/20 px-1.5">2024 触底，现在又开始爬。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              GPT-3 davinci 上线时 1 M token $60，到 GPT-4o 砍到 $5 / $15。
              本以为会继续往下，结果 GPT-5 $1.25 / $10 是最后一个低点 —— 5.4、5.5 价格翻番，
              5.5 Pro 输出回到 $180。OpenAI 正在分层定价。
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                单位
              </div>
              <p className="font-display text-[15px] font-bold text-ink leading-snug mb-1">
                $ / 1 M token
              </p>
              <p className="font-mono text-[11px] text-ink/55 leading-relaxed">
                1 M token ≈ 75 万英文词 ≈《哈利波特 1》的 7 倍。横轴是对数 ——
                每往右一格，价钱涨 10 倍。
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* 左：ladder 价格条 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 11 代模型 · 输入 / 输出 价对数刻度
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-ink/55">
                  <span className="inline-block w-3 h-2 bg-ink/45 rounded-sm" />
                  input
                  <span className="inline-block w-3 h-2 bg-coral rounded-sm ml-1" />
                  output
                </div>
              </div>

              {/* log scale axis ticks */}
              <div className="relative h-5 mb-1">
                {[0.5, 1, 10, 100].map((tick) => (
                  <div
                    key={tick}
                    className="absolute top-0 font-mono text-[9.5px] text-ink/45"
                    style={{ left: `${28 + logScale(tick) * 70}%`, transform: "translateX(-50%)" }}
                  >
                    ${tick < 1 ? "0.5" : tick}
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                {GENS.map((x) => {
                  const on = x.id === gid;
                  return (
                    <button
                      key={x.id}
                      onClick={() => setGid(x.id)}
                      className={[
                        "w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200",
                        on ? "bg-cream border-2 border-ink shadow-[3px_3px_0_0_#241C15]" : "hover:bg-cream/60 border-2 border-transparent",
                      ].join(" ")}
                    >
                      <div className="w-24 shrink-0">
                        <div
                          className="font-mono text-[11px] font-bold leading-tight"
                          style={{ color: on ? x.tone : "#241C15" }}
                        >
                          {x.name}
                        </div>
                        <div className="font-mono text-[9px] text-ink/50">{x.date}</div>
                      </div>

                      <div className="flex-1 relative h-6 bg-cream/50 border border-ink/25 rounded">
                        {/* input bar */}
                        <div
                          className="absolute top-0 left-0 h-3 bg-ink/45 rounded-tl rounded-bl transition-all duration-300"
                          style={{ width: `${logScale(x.input) * 100}%` }}
                          title={`input $${x.input}`}
                        />
                        {/* output bar */}
                        <div
                          className="absolute bottom-0 left-0 h-3 rounded-bl rounded-tl transition-all duration-300"
                          style={{ width: `${logScale(x.output) * 100}%`, backgroundColor: x.tone }}
                          title={`output $${x.output}`}
                        />
                      </div>

                      <div className="w-20 shrink-0 text-right font-mono text-[11px] tabular-nums">
                        <div className="text-ink/65">${x.input}</div>
                        <div className="font-bold" style={{ color: x.tone }}>
                          ${x.output}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 font-mono text-[10px] text-ink/45 text-center">
                ↑ 点任一行切右侧详情。价格来源：openai.com/api/pricing 2026-05 抓取
              </p>
            </div>
          </div>

          {/* 右：选中代 + 真实成本算例 */}
          <div className="lg:col-span-5 space-y-4">
            <div
              key={gid}
              className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 animate-enter-fade"
            >
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    {g.date}
                  </div>
                  <h3 className="font-display text-[26px] font-bold text-ink leading-tight">
                    {g.name}
                  </h3>
                </div>
                {g.highlight && (
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-cream bg-pop px-2 py-1 border-2 border-ink rounded">
                    转折点
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-cream/60 border-2 border-ink rounded-xl">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    input
                  </div>
                  <div className="font-display text-[24px] font-bold text-ink/85 tabular-nums">
                    ${g.input}
                  </div>
                  <div className="font-mono text-[9.5px] text-ink/45">每 M token</div>
                </div>
                <div className="p-3 bg-cream/60 border-2 border-ink rounded-xl">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    output
                  </div>
                  <div
                    className="font-display text-[24px] font-bold tabular-nums"
                    style={{ color: g.tone }}
                  >
                    ${g.output}
                  </div>
                  <div className="font-mono text-[9.5px] text-ink/45">每 M token</div>
                </div>
              </div>

              <p className="font-mono text-[11.5px] text-ink/70 leading-relaxed bg-cream/60 border-2 border-ink/15 rounded-lg p-3">
                {g.note}
              </p>
            </div>

            {/* 算例 slider */}
            <div className="bg-butter/30 border-2 border-ink rounded-2xl shadow-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                ② 算一笔账：每月用 {mtok} M token（30% in / 70% out）
              </div>
              <input
                type="range"
                min={1}
                max={200}
                step={1}
                value={mtok}
                onChange={(e) => setMtok(parseInt(e.target.value))}
                className="w-full accent-coral cursor-pointer mt-1"
                aria-label="每月用量 M token"
              />
              <div className="flex justify-between font-mono text-[10px] text-ink/45 mb-3">
                <span>1 M</span>
                <span>50 M</span>
                <span>100 M</span>
                <span>200 M</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    {g.name} 月账
                  </div>
                  <div className="font-display text-[26px] font-bold text-ink tabular-nums">
                    ${monthlyCost.toFixed(0).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    GPT-3 davinci 同量级
                  </div>
                  <div className="font-display text-[20px] font-bold text-ink/55 tabular-nums">
                    ${gpt3RefCost.toFixed(0).toLocaleString()}
                  </div>
                  <div className="font-mono text-[10px] text-coral mt-0.5">
                    便宜 {(gpt3RefCost / monthlyCost).toFixed(1)}×
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPrice;
