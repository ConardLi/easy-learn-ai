/**
 * SectionSizes · 主流模型能装多少？
 *
 * 主交互：
 *   - L3 输入框：用户粘自己的代码 / 文档进去，按 4 字符 ≈ 1 token 估算
 *     实时算出 token 数，再算每个模型能装它多少倍
 *   - L0 SVG 横向 bar：直观看各家窗口大小（对数刻度，不然 GPT-4o 被压扁）
 *
 * 数据来源：2026-Q2 各家官方文档 / BenchLM.ai 2026-04 / TokenMix 2026 head-to-head。
 */
import React, { useMemo, useState } from "react";
import { Type, Ruler } from "lucide-react";

type Model = {
  id: string;
  name: string;
  tokens: number; // 单位：token
  color: string;
  text: string;
  note: string;
};

const MODELS: Model[] = [
  {
    id: "gpt4o",
    name: "GPT-4o（旧主力）",
    tokens: 128_000,
    color: "#5A5147",
    text: "#FBEFE3",
    note: "2024 年的标配，现在仍是不少 chatbot 的默认。",
  },
  {
    id: "claude47",
    name: "Claude Opus 4.7",
    tokens: 1_000_000,
    color: "#E07A5F",
    text: "#FBEFE3",
    note: "2026-04 升到 1M，做长代码 / 长文档的口碑最稳。",
  },
  {
    id: "gpt55",
    name: "GPT-5.5",
    tokens: 1_000_000,
    color: "#1B4B5A",
    text: "#FBEFE3",
    note: "2026-04 跟 Opus 同档；输出 128K，比 Claude 多。",
  },
  {
    id: "gemini3",
    name: "Gemini 3 Pro",
    tokens: 2_000_000,
    color: "#7A28CB",
    text: "#FBEFE3",
    note: "目前商业 API 的窗口天花板，多模态吃整本书 / 整个 repo。",
  },
];

const SAMPLE_TEXT = `// 演示：粘你自己的代码 / 文档进来，看 token 数和能塞多少倍
import React, { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}`;

/** 简单估算：英文 / 代码 1 token ≈ 4 char，中文 1 char ≈ 1 token。这里做一个折中。 */
function estimateTokens(text: string): number {
  if (!text) return 0;
  let cjk = 0;
  let other = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3000 && code <= 0x303f) ||
      (code >= 0xff00 && code <= 0xffef)
    ) {
      cjk++;
    } else {
      other++;
    }
  }
  return Math.ceil(cjk + other / 4);
}

const MAX_TOKENS = Math.max(...MODELS.map((m) => m.tokens));

