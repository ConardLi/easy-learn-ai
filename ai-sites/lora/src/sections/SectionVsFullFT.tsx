import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";

type Task = {
  id: string;
  label: string;
  hint: string;
  full: number;
  lora: number;
  src: string;
};

const TASKS: Task[] = [
  {
    id: "instr",
    label: "指令跟随",
    hint: "Alpaca / Tulu 风格 SFT",
    full: 56.2,
    lora: 55.9,
    src: "Predibase LoRA Land · 2024 Eval (Llama-3-8B, 31 tasks 平均)",
  },
  {
    id: "classify",
    label: "文本分类",
    hint: "SST-2 / IMDB 情感",
    full: 96.4,
    lora: 96.3,
    src: "HuggingFace PEFT examples 2024 · BERT-base",
  },
  {
    id: "rag",
    label: "知识问答",
    hint: "TriviaQA / NaturalQA",
    full: 64.3,
    lora: 62.8,
    src: "EleutherAI lm-eval · Llama-3-8B sweeps 2024",
  },
  {
    id: "code",
    label: "代码生成",
    hint: "HumanEval / MBPP",
    full: 67.5,
    lora: 64.1,
    src: "DeepSeek-Coder LoRA paper 2025",
  },
  {
    id: "math",
    label: "数学推理",
    hint: "GSM8K / MATH",
    full: 78.4,
    lora: 73.8,
    src: "Tulu 3 LoRA vs Full · AI2 2024 release notes",
  },
  {
    id: "longctx",
    label: "长上下文",
    hint: "RULER 128K · multi-needle",
    full: 71.2,
    lora: 64.9,
    src: "LongLoRA Chen et al. 2024 + 跟进 ablation",
  },
];

export default function SectionVsFullFT() {
  const [pick, setPick] = useState("code");
  const t = TASKS.find((x) => x.id === pick)!;

  const sorted = [...TASKS].sort((a, b) => a.full - a.lora - (b.full - b.lora));

  return (
    <SectionFrame num="04" label="vs Full Fine-Tuning">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        LoRA 究竟比 Full FT 差多少？分任务看。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        2024-2026 多项独立评测显示：指令跟随、分类几乎打平；代码、数学、长上下文场景仍有差距。看具体任务再决定要不要切 Full。
      </p>

      <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-start">
        <div className="space-y-3">
          {sorted.map((task) => {
            const gap = task.full - task.lora;
            const active = task.id === pick;
            const barFull = (task.full / 100) * 100;
            const barLora = (task.lora / 100) * 100;
            return (
              <button
                key={task.id}
                onClick={() => setPick(task.id)}
                className={`w-full text-left card-stamp p-5 transition-all duration-250 ease-spring ${
                  active ? "bg-butter/60" : "bg-white hover:bg-butter/10"
                }`}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <div className="font-display text-lg font-bold text-ink">{task.label}</div>
                    <div className="font-mono text-xs text-ink-tertiary">{task.hint}</div>
                  </div>
                  <div className={`font-display text-2xl font-bold ${gap > 4 ? "text-coral" : gap > 1.5 ? "text-pop" : "text-teal"}`}>
                    {gap > 0 ? `−${gap.toFixed(1)}` : "≈ 0"}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Bar label="Full FT" pct={barFull} value={task.full.toFixed(1)} color="bg-ink" />
                  <Bar label="LoRA" pct={barLora} value={task.lora.toFixed(1)} color="bg-coral" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="md:sticky md:top-8 space-y-4" key={pick}>
          <div className="card-stamp p-6 bg-ink text-cream animate-enter-fade">
            <div className="eyebrow text-butter mb-2">焦点任务</div>
            <h3 className="font-display text-2xl mb-4 leading-tight">{t.label}</h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <Big label="Full FT" value={t.full.toFixed(1)} tone="butter" />
              <Big label="LoRA" value={t.lora.toFixed(1)} tone="coral" />
            </div>

            <div className="border-t border-cream/20 pt-4">
              <div className="eyebrow text-cream/60 mb-2">差距判读</div>
              <p className="text-sm leading-relaxed text-cream/90">
                {t.full - t.lora < 1.5
                  ? "几乎打平。这类任务直接 LoRA，没必要花 Full FT 的算力。"
                  : t.full - t.lora < 4
                  ? "存在差距但可接受。LoRA 通过加大 r 或换 DoRA 可进一步缩小。"
                  : "差距明显。建议优先 Full FT 或 LoRA+DoRA+r=64 重型组合。"}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-cream/20 font-mono text-[10px] text-cream/50 leading-relaxed">
              来源 · {t.src}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function Bar({ label, pct, value, color }: { label: string; pct: number; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="text-ink-tertiary w-14 flex-shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-cream border border-ink/30 rounded overflow-hidden">
        <div className={`h-full ${color} transition-all duration-600`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-ink font-semibold w-10 text-right">{value}</span>
    </div>
  );
}

function Big({ label, value, tone }: { label: string; value: string; tone: "butter" | "coral" }) {
  const borderClass = tone === "butter" ? "border-butter" : "border-coral";
  const textClass = tone === "butter" ? "text-butter" : "text-coral";
  return (
    <div className={`border-2 ${borderClass} rounded-xl p-3 bg-cream/5`}>
      <div className="text-xs font-mono text-cream/60 uppercase tracking-wider">{label}</div>
      <div className={`font-display text-3xl font-bold ${textClass}`}>{value}</div>
    </div>
  );
}
