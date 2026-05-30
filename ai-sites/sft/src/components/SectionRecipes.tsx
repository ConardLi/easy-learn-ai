/**
 * Section 05 · 真实 SFT 配方 · 谁怎么做
 *
 * 4 个公开配方横向对比（accordion + sort 切换）：
 *   LIMA / OpenHermes 2.5 / Magpie-Pro / Tulu 3 SFT-Mix / DeepSeek V3 SFT
 *
 * 每个：数据量 / 数据来源 / lr / epochs / 训练时间 / 出来的模型 / 怎么发数据
 */
import React, { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

type Recipe = {
  id: string;
  name: string;
  year: number;
  org: string;
  vibe: string;
  size: number;
  sizeLabel: string;
  source: string;
  lr: string;
  epochs: string;
  base: string;
  result: string;
  detail: string;
  link: string;
  paper: string;
  tone: "butter" | "teal" | "coral" | "pop" | "ink";
};

const RECIPES: Recipe[] = [
  {
    id: "lima",
    name: "LIMA",
    year: 2023,
    org: "Meta AI",
    vibe: "极少 + 极精",
    size: 1000,
    sizeLabel: "1,000 条",
    source: "750 条 Stack Exchange / wikiHow / Reddit 精挑 + 250 条手写",
    lr: "1e-5",
    epochs: "15",
    base: "LLaMA 65B",
    result: "盲测对 GPT-4 平手率 43% · 对 Bard 58% · 对 davinci-003 65%",
    detail:
      "Meta 提出「superficial alignment hypothesis」—— 模型的知识在 pre-train 就学完了，SFT 只是教格式。1000 条手挑数据训出来的 LIMA，性能直接挑战当时的商业模型。所有响应严格统一风格、单作者校对。无 RLHF。",
    link: "https://huggingface.co/papers/2305.11206",
    paper: "arXiv:2305.11206",
    tone: "coral",
  },
  {
    id: "openhermes",
    name: "OpenHermes 2.5",
    year: 2024,
    org: "Teknium",
    vibe: "海量 + 多源混合",
    size: 1000000,
    sizeLabel: "≈ 1M 条",
    source:
      "GPTeacher / Airoboros / WizardLM / Capybara / GlaiveAI 等十几个公开/合成数据混合",
    lr: "5e-6 ~ 2e-5",
    epochs: "3 ~ 4",
    base: "Mistral 7B · Llama 3 8B",
    result: "OpenHermes-2.5-Mistral 是 2024 上半年开源社区 SFT 模型基线",
    detail:
      "把整个开源社区的合成数据集大杂烩到一起，去重、去脏话、去 GPT 拒绝回答的样本，留下大约 100 万条。代表了「合成数据 + 混合源」路线的下限保证。出来的模型 GPT-4 风格明显（毕竟教师就是 GPT-4 / Claude 蒸的）。",
    link: "https://huggingface.co/datasets/teknium/OpenHermes-2.5",
    paper: "Teknium · HF dataset card",
    tone: "butter",
  },
  {
    id: "magpie",
    name: "Magpie-Pro",
    year: 2024,
    org: "Univ. of Washington",
    vibe: "自抽取 · 零种子",
    size: 300000,
    sizeLabel: "300K 精选 / 4M 原始",
    source: "用 Llama-3-70B-Instruct 自己生成 instruction + response，再筛 300K 高质量",
    lr: "2e-5",
    epochs: "2",
    base: "Llama 3 8B base",
    result: "AlpacaEval 2 上超过 Llama-3-8B-Instruct 官方版（后者还用了 10M SFT + DPO）",
    detail:
      "ICLR 2025 论文。核心 trick：给 aligned 模型只喂模板前半段「<|im_start|>user\\n」，模型自动续写出 instruction，再让它接着回答。不需要任何 seed、不需要 prompt 工程。Llama 3 70B-Instruct 抽 4M 条，去重 + 难度过滤剩 300K。",
    link: "https://magpie-align.github.io/",
    paper: "arXiv:2406.08464",
    tone: "teal",
  },
  {
    id: "tulu3",
    name: "Tulu 3 SFT-Mix",
    year: 2024,
    org: "AllenAI",
    vibe: "工业级 · 多技能桶",
    size: 939343,
    sizeLabel: "939,343 条",
    source: "20+ 公开源 + persona 驱动合成 + 严格去 benchmark 污染",
    lr: "5e-6",
    epochs: "2",
    base: "Llama 3.1 8B / 70B / 405B base",
    result: "Tulu 3 全开源 post-training pipeline 的 SFT 阶段输出",
    detail:
      "从 23,327,961 条候选 prompt 精筛到 939K，分 9 桶：math 334K · coding 142K · safety 111K · multilingual 100K · knowledge 105K · general 117K · precise IF 30K。每桶来源不同方法不同。代表 2026 主流大厂 SFT 配方做法 —— 不再赌 1000 条神话，而是认真分类堆量。",
    link: "https://huggingface.co/datasets/allenai/tulu-3-sft-mixture",
    paper: "arXiv:2411.15124",
    tone: "pop",
  },
  {
    id: "deepseek",
    name: "DeepSeek V3 SFT",
    year: 2024,
    org: "DeepSeek AI",
    vibe: "R1 蒸馏 + 人审",
    size: 1500000,
    sizeLabel: "1.5M 条",
    source:
      "推理类用内部 DeepSeek-R1 生成 + rejection sampling；非推理类用 DeepSeek-V2.5 生成 + 人工核",
    lr: "未公开（推测 5e-6）",
    epochs: "2",
    base: "DeepSeek V3 671B (37B activated)",
    result: "拿到与闭源 frontier 模型同档表现 · 开源",
    detail:
      "技术报告里明说：推理数据由内部 R1 跑 + 拒绝采样过滤（要平衡 R1 的准 vs 啰嗦）。非推理数据是 V2.5 生 + 人审。训 2 epoch，packing 时给每个样本独立的 attention mask 防止串台。代表「拿大模型蒸数据训自己」这条 2026 主流路线。",
    link: "https://github.com/deepseek-ai/DeepSeek-V3",
    paper: "DeepSeek-V3 Technical Report · 2024-12",
    tone: "ink",
  },
];

type SortMode = "year" | "size" | "vibe";

const SectionRecipes: React.FC = () => {
  const [open, setOpen] = useState<string | null>("tulu3");
  const [sort, setSort] = useState<SortMode>("year");

  const sorted = [...RECIPES].sort((a, b) => {
    if (sort === "year") return b.year - a.year || b.size - a.size;
    if (sort === "size") return b.size - a.size;
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-butter-tint/40">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">真实配方</span>
        </div>

        <h2 className="font-display text-display-lg mb-3">
          这 5 个配方代表了 2026 SFT 的所有路线
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-8">
          从 1000 条到 1.5M 条，从手写到 R1 蒸馏，从全公开到只发模型不发数据。每条都对应当时的一个流派。
        </p>

        {/* sort 切换 */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mr-1">
            排序
          </span>
          {[
            { id: "year", label: "按年份" },
            { id: "size", label: "按数据量" },
            { id: "vibe", label: "按名字" },
          ].map((s) => {
            const on = sort === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSort(s.id as SortMode)}
                className={[
                  "px-3 py-1 rounded-full border-2 border-ink font-mono text-[10.5px] font-semibold transition-all",
                  on
                    ? "bg-ink text-cream shadow-[2px_2px_0_0_#E07A5F]"
                    : "bg-white text-ink/70 hover:bg-cream",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* accordion list */}
        <div className="space-y-3">
          {sorted.map((r) => {
            const isOpen = open === r.id;
            const toneBg = {
              butter: "bg-butter",
              teal: "bg-teal text-cream",
              coral: "bg-coral text-cream",
              pop: "bg-pop text-cream",
              ink: "bg-ink text-cream",
            }[r.tone];

            return (
              <div
                key={r.id}
                className={[
                  "border-2 border-ink rounded-2xl transition-all duration-300 overflow-hidden",
                  isOpen ? "shadow-stamp-lg bg-white" : "bg-white",
                ].join(" ")}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className="w-full flex items-center gap-3 px-4 lg:px-5 py-4 text-left"
                >
                  <div
                    className={[
                      "shrink-0 px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[10.5px] font-bold uppercase tracking-wider",
                      toneBg,
                    ].join(" ")}
                  >
                    {r.year}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-display text-[18px] lg:text-[20px] font-bold text-ink">
                        {r.name}
                      </span>
                      <span className="font-mono text-[10.5px] text-ink/55">
                        {r.org}
                      </span>
                      <span className="font-mono text-[10.5px] font-semibold text-coral">
                        · {r.vibe}
                      </span>
                    </div>
                    <p className="font-sans text-[12.5px] text-ink/65 mt-0.5">
                      {r.sizeLabel} · base = {r.base} · {r.epochs} epochs
                    </p>
                  </div>
                  <ChevronDown
                    className={[
                      "shrink-0 w-5 h-5 text-ink/60 transition-transform duration-300",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 lg:px-5 pb-5 pt-1 animate-enter-fade">
                    <div className="grid lg:grid-cols-12 gap-5 pt-3 border-t border-ink/10">
                      <div className="lg:col-span-7 space-y-3">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                            数据来源
                          </div>
                          <p className="font-sans text-[13.5px] text-ink/85 leading-relaxed">
                            {r.source}
                          </p>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                            做法细节
                          </div>
                          <p className="font-sans text-[13.5px] text-ink/85 leading-relaxed">
                            {r.detail}
                          </p>
                        </div>
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <a
                            href={r.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-cream rounded-md font-mono text-[10.5px] font-semibold hover:bg-ink/80 transition-colors"
                          >
                            数据 / 模型卡
                            <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
                          </a>
                          <span className="font-mono text-[10.5px] text-ink/45">
                            {r.paper}
                          </span>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-2">
                        <SpecRow k="数据量" v={r.sizeLabel} />
                        <SpecRow k="learning rate" v={r.lr} />
                        <SpecRow k="epochs" v={r.epochs} />
                        <SpecRow k="base model" v={r.base} />
                        <div className="mt-2 p-3 bg-butter-tint border-2 border-ink/25 rounded-lg">
                          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                            出来的模型
                          </div>
                          <p className="font-sans text-[12.5px] text-ink leading-snug">
                            {r.result}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-[10px] text-ink/45 leading-relaxed">
          数据来源 · LIMA arXiv:2305.11206 · OpenHermes HF teknium/OpenHermes-2.5 · Magpie arXiv:2406.08464 · Tulu 3 arXiv:2411.15124 · DeepSeek V3 Technical Report 2024-12
        </p>
      </div>
    </section>
  );
};

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between px-3 py-1.5 bg-cream border-2 border-ink/20 rounded-lg">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">
        {k}
      </span>
      <span className="font-mono text-[12px] font-bold text-ink tabular-nums">
        {v}
      </span>
    </div>
  );
}

export default SectionRecipes;
