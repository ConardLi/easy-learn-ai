/**
 * SectionRecap · 回顾 + hub 聚合卡（07 · 收尾）
 *
 * 作为实战 hub 站，收尾把四站串成一条线：
 *   训练数据集（这是啥/从哪来）→ 数据清洗（怎么洗）→ 数据标注（怎么打标签）→ 数据集构建（用工具串起来跑）。
 * 三句话回顾 + 四张聚合卡互链。
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
          三句话，记住数据集构建
        </h2>

        <div className="mt-9 space-y-4 max-w-[820px]">
          {[
            "数据集构建就是把一堆现成文档，攒成模型能直接学的「一问一答」，并尽量让机器自动来攒。",
            "用 Easy Dataset 这类工具，六步走完：上传文档 → 分块 → 生成问答 → 打标签 → 清洗评估 → 导出。",
            "导出成 Alpaca、ShareGPT 这类通用格式，就能一键接进微调框架，接着开训。",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-4 card-stamp p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-teal font-display font-extrabold text-cream text-[15px]">
                {i + 1}
              </span>
              <p className="font-sans text-[16.5px] leading-[1.7] text-ink/85 pt-0.5">{t}</p>
            </div>
          ))}
        </div>

        {/* hub 聚合 */}
        <div className="mt-10 bg-butter border-2 border-ink rounded-3xl shadow-stamp-lg p-8">
          <p className="font-display font-extrabold text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.45] text-ink max-w-[820px]">
            这条「数据线」一共四站，连起来就是一份数据集从无到有的全过程：
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink/60">
            <span className="rounded-full border-2 border-ink bg-cream px-3 py-1">训练数据集</span>
            <span>→</span>
            <span className="rounded-full border-2 border-ink bg-cream px-3 py-1">数据清洗</span>
            <span>→</span>
            <span className="rounded-full border-2 border-ink bg-cream px-3 py-1">数据标注</span>
            <span>→</span>
            <span className="rounded-full border-2 border-ink bg-teal text-cream px-3 py-1">数据集构建（你在这）</span>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StampLink
              href="../training-dataset/index.html"
              title="① 训练数据集"
              desc="先搞懂数据集是啥、分哪几类、各从哪儿来。"
              compact
            />
            <StampLink
              href="../data-cleaning/index.html"
              title="② 数据清洗"
              desc="原始料怎么去重、去脏、过滤、统一格式。"
              compact
            />
            <StampLink
              href="../data-annotation/index.html"
              title="③ 数据标注"
              desc="怎么给数据打上标签和「正确答案」。"
              compact
            />
            <StampLink
              href="../finetune/index.html"
              title="④ 接着去微调"
              desc="数据攒好，拿去把通用模型调成你要的样子。"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRecap;
