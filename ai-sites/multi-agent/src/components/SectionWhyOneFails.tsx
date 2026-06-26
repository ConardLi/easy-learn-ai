/**
 * SectionWhyOneFails · 一个 AI 干所有事，会怎么翻车
 *
 * 交互（L3）：slider 调「任务有几个环节」→ 实时看单 Agent 的出错率/跑偏率爬升 + 分工版对照
 * 数据为站内公式模拟，标「示意」。
 */
import React, { useState } from "react";

const SectionWhyOneFails: React.FC = () => {
  const [steps, setSteps] = useState(6);

  // 示意公式：单 Agent 出错率随环节数指数式逼近上限；分工版增长缓慢
  const soloRisk = Math.round((1 - Math.pow(0.82, steps)) * 100);
  const splitRisk = Math.round((1 - Math.pow(0.965, steps)) * 100);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">One Agent, All Jobs</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          一个 AI 把活全包了，会怎么样？
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[680px]">
          任务环节一多，单个 AI 又要查、又要写、又要回头检查，
          前面定的事到后面就忘了，越往后越容易跑偏。拖动下面的滑块，看环节数变多时出岔子的概率怎么变。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左：滑块 + 数字 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55">
                  任务有几个环节
                </span>
                <span className="font-display font-extrabold text-[28px] text-ink">{steps}</span>
              </div>
              <input
                type="range"
                min={1}
                max={16}
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-ink/40 mt-1">
                <span>简单</span>
                <span>很复杂</span>
              </div>

              <div className="mt-6 space-y-4">
                <RiskBar label="一个 AI 全包" value={soloRisk} color="#E07A5F" />
                <RiskBar label="分工给几个 AI" value={splitRisk} color="#1B4B5A" />
              </div>

              <p className="mt-5 font-mono text-[10px] text-ink/45 leading-relaxed">
                示意曲线，帮你感受趋势，不是精确统计。
              </p>
            </div>
          </div>

          {/* 右：解读 */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
              <div className="font-display font-bold text-[18px] text-ink mb-2">
                环节越多，单个 AI 越吃力
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-ink/75">
                它得同时记住：原始需求是啥、查到过哪些资料、上一步写了什么、还差哪几步。
                这些全挤在同一段对话里，越堆越满，注意力被摊薄，开始答非所问。
                {steps >= 10 && (
                  <span className="font-bold text-coral"> 你现在拖到了 {steps} 个环节，单包版基本已经稳不住了。</span>
                )}
              </p>
            </div>
            <div className="bg-teal/8 border-2 border-teal rounded-2xl p-5">
              <div className="font-display font-bold text-[18px] text-teal mb-2">
                分工后，每个 AI 只盯自己那摊
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-ink/75">
                拆任务的只管拆、动手的只管动手、挑错的只管挑错。
                每个 AI 眼前要装的东西少了一大半，出岔子的概率自然压得住。
                下一节就来看这几摊具体分给谁。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RiskBar: React.FC<{ label: string; value: number; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div>
    <div className="flex items-baseline justify-between mb-1.5">
      <span className="font-sans text-[14px] font-semibold text-ink">{label}</span>
      <span className="font-mono text-[15px] font-bold" style={{ color }}>
        出岔概率 {value}%
      </span>
    </div>
    <div className="h-4 bg-cream border-2 border-ink rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-300 ease-spring"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

export default SectionWhyOneFails;
