/**
 * Section 07 · R1 之后的世界 · timeline + reproductions
 *
 * 主交互（L3）：snap-slider 在 2025-01 → 2026-04 之间拖游标，左侧 timeline 8 个节点切换，
 *                右侧大卡显示该节点的 key spec / 是不是仍可下载 / 跑分。
 * 次交互（L2）：底下 accordion 展开 4 个 R1 复现 / 衍生工作。
 *
 * 数据来源：DeepSeek API docs news250528 / news250821 / news251201 / news260424
 *           + HuggingFace open-r1 README + lab benchmarks
 */
import React, { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

type Milestone = {
  date: string; /* yyyy-mm-dd */
  label: string;
  name: string;
  what: string;
  spec: string;
  bench: string;
  tag: "release" | "update" | "successor" | "preview";
  open: boolean;
};

const TIMELINE: Milestone[] = [
  {
    date: "2025-01-20",
    label: "01.20",
    name: "DeepSeek R1",
    what: "首版开源，论文 arXiv:2501.12948，与 OpenAI o1 持平。",
    spec: "671B total · 37B 激活 · 128K · MIT",
    bench: "AIME 24: 79.8 · MATH-500: 97.3 · GPQA-D: 71.5 · LCB: 63.5",
    tag: "release",
    open: true,
  },
  {
    date: "2025-05-28",
    label: "05.28",
    name: "R1-0528",
    what: "同架构 + 算法优化，思考长度从 12K token 涨到 23K，幻觉降。",
    spec: "671B · 同卡 · 仅 post-train 变",
    bench: "AIME 25: 70.0 → 87.5 · LCB: 63.5 → 73.3 · Codeforces: 1530 → 1930",
    tag: "update",
    open: true,
  },
  {
    date: "2025-08-21",
    label: "08.21",
    name: "DeepSeek V3.1",
    what: "Think 和 Non-Think 合到一个模型，V3 + R1 端口收一起，主打 agent。",
    spec: "671B · 128K · 840B token 长上下文续训",
    bench: "Tau-Bench / SWE-bench 跑分大涨 · 思考速度比 R1-0528 快",
    tag: "successor",
    open: true,
  },
  {
    date: "2025-09-29",
    label: "09.29",
    name: "V3.2-Exp",
    what: "首次引入 DeepSeek Sparse Attention（DSA），稀疏化注意力。",
    spec: "Same 671B · 实验版稀疏注意力",
    bench: "推理成本下降 · 各 bench 与 V3.1 持平",
    tag: "preview",
    open: true,
  },
  {
    date: "2025-12-01",
    label: "12.01",
    name: "V3.2 + Speciale",
    what: "正式版 + 推理最大化的 Speciale 分支，IMO / CMO / ICPC / IOI 2025 金牌成绩。",
    spec: "Speciale 接近 Gemini-3.0-Pro",
    bench: "Speciale: IMO 2025 金 · IOI 2025 金",
    tag: "successor",
    open: true,
  },
  {
    date: "2026-04-24",
    label: "26.04",
    name: "V4 Preview",
    what: "token-wise 压缩 + DSA 默认 1M 上下文，仍主打 hybrid think 模式。",
    spec: "默认 1M 上下文 · 推理 / 非推理一体",
    bench: "已发预览 · 完整 benchmark 待公布",
    tag: "preview",
    open: true,
  },
];

type Repro = {
  id: string;
  name: string;
  by: string;
  what: string;
  scale: string;
  artifact: string;
  url: string;
};

const REPROS: Repro[] = [
  {
    id: "open-r1",
    name: "Open R1",
    by: "Hugging Face",
    what:
      "完整复刻 R1 三阶段。Step 1（distill 7B）已完成，Mixture-of-Thoughts 350k 条 R1 轨迹数据集开源。后续 step 2/3 在做。",
    scale: "datasets 350k · OpenR1-Distill-7B 已发",
    artifact: "github.com/huggingface/open-r1",
    url: "https://github.com/huggingface/open-r1",
  },
  {
    id: "tiny-zero",
    name: "TinyZero",
    by: "Berkeley · Jiayi Pan 等",
    what:
      "在 3B Qwen 上跑 GRPO + 数字倒计时游戏，30 美元算力就把「自我反思」涌现复刻出来，证明 aha moment 不需要 671B。",
    scale: "Qwen 3B · 倒计时 / 24-game · 约 30 USD",
    artifact: "github.com/Jiayi-Pan/TinyZero",
    url: "https://github.com/Jiayi-Pan/TinyZero",
  },
  {
    id: "simple-rl",
    name: "SimpleRL-reason",
    by: "HKUST · Junxian He",
    what:
      "更轻量复现：Qwen2.5-Math-7B 直接 RL，仅用 8k 数学题，MATH 跑出 R1-Distill 同档分数。",
    scale: "8k 训练题 · 7B base · 单机可跑",
    artifact: "github.com/hkust-nlp/simpleRL-reason",
    url: "https://github.com/hkust-nlp/simpleRL-reason",
  },
  {
    id: "open-reasoner",
    name: "Open Reasoner Zero",
    by: "StepFun + 清华",
    what:
      "聚焦 R1-Zero 路线：从 base 模型直接 RL，开源完整训练数据和脚本，验证规则奖励的通用性。",
    scale: "7B / 32B / 0.5B 三档 base · 数据全开",
    artifact: "github.com/Open-Reasoner-Zero",
    url: "https://github.com/Open-Reasoner-Zero/Open-Reasoner-Zero",
  },
];

const TAG_STYLE: Record<Milestone["tag"], string> = {
  release: "bg-pop text-cream",
  update: "bg-butter text-ink",
  successor: "bg-teal text-cream",
  preview: "bg-coral text-cream",
};

const SectionAfterR1: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [openRepro, setOpenRepro] = useState<string | null>("open-r1");
  const m = TIMELINE[idx];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream/50">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">After R1 · 15 Months</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.1] mb-4">
              R1 发布之后这 15 个月，
              <br className="hidden sm:block" />
              <span className="bg-butter px-1.5">DeepSeek 把"推理"塞进了一整个模型家族。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              注意：到 2026-04，DeepSeek 一直没出叫 R2 的纯推理模型，而是把思考能力收进 V3.1 / V3.2 这种"想不想都行"的混合模型里。
              R1 论文（arXiv:2501.12948）也催生了一批开源复现 —— 真的能用 1 张卡几十块钱复现 aha moment。
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="p-4 bg-pop/10 border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                R2 状态
              </div>
              <div className="font-display text-[20px] font-bold text-ink leading-tight">
                官方未发布
              </div>
              <p className="mt-2 font-mono text-[10.5px] text-ink/65 leading-relaxed">
                到 2026-04-24 V4 Preview，DeepSeek 文档没有 R2，只有 R1 更新 / V3.1 / V3.2 / V4 路线。
              </p>
            </div>
          </div>
        </div>

        {/* Timeline 主体 */}
        <div className="card-stamp p-5 lg:p-7 mb-12">
          {/* slider */}
          <div className="mb-6">
            <input
              type="range"
              min={0}
              max={TIMELINE.length - 1}
              step={1}
              value={idx}
              onChange={(e) => setIdx(Number(e.target.value))}
              className="w-full accent-pop"
            />
            <div className="flex justify-between mt-2">
              {TIMELINE.map((t, i) => {
                const on = i === idx;
                return (
                  <button
                    key={t.date}
                    onClick={() => setIdx(i)}
                    className={[
                      "flex flex-col items-center gap-1 flex-1 px-1 transition-all duration-200 ease-spring",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "w-3.5 h-3.5 rounded-full border-2 border-ink transition-all duration-250",
                        on ? "bg-pop scale-125" : "bg-white",
                      ].join(" ")}
                    />
                    <div
                      className={[
                        "font-mono text-[9.5px] tabular-nums",
                        on ? "text-ink font-bold" : "text-ink/55",
                      ].join(" ")}
                    >
                      {t.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 主显示 */}
          <div key={idx} className="grid lg:grid-cols-12 gap-5 animate-enter-fade">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-[0.18em] ${TAG_STYLE[m.tag]} border-2 border-ink`}>
                  {m.tag}
                </span>
                <span className="font-mono text-[11px] text-ink/55 tabular-nums">
                  {m.date}
                </span>
                {m.open && (
                  <span className="font-mono text-[10px] text-teal border border-teal/40 px-1.5 py-0.5 rounded">
                    open · HF 可下
                  </span>
                )}
              </div>
              <div className="font-display text-[36px] lg:text-[44px] font-bold text-ink leading-none mb-3">
                {m.name}
              </div>
              <p className="text-[14.5px] text-ink/80 leading-relaxed mb-4">
                {m.what}
              </p>
              <div className="p-3 bg-cream border-2 border-ink rounded-xl mb-3">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                  规格
                </div>
                <div className="font-mono text-[12px] text-ink leading-tight">
                  {m.spec}
                </div>
              </div>
              <div className="p-3 bg-butter/35 border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                  关键跑分
                </div>
                <div className="font-mono text-[11.5px] text-ink leading-relaxed">
                  {m.bench}
                </div>
              </div>
            </div>

            {/* 右：节点缩略一览 */}
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
                后续节点提要
              </div>
              <div className="space-y-1.5">
                {TIMELINE.map((t, i) => {
                  const on = i === idx;
                  return (
                    <button
                      key={t.date}
                      onClick={() => setIdx(i)}
                      className={[
                        "w-full flex items-center gap-3 p-2.5 border-2 border-ink rounded-xl text-left transition-all duration-200",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#FF4D74]"
                          : "bg-white text-ink hover:bg-cream",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "font-mono text-[10px] tabular-nums shrink-0 w-14",
                          on ? "text-cream/65" : "text-ink/55",
                        ].join(" ")}
                      >
                        {t.label}
                      </span>
                      <span className="font-display text-[13px] font-bold leading-tight">
                        {t.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 复现 accordion */}
        <div>
          <div className="flex items-end justify-between mb-4">
            <h3 className="font-display text-[26px] lg:text-[30px] font-bold text-ink leading-tight">
              开源复现 · R1 之后跑出来的<span className="text-pop">同型生物</span>
            </h3>
            <span className="font-mono text-[10.5px] text-ink/50 hidden sm:block">
              点开看
            </span>
          </div>
          <div className="space-y-2.5">
            {REPROS.map((r) => {
              const on = openRepro === r.id;
              return (
                <div key={r.id} className="border-2 border-ink rounded-2xl bg-white overflow-hidden shadow-stamp">
                  <button
                    onClick={() => setOpenRepro(on ? null : r.id)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-cream transition-colors duration-200"
                  >
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-display text-[18px] font-bold text-ink">
                        {r.name}
                      </span>
                      <span className="font-mono text-[10.5px] text-ink/55">
                        by {r.by}
                      </span>
                    </div>
                    <ChevronDown
                      className={[
                        "w-4 h-4 shrink-0 transition-transform duration-300 ease-spring",
                        on ? "rotate-180" : "",
                      ].join(" ")}
                      strokeWidth={2.5}
                    />
                  </button>
                  {on && (
                    <div className="px-4 pb-4 pt-1 border-t border-ink/10 animate-enter-fade">
                      <p className="text-[14px] text-ink/80 leading-relaxed mb-3">
                        {r.what}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-cream border border-ink/30 rounded font-mono text-[10.5px] text-ink/70">
                          {r.scale}
                        </span>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-cream rounded font-mono text-[10.5px] hover:bg-pop transition-colors duration-200"
                        >
                          {r.artifact}
                          <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 p-5 bg-ink rounded-2xl border-2 border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-butter mb-2">
            一条硬规则
          </div>
          <p className="font-display text-[18px] lg:text-[22px] font-bold text-cream leading-tight">
            想自己复现 aha moment？base 模型要够强，奖励要可验证 ——
            没这两条，纯 RL 不会涌现，只会一直说胡话。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionAfterR1;
