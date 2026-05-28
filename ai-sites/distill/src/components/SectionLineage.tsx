/**
 * Section 05 · 蒸馏家谱 · 11 年的变体
 *
 * 形式：横向时间线 + 年份 slider（L3）。拖动 slider 自动 snap 到最近的里程碑，
 * 下方"当前焦点卡"实时切换。
 *
 * 跟其它 section 区分：S1/S3 都是连续滑块控数值，这里是 snap-to-milestone 的离散滑动。
 *
 * 数据均能追溯到 arXiv 编号或厂商 release。
 */
import React, { useMemo, useState } from "react";

type Milestone = {
  year: number;
  monthLabel: string;
  short: string;
  who: string;
  title: string;
  ref: string;
  punch: string;
  body: string;
  tone: "ink" | "coral" | "teal" | "butter";
};

const MILESTONES: Milestone[] = [
  {
    year: 2015,
    monthLabel: "2015 · 03",
    short: "Hinton 开炮",
    who: "Hinton, Vinyals, Dean",
    title: "Distilling the Knowledge in a Neural Network",
    ref: "arXiv:1503.02531",
    punch: "「知识不是参数，是分布。」",
    body: "首次正式提出 temperature softmax + soft target 训练学生。在 MNIST / Acoustic 上验证 ensemble 知识可被压进单模型，给后面 11 年定下基调。",
    tone: "ink",
  },
  {
    year: 2019,
    monthLabel: "2019 · 10",
    short: "DistilBERT",
    who: "Sanh et al, Hugging Face",
    title: "DistilBERT: 一个更小、更快、更便宜的 BERT",
    ref: "arXiv:1910.01108",
    punch: "「砍掉 40% 的参数，留下 97% 的能力。」",
    body: "学生层数减半（6 vs 12），用 cosine 嵌入对齐 + soft target + MLM 三 loss 联合训练。开启 BERT-mini 时代，至今仍是 HF 库下载量前列。",
    tone: "teal",
  },
  {
    year: 2023,
    monthLabel: "2023 · 03",
    short: "Alpaca / 自指令蒸馏",
    who: "Stanford CRFM",
    title: "用 GPT-3.5 当老师，52k 条指令训出 7B Llama 学生",
    ref: "Stanford Alpaca / 2023-03",
    punch: "「老师的输出本身就是数据。」",
    body: "把 KD 推广到 LLM 指令微调：用 OpenAI API 生成 52k 教学样本，喂给 Llama-7B。开源社区从此进入「蒸馏 GPT-4」的洪流，Vicuna / WizardLM / Orca 全是这个套路的继任者。",
    tone: "butter",
  },
  {
    year: 2023,
    monthLabel: "2023 · 11",
    short: "SDXL Turbo",
    who: "Stability AI · Sauer et al",
    title: "对抗性蒸馏：扩散模型 1 步出图",
    ref: "ADD · arXiv:2311.17042",
    punch: "「50 步 → 1 步，质量基本不掉。」",
    body: "SDXL 老师 + 学生生成器 + 一个 DINOv2 判别器组成 GAN。学生通过 score distillation 学到老师 50 步采样的整条轨迹，1 步就出像样图。",
    tone: "coral",
  },
  {
    year: 2025,
    monthLabel: "2025 · 01",
    short: "DeepSeek R1-Distill",
    who: "DeepSeek-AI",
    title: "把推理过程当数据集 · 6 件套同时开源",
    ref: "arXiv:2501.12948",
    punch: "「800k 条推理轨迹，喂出 6 个超越 GPT-4o 的开源学生。」",
    body: "用 R1 在数学/代码题上的完整 think 轨迹做 SFT，训 Qwen2.5 / Llama3 共 6 个尺寸（1.5B → 70B）。蒸馏首次让小模型在硬推理任务上明显超越大模型，成为 2025-2026 开源标杆。",
    tone: "ink",
  },
  {
    year: 2026,
    monthLabel: "2026 · 01",
    short: "On-Policy Self-Distillation",
    who: "Zhao et al · Thinking Machines",
    title: "学生自己当老师 · OPSD",
    ref: "arXiv:2601.18734",
    punch: "「同一个模型，看见答案的版本教看不见答案的版本。」",
    body: "学生先 rollout，然后让另一个『带特权信息』的自己（同模型，加了 ground truth context）打分。RL 跟蒸馏的边界开始溶解，token 效率比 GRPO 高 8-12×。",
    tone: "coral",
  },
];

const TONE_COLORS: Record<Milestone["tone"], { bg: string; text: string; ring: string; bar: string }> = {
  ink: { bg: "#241C15", text: "#FBEFE3", ring: "#241C15", bar: "#241C15" },
  coral: { bg: "#E07A5F", text: "#FBEFE3", ring: "#E07A5F", bar: "#E07A5F" },
  teal: { bg: "#1B4B5A", text: "#FBEFE3", ring: "#1B4B5A", bar: "#1B4B5A" },
  butter: { bg: "#F4D35E", text: "#241C15", ring: "#E5BD3A", bar: "#E5BD3A" },
};

