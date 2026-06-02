/**
 * Section 02 · 三个世界
 *
 * 反直觉钩子放这里（不当 H1）：「Mac mini 跑 70B 模型」「8 张 H100 撑亿次请求」是同一件事的两头。
 * 三档 pill 切换：本地玩 / 单机生产 / 云规模。每档 3 个真实部署案例卡片。
 *
 * 案例数据来源：
 *  - llmhardware.io 2026/05 (M4 Pro 48GB → Llama 3.3 70B Q4 @ 12-14 tok/s)
 *  - craftrigs.com 2026 (M4 Pro 48GB → Llama 3.1 8B @ 80-100 tok/s)
 *  - Ollama v0.22 release 2026/04
 *  - localaimaster 2026 (SGLang H100 → 16215 tok/s)
 *  - PyTorch blog 2026 (SGLang xAI Grok 3, MS Azure DeepSeek R1)
 *  - chatforest 2026 (LMSYS 64-H200 cluster, 3.8× over 单节点)
 */
import React, { useState } from "react";
import {
  Laptop,
  Server,
  Cloud,
  HardDrive,
  Cpu,
  Layers,
  ExternalLink,
} from "lucide-react";

type World = {
  id: "local" | "single" | "cloud";
  icon: React.ReactNode;
  label: string;
  hint: string;
  cases: {
    title: string;
    hw: string;
    tool: string;
    model: string;
    perf: string;
    why: string;
    source: string;
  }[];
};

const WORLDS: World[] = [
  {
    id: "local",
    icon: <Laptop className="w-4 h-4" strokeWidth={2.4} />,
    label: "本地玩",
    hint: "一台机器 · 一个人用 · 不联网也行",
    cases: [
      {
        title: "Mac mini M4 Pro 48GB · 在家跑 70B",
        hw: "M4 Pro · 273 GB/s 内存带宽 · 48 GB 统一内存",
        tool: "Ollama 0.22 (MLX 后端)",
        model: "Llama 3.3 70B Q4_K_M · ~43 GB",
        perf: "12-14 tok/s · 单流",
        why: "Ollama 0.19 改用 MLX 后比旧 llama.cpp Metal 后端快了一倍多。一行 ollama run 就跑起来。",
        source: "llmhardware.io 2026/05",
      },
      {
        title: "M4 Max 笔电 · 中等模型当主力",
        hw: "M4 Max · 128 GB 统一内存",
        tool: "MLX / mlx-lm",
        model: "Qwen 2.5 32B 4bit · ~18 GB",
        perf: "~28 tok/s · 单流",
        why: "MLX 在 14B 以下普遍比 llama.cpp 快 21-87%。Apple 把 Metal 内核优化吃透了。",
        source: "Towards AI · 2026/05",
      },
      {
        title: "二手 RTX 3060 12GB · 小模型也够用",
        hw: "RTX 3060 12 GB VRAM",
        tool: "llama.cpp (CUDA 后端)",
        model: "Llama 3.1 8B Q4_K_M · ~5 GB",
        perf: "~55 tok/s · 单流",
        why: "GGUF + CUDA 后端是 NVIDIA 老卡的最佳搭配。8B 模型用 8 GB VRAM 还有剩。",
        source: "llama.cpp benchmark 2026",
      },
    ],
  },
  {
    id: "single",
    icon: <Server className="w-4 h-4" strokeWidth={2.4} />,
    label: "单机生产",
    hint: "1-8 张卡 · 一个团队用 · 几十到几千 QPS",
    cases: [
      {
        title: "1× H100 · Llama 3.1 8B 上线",
        hw: "1× H100 80 GB · NVLink off",
        tool: "vLLM v1",
        model: "Llama 3.1 8B BF16",
        perf: "12,500 tok/s 总 · 首字 103 ms",
        why: "靠 PagedAttention + 连续批处理（谁先答完就立刻换下一个请求顶上，下一节细讲）。32 并发还稳，128 并发也不崩。开箱即用。",
        source: "effloow.com 2026/04",
      },
      {
        title: "1× H100 · 同卡换 SGLang",
        hw: "1× H100 80 GB",
        tool: "SGLang",
        model: "Llama 3.1 8B BF16",
        perf: "16,215 tok/s 总 · 首字 79 ms",
        why: "同卡同模型，比 vLLM 多 29% 吞吐，首字快 23%。RadixAttention 在多轮共享 prompt 时再上 6.4×。",
        source: "localaimaster 2026",
      },
      {
        title: "2× H100 · 120B 模型在线",
        hw: "2× H100 80 GB · TP=2",
        tool: "vLLM v1",
        model: "120B BF16",
        perf: "100 并发 → 4,741 tok/s · 首字 261 ms",
        why: "TP（张量并行）把单层切两半摊到两张卡。120B 才装得下。换 SGLang 还能多挤 20%。",
        source: "effloow.com 2026/04",
      },
    ],
  },
  {
    id: "cloud",
    icon: <Cloud className="w-4 h-4" strokeWidth={2.4} />,
    label: "云规模",
    hint: "几十到几百卡 · 一个公司用 · 日 trillion tokens",
    cases: [
      {
        title: "xAI Grok 3 · Chatbot Arena #1",
        hw: "10 万卡量级 H100/H200",
        tool: "SGLang",
        model: "Grok 3 自研",
        perf: "日生成 trillion 级 tokens",
        why: "Grok 3 在 Chatbot Arena 拿过第一。xAI 选 SGLang 是迄今最高规格的生产背书。",
        source: "PyTorch blog 2026",
      },
      {
        title: "Microsoft Azure · AMD 上跑 DeepSeek",
        hw: "AMD MI300X 集群",
        tool: "SGLang",
        model: "DeepSeek R1",
        perf: "AMD GPU 一等公民",
        why: "SGLang 是少数对 AMD 同代支持的引擎。Azure 用它在 AMD 上对外服务 DeepSeek R1。",
        source: "chatforest 2026 · pytorch blog 2026",
      },
      {
        title: "LMSYS 64× H200 集群 · DeepSeek V3",
        hw: "64× H200 · 大规模专家并行",
        tool: "SGLang + DeepGEMM + MLA",
        model: "DeepSeek V3 671B (MoE)",
        perf: "3.8× 吞吐 · 首字快 3.5× vs 单节点",
        why: "大规模专家并行（EP）把 671B 的专家分到 64 卡。MLA 把 KV cache 砍到 1/10。",
        source: "LMSYS blog 2026/05",
      },
    ],
  },
];

