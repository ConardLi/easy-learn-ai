/**
 * Section 01 · Hero
 *
 * 进站第一秒：H1「GGUF 是什么？」+ 一句话定义。
 * 主交互 = 直观对比「官方原版（一堆散文件 + 要装环境）vs GGUF（一个文件，下载就跑）」，
 *   切 quant 看这一个文件的体积怎么变。
 *   —— 直接回答小白的「GGUF 到底好在哪」，把文件内部 5 段 / 字节流细节让给 §02。
 * 反模板：
 *   ─ 不做量化的 bit-pill selector（quantization 站用过）
 *   ─ 不做内存格 / 工具 accordion（deploy 站用过）
 *   ─ 这里是「散 vs 整」两栏对照 + 一个文件的 quant 体积切换
 *
 * 数据：
 *   ─ Llama-3.1-8B-Instruct GGUF 实测大小 来自 bartowski/Meta-Llama-3.1-8B-Instruct-GGUF（HF 2026/05）
 *   ─ 原版文件清单 来自 meta-llama/Llama-3.1-8B-Instruct（HF safetensors 分片）
 */
import React, { useState } from "react";
import { ArrowDown, FileBox, FileText, Cpu, Check, X } from "lucide-react";

/* 官方原版（HF safetensors）下载下来的散文件 */
const RAW_FILES = [
  { name: "model-00001-of-00004.safetensors", note: "权重 ①" },
  { name: "model-00002-of-00004.safetensors", note: "权重 ②" },
  { name: "model-00003-of-00004.safetensors", note: "权重 ③" },
  { name: "model-00004-of-00004.safetensors", note: "权重 ④" },
  { name: "config.json", note: "结构配置" },
  { name: "tokenizer.json", note: "分词表" },
  { name: "generation_config.json", note: "生成参数" },
];

/* 三种 quant 预设 · 数据来自 bartowski/Meta-Llama-3.1-8B-Instruct-GGUF HF 2026/05 */
const PRESETS = [
  { id: "q4km", label: "Q4_K_M", sizeLabel: "4.92 GB", hint: "最常用 · 笔记本也扛得动" },
  { id: "q8", label: "Q8_0", sizeLabel: "8.54 GB", hint: "几乎不掉质量" },
  { id: "f16", label: "F16", sizeLabel: "16.07 GB", hint: "没压过 · 跟原版一样大" },
];

