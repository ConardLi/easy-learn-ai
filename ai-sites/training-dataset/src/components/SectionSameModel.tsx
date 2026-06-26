/**
 * SectionSameModel · 同一个模型，喂不同材料会变两个样
 *
 * 交互（L2 pill 切换两份训练材料 → 同一道题两种回答对比）：
 *   切「只喂网络段子」/「喂了医学教科书」，看同一道医学问题的回答天差地别。
 *   引出动机：模型能力直接由它读过的材料决定。
 */
import React, { useState } from "react";

type DietKey = "junk" | "medical";

const DIETS: Record<
  DietKey,
  { label: string; sub: string; tone: string; answer: string; verdict: string; good: boolean }
> = {
  junk: {
    label: "只喂网络闲聊和段子",
    sub: "随手抓来的杂乱文字",
    tone: "bg-coral text-cream",
    answer:
      "哎哟这个我不太懂诶，你多喝热水休息一下应该就好啦～实在不行就去医院看看咯！",
    verdict: "学了一堆口水话，碰到正经问题只会打哈哈。",
    good: false,
  },
  medical: {
    label: "喂了规范的医学教科书",
    sub: "挑过、覆盖全、表述准确",
    tone: "bg-teal text-cream",
    answer:
      "持续低烧加咳嗽超过两周，需要排查肺部感染。建议尽快拍胸片、查血常规，先别自行用药，由医生判断。",
    verdict: "答得有条理、给得出下一步，因为它读过正经的医学材料。",
    good: true,
  },
};

const SectionSameModel: React.FC = () => {
  const [diet, setDiet] = useState<DietKey>("junk");
  const d = DIETS[diet];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Same Brain, Different Diet</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          一样的脑子，喂不同的料，
          <br />
          会变成两个模型
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          这里有两个一模一样的模型，结构、参数量、训练方式全相同。
          唯一的差别是：它们读的材料不一样。给它们出
          <span className="font-bold text-ink">同一道医学问题</span>，看回答差多少。
        </p>

        {/* 切换 */}
        <div className="mt-9 flex flex-wrap gap-3">
          {(Object.keys(DIETS) as DietKey[]).map((k) => {
            const on = k === diet;
            return (
              <button
                key={k}
                onClick={() => setDiet(k)}
                className={[
                  "px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-all duration-250 ease-spring text-left",
                  on
                    ? "bg-ink text-cream shadow-stamp -translate-y-0.5"
                    : "bg-cream text-ink/60 hover:text-ink",
                ].join(" ")}
              >
                {DIETS[k].label}
              </button>
            );
          })}
        </div>

        {/* 同题问答 */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4">
            <div className="card-stamp p-6 h-full">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                用户问
              </div>
              <p className="font-display font-bold text-[17px] leading-[1.55] text-ink">
                「我连续低烧 + 咳嗽两周了，该怎么办？」
              </p>
              <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/20">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-1.5">
                  这个模型读的材料
                </div>
                <div
                  className={["inline-block rounded-full px-3 py-1 font-bold text-[13px]", d.tone].join(
                    " ",
                  )}
                >
                  {d.label}
                </div>
                <p className="mt-2 font-sans text-[13px] text-ink/60">{d.sub}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">
                模型答
              </div>
              <p
                key={diet}
                className="font-sans text-[17px] leading-[1.8] text-ink animate-enter-fade flex-1"
              >
                {d.answer}
              </p>
              <div
                className={[
                  "mt-5 rounded-2xl px-5 py-4 border-2",
                  d.good ? "border-teal bg-teal/10" : "border-coral bg-coral/10",
                ].join(" ")}
              >
                <span className="font-display font-bold text-[15px] text-ink">{d.verdict}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 font-serif italic text-[16px] text-ink/70 max-w-[760px]">
          同样的脑子，材料一换，答出来的东西就不是一个水平。
          所以「这个模型行不行」，往前追一步，问的其实是「它读的训练数据集行不行」。
        </p>
      </div>
    </section>
  );
};

export default SectionSameModel;
