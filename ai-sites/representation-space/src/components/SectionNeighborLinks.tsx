import React from "react";
import { StampLink } from "./common";

const SectionNeighborLinks: React.FC = () => (
  <section className="bg-butter-soft px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-6xl">
      <div className="section-anchor"><span className="section-anchor-num">08</span><span className="section-anchor-label">keep going</span></div>
      <h2 className="mb-5 max-w-3xl font-display text-display-lg">位置说明内容在哪里，<br />方向说明它会怎样变化。</h2>
      <p className="mb-8 max-w-2xl text-[15.5px] leading-relaxed text-ink/70">表示空间讲的是这些数字位置共有的规律。具体到搜索、图片和模型计算时，还需要看数字怎样被制造、保存和使用。</p>
      <div className="grid gap-4 md:grid-cols-3">
        <StampLink href="../modality-encoding/index.html" title="《模态编码》" desc="图片和声音怎样先变成可以放进空间的数字。" tone="butter" />
        <StampLink href="../embedding/index.html" title="《Embedding》" desc="怎样把内容变成可存取的向量，并按距离搜索。" />
        <StampLink href="../multimodality/index.html" title="《多模态》" desc="共同空间怎样帮助图片、文字和声音一起完成任务。" />
      </div>
    </div>
  </section>
);

export default SectionNeighborLinks;
