/**
 * Section 05 · R1-Distill：6 个小模型怎么吃到 671B 的脑子
 *
 * 主交互（L3）：6 个 distill 模型横排，点选其一 → 切换"4 项 benchmark + 参考线对比"。
 * 次交互（L2）：右上 benchmark tab，AIME 24 / MATH-500 / GPQA-D / LiveCodeBench 切视图。
 *
 * 这站不重做 distill 站做过的「教师概率柱 + 温度 slider」—— 这里只关心 R1 蒸出来的 6 个小模型实战。
 * 数据来源：arXiv:2501.12948 Table 5 + DeepSeek R1 HuggingFace model card
 */
import React, { useState } from "react";

type BenchKey = "aime" | "math" | "gpqa" | "code";

type Model = {
  id: string;
  shortName: string;
  base: string;
  params: number; /* B */
  vramFp16: string;
  vramQ4: string;
  /* 跑分：AIME 24 pass@1 / MATH-500 pass@1 / GPQA-Diamond pass@1 / LiveCodeBench pass@1 */
  scores: Record<BenchKey, number>;
};

const MODELS: Model[] = [
  { id: "1.5b", shortName: "1.5B", base: "Qwen2.5-Math-1.5B", params: 1.5, vramFp16: "~3 GB", vramQ4: "~1.2 GB", scores: { aime: 28.9, math: 83.9, gpqa: 33.8, code: 16.9 } },
  { id: "7b", shortName: "7B", base: "Qwen2.5-Math-7B", params: 7, vramFp16: "~14 GB", vramQ4: "~4.5 GB", scores: { aime: 55.5, math: 92.8, gpqa: 49.1, code: 37.6 } },
  { id: "8b", shortName: "8B", base: "Llama-3.1-8B-Base", params: 8, vramFp16: "~16 GB", vramQ4: "~5 GB", scores: { aime: 50.4, math: 89.1, gpqa: 49.0, code: 39.6 } },
  { id: "14b", shortName: "14B", base: "Qwen2.5-14B", params: 14, vramFp16: "~28 GB", vramQ4: "~9 GB", scores: { aime: 69.7, math: 93.9, gpqa: 59.1, code: 53.1 } },
  { id: "32b", shortName: "32B", base: "Qwen2.5-32B", params: 32, vramFp16: "~64 GB", vramQ4: "~20 GB", scores: { aime: 72.6, math: 94.3, gpqa: 62.1, code: 57.2 } },
  { id: "70b", shortName: "70B", base: "Llama-3.3-70B-Inst", params: 70, vramFp16: "~140 GB", vramQ4: "~42 GB", scores: { aime: 70.0, math: 94.5, gpqa: 65.2, code: 57.5 } },
];

/* 参考线模型（非 R1-Distill） */
const REFERENCE = [
  { name: "GPT-4o-0513", scores: { aime: 9.3, math: 74.6, gpqa: 49.9, code: 32.9 }, tone: "ref-ink" },
  { name: "Claude-3.5-Sonnet", scores: { aime: 16.0, math: 78.3, gpqa: 65.0, code: 38.9 }, tone: "ref-ink" },
  { name: "o1-mini", scores: { aime: 63.6, math: 90.0, gpqa: 60.0, code: 53.8 }, tone: "ref-pop" },
  { name: "QwQ-32B-Preview", scores: { aime: 50.0, math: 90.6, gpqa: 54.5, code: 41.9 }, tone: "ref-coral" },
] as const;

const BENCH_INFO: Record<BenchKey, { full: string; short: string; max: number; note: string }> = {
  aime: { full: "AIME 2024", short: "AIME 24", max: 100, note: "美国数学邀请赛 · 30 题 · pass@1" },
  math: { full: "MATH-500", short: "MATH-500", max: 100, note: "竞赛数学子集 · 500 题 · pass@1" },
  gpqa: { full: "GPQA Diamond", short: "GPQA-D", max: 100, note: "博士级科学问答 · pass@1" },
  code: { full: "LiveCodeBench", short: "LCB", max: 100, note: "竞赛 + 工程代码 · 2408-2505 · pass@1" },
};