const SectionSizes: React.FC = () => {
  const [text, setText] = useState(SAMPLE_TEXT);
  const tokens = useMemo(() => estimateTokens(text), [text]);
  const chars = text.length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Sizes · 各家有多大</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          128K 到 2M ——
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">2026 主流窗口</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[780px]">
          2024 年大家还在 128K 这一档；2026 主力机型集体跳到 1M，Gemini 把上限推到 2M。
          下面这把对比用对数刻度，不然 GPT-4o 那条会被压成线（128K 跟 2M 差 16 倍）。
          <span className="font-bold text-ink"> 数据来自各家官方 API 文档 / BenchLM.ai 2026-04 横评。</span>
        </p>

        {/* 横向 bar */}
        <div className="mt-12 card-stamp p-6 lg:p-8">
          <div className="flex items-baseline justify-between mb-5">
            <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
              窗口大小 · 对数刻度
            </span>
            <span className="font-mono text-[11px] text-ink/55">单位：token</span>
          </div>
          <div className="space-y-4">
            {MODELS.map((m) => {
              const logMax = Math.log10(MAX_TOKENS);
              const logMin = Math.log10(64_000);
              const ratio = (Math.log10(m.tokens) - logMin) / (logMax - logMin);
              const width = Math.max(8, ratio * 100);
              return (
                <div key={m.id} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 sm:col-span-3">
                    <div className="font-display font-bold text-[15px] text-ink leading-tight">
                      {m.name}
                    </div>
                    <div className="font-mono text-[11px] text-ink/55 mt-0.5">
                      {(m.tokens / 1000).toLocaleString()}K · {(m.tokens / 1_000_000).toFixed(m.tokens >= 1_000_000 ? 1 : 2)}M
                    </div>
                  </div>
                  <div className="col-span-12 sm:col-span-9 relative">
                    <div className="relative h-10 bg-ink/5 border-2 border-ink rounded-xl overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 flex items-center px-3 transition-all duration-500 ease-editorial"
                        style={{ width: `${width}%`, backgroundColor: m.color, color: m.text }}
                      >
                        <span className="font-mono text-[11px] font-bold tracking-[0.12em] truncate">
                          {m.tokens.toLocaleString()} tokens
                        </span>
                      </div>
                    </div>
                    <p className="font-serif italic text-[12.5px] text-ink/65 leading-tight mt-1.5 pl-1">
                      {m.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 对数刻度小注 */}
          <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/20 flex items-center gap-2.5 font-mono text-[10.5px] text-ink/55">
            <Ruler className="w-3.5 h-3.5" strokeWidth={2.2} />
            <span>对数刻度：每往右一格 ≈ 大 4 倍。线性看 GPT-4o 会被压扁到看不见。</span>
          </div>
        </div>

        {/* ─── 输入框估算 ─── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="card-stamp p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-ink" strokeWidth={2.4} />
                  <span className="font-display font-bold text-[16px] text-ink">
                    粘一段你自己的内容
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-ink/55">
                  按 4 字符 ≈ 1 token 估算（中文 1 字 ≈ 1 token）
                </span>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
                spellCheck={false}
                className="w-full font-mono text-[12.5px] leading-[1.7] text-ink bg-cream border-2 border-ink rounded-xl p-3.5 resize-none outline-none focus:shadow-stamp"
              />
              <div className="flex flex-wrap items-center gap-3 mt-3 font-mono text-[11.5px] text-ink/65">
                <span className="px-2.5 py-1 bg-ink text-cream rounded-full">
                  ≈ <strong className="text-butter">{tokens.toLocaleString()}</strong> tokens
                </span>
                <span>·</span>
                <span>{chars.toLocaleString()} 字符</span>
                <button
                  type="button"
                  onClick={() => setText("")}
                  className="ml-auto px-2.5 py-1 border-2 border-ink rounded-full hover:bg-ink hover:text-cream transition-colors duration-200"
                >
                  清空
                </button>
                <button
                  type="button"
                  onClick={() => setText(SAMPLE_TEXT)}
                  className="px-2.5 py-1 border-2 border-ink rounded-full hover:bg-ink hover:text-cream transition-colors duration-200"
                >
                  还原示例
                </button>
              </div>
            </div>
          </div>

          {/* 右：能塞多少倍 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                每个模型能装它多少倍
              </div>
              <div className="space-y-3">
                {MODELS.map((m) => {
                  const fits = tokens === 0 ? 0 : Math.floor(m.tokens / tokens);
                  const cap = 200;
                  const display = fits > cap ? `${cap}+` : fits.toString();
                  return (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 p-3 border-2 border-ink rounded-xl"
                      style={{ backgroundColor: m.color, color: m.text }}
                    >
                      <div className="flex-1">
                        <div className="font-display font-bold text-[13px] leading-tight">
                          {m.name}
                        </div>
                        <div className="font-mono text-[10.5px] opacity-75 mt-0.5">
                          {(m.tokens / 1000).toLocaleString()}K
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-extrabold text-[28px] leading-none">
                          ×{display}
                        </div>
                        <div className="font-mono text-[10px] opacity-75 mt-0.5">份</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-serif italic text-[12.5px] text-ink/65 leading-tight mt-4 pt-3 border-t-2 border-dashed border-ink/20">
                别被「能装多少份」迷惑：装得下 ≠ 模型还能精准记住。看下一节。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSizes;
