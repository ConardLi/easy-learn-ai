/**
 * SectionRecap · 常见误区 + 一句话回顾（收尾）
 *
 * 静态卡片阵列（误区 → 实情），加一张总览邮戳卡链回三关。
 */
import React from "react";
import { X, Check } from "lucide-react";
import StampLink from "./StampLink";

const MYTHS = [
  {
    myth: "数据越多模型越强",
    truth: "掺脏数据反而拖后腿。干净、覆盖全，比单纯堆量重要得多。",
  },
  {
    myth: "数据都长一个样",
    truth: "分预训练语料、指令数据、偏好数据三种，各喂在不同训练阶段。",
  },
  {
    myth: "从网上扒一堆就能直接用",
    truth: "原始数据又脏又乱，得先清洗、标注、打包，才能喂给模型。",
  },
  {
    myth: "数据这事是体力活，不重要",
    truth: "模型能力很大程度由数据决定。数据没整明白，调多少参数都白搭。",
  },
];

const SectionRecap: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Recap</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          离开前，先破四个常见误区
        </h2>

        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MYTHS.map((m) => (
            <div key={m.myth} className="card-stamp p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-coral">
                  <X className="h-3.5 w-3.5 text-cream" strokeWidth={3} />
                </span>
                <span className="font-display font-bold text-[16px] text-ink/55 line-through">
                  {m.myth}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-teal">
                  <Check className="h-3.5 w-3.5 text-cream" strokeWidth={3} />
                </span>
                <span className="font-sans text-[15.5px] leading-[1.7] text-ink/85">{m.truth}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-butter border-2 border-ink rounded-3xl shadow-stamp-lg p-8">
          <p className="font-display font-extrabold text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1.4] text-ink max-w-[820px]">
            一句话记住：训练数据集就是喂给模型学习的那批材料；
            它好不好、干不干净，直接决定模型聪不聪明。
          </p>
          <p className="mt-4 font-sans text-[16px] leading-[1.75] text-ink/75 max-w-[720px]">
            想再往下挖一层，就顺着流水线的三关继续看 ——
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StampLink
              href="../data-cleaning/index.html"
              title="数据清洗"
              desc="怎么去重、去脏、过滤低质。"
              compact
            />
            <StampLink
              href="../data-annotation/index.html"
              title="数据标注"
              desc="怎么给数据加标签和答案。"
              compact
            />
            <StampLink
              href="../dataset-construction/index.html"
              title="数据集构建"
              desc="用工具把全流程自动跑通。"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRecap;