const SectionHero: React.FC = () => {
  const [preset, setPreset] = useState("q4km");
  const cur = PRESETS.find((p) => p.id === preset)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮饰 */}
      <div aria-hidden className="absolute top-24 right-[6%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-32 left-[4%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-3 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                GGUF · GPT-Generated Unified Format
              </span>
            </div>
            <p className="mb-6 font-sans text-[12.5px] text-ink/55 leading-snug animate-enter-fade">
              名字里有 GPT，但跟 ChatGPT 没关系 —— 它就是个装模型的文件格式。
            </p>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              GGUF
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  把一个 AI 模型打包成「一个文件」，下载这一个，在自己电脑上双击就能跑。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                从官方下一个原版模型，通常是六七个文件散着 —— 权重分成好几份、配置一份、分词表一份，
                还得自己装 Python、PyTorch 这一堆环境，有张够大的显卡才跑得动。普通人到这一步就卡住了。
              </p>
              <p>
                GGUF 把这一堆<strong className="text-ink">压成一个文件</strong>，权重、分词表、结构说明全在里面。
                双击或一行命令就跑，不用装 Python、没显卡用 CPU 也行。Ollama、LM Studio、llama.cpp 全靠它。
              </p>
              <p>
                作者 Georgi Gerganov，2023-08 发布，现在是第 3 版。HuggingFace 上有 17 万多个 GGUF 模型在跑。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边就是同一个 Llama-3.1-8B：左边官方原版散成一堆，右边 GGUF 收成一个。
              切下面的档位，看这一个文件能压到多小。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-sans text-[13px] text-ink/55 leading-snug max-w-[260px]">
                往下拆开这一个文件，看里面到底装了什么。
              </div>
            </div>
          </div>

          {/* 右：散文件 vs 一个 GGUF 对比 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                  同一个模型 · Llama-3.1-8B
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                  HF 实测体积
                </span>
              </div>

              <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
                {/* 左：官方原版散文件 */}
                <div className="flex flex-col rounded-2xl border-2 border-ink bg-cream p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-ink text-cream font-mono text-[11px] font-bold">
                      1
                    </span>
                    <span className="font-display text-[15px] font-bold text-ink leading-tight">
                      官方原版
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-ink/45">HuggingFace</span>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    {RAW_FILES.map((f) => (
                      <div
                        key={f.name}
                        className="flex items-center gap-2 px-2 py-1.5 bg-white border border-ink/25 rounded-md"
                      >
                        <FileText className="w-3.5 h-3.5 text-ink/55 flex-shrink-0" strokeWidth={2} />
                        <span className="font-mono text-[10px] text-ink/75 truncate">{f.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto space-y-1.5 text-[12px] text-ink/70 leading-snug">
                    <div className="flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-coral flex-shrink-0" strokeWidth={2.5} />
                      <span>7 个文件散着 · 共 ~16 GB</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-coral flex-shrink-0" strokeWidth={2.5} />
                      <span>要装 Python + PyTorch 一整套</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-coral flex-shrink-0" strokeWidth={2.5} />
                      <span>得有一张够大的显卡</span>
                    </div>
                  </div>
                </div>

                {/* 中间箭头 */}
                <div className="flex sm:flex-col items-center justify-center gap-2 py-1">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-butter border-2 border-ink shadow-stamp">
                    <ArrowDown className="w-5 h-5 text-ink sm:rotate-0 -rotate-90" strokeWidth={2.5} />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/55 text-center leading-tight">
                    打包<br className="hidden sm:block" /> + 压缩
                  </span>
                </div>

                {/* 右：一个 GGUF 文件 */}
                <div className="flex flex-col rounded-2xl border-2 border-ink bg-ink p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-butter text-ink font-mono text-[11px] font-bold">
                      2
                    </span>
                    <span className="font-display text-[15px] font-bold text-cream leading-tight">
                      GGUF
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-cream/45">一个文件</span>
                  </div>

                  {/* 单文件大卡 */}
                  <div className="flex flex-col items-center justify-center text-center bg-white/5 border-2 border-dashed border-cream/30 rounded-xl px-3 py-5 mb-3">
                    <FileBox className="w-9 h-9 text-butter mb-2" strokeWidth={2} />
                    <span className="font-mono text-[10.5px] text-cream/90 leading-tight break-all">
                      Llama-3.1-8B-Instruct
                      <br />
                      -{cur.label}.gguf
                    </span>
                    <span className="mt-2 font-display text-[22px] font-bold text-butter leading-none">
                      {cur.sizeLabel}
                    </span>
                  </div>

                  {/* quant 切换 */}
                  <div className="mb-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/45 mb-1.5">
                      选压缩档位
                    </div>
                    <div className="flex gap-1">
                      {PRESETS.map((p) => {
                        const on = p.id === preset;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setPreset(p.id)}
                            className={[
                              "flex-1 px-2 py-1.5 rounded-md border-2 font-mono text-[10.5px] font-bold transition-all duration-250 ease-spring",
                              on
                                ? "bg-butter text-ink border-butter"
                                : "bg-transparent text-cream/60 border-cream/25 hover:border-cream/50",
                            ].join(" ")}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-1.5 font-sans text-[11px] text-cream/60 leading-snug">
                      {cur.hint}
                    </p>
                  </div>

                  <div className="mt-auto space-y-1.5 text-[12px] text-cream/80 leading-snug">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-teal flex-shrink-0" strokeWidth={2.5} />
                      <span>下载这一个就够</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-teal flex-shrink-0" strokeWidth={2.5} />
                      <span>双击 / 一行命令就跑</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-teal flex-shrink-0" strokeWidth={2.5} />
                      <span>没显卡用 CPU 也行</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 注脚 */}
              <p className="mt-4 font-mono text-[10px] text-ink/40">
                来源：meta-llama/Llama-3.1-8B-Instruct（原版分片）· bartowski/…-GGUF（GGUF 体积）· HF 2026/05
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
