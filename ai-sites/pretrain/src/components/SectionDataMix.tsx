/**
 * Section 03 · 训练数据食谱
 *
 * 反相邻：Section 02 用 step trace + tab，这里换 chip 阵列筛选 + 4 个 stacked bar 对比。
 *
 * 4 个真实里程碑模型的预训练数据 mix。点 category chip → 高亮该类在 4 个模型的占比。
 * 点 model bar → 切换 active model，下方账本卡详解。
 *
 * 数据来源已逐条标注。
 */
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

type Category = {
  id: string;
  label: string;
  color: string; // tailwind bg class
  ring: string; // border color when active
  desc: string;
};

const CATEGORIES: Category[] = [
  {
    id: "web",
    label: "网页",
    color: "bg-butter",
    ring: "ring-butter-deep",
    desc: "Common Crawl 筛过的文本，质量参差，但量最大。FineWeb / RedPajama 是公开版本。",
  },
  {
    id: "code",
    label: "代码",
    color: "bg-teal",
    ring: "ring-teal",
    desc: "GitHub / The Stack。增加代码量被发现能涨数学和推理分。",
  },
  {
    id: "books",
    label: "书 / 论文",
    color: "bg-coral",
    ring: "ring-coral",
    desc: "学术论文、教材、Anna's Archive 类目。长篇 + 高知识密度。",
  },
  {
    id: "math",
    label: "数学 / 推理",
    color: "bg-pop",
    ring: "ring-pop",
    desc: "数学题、形式化证明、推理过程。Llama 3 单独把这块拎出来加配比。",
  },
  {
    id: "syn",
    label: "合成",
    color: "bg-butter-deep",
    ring: "ring-ink",
    desc: "大模型自己造的数据。Phi-4 用了 40%，让 14B 顶 70B。",
  },
  {
    id: "multi",
    label: "多语言",
    color: "bg-ink/70",
    ring: "ring-ink",
    desc: "中、阿、印地、东南亚语料。Llama 4 比 Llama 3 多 10×。",
  },
];

type Model = {
  id: string;
  name: string;
  date: string;
  totalT: number; // total tokens in trillion
  mix: Record<string, number>; // category id → percent
  note: string;
  source: string;
};

const MODELS: Model[] = [
  {
    id: "gpt-3",
    name: "GPT-3 (175B)",
    date: "2020",
    totalT: 0.3,
    mix: { web: 82, code: 0, books: 16, math: 0, syn: 0, multi: 2 },
    note: "最早的「大力出奇迹」。300B tokens，按今天的标准严重欠训。",
    source: "Brown et al. 2020 · arXiv:2005.14165 Table 2.2",
  },
  {
    id: "llama3-405b",
    name: "Llama 3.1 405B",
    date: "2024",
    totalT: 15.6,
    mix: { web: 50, code: 17, books: 0, math: 25, syn: 0, multi: 8 },
    note: "第一次把「数学 / 推理」单独立成数据类目，提了 25 个点配比。",
    source: "Meta Llama 3 blog 2024-04 · The Llama 3 Herd arXiv:2407.21783",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek-V3",
    date: "2024",
    totalT: 14.8,
    mix: { web: 55, code: 20, books: 5, math: 15, syn: 0, multi: 5 },
    note: "公开配比少，但相对 V2 把数学和代码进一步拔高，中英外扩 100+ 语言。",
    source: "DeepSeek-V3 Tech Report arXiv:2412.19437 §4.1",
  },
  {
    id: "phi-4",
    name: "Phi-4 (14B)",
    date: "2024",
    totalT: 9.8,
    mix: { web: 30, code: 20, books: 10, math: 0, syn: 40, multi: 0 },
    note: "训练数据 40% 是 GPT-4o 造的合成数据。14B 在数学和推理上吊打 70B 同行。",
    source: "Microsoft Phi-4 Tech Report arXiv:2412.08905 Table 1",
  },
];

