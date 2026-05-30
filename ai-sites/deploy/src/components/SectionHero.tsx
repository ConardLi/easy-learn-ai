/**
 * Section 01 · Hero
 *
 * H1「模型部署是什么？」+ 15-35 字直白定义。
 * 右边交互卡是整站的视觉锚：拖并发数，看 4 个工具的总吞吐曲线分流。
 * Ollama 早早饱和成一条平线，vLLM/SGLang 一路爬到 5k+ tok/s。这就是最反直觉的一秒。
 */
import React, { useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";

/* 4 个工具的吞吐曲线参数（基于 Llama 3.1 8B BF16 / H100 单卡 真实 benchmark）
   throughput(c) = peak * c / (c + half)
   peak / half 调参以贴近实测：
   - Ollama 单 stream 设计，并发 2 用户开始就基本撑不动
   - TGI 进入 maintenance mode（HuggingFace 2026），但在 32 并发能跑出 3000+
   - vLLM v1 现版本 → 5000+
   - SGLang 比 vLLM 高 ~29% → 6400+
   来源：effloow.com 2026/04, localaimaster 2026, markaicode 2026, iotdigitaltwinplm Q2 2026 */
type Tool = {
  id: "sglang" | "vllm" | "tgi" | "ollama";
  name: string;
  peak: number;
  half: number;
  color: string;
};

const TOOLS: Tool[] = [
  { id: "sglang", name: "SGLang", peak: 6400, half: 22, color: "#FF4D74" },
  { id: "vllm", name: "vLLM v1", peak: 5200, half: 26, color: "#1B4B5A" },
  { id: "tgi", name: "TGI", peak: 3700, half: 32, color: "#E5BD3A" },
  { id: "ollama", name: "Ollama", peak: 90, half: 1.4, color: "#E07A5F" },
];

function throughput(t: Tool, c: number) {
  return (t.peak * c) / (c + t.half);
}

function ttft(t: Tool, c: number) {
  /* 简化 TTFT 模型：基础 + 并发线性叠加 */
  const base: Record<Tool["id"], number> = { sglang: 79, vllm: 103, tgi: 94, ollama: 380 };
  const k: Record<Tool["id"], number> = { sglang: 0.4, vllm: 0.6, tgi: 0.8, ollama: 9 };
  return Math.round(base[t.id] + k[t.id] * c);
}

const CONCURRENCIES = [1, 2, 4, 8, 16, 32, 64, 128, 256];

const SectionHero: React.FC = () => {
  const [cIdx, setCIdx] = useState(4); // 默认 16 并发
  const concurrency = CONCURRENCIES[cIdx];

  const series = useMemo(() => {
    return TOOLS.map((t) => ({
      tool: t,
      tps: throughput(t, concurrency),
      ttft: ttft(t, concurrency),
      points: CONCURRENCIES.map((c, i) => ({
        x: i,
        y: throughput(t, c),
      })),
    }));
  }, [concurrency]);

  /* SVG 视图尺寸 */
  const W = 480;
  const H = 220;
  const PAD_L = 38;
  const PAD_R = 12;
  const PAD_T = 16;
  const PAD_B = 26;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const maxTps = 7000;

  const xAt = (i: number) => PAD_L + (i / (CONCURRENCIES.length - 1)) * innerW;
  const yAt = (v: number) => PAD_T + innerH - (Math.min(v, maxTps) / maxTps) * innerH;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动小装饰 */}
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Model Deployment · 模型部署
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              模型部署
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
                  把训完的模型跑起来对外服务，挑哪套工具栈、用什么硬件、怎么算吞吐和延迟。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                训出来的权重只是文件。要让别人发请求、能流式拿到结果，得有一层「推理引擎」加 OpenAI 兼容 API。
              </p>
              <p>
                同一台 H100、同一个 Llama 3 8B，换不同工具就能差 70 倍。这件事比换硬件便宜得多。
              </p>
              <p>
                工具一边在卷吞吐和延迟，一边把内存、batch、KV cache 重新设计了一遍。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡，拖一下并发数。Ollama 平躺成一条线，vLLM 和 SGLang 一路爬高 —— 差距就是这么来的。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 6 章 · ~10 分钟
              </div>
            </div>
          </div>

          {/* 右：吞吐曲线卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  并发拨号盘 · Llama 3.1 8B · 1× H100
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[34px] lg:text-[40px] font-bold text-ink leading-none tabular-nums">
                    {concurrency}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">
                    并发
                  </span>
                </div>
              </div>

              {/* 离散并发档位 stepper */}
              <div className="grid grid-cols-9 gap-1.5 mb-5">
                {CONCURRENCIES.map((c, i) => {
                  const on = i === cIdx;
                  return (
                    <button
                      key={c}
                      onClick={() => setCIdx(i)}
                      className={[
                        "py-2 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#FF4D74]"
                          : "bg-white text-ink/65 hover:bg-cream",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {/* 吞吐曲线 SVG */}
              <div className="relative">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
                  {/* 网格 */}
                  <g stroke="#241C15" strokeOpacity="0.08" strokeWidth="0.8">
                    {[0.25, 0.5, 0.75, 1].map((p, i) => (
                      <line
                        key={`h-${i}`}
                        x1={PAD_L}
                        y1={PAD_T + innerH * (1 - p)}
                        x2={PAD_L + innerW}
                        y2={PAD_T + innerH * (1 - p)}
                      />
                    ))}
                  </g>
                  {/* Y 轴标注 */}
                  <g fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
                    <text x="8" y={yAt(0) + 3}>0</text>
                    <text x="8" y={yAt(1750) + 3}>1.7k</text>
                    <text x="8" y={yAt(3500) + 3}>3.5k</text>
                    <text x="8" y={yAt(5250) + 3}>5.2k</text>
                    <text x="8" y={yAt(7000) + 3}>7k</text>
                  </g>
                  <text x={PAD_L} y={H - 6} fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
                    并发
                  </text>
                  <text x={W - PAD_R - 4} y={H - 6} fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C" textAnchor="end">
                    tok/s
                  </text>

                  {/* X 轴并发刻度 */}
                  {CONCURRENCIES.map((c, i) => (
                    <text
                      key={`xt-${c}`}
                      x={xAt(i)}
                      y={PAD_T + innerH + 14}
                      fontFamily="Geist Mono, monospace"
                      fontSize="8.5"
                      fill="#88837C"
                      textAnchor="middle"
                    >
                      {c}
                    </text>
                  ))}

                  {/* 当前并发竖线 */}
                  <line
                    x1={xAt(cIdx)}
                    y1={PAD_T}
                    x2={xAt(cIdx)}
                    y2={PAD_T + innerH}
                    stroke="#241C15"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                    opacity="0.4"
                  />

                  {/* 4 条曲线 */}
                  {series.map(({ tool, points }) => {
                    const d = points
                      .map((p, i) => `${i === 0 ? "M" : "L"}${xAt(p.x)},${yAt(p.y)}`)
                      .join(" ");
                    return (
                      <g key={tool.id}>
                        <path
                          d={d}
                          fill="none"
                          stroke={tool.color}
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* 当前并发点 */}
                        <circle
                          cx={xAt(cIdx)}
                          cy={yAt(throughput(tool, concurrency))}
                          r="5"
                          fill={tool.color}
                          stroke="#241C15"
                          strokeWidth="1.6"
                          className="transition-all duration-300 ease-out"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* 当前并发下 4 个工具的实时数字 */}
              <div className="grid grid-cols-4 gap-2 mt-5 pt-5 border-t border-ink/10">
                {series.map(({ tool, tps, ttft }) => (
                  <div
                    key={tool.id}
                    className="px-2.5 py-2 bg-cream border-2 border-ink rounded-md"
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tool.color }}
                      />
                      <span className="font-mono text-[10px] font-bold text-ink uppercase tracking-wider">
                        {tool.name}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-[18px] font-bold text-ink tabular-nums leading-none">
                        {Math.round(tps).toLocaleString()}
                      </span>
                      <span className="font-mono text-[9px] text-ink/50">tok/s</span>
                    </div>
                    <div className="mt-1 font-mono text-[9.5px] text-ink/55 tabular-nums">
                      TTFT {ttft}ms
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                数据：localaimaster 2026 · effloow.com 2026/04 · markaicode 2026 · iotdigitaltwinplm Q2 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
