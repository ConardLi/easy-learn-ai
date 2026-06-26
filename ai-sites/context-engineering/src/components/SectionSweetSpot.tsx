/**
 * SectionSweetSpot · 塞太多 / 塞太少都不行
 *
 * 交互（L3）：slider 调「往窗口里塞的信息量」→ 实时看「有用信息占比」和「回答质量」的甜点区
 * 数据为站内公式模拟，标「示意」。引用 Anthropic「context rot / 注意力预算」概念。
 */
import React, { useState } from "react";

const SectionSweetSpot: React.FC = () => {
  const [amount, setAmount] = useState(45); // 0-100 塞进去的信息量

  // 示意公式：
  // 太少 → 缺料，质量低；太多 → 噪声稀释重点 + 注意力被摊薄，质量也掉。中间有甜点。
  const a = amount / 100;
  const coverage = 1 - Math.exp(-a * 4); // 信息覆盖度：越多越全，但边际递减
  const focus = Math.exp(-Math.pow(Math.max(0, a - 0.35) * 2.1, 2)); // 注意力集中度：太多会掉
  const quality = Math.round(coverage * focus * 100 * 1.35);
  const clamped = Math.max(4, Math.min(100, quality));

  const zone =
    amount < 22 ? "too-little" : amount > 68 ? "too-much" : "sweet";

  const ZONE_TEXT = {
    "too-little": {
      title: "塞太少：缺料瞎编",
      color: "#FF4D74",
      desc: "给的信息不够，AI 不知道关键细节，只能靠猜 —— 答案听着顺，其实是编的。",
    },
    sweet: {
      title: "甜点区：刚刚好",
      color: "#1B4B5A",
      desc: "该给的都给了，没用的挡在外面。AI 抓得住重点，答得又准又稳。",
    },
    "too-much": {
      title: "塞太多：抓不住重点",
      color: "#E07A5F",
      desc: "什么都往里堆，有用的被淹没。AI 的注意力被一堆无关内容摊薄，开始走神、漏看关键。",
    },
  }[zone];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">The Sweet Spot</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          多塞点不就更稳了？其实不一定
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          很多人第一反应：把所有资料都喂进去最保险。其实塞太多和塞太少一样糟。
          拖动滑块，看回答质量怎么在中间冒尖、两头都往下掉。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="card-stamp p-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55">
                  往窗口里塞多少信息
                </span>
                <span className="font-display font-extrabold text-[24px] text-ink">{amount}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-ink/40 mt-1">
                <span>几乎不给</span>
                <span>全塞进去</span>
              </div>

              {/* 质量条 */}
              <div className="mt-7">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="font-sans text-[14px] font-semibold text-ink">回答质量</span>
                  <span
                    className="font-mono text-[15px] font-bold"
                    style={{ color: ZONE_TEXT.color }}
                  >
                    {clamped}%
                  </span>
                </div>
                <div className="h-5 bg-cream border-2 border-ink rounded-full overflow-hidden relative">
                  {/* 甜点区底纹 */}
                  <div
                    className="absolute inset-y-0 bg-teal/15"
                    style={{ left: "22%", width: "46%" }}
                  />
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-spring relative z-10"
                    style={{ width: `${clamped}%`, backgroundColor: ZONE_TEXT.color }}
                  />
                </div>
                <div className="font-mono text-[10px] text-ink/40 mt-1.5">
                  浅色区 = 甜点区（信息量适中）
                </div>
              </div>

              <p className="mt-5 font-mono text-[10px] text-ink/45 leading-relaxed">
                示意曲线，帮你感受趋势，不是精确统计。
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="border-2 border-ink rounded-3xl shadow-stamp p-6 transition-colors duration-300 h-full"
              style={{ backgroundColor: `${ZONE_TEXT.color}14` }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full border-2 border-ink font-display font-extrabold text-[15px] mb-4"
                style={{
                  backgroundColor: ZONE_TEXT.color,
                  color: ZONE_TEXT.color === "#F4D35E" ? "#241C15" : "#FBEFE3",
                }}
              >
                {ZONE_TEXT.title}
              </div>
              <p className="font-sans text-[15.5px] leading-[1.75] text-ink/80">
                {ZONE_TEXT.desc}
              </p>

              <div className="mt-5 pt-5 border-t-2 border-dashed border-ink/20">
                <p className="font-sans text-[13.5px] leading-[1.7] text-ink/65">
                  研究里管「塞太多反而变差」这事叫{" "}
                  <span className="font-bold text-ink">context rot（上下文腐化）</span> ——
                  内容越长，AI 越容易看漏其中的关键。
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 font-sans text-[15px] leading-[1.7] text-ink/65 max-w-[700px]">
          所以目标很明确：找到那一小撮最该给的高价值信息。Anthropic 的说法是 ——
          找出能让 AI 答对的、最小的那批信息。接下来看具体怎么找。
        </p>
      </div>
    </section>
  );
};

export default SectionSweetSpot;
