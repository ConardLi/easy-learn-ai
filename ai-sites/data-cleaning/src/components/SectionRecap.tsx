/**
 * SectionRecap · 回顾 + 互链（收尾）
 *
 * 跨线提醒：清洗挡得住「无意的脏」，挡不住「故意投放的坏数据」（数据投毒，安全线 —— 该站尚未建，
 *   仅文字点到，不放断链）。互链回 训练数据集 + 数据集构建。
 */
import React from "react";
import StampLink from "./StampLink";

const SectionRecap: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Recap</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          三句话，记住数据清洗
        </h2>

        <div className="mt-9 space-y-4 max-w-[820px]">
          {[
            "清洗就是把又脏又乱的原始数据挑一遍，扔掉没用的、留下能用的。",
            "标准流程五步：去重、去噪、低质过滤、有害过滤、格式统一，每步靠可量化的规则。",
            "去重最值得先做；清洗也要适度，洗过头会误删有用的好数据。",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-4 card-stamp p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-coral font-display font-extrabold text-cream text-[15px]">
                {i + 1}
              </span>
              <p className="font-sans text-[16.5px] leading-[1.7] text-ink/85 pt-0.5">{t}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-ink text-cream rounded-2xl px-6 py-5 max-w-[820px]">
          <p className="font-display font-bold text-[16.5px] leading-[1.6]">
            注意：清洗能挡住「无意混进来的脏」，但挡不住有人故意往数据里塞坏样本来带歪模型 ——
            那是「数据投毒」，属于安全话题，得用另一套防御办法。
          </p>
        </div>

        <div className="mt-10 bg-butter border-2 border-ink rounded-3xl shadow-stamp-lg p-8">
          <p className="font-display font-extrabold text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.45] text-ink max-w-[820px]">
            洗干净只是半成品。接着还要标注、打包，才能真正喂进训练。
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StampLink
              href="../training-dataset/index.html"
              title="训练数据集"
              desc="回看整条数据流水线：收集 → 清洗 → 标注 → 构建。"
              compact
            />
            <StampLink
              href="../dataset-construction/index.html"
              title="数据集构建"
              desc="用 Easy Dataset 把清洗也自动化地跑起来。"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRecap;
