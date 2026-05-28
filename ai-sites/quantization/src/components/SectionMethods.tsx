/**
 * Section 04 · 4 套主流量化方法的脾气
 *
 * 形式：accordion（L2），但加 sort 切换让顺序动态变（第 2 类交互）。
 *
 * 4 个方法：GPTQ · AWQ · GGUF · bitsandbytes
 * 每个方法：一句话 / 思路 / 适合 / 不适合 / 工具链 / 三维 mini-bar
 */
import React, { useState, useMemo } from "react";
import { ChevronDown, Check, X } from "lucide-react";

type Method = {
  id: string;
  name: string;
  year: number;
  tag: string;
  oneliner: string;
  detail: string;
  fits: string[];
  notFits: string[];
  tools: string[];
  metrics: { speed: number; quality: number; ease: number }; // 1-5
  vibe: string;
  color: "coral" | "teal" | "butter" | "pop";
};

const METHODS: Method[] = [
  {
    id: "gptq",
    name: "GPTQ",
    year: 2022,
    tag: "PTQ · 二阶 Hessian",
    oneliner: "用一小批校准数据，逐层求「最小损失」的量化值。",
    detail:
      "对每一层 weight matrix，借助 Hessian 信息（OBS 算法）贪心地找出哪个量化值能让该层输出误差最小。是 transformer 推理量化的奠基方案，2022 年提出至今仍是大厂部署的默认选项之一。",
    fits: ["INT4 transformer 推理部署", "transformers / HF 生态", "NVIDIA GPU 服务化"],
    notFits: ["训练阶段量化", "非 NVIDIA 硬件适配差"],
    tools: ["AutoGPTQ", "vLLM", "TensorRT-LLM"],
    metrics: { speed: 4, quality: 4, ease: 4 },
    vibe: "稳健派 · 老牌可靠，但你得有校准数据。",
    color: "coral",
  },
  {
    id: "awq",
    name: "AWQ",
    year: 2023,
    tag: "PTQ · 显著权重保护",
    oneliner: "1% 的权重承担 99% 的质量责任。把它们保护住，剩下随便压。",
    detail:
      "Activation-aware Weight Quantization：观察发现少量「显著通道」对模型表现至关重要，AWQ 给这些通道单独的 scale 而不量化。同样 4-bit 下，质量普遍高于 GPTQ，且不需要 Hessian 计算，更轻量。",
    fits: ["质量优先的 4-bit / 3-bit 部署", "LLaMA 系列开源模型", "vLLM / TensorRT-LLM 服务"],
    notFits: ["视觉 / 语音等非 LLM 任务", "极端激进 2-bit 压缩"],
    tools: ["AutoAWQ", "vLLM", "TensorRT-LLM"],
    metrics: { speed: 4, quality: 5, ease: 4 },
    vibe: "聪明派 · 同 bit 下质量明显更好。",
    color: "teal",
  },
  {
    id: "gguf",
    name: "GGUF",
    year: 2023,
    tag: "格式 + 多档量化",
    oneliner: "本地玩家的瑞士军刀。一个文件，CPU/GPU/Mac 通吃。",
    detail:
      "llama.cpp 团队设计的统一格式。提供 Q2_K / Q3_K_M / Q4_K_M / Q5_K_M / Q6_K / Q8_0 等十几种档位，可在 block 级别混合精度。Mac unified memory + Ollama + LM Studio 的事实标准。",
    fits: ["Mac / 消费级 GPU / 纯 CPU 跑 LLM", "本地开发 · 个人使用", "Ollama / LM Studio 桌面应用"],
    notFits: ["大规模服务化吞吐", "需要 NVIDIA 张量核优化的场景"],
    tools: ["llama.cpp", "Ollama", "LM Studio"],
    metrics: { speed: 3, quality: 4, ease: 5 },
    vibe: "百宝箱派 · 想跑就跑，硬件随便。",
    color: "butter",
  },
  {
    id: "bnb",
    name: "bitsandbytes",
    year: 2023,
    tag: "QLoRA / 训练友好",
    oneliner: "为了在 24GB 卡上微调 70B 而生。NF4 + Double Quant。",
    detail:
      "Tim Dettmers 主导。Normal Float 4 (NF4) 数据格式针对正态分布的权重设计；Double Quantization 进一步压 scale。QLoRA 让你在单张消费级卡上微调 70B 成为可能，HF transformers + PEFT 一键加载。",
    fits: ["QLoRA / 单卡微调", "Hugging Face transformers + PEFT", "教学 / 研究 / 快速原型"],
    notFits: ["纯推理吞吐场景（不如 GPTQ/AWQ）", "非 NVIDIA 硬件"],
    tools: ["bitsandbytes", "transformers", "PEFT"],
    metrics: { speed: 3, quality: 4, ease: 5 },
    vibe: "学者派 · 微调首选，推理略慢。",
    color: "pop",
  },
];

type SortKey = "year" | "speed" | "quality" | "ease";

const SORTS: { id: SortKey; label: string; desc: string }[] = [
  { id: "year", label: "出现年代", desc: "默认 · 历史顺序" },
  { id: "speed", label: "推理速度", desc: "服务化部署看这个" },
  { id: "quality", label: "同 bit 质量", desc: "压到极致看这个" },
  { id: "ease", label: "上手难度", desc: "个人玩家看这个" },
];

