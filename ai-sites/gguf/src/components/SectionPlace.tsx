/**
 * Section 06 · Place in the Ecosystem
 *
 * GGUF / safetensors / ONNX / MLX 各管一摊。勾选你的需求，推荐格式实时算。
 *
 * 反模板：完全不同于前面的所有交互（chip / 输入框 / trace / 表格） ——
 * 这里是「勾选组合 + 评分」 (L3+)，五个 requirement toggle 按权重打 4 个格式的分。
 *
 * 数据：
 *   ─ ngxson.com/common-ai-model-formats · ertas.ai gguf-vs-safetensors 2026
 *   ─ HuggingFace 默认 safetensors 是 transformers 标准
 *   ─ MLX 是 Apple 自家框架，专攻 Mac 统一内存
 */
import React, { useMemo, useState } from "react";
import { Check, ExternalLink } from "lucide-react";

type Req = {
  id: string;
  label: string;
  /** 给每个 format 的加分（0-3） */
  score: { gguf: number; safetensors: number; onnx: number; mlx: number };
};

const REQS: Req[] = [
  {
    id: "local",
    label: "在我自己机器上跑（笔记本 / 工作站）",
    score: { gguf: 3, safetensors: 1, onnx: 1, mlx: 2 },
  },
  {
    id: "quantize",
    label: "需要 4-bit / 5-bit 等量化",
    score: { gguf: 3, safetensors: 0, onnx: 0, mlx: 1 },
  },
  {
    id: "multi-user",
    label: "多用户并发服务（API server）",
    score: { gguf: 0, safetensors: 3, onnx: 1, mlx: 0 },
  },
  {
    id: "apple",
    label: "Apple Silicon (M 系) 跑得最快",
    score: { gguf: 2, safetensors: 0, onnx: 1, mlx: 3 },
  },
  {
    id: "edge",
    label: "嵌入式 / 移动端 / 跨框架部署",
    score: { gguf: 1, safetensors: 0, onnx: 3, mlx: 0 },
  },
  {
    id: "secure",
    label: "公开分享 · 不能信任 pickle 反序列化",
    score: { gguf: 2, safetensors: 3, onnx: 2, mlx: 1 },
  },
];

type Format = {
  id: "gguf" | "safetensors" | "onnx" | "mlx";
  name: string;
  ext: string;
  who: string;
  one: string;
  uses: string[];
  /** 默认 baseline 分（0-2），即没勾任何 req 时也给一点底分 */
  base: number;
  tone: "ink" | "teal" | "coral" | "butter";
};

const FORMATS: Format[] = [
  {
    id: "gguf",
    name: "GGUF",
    ext: ".gguf",
    who: "llama.cpp · Ollama · LM Studio · KoboldCpp · GPT4All",
    one: "本地推理事实标准 · 单文件 + 内置量化",
    uses: ["跑 Llama / Qwen / Phi / Gemma 在自己电脑", "用 Ollama 一行起服务", "Mac / Linux / Win / 树莓派全平台一致"],
    base: 1,
    tone: "ink",
  },
  {
    id: "safetensors",
    name: "safetensors",
    ext: ".safetensors",
    who: "HuggingFace · transformers · diffusers · vLLM",
    one: "训练 / 分发的 HF 默认格式 · 安全 · 高精度",
    uses: ["训练 + 微调 ckpt 保存", "vLLM / SGLang 跑推理服务", "HuggingFace 上发模型"],
    base: 1,
    tone: "teal",
  },
  {
    id: "onnx",
    name: "ONNX",
    ext: ".onnx",
    who: "ONNX Runtime · TensorRT · OpenVINO · Core ML",
    one: "跨框架算子图 · 嵌入式 / 移动端首选",
    uses: ["从 PyTorch 转到 C++/.NET/Java 部署", "跑在 NPU / DSP 等加速器", "浏览器 onnxruntime-web"],
    base: 0,
    tone: "coral",
  },
  {
    id: "mlx",
    name: "MLX",
    ext: ".safetensors (mlx-community)",
    who: "Apple MLX framework · 专吃 M 芯片",
    one: "Apple 自家训推框架 · 统一内存吃 GPU + ANE",
    uses: ["Mac M3 Max / M4 Max 上要榨干性能", "MLX-LM 跑 LLM", "Stable Diffusion on Apple"],
    base: 0,
    tone: "butter",
  },
];

