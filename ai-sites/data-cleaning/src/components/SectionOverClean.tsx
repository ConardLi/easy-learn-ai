/**
 * SectionOverClean · 洗过头的风险（静态对照 + 提醒）
 *
 * 两栏对照：洗得不够 vs 洗过头，中间是「刚刚好」。提醒清洗是个平衡活儿。
 */
import React from "react";
import { AlertTriangle } from "lucide-react";

const SectionOverClean: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Don&apos;t Overdo It</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          洗不够会脏，洗过头会秃
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          清洗不是越狠越好。规则定太松，脏东西漏进去；定太严，连有用的也被一起删掉。
          得在两头之间找平衡。
        </p>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card-stamp p-6 border-coral">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-coral mb-2">洗不够</div>
            <p className="font-sans text-[15px] leading-[1.7] text-ink/85">
              广告、乱码、重复还留着，模型把垃圾一起学进去，越学越歪。
            </p>
          </div>
          <div className="bg-teal text-cream rounded-3xl border-2 border-ink shadow-stamp-lg p-6">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-cream/70 mb-2">刚刚好</div>
            <p className="font-sans text-[15px] leading-[1.7]">
              脏的清掉了，有用的都留着。量虽然少了，但每一条都干净可用。
            </p>
          </div>
          <div className="card-stamp p-6 border-pop">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-pop mb-2">洗过头</div>
            <p className="font-sans text-[15px] leading-[1.7] text-ink/85">
              规则太狠，把一些短而有用的句子、少见但正确的说法也误删了，模型反而见识变窄。
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 bg-butter border-2 border-ink rounded-2xl px-6 py-5 max-w-[820px]">
          <AlertTriangle className="h-5 w-5 shrink-0 text-ink mt-0.5" strokeWidth={2.4} />
          <p className="font-sans text-[15.5px] leading-[1.7] text-ink/85">
            所以清洗完不是就完事了 —— 还得抽样看看删掉的里有没有冤枉的好数据，再回头把规则调松一点。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionOverClean;
