import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";
import { ExternalLink } from "lucide-react";

type Pack = {
  use: string;
  base: string;
  size: string;
  author: string;
  trained: string;
  desc: string;
  hot: "high" | "mid" | "niche";
};

const ADAPTERS: Pack[] = [
  {
    use: "SQL 生成",
    base: "Mistral-7B",
    size: "42 MB",
    author: "Predibase / b-mc2",
    trained: "sql-create-context 78K · r=16",
    desc: "把自然语言问题转成 SQLite/PostgreSQL 查询。LoRA Land 排行常驻前 5。",
    hot: "high",
  },
  {
    use: "客服客诉分类",
    base: "Llama-3-8B",
    size: "31 MB",
    author: "PolyAI / Banking77 LoRA",
    trained: "Banking77 13K · r=8",
    desc: "把客户工单按 77 类意图打标 — 准确率 92.4%，跑在边缘设备。",
    hot: "mid",
  },
  {
    use: "古诗续写",
    base: "Qwen2.5-7B",
    size: "28 MB",
    author: "Qwen 社区",
    trained: "全唐诗 + 词谱 5W 首 · r=32",
    desc: "保留 base 中文能力，仅在韵律和意境上 nudge。中文社区下载量第一类。",
    hot: "mid",
  },
  {
    use: "JSON 严格输出",
    base: "Llama-3-8B",
    size: "37 MB",
    author: "Outlines / function-calling LoRA",
    trained: "12K 真实 function-call 对话 · r=16",
    desc: "强约束 LLM 输出合法 JSON schema · 配合 Outlines 几乎零失败。",
    hot: "high",
  },
  {
    use: "医学问答",
    base: "Llama-3-8B-Instruct",
    size: "44 MB",
    author: "Stanford Crfm",
    trained: "PubMedQA + MedQA 30K · r=32",
    desc: "用于辅助研究检索，**不能用作诊断**。base 知识保留，只 nudge 检索风格。",
    hot: "niche",
  },
  {
    use: "图生文 caption 风格",
    base: "Llava-1.6-7B",
    size: "39 MB",
    author: "openbmb",
    trained: "BLIP-3 风格化 caption 18K",
    desc: "在 caption 阶段加入更细的人物动作描述，把 visual reasoning 拉到生活场景。",
    hot: "niche",
  },
];

const HOT_LABEL = {
  high: { l: "高热度", c: "bg-coral text-white" },
  mid: { l: "中等", c: "bg-butter text-ink" },
  niche: { l: "小众", c: "bg-ink text-butter" },
};

export default function SectionHub() {
  const [filter, setFilter] = useState<"all" | "high" | "mid" | "niche">("all");
  const list = filter === "all" ? ADAPTERS : ADAPTERS.filter((a) => a.hot === filter);

  return (
    <SectionFrame num="06" label="HF Hub 货架" background="bg-butter/30">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        生态长出来了 · 一个 base 模型，挂着无数 LoRA。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        2024-2026 HuggingFace Hub 上 LoRA adapter 数量从几千涨到上万。下面是 6 个典型用法，看看人家挂了什么、训了什么、效果用在哪。
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {(["all", "high", "mid", "niche"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-4 py-2 rounded-full text-sm font-mono border-2 transition-all ${
              filter === k
                ? "bg-ink text-butter border-ink shadow-stamp -translate-y-[2px]"
                : "bg-white text-ink border-ink/30 hover:border-ink"
            }`}
          >
            {k === "all" ? "全部" : HOT_LABEL[k].l}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((a, i) => {
          const h = HOT_LABEL[a.hot];
          return (
            <div key={i} className="card-stamp p-5 bg-white flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-display text-lg font-bold text-ink leading-tight flex-1">{a.use}</h3>
                <span className={`px-2 py-0.5 font-mono text-[10px] rounded-full border border-ink whitespace-nowrap ${h.c}`}>
                  {h.l}
                </span>
              </div>

              <div className="space-y-1.5 mb-4 text-xs">
                <KV k="base" v={a.base} />
                <KV k="adapter" v={a.size} />
                <KV k="作者" v={a.author} />
                <KV k="训练" v={a.trained} />
              </div>

              <p className="text-sm text-ink-secondary leading-relaxed flex-1">{a.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 card-stamp p-6 bg-cream flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
        <div>
          <h3 className="font-display text-xl text-ink leading-tight mb-1">
            想看更多 / 自己上传？
          </h3>
          <p className="text-sm text-ink-secondary">
            HuggingFace Hub 上 LoRA adapter 已经超过 2 万个，Predibase LoRA Land 提供了 31 个开源 SOTA adapter 的 evaluation 基线。
          </p>
        </div>
        <a
          href="https://huggingface.co/models?other=lora"
          target="_blank"
          rel="noreferrer"
          className="btn-stamp bg-ink text-butter flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          浏览 HF Hub
        </a>
      </div>
    </SectionFrame>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-wider w-14 flex-shrink-0 mt-0.5">{k}</span>
      <span className="text-ink flex-1 leading-snug">{v}</span>
    </div>
  );
}
