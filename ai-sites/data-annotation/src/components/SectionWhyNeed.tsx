/**
 * SectionWhyNeed · 没标注，模型学不会「该怎么答」
 *
 * 交互（L2 切换「有/无标注」）：同一批原始句子，无标注时模型一脸懵；
 *   加上标签后，模型能照着学会分类。引出标注的动机。
 * 出站互链：训练数据集（这些原始数据从哪来）。
 */
import React, { useState } from "react";
import StampLink from "./StampLink";

const ITEMS = [
  { text: "终于抢到票了，开心！", label: "正面", tone: "bg-teal" },
  { text: "客服半天不回，气死。", label: "负面", tone: "bg-coral" },
  { text: "明天会议改到下午三点。", label: "中性", tone: "bg-ink" },
];

const SectionWhyNeed: React.FC = () => {
  const [labeled, setLabeled] = useState(false);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Why Bother</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          光有数据没标签，模型只能干瞪眼
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          假设你想教模型「判断一句话是好评还是差评」。下面三句原始数据，
          它们都是从用户评论里收集来的。打开标签开关，看模型能不能学起来。
        </p>

        <div className="mt-9 flex items-center gap-4">
          <button
            onClick={() => setLabeled((v) => !v)}
            className={[
              "relative h-10 w-[88px] rounded-full border-2 border-ink transition-colors duration-300",
              labeled ? "bg-pop" : "bg-cream",
            ].join(" ")}
            aria-label="切换标注"
          >
            <span
              className={[
                "absolute top-1/2 -translate-y-1/2 h-7 w-7 rounded-full border-2 border-ink bg-white transition-all duration-300 ease-spring",
                labeled ? "left-[52px]" : "left-1",
              ].join(" ")}
            />
          </button>
          <span className="font-display font-bold text-[16px] text-ink">
            {labeled ? "已加标注" : "未加标注"}
          </span>
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ITEMS.map((it) => (
            <div key={it.text} className="card-stamp p-5">
              <p className="font-sans text-[15.5px] leading-[1.7] text-ink">{it.text}</p>
              <div className="mt-4 pt-3 border-t-2 border-dashed border-ink/20">
                {labeled ? (
                  <span
                    className={[
                      "inline-block rounded-full border-2 border-ink px-3 py-1 font-bold text-[13px] text-cream animate-enter-pop",
                      it.tone,
                    ].join(" ")}
                  >
                    标签：{it.label}
                  </span>
                ) : (
                  <span className="font-mono text-[12px] text-ink/40">标签：？？？</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className={[
            "mt-7 rounded-2xl border-2 px-6 py-5 max-w-[820px] transition-colors duration-300",
            labeled ? "border-teal bg-teal/10" : "border-coral bg-coral/10",
          ].join(" ")}
        >
          <p className="font-display font-bold text-[16px] leading-[1.6] text-ink">
            {labeled
              ? "有了标签，模型就有了「标准答案」可对照，能学会把新句子也分到对的类里。"
              : "没有标签，模型只看到三句话，根本不知道你想让它学什么 —— 学不起来。"}
          </p>
        </div>

        <div className="mt-8 max-w-xl">
          <StampLink
            href="../training-dataset/index.html"
            title="这些原始数据从哪来？"
            desc="去《轻松理解 训练数据集》，看数据怎么收集、分哪几类。"
            compact
          />
        </div>
      </div>
    </section>
  );
};

export default SectionWhyNeed;
