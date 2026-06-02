/**
 * Section 05 · 怎么知道它在编 · SelfCheckGPT 风格一致性可视化
 *
 * 反模板：拒绝重复 deepseek-r1 的"think 流式"、bert 的"top-k 候选柱"、
 * rag 的"chunk hover"。这里做的是 N 次采样的「一致性热力图」+ 简化 NLI 比对。
 *
 * 左 = 4 个检测方法 chip 切换；
 * 右 = 选中方法对应的可视化（默认 SelfCheckGPT 一致性矩阵 5x5，hover 单元看 sentence）。
 */
import React, { useState } from "react";
import { Layers, FileSearch, Activity, Wrench } from "lucide-react";

type Method = "sample" | "rag" | "logit" | "tool";

const METHODS: Record<
  Method,
  { name: string; en: string; how: string; pro: string; con: string; icon: React.ReactNode }
> = {
  sample: {
    name: "采样一致性",
    en: "SelfCheckGPT · Manakul 2023",
    how: "同一个问题让模型再答 N 次，把这 N 个答案两两比一致性。如果它「知道」答案，N 次回答会高度一致；如果它在编，N 次会四散。",
    pro: "不需要任何外部知识库，模型黑盒就能跑",
    con: "贵 —— 一次提问要付 N+1 次的钱",
    icon: <Layers className="w-4 h-4" strokeWidth={2.4} />,
  },
  rag: {
    name: "拿证据比对",
    en: "Retrieval-grounded · FactScore",
    how: "把模型答案的每个原子事实抽出来，去知识库 / 搜索引擎查一遍。能找到证据 → 真；找不到或者矛盾 → 编。",
    pro: "精度最高，能溯源到具体文档",
    con: "依赖知识库覆盖度，覆盖不到的领域照样翻车",
    icon: <FileSearch className="w-4 h-4" strokeWidth={2.4} />,
  },
  logit: {
    name: "看模型有多犹豫（logit 熵）",
    en: "Logit-based · token-level entropy",
    how: "模型每写一个字，内部都有一堆候选概率。它越「犹豫」（这堆概率越散，也就是 logit 熵越高），这个字越可能是编的；越笃定（熵低）越稳 —— 但笃定不等于答对。",
    pro: "只用一次推理，便宜",
    con: "得能看到模型内部的概率（白盒）；闭源 API 拿不到",
    icon: <Activity className="w-4 h-4" strokeWidth={2.4} />,
  },
  tool: {
    name: "工具自验",
    en: "Tool-augmented verifier",
    how: "训练一个 verifier 或让模型自己调计算器、数据库、搜索 API。算 19×27 不靠脑算，靠工具拿真答案。",
    pro: "对数学 / 代码 / 实时事实最有效",
    con: "依赖工具可用、调对了 API",
    icon: <Wrench className="w-4 h-4" strokeWidth={2.4} />,
  },
};

/* 5 次采样答案 · "马拉松世界纪录由谁保持？" 真值 = Kelvin Kiptum 2:00:35 (2023-10) */
const SAMPLES_ANSWERS = [
  "Kelvin Kiptum 在 2023 年芝加哥马拉松创下 2:00:35。",
  "Kelvin Kiptum，2023 年芝加哥，成绩 2 小时 35 秒。",
  "Eliud Kipchoge，2:01:09，柏林 2022。", // 编（被 Kiptum 打破）
  "Kelvin Kiptum，2023-10 芝加哥，2:00:35。",
  "Berhanu Legese，2022 年柏林，2:00:12。", // 整个都是编
];

/* 简化一致性矩阵 · 0 = 完全冲突，5 = 完全一致 */
const CONSISTENCY: number[][] = [
  [5, 5, 1, 5, 0],
  [5, 5, 1, 5, 0],
  [1, 1, 5, 1, 2],
  [5, 5, 1, 5, 0],
  [0, 0, 2, 0, 5],
];

