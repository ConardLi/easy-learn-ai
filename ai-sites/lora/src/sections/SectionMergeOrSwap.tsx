import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";
import { Layers, Zap } from "lucide-react";

type Mode = "merge" | "swap";

const COMPARE = {
  merge: {
    title: "Merge · 加回去",
    sub: "W' = W + BA · 训完合并",
    desc: "把 BA 直接累加到 W，得到一个新模型权重。推理时跟 base 模型完全相同，没有任何额外算子。",
    rows: [
      ["推理 latency", "和 base 一模一样 · 0 % 额外"],
      ["显存占用", "1 份模型权重 · 不变"],
      ["切换 adapter", "需要重新 load 一整个模型"],
      ["多租户场景", "不适合 · 每个客户一份完整模型"],
      ["典型使用", "单用途 · 离线发版 · GGUF 导出"],
    ],
    pros: ["零额外算子", "可导出 GGUF / ONNX", "推理框架不用改"],
    cons: ["adapter 切换贵", "无法多用户并发不同 adapter"],
  },
  swap: {
    title: "Hot-Swap · 不合并",
    sub: "y = Wx + BAx · 运行时保留旁路",
    desc: "BA 始终单独存放。同一份 base model 常驻 GPU，多个 adapter 按请求换入换出。",
    rows: [
      ["推理 latency", "+5-15% · 多一对 matmul"],
      ["显存占用", "1 份 base + N 份小 adapter (~30MB 各)"],
      ["切换 adapter", "毫秒级 · 改个指针"],
      ["多租户场景", "唯一可行架构"],
      ["典型使用", "SaaS · 一基模千客户 · Predibase / LoRAX"],
    ],
    pros: ["秒级多租户", "显存超省", "支持 batch 混 adapter"],
    cons: ["框架支持要 vLLM/LoRAX/SGLang", "略增 latency"],
  },
};

export default function SectionMergeOrSwap() {
  const [mode, setMode] = useState<Mode>("merge");
  const c = COMPARE[mode];

  return (
    <SectionFrame num="01" label="部署模式" background="bg-butter/30">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        训完之后，怎么用？两条路：合并，还是不合并。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        LoRA 训完是一对小矩阵 (B, A)。要不就把它加回主权重得一个新模型，要不就让它跟 base 并联运行。这两条路对应完全不同的部署架构。
      </p>

      <div className="inline-flex p-1.5 bg-ink rounded-full mb-8">
        {(["merge", "swap"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-5 py-2 rounded-full text-sm font-mono transition-all ${
              mode === m ? "bg-butter text-ink shadow-stamp" : "text-cream"
            }`}
          >
            {m === "merge" ? "MERGE 模式" : "HOT-SWAP 模式"}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-start" key={mode}>
        <div className="card-stamp p-7 bg-white animate-enter-fade">
          <div className="flex items-start gap-4 mb-5">
            <div className={`w-12 h-12 rounded-xl border-2 border-ink flex items-center justify-center ${mode === "merge" ? "bg-coral text-white" : "bg-teal text-white"}`}>
              {mode === "merge" ? <Zap className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
            </div>
            <div>
              <div className="font-mono text-xs text-ink-tertiary">{c.sub}</div>
              <h3 className="font-display text-2xl text-ink leading-tight">{c.title}</h3>
            </div>
          </div>

          <p className="text-base text-ink leading-relaxed mb-6">{c.desc}</p>

          <div className="space-y-2">
            {c.rows.map(([k, v], i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-ink/10 last:border-b-0">
                <div className="font-mono text-xs text-ink-tertiary w-32 flex-shrink-0 uppercase tracking-wider">{k}</div>
                <div className="text-sm text-ink flex-1">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 animate-enter-fade">
          <SchematicSVG mode={mode} />

          <div className="card-stamp p-5 bg-butter/30">
            <div className="eyebrow text-ink-tertiary mb-2">优点</div>
            <ul className="space-y-1.5">
              {c.pros.map((p, i) => (
                <li key={i} className="text-sm text-ink flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="eyebrow text-ink-tertiary mt-4 mb-2">代价</div>
            <ul className="space-y-1.5">
              {c.cons.map((p, i) => (
                <li key={i} className="text-sm text-ink-secondary flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-coral flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function SchematicSVG({ mode }: { mode: Mode }) {
  return (
    <div className="card-stamp p-5 bg-cream">
      <div className="eyebrow text-ink-tertiary mb-3">部署架构图</div>
      <svg viewBox="0 0 400 200" className="w-full h-auto">
        <text x="20" y="20" fontSize="9" fontFamily="Geist Mono, monospace" fill="#88837C">REQUEST →</text>

        {mode === "merge" ? (
          <>
            <rect x="100" y="60" width="200" height="80" rx="12" fill="#241C15" stroke="#241C15" strokeWidth="2.5" />
            <text x="200" y="95" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="18" fontWeight="800" fill="#F4D35E">W' = W + BA</text>
            <text x="200" y="118" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#FBEFE3">merged model · 一份</text>
            <line x1="20" y1="100" x2="98" y2="100" stroke="#241C15" strokeWidth="2" />
            <line x1="302" y1="100" x2="380" y2="100" stroke="#241C15" strokeWidth="2" />
            <text x="380" y="95" fontSize="9" fontFamily="Geist Mono, monospace" fill="#88837C" textAnchor="end">→ RESP</text>
          </>
        ) : (
          <>
            <rect x="60" y="50" width="160" height="100" rx="12" fill="#241C15" stroke="#241C15" strokeWidth="2.5" />
            <text x="140" y="92" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="18" fontWeight="800" fill="#F4D35E">base W</text>
            <text x="140" y="112" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#FBEFE3">8B · 一直驻留</text>

            {[
              { x: 270, y: 40, color: "#E07A5F", label: "客服" },
              { x: 270, y: 90, color: "#1B4B5A", label: "翻译" },
              { x: 270, y: 140, color: "#FF4D74", label: "代码" },
            ].map((a, i) => (
              <g key={i}>
                <rect x={a.x} y={a.y} width="80" height="32" rx="8" fill={a.color} stroke="#241C15" strokeWidth="2" />
                <text x={a.x + 40} y={a.y + 14} textAnchor="middle" fontSize="9" fontFamily="Geist Mono, monospace" fill="white" fontWeight="700">LoRA · {a.label}</text>
                <text x={a.x + 40} y={a.y + 26} textAnchor="middle" fontSize="8" fontFamily="Geist Mono, monospace" fill="white" opacity="0.85">~30 MB</text>
                <path d={`M220 100 Q ${(220 + a.x) / 2} ${(100 + a.y + 16) / 2} ${a.x} ${a.y + 16}`} stroke="#241C15" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.5" />
              </g>
            ))}

            <text x="380" y="100" fontSize="9" fontFamily="Geist Mono, monospace" fill="#88837C" textAnchor="end">→ 按请求挑 adapter</text>
          </>
        )}
      </svg>
    </div>
  );
}
