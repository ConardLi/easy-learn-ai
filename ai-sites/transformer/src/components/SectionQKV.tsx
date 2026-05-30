/**
 * Section 03 · 「Q/K/V：一个词决定看谁的 6 步」
 *
 * 拆 self-attention 在单个 query token 上的计算流程。**用柱状图 + 流程节点**，
 * 故意不做 8×8 矩阵热力图（bert 站已用，避免重复）。
 *
 * 用户做什么：
 *   ─ 选 5 个 token 里的一个当 query
 *   ─ next / prev 单步走 6 步：
 *       1. 拿到 query 的 embedding（一个 6 维向量柱）
 *       2. Query 乘 W_Q → q 向量；同时所有 token 算自己的 K / V（5 套）
 *       3. q 跟每个 K 做点积 → 5 个 raw score
 *       4. 除以 √d_k （scaling，让数值不炸）
 *       5. softmax → 5 个 0~1 的权重（柱条 + 数字）
 *       6. 权重加权 5 个 V 向量 → 输出向量
 *
 * 跟 bert 「点 token 看 attention 矩阵」最大区别：
 *   ─ bert 是「看全局矩阵分布」（视觉重点是热力网格）
 *   ─ 这里是「拆一个 token 的计算管线」（视觉重点是单步流程 + 柱条）
 */
import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const SENTENCE = ["猫", "坐", "在", "沙发", "上"];
const N = SENTENCE.length;
const D_MODEL = 6;
const D_K = 4;

/** 用确定的伪随机产生小向量值，避免渲染抖 */
function pseudo(a: number, b: number, c: number): number {
  const x = Math.sin(a * 12.9898 + b * 78.233 + c * 37.719) * 43758.5453;
  return x - Math.floor(x);
}

/** 6 维 embedding：每个 token 一个向量 */
const EMBEDDINGS = SENTENCE.map((_, i) =>
  Array.from({ length: D_MODEL }, (_, d) => (pseudo(i, d, 1) - 0.5) * 1.8),
);

/** W_Q / W_K / W_V 是 6×4 矩阵，每个 token 算出 4 维 Q/K/V */
function project(embedding: number[], seed: number): number[] {
  const out: number[] = [];
  for (let j = 0; j < D_K; j++) {
    let s = 0;
    for (let i = 0; i < D_MODEL; i++) {
      const w = (pseudo(i, j, seed) - 0.5) * 1.4;
      s += embedding[i] * w;
    }
    out.push(s);
  }
  return out;
}

const STEP_LABELS = [
  "1 · 拿到 query 的 embedding",
  "2 · 算出 Q · K · V 三组向量",
  "3 · q 跟每个 k 做点积",
  "4 · 除以 √d_k 让分数不炸",
  "5 · softmax 归一成 5 个权重",
  "6 · 用权重加权 5 个 v",
];
const TOTAL_STEPS = STEP_LABELS.length;

