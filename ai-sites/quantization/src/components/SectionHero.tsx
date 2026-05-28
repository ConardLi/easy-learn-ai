/**
 * Section 01 · Hero
 *
 * 反模板：核心交互直接放 hero（不像 llm/agent/rag 把动画藏到 section 3）。
 * 用户进站第 1 秒就能拖 slider，立刻感受到「砍精度 ≠ 砍质量」。
 *
 * 视觉：左 = 主标题 / 副标 / 一行 mono caption ；右 = 可视化卡（权重值矩阵 + 70B 体积条）。
 * 滑块本身也在右卡里，拖动时所有数字同步变。
 */
import React, { useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";

/* 真实感伪 FP32 权重示例 —— 用确定值避免每次渲染抖动 */
const SAMPLE_WEIGHTS = [
  0.847291, -0.123456, 0.000234, -0.567823, 1.234567, -0.789012, 0.345678, -0.901234,
];

/* 各 bit 数下 Llama 3 70B 的真实体积（GB） · 数据来源 llmhardware.io / insiderllm.com 2026/05 */
const LLAMA_70B_SIZE: Record<number, number> = {
  32: 280,
  16: 140,
  8: 70,
  4: 42,
  3: 28,
  2: 18,
  1.58: 14,
};

/* bit 数对应的质量保留率（相对 FP16） · 来自实测综合 */
const QUALITY_PCT: Record<number, number> = {
  32: 100,
  16: 100,
  8: 99.8,
  4: 99,
  3: 95,
  2: 76,
  1.58: 97, // BitNet 是 native 训练，所以"质量"概念跟 PTQ 不一样，这里取 BitNet 2B 跑分相对 Qwen2.5 1.5B
};

const BIT_OPTIONS = [32, 16, 8, 4, 3, 2, 1.58];

const SectionHero: React.FC = () => {
  const [bits, setBits] = useState(4);

  /* 量化后的权重值（简化模型：均匀切 2^bits 个 level，对称 [-1, 1] 映射，
     特殊处理 1.58-bit 用 {-1, 0, +1}）*/
  const quantizedWeights = useMemo(() => {
    return SAMPLE_WEIGHTS.map((w) => quantize(w, bits));
  }, [bits]);

  const size = LLAMA_70B_SIZE[bits];
  const quality = QUALITY_PCT[bits];
  const compression = (280 / size).toFixed(1);

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
          {/* 左：文字 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-8 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                a hands-on handbook · 2026
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-7 animate-enter-up">
              砍掉{" "}
              <span className="relative inline-block">
                <span className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-butter -z-0 -rotate-1" aria-hidden />
                <span className="relative z-10">87% 的精度</span>
              </span>
              ，<br />
              模型却{" "}
              <span className="relative inline-block">
                <span className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-coral/55 -z-0 rotate-1" aria-hidden />
                <span className="relative z-10">一样聪明</span>
              </span>
              。
            </h1>

            <p className="max-w-md font-sans text-[17px] text-ink/70 leading-relaxed mb-3 animate-enter-fade">
              一个模型里有几十亿个数字，每个默认占 32 位。
              <strong className="text-ink">量化</strong>就是把它们改成更短的表示 ——
              比如 4 位整数。模型瞬间小 8 倍，跑得快很多，质量几乎不变。
            </p>
            <p className="max-w-md font-sans text-[14.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这个滑块，就是「砍精度」这个动作本身。拖它。
            </p>

            <div className="mt-10 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 6 个章节 · ~10 分钟
              </div>
            </div>
          </div>

          {/* 右：可视化卡（slider + 权重 + 体积条 + 质量百分比） */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* slider header */}
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① precision
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[34px] lg:text-[40px] font-bold text-ink leading-none tabular-nums">
                    {bits === 1.58 ? "1.58" : bits}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">bit</span>
                </div>
              </div>

              {/* 自定义 bit 选择器（不是 slider，是 7 个 stamp pill，离散更清晰） */}
              <div className="grid grid-cols-7 gap-1.5 mb-7">
                {BIT_OPTIONS.map((b) => {
                  const on = b === bits;
                  return (
                    <button
                      key={b}
                      onClick={() => setBits(b)}
                      className={[
                        "py-2 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/65 hover:bg-cream",
                      ].join(" ")}
                    >
                      {b === 1.58 ? "1.58" : b}
                    </button>
                  );
                })}
              </div>

              {/* 8 个权重的模糊化展示 */}
              <div className="mb-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  ② 8 个权重值的变化
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {SAMPLE_WEIGHTS.map((w, i) => {
                    const q = quantizedWeights[i];
                    const lost = Math.abs(w - q);
                    return (
                      <div
                        key={i}
                        className="px-2.5 py-2 bg-cream border-2 border-ink rounded-md"
                      >
                        <div className="font-mono text-[9px] text-ink/45 mb-0.5">
                          w[{i}] · {w.toFixed(4)}
                        </div>
                        <div className="font-mono text-[14px] font-bold text-ink tabular-nums">
                          {q.toFixed(q === 0 ? 1 : 4)}
                        </div>
                        <div className="mt-0.5 h-1 bg-ink/8 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-coral transition-all duration-300"
                            style={{ width: `${Math.min(lost * 150, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2 font-mono text-[10px] text-ink/45">
                  ↑ 红条 = 量化误差。越长损失越大
                </p>
              </div>

              {/* Llama 3 70B 体积条 + 质量百分比 */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-ink/10">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                    Llama 3 70B 体积
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[28px] font-bold text-ink tabular-nums">
                      {size}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">GB</span>
                    <span className="ml-2 font-mono text-[11px] text-coral">
                      ↓{compression}×
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                    <div
                      className="h-full bg-ink transition-all duration-400 ease-spring"
                      style={{ width: `${(size / 280) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                    质量保留
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={[
                        "font-display text-[28px] font-bold tabular-nums",
                        quality >= 95 ? "text-teal" : quality >= 80 ? "text-ink" : "text-coral",
                      ].join(" ")}
                    >
                      {quality.toFixed(1)}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">%</span>
                  </div>
                  <div className="mt-2 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                    <div
                      className={[
                        "h-full transition-all duration-400 ease-spring",
                        quality >= 95 ? "bg-teal" : quality >= 80 ? "bg-butter-deep" : "bg-coral",
                      ].join(" ")}
                      style={{ width: `${quality}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 注脚 */}
              <p className="mt-4 font-mono text-[10px] text-ink/40">
                来源：llmhardware.io / insiderllm.com 2026/05 · BitNet b1.58 arXiv:2504.12285
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * 简化的量化函数：把 [-1.5, 1.5] 范围内的权重值映射到 2^bits 个均匀 level；
 * 1.58 bit 单独处理为 ternary {-1, 0, +1}（BitNet 风格）。
 * 真实 quantization 会做 scale + offset，但讲意思够了。
 */
function quantize(w: number, bits: number): number {
  if (bits >= 32) return w;
  if (bits === 1.58) {
    /* ternary：>0.5 → 1，<-0.5 → -1，否则 0 */
    if (w > 0.5) return 1;
    if (w < -0.5) return -1;
    return 0;
  }
  const levels = Math.pow(2, bits);
  /* 把 [-1.5, 1.5] 范围切 levels 份，找最近的格点 */
  const range = 3; // -1.5 ~ 1.5
  const step = range / (levels - 1);
  const idx = Math.round((w + 1.5) / step);
  const clamped = Math.max(0, Math.min(levels - 1, idx));
  return Number((clamped * step - 1.5).toFixed(4));
}

export default SectionHero;
