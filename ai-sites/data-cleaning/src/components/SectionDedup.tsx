/**
 * SectionDedup · 去重为什么最关键（L3 开关对比）
 *
 * 交互：一个「去重」开关，左侧料堆里重复项被折叠，右侧模型表现卡随之翻面。
 * 要点：重复数据让模型「死记硬背」，去重后反而更好（Llama 2 的真实例子）。
 */
import React, { useState } from "react";

const RAW = [
  { t: "鲸鱼是哺乳动物。", dup: false },
  { t: "鲸鱼是哺乳动物。", dup: true },
  { t: "鲸鱼是哺乳动物。", dup: true },
  { t: "企鹅生活在南极。", dup: false },
  { t: "鲸鱼是哺乳动物。", dup: true },
  { t: "蜜蜂靠舞蹈传递信息。", dup: false },
];

const SectionDedup: React.FC = () => {
  const [dedup, setDedup] = useState(false);
  const shown = dedup ? RAW.filter((r) => !r.dup) : RAW;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Dedup First</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          五步里，去重最值得先做
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          同一句话在数据里出现一百遍，模型就会把它背得死死的，反而记不住其他东西。
          打开去重开关，看重复的句子被折叠后会怎样。
        </p>

        <div className="mt-9 flex items-center gap-4">
          <button
            onClick={() => setDedup((v) => !v)}
            className={[
              "relative h-10 w-[88px] rounded-full border-2 border-ink transition-colors duration-300",
              dedup ? "bg-teal" : "bg-cream",
            ].join(" ")}
            aria-label="切换去重"
          >
            <span
              className={[
                "absolute top-1/2 -translate-y-1/2 h-7 w-7 rounded-full border-2 border-ink bg-white transition-all duration-300 ease-spring",
                dedup ? "left-[52px]" : "left-1",
              ].join(" ")}
            />
          </button>
          <span className="font-display font-bold text-[16px] text-ink">
            {dedup ? "已去重" : "未去重"}
          </span>
        </div>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7">
            <div className="card-stamp p-6">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/45 mb-3">
                数据堆（{shown.length} 条）
              </div>
              <div className="space-y-2">
                {RAW.map((r, i) => {
                  const hidden = dedup && r.dup;
                  return (
                    <div
                      key={i}
                      className={[
                        "rounded-xl border-2 border-ink px-4 py-2.5 font-mono text-[13.5px] transition-all duration-300",
                        hidden
                          ? "opacity-0 max-h-0 py-0 border-0 overflow-hidden"
                          : r.dup
                            ? "bg-butter/40 text-ink"
                            : "bg-white text-ink",
                      ].join(" ")}
                    >
                      {r.t}
                      {!dedup && r.dup && (
                        <span className="ml-2 font-bold text-[11px] text-coral">← 重复</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className={[
                "rounded-3xl border-2 p-6 h-full flex flex-col justify-center transition-colors duration-300",
                dedup ? "border-teal bg-teal/10" : "border-coral bg-coral/10",
              ].join(" ")}
            >
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                模型学出来的效果
              </div>
              <p key={String(dedup)} className="font-display font-bold text-[18px] leading-[1.55] text-ink animate-enter-fade">
                {dedup
                  ? "数据更均衡，模型见过更多不同的句子，学得更全面。"
                  : "「鲸鱼是哺乳动物」被背了太多遍，模型对它过分熟悉，挤占了学别的内容的精力。"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-ink text-cream rounded-2xl px-6 py-5 max-w-[820px]">
          <p className="font-display font-bold text-[17px] leading-[1.6]">
            Meta 训练 Llama 2 时发现：去掉重复数据后，虽然总量变少了，模型反而学得更好。
            干净比量大更要紧。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionDedup;
