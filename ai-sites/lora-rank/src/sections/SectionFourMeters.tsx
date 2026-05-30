import React, { useMemo, useState } from "react";
import SectionFrame from "../components/SectionFrame";

const R_OPTIONS = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];

const BASE_MODELS = [
  { id: "1b", name: "Llama-3.2-1B", d: 2048, layers: 16, ngpu_full_vram: 24 },
  { id: "8b", name: "Llama-3-8B", d: 4096, layers: 32, ngpu_full_vram: 60 },
  { id: "13b", name: "Llama-2-13B", d: 5120, layers: 40, ngpu_full_vram: 100 },
  { id: "70b", name: "Llama-3-70B", d: 8192, layers: 80, ngpu_full_vram: 280 },
];

const MODULES_PER_LAYER = 7;

export default function SectionFourMeters() {
  const [rIdx, setRIdx] = useState(4);
  const [base, setBase] = useState("8b");
  const r = R_OPTIONS[rIdx];
  const m = BASE_MODELS.find((x) => x.id === base)!;

  const trainable = 2 * m.d * r * m.layers * MODULES_PER_LAYER;
  const ratio = trainable / approxParams(m.d, m.layers);

  const vramGB = useMemo(() => {
    const baseGB = m.ngpu_full_vram * 0.25;
    const optStateGB = (trainable * 12) / 1024 ** 3;
    return baseGB + optStateGB;
  }, [trainable, m]);

  const trainingHours = useMemo(() => {
    const baseHr = 2.4 * (m.d / 4096) ** 1.2 * (m.layers / 32);
    return baseHr * (1 + (r / 256) * 0.3);
  }, [r, m]);

  const expressivity = Math.min(5, Math.log2(r + 1) / 2 + 0.5);

  return (
    <SectionFrame num="01" label="r → 四个数字" background="bg-butter/30">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        拖 r，看四个数字同步变。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        r 是一个数字，但它一动，可训参数量、显存、训练时间、能表达的语义范围 — 四个东西全跟着变。
      </p>

      <div className="card-stamp p-6 md:p-8 bg-white">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div>
            <div className="eyebrow text-ink-tertiary mb-2">Base 模型</div>
            <div className="flex flex-wrap gap-2">
              {BASE_MODELS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBase(b.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono border-2 transition-all ${
                    base === b.id
                      ? "bg-ink text-butter border-ink shadow-stamp"
                      : "bg-white text-ink border-ink/30 hover:border-ink"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div className="text-right">
            <div className="eyebrow text-ink-tertiary mb-1">当前 r =</div>
            <div className="font-display text-5xl font-bold text-ink leading-none">{r}</div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-ink-tertiary uppercase tracking-widest">滑动调 r ↓</span>
            <span className="text-xs text-ink-tertiary">log scale</span>
          </div>
          <input
            type="range"
            min={0}
            max={R_OPTIONS.length - 1}
            step={1}
            value={rIdx}
            onChange={(e) => setRIdx(Number(e.target.value))}
            className="w-full accent-ink"
          />
          <div className="mt-2 flex justify-between px-1 text-[10px] font-mono text-ink-tertiary">
            {R_OPTIONS.map((v) => (
              <span key={v} className={v === r ? "text-ink font-bold" : ""}>
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Meter
            label="可训参数"
            value={formatNum(trainable)}
            sub={`占整模型 ${(ratio * 100).toFixed(2)}%`}
            pct={Math.min(100, ratio * 100 * 30)}
            color="bg-coral"
          />
          <Meter
            label="训练显存"
            value={`${vramGB.toFixed(1)} GB`}
            sub={`base 4bit 量化 + LoRA fp16`}
            pct={Math.min(100, (vramGB / m.ngpu_full_vram) * 100)}
            color="bg-pop"
          />
          <Meter
            label="训练时长"
            value={`${trainingHours.toFixed(1)} h`}
            sub={`50K 样本 · 单 A100 · 估算`}
            pct={Math.min(100, (trainingHours / 12) * 100)}
            color="bg-teal"
          />
          <Meter
            label="表达力档位"
            value={`${expressivity.toFixed(1)} / 5`}
            sub={describeExpr(r)}
            pct={(expressivity / 5) * 100}
            color="bg-ink"
          />
        </div>

        <div className="mt-6 p-4 bg-cream border-2 border-ink rounded-2xl text-sm text-ink leading-relaxed">
          <span className="font-mono text-xs text-ink-tertiary mr-2 uppercase tracking-widest">解读</span>
          {readVerdict(r, ratio, vramGB)}
        </div>
      </div>
    </SectionFrame>
  );
}

function Meter({ label, value, sub, pct, color }: { label: string; value: string; sub: string; pct: number; color: string }) {
  return (
    <div className="border-2 border-ink rounded-2xl p-4 bg-butter/15">
      <div className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest mb-2">{label}</div>
      <div className="font-display text-2xl text-ink font-bold leading-tight mb-2">{value}</div>
      <div className="h-2 bg-white border border-ink rounded-full overflow-hidden mb-2">
        <div className={`h-full ${color} transition-all duration-400 ease-editorial`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-[11px] text-ink-tertiary leading-snug">{sub}</div>
    </div>
  );
}

function formatNum(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)} K`;
  return n.toString();
}

function approxParams(d: number, layers: number) {
  return layers * (4 * d * d + 3 * d * 4 * d);
}

function describeExpr(r: number) {
  if (r <= 4) return "只够 nudge 语气";
  if (r <= 16) return "够指令跟随 / 分类";
  if (r <= 64) return "够代码 / SQL / 推理";
  return "够领域大改造";
}

function readVerdict(r: number, ratio: number, vram: number) {
  if (r <= 4) {
    return "极小 r — 适合只想轻微改变模型语气、做超低资源 ablation。多数 SFT 不够看。";
  }
  if (r <= 16) {
    return `r=${r} 是 2026 大多数指令微调的默认值。HuggingFace PEFT 内置默认 r=8，可训参数仅 ${(ratio * 100).toFixed(2)}%，显存 ${vram.toFixed(0)} GB 单卡能跑。`;
  }
  if (r <= 64) {
    return `r=${r} 进入「重型 LoRA」区段。代码、数学、reasoning 类任务这里才追得上 Full FT。QLoRA 论文 Guanaco 配方就是 r=64。`;
  }
  return `r=${r} 已经超过实证经验值。多数研究在 r=64 之后效果几乎不再涨（rank-deficient），但显存继续吃。除非你做领域全改造，否则没必要。`;
}
