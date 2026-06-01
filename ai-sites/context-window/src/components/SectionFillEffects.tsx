/**
 * SectionFillEffects · 撑爆之后会发生什么
 *
 * 主交互：
 *   - L2 pill：切换四种典型症状（注意力分散 / 走神 / 答非所问 / 中间信息丢失）
 *   - L3 slider：调当前 context 占用百分比，看模型对同样问题的「召回率」估算条
 *     —— 4 个症状跟着百分比涨而恶化
 *
 * 不堆数字，重点让用户摸到 「撑得越满，模型越糊涂」。
 */
import React, { useState } from "react";
import { Brain, Sparkles, Compass, ScanSearch } from "lucide-react";

type Symptom = {
  id: string;
  name: string;
  en: string;
  icon: React.ReactNode;
  what: string;
  showcase: {
    question: string;
    low: string; // 占用 < 30% 时的回答
    high: string; // 占用 > 80% 时的回答
  };
  /** 解释撑爆后这个症状为什么变严重 */
  why: string;
};

const SYMPTOMS: Symptom[] = [
  {
    id: "drift",
    name: "走神",
    en: "FORGOT EARLIER",
    icon: <Compass className="w-3.5 h-3.5" strokeWidth={2.4} />,
    what: "忘了对话开头说过的决策、约束。",
    showcase: {
      question: "（开场说过：用 TypeScript + Vitest + 不要 emoji）40 轮后：写个新函数",
      low: "function add(a: number, b: number): number { return a + b; }（附 Vitest 测试）",
      high: "def add(a, b): return a + b  # 加点 emoji 让代码可爱一点",
    },
    why: "开头那段说明被埋在几万 token 后面。模型按位置加权时，远的东西权重低，约束被覆盖了。",
  },
  {
    id: "lost-middle",
    name: "中间信息丢失",
    en: "LOST IN THE MIDDLE",
    icon: <ScanSearch className="w-3.5 h-3.5" strokeWidth={2.4} />,
    what: "long context 里头尾记得清，正中间那段「装是装下了，但调不出来」。",
    showcase: {
      question: "在 80K token 的文档第 40K 位置藏了一句「API 限速 100 次/分钟」，提问：限速是多少？",
      low: "（文档 8K）API 限速 100 次/分钟。",
      high: "（文档 80K）文档里没有明确提到 API 限速 ⋯ 你可以参考 60 次/分钟。",
    },
    why: "lost-in-the-middle 是 2023 年起被反复复现的现象：transformer 对序列首尾的 attention 比中间高。窗口越大越明显。",
  },
  {
    id: "distract",
    name: "注意力分散",
    en: "ATTENTION DILUTED",
    icon: <Sparkles className="w-3.5 h-3.5" strokeWidth={2.4} />,
    what: "context 越长，每个 token 分到的 attention 越薄。同样问题，回答从精准变得泛泛。",
    showcase: {
      question: "这段代码为什么 timeout？",
      low: "看下面这行 fetch 没设 timeout 选项，默认是 0，无限等。把它加上 AbortController 就好。",
      high: "可能是网络问题、可能是 fetch 没设超时、也可能是后端慢。建议从这几个方向排查⋯",
    },
    why: "字塞得越多，模型越难盯住关键那几句，回答会变泛、变保守 —— 不敢直接下判断，怕踩雷。",
  },
  {
    id: "irrelevant",
    name: "答非所问",
    en: "OFF-TOPIC",
    icon: <Brain className="w-3.5 h-3.5" strokeWidth={2.4} />,
    what: "前面 history 里出现过的话题反复打断模型，让它在已经过时的细节上打转。",
    showcase: {
      question: "现在帮我把这段 SQL 改成索引扫描。",
      low: "把 WHERE 改成走 idx_user_email，再加 LIMIT 10 就够。",
      high: "之前你提到过 Redis 缓存策略，我们先确认下缓存层是不是该一起调整？另外，你提过用 TypeScript⋯",
    },
    why: "撑得越满，模型越倾向「回顾历史」而不是聚焦当下。它在试图照顾前面所有可能的相关信息。",
  },
];