const SectionPlace: React.FC = () => {
  const [picked, setPicked] = useState<Set<string>>(
    new Set(["local", "quantize"]),
  );

  const scores = useMemo(() => {
    const totals: Record<Format["id"], number> = {
      gguf: 0,
      safetensors: 0,
      onnx: 0,
      mlx: 0,
    };
    FORMATS.forEach((f) => (totals[f.id] += f.base));
    REQS.forEach((r) => {
      if (picked.has(r.id)) {
        (Object.keys(r.score) as Format["id"][]).forEach((k) => {
          totals[k] += r.score[k];
        });
      }
    });
    return totals;
  }, [picked]);

  const maxScore = Math.max(...Object.values(scores), 1);
  const winnerId = (Object.keys(scores) as Format["id"][]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b,
  );
  const winner = FORMATS.find((f) => f.id === winnerId)!;

  function toggle(id: string) {
    setPicked((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">PLACE · 在生态里站哪格</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3 max-w-3xl">
          GGUF / safetensors / ONNX / MLX —— 四种格式各干各的活，常一起用
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          勾你的需求，下面 4 个格式的「适合度」实时算。
          一个真实工作流通常是：safetensors 训练 → 转 GGUF 部署到本地 / 或转 ONNX 部署到嵌入式。
        </p>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* 左：需求 checkbox */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-5">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-[18px] font-bold text-ink">
                  你的场景需求
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
                  勾 {picked.size} / {REQS.length}
                </span>
              </div>

              <div className="space-y-2">
                {REQS.map((r) => {
                  const on = picked.has(r.id);
                  return (
                    <button
                      key={r.id}
                      onClick={() => toggle(r.id)}
                      className={[
                        "w-full flex items-start gap-3 px-3.5 py-3 border-2 border-ink rounded-xl text-left transition-all duration-200",
                        on
                          ? "bg-butter-tint shadow-[3px_3px_0_0_#241C15]"
                          : "bg-white hover:bg-cream",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex-shrink-0 w-5 h-5 rounded-md border-2 border-ink flex items-center justify-center mt-[1px] transition-all duration-200",
                          on ? "bg-coral text-cream" : "bg-white",
                        ].join(" ")}
                      >
                        {on && <Check className="w-3 h-3" strokeWidth={3.5} />}
                      </span>
                      <span
                        className={[
                          "text-[13.5px] leading-snug",
                          on ? "text-ink font-medium" : "text-ink/75",
                        ].join(" ")}
                      >
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setPicked(new Set())}
                disabled={picked.size === 0}
                className="mt-4 font-mono text-[10.5px] text-ink/55 hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                清空所有需求
              </button>
            </div>
          </div>

          {/* 右：4 个格式 + 评分 */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {FORMATS.map((f) => {
                const s = scores[f.id];
                const isWinner = f.id === winnerId && s > 0;
                const pct = (s / Math.max(maxScore, 1)) * 100;
                return (
                  <div
                    key={f.id}
                    className={[
                      "relative bg-white border-2 border-ink rounded-2xl p-5 transition-all duration-300 ease-spring",
                      isWinner
                        ? "shadow-stamp-xl -translate-y-0.5"
                        : "shadow-stamp",
                    ].join(" ")}
                  >
                    {isWinner && (
                      <span className="absolute -top-2.5 -right-2 px-2.5 py-1 bg-coral text-cream font-mono text-[10px] uppercase tracking-[0.18em] font-bold rounded-md border-2 border-ink shadow-stamp">
                        推荐
                      </span>
                    )}

                    <div className="flex items-baseline justify-between mb-2 flex-wrap gap-x-3 gap-y-1">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-display text-[24px] font-bold text-ink">
                          {f.name}
                        </h3>
                        <span className="font-mono text-[11px] text-ink/50">
                          {f.ext}
                        </span>
                      </div>
                      <span className="font-mono text-[10.5px] text-ink/55">
                        {f.who}
                      </span>
                    </div>

                    <p className="text-[13.5px] text-ink/80 leading-relaxed mb-3">
                      {f.one}
                    </p>

                    {/* 适合度 */}
                    <div className="mb-2.5">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
                          适合度
                        </span>
                        <span className="font-mono text-[11px] font-bold text-ink tabular-nums">
                          {s} 分
                        </span>
                      </div>
                      <div className="h-2.5 bg-ink/8 rounded-full overflow-hidden border border-ink/10">
                        <div
                          className={[
                            "h-full transition-all duration-500 ease-spring",
                            isWinner ? "bg-coral" : "bg-ink/30",
                          ].join(" ")}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* 典型用法 */}
                    <ul className="flex flex-wrap gap-1.5">
                      {f.uses.map((u, i) => (
                        <li
                          key={i}
                          className="px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-mono text-[10.5px] text-ink/65"
                        >
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* callout */}
        <div className="mt-10 px-5 lg:px-6 py-5 bg-ink rounded-2xl border-2 border-ink shadow-stamp-xl">
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-butter">
              一条工程结论
            </span>
          </div>
          <p className="font-display text-[18px] lg:text-[20px] font-bold text-cream leading-snug max-w-3xl">
            训练 + 微调走 safetensors。本地分发跑推理走 GGUF。
            想跨硬件 / 嵌入式走 ONNX。Apple 上想榨干性能再考虑 MLX。
          </p>
          <p className="mt-3 text-[13px] text-cream/70 leading-relaxed max-w-3xl">
            HuggingFace 上 17 万多个 GGUF 模型 · llama.cpp 6180+ 个 release · llama.cpp Ecosystem State 2026 显示 GGUF 占 HF 量化下载量 70%+。
            把 GGUF 当成「模型分发的 .pdf」就对了。
          </p>
        </div>

        {/* 互链：下载了 .gguf 怎么真正跑起来 */}
        <a
          href="../deploy/index.html"
          className="mt-5 flex items-start gap-3 max-w-3xl card-stamp p-4 bg-butter/40 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-3.5 h-3.5 text-ink" />
          </span>
          <span className="text-[13.5px] leading-relaxed text-ink/80">
            手里有了 .gguf，怎么真正把它跑起来、Ollama / llama.cpp 这些工具怎么选
            <span className="font-semibold text-ink"> → 见《模型部署》</span>。
          </span>
        </a>

        <p className="mt-5 font-mono text-[10.5px] text-ink/45">
          来源：blog.ngxson.com/common-ai-model-formats · ertas.ai 2026/04 · presenc.ai/research/llama-cpp-ecosystem-state-2026
        </p>
      </div>
    </section>
  );
};

export default SectionPlace;
