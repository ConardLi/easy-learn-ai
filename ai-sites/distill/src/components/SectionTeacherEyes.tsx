/**
 * Section 02 · 老师的眼睛 · 同一道题，4 种暗知识
 *
 * 反模板：跟 quantization 任意 section 都不同。
 *  - 不是 slider（已在 S1）
 *  - 不是 chip 阵列推荐（quantization S03）
 *  - 不是 accordion + sort（quantization S04）
 *
 * 形式：4 个 thumbnail（SVG 抽象动物剪影）+ 一个真实 soft target 横排概率。
 * 用户点不同 input → 看 teacher 输出的"暗知识"如何变。
 * 副交互：「topK 视图」3 档切换，揭示软标签里隐藏的次要类别。
 */
import React, { useMemo, useState } from "react";
import { Eye } from "lucide-react";

type Sample = {
  id: string;
  label: string;
  hint: string; // 一句"为什么有趣"
  /* 该样本在 5 个类别上的真实 logits（编出来的，但配比可信） */
  logits: number[];
  /* SVG 图标渲染器：抽象的"动物剪影"。不放真实图片避免版权 + 风格统一 */
  icon: React.ReactNode;
};

const CLASSES = ["金毛", "狼", "狐狸", "猫", "雪豹"];

const SAMPLES: Sample[] = [
  {
    id: "golden",
    label: "教科书金毛",
    hint: "标准答案。所有老师都不犹豫。",
    logits: [9.5, 1.2, 0.8, 0.3, -0.5],
    icon: <DogIcon variant="golden" />,
  },
  {
    id: "wolfdog",
    label: "像狼的金毛",
    hint: "侧脸长 + 毛色暗。老师有 18% 把握不住。",
    logits: [6.2, 4.5, 3.1, 0.4, 0.2],
    icon: <DogIcon variant="wolfish" />,
  },
  {
    id: "fox",
    label: "毛色诡异的狐狸",
    hint: "耳朵尖、嘴型尖，但毛色像金毛。",
    logits: [3.0, 2.8, 6.5, 0.5, 1.0],
    icon: <FoxIcon />,
  },
  {
    id: "leopard",
    label: "雪地里的雪豹",
    hint: "猫科。但跟家猫的距离没你想的那么远。",
    logits: [-0.3, 1.5, 0.8, 4.2, 6.8],
    icon: <LeopardIcon />,
  },
];

