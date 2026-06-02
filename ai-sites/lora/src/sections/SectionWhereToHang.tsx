import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";

type Profile = "qv" | "attn" | "all";

const PROFILES: Record<Profile, {
  name: string;
  sub: string;
  layers: string[];
  trainable: string;
  pct: string;
  speed: string;
  quality: number;
  desc: string;
  who: string;
}> = {
  qv: {
    name: "q + v only",
    sub: "Hu et al. 2021 原版配置",
    layers: ["q_proj", "v_proj"],
    trainable: "8.4 M",
    pct: "0.10 %",
    speed: "最快",
    quality: 2.5,
    desc: "原论文配置。当年用 GPT-3 175B 验证，这两层就够 — 因为 self-attention 的 Q 和 V 已经能搬动语义。",
    who: "做学术 ablation / 复现原论文 / 显存极度紧。2026 实战已不主流。",
  },
  attn: {
    name: "all attention",
    sub: "Q + K + V + O 四层",
    layers: ["q_proj", "k_proj", "v_proj", "o_proj"],
    trainable: "16.8 M",
    pct: "0.20 %",
    speed: "快",
    quality: 3.8,
    desc: "覆盖整个 attention 块。能学到 K/V 的关注模式，比只动 q+v 多兜住边缘任务。",
    who: "标准 SFT / 指令微调 / 多数 alignment 任务的默认。",
  },
  all: {
    name: "all-linear",
    sub: "Attention + 3 个 MLP proj",
    layers: ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    trainable: "42.0 M",
    pct: "0.52 %",
    speed: "慢 30%",
    quality: 4.7,
    desc: "把 MLP 的 gate / up / down 也挂上。多数 2024-2026 实战训练（Unsloth / Axolotl 默认）都采这套。",
    who: "代码 / 数学 / 推理 / 领域大改造 / Chat → Reasoner 转型。",
  },
};

export default function SectionWhereToHang() {
  const [p, setP] = useState<Profile>("attn");
  const profile = PROFILES[p];

  return (
    <SectionFrame num="02" label="挂哪些层">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        原论文只挂两层就够；现在常用工具默认挂 7 处，多挂更慢、略好。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-4 max-w-3xl">
        每层里都有几块线性层，负责「看谁」和「算特征」：<span className="font-mono text-base text-ink">q_proj / k_proj / v_proj / o_proj</span> 是 attention（决定一个词去关注哪些词），<span className="font-mono text-base text-ink">gate_proj / up_proj / down_proj</span> 是 MLP（提炼特征）。补丁就挂在这些块上。
      </p>
      <p className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-3xl">
        原论文只挂了 attention 的 Q 和 V 两块。今天的 Unsloth、Axolotl、LLaMA-Factory 默认挂到 MLP，一共 7 处。三档切来感受差异。
      </p>

      <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start">
        <div className="space-y-2">
          {(["qv", "attn", "all"] as Profile[]).map((id) => {
            const a = id === p;
            const pf = PROFILES[id];
            return (
              <button
                key={id}
                onClick={() => setP(id)}
                className={`w-full text-left px-4 py-4 rounded-2xl border-2 transition-all duration-250 ease-spring ${
                  a ? "bg-ink text-cream border-ink shadow-stamp" : "bg-white border-ink/30 hover:border-ink text-ink"
                }`}
              >
                <div className="font-display text-lg font-bold leading-tight">{pf.name}</div>
                <div className={`text-xs font-mono mt-1 ${a ? "text-butter" : "text-ink-tertiary"}`}>{pf.sub}</div>
              </button>
            );
          })}
        </div>

        <div className="card-stamp p-7 bg-white" key={p}>
          <div className="animate-enter-fade">
            <div className="grid grid-cols-4 gap-3 mb-2">
              <Metric label="可训参数" value={profile.trainable} />
              <Metric label="占 8B 比例" value={profile.pct} />
              <Metric label="单 step 速度" value={profile.speed} />
              <Metric label="预估效果" value={`${profile.quality.toFixed(1)}/5`} />
            </div>
            <p className="text-[11px] font-mono text-ink-tertiary mb-6">
              「预估效果」为示意分，帮你感受三档的相对差距，非实测 benchmark。
            </p>

            <div className="bg-cream border-2 border-ink rounded-2xl p-5 mb-5">
              <div className="eyebrow text-ink-tertiary mb-3">挂上 LoRA 的层</div>
              <div className="flex flex-wrap gap-2">
                {profile.layers.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-1.5 bg-butter border-2 border-ink font-mono text-xs rounded-full"
                  >
                    {l}
                  </span>
                ))}
                {Array.from({ length: 7 - profile.layers.length }).map((_, i) => (
                  <span
                    key={`empty-${i}`}
                    className="px-3 py-1.5 bg-white border-2 border-ink/15 font-mono text-xs rounded-full text-ink-tertiary line-through opacity-40"
                  >
                    {["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"].filter((l) => !profile.layers.includes(l))[i]}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-base text-ink leading-relaxed mb-4">{profile.desc}</p>

            <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-ink bg-butter/30">
              <div className="font-mono text-xs text-ink-tertiary flex-shrink-0 mt-1 uppercase tracking-wider w-16">谁用</div>
              <div className="text-sm text-ink leading-relaxed">{profile.who}</div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-ink rounded-xl p-3 bg-butter/15">
      <div className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest mb-1">{label}</div>
      <div className="font-display text-xl text-ink font-bold leading-tight">{value}</div>
    </div>
  );
}
