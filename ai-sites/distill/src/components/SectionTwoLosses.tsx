/**
 * Section 03 · 拉绳子 · 学生同时被两个 loss 拽
 *
 * 核心：Loss = α · KL(p_s/T || p_t/T) · T² + (1-α) · CE(p_s || y)
 *
 * 双 slider（L3）：
 *   α  ∈ [0, 1]  —— 软 / 硬比例
 *   T  ∈ [1, 8]  —— 蒸馏温度
 *
 * 视觉：左侧 SVG 画一根「绳子」从学生节点拉向 hard label 和 teacher，
 *      绳子粗细随 α 实时变。右侧实时算出学生的 distribution。
 */
import React, { useMemo, useState } from "react";
import { Sliders } from "lucide-react";

const CLASSES = ["金毛", "狼", "狐狸", "猫", "雪豹"];
const TEACHER_LOGITS = [6.2, 4.5, 3.1, 0.4, 0.2]; // 同 S2 的「像狼的金毛」
const HARD_INDEX = 0; // 真实标签是金毛

function softmaxT(logits: number[], T: number) {
  const scaled = logits.map((z) => z / T);
  const m = Math.max(...scaled);
  const exps = scaled.map((z) => Math.exp(z - m));
  const s = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / s);
}

const SectionTwoLosses: React.FC = () => {
  const [alpha, setAlpha] = useState(0.7);
  const [T, setT] = useState(4);

  /* 教学简化模型：
     一个理想化的"训练完成的学生"会让自己的输出 = α·teacher(T) + (1-α)·one_hot
     真实蒸馏是梯度下降的结果，但形状一致 —— 软硬两个 supervision 信号的凸组合。 */
  const teacherSoft = useMemo(() => softmaxT(TEACHER_LOGITS, T), [T]);
  const hardOneHot = useMemo(
    () => CLASSES.map((_, i) => (i === HARD_INDEX ? 1 : 0)),
    [],
  );

  const studentPred = useMemo(
    () => teacherSoft.map((p, i) => alpha * p + (1 - alpha) * hardOneHot[i]),
    [alpha, teacherSoft, hardOneHot],
  );

  /* 暗知识保留率：和 teacher 分布的 cosine 相似度 */
  const cosSim = useMemo(() => {
    const dot = teacherSoft.reduce((s, t, i) => s + t * studentPred[i], 0);
    const nT = Math.sqrt(teacherSoft.reduce((s, t) => s + t * t, 0));
    const nS = Math.sqrt(studentPred.reduce((s, p) => s + p * p, 0));
    return dot / (nT * nS);
  }, [teacherSoft, studentPred]);

  /* 硬标签命中：是不是 top-1 还押对 */
  const top1 = studentPred.indexOf(Math.max(...studentPred));
  const hitsHard = top1 === HARD_INDEX;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">two losses</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          学生被{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">两条绳</span>
          </span>{" "}
          同时拉。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          一条绳叫{" "}
          <strong className="text-ink">硬标签</strong> ——「答案是金毛，别的都给 0 分」。
          另一条叫 <strong className="text-ink">老师的软标签</strong> ——「85% 金毛，但留点分给狼」。
          系数 α 决定哪根绳更紧。
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：拉绳子 SVG + 公式 */}
          <div className="lg:col-span-6">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-4">
                tug of war · α 决定哪根绳更紧
              </div>

              <RopeSvg alpha={alpha} />

              {/* 公式 + 实时系数 */}
              <div className="mt-5 px-4 py-3 bg-cream border-2 border-ink rounded-xl font-mono text-[12.5px] text-ink leading-relaxed">
                <div className="text-[10px] text-ink/50 uppercase tracking-[0.18em] mb-1.5">
                  loss
                </div>
                <div className="break-words">
                  L ={" "}
                  <span
                    className="inline-flex items-center gap-1 px-1.5 rounded transition-all"
                    style={{
                      backgroundColor: `rgba(224, 122, 95, ${0.15 + alpha * 0.5})`,
                    }}
                  >
                    <strong className="text-coral tabular-nums">{alpha.toFixed(2)}</strong>
                    <span>·</span>
                    <span>KL(p_s‖p_t) · T²</span>
                  </span>
                  <br />
                  <span className="ml-3">+</span>{" "}
                  <span
                    className="inline-flex items-center gap-1 px-1.5 rounded transition-all"
                    style={{
                      backgroundColor: `rgba(36, 28, 21, ${0.08 + (1 - alpha) * 0.45})`,
                    }}
                  >
                    <strong className="tabular-nums">{(1 - alpha).toFixed(2)}</strong>
                    <span>·</span>
                    <span>CE(p_s, y)</span>
                  </span>
                </div>
                <div className="mt-2 text-[10.5px] text-ink/55">
                  T² 是 Hinton 论文里的经典补偿项，让大 T 下梯度幅度不缩水。
                </div>
              </div>
            </div>
          </div>

          {/* 右：双 slider + 学生预测分布 */}
          <div className="lg:col-span-6">
            <div className="bg-ink text-cream rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="flex items-center gap-2 mb-5">
                <Sliders className="w-4 h-4 text-butter" strokeWidth={2.5} />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter font-bold">
                  student readout
                </span>
              </div>

              {/* α slider */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/55">
                    α · 软 / 硬 比例
                  </span>
                  <span className="font-display text-[24px] font-bold text-butter tabular-nums">
                    {alpha.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-cream/40 mt-1">
                  <span>0 · 只信硬标签</span>
                  <span>1 · 只信老师软标</span>
                </div>
              </div>

              {/* T slider */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/55">
                    T · 蒸馏温度
                  </span>
                  <span className="font-display text-[24px] font-bold text-coral tabular-nums">
                    {T.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={0.1}
                  value={T}
                  onChange={(e) => setT(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer"
                />
              </div>

              {/* 学生预测 5 类柱 */}
              <div className="space-y-1.5 pt-5 border-t border-cream/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/55 mb-2">
                  学生输出（α·teacher + (1−α)·hard）
                </div>
                {studentPred.map((p, i) => {
                  const isLabel = i === HARD_INDEX;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-10 shrink-0 font-display text-[12px] text-cream/85">
                        {CLASSES[i]}
                      </div>
                      <div className="flex-1 h-5 bg-cream/8 rounded-md overflow-hidden border border-cream/15">
                        <div
                          className={[
                            "h-full transition-all duration-400 ease-spring",
                            isLabel ? "bg-butter" : "bg-coral",
                          ].join(" ")}
                          style={{ width: `${Math.max(p * 100, 0.3)}%` }}
                        />
                      </div>
                      <div className="w-12 text-right font-mono text-[10.5px] text-cream/75 tabular-nums">
                        {(p * 100).toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 双指标 */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="px-3 py-2.5 bg-cream/8 rounded-lg border border-cream/15">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/55 mb-0.5">
                    Top-1 命中
                  </div>
                  <div className="font-display text-[18px] font-bold tabular-nums">
                    {hitsHard ? (
                      <span className="text-butter">✓ 金毛</span>
                    ) : (
                      <span className="text-coral">✗ {CLASSES[top1]}</span>
                    )}
                  </div>
                </div>
                <div className="px-3 py-2.5 bg-cream/8 rounded-lg border border-cream/15">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/55 mb-0.5">
                    与 teacher 相似度
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[18px] font-bold text-butter tabular-nums">
                      {cosSim.toFixed(3)}
                    </span>
                    <span className="font-mono text-[10px] text-cream/45">cos</span>
                  </div>
                </div>
              </div>

              {/* commentary */}
              <div className="mt-5 px-4 py-3 bg-cream/5 border border-cream/10 rounded-xl">
                <p className="text-[13px] text-cream/85 leading-relaxed">
                  {alpha < 0.1
                    ? "α≈0：学生只学硬标签。一只钉子敲到底，next 一道边界样本就懵。"
                    : alpha > 0.9
                      ? "α≈1：学生只学老师暗知识。如果老师本身就错了，学生陪葬。"
                      : alpha > 0.5
                        ? `软标签为主，硬标签兜底。Hinton 推荐 α∈[0.5, 0.9]，T∈[3, 5] —— 你现在 α=${alpha.toFixed(2)}, T=${T.toFixed(1)}。`
                        : "硬标签为主，软标签调味。适合老师质量一般、不能完全信任的场景。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 拉绳子 SVG ─── */
function RopeSvg({ alpha }: { alpha: number }) {
  /* 绳粗 = 2 + 12 * weight ；学生节点位置随 α 偏移 */
  const studentX = 100 + (1 - alpha) * (-25) + alpha * 25; // 偏向更"紧"的那条
  const ropeSoft = 1.5 + alpha * 11;
  const ropeHard = 1.5 + (1 - alpha) * 11;

  return (
    <svg viewBox="0 0 300 180" className="w-full" aria-hidden>
      {/* 左：teacher（圆） */}
      <g transform="translate(40,90)">
        <circle r="32" fill="#F4D35E" stroke="#241C15" strokeWidth="2.4" />
        {/* 装饰：内部小神经元点 */}
        <circle cx="-10" cy="-10" r="2" fill="#241C15" opacity="0.5" />
        <circle cx="6" cy="-12" r="2" fill="#241C15" opacity="0.6" />
        <circle cx="-12" cy="8" r="2" fill="#241C15" opacity="0.4" />
        <circle cx="10" cy="6" r="2" fill="#241C15" opacity="0.55" />
        <circle cx="0" cy="0" r="2.5" fill="#E07A5F" />
        <text
          y="50"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#241C15"
        >
          老师 · 软标签
        </text>
      </g>

      {/* 右：hard label（一个 one-hot 方块） */}
      <g transform="translate(260,90)">
        <rect
          x="-22"
          y="-22"
          width="44"
          height="44"
          rx="6"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="2.4"
        />
        <text
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          [1,0,0,0,0]
        </text>
        <text
          y="50"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#241C15"
        >
          硬标签 · 答案
        </text>
      </g>

      {/* 软绳 · 从 teacher 到 student，粗细 = ropeSoft */}
      <line
        x1={72}
        y1={90}
        x2={studentX - 18}
        y2={90}
        stroke="#E07A5F"
        strokeWidth={ropeSoft}
        strokeLinecap="round"
        className="transition-all duration-300 ease-out"
      />

      {/* 硬绳 · 从 hard 到 student，粗细 = ropeHard */}
      <line
        x1={238}
        y1={90}
        x2={studentX + 18}
        y2={90}
        stroke="#241C15"
        strokeWidth={ropeHard}
        strokeLinecap="round"
        className="transition-all duration-300 ease-out"
      />

      {/* 学生节点（小圆，位置随 α 偏移） */}
      <g
        transform={`translate(${studentX}, 90)`}
        className="transition-transform duration-400 ease-spring"
      >
        <circle
          r="22"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2.4"
        />
        <circle cx="-6" cy="-3" r="1.4" fill="#E07A5F" />
        <circle cx="5" cy="-6" r="1.4" fill="#241C15" opacity="0.6" />
        <circle cx="-3" cy="6" r="1.4" fill="#241C15" opacity="0.4" />
        <text
          y="40"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="12"
          fontWeight="800"
          fill="#241C15"
        >
          学生
        </text>
      </g>

      {/* 标尺：α */}
      <g transform="translate(150,140)">
        <line x1="-50" y1="0" x2="50" y2="0" stroke="#241C15" strokeWidth="1.4" />
        <line x1="-50" y1="-3" x2="-50" y2="3" stroke="#241C15" strokeWidth="1.4" />
        <line x1="50" y1="-3" x2="50" y2="3" stroke="#241C15" strokeWidth="1.4" />
        <circle
          cx={-50 + alpha * 100}
          cy="0"
          r="4"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.5"
          className="transition-all duration-300"
        />
        <text x="-50" y="14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
          α=0
        </text>
        <text x="50" y="14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
          α=1
        </text>
      </g>
    </svg>
  );
}

export default SectionTwoLosses;