const SectionDataMix: React.FC = () => {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState("llama3-405b");

  const active = MODELS.find((m) => m.id === activeModel)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">data-recipe</span>
        </div>

        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-[1.08]">
            训练数据
            <br />
            由哪几类组成？
          </h2>
          <p className="text-[15px] text-ink/75 leading-relaxed max-w-xl">
            数据量本身重要，配比同样重要。点上面 6 个食材标签看四家模型各放了多少；点下方模型条切详情。
          </p>
        </div>

        {/* 6 category chip */}
        <div className="flex flex-wrap gap-2 mb-7">
          {CATEGORIES.map((c) => {
            const on = c.id === activeCat;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(on ? null : c.id)}
                className={[
                  "inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-ink transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:bg-cream",
                ].join(" ")}
              >
                <span
                  className={["w-3 h-3 rounded-sm border border-ink/50", c.color].join(" ")}
                />
                <span className="font-sans text-[13px] font-semibold">
                  {c.label}
                </span>
              </button>
            );
          })}
          {activeCat && (
            <button
              onClick={() => setActiveCat(null)}
              className="px-3 py-2 rounded-full bg-cream border-2 border-dashed border-ink/40 font-mono text-[11px] text-ink/60 hover:bg-white"
            >
              清除筛选 ×
            </button>
          )}
        </div>

        {/* 4 model stacked bar */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            {MODELS.map((m) => {
              const isActive = m.id === activeModel;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModel(m.id)}
                  className={[
                    "w-full text-left bg-white border-2 border-ink rounded-2xl p-4 transition-all duration-300 ease-spring",
                    isActive
                      ? "shadow-stamp-lg -translate-y-0.5"
                      : "shadow-stamp hover:-translate-y-0.5 hover:shadow-stamp-lg",
                  ].join(" ")}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-[17px] font-bold text-ink">
                        {m.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45">
                        {m.date}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-[20px] font-bold text-ink tabular-nums">
                        {m.totalT}
                      </span>
                      <span className="font-mono text-[10px] text-ink/55">
                        T tokens
                      </span>
                    </div>
                  </div>

                  {/* stacked bar */}
                  <div className="h-7 w-full border-2 border-ink rounded-lg overflow-hidden flex">
                    {CATEGORIES.map((c) => {
                      const pct = m.mix[c.id] ?? 0;
                      if (pct === 0) return null;
                      const dim =
                        activeCat !== null && activeCat !== c.id ? "opacity-25" : "opacity-100";
                      return (
                        <div
                          key={c.id}
                          className={[
                            c.color,
                            dim,
                            "h-full transition-opacity duration-300",
                          ].join(" ")}
                          style={{ width: `${pct}%` }}
                          title={`${c.label} · ${pct}%`}
                        />
                      );
                    })}
                  </div>

                  {/* mix 数字注脚 */}
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] text-ink/55">
                    {CATEGORIES.map((c) => {
                      const pct = m.mix[c.id] ?? 0;
                      if (pct === 0) return null;
                      const highlight =
                        activeCat === c.id ? "text-ink font-bold" : "";
                      return (
                        <span key={c.id} className={highlight}>
                          {c.label} {pct}%
                        </span>
                      );
                    })}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 详情卡 */}
          <div className="lg:col-span-5">
            <div
              key={active.id}
              className="bg-ink text-cream rounded-3xl p-6 border-2 border-ink shadow-stamp-xl animate-enter-fade sticky top-12"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 mb-2">
                model · {active.date}
              </div>
              <div className="font-display text-display-lg text-cream leading-tight mb-4">
                {active.name}
              </div>
              <p className="text-[14px] text-cream/85 leading-relaxed mb-5">
                {active.note}
              </p>

              <div className="border-t-2 border-dashed border-cream/20 pt-4 space-y-2">
                {CATEGORIES.filter((c) => (active.mix[c.id] ?? 0) > 0).map((c) => {
                  const pct = active.mix[c.id];
                  return (
                    <div
                      key={c.id}
                      className="flex items-center gap-3"
                    >
                      <span
                        className={[c.color, "w-3 h-3 rounded-sm border border-cream/30"].join(" ")}
                      />
                      <span className="font-sans text-[13px] flex-1">
                        {c.label}
                      </span>
                      <span className="font-mono text-[13px] tabular-nums font-bold">
                        {pct}%
                      </span>
                      <span className="font-mono text-[10px] text-cream/45 w-16 text-right">
                        ≈ {((active.totalT * pct) / 100).toFixed(2)}T
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="mt-5 font-mono text-[10px] text-cream/50 leading-relaxed">
                {active.source}
              </p>
            </div>

            {activeCat && (
              <div className="mt-4 bg-cream border-2 border-ink rounded-2xl p-4 animate-enter-fade">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={[
                      CATEGORIES.find((c) => c.id === activeCat)!.color,
                      "w-3 h-3 rounded-sm border border-ink/40",
                    ].join(" ")}
                  />
                  <span className="font-display text-[15px] font-bold text-ink">
                    {CATEGORIES.find((c) => c.id === activeCat)!.label}
                  </span>
                </div>
                <p className="text-[13px] text-ink/75 leading-relaxed">
                  {CATEGORIES.find((c) => c.id === activeCat)!.desc}
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 font-mono text-[10.5px] text-ink/45 leading-relaxed max-w-3xl">
          多家配比未官方完整公布，以上为论文 + 官方 blog 综合估算。GPT-3 配比 100%
          准确（论文 Table 2.2）；Phi-4 精确到合成数据 40%；DeepSeek 与 Llama 为相对比例估计。
        </p>

        {/* 互链卡：数据快不够用 → MGA 扩数据 */}
        <a
          href="../mga/index.html"
          className="mt-8 inline-flex items-start gap-3 max-w-xl px-5 py-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-4 h-4 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[14px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">数据不够用了怎么办 · MGA</span>
            <span className="text-ink/70">
              {" "}
              能放心拿来训练的干净网页和书就那么多，越训越快见底。一种解法是把已有的好文本换个体裁、换批读者重写一遍，一份扩成好几份 ——
              <strong className="text-ink"> 看《MGA》怎么把语料扩出来</strong>。
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionDataMix;