const colorOf = (v: number) => {
  if (v >= 5) return "bg-teal";
  if (v >= 4) return "bg-teal/70";
  if (v >= 3) return "bg-butter-deep";
  if (v >= 2) return "bg-coral/65";
  return "bg-pop";
};

const SelfCheckVis: React.FC = () => {
  const [hover, setHover] = useState<{ i: number; j: number } | null>(null);

  /* 算每行平均一致性 → 单条幻觉风险 */
  const rowAvg = (i: number) =>
    Math.round((CONSISTENCY[i].reduce((a, b) => a + b, 0) - 5) / 4 / 5 * 100) / 100;

  return (
    <div>
      <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 mb-2.5">
        Q · 男子马拉松世界纪录 · N=5 次采样
      </div>

      <div className="space-y-1.5 mb-5">
        {SAMPLES_ANSWERS.map((a, i) => (
          <div
            key={i}
            className={[
              "flex items-start gap-2 px-2.5 py-1.5 border-2 border-ink rounded-lg transition-all duration-200",
              hover?.i === i || hover?.j === i ? "bg-butter-tint" : "bg-white",
            ].join(" ")}
          >
            <span className="font-mono text-[10px] font-bold w-4 shrink-0 text-ink/55 mt-0.5">
              {i + 1}
            </span>
            <span className="text-[12.5px] leading-relaxed flex-1">{a}</span>
            <span
              className={[
                "font-mono text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded",
                rowAvg(i) > 0.6 ? "bg-teal/15 text-teal" : "bg-pop/15 text-pop",
              ].join(" ")}
            >
              {rowAvg(i) > 0.6 ? "稳" : "疑"}
            </span>
          </div>
        ))}
      </div>

      {/* 一致性矩阵 */}
      <div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
          两两一致性矩阵 · 红 = 互相矛盾
        </div>
        <div className="inline-flex flex-col items-start">
          <div className="flex">
            <div className="w-7" />
            {[1, 2, 3, 4, 5].map((c) => (
              <div
                key={c}
                className="w-9 h-6 flex items-center justify-center font-mono text-[10px] text-ink/55"
              >
                #{c}
              </div>
            ))}
          </div>
          {CONSISTENCY.map((row, i) => (
            <div key={i} className="flex">
              <div className="w-7 h-9 flex items-center justify-center font-mono text-[10px] text-ink/55">
                #{i + 1}
              </div>
              {row.map((v, j) => (
                <div
                  key={j}
                  onMouseEnter={() => setHover({ i, j })}
                  onMouseLeave={() => setHover(null)}
                  className={[
                    "w-9 h-9 m-0.5 flex items-center justify-center border-2 border-ink rounded font-mono text-[10px] font-bold text-cream transition-all cursor-pointer",
                    colorOf(v),
                    hover?.i === i && hover?.j === j ? "scale-110" : "",
                  ].join(" ")}
                >
                  {v}
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-3 font-mono text-[10.5px] text-ink/60 leading-relaxed">
          → 答案 #3 / #5 跟其他答案严重冲突 ⇒ 标记为幻觉嫌疑。
          {hover && (
            <span className="ml-2 text-ink">
              · 选中 ({hover.i + 1}, {hover.j + 1}) → 一致度 {CONSISTENCY[hover.i][hover.j]}/5
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

const RagVis: React.FC = () => (
  <div>
    <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 mb-2.5">
      Atomic fact extraction → KB lookup
    </div>
    <div className="space-y-2">
      {[
        { fact: "莎士比亚生于 1564 年", verdict: "yes", note: "剑桥大学档案" },
        { fact: "莎士比亚生于斯特拉特福", verdict: "yes", note: "Wikipedia" },
        { fact: "莎士比亚 38 岁时写完《哈姆雷特》", verdict: "no", note: "实际约 36 岁" },
        { fact: "莎士比亚是诺贝尔文学奖得主", verdict: "miss", note: "诺奖 1901 才设立" },
      ].map((f, i) => (
        <div
          key={i}
          className={[
            "flex items-center gap-2.5 px-3 py-2 border-2 border-ink rounded-lg",
            f.verdict === "yes" ? "bg-teal/10" : f.verdict === "no" ? "bg-pop/10" : "bg-coral/10",
          ].join(" ")}
        >
          <span
            className={[
              "shrink-0 w-5 h-5 rounded-full border-2 border-ink flex items-center justify-center font-mono text-[10px] font-bold",
              f.verdict === "yes" ? "bg-teal text-cream" : f.verdict === "no" ? "bg-pop text-cream" : "bg-coral text-cream",
            ].join(" ")}
          >
            {f.verdict === "yes" ? "✓" : f.verdict === "no" ? "✗" : "?"}
          </span>
          <div className="flex-1 text-[13px] text-ink leading-snug">{f.fact}</div>
          <span className="font-mono text-[10px] text-ink/55 shrink-0">{f.note}</span>
        </div>
      ))}
    </div>
    <p className="mt-3 font-mono text-[10.5px] text-ink/60 leading-relaxed">
      → 一段答案先拆成原子事实，再挨个查库。
      命中率低 ⇒ factual fabrication 风险高。
    </p>
  </div>
);

const LogitVis: React.FC = () => {
  /* 一段答案，每个 token 标注 entropy */
  const tokens = [
    { t: "苹果", e: 0.08 },
    { t: "公司", e: 0.04 },
    { t: "由", e: 0.06 },
    { t: "Steve", e: 0.05 },
    { t: " Jobs", e: 0.07 },
    { t: "、", e: 0.1 },
    { t: " Steve", e: 0.45 },
    { t: " Wozniak", e: 0.18 },
    { t: " 和", e: 0.32 },
    { t: " Ronald", e: 0.82 },
    { t: " Wayne", e: 0.62 },
    { t: " 在", e: 0.21 },
    { t: " 1972", e: 0.91 },
    { t: " 年", e: 0.4 },
    { t: " 创立", e: 0.18 },
    { t: "。", e: 0.06 },
  ];
  return (
    <div>
      <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 mb-2.5">
        每个字有多犹豫 · 颜色越红 = 熵越高
      </div>
      <div className="flex flex-wrap gap-0.5 mb-3">
        {tokens.map((tk, i) => {
          const intensity = Math.min(1, tk.e);
          return (
            <span
              key={i}
              className="px-1.5 py-0.5 border-2 border-ink rounded text-[12.5px] font-mono"
              style={{
                background: `rgba(255, 77, 116, ${intensity * 0.7 + 0.05})`,
                color: intensity > 0.5 ? "#FBEFE3" : "#241C15",
              }}
              title={`entropy ${tk.e.toFixed(2)}`}
            >
              {tk.t}
            </span>
          );
        })}
      </div>
      <p className="font-mono text-[10.5px] text-ink/60 leading-relaxed">
        → 「1972」这个字熵 0.91 极高 ⇒ 模型写到这儿自己都没把握。
        真实创立年份 1976 · Apple 官方档案。
      </p>
      <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-ink/55">
        <span>低熵</span>
        <div className="flex">
          {[0.05, 0.2, 0.4, 0.6, 0.8].map((v) => (
            <div
              key={v}
              className="w-7 h-3 border border-ink"
              style={{ background: `rgba(255, 77, 116, ${v * 0.7 + 0.05})` }}
            />
          ))}
        </div>
        <span>高熵 = 可疑</span>
      </div>
    </div>
  );
};

const ToolVis: React.FC = () => (
  <div>
    <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 mb-2.5">
      Chain-of-Verification · Meta 2023
    </div>
    <div className="space-y-2.5">
      {[
        {
          step: "1",
          tag: "原回答",
          tone: "bg-cream",
          text: "Toronto Raptors 在 2019 年获得了 NBA 总冠军，主教练是 Steve Kerr。",
        },
        {
          step: "2",
          tag: "拆验证问题",
          tone: "bg-butter-tint",
          text: "Q1 · 2019 总冠军是谁？\nQ2 · Steve Kerr 是哪支队的教练？\nQ3 · Raptors 当时教练是谁？",
        },
        {
          step: "3",
          tag: "独立答 + 工具查",
          tone: "bg-butter-tint",
          text: "A1 · Raptors ✓\nA2 · Warriors（不是 Raptors）\nA3 · Nick Nurse",
        },
        {
          step: "4",
          tag: "改写最终回答",
          tone: "bg-teal/10",
          text: "Toronto Raptors 在 2019 年获得 NBA 总冠军，主教练是 Nick Nurse。",
        },
      ].map((s) => (
        <div key={s.step} className={["flex items-start gap-2.5 px-3 py-2 border-2 border-ink rounded-lg", s.tone].join(" ")}>
          <span className="shrink-0 w-6 h-6 rounded-full bg-ink text-cream font-mono text-[11px] font-bold flex items-center justify-center">
            {s.step}
          </span>
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
              {s.tag}
            </div>
            <p className="text-[13px] text-ink leading-relaxed whitespace-pre-line">{s.text}</p>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-3 font-mono text-[10.5px] text-ink/60 leading-relaxed">
      → CoVe（Dhuliawala et al. arXiv:2309.11495）让模型自审，
      在 Wiki-QA 上把 factual error 砍掉 30-40%。
    </p>
  </div>
);

const VIS: Record<Method, React.FC> = {
  sample: SelfCheckVis,
  rag: RagVis,
  logit: LogitVis,
  tool: ToolVis,
};

const SectionDetect: React.FC = () => {
  const [method, setMethod] = useState<Method>("sample");
  const Vis = VIS[method];
  const m = METHODS[method];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">detect · 抓现行</span>
        </div>

        <h2 className="font-display text-display-lg text-ink leading-tight mb-3 max-w-3xl">
          四把抓幻觉的尺子。
        </h2>
        <p className="max-w-2xl text-[15px] text-ink/70 leading-relaxed mb-9">
          原理都不一样。共同点：都假设模型「知道时一致，编时分歧」。
          点 chip 看一种方法长什么样。
        </p>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-7">
          {/* 左：方法 chip */}
          <div className="lg:col-span-5 space-y-2.5">
            {(Object.keys(METHODS) as Method[]).map((k) => {
              const on = method === k;
              const M = METHODS[k];
              return (
                <button
                  key={k}
                  onClick={() => setMethod(k)}
                  className={[
                    "w-full text-left border-2 border-ink rounded-2xl p-4 transition-all duration-300 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-stamp-lg -translate-x-0.5 -translate-y-0.5"
                      : "bg-white shadow-stamp hover:shadow-stamp-hover hover:bg-butter-tint",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span
                      className={[
                        "w-7 h-7 rounded-full border-2 border-ink flex items-center justify-center shrink-0",
                        on ? "bg-pop text-cream" : "bg-butter text-ink",
                      ].join(" ")}
                    >
                      {M.icon}
                    </span>
                    <div className="font-display font-bold text-[16px] leading-tight">{M.name}</div>
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5",
                      on ? "text-pop" : "text-ink/50",
                    ].join(" ")}
                  >
                    {M.en}
                  </div>
                  {on && (
                    <p className="text-[12.5px] text-cream/85 leading-relaxed mb-2">{M.how}</p>
                  )}
                  {on && (
                    <div className="grid grid-cols-1 gap-1 text-[11.5px] leading-relaxed">
                      <div className="text-teal">+ {M.pro}</div>
                      <div className="text-pop">− {M.con}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 右：可视化 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6 min-h-[440px]" key={method}>
              <Vis />
            </div>
            <p className="mt-3 font-mono text-[10.5px] text-ink/50 leading-relaxed">
              src · SelfCheckGPT arXiv:2303.08896 · FactScore arXiv:2305.14251 · CoVe arXiv:2309.11495
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionDetect;
