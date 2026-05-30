/**
 * Section 05 · Evolution
 *
 * GGML → GGMF → GGJT → GGUF v1/v2/v3 的演进。
 * 每一步都解决了上一代留下的具体痛点。
 *
 * 反模板：用 trace 单步（next / prev / 跳点），区别于上一节的 chip 选择 + 网格状态。
 *
 * 数据：
 *   ─ GGUF Wikipedia (en.wikipedia.org/wiki/GGUF) · GGUF spec 版本史
 *   ─ Michael Brenndoerfer 「GGUF Format」 · llama.cpp 历史叙述
 */
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

type Stage = {
  id: string;
  name: string;
  full: string;
  date: string;
  /** 这一代加了啥 */
  added: string[];
  /** 还有啥没解决 */
  pain: string;
  /** 一句话总结 */
  oneliner: string;
  /** magic 字节示意 */
  magic: string;
};

const STAGES: Stage[] = [
  {
    id: "ggml",
    name: "GGML",
    full: "Gerganov ML library",
    date: "2022 / 早期",
    added: [
      "C/C++ 写的轻量 tensor + ops 库",
      "首次让 LLaMA 在纯 CPU 上跑起来",
      "magic = 0x67676d6c (\"ggml\")",
    ],
    pain: "无版本号 · 模型 hyperparam 硬编码到 loader · 加新架构要改 C 代码 · 无对齐，mmap 不工作",
    oneliner: "起点。能跑就行。",
    magic: "67 67 6d 6c",
  },
  {
    id: "ggmf",
    name: "GGMF",
    full: "GGML w/ versioning",
    date: "2023 春",
    added: [
      "加了 format version 字段",
      "loader 看到版本号能拒绝旧格式",
      "magic 改成 0x67676d66 (\"ggmf\")",
    ],
    pain: "hyperparam 还是平铺写死 · 加新架构仍然要重写 loader · 没对齐 → 没 mmap",
    oneliner: "只加了一个版本号，本质还是 GGML。",
    magic: "67 67 6d 66",
  },
  {
    id: "ggjt",
    name: "GGJT",
    full: "GGML JIT-aligned",
    date: "2023 夏",
    added: [
      "tensor data 对齐到 32 B 边界",
      "支持 mmap → 大模型不全部入内存",
      "Q4_0 / Q4_1 / Q5_0 等首批 quant 方案",
    ],
    pain: "hyperparam 仍是 flat list · loader 仍然要为每个新架构改 · 元数据格式僵化",
    oneliner: "终于能 mmap 了，但元数据还是死板。",
    magic: "67 67 6a 74",
  },
  {
    id: "gguf1",
    name: "GGUF v1 + v2",
    full: "Universal Format",
    date: "2023-08-22 起",
    added: [
      "引入 typed key-value metadata 系统",
      "加新架构只需加 metadata 字段，loader 不动",
      "tensor_count / kv_count 升 uint64 → 支持超大模型 (v2)",
      "magic 改成 0x47475546 (\"GGUF\")",
    ],
    pain: "默认 little-endian · IBM POWER / 部分嵌入式硬件读不了",
    oneliner: "格式从「存权重的盒子」变成「自描述的容器」。",
    magic: "47 47 55 46",
  },
  {
    id: "gguf3",
    name: "GGUF v3",
    full: "current spec",
    date: "2024 — 至今",
    added: [
      "增加可选 big-endian 支持",
      "Hugging Face 上 17 万多个 GGUF 模型在跑（2026/05）",
      "Hugging Face Inference Endpoints 直接吃 GGUF",
      "Ollama / LM Studio / GPT4All / KoboldCpp 全统一靠它",
    ],
    pain: "多卡分布式仍交给 vLLM / SGLang · GGUF 主要打 CPU + 单卡",
    oneliner: "成了 2026 本地推理事实标准，占 HF 量化下载量 70%+。",
    magic: "47 47 55 46",
  },
];

