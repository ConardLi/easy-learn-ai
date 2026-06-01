/**
 * Section 06 · 真的看懂了吗？
 *
 * 收尾。三个 2026 真数据 + 一个"SOTA 平均分高 ≠ 真能用"的反直觉对比。
 *
 * 主交互：(1) before/after toggle 切平均准确率 vs 非线性分；(2) 三张 stat 卡可点开看更多
 * 跟前面 5 个 section 都不一样：before/after + accordion 折叠展开。
 */
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Scoring = "avg" | "nonlin";

/* Video-MME-v2 上的真实分数（截 2026/05 leaderboard） */
const VIDEO_MME_V2 = [
  { name: "Gemini 3 Pro", vendor: "Google", avg: 87.1, nonlin: 46.0 },
  { name: "Gemini 3 Flash", vendor: "Google", avg: 86.1, nonlin: 41.5 },
  { name: "GPT-5.5", vendor: "OpenAI", avg: 82.4, nonlin: 36.8 },
  { name: "MiMo-v2-Omni", vendor: "Xiaomi", avg: 78.9, nonlin: 32.1 },
  { name: "Qwen3-VL 235B", vendor: "Alibaba", avg: 76.3, nonlin: 28.5 },
  { name: "人类基线", vendor: "Human", avg: 91.2, nonlin: 67.4 },
];

type Stat = {
  id: string;
  num: string;
  unit: string;
  label: string;
  detail: string;
  source: string;
  color: string;
};

const STATS: Stat[] = [
  {
    id: "mmmu",
    num: "84",
    unit: "%",
    label: "MMMU-Pro 多模态推理史上最高",
    detail:
      "Gemini 3.5 Flash 在 MMMU-Pro 上拿 84%。这是一个 11.5K 道题、6 个学科、要看图也要算的考试。GPT-5.5 仍能赢编码、数学专题，但 MMMU-Pro 这一项被 Gemini 拿下。",
    source: "Memeburn 2026-05-19 · Gemini 3.5 Flash 发布数据",
    color: "#F4D35E",
  },
  {
    id: "samco",
    num: "270K",
    unit: "概念",
    label: "SAM 3 能用文字抠出 270K 种东西",
    detail:
      "Meta 2025/11 放出 SAM 3，2026/03 升 3.1。给一句「黄色校车」它就能在视频里把每辆校车的每帧像素抠出来。SA-Co benchmark 上达到 75-80% 人类水平，270K 概念 ≈ 此前最大 benchmark 的 50 倍。",
    source: "facebookresearch/sam3 GitHub · arXiv:2511.16719",
    color: "#1B4B5A",
  },
  {
    id: "context",
    num: "1",
    unit: "小时视频",
    label: "Qwen3-VL 256K 原生 · 一次喂一小时视频",
    detail:
      "Qwen3-VL 235B-A22B 用 interleaved-MRoPE + 文字时间戳对齐，能在 256K 原生上下文里塞下整本小说或一小时视频。MMMU 上跟 Gemini-2.5-Pro / GPT-5 一档。开源 MoE 里目前最强。",
    source: "Qwen3-VL 技术报告 ResearchGate 398026379",
    color: "#E07A5F",
  },
];