const SectionLineage: React.FC = () => {
  /* slider value 0..100 */
  const [slider, setSlider] = useState(50);

  const minYear = MILESTONES[0].year;
  const maxYear = MILESTONES[MILESTONES.length - 1].year;
  const yearSpan = maxYear - minYear;

  /* 当前 slider 位置 → 找最近 milestone */
  const currentYear = minYear + (slider / 100) * yearSpan;
  const activeIdx = useMemo(() => {
    let best = 0;
    let bestDist = Infinity;
    MILESTONES.forEach((m, i) => {
      const d = Math.abs(m.year - currentYear);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }, [currentYear]);
  const active = MILESTONES[activeIdx];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">11 years lineage</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">11 年</span>
          </span>{" "}
          下来，每个角落都被蒸过一遍。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          Hinton 那篇论文出来到现在 11 年。下面这根线，是蒸馏从「图像分类小技巧」长到
          「养出一整代开源 LLM」的几个关键拐点。拖滑块，跳到任一年。
        </p>

        {/* 时间线主体 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          {/* timeline track */}
          <div className="relative pt-3 pb-12">
            {/* horizontal line */}
            <div className="absolute left-2 right-2 top-9 h-[3px] bg-ink/15 rounded-full" />
            <div
              className="absolute left-2 top-9 h-[3px] bg-coral rounded-full transition-all duration-300 ease-spring"
              style={{ width: `calc(${slider}% - 6px)` }}
            />

            {/* milestone dots */}
            {MILESTONES.map((m, i) => {
              const pct = ((m.year - minYear) / yearSpan) * 100;
              const isActive = i === activeIdx;
              const tone = TONE_COLORS[m.tone];
              return (
                <button
                  key={i}
                  onClick={() => setSlider(pct)}
                  className="absolute -translate-x-1/2 top-3 group/dot"
                  style={{ left: `${pct}%` }}
                >
                  <div
                    className={[
                      "rounded-full border-2 border-ink transition-all duration-300 ease-spring",
                      isActive
                        ? "w-6 h-6 shadow-stamp"
                        : "w-3.5 h-3.5",
                    ].join(" ")}
                    style={{ backgroundColor: isActive ? tone.bar : "#FBEFE3" }}
                  />
                  <div
                    className={[
                      "absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-mono font-bold transition-all duration-300",
                      isActive ? "text-[12px] text-ink" : "text-[10px] text-ink/55",
                    ].join(" ")}
                  >
                    {m.year}
                  </div>
                  <div
                    className={[
                      "absolute left-1/2 -translate-x-1/2 mt-7 whitespace-nowrap font-display font-bold transition-opacity duration-300",
                      isActive ? "opacity-100 text-[12px] text-ink" : "opacity-0 group-hover/dot:opacity-65 text-[11px] text-ink/65",
                    ].join(" ")}
                  >
                    {m.short}
                  </div>
                </button>
              );
            })}
          </div>

          {/* slider 控件 */}
          <div className="mt-8 pt-6 border-t border-ink/10">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 shrink-0">
                drag year
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                className="flex-1 accent-coral cursor-pointer"
              />
              <span className="font-display text-[20px] font-bold text-ink tabular-nums shrink-0 w-16 text-right">
                {currentYear.toFixed(1).replace(".0", "")}
              </span>
            </div>
          </div>
        </div>

        {/* 当前焦点卡 */}
        <div className="mt-6">
          <FocusCard milestone={active} />
        </div>

        <p className="mt-5 font-mono text-[10px] text-ink/40">
          来源：arXiv 编号见各卡片 · 时间标记取首次公开发布日 ·
          只挑改变思路的 6 个节点（其它 KD 变体如 TinyBERT / MiniLLM / DMD2 暂未单列）
        </p>
      </div>
    </section>
  );
};

const FocusCard: React.FC<{ milestone: Milestone }> = ({ milestone: m }) => {
  const tone = TONE_COLORS[m.tone];
  return (
    <div
      className="rounded-3xl shadow-stamp-xl p-6 lg:p-8 border-2 border-ink transition-all duration-300 ease-spring"
      style={{ backgroundColor: tone.bg, color: tone.text }}
      key={m.year + m.short}
    >
      <div className="grid lg:grid-cols-12 gap-5 animate-enter-fade" style={{ animationDuration: "0.4s" }}>
        <div className="lg:col-span-3">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2 opacity-65"
          >
            {m.monthLabel}
          </div>
          <div className="font-display text-display-lg font-bold leading-none mb-2">
            {m.year}
          </div>
          <div className="font-mono text-[11px] opacity-75">{m.who}</div>
          <div className="mt-3 inline-block px-2 py-0.5 rounded-full font-mono text-[9.5px] font-bold tracking-[0.1em]" style={{ backgroundColor: m.tone === "butter" ? "#241C15" : "rgba(251,239,227,0.15)", color: m.tone === "butter" ? "#FBEFE3" : tone.text }}>
            {m.ref}
          </div>
        </div>
        <div className="lg:col-span-9">
          <div className="font-display text-[24px] lg:text-[28px] font-bold leading-tight mb-3">
            {m.title}
          </div>
          <p className="font-display text-[16px] leading-snug mb-3 opacity-90 italic">
            {m.punch}
          </p>
          <p className="text-[14.5px] leading-relaxed opacity-80">{m.body}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionLineage;