const SectionMethods: React.FC = () => {
  const [sort, setSort] = useState<SortKey>("year");
  const [openId, setOpenId] = useState<string | null>("gptq");

  const ordered = useMemo(() => {
    const arr = [...METHODS];
    if (sort === "year") return arr.sort((a, b) => a.year - b.year);
    return arr.sort((a, b) => b.metrics[sort as "speed" | "quality" | "ease"] - a.metrics[sort as "speed" | "quality" | "ease"]);
  }, [sort]);

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">four families</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          四套主流方法，
          <br />
          各有各的
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">脾气</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          量化算法不是"哪个最好"的问题，是"什么场景选哪个"的问题。
          点下面任一方法展开看细节。也可以
          <strong className="text-ink">换个排序角度</strong>看顺序怎么变。
        </p>

        {/* 排序 chip */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 self-center mr-2">
            按 · sort by
          </span>
          {SORTS.map((s) => {
            const on = s.id === sort;
            return (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={[
                  "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-cream text-ink hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
                title={s.desc}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* accordion */}
        <div className="space-y-3">
          {ordered.map((m, idx) => (
            <MethodRow
              key={m.id}
              method={m}
              index={idx + 1}
              isOpen={m.id === openId}
              onToggle={() => setOpenId((id) => (id === m.id ? null : m.id))}
              rankInSort={sort !== "year" ? idx + 1 : null}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const colorMap = {
  coral: { bg: "bg-coral", text: "text-coral", soft: "bg-coral/12" },
  teal: { bg: "bg-teal", text: "text-teal", soft: "bg-teal/12" },
  butter: { bg: "bg-butter-deep", text: "text-butter-deep", soft: "bg-butter/30" },
  pop: { bg: "bg-pop", text: "text-pop", soft: "bg-pop/15" },
};

const MethodRow: React.FC<{
  method: Method;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  rankInSort: number | null;
}> = ({ method, isOpen, onToggle, rankInSort }) => {
  const c = colorMap[method.color];

  return (
    <div
      className={[
        "border-2 border-ink rounded-2xl overflow-hidden transition-all duration-300",
        isOpen ? "bg-cream shadow-stamp-lg" : "bg-white hover:bg-cream/40",
      ].join(" ")}
    >
      {/* header · 永远显示 */}
      <button onClick={onToggle} className="w-full text-left px-5 py-4 flex items-center gap-4">
        <div className={`w-10 h-10 ${c.bg} border-2 border-ink rounded-xl flex items-center justify-center shrink-0`}>
          <span className="font-display text-[18px] font-bold text-ink leading-none">
            {rankInSort ?? method.year.toString().slice(-2)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="font-display text-[20px] font-bold text-ink leading-tight">
              {method.name}
            </span>
            <span className={`font-mono text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded ${c.soft} ${c.text} font-bold`}>
              {method.tag}
            </span>
            <span className="font-mono text-[10px] text-ink/45">{method.year}</span>
          </div>
          <p className="text-[13.5px] text-ink/70 mt-0.5 line-clamp-1">{method.oneliner}</p>
        </div>

        {/* 三维 mini-bar */}
        <div className="hidden sm:flex items-end gap-1 mr-2">
          <MetricBar value={method.metrics.speed} hint="速度" />
          <MetricBar value={method.metrics.quality} hint="质量" />
          <MetricBar value={method.metrics.ease} hint="易用" />
        </div>

        <ChevronDown
          className={[
            "w-5 h-5 text-ink transition-transform duration-300 shrink-0",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
          strokeWidth={2.5}
        />
      </button>

      {/* body */}
      {isOpen && (
        <div className="px-5 pb-5 grid md:grid-cols-12 gap-5 animate-enter-fade">
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                核心思路
              </div>
              <p className="text-[14.5px] text-ink/80 leading-relaxed">{method.detail}</p>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
                工具链
              </div>
              <div className="flex flex-wrap gap-1.5">
                {method.tools.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2 py-0.5 bg-white border-2 border-ink rounded-md text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className={`px-3 py-2.5 ${c.soft} border-2 border-ink/15 rounded-lg`}>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                一句话评价 · vibe
              </div>
              <p className={`font-display text-[14px] font-bold ${c.text}`}>"{method.vibe}"</p>
            </div>
          </div>

          <div className="md:col-span-5 space-y-3">
            <FitList title="适合" items={method.fits} kind="yes" />
            <FitList title="不适合" items={method.notFits} kind="no" />
          </div>
        </div>
      )}
    </div>
  );
};

const MetricBar: React.FC<{ value: number; hint: string }> = ({ value, hint }) => (
  <div className="flex flex-col items-center" title={`${hint} ${value}/5`}>
    <div className="w-1.5 h-8 bg-ink/8 rounded-full overflow-hidden flex flex-col-reverse">
      <div className="w-full bg-ink rounded-full" style={{ height: `${value * 20}%` }} />
    </div>
    <span className="font-mono text-[8px] text-ink/40 mt-1">{hint}</span>
  </div>
);

const FitList: React.FC<{ title: string; items: string[]; kind: "yes" | "no" }> = ({ title, items, kind }) => {
  const Icon = kind === "yes" ? Check : X;
  const tone = kind === "yes" ? "text-teal" : "text-coral";
  return (
    <div className="bg-white border-2 border-ink rounded-lg p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
        {title}
      </div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-1.5 text-[13px] text-ink/80">
            <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tone}`} strokeWidth={3} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionMethods;
