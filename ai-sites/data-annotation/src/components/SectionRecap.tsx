/**
 * SectionRecap · 回顾 + 链到数据集构建（收尾）
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
          三句话，记住数据标注
        </h2>

        <div className="mt-9 space-y-4 max-w-[820px]">
          {[
            "标注就是给数据贴上「正确答案 / 标签」，模型才知道照着什么方向学。",
            "标注分指令、偏好、评估三种，分别喂给监督微调、偏好对齐和模型评估。",
            "现在多是「机器先标、人来审」，再用多人交叉、抽检等办法保证标得准。",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-4 card-stamp p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-pop font-display font-extrabold text-cream text-[15px]">
                {i + 1}
              </span>
              <p className="font-sans text-[16.5px] leading-[1.7] text-ink/85 pt-0.5">{t}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-butter border-2 border-ink rounded-3xl shadow-stamp-lg p-8">
          <p className="font-display font-extrabold text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.45] text-ink max-w-[820px]">
            标注是把数据「变得能学」的关键一步。下一步，看看这些标好的数据
            怎么被工具自动地批量生产出来。
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StampLink
              href="../dataset-construction/index.html"
              title="数据集构建"
              desc="用 Easy Dataset 把标注也自动化，批量造数据。"
              compact
            />
            <StampLink
              href="../training-dataset/index.html"
              title="训练数据集"
              desc="回看数据分哪几类、从哪来、整条流水线长啥样。"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRecap;
