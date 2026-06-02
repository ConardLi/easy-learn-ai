/**
 * SectionTwoTries · 直接答 vs 先想再答
 *
 * 两个可动元素：
 *   - L2 pill：切「直接答 / 先想再答」，同一道奶茶题看两种输出（聊天气泡）
 *   - L3 slider：拖「这道题要绕几个弯」，看示意双曲线 —— 弯越多，直接答越容易翻车，先想再答更稳
 *
 * 所有题目 / 输出 / 曲线都是示意，已在视觉上标注。
 */
import React, { useState } from "react";
import { Check, X } from "lucide-react";

type Mode = "direct" | "cot";

const SectionTwoTries: React.FC = () => {
  const [mode, setMode] = useState<Mode>("direct");
  const [steps, setSteps] = useState(4);

  // 示意准确率：弯越多，直接答掉得越快；先想再答掉得很慢
  const directAcc = Math.round(94 * Math.pow(0.78, steps - 1));
  const cotAcc = Math.round(95 * Math.pow(0.965, steps - 1));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Two Tries · 两种答法</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          同一道题，
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">直接答常错，先想再答常对</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          下面这道奶茶题要绕两三个弯。
          <span className="font-bold text-ink"> 点上面的按钮切换两种答法</span>，
          看模型给的过程和结果差在哪。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ─── 左：pill 切换 + 输出气泡 ─── */}
          <div className="lg:col-span-7">
            {/* 题目 */}
            <div className="bg-ink text-cream rounded-2xl border-2 border-ink px-5 py-4 shadow-stamp">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-butter mb-1.5">
                你问 · 示意题
              </div>
              <p className="font-sans text-[15px] leading-[1.65]">
                一家店奶茶「买 3 杯送 1 杯」，每杯 15 元。我要凑齐 10 杯，最少花多少钱？
              </p>
            </div>

            {/* pill */}
            <div className="mt-6 inline-flex p-1 bg-white border-2 border-ink rounded-full shadow-stamp">
              <PillBtn active={mode === "direct"} onClick={() => setMode("direct")}>
                直接答
              </PillBtn>
              <PillBtn active={mode === "cot"} onClick={() => setMode("cot")}>
                先想再答
              </PillBtn>
            </div>

            {/* 输出气泡 */}
            <div
              key={mode}
              className="mt-5 rounded-2xl border-2 border-ink bg-white shadow-stamp-lg overflow-hidden animate-enter-fade"
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b-2 border-ink/10 bg-cream">
                <span className="w-6 h-6 rounded-full border-2 border-ink bg-pop flex items-center justify-center font-mono text-[10px] font-bold text-cream">
                  AI
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/60">
                  {mode === "direct" ? "张口就答" : "先写过程，再下结论"}
                </span>
              </div>

              {mode === "direct" ? (
                <div className="px-5 py-5">
                  <p className="font-sans text-[15px] leading-[1.7] text-ink/80">
                    10 杯，每杯 15 元，一共 <span className="font-bold text-ink">150 元</span>。
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-ink bg-pop/15">
                    <X className="w-4 h-4 text-pop" strokeWidth={3} />
                    <span className="font-sans text-[13px] font-bold text-ink">
                      错 · 把「买 3 送 1」忘了
                    </span>
                  </div>
                </div>
              ) : (
                <div className="px-5 py-5">
                  <ol className="space-y-2.5">
                    {[
                      "买 3 杯送 1 杯，意思是每凑满 4 杯，只付 3 杯的钱。",
                      "10 杯里能凑出 2 组「4 杯」（共 8 杯），剩下 2 杯没满一组。",
                      "8 杯走优惠：每组付 3 杯 → 2 组付 6 杯。剩 2 杯原价付。",
                      "一共付 6 + 2 = 8 杯的钱：8 × 15 = 120 元。",
                    ].map((t, i) => (
                      <li key={i} className="flex gap-3 font-sans text-[14px] leading-[1.6] text-ink/85">
                        <span className="flex-shrink-0 w-5 h-5 rounded-md border-2 border-ink bg-[#7A28CB] text-cream font-mono text-[10px] font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-ink bg-butter">
                    <Check className="w-4 h-4 text-ink" strokeWidth={3} />
                    <span className="font-sans text-[13px] font-bold text-ink">
                      对 · 最少 120 元
                    </span>
                  </div>
                </div>
              )}
            </div>
            <p className="font-mono text-[10px] text-ink/45 mt-3">
              输出为示意，帮你感受两种答法的差别
            </p>
          </div>

          {/* ─── 右：难度 slider + 示意曲线 ─── */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-ink bg-white shadow-stamp p-5">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/60 mb-1">
                越绕的题，差距越大
              </div>
              <p className="font-sans text-[13px] text-ink/70 leading-[1.55] mb-4">
                拖一下，看题目要绕的弯越多时，两种答法的做对比例怎么变。
              </p>

              {/* 曲线 */}
              <AccuracyChart steps={steps} />

              {/* 两个读数 */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Gauge label="直接答" value={directAcc} tone="wrong" />
                <Gauge label="先想再答" value={cotAcc} tone="right" />
              </div>

              {/* slider */}
              <div className="mt-5">
                <div className="flex items-center justify-between font-mono text-[10.5px] text-ink/60 mb-1.5">
                  <span>这道题要绕几个弯</span>
                  <span className="font-bold text-ink">{steps} 步</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={steps}
                  onChange={(e) => setSteps(Number(e.target.value))}
                  className="w-full accent-[#7A28CB] cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9.5px] text-ink/40 mt-1">
                  <span>1 步 · 一眼出</span>
                  <span>6 步 · 很绕</span>
                </div>
              </div>

              <p className="font-mono text-[9.5px] text-ink/45 mt-4 leading-relaxed">
                示意曲线，按「步数越多越容易出错」估出来，不是真实统计数字。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── 示意准确率曲线 ── */
const AccuracyChart: React.FC<{ steps: number }> = ({ steps }) => {
  const W = 300;
  const H = 120;
  const padX = 14;
  const padY = 12;
  const xs = [1, 2, 3, 4, 5, 6];
  const x = (n: number) => padX + ((n - 1) / 5) * (W - padX * 2);
  const y = (acc: number) => padY + (1 - acc / 100) * (H - padY * 2);
  const direct = xs.map((n) => 94 * Math.pow(0.78, n - 1));
  const cot = xs.map((n) => 95 * Math.pow(0.965, n - 1));
  const toPath = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i + 1).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* 网格基线 */}
      {[0, 50, 100].map((g) => (
        <line
          key={g}
          x1={padX}
          x2={W - padX}
          y1={y(g)}
          y2={y(g)}
          stroke="#241C15"
          strokeWidth="1"
          opacity="0.12"
        />
      ))}
      {/* 直接答曲线 */}
      <path d={toPath(direct)} fill="none" stroke="#FF4D74" strokeWidth="2.5" strokeLinecap="round" />
      {/* CoT 曲线 */}
      <path d={toPath(cot)} fill="none" stroke="#7A28CB" strokeWidth="2.5" strokeLinecap="round" />
      {/* 当前竖线 */}
      <line
        x1={x(steps)}
        x2={x(steps)}
        y1={padY}
        y2={H - padY}
        stroke="#241C15"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      {/* 当前点 */}
      <circle cx={x(steps)} cy={y(94 * Math.pow(0.78, steps - 1))} r="4.5" fill="#FF4D74" stroke="#241C15" strokeWidth="1.5" />
      <circle cx={x(steps)} cy={y(95 * Math.pow(0.965, steps - 1))} r="4.5" fill="#7A28CB" stroke="#241C15" strokeWidth="1.5" />
    </svg>
  );
};

const Gauge: React.FC<{ label: string; value: number; tone: "right" | "wrong" }> = ({
  label,
  value,
  tone,
}) => (
  <div
    className="rounded-xl border-2 border-ink px-3 py-2.5"
    style={{ backgroundColor: tone === "right" ? "#FEF6D3" : "#FBEFE3" }}
  >
    <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink/55">{label}</div>
    <div className="flex items-baseline gap-1 mt-0.5">
      <span
        className="font-display font-extrabold text-[26px] leading-none"
        style={{ color: tone === "right" ? "#7A28CB" : "#FF4D74" }}
      >
        {value}
      </span>
      <span className="font-mono text-[12px] text-ink/60">%</span>
    </div>
    <div className="font-sans text-[10.5px] text-ink/55 mt-0.5">做对的比例（示意）</div>
  </div>
);

const PillBtn: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({
  active,
  onClick,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-5 py-2 rounded-full font-sans font-bold text-[14px] transition-all duration-250 ease-spring ${
      active ? "bg-ink text-cream shadow-stamp" : "text-ink/70 hover:text-ink"
    }`}
  >
    {children}
  </button>
);

export default SectionTwoTries;
