import React from "react";
import { StampLink } from "./common";

const SectionNeighborLinks: React.FC = () => (
  <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-6xl">
      <div className="section-anchor"><span className="section-anchor-num">07</span><span className="section-anchor-label">keep going</span></div>
      <h2 className="mb-5 max-w-3xl font-display text-display-lg">编码解决“怎么变成数字”，<br />接下来要看数字怎样表达含义。</h2>
      <p className="mb-8 max-w-2xl text-[15.5px] leading-relaxed text-ink/70">同一张图可以被编码成很多片段，也可以汇总成一个位置。接下来可以了解这些数字怎样表达含义、参与多模态任务，以及进入 Transformer 后怎样计算。</p>
      <div className="grid gap-4 md:grid-cols-3">
        <StampLink href="../representation-space/index.html" title="《表示空间》" desc="这些数字为什么能用远近和方向表达含义。" tone="butter" />
        <StampLink href="../multimodality/index.html" title="《多模态》" desc="图片、声音和文字怎样进入同一个模型完成任务。" />
        <StampLink href="../transformer/index.html" title="《Transformer》" desc="编码后的片段进入模型后，怎样互相参考并继续计算。" />
      </div>
    </div>
  </section>
);

export default SectionNeighborLinks;