const SectionBenchmark: React.FC = () => {
  const [scoring, setScoring] = useState<Scoring>("avg");
  const [openStat, setOpenStat] = useState<string | null>(null);

  const maxAvg = Math.max(...VIDEO_MME_V2.map((r) => r.avg));
  const maxNonlin = Math.max(...VIDEO_MME_V2.map((r) => r.nonlin));
  const max = scoring === "avg" ? maxAvg : maxNonlin;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">does it see?</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5">
              真的
              <span className="relative inline-block mx-1">
                <span className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
                <span className="relative z-10">看懂</span>
              </span>
              了吗？
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed max-w-md">
              <p>
                平均准确率 87% 听着挺像「快接近人」。但 2026/04 上线的 Video-MME-v2 改了算分方式 ——
                按「同一组题全答对才得分」算，SOTA 模型只能拿 46%。
              </p>
              <p>
                这一半差距，就是真理解跟碰巧答对一两题的差别。
                右边切换两种算法看实际差距。
              </p>
              <p>
                也别只看视频。MMMU-Pro 学科卷、SAM 3 像素级抠图、Qwen3-VL 1 小时视频窗口 ——
                每个维度都还有头顶空间。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Video-MME-v2 主对比卡 */}
            <div className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60">
                  Video-MME-v2 · 2026/04 上线
                </div>
                <div className="font-mono text-[10px] text-butter">900 视频 · 254h · 2700 题</div>
              </div>
              <p className="font-display text-[18px] font-bold text-butter mb-4 leading-snug">
                同一批模型，换算法看一下结果
              </p>

              {/* before/after toggle */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <button
                  onClick={() => setScoring("avg")}
                  className={[
                    "px-4 py-3 rounded-xl border-2 border-cream transition-all duration-250 ease-spring text-left",
                    scoring === "avg" ? "bg-butter text-ink shadow-[3px_3px_0_0_#FBEFE3]" : "bg-transparent text-cream hover:bg-cream/10",
                  ].join(" ")}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-75 mb-0.5">老算法</div>
                  <div className="font-display text-[15px] font-bold leading-tight">每题平均准确率</div>
                </button>
                <button
                  onClick={() => setScoring("nonlin")}
                  className={[
                    "px-4 py-3 rounded-xl border-2 border-cream transition-all duration-250 ease-spring text-left",
                    scoring === "nonlin" ? "bg-coral text-cream shadow-[3px_3px_0_0_#FBEFE3]" : "bg-transparent text-cream hover:bg-cream/10",
                  ].join(" ")}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-75 mb-0.5">新算法</div>
                  <div className="font-display text-[15px] font-bold leading-tight">组内非线性分</div>
                </button>
              </div>

              {/* 模型对比 bar */}
              <div className="space-y-2">
                {VIDEO_MME_V2.map((r) => {
                  const score = scoring === "avg" ? r.avg : r.nonlin;
                  const width = (score / 100) * 100;
                  const isHuman = r.name === "人类基线";
                  return (
                    <div key={r.name} className="grid grid-cols-12 items-center gap-2">
                      <div className="col-span-4 sm:col-span-3">
                        <div className={["font-display text-[12.5px] leading-tight font-bold", isHuman ? "text-butter" : "text-cream"].join(" ")}>
                          {r.name}
                        </div>
                        <div className="font-mono text-[9px] text-cream/45">{r.vendor}</div>
                      </div>
                      <div className="col-span-6 sm:col-span-7">
                        <div className="h-5 bg-cream/15 rounded-full overflow-hidden border border-cream/20 relative">
                          <div
                            key={`${r.name}-${scoring}`}
                            className="h-full transition-all duration-500 ease-spring"
                            style={{
                              width: `${width}%`,
                              backgroundColor: isHuman ? "#F4D35E" : scoring === "avg" ? "#1B4B5A" : "#E07A5F",
                            }}
                          />
                          {/* 老算法基准线在新算法 view 里依然可见 */}
                          {scoring === "nonlin" && !isHuman && (
                            <div
                              className="absolute top-0 bottom-0 w-px bg-butter/40"
                              style={{ left: `${r.avg}%` }}
                              title={`原平均分 ${r.avg}%`}
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 text-right">
                        <span
                          key={`${r.name}-${scoring}-num`}
                          className={[
                            "font-display text-[16px] font-bold tabular-nums animate-enter-pop inline-block",
                            isHuman ? "text-butter" : "text-cream",
                          ].join(" ")}
                        >
                          {score.toFixed(1)}
                        </span>
                        <span className="font-mono text-[9px] text-cream/50 ml-0.5">%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 pt-4 border-t border-cream/15 font-sans text-[13px] text-cream/75 leading-relaxed">
                {scoring === "avg"
                  ? "每题独立打分，答对就 +1。Gemini 3 Pro 看起来快追平人类。"
                  : "把相关题打包成 group，全组答对才算赢一组。Gemini 3 Pro 跌到 46% —— 单题能蒙对、但整组题答不全的，分数就会掉下来。"}
              </p>
              <p className="mt-2 font-mono text-[10px] text-cream/45">
                来源 · Video-MME-v2 leaderboard 2026/04 · MME-Benchmarks/Video-MME-v2 GitHub
              </p>
            </div>
          </div>
        </div>

        {/* 3 张 stat accordion 卡 */}
        <div className="grid lg:grid-cols-3 gap-4">
          {STATS.map((s) => {
            const open = openStat === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setOpenStat(open ? null : s.id)}
                className={[
                  "card-stamp p-5 text-left transition-all duration-300",
                  open ? "lg:col-span-3" : "",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-display text-[44px] font-bold tabular-nums leading-none"
                      style={{ color: s.color }}
                    >
                      {s.num}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">{s.unit}</span>
                  </div>
                  <ChevronDown
                    className={["w-5 h-5 text-ink/50 transition-transform duration-300", open ? "rotate-180" : ""].join(" ")}
                    strokeWidth={2.2}
                  />
                </div>
                <p className="font-display text-[15px] font-bold text-ink mb-2 leading-snug">
                  {s.label}
                </p>
                {open && (
                  <div className="pt-3 mt-2 border-t-2 border-ink/10 animate-enter-fade">
                    <p className="text-[13.5px] text-ink/75 leading-relaxed mb-3">{s.detail}</p>
                    <p className="font-mono text-[10px] text-ink/45">来源 · {s.source}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 收尾硬规则 */}
        <div className="mt-12 p-6 lg:p-7 bg-coral text-cream border-2 border-ink rounded-3xl shadow-stamp-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/65 mb-2">
            硬规则 · 2026 选多模态模型时记住
          </div>
          <p className="font-display text-[20px] lg:text-[24px] font-bold leading-snug">
            平均分高 ≠ 你的工作流能用。看你需要哪个模态 in、哪个模态 out、上下文要多长，
            <br className="hidden sm:block" />
            按这三个轴挑模型，不要看 SOTA。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionBenchmark;
