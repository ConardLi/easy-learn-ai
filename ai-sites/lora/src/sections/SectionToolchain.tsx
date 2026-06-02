import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";

type Tool = {
  id: string;
  name: string;
  sub: string;
  defR: string;
  defLayer: string;
  qlora: "yes" | "yes-plus" | "no";
  speed: number;
  vram: number;
  who: string;
  url: string;
  badge: string;
};

const TOOLS: Tool[] = [
  {
    id: "peft",
    name: "HuggingFace PEFT",
    sub: "v0.13 · 2026 标准",
    defR: "r=8, α=16",
    defLayer: "需手动指定 target_modules",
    qlora: "yes",
    speed: 3,
    vram: 3,
    who: "想要稳定 API、跟 transformers 紧密集成、做研究复现。",
    url: "huggingface.co/docs/peft",
    badge: "标准",
  },
  {
    id: "unsloth",
    name: "Unsloth",
    sub: "2x 训练加速 · 70% 显存",
    defR: "r=16, α=16",
    defLayer: "默认 all-linear · QLoRA",
    qlora: "yes-plus",
    speed: 5,
    vram: 5,
    who: "想快、想省、单卡训 7B-70B。Colab / 单 4090 友好。",
    url: "github.com/unslothai/unsloth",
    badge: "单卡省显存、速度快",
  },
  {
    id: "axolotl",
    name: "Axolotl",
    sub: "YAML 即配置 · 配方齐全",
    defR: "r=32, α=16",
    defLayer: "all-linear · 一行切换",
    qlora: "yes",
    speed: 4,
    vram: 4,
    who: "团队协作、配方版本化、做大量超参 sweep。",
    url: "github.com/axolotl-ai-cloud/axolotl",
    badge: "工业团队",
  },
  {
    id: "trl",
    name: "TRL",
    sub: "HF 官方 SFT/DPO/PPO 一站",
    defR: "r=8, α=32",
    defLayer: "跟 PEFT 一致",
    qlora: "yes",
    speed: 3,
    vram: 3,
    who: "做 SFT + DPO + RLHF 全链路、想跟生态深度集成。",
    url: "huggingface.co/docs/trl",
    badge: "对齐管道",
  },
  {
    id: "llamafactory",
    name: "LLaMA-Factory",
    sub: "可视化 + 全方法支持",
    defR: "r=8, α=16",
    defLayer: "default freeze last 2 + LoRA all-linear",
    qlora: "yes",
    speed: 4,
    vram: 4,
    who: "刚入门、Web UI 操作、需要中文文档。",
    url: "github.com/hiyouga/LLaMA-Factory",
    badge: "上手快",
  },
  {
    id: "mlx",
    name: "mlx-lm",
    sub: "Apple Silicon 原生 · 2025",
    defR: "r=8, α=20",
    defLayer: "默认 q+v · 可选 all-linear",
    qlora: "yes",
    speed: 3,
    vram: 5,
    who: "Mac 用户、M3/M4 在端侧训 7B 以下。",
    url: "github.com/ml-explore/mlx-examples",
    badge: "Mac 专属",
  },
];

export default function SectionToolchain() {
  const [sort, setSort] = useState<"speed" | "vram" | "alpha">("speed");
  const sorted = [...TOOLS].sort((a, b) => {
    if (sort === "speed") return b.speed - a.speed;
    if (sort === "vram") return b.vram - a.vram;
    return a.name.localeCompare(b.name);
  });

  return (
    <SectionFrame num="05" label="工具链" background="bg-cream">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        2026 跑 LoRA 用什么？六个候选。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        每个工具都有自己的脾气：PEFT 是底座，Unsloth 拼速度和显存，Axolotl 拼配方齐全。先看自己的痛点是什么。
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm font-mono text-ink-tertiary">排序：</span>
        {([
          ["speed", "按速度"],
          ["vram", "按省显存"],
          ["alpha", "字母序"],
        ] as const).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSort(k)}
            className={`px-3 py-1 rounded-full text-xs font-mono border-2 transition-all ${
              sort === k ? "bg-ink text-butter border-ink" : "bg-white text-ink border-ink/30 hover:border-ink"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((t) => (
          <div key={t.id} className="card-stamp p-5 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-ink leading-tight">{t.name}</h3>
                <div className="font-mono text-[11px] text-ink-tertiary mt-0.5">{t.sub}</div>
              </div>
              <span className="px-2 py-0.5 bg-butter border-2 border-ink rounded-full font-mono text-[10px] text-ink whitespace-nowrap">
                {t.badge}
              </span>
            </div>

            <div className="space-y-2 mb-4 text-xs">
              <KV k="默认 r/α" v={t.defR} />
              <KV k="默认挂层" v={t.defLayer} />
              <KV k="QLoRA" v={t.qlora === "yes-plus" ? "原生集成 · 4bit/8bit" : t.qlora === "yes" ? "支持" : "不支持"} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <Score label="速度" v={t.speed} />
              <Score label="省显存" v={t.vram} />
            </div>

            <p className="text-xs text-ink-secondary leading-relaxed mb-2">{t.who}</p>
            <div className="font-mono text-[10px] text-ink-tertiary truncate">{t.url}</div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-wider w-16 flex-shrink-0 mt-0.5">{k}</span>
      <span className="text-ink flex-1 leading-snug">{v}</span>
    </div>
  );
}

function Score({ label, v }: { label: string; v: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-[10px] text-ink-tertiary w-12 uppercase tracking-wider">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-sm border border-ink ${i <= v ? "bg-ink" : "bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}