const SectionDistill: React.FC = () => {
  const [mid, setMid] = useState("32b");
  const [bench, setBench] = useState<BenchKey>("aime");
  const m = MODELS.find((x) => x.id === mid)!;

  /* 当前 benchmark 视图下，所有 model 的横向 bar */
  const maxVal = 100;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream/50">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">R1-Distill · 6 dense models</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.1] mb-4">
              671B 的脑子，
              <br className="hidden sm:block" />
              <span className="bg-teal/15 px-1.5">怎么塞进 1.5B 的小模型？</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              DeepSeek 用满血 R1 生成 80 万条带 <code className="font-mono text-[12.5px] px-1 bg-cream border border-ink/15 rounded">&lt;think&gt;</code> 推理轨迹，
              拿去 SFT 微调 Qwen2.5 和 Llama-3 系列的现成小底座，得到 6 个开源模型。
              结果 1.5B 的小娃在 AIME 上甚至能压住 GPT-4o（28.9 vs 9.3）。
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="p-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp font-mono text-[11px] leading-relaxed text-ink/85">
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                R1 没用复杂蒸馏
              </div>
              其实就是 <span className="font-bold">SFT on 80 万条 R1 trace</span>，没再加 RL。
              <div className="mt-3 pt-3 border-t border-ink/15 text-[9.5px] text-ink/45">
                arXiv:2501.12948 Table 5 / HF model card
              </div>
            </div>
          </div>
        </div>

        {/* 模型 picker · 6 张卡 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
          {MODELS.map((md) => {
            const on = md.id === mid;
            return (
              <button
                key={md.id}
                onClick={() => setMid(md.id)}
                className={[
                  "p-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[5px_5px_0_0_#FF4D74] -translate-y-1"
                    : "bg-white text-ink hover:bg-butter shadow-stamp",
                ].join(" ")}
              >
                <div className={`font-display text-[22px] font-bold leading-none mb-0.5 ${on ? "text-butter" : "text-ink"}`}>
                  {md.shortName}
                </div>
                <div className={`font-mono text-[9.5px] mt-1 leading-tight ${on ? "text-cream/65" : "text-ink/55"}`}>
                  {md.base}
                </div>
              </button>
            );
          })}
        </div>

        {/* 主面板：左侧详情 + 右侧 benchmark 横向 bar */}
        <div className="card-stamp p-5 lg:p-7">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* 左：选中模型详情 */}
            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1">
                R1-Distill
              </div>
              <div className="font-display text-[44px] font-bold text-ink leading-none mb-1">
                {m.shortName}
              </div>
              <div className="font-mono text-[11.5px] text-ink/65 mb-5">
                基于 {m.base}
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-cream border-2 border-ink rounded-xl">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/55">
                    参数量
                  </div>
                  <div className="font-display text-[22px] font-bold text-ink leading-none mt-0.5 tabular-nums">
                    {m.params} B
                  </div>
                </div>
                <div className="p-3 bg-butter/35 border-2 border-ink rounded-xl">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/55">
                    显存 · FP16 / Q4
                  </div>
                  <div className="font-mono text-[13px] text-ink leading-tight mt-1">
                    {m.vramFp16} <span className="text-ink/45">/</span> {m.vramQ4}
                  </div>
                </div>
                <div className="p-3 bg-cream border-2 border-ink rounded-xl">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    四项 benchmark
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[11px] text-ink/85 tabular-nums">
                    {(Object.keys(m.scores) as BenchKey[]).map((k) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-ink/60">{BENCH_INFO[k].short}</span>
                        <span className="font-bold">{m.scores[k].toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 右：benchmark 横向 bar + tab */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  benchmark
                </span>
                {(Object.keys(BENCH_INFO) as BenchKey[]).map((k) => {
                  const on = k === bench;
                  return (
                    <button
                      key={k}
                      onClick={() => setBench(k)}
                      className={[
                        "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[10.5px] font-bold transition-all duration-200",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#1B4B5A]"
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      {BENCH_INFO[k].short}
                    </button>
                  );
                })}
                <span className="ml-auto font-mono text-[10.5px] text-ink/45">
                  {BENCH_INFO[bench].note}
                </span>
              </div>

              <div className="space-y-1.5">
                {MODELS.map((md) => {
                  const v = md.scores[bench];
                  const on = md.id === mid;
                  return (
                    <div key={md.id} className="flex items-center gap-3">
                      <div
                        className={[
                          "w-20 font-mono text-[11px] font-bold tabular-nums shrink-0",
                          on ? "text-pop" : "text-ink/75",
                        ].join(" ")}
                      >
                        {md.shortName}
                      </div>
                      <div className="flex-1 h-7 bg-cream border-2 border-ink rounded-md overflow-hidden relative">
                        <div
                          className={`h-full transition-all duration-500 ease-editorial ${on ? "bg-pop" : "bg-ink/85"}`}
                          style={{ width: `${(v / maxVal) * 100}%` }}
                        />
                        <span
                          className={[
                            "absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[11px] font-bold tabular-nums",
                            v / maxVal > 0.5 ? "text-cream" : "text-ink",
                          ].join(" ")}
                        >
                          {v.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* divider */}
                <div className="pt-3 pb-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/45">
                  参考线 · 非 R1 系
                </div>

                {REFERENCE.map((r) => {
                  const v = r.scores[bench];
                  return (
                    <div key={r.name} className="flex items-center gap-3">
                      <div className="w-32 font-mono text-[10.5px] text-ink/55 shrink-0 leading-tight">
                        {r.name}
                      </div>
                      <div className="flex-1 h-5 bg-white border border-ink/40 rounded-md overflow-hidden relative">
                        <div
                          className="h-full bg-ink/25 transition-all duration-500 ease-editorial"
                          style={{ width: `${(v / maxVal) * 100}%` }}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] tabular-nums text-ink/65">
                          {v.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="mt-6 pt-5 border-t border-ink/10 font-mono text-[10.5px] text-ink/55 leading-relaxed">
            来源：DeepSeek-R1 paper Table 5（pass@1）· 参考线模型分数取自同表对照。
            注意 R1-Distill 全程只做了 SFT，没再 RL —— 论文里有一个反例：直接在 32B 底座上 RL（R1-Zero-Qwen-32B）只有 AIME 47.0，远不如 distill 出来的 72.6。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionDistill;
