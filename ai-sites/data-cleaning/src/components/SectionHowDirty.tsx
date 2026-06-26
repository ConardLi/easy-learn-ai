/**
 * SectionHowDirty · 原始网页数据有多脏（L2 hover/点选高亮脏点）
 *
 * 交互：一段真实风格的「原始抓取文本」，点不同的脏类型按钮，文中对应的脏片段高亮。
 * 让用户亲眼看到原始数据里混了多少没用的东西。
 */
import React, { useState } from "react";

type DirtKey = "dup" | "ad" | "garble" | "html" | "toxic";

const LEGEND: Record<DirtKey, { label: string; color: string }> = {
  html: { label: "网页标签", color: "#1B4B5A" },
  ad: { label: "广告", color: "#FF4D74" },
  garble: { label: "乱码", color: "#E07A5F" },
  dup: { label: "重复", color: "#8a6d1f" },
  toxic: { label: "有害内容", color: "#241C15" },
};

// 文本分片，每片可能带一个脏 tag
const PIECES: { t: string; tag?: DirtKey }[] = [
  { t: "<div class='content'>", tag: "html" },
  { t: "光合作用是植物把光能转化为养分的过程。" },
  { t: "【点击这里立即领取 888 元红包！】", tag: "ad" },
  { t: "它需要叶绿素的参与。" },
  { t: "光合作用是植物把光能转化为养分的过程。", tag: "dup" },
  { t: "鍏夊悎浣滅敤@#%&", tag: "garble" },
  { t: "产物是氧气和葡萄糖。" },
  { t: "（楼主就是个白痴，懂不懂啊）", tag: "toxic" },
  { t: "</div>", tag: "html" },
];

const ORDER: DirtKey[] = ["html", "ad", "garble", "dup", "toxic"];

const SectionHowDirty: React.FC = () => {
  const [active, setActive] = useState<DirtKey | null>("ad");

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">It&apos;s Messy</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          看看从网上扒来的数据有多脏
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          下面是一段从网页上抓来的原始文本。本来只想要那句讲光合作用的，结果混进来一堆乱七八糟的。
          点下面的标签，看每种脏东西藏在哪。
        </p>

        <div className="mt-9 flex flex-wrap gap-2.5">
          {ORDER.map((k) => {
            const on = k === active;
            return (
              <button
                key={k}
                onClick={() => setActive(on ? null : k)}
                className={[
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-ink font-semibold text-[14px] transition-all duration-250 ease-spring",
                  on ? "text-cream shadow-stamp -translate-y-0.5" : "bg-cream text-ink/65 hover:text-ink",
                ].join(" ")}
                style={on ? { backgroundColor: LEGEND[k].color } : undefined}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full border border-ink"
                  style={{ backgroundColor: LEGEND[k].color }}
                />
                {LEGEND[k].label}
              </button>
            );
          })}
        </div>

        <div className="mt-7 card-stamp p-6">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/45 mb-3">
            原始抓取文本
          </div>
          <div className="bg-cream border-2 border-ink rounded-2xl p-5 font-mono text-[14px] leading-[2] break-all">
            {PIECES.map((p, i) => {
              const hit = p.tag && p.tag === active;
              return (
                <span
                  key={i}
                  className={[
                    "transition-all duration-200 rounded px-0.5",
                    hit ? "text-cream font-bold" : p.tag ? "text-ink/85" : "text-ink/85",
                  ].join(" ")}
                  style={hit ? { backgroundColor: LEGEND[p.tag!].color } : undefined}
                >
                  {p.t}
                </span>
              );
            })}
          </div>
          <p className="mt-4 font-sans text-[15px] leading-[1.7] text-ink/75 max-w-[720px]">
            真正有用的就那两三句。其余的标签、广告、乱码、重复、骂人话，全得清掉 ——
            不然模型会把这些一起当成「正常文字」学进去。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionHowDirty;
