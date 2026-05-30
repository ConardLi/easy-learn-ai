/**
 * Section 02 · LoRA 的数学拆解
 *
 * 反模板：跟 quantization 的"数轴 + bin"完全不同 ——
 *   这里是矩阵几何 + 双 slider（r 和 alpha）控制 BA 形状和缩放因子。
 *
 * 主交互：
 *   - r slider [1 .. 256]，控制 B(d×r) 和 A(r×d) 的形状
 *   - alpha slider [1 .. 256]，控制实际缩放因子 alpha/r（rsLoRA 改成 alpha/√r）
 *   - 左边大矩阵 W(d×d) + 旁边并联 B+A，参数量秒变
 *   - 给具体例子：d=4096（Llama-7B 一层 q_proj），r=8 → 65K（0.4% W）
 *
 * 数据来源：
 *   - LoRA: Hu et al. 2021 arXiv:2106.09685 · 默认 r=8, alpha=16
 *   - rsLoRA: Kalajdzievski 2023 arXiv:2312.03732 · scale = alpha/√r
 *   - Unsloth 默认 q_proj/k_proj/v_proj/o_proj + 3 个 MLP proj
 */
import React, { useState } from "react";
import { Sparkles } from "lucide-react";

const D_DIM = 4096; // Llama-7B 一层 q_proj 的维度

