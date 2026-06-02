/**
 * SectionHowMany · 那给几个最合适？
 *
 * 交互（L3 slider + 示意曲线）：拖示例数 0→8，看两条曲线 ——
 * 「效果」涨得越来越慢（收益递减），「吃掉的 token」却一路直线涨。
 * 第一次出现 token，先一句话说清。曲线标「示意」。
 */
import React, { useState } from "react";
import { Sparkles, ExternalLink, ArrowUpRight } from "lucide-react";

const MAX = 8;
const PLOT = { x0: 42, x1: 300, yTop: 24, yBot: 150 };

const benefit = (n: number) => 1 - Math.pow(0.55, n); // 收益递减
const cost = (n: number) => n / MAX; // token 成本，线性

const xAt = (n: number) => PLOT.x0 + (n / MAX) * (PLOT.x1 - PLOT.x0);
const yAt = (v: number) => PLOT.yBot - v * (PLOT.yBot - PLOT.yTop);

const buildPath = (fn: (n: number) => number) => {
  let d = "";
  for (let n = 0; n <= MAX; n++) {
    d += `${n === 0 ? "M" : "L"} ${xAt(n).toFixed(1)} ${yAt(fn(n)).toFixed(1)} `;
  }
  return d.trim();
};

const SectionHowMany: React.FC = () => {
  const [n, setN] = useState(3);
  const b = benefit(n);
  const c = cost(n);
  // 示意 token：每个例子约 18 token + 任务约 20
  const tokens = 20 + n * 18;

  const verdict =
    n === 0
      ? "一个例子都没有，模型只能靠猜。"
      : n <= 2
      ? "已经好不少了，再加几个还能涨。"
      : n <= 5
      ? "到这儿差不多够用，提升变慢了。"
      : "再加基本看不出变好，token 倒是白花。";

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">给几个最合适</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[700px] leading-[1.1]">
          那给几个最合适？
        </h2>
        <p className="mt-5 font-sans text-[16.5px] leading-[1.75] text-ink/80 max-w-[680px]">
          例子不是越多越好。加头几个，模型进步很明显；加到一定数量再往上堆，
          效果几乎不动了，可你这段话还在变长。
          这里要先说一个词：<span className="font-bold text-ink">token</span> ——
          模型把你的文字切成一小块一小块来数，一块就是一个 token。
          例子越多，prompt 越长，花掉的 token 越多，而很多按用量付费的用法，token 花得越多越贵。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 左：曲线 */}
          <div className="lg:col-span-7">
            <div className="relative border-[3px] border-ink rounded-2xl bg-white shadow-stamp-lg p-5">
              <span className="absolute -top-3 right-5 inline-flex items-center gap-1 px-2.5 py-1 bg-butter border-2 border-ink rounded-full font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-ink shadow-stamp">
                <Sparkles className="w-3 h-3" strokeWidth={2.4} />
                示意曲线
              </span>

              <svg viewBox="0 0 320 180" className="w-full">
                {/* 轴 */}
                <line x1={PLOT.x0} y1={PLOT.yBot} x2={PLOT.x1} y2={PLOT.yBot} stroke="#241C15" strokeWidth="2" />
                <line x1={PLOT.x0} y1={PLOT.yTop} x2={PLOT.x0} y2={PLOT.yBot} stroke="#241C15" strokeWidth="2" />

                {/* token 成本线（直线涨） */}
                <path d={buildPath(cost)} fill="none" stroke="#E07A5F" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
                {/* 效果线（递减饱和） */}
                <path d={buildPath(benefit)} fill="none" stroke="#1B4B5A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* 当前竖线 */}
                <line x1={xAt(n)} y1={PLOT.yTop} x2={xAt(n)} y2={PLOT.yBot} stroke="#241C15" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                {/* 当前点：效果 */}
                <circle cx={xAt(n)} cy={yAt(b)} r="5.5" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
                {/* 当前点：成本 */}
                <circle cx={xAt(n)} cy={yAt(c)} r="5" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />

                {/* x 轴标号 */}
                {Array.from({ length: MAX + 1 }).map((_, i) => (
                  <text key={i} x={xAt(i)} y={PLOT.yBot + 14} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8.5" fill="#88837C">
                    {i}
                  </text>
                ))}
                <text x={(PLOT.x0 + PLOT.x1) / 2} y={176} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C" letterSpacing="1">
                  给的例子个数
                </text>
                {/* 图例 */}
                <g transform="translate(48,30)">
                  <line x1="0" y1="0" x2="16" y2="0" stroke="#1B4B5A" strokeWidth="3" />
                  <text x="20" y="3" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15">效果</text>
                  <line x1="62" y1="0" x2="78" y2="0" stroke="#E07A5F" strokeWidth="2.5" strokeDasharray="4 3" />
                  <text x="82" y="3" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15">token 花费</text>
                </g>
              </svg>

              {/* slider */}
              <div className="mt-3">
                <input
                  type="range"
                  min={0}
                  max={MAX}
                  step={1}
                  value={n}
                  onChange={(e) => setN(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer"
                  aria-label="例子个数"
                />
              </div>
            </div>
          </div>

          {/* 右：读数 + 结论 */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-teal text-cream border-2 border-ink rounded-2xl px-4 py-4 shadow-stamp">
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-butter mb-1">效果（示意）</div>
                <div className="font-display font-extrabold text-[28px] leading-none">{Math.round(b * 100)}%</div>
                <div className="font-mono text-[10px] text-cream/60 mt-1.5">越往后涨得越慢</div>
              </div>
              <div className="bg-coral text-cream border-2 border-ink rounded-2xl px-4 py-4 shadow-stamp">
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-cream/80 mb-1">这段 prompt</div>
                <div className="font-display font-extrabold text-[28px] leading-none">≈{tokens}</div>
                <div className="font-mono text-[10px] text-cream/70 mt-1.5">token，一路直线涨</div>
              </div>
            </div>

            <div className="card-stamp p-4">
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink/55 mb-1.5">
                现在给了 {n} 个
              </div>
              <p className="font-display font-bold text-[16px] text-ink leading-snug">{verdict}</p>
              <p className="mt-2 font-sans text-[13px] text-ink/65 leading-relaxed">
                经验上，分类、抽取这类任务给到 3-5 个就差不多了。任务越绕，可以多给几个；
                但每多一个都在吃这次对话的额度。
              </p>
            </div>

            {/* 互链 context-window：例子吃 token */}
            <a
              href="../context-window/index.html"
              className="block bg-white border-2 border-ink rounded-2xl px-4 py-3.5 shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-butter border-2 border-ink flex items-center justify-center mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
                </span>
                <span className="font-sans text-[13px] leading-[1.6] text-ink/85">
                  <span className="font-bold text-ink">例子堆多了会占满模型的「可视范围」</span>
                  <span className="text-ink/65">，这段空间有多大、怎么被填满 ——</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11.5px] font-bold text-ink ml-1">
                    上下文窗口 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                  </span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHowMany;