const SectionThreeWorlds: React.FC = () => {
  const [active, setActive] = useState<World["id"]>("single");
  const world = WORLDS.find((w) => w.id === active)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">three worlds</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          <h2 className="lg:col-span-7 font-display text-display-lg text-ink leading-tight">
            一台 Mac mini 跑 70B，跟 64 张 H200 跑同一个 671B，
            <br />
            <span className="relative inline-block">
              <span className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
              <span className="relative z-10">是同一件事的两头。</span>
            </span>
          </h2>
          <div className="lg:col-span-5 self-end">
            <p className="text-[15px] text-ink/70 leading-relaxed">
              选哪套工具，先看是给谁用 ——
              自己玩、团队上线、还是一个公司一天 trillion tokens。
            </p>
            <p className="mt-2 text-[13px] text-ink/55 leading-relaxed">
              下面会出现 <strong className="text-ink/75">QPS</strong>：每秒能接几个请求，人越多要求越高。
            </p>
          </div>
        </div>

        {/* pill 切换 */}
        <div className="flex flex-wrap gap-2.5 mb-7">
          {WORLDS.map((w) => {
            const on = w.id === active;
            return (
              <button
                key={w.id}
                onClick={() => setActive(w.id)}
                className={[
                  "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink font-mono text-[12px] font-bold uppercase tracking-wider transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:bg-butter-tint",
                ].join(" ")}
              >
                {w.icon}
                <span>{w.label}</span>
              </button>
            );
          })}
        </div>

        <p key={world.id} className="font-mono text-[12px] text-ink/55 mb-6 animate-enter-fade">
          {world.hint}
        </p>

        {/* 3 个案例卡（key 强制重渲染让动画跑） */}
        <div key={active} className="grid md:grid-cols-3 gap-5">
          {world.cases.map((c, i) => (
            <article
              key={c.title}
              className="card-stamp p-5 animate-enter-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <h3 className="font-display text-[18px] font-bold text-ink leading-snug mb-3">
                {c.title}
              </h3>

              <dl className="space-y-2 text-[13px] mb-4">
                <div className="flex items-start gap-2">
                  <HardDrive className="w-3.5 h-3.5 mt-0.5 text-ink/45 flex-shrink-0" strokeWidth={2.2} />
                  <span className="text-ink/75">{c.hw}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Cpu className="w-3.5 h-3.5 mt-0.5 text-ink/45 flex-shrink-0" strokeWidth={2.2} />
                  <span className="font-mono text-[12px] text-ink">{c.tool}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Layers className="w-3.5 h-3.5 mt-0.5 text-ink/45 flex-shrink-0" strokeWidth={2.2} />
                  <span className="text-ink/75">{c.model}</span>
                </div>
              </dl>

              {/* 招牌数字 */}
              <div className="inline-flex items-baseline gap-1.5 px-3 py-1.5 bg-butter border-2 border-ink rounded-full mb-3">
                <span className="font-display text-[13px] font-bold text-ink tabular-nums">
                  {c.perf}
                </span>
              </div>

              <p className="text-[13px] text-ink/70 leading-relaxed mb-3">
                {c.why}
              </p>

              <p className="font-mono text-[10px] text-ink/40">
                src · {c.source}
              </p>
            </article>
          ))}
        </div>

        {/* 底部 callout */}
        <div className="mt-10 inline-flex items-center gap-3 px-4 py-3 bg-ink text-cream rounded-2xl border-2 border-ink">
          <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
          <p className="font-mono text-[11.5px] uppercase tracking-wider">
            选错档位 · 上来就推 vLLM 给个人玩家 · 或者拿 Ollama 给 1000 并发 · 全是踩坑入口
          </p>
        </div>

        {/* 互链卡：训练多卡分摊 vs 上线推理分锅 */}
        <a
          href="../deepspeed/index.html"
          className="mt-6 flex items-start gap-3 max-w-2xl px-4 py-3 bg-white border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-butter border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">多卡这件事，训练和上线是两码事。</span>
            <span className="text-ink/70"> 训练时怎么把一个大模型摊到多张卡上跑 —— 那是《DeepSpeed》讲的；这一站只管训练完之后、怎么把它架起来对外服务。</span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionThreeWorlds;