const SectionQKV: React.FC = () => {
  const [queryIdx, setQueryIdx] = useState(0);
  const [step, setStep] = useState(1);

  const data = useMemo(() => {
    const qEmb = EMBEDDINGS[queryIdx];
    const q = project(qEmb, 11);
    const K = SENTENCE.map((_, i) => project(EMBEDDINGS[i], 22));
    const V = SENTENCE.map((_, i) => project(EMBEDDINGS[i], 33));

    /* 1. raw score = q · k_i */
    const raw = K.map((k) => k.reduce((s, kj, j) => s + kj * q[j], 0));

    /* 2. scaled */
    const scaled = raw.map((r) => r / Math.sqrt(D_K));

    /* 3. softmax */
    const max = Math.max(...scaled);
    const exps = scaled.map((s) => Math.exp(s - max));
    const sumExp = exps.reduce((a, b) => a + b, 0);
    const weights = exps.map((e) => e / sumExp);

    /* 4. output = Σ weights_i × V_i */
    const out = new Array(D_K).fill(0);
    weights.forEach((w, i) => {
      V[i].forEach((vj, j) => {
        out[j] += w * vj;
      });
    });

    return { qEmb, q, K, V, raw, scaled, weights, out };
  }, [queryIdx]);

  const next = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));
  const reset = () => setStep(1);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Q · K · V · self-attention 拆解</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-8">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              一个词怎么决定
              <br />
              要看其他哪些词？
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              Self-attention 的核心动作就这 6 步：每个词同时算出 Q / K / V 三组向量，q 跟所有 k 点积出 5 个分数，softmax 拍平成权重，再去拿 5 份 v 的加权平均。下面挑一个词当 query，单步看。
            </p>
          </div>
        </div>

        {/* 主交互卡 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
          {/* token 选择行 */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                选一个 token 当 query
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SENTENCE.map((tok, i) => {
                  const on = i === queryIdx;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setQueryIdx(i);
                        setStep(1);
                      }}
                      className={[
                        "inline-flex items-center px-3 py-1.5 rounded-md border-2 border-ink font-display text-[14px] font-bold transition-all duration-250 ease-spring",
                        on
                          ? "bg-coral text-cream shadow-[2px_2px_0_0_#241C15]"
                          : "bg-white text-ink/75 hover:bg-butter",
                      ].join(" ")}
                    >
                      {tok}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                aria-label="重置"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-ink bg-white text-ink/75 hover:bg-cream transition-all duration-250"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
              <button
                onClick={prev}
                disabled={step === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full border-2 border-ink bg-white font-mono text-[11px] font-bold disabled:opacity-35 disabled:cursor-not-allowed hover:bg-cream transition-all duration-250"
              >
                <ChevronLeft className="w-3 h-3" strokeWidth={3} /> 上一步
              </button>
              <button
                onClick={next}
                disabled={step === TOTAL_STEPS}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full border-2 border-ink bg-ink text-cream font-mono text-[11px] font-bold shadow-[3px_3px_0_0_#E07A5F] disabled:opacity-35 disabled:cursor-not-allowed hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_#E07A5F] transition-all duration-250 ease-spring"
              >
                下一步 <ChevronRight className="w-3 h-3" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* step 进度 */}
          <div className="grid grid-cols-6 gap-1 mb-5">
            {STEP_LABELS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i + 1)}
                className={[
                  "h-1.5 rounded-full transition-all duration-300 ease-spring",
                  i + 1 <= step
                    ? "bg-coral"
                    : "bg-ink/12 hover:bg-ink/25",
                ].join(" ")}
              />
            ))}
          </div>
          <div className="font-display text-[15px] font-bold text-ink mb-6">
            {STEP_LABELS[step - 1]}
          </div>

          {/* 主体：根据 step 渲染不同视图 */}
          <div className="grid lg:grid-cols-12 gap-7">
            {/* 左列：query 向量 + q/k/v */}
            <div className="lg:col-span-5 space-y-4">
              {/* embedding */}
              <Block
                label={`embedding · ${SENTENCE[queryIdx]} (${D_MODEL} 维)`}
                active={step >= 1}
                tone="butter"
              >
                <Bars vec={data.qEmb} />
              </Block>

              {/* q vector */}
              <Block
                label={`Q · q = embedding × W_Q (${D_K} 维)`}
                active={step >= 2}
                tone="coral"
              >
                <Bars vec={data.q} />
              </Block>

              {/* output */}
              <Block
                label="输出 · 这个词新的表示"
                active={step >= 6}
                tone="teal"
              >
                <Bars vec={data.out} />
              </Block>
            </div>

            {/* 右列：5 token × (K / V / score / weight) 表格 */}
            <div className="lg:col-span-7">
              <div className="px-4 py-3 bg-cream border-2 border-ink rounded-2xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                  其他 token · 每个都参与
                </div>

                <div className="space-y-2.5">
                  {SENTENCE.map((tok, i) => {
                    const isQ = i === queryIdx;
                    return (
                      <div
                        key={i}
                        className={[
                          "grid grid-cols-[36px_1fr] gap-2.5 items-center px-2.5 py-2 rounded-md border-2 transition-all duration-300 ease-spring",
                          isQ
                            ? "bg-coral/15 border-coral"
                            : "bg-white border-ink/15",
                        ].join(" ")}
                      >
                        <div className="font-display text-[14px] font-bold text-ink text-center">
                          {tok}
                        </div>

                        <div className="space-y-1">
                          {/* step 2: K 向量小条 */}
                          {step >= 2 && step < 3 && (
                            <Row
                              label="k"
                              vec={data.K[i]}
                              tone="ink"
                            />
                          )}
                          {step >= 2 && step < 3 && (
                            <Row label="v" vec={data.V[i]} tone="ink" />
                          )}

                          {/* step 3: raw score q·k_i */}
                          {step >= 3 && step < 4 && (
                            <ScoreBar
                              caption={`q · k = ${data.raw[i].toFixed(2)}`}
                              value={data.raw[i]}
                              max={Math.max(...data.raw.map(Math.abs))}
                              tone="ink"
                            />
                          )}

                          {/* step 4: scaled */}
                          {step >= 4 && step < 5 && (
                            <ScoreBar
                              caption={`÷ √${D_K} = ${data.scaled[i].toFixed(2)}`}
                              value={data.scaled[i]}
                              max={Math.max(...data.scaled.map(Math.abs))}
                              tone="ink"
                            />
                          )}

                          {/* step 5: softmax 权重 */}
                          {step >= 5 && (
                            <WeightBar
                              caption={`权重 ${(data.weights[i] * 100).toFixed(1)}%`}
                              value={data.weights[i]}
                            />
                          )}

                          {/* step 6: 权重 × V 的贡献条 */}
                          {step >= 6 && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="font-mono text-[9px] text-ink/55 w-9">
                                贡献
                              </span>
                              <div className="flex-1 flex gap-0.5">
                                {data.V[i].map((vj, j) => {
                                  const c = vj * data.weights[i];
                                  const len = Math.min(
                                    100,
                                    Math.abs(c) * 220,
                                  );
                                  return (
                                    <div
                                      key={j}
                                      className="flex-1 h-2.5 bg-ink/8 border border-ink/15 rounded-sm overflow-hidden flex"
                                    >
                                      <div
                                        className={[
                                          "h-full transition-all duration-400 ease-spring",
                                          c >= 0
                                            ? "bg-teal"
                                            : "bg-coral",
                                        ].join(" ")}
                                        style={{ width: `${len}%` }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* step 1: 占位提示 */}
                          {step === 1 && (
                            <div className="font-mono text-[10px] text-ink/40">
                              等待 query 的 embedding 出来后，跟它们一起算 Q/K/V…
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {step >= 5 && (
                  <p className="mt-3 font-mono text-[10px] text-ink/45 leading-relaxed">
                    softmax 把 5 个 score 拍成总和 = 100% 的概率分布，大数字越大权重越高。
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 公式提示 */}
          <div className="mt-6 px-4 py-3 bg-ink text-cream rounded-xl border-2 border-ink font-mono text-[12px] leading-relaxed">
            <span className="text-butter">attention(q, K, V) =</span>{" "}
            softmax( q · K<sup>T</sup> / √d_k ) · V
            <span className="ml-3 text-cream/55">
              · arXiv:1706.03762 § 3.2.1 「Scaled Dot-Product Attention」
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

function Block({
  label,
  active,
  tone,
  children,
}: {
  label: string;
  active: boolean;
  tone: "butter" | "coral" | "teal";
  children: React.ReactNode;
}) {
  const bg =
    tone === "butter"
      ? "bg-butter/40 border-ink"
      : tone === "coral"
        ? "bg-coral/15 border-coral"
        : "bg-teal/15 border-teal";
  return (
    <div
      className={[
        "px-3.5 py-3 border-2 rounded-xl transition-all duration-300 ease-spring",
        active ? bg : "bg-white border-ink/15 opacity-50",
      ].join(" ")}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 mb-2">
        {label}
      </div>
      <div className={active ? "" : "opacity-40"}>{children}</div>
    </div>
  );
}

function Bars({ vec }: { vec: number[] }) {
  const max = Math.max(...vec.map(Math.abs), 0.1);
  return (
    <div className="flex items-end gap-1 h-14">
      {vec.map((v, i) => {
        const h = (Math.abs(v) / max) * 100;
        const isPos = v >= 0;
        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <div className="flex-1 w-full flex items-end justify-center">
              <div
                className={[
                  "w-full rounded-sm border border-ink transition-all duration-400 ease-spring",
                  isPos ? "bg-ink" : "bg-coral",
                ].join(" ")}
                style={{ height: `${h}%` }}
              />
            </div>
            <span className="font-mono text-[8.5px] text-ink/55 tabular-nums">
              {v.toFixed(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, vec, tone }: { label: string; vec: number[]; tone: "ink" }) {
  const max = Math.max(...vec.map(Math.abs), 0.1);
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[9px] text-ink/55 w-9">{label}</span>
      <div className="flex-1 flex gap-0.5">
        {vec.map((v, i) => {
          const len = (Math.abs(v) / max) * 100;
          return (
            <div
              key={i}
              className="flex-1 h-2.5 bg-ink/8 border border-ink/15 rounded-sm overflow-hidden flex"
            >
              <div
                className={[
                  "h-full",
                  v >= 0 ? "bg-ink" : "bg-coral",
                ].join(" ")}
                style={{ width: `${len}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreBar({
  caption,
  value,
  max,
  tone,
}: {
  caption: string;
  value: number;
  max: number;
  tone: "ink";
}) {
  const len = max === 0 ? 0 : (Math.abs(value) / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] text-ink/65 tabular-nums w-[120px]">
        {caption}
      </span>
      <div className="flex-1 h-3 bg-ink/8 rounded-sm overflow-hidden border border-ink/15">
        <div
          className={[
            "h-full transition-all duration-400 ease-spring",
            value >= 0 ? "bg-ink" : "bg-coral",
          ].join(" ")}
          style={{ width: `${len}%` }}
        />
      </div>
    </div>
  );
}

function WeightBar({ caption, value }: { caption: string; value: number }) {
  return (
    <div className="flex items-center gap-2 animate-enter-fade">
      <span className="font-mono text-[10px] text-ink tabular-nums w-[120px] font-semibold">
        {caption}
      </span>
      <div className="flex-1 h-3 bg-ink/8 rounded-sm overflow-hidden border border-ink/15">
        <div
          className="h-full bg-coral transition-all duration-400 ease-spring"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}

export default SectionQKV;