function softmax(logits: number[]) {
  const m = Math.max(...logits);
  const exps = logits.map((z) => Math.exp(z - m));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

const SectionTeacherEyes: React.FC = () => {
  const [activeId, setActiveId] = useState("wolfdog");
  const [topK, setTopK] = useState<1 | 3 | 5>(3);

  const sample = SAMPLES.find((s) => s.id === activeId)!;
  const probs = useMemo(() => softmax(sample.logits), [sample]);
  /* 按概率排名，决定哪些条要"暗化" */
  const rank = useMemo(() => {
    const idx = probs.map((p, i) => ({ p, i })).sort((a, b) => b.p - a.p);
    return idx.map((r) => r.i);
  }, [probs]);

  /* 给一句口语 commentary */
  const top1 = rank[0];
  const top2 = rank[1];
  const margin = probs[top1] - probs[top2];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">teacher's pov</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          老师答的是一张{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">概率地图</span>
          </span>
          ，<br className="hidden lg:block" />
          每个选项{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">都给了几分</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          下面 4 张图，老师对它们的「答案」长得不一样。点一张，看老师把这张图的暗知识藏在哪 ——
          <strong className="text-ink">不只是「最像谁」，还有「跟其它的距离」</strong>。
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：4 张样本（picker） */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
              ① 选输入
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SAMPLES.map((s) => {
                const on = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    className={[
                      "group/sample relative aspect-square rounded-2xl border-2 border-ink overflow-hidden text-left transition-all duration-300 ease-spring",
                      on
                        ? "bg-ink shadow-stamp-lg"
                        : "bg-cream hover:-translate-y-0.5 hover:shadow-stamp",
                    ].join(" ")}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={on ? "text-coral" : "text-ink/85"}>{s.icon}</div>
                    </div>
                    <div
                      className={[
                        "absolute left-2 right-2 bottom-2 px-2 py-1 rounded-md font-mono text-[10px] font-bold",
                        on ? "bg-butter text-ink" : "bg-white text-ink border border-ink/30",
                      ].join(" ")}
                    >
                      {s.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 右：teacher distribution */}
          <div className="lg:col-span-7">
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-ink" strokeWidth={2.4} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ② 老师在想什么
                  </span>
                </div>
                <div className="inline-flex rounded-full border-2 border-ink overflow-hidden">
                  {[1, 3, 5].map((k, i) => (
                    <button
                      key={k}
                      onClick={() => setTopK(k as 1 | 3 | 5)}
                      className={[
                        "px-2.5 py-1 font-mono text-[10px] font-bold transition-all duration-250",
                        i > 0 ? "border-l-2 border-ink" : "",
                        topK === k ? "bg-ink text-cream" : "bg-white text-ink/55",
                      ].join(" ")}
                    >
                      top {k}
                    </button>
                  ))}
                </div>
              </div>

              {/* 当前样本提示 */}
              <div className="mb-5 px-3 py-2 bg-white border-2 border-ink rounded-lg">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[15px] font-bold text-ink">
                    {sample.label}
                  </span>
                  <span className="font-mono text-[10px] text-ink/45">·</span>
                  <span className="text-[12.5px] text-ink/60">{sample.hint}</span>
                </div>
              </div>

              {/* 概率柱（排序后的） */}
              <div className="space-y-2.5" key={sample.id}>
                {rank.map((idx, displayRank) => {
                  const p = probs[idx];
                  const visible = displayRank < topK;
                  const isTop = displayRank === 0;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 transition-opacity duration-300 animate-enter-fade"
                      style={{
                        opacity: visible ? 1 : 0.18,
                        animationDelay: `${displayRank * 60}ms`,
                      }}
                    >
                      <div className="w-12 shrink-0 font-display text-[14px] font-bold text-ink">
                        {CLASSES[idx]}
                      </div>
                      <div className="flex-1 relative h-7 bg-white border-2 border-ink rounded-md overflow-hidden">
                        <div
                          className={[
                            "h-full transition-all duration-500 ease-spring",
                            isTop ? "bg-ink" : "bg-coral",
                          ].join(" ")}
                          style={{ width: `${Math.max(p * 100, 0.3)}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <span
                            className={[
                              "font-mono text-[11px] font-bold tabular-nums",
                              p > 0.45 ? "text-cream" : "text-ink",
                            ].join(" ")}
                            style={{
                              textShadow:
                                p > 0.45 ? "none" : "0 0 4px rgba(251,239,227,0.9)",
                            }}
                          >
                            {(p * 100).toFixed(p < 0.005 ? 2 : 1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* commentary */}
              <div className="mt-6 pt-5 border-t border-ink/10 flex items-start gap-3">
                <div className="shrink-0 w-1 h-12 bg-coral rounded-full" />
                <p className="text-[14px] text-ink/80 leading-relaxed">
                  {margin > 0.7
                    ? `Top-1 是 ${CLASSES[top1]}，比次位 ${CLASSES[top2]} 高 ${(margin * 100).toFixed(0)}pp。这种样本，硬标签和软标签学到的没啥区别 —— 暗知识太薄。`
                    : margin > 0.25
                      ? `老师 ${(probs[top1] * 100).toFixed(0)}% 押 ${CLASSES[top1]}，但留了 ${(probs[top2] * 100).toFixed(0)}% 给 ${CLASSES[top2]}。排第二、第三的那些概率，就是暗知识。`
                      : `老师自己也犹豫：${CLASSES[top1]} ${(probs[top1] * 100).toFixed(0)}% / ${CLASSES[top2]} ${(probs[top2] * 100).toFixed(0)}%。学生看见这种分布，就能学到「这两类长得像」。`}
                </p>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                示意 logits 由真实分类器置信度区间手工设置 · Hinton 称之为「dark knowledge」
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 抽象动物剪影 SVG ─── */

function DogIcon({ variant }: { variant: "golden" | "wolfish" }) {
  const fill = variant === "golden" ? "#E5BD3A" : "#88837C";
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden>
      {/* head */}
      <ellipse cx="46" cy="50" rx="26" ry="22" fill={fill} stroke="currentColor" strokeWidth="2.2" />
      {/* ears */}
      <path d="M 26 38 L 22 18 L 38 32 Z" fill={fill} stroke="currentColor" strokeWidth="2" />
      <path d="M 66 38 L 70 18 L 54 32 Z" fill={fill} stroke="currentColor" strokeWidth="2" />
      {/* eyes */}
      <circle cx="36" cy="48" r="2.6" fill="currentColor" />
      <circle cx="56" cy="48" r="2.6" fill="currentColor" />
      {/* snout */}
      <ellipse cx="46" cy="62" rx="9" ry="7" fill="#FBEFE3" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="46" cy="59" rx="2.5" ry="1.6" fill="currentColor" />
      <line x1="46" y1="61" x2="46" y2="68" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function FoxIcon() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden>
      {/* head triangle-ish */}
      <path
        d="M 18 38 L 46 16 L 74 38 L 64 70 L 28 70 Z"
        fill="#E07A5F"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      {/* ears */}
      <path d="M 22 36 L 26 14 L 36 26 Z" fill="#241C15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 70 36 L 66 14 L 56 26 Z" fill="#241C15" stroke="currentColor" strokeWidth="1.5" />
      {/* white cheeks */}
      <path d="M 28 70 L 46 56 L 64 70 Z" fill="#FBEFE3" stroke="currentColor" strokeWidth="1.6" />
      {/* eyes */}
      <circle cx="38" cy="44" r="2.4" fill="currentColor" />
      <circle cx="54" cy="44" r="2.4" fill="currentColor" />
      {/* nose */}
      <ellipse cx="46" cy="58" rx="2.4" ry="1.8" fill="currentColor" />
    </svg>
  );
}

function LeopardIcon() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden>
      {/* head */}
      <ellipse cx="46" cy="50" rx="28" ry="24" fill="#FEF6D3" stroke="currentColor" strokeWidth="2.2" />
      {/* ears triangles */}
      <path d="M 22 36 L 24 18 L 38 30 Z" fill="#FEF6D3" stroke="currentColor" strokeWidth="2" />
      <path d="M 70 36 L 68 18 L 54 30 Z" fill="#FEF6D3" stroke="currentColor" strokeWidth="2" />
      {/* spots */}
      <circle cx="30" cy="32" r="2.2" fill="currentColor" opacity="0.55" />
      <circle cx="60" cy="32" r="1.8" fill="currentColor" opacity="0.55" />
      <circle cx="22" cy="56" r="2.0" fill="currentColor" opacity="0.55" />
      <circle cx="68" cy="56" r="2.4" fill="currentColor" opacity="0.55" />
      <circle cx="46" cy="28" r="1.6" fill="currentColor" opacity="0.55" />
      {/* eyes */}
      <ellipse cx="36" cy="46" rx="3" ry="4" fill="#1B4B5A" />
      <ellipse cx="56" cy="46" rx="3" ry="4" fill="#1B4B5A" />
      <line x1="36" y1="42" x2="36" y2="50" stroke="currentColor" strokeWidth="1.6" />
      <line x1="56" y1="42" x2="56" y2="50" stroke="currentColor" strokeWidth="1.6" />
      {/* nose */}
      <path d="M 42 60 L 50 60 L 46 65 Z" fill="currentColor" />
    </svg>
  );
}

export default SectionTeacherEyes;