const SectionFillEffects: React.FC = () => {
  const [activeId, setActiveId] = useState(SYMPTOMS[1].id); // 默认 lost-in-the-middle，最直观
  const [occupancy, setOccupancy] = useState(85); // 占用百分比
  const active = SYMPTOMS.find((s) => s.id === activeId)!;

  // 召回质量随占用恶化（粗糙模型，演示用）
  const recall = Math.max(8, Math.round(100 - Math.pow(occupancy / 100, 2) * 92));
  const isHigh = occupancy >= 60;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Effects · 撑爆症状</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          装得下不等于
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">记得清</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          context 接近撑爆时，模型不会报错也不会拒答。它给你一个看上去像那么回事、
          实际上抓不住重点的回答。
          <span className="font-bold text-ink">更坑的是：它不会报错，看起来还在正常答，其实早忘了。</span>
          切下面 4 个症状看看。
        </p>

        {/* pill */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {SYMPTOMS.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 border-2 border-ink rounded-full font-mono text-[11.5px] tracking-[0.12em] uppercase transition-all duration-250 ease-spring ${
                  isActive
                    ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
              >
                {s.icon}
                <span>{s.name}</span>
                <span className={`text-[9.5px] tracking-[0.14em] ${isActive ? "text-butter" : "text-ink/45"}`}>
                  {s.en}
                </span>
              </button>
            );
          })}
        </div>

        {/* 主区 */}
        <div key={activeId} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-enter-up">
          {/* 左：症状解释 + 占用 slider */}
          <div className="lg:col-span-5 space-y-5">
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1">
                症状 · {active.en}
              </div>
              <h3 className="font-display font-extrabold text-[24px] text-ink leading-tight">
                {active.name}
              </h3>
              <p className="font-sans text-[14.5px] leading-[1.7] text-ink/85 mt-3">
                {active.what}
              </p>
              <div className="mt-4 pt-4 border-t-2 border-dashed border-ink/20">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1.5">
                  为什么撑爆后变严重
                </div>
                <p className="font-serif italic text-[13.5px] leading-[1.65] text-ink/80">
                  {active.why}
                </p>
              </div>
            </div>

            {/* 占用 slider */}
            <div className="card-stamp p-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  当前 context 占用
                </span>
                <span className="font-display font-extrabold text-[24px] text-ink leading-none">
                  {occupancy}%
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={98}
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-ink/45 mt-1">
                <span>5%</span>
                <span>30%</span>
                <span>60%</span>
                <span>98%</span>
              </div>

              {/* 召回质量条 */}
              <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/20">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                    估算召回质量
                  </span>
                  <span className="font-mono font-bold text-[14px] text-ink">{recall}%</span>
                </div>
                <div className="relative h-5 bg-cream border-2 border-ink rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-400 ease-editorial ${
                      recall >= 60 ? "bg-butter" : recall >= 30 ? "bg-coral" : "bg-pop"
                    }`}
                    style={{ width: `${recall}%` }}
                  />
                </div>
                <p className="font-serif italic text-[12px] text-ink/65 leading-[1.5] mt-2">
                  示意曲线：召回 ≈ 100 −（占用 / 100）² × 92。
                  真实退化曲线因模型而异，但「占用越高越差」是稳定规律。
                </p>
              </div>
            </div>
          </div>

          {/* 右：低占用 vs 高占用 双截图 */}
          <div className="lg:col-span-7 space-y-4">
            <div className="card-stamp p-5">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                同一个问题
              </div>
              <div className="bg-ink/5 border-2 border-ink/15 rounded-xl px-4 py-3">
                <div className="font-mono text-[10px] text-coral tracking-[0.15em] uppercase mb-1">
                  USER
                </div>
                <p className="font-sans text-[14px] text-ink leading-[1.55]">
                  {active.showcase.question}
                </p>
              </div>
            </div>

            {/* low 占用 */}
            <div
              className={`border-2 border-ink rounded-2xl p-5 transition-all duration-300 ${
                isHigh ? "bg-white shadow-stamp" : "bg-butter shadow-stamp-lg translate-x-[-2px] translate-y-[-2px]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/65">
                  低占用 · 12%
                </span>
                <span className="font-mono text-[10.5px] font-bold text-ink">回答精准</span>
              </div>
              <p className="font-sans text-[13.5px] text-ink leading-[1.7]">
                {active.showcase.low}
              </p>
            </div>

            {/* high 占用 */}
            <div
              className={`border-2 border-ink rounded-2xl p-5 transition-all duration-300 ${
                isHigh ? "bg-pop text-cream shadow-stamp-lg translate-x-[-2px] translate-y-[-2px]" : "bg-white text-ink shadow-stamp"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-mono text-[10.5px] tracking-[0.18em] uppercase ${
                    isHigh ? "text-cream/80" : "text-ink/65"
                  }`}
                >
                  高占用 · 89%
                </span>
                <span
                  className={`font-mono text-[10.5px] font-bold ${
                    isHigh ? "text-butter" : "text-ink"
                  }`}
                >
                  开始糊
                </span>
              </div>
              <p
                className={`font-sans text-[13.5px] leading-[1.7] ${
                  isHigh ? "text-cream" : "text-ink"
                }`}
              >
                {active.showcase.high}
              </p>
            </div>

            <p className="font-mono text-[11px] text-ink/55 pt-2">
              注：这两段都是示意，不是某个具体 benchmark 的录屏。但「同一问题不同占用，回答质量退化」这件事
              在 LongBench v2 / MRCRv2 / NIAH 等长上下文评测里反复被复现。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFillEffects;