const SectionEvolution: React.FC = () => {
  const [idx, setIdx] = useState(3); // 默认停在 GGUF v1+v2 (重点)

  const stage = STAGES[idx];
  const prev = idx > 0 ? STAGES[idx - 1] : null;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">EVOLUTION · 怎么变成今天这样</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3 max-w-3xl">
          GGML → GGMF → GGJT → GGUF · 三年五代，每一步都修上一代的洞
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          Georgi Gerganov 2022 开始写 GGML，到 2023-08 跳到 GGUF。
          点节点跳那一步，看每代到底解决了什么实际问题。
        </p>

        {/* 时间线 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-7">
          {/* horizontal timeline */}
          <div className="relative mb-7">
            {/* 主线 */}
            <div className="absolute left-5 right-5 top-5 h-0.5 bg-ink/20" aria-hidden />
            {/* 已 progress 线 */}
            <div
              className="absolute left-5 top-5 h-0.5 bg-coral transition-all duration-500 ease-editorial"
              style={{ width: `calc((100% - 40px) * ${idx / (STAGES.length - 1)})` }}
              aria-hidden
            />
            {/* 节点 */}
            <div className="relative grid grid-cols-5 gap-1">
              {STAGES.map((s, i) => {
                const on = i === idx;
                const passed = i < idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => setIdx(i)}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <span
                      className={[
                        "relative w-10 h-10 rounded-full border-2 border-ink flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300 ease-spring",
                        on
                          ? "bg-coral text-cream shadow-[3px_3px_0_0_#241C15] scale-110"
                          : passed
                            ? "bg-ink text-cream"
                            : "bg-white text-ink/55 group-hover:bg-cream",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="text-center">
                      <div
                        className={[
                          "font-mono text-[11px] font-bold leading-tight",
                          on ? "text-ink" : passed ? "text-ink/70" : "text-ink/45",
                        ].join(" ")}
                      >
                        {s.name}
                      </div>
                      <div className="font-mono text-[9.5px] text-ink/45 mt-0.5">
                        {s.date}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 主体两栏 · 当前 stage 详情 */}
          <div className="grid lg:grid-cols-12 gap-5" key={stage.id}>
            <div className="lg:col-span-7 animate-enter-fade">
              <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-display text-[28px] font-bold text-ink leading-tight">
                    {stage.name}
                  </h3>
                  <div className="font-mono text-[11px] text-ink/55 uppercase tracking-[0.18em]">
                    {stage.full} · {stage.date}
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-ink text-butter font-mono text-[11px] rounded-md">
                  magic · {stage.magic}
                </span>
              </div>

              <p className="text-[16px] font-display font-bold text-ink mb-5 leading-snug">
                {stage.oneliner}
              </p>

              {/* 加了什么 */}
              <div className="mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-teal mb-2">
                  这代加了啥
                </div>
                <ul className="space-y-1.5">
                  {stage.added.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] text-ink/85 leading-snug">
                      <span className="text-teal mt-[2px] flex-shrink-0">＋</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 还有啥没解决 */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-coral mb-2">
                  留给下一代的痛
                </div>
                <p className="text-[13.5px] text-ink/75 leading-relaxed pl-3 border-l-2 border-coral/40">
                  {stage.pain}
                </p>
              </div>
            </div>

            {/* 右：跟上一代的 diff */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-ink rounded-2xl p-4 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 mb-2">
                  vs 上一代
                </div>
                {prev ? (
                  <>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="px-2.5 py-2 bg-ink/5 border border-ink/15 rounded-md">
                        <div className="font-mono text-[9.5px] uppercase text-ink/45 mb-1 tracking-[0.15em]">
                          before · {prev.name}
                        </div>
                        <div className="font-mono text-[12px] text-ink/55 line-through decoration-ink/40">
                          {prev.magic}
                        </div>
                      </div>
                      <div className="px-2.5 py-2 bg-butter-tint border border-butter-deep/40 rounded-md">
                        <div className="font-mono text-[9.5px] uppercase text-ink/55 mb-1 tracking-[0.15em]">
                          after · {stage.name}
                        </div>
                        <div className="font-mono text-[12px] text-ink font-bold">
                          {stage.magic}
                        </div>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-ink/75 leading-relaxed mb-3">
                      下一关键升级：
                    </div>
                    <div className="text-[12.5px] text-ink/85 leading-relaxed font-medium">
                      {stage.added[0]}
                    </div>
                  </>
                ) : (
                  <p className="text-[13px] text-ink/65 leading-relaxed">
                    第一代，没有「之前」可比。
                    Gerganov 从零写 ggml.c —— 一个 C/C++ 张量库
                    + LLaMA 推理 demo，加起来不到 1500 行。
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* prev / next */}
          <div className="flex items-center gap-2 mt-7 pt-4 border-t-2 border-ink/10">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border-2 border-ink rounded-lg font-mono text-[11px] font-bold shadow-stamp transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-stamp"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>prev</span>
            </button>
            <button
              onClick={() => setIdx((i) => Math.min(STAGES.length - 1, i + 1))}
              disabled={idx === STAGES.length - 1}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ink text-cream border-2 border-ink rounded-lg font-mono text-[11px] font-bold shadow-stamp transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-stamp"
            >
              <span>next</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setIdx(0)}
              className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-2 text-ink/50 font-mono text-[11px] hover:text-ink transition-colors"
            >
              <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
              <span>reset</span>
            </button>
          </div>
        </div>

        <p className="mt-5 font-mono text-[10.5px] text-ink/45">
          来源：en.wikipedia.org/wiki/GGUF · ggml-org/ggml docs/gguf.md · llama.cpp 6180 releases (GitHub 2026/05)
        </p>
      </div>
    </section>
  );
};

export default SectionEvolution;