const SectionDecompose: React.FC = () => {
  const [r, setR] = useState(8);
  const [alpha, setAlpha] = useState(16);
  const [scaleMode, setScaleMode] = useState<"lora" | "rslora">("lora");

  const wParams = D_DIM * D_DIM; // 4096^2 = 16,777,216
  const baParams = 2 * D_DIM * r;
  const pct = ((baParams / wParams) * 100).toFixed(3);

  const scaleFactor =
    scaleMode === "lora" ? alpha / r : alpha / Math.sqrt(r);

  /* B 和 A 矩阵的视觉宽度（按 r 比例画，min/max 限制以免极端） */
  const matrixSide = 120; // W 是 120×120 像素
  const baThickness = Math.max(6, Math.min(56, (r / 256) * 56 + 4));

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">decomposition</span>
        </div>

        <div className="mb-10 lg:mb-12 max-w-3xl">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-tight">
            LoRA 把一个大矩阵<br className="lg:hidden" />
            <span className="relative inline-block ml-0 lg:ml-2">
              <span
                className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">拆成两个细矩阵的乘积</span>
            </span>。
          </h2>
          <p className="text-[15px] lg:text-[16px] text-ink/70 max-w-2xl leading-relaxed">
            原权重 W 是 d×d 的方阵（d=4096 是 Llama-7B 一层）。LoRA 不动 W，在它旁边并联 ΔW = B·A，其中 B 是 d×r、A 是 r×d。r 选 8 时新参数量是 0.39% × W。
          </p>
          <p className="mt-3 text-[14px] text-ink/55 max-w-2xl leading-relaxed">
            拖右边 r，实时看 BA 变粗变细、参数百分比和 7B 模型的总训练参数。alpha/r 是把 BA 输出乘多大再加回主路径，这就是「LoRA scale」。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* 左 · 矩阵可视化 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  Llama-7B · q_proj 一层
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cream border border-ink/30 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-dot" />
                  <span className="font-mono text-[10px] text-ink/65">d = 4096</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 lg:gap-10 py-4">
                {/* W 原权重大方块（冻结） */}
                <MatrixBlock
                  width={matrixSide}
                  height={matrixSide}
                  label="W"
                  sub="d × d"
                  count="16.78 M"
                  tone="frozen"
                />

                {/* + sign */}
                <div className="font-display text-[36px] font-bold text-ink/40">+</div>

                {/* B × A · LoRA 旁路 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral font-bold">
                    LoRA · 训这里
                  </div>
                  <div className="flex items-center gap-3">
                    <MatrixBlock
                      width={baThickness}
                      height={matrixSide}
                      label="B"
                      sub={`d × ${r}`}
                      count={`${(D_DIM * r).toLocaleString()}`}
                      tone="train"
                    />
                    <span className="font-display text-[24px] font-bold text-ink/40">×</span>
                    <MatrixBlock
                      width={matrixSide}
                      height={baThickness}
                      label="A"
                      sub={`${r} × d`}
                      count={`${(r * D_DIM).toLocaleString()}`}
                      tone="train"
                    />
                  </div>
                  <div className="mt-2 px-3 py-1.5 bg-coral text-cream border-2 border-ink rounded-full shadow-stamp font-mono text-[11px] font-bold">
                    2dr = {baParams.toLocaleString()} · {pct}% × W
                  </div>
                </div>
              </div>

              {/* 缩放公式：scale = alpha / r 或 alpha / √r */}
              <div className="mt-6 pt-5 border-t border-ink/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                      实际加回主路径的公式
                    </div>
                    <div className="font-mono text-[16px] lg:text-[18px] text-ink font-bold">
                      h = W·x &nbsp;+&nbsp; {scaleFactor.toFixed(3)} · B·A·x
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 bg-cream border-2 border-ink rounded-full">
                    {(["lora", "rslora"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setScaleMode(mode)}
                        className={[
                          "px-3 py-1.5 rounded-full font-mono text-[10px] font-bold transition-all duration-250",
                          scaleMode === mode
                            ? "bg-ink text-cream"
                            : "text-ink/55 hover:text-ink",
                        ].join(" ")}
                      >
                        {mode === "lora" ? "α/r" : "α/√r · rsLoRA"}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-2 font-mono text-[10.5px] text-ink/45">
                  {scaleMode === "lora"
                    ? "α/r 越大越偏新数据，越小越保留 base 能力。Hu 原文默认 α=2r"
                    : "rsLoRA 用 α/√r 替代，能在 r>32 时稳定不爆。arXiv:2312.03732"}
                </p>
              </div>
            </div>
          </div>

          {/* 右 · 双 slider 控制台 */}
          <div className="lg:col-span-5">
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-6 lg:p-7">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-coral" strokeWidth={2.5} />
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65 font-semibold">
                  双滑块控制台
                </div>
              </div>

              {/* r slider */}
              <div className="mb-7">
                <div className="flex items-baseline justify-between mb-2">
                  <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/65 font-bold">
                    rank r
                  </label>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                      {r}
                    </span>
                    <span className="font-mono text-[10px] text-ink/45">/ 256</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={256}
                  step={1}
                  value={r}
                  onChange={(e) => setR(Number(e.target.value))}
                  className="w-full accent-coral"
                />
                <div className="mt-1 flex justify-between font-mono text-[9.5px] text-ink/40">
                  <span>1</span>
                  <span>8 · 默认</span>
                  <span>32</span>
                  <span>128</span>
                  <span>256</span>
                </div>
              </div>

              {/* alpha slider */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/65 font-bold">
                    alpha α
                  </label>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                      {alpha}
                    </span>
                    <span className="font-mono text-[10px] text-ink/45">/ 256</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={256}
                  step={1}
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full accent-teal"
                />
                <div className="mt-1 flex justify-between font-mono text-[9.5px] text-ink/40">
                  <span>1</span>
                  <span>16</span>
                  <span>64</span>
                  <span>128</span>
                  <span>256</span>
                </div>
              </div>

              {/* 即时结论行 */}
              <div className="space-y-2 pt-5 border-t border-ink/15">
                <KV label="缩放因子" value={scaleFactor.toFixed(3)} />
                <KV label="单层新参数" value={`${(baParams / 1000).toFixed(1)} K`} />
                <KV
                  label="Llama-7B 全 7 个 proj × 32 层"
                  value={`${((baParams * 7 * 32) / 1_000_000).toFixed(1)} M`}
                />
                <KV
                  label="占 7B 总参数"
                  value={`${(((baParams * 7 * 32) / 7_000_000_000) * 100).toFixed(3)}%`}
                />
              </div>

              <p className="mt-5 font-mono text-[10px] text-ink/45 leading-snug">
                注：Unsloth / Axolotl 2026 默认目标层 = q/k/v/o + gate/up/down 共 7 个 proj × 32 层。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MatrixBlock: React.FC<{
  width: number;
  height: number;
  label: string;
  sub: string;
  count: string;
  tone: "frozen" | "train";
}> = ({ width, height, label, sub, count, tone }) => {
  const isFrozen = tone === "frozen";
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "relative border-2 border-ink rounded-md transition-all duration-400 ease-spring",
          isFrozen ? "bg-ink/85 shadow-stamp" : "bg-coral shadow-[3px_3px_0_0_#241C15]",
        ].join(" ")}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          minWidth: "8px",
          minHeight: "8px",
        }}
      >
        {/* 矩阵网格底纹 */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-25"
        >
          <defs>
            <pattern id={`grid-${label}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FBEFE3" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#grid-${label})`} />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-display text-[18px] font-bold text-cream pointer-events-none"
          style={{ writingMode: height > width * 1.5 ? "vertical-rl" : "horizontal-tb" }}
        >
          {label}
        </span>
        {isFrozen && (
          <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-cream border-2 border-ink rounded-full font-mono text-[8.5px] font-bold uppercase tracking-wider">
            冻
          </div>
        )}
      </div>
      <div className="font-mono text-[10px] text-ink/55 tabular-nums">{sub}</div>
      <div className="font-mono text-[10px] font-bold text-ink tabular-nums">{count}</div>
    </div>
  );
};

const KV: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-3">
    <span className="font-mono text-[11px] text-ink/55">{label}</span>
    <span className="font-display text-[16px] font-bold text-ink tabular-nums">{value}</span>
  </div>
);

export default SectionDecompose;
