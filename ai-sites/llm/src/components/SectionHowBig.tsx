/**
 * Section 03 · How Big · 它怎么变这么强
 *
 * 反模板：
 *   §02 = 左右双栏 + 顶 pill 切换
 *   §03 = 单轴 slider 拖拽（来自 ModelSizeAnimation）
 *
 * 教学路径：
 *   - 上节看到：ChatGPT 出圈靠的是「再调教一轮」
 *   - 但能调教出来的前提是底子够好 —— 而底子靠三件事：参数 × 数据 × 算力
 *   - 拖滑块对比 BERT (2018) → 2026 顶级模型，看 6 年放大了多少倍
 */
import React from "react";
import ModelSizeAnimation from "./Animations/ModelSizeAnimation";

const SectionHowBig: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* 段头 */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <div className="section-anchor">
              <span className="section-anchor-num">03</span>
              <span className="section-anchor-label">怎么变这么强</span>
            </div>
            <h2 className="font-display text-display-lg text-ink mb-5">
              它为什么
              <span className="relative inline-block">
                <span className="relative z-10">越来越聪明</span>
                <span
                  className="absolute left-0 right-0 bottom-1 h-3.5 lg:h-5 bg-butter -z-0"
                  aria-hidden
                />
              </span>
              ？
              <br />
              靠这三样一起堆上去
            </h2>

            <div className="space-y-3 font-sans text-[15px] text-ink/75 leading-relaxed">
              <p>
                还记得上一节说的
                <strong className="text-ink">"接龙"</strong> 吗？
                它能把话接得越来越像样，靠的是下面这三样一起往上加：
              </p>

              <ul className="space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-butter border border-ink" />
                  <span>
                    <strong className="text-ink">读得多</strong> ——
                    训练时给它看的文字。从 30 亿字（GPT-2）到 15 万亿字（Llama
                    3.1）。
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-coral border border-ink" />
                  <span>
                    <strong className="text-ink">脑子大</strong> ——
                    模型自己有多少个"可调旋钮"（行话叫参数）。从 1.1
                    亿（BERT）涨到几千亿、上万亿。
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal border border-ink" />
                  <span>
                    <strong className="text-ink">算得久</strong> ——
                    训练这一轮要烧多少电。一次训练几千张顶级显卡跑几个月，电费几百上千万美元。
                  </span>
                </li>
              </ul>

              <p>
                右侧这条 slider，从 2018 年的 BERT 一路拖到 2026
                年最强的几款。看每一档的脑子比上一档大多少 —— 注意纵轴是
                <span className="font-mono font-bold text-coral"> 对数 </span>
                的，每往上一格就是 10 倍。
              </p>
            </div>

            <p className="mt-6 font-serif italic text-[13.5px] text-ink/55 leading-relaxed">
              —— 大到一定程度，会冒出一些训练时根本没教过它的本事。下一节就讲这个怪事。
            </p>
          </div>

          {/* 右：ModelSize Slider */}
          <div className="lg:col-span-7">
            <ModelSizeAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHowBig;
