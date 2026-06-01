/**
 * Section 06 · 「Llama 长出了一片森林」· 衍生模型生态
 *
 * 形式：chip 阵列筛选（按用途）+ 节点卡片网格 + hover 看一句话简介。
 * 跟 quantization 站「ecosystem 4 个工具卡」轴向不同 —— 这里是 16 个 derivative 节点 + 5 个 chip 维度。
 * 跟 deepseek-r1 站「6 个 distill picker」也不同 —— 那是 1×n 横列模型对比，这里是 n×多分类筛选 + hover。
 *
 * 数据来源：
 *   - Stanford Alpaca · crfm.stanford.edu/2023/03/13/alpaca
 *   - LMSYS Vicuna · lmsys.org/blog/2023-03-30-vicuna
 *   - WizardLM · arXiv:2304.12244
 *   - Code Llama · arXiv:2308.12950
 *   - LLaVA · arXiv:2304.08485
 *   - llama.cpp · github.com/ggerganov/llama.cpp
 *   - Mistral 7B 与 Llama 同期对比 · arXiv:2310.06825
 *   - DeepSeek LLM 早期借鉴 Llama 架构 · arXiv:2401.02954
 *   - 中文：Chinese-LLaMA-Alpaca arXiv:2304.08177、Atom-7B、ColossalLlama · github / Atom-7B
 */
import React, { useState } from "react";
import { Github } from "lucide-react";

type Tag = "research" | "chat" | "code" | "chinese" | "vision" | "infra";

type Item = {
  name: string;
  by: string;
  ymd: string;
  base: string;
  tags: Tag[];
  desc: string;
};

const ITEMS: Item[] = [
  {
    name: "Stanford Alpaca",
    by: "Stanford CRFM",
    ymd: "2023·03",
    base: "LLaMA 1 7B",
    tags: ["research", "chat"],
    desc: "52K 条 self-instruct 指令微调，第一次有人用 < 600 美金把开源 base 调成对话。",
  },
  {
    name: "Vicuna",
    by: "LMSYS",
    ymd: "2023·03",
    base: "LLaMA 1 13B",
    tags: ["research", "chat"],
    desc: "拿 70K ShareGPT 用户对话微调，靠 GPT-4 当裁判跑分声称 90% ChatGPT 水准。",
  },
  {
    name: "Koala",
    by: "UC Berkeley BAIR",
    ymd: "2023·04",
    base: "LLaMA 1 13B",
    tags: ["research", "chat"],
    desc: "学术算力复现 ChatGPT 体验，蒸馏 + 公开 dialogue 数据集。",
  },
  {
    name: "WizardLM",
    by: "Microsoft",
    ymd: "2023·04",
    base: "LLaMA 1 7B",
    tags: ["research", "chat"],
    desc: "Evol-Instruct：让 GPT 把简单指令进化成复杂指令，跑分赢 Vicuna。",
  },
  {
    name: "llama.cpp",
    by: "Georgi Gerganov",
    ymd: "2023·03",
    base: "推理引擎",
    tags: ["infra"],
    desc: "纯 C/C++ 推理 + 4-bit 量化，让 7B 跑在 MacBook M1 上。GGUF 格式从这里长出来。",
  },
  {
    name: "Code Llama",
    by: "Meta",
    ymd: "2023·08",
    base: "Llama 2 7/13/34/70B",
    tags: ["code"],
    desc: "在 Llama 2 上继续训 500B tokens 的代码数据，Meta 自己出的代码专用版。",
  },
  {
    name: "LLaVA",
    by: "Microsoft / UW",
    ymd: "2023·04",
    base: "Vicuna + CLIP-ViT-L/14",
    tags: ["vision"],
    desc: "把 CLIP 图像 encoder 接到 Vicuna 上，是 2023 年最热的开源多模态项目。",
  },
  {
    name: "Chinese-LLaMA-Alpaca",
    by: "哈工大 Yiming Cui 团队",
    ymd: "2023·04",
    base: "LLaMA 1 7B",
    tags: ["chinese", "research"],
    desc: "扩中文词表 + 二次预训 + 中文指令微调，是中文社区最早的 Llama 中文化方案。",
  },
  {
    name: "Atom-7B",
    by: "FlagOpen",
    ymd: "2023·08",
    base: "Llama 2 7B",
    tags: ["chinese", "chat"],
    desc: "中文增量预训 + SFT，把 Llama 2 中文水平拉到当时国产开源同档位。",
  },
  {
    name: "Mistral 7B",
    by: "Mistral AI",
    ymd: "2023·09",
    base: "类 Llama 架构（独立训练）",
    tags: ["research", "chat"],
    desc: "走同架构思路从头独立训练，没在 Llama 上做 fine-tune。Sliding-window attention + GQA，把 Llama 2 13B 跑分压住。",
  },
  {
    name: "DeepSeek LLM 67B",
    by: "DeepSeek",
    ymd: "2023·11",
    base: "Llama 2 风格架构",
    tags: ["chinese", "research"],
    desc: "DeepSeek 起步阶段沿用 Llama 2 架构思路独立训，后来才逐代分叉到 V2 / V3 自己的 MoE。",
  },
  {
    name: "Llama Guard",
    by: "Meta",
    ymd: "2023·12",
    base: "Llama 2 7B",
    tags: ["infra"],
    desc: "专做输入输出安全分类的小模型，Meta 自己出的护栏组件。",
  },
  {
    name: "Llama 3 中文版集合",
    by: "社区多家",
    ymd: "2024·05",
    base: "Llama 3 8B / 70B",
    tags: ["chinese", "chat"],
    desc: "Llama-3-Chinese-8B-Instruct（哈工大）/ Llama3-Chinese（Shenzhi）等多家方案并行。",
  },
  {
    name: "Ollama",
    by: "Jeffrey Morgan & 团队",
    ymd: "2023·07",
    base: "推理引擎",
    tags: ["infra"],
    desc: "包装 llama.cpp 加用户体验，一行命令拉模型跑本地。今天本地跑 Llama 默认就是它。",
  },
  {
    name: "Open Interpreter",
    by: "Killian Lucas",
    ymd: "2023·09",
    base: "Llama 2 / Code Llama",
    tags: ["code"],
    desc: "让本地 Llama 直接执行 Python / shell 命令，开源对标 ChatGPT Code Interpreter。",
  },
  {
    name: "Llama 3.2 Vision",
    by: "Meta",
    ymd: "2024·09",
    base: "Llama 3.1 + 视觉适配器",
    tags: ["vision"],
    desc: "Meta 自己上的视觉版，先用 Adapter 路线，到 Llama 4 才换原生多模态。",
  },
];

