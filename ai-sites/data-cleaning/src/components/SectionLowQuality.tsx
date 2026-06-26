/**
 * SectionLowQuality · 怎么判断「低质」（L3 调阈值 → 留存率 + 样本去留实时变）
 *
 * 交互：拖「最短长度」滑杆，下面一组样本实时被判「留 / 删」，顶部留存率跟着变。
 * 要点：低质过滤靠的是一条条可量化的规则，不是凭感觉。
 */
import React, { useMemo, useState } from "react";

const SAMPLES = [
  { t: "好。", len: 1 },
  { t: "这个产品我用了三个月，续航明显比上一代强。", len: 21 },
  { t: "哈哈哈哈哈哈哈哈哈", len: 9 },
  { t: "退货流程：先在订单页申请，填写原因，等审核通过后寄回即可。", len: 27 },
  { t: "asdkjfh???", len: 10 },
  { t: "今天天气不错，适合出门散步，顺便买点菜。", len: 19 },
];

const SectionLowQuality: React.FC = () => {
  const [minLen, setMinLen] = useState(12);

  const kept = useMemo(() => SAMPLES.filter((s) => s.len >= minLen).length, [minLen]);
  const rate = Math.round((kept / SAMPLES.length) * 100);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Filter The Junk</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          「低质」不是凭感觉，是定规则
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          判断一条数据好不好，靠的是一条条能算的规则：太短的、重复字符太多的、不成句的，都算低质。
          这里用最简单的一条 ——
          <span className="font-bold text-ink">「至少要有多少个字」</span>。拖滑杆试试。
        </p>

        <div className="mt-9 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  最短长度门槛
                </span>
                <span className="font-display font-extrabold text-[28px] text-teal leading-none">
                  {minLen}
                  <span className="font-mono text-[13px] text-ink/55 ml-0.5">字</span>
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={minLen}
                onChange={(e) => setMinLen(Number(e.target.value))}
                className="w-full accent-teal"
                aria-label="最短长度门槛"
              />
              <div className="mt-6 text-center">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-1">
                  留存率
                </div>
                <div className="font-display font-extrabold text-[44px] leading-none text-ink">
                  {rate}
                  <span className="font-mono text-[15px] text-ink/45 ml-1">%</span>
                </div>
              </div>
              <p className="mt-auto pt-5 font-sans text-[14px] leading-[1.65] text-ink/70">
                门槛越高，留下的越少越精，但也可能误删掉一些其实有用的短句 —— 度要拿捏。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/45 mb-3">
                样本去留（实时）
              </div>
              <div className="space-y-2.5">
                {SAMPLES.map((s, i) => {
                  const keep = s.len >= minLen;
                  return (
                    <div
                      key={i}
                      className={[
                        "flex items-center gap-3 rounded-xl border-2 border-ink px-4 py-3 transition-all duration-300",
                        keep ? "bg-white" : "bg-cream/50 opacity-55",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "shrink-0 rounded-full border-2 border-ink px-2.5 py-0.5 font-bold text-[11px]",
                          keep ? "bg-teal text-cream" : "bg-coral text-cream",
                        ].join(" ")}
                      >
                        {keep ? "留" : "删"}
                      </span>
                      <span className={["font-sans text-[14.5px] leading-[1.5]", keep ? "text-ink" : "text-ink/55 line-through"].join(" ")}>
                        {s.t}
                      </span>
                      <span className="ml-auto shrink-0 font-mono text-[11px] text-ink/40">{s.len}字</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLowQuality;
