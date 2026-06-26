/**
 * SectionQuality · 为什么质量比数量重要（L3 slider → 示意曲线 + 结论翻面）
 *
 * 交互：拖「脏数据占比」滑杆，看模型最终表现示意曲线下滑 + 结论卡随区间翻。
 *   要点：堆量不等于堆能力，掺进脏数据反而把学到的好东西冲淡。
 */
import React, { useMemo, useState } from "react";

const SectionQuality: React.FC = () => {
  const [dirty, setDirty] = useState(15); // 脏数据占比 %

  // 示意：表现 ≈ 100 - 脏占比的非线性惩罚（脏越多掉越快）
  const score = useMemo(() => {
    const d = dirty / 100;
    return Math.max(8, Math.round(100 - 120 * d * (0.5 + d)));
  }, [dirty]);

  const zone = useMemo(() => {
    if (dirty <= 10)
      return { tone: "border-teal bg-teal/10", text: "材料干净，模型学得扎实 —— 这是花大力气清洗换来的。" };
    if (dirty <= 35)
      return { tone: "border-butter-deep bg-butter/30", text: "掺了些脏数据，模型开始学到错的东西，表现往下走。" };
    return {
      tone: "border-coral bg-coral/10",
      text: "脏数据太多了：量是上去了，可学到的好东西被一堆垃圾冲淡，越喂越歪。",
    };
  }, [dirty]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Quality &gt; Quantity</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          为什么「数据多」不等于「模型强」
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          很多人以为喂的数据越多模型越牛。其实掺进去的脏数据会把好东西冲淡 ——
          就像一锅好汤里滴了几滴脏水。拖动滑杆，调
          <span className="font-bold text-ink">脏数据的占比</span>，看模型表现怎么变。
        </p>

        <div className="mt-9 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 控制 + 曲线 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  脏数据占比
                </span>
                <span className="font-display font-extrabold text-[28px] text-coral leading-none">
                  {dirty}
                  <span className="font-mono text-[13px] text-ink/55 ml-0.5">%</span>
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={70}
                step={1}
                value={dirty}
                onChange={(e) => setDirty(Number(e.target.value))}
                className="w-full accent-coral"
                aria-label="脏数据占比"
              />

              {/* 示意曲线 */}
              <div className="mt-6 relative bg-cream border-2 border-ink rounded-2xl p-4">
                <svg viewBox="0 0 320 150" className="w-full h-auto">
                  <line x1="20" y1="120" x2="310" y2="120" stroke="#241C15" strokeWidth="2" />
                  <line x1="20" y1="10" x2="20" y2="120" stroke="#241C15" strokeWidth="2" />
                  {/* 曲线：脏占比 0→70 映射到 x，表现映射到 y */}
                  <path
                    d="M20,22 Q120,30 180,58 T310,118"
                    fill="none"
                    stroke="#1B4B5A"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    opacity="0.4"
                  />
                  {/* 当前点 */}
                  <circle
                    cx={20 + (dirty / 70) * 290}
                    cy={130 - score * 1.1}
                    r="7"
                    fill="#FF4D74"
                    stroke="#241C15"
                    strokeWidth="2.5"
                  />
                  <text x="26" y="20" className="font-mono" fontSize="9" fill="#88837C">
                    模型表现
                  </text>
                  <text x="250" y="135" className="font-mono" fontSize="9" fill="#88837C">
                    脏数据更多 →
                  </text>
                </svg>
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/40 leading-relaxed">
                示意曲线，帮你感受趋势，不是精确统计。
              </p>
            </div>
          </div>

          {/* 表现读数 + 结论 */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="card-stamp p-6 text-center">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                模型最终表现（示意）
              </div>
              <div className="font-display font-extrabold text-[56px] leading-none text-ink">
                {score}
                <span className="font-mono text-[18px] text-ink/45 ml-1">分</span>
              </div>
            </div>
            <div className={["rounded-2xl border-2 px-6 py-5 flex-1 flex items-center", zone.tone].join(" ")}>
              <p className="font-display font-bold text-[16px] leading-[1.6] text-ink">{zone.text}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-ink text-cream rounded-2xl px-6 py-5 max-w-[820px]">
          <p className="font-display font-bold text-[17px] leading-[1.6]">
            训练 Llama 2 时，Meta 把重复数据去掉后，数据量小了一截，模型反倒更好。
            少而干净，常常赢过多而脏。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionQuality;