const TAG_LABELS: Record<Tag, string> = {
  research: "研究 / 复现",
  chat: "对话",
  code: "代码",
  chinese: "中文",
  vision: "多模态",
  infra: "推理 · 工具",
};

const TAGS_ORDER: Tag[] = ["research", "chat", "code", "chinese", "vision", "infra"];

const SectionEcosystem: React.FC = () => {
  const [filter, setFilter] = useState<Tag | "all">("all");
  const filtered = filter === "all" ? ITEMS : ITEMS.filter((it) => it.tags.includes(filter));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">the forest llama grew</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          围着 Llama 长出来的
          <br />
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-teal/35 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">一片衍生项目</span>
          </span>
          。
        </h2>

        <p className="max-w-2xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          真正把开源 LLM 圈带起来的，是围着 Llama 长出来的那批衍生项目。
          下面是 16 个直接长在 Llama 上的代表 —— 从最早 Alpaca 到后来 llama.cpp / Code Llama / 中文化方案。
          点 chip 看不同方向上长出来的是什么。
        </p>

        {/* chip 阵列 */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={[
              "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[12px] font-bold transition-all duration-200 ease-spring",
              filter === "all"
                ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                : "bg-white text-ink/65 hover:bg-butter/30",
            ].join(" ")}
          >
            全部 · {ITEMS.length}
          </button>
          {TAGS_ORDER.map((t) => {
            const count = ITEMS.filter((it) => it.tags.includes(t)).length;
            const on = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={[
                  "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[12px] font-bold transition-all duration-200 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                    : "bg-white text-ink/65 hover:bg-butter/30",
                ].join(" ")}
              >
                {TAG_LABELS[t]} · {count}
              </button>
            );
          })}
        </div>

        {/* 节点 grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((it) => (
            <div
              key={it.name}
              className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 group hover:shadow-stamp-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 ease-spring"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="font-display text-[16px] font-bold text-ink leading-tight">
                  {it.name}
                </div>
                <div className="font-mono text-[10px] text-ink/45 tracking-wider flex-none ml-2">
                  {it.ymd}
                </div>
              </div>
              <div className="font-mono text-[10.5px] text-ink/55 mb-1.5 flex items-center gap-1">
                <Github className="w-3 h-3" strokeWidth={2} />
                {it.by}
              </div>
              <div className="inline-block bg-cream border border-ink/15 rounded px-1.5 py-0.5 font-mono text-[10px] text-ink/70 mb-2.5">
                from · {it.base}
              </div>
              <p className="text-[12.5px] text-ink/75 leading-relaxed mb-3">{it.desc}</p>
              <div className="flex flex-wrap gap-1">
                {it.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9.5px] text-ink/55 px-1.5 py-0.5 rounded border border-ink/20"
                  >
                    {TAG_LABELS[t]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10.5px] text-ink/45 max-w-2xl leading-relaxed">
          这 16 只是显眼的一层。HuggingFace 上 fine-tune-of-Llama 标签下截至 2026 年 5 月已超过 12 万个 repo —— 大部分是各家公司私藏的专用对齐版。
        </p>
      </div>
    </section>
  );
};

export default SectionEcosystem;
