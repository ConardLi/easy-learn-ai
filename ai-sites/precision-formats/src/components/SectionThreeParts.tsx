/**
 * Section 02 · 一个浮点数怎么拆成三部分
 *
 * 铺垫上一节的「符号 / 指数 / 尾数」三种位到底各管啥。
 * 借中学就学过的科学计数法（3.14 = +1.57 × 2^1 这种）讲清：
 *   - 符号位：正还是负
 *   - 指数位：小数点放哪，决定数能多大多小（范围）
 *   - 尾数位：保留几位有效数字，决定数存得多准（精度）
 *
 * 交互：点三块色块中任意一块，右边换成对应那部分的「改了会怎样」演示。
 */
import React, { useState } from "react";

type PartId = "sign" | "exp" | "mant";

type Part = {
  id: PartId;
  name: string;
  manages: string;
  color: string;
  text: string;
  demoTitle: string;
  demoBefore: string;
  demoAfter: string;
  demoNote: string;
};

const PARTS: Part[] = [
  {
    id: "sign",
    name: "符号位",
    manages: "管正负",
    color: "bg-ink",
    text: "就 1 个位：0 表示正数，1 表示负数。所有格式都只花这 1 位办这件事。",
    demoTitle: "把符号位从 0 翻成 1",
    demoBefore: "+3.14",
    demoAfter: "−3.14",
    demoNote: "数值大小没变，只是变了正负。",
  },
  {
    id: "exp",
    name: "指数位",
    manages: "管范围",
    color: "bg-coral",
    text: "决定小数点能往左右挪多远 —— 也就是这个数能有多大、能有多小。位越多，能表示的数范围越宽。",
    demoTitle: "指数位多 1 位，能表示的最大数",
    demoBefore: "约 6.5 万（5 位指数）",
    demoAfter: "约 3.4×10³⁸（8 位指数）",
    demoNote: "指数位越多，越不容易「装不下」很大的数。",
  },
  {
    id: "mant",
    name: "尾数位",
    manages: "管精度",
    color: "bg-butter-deep",
    text: "保留有效数字的部分。位越多，小数点后能记的位数越多，数就存得越准、越不「凑整」。",
    demoTitle: "尾数位从 3 位加到 23 位，存 π",
    demoBefore: "3.0（尾数 3 位）",
    demoAfter: "3.14159265（尾数 23 位）",
    demoNote: "尾数位越多，越接近真实的数。",
  },
];

const SectionThreeParts: React.FC = () => {
  const [pid, setPid] = useState<PartId>("exp");
  const p = PARTS.find((x) => x.id === pid)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-t-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">three parts</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一个小数，是用三段拼出来的
        </h2>
        <div className="max-w-2xl space-y-3 text-ink/75 text-[16px] mb-9">
          <p>
            回想中学的科学计数法：3140 写成 3.14 × 10³。一个数被拆成「正负号 + 有效数字 + 小数点放哪」三件事。
          </p>
          <p>
            计算机存小数也是这套思路，只不过数字背后是用一串 0 和 1 表示的。这串 0 和 1 固定切成三段，各管一件事。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-7 items-start">
          {/* 左：三块可点 */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
              点一段，看它管什么
            </div>
            <div className="space-y-2.5">
              {PARTS.map((x) => {
                const on = x.id === pid;
                return (
                  <button
                    key={x.id}
                    onClick={() => setPid(x.id)}
                    className={[
                      "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                      on
                        ? "bg-cream shadow-stamp -translate-x-0.5 -translate-y-0.5"
                        : "bg-white hover:bg-cream",
                    ].join(" ")}
                  >
                    <span className={[x.color, "w-7 h-7 rounded-lg border-2 border-ink shrink-0"].join(" ")} />
                    <span className="flex-1">
                      <span className="font-display text-[16px] font-bold text-ink mr-2">{x.name}</span>
                      <span className="font-mono text-[12px] text-ink/55">{x.manages}</span>
                    </span>
                    {on && <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse-dot" />}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[13.5px] text-ink/65 leading-relaxed">{p.text}</p>
          </div>

          {/* 右：改了会怎样 */}
          <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-6 lg:p-7">
            <div className="flex items-center gap-2 mb-5">
              <span className={[p.color, "w-4 h-4 rounded border-2 border-ink"].join(" ")} />
              <span className="font-display text-[15px] font-bold text-ink">{p.demoTitle}</span>
            </div>

            <div className="space-y-3">
              <div className="px-4 py-3 bg-white border-2 border-ink/15 rounded-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 mb-1">改之前</div>
                <div className="font-mono text-[20px] font-bold text-ink/70 tabular-nums">{p.demoBefore}</div>
              </div>
              <div className="flex justify-center">
                <span className="font-mono text-[18px] text-ink/40">↓</span>
              </div>
              <div className="px-4 py-3 bg-white border-2 border-ink rounded-xl shadow-stamp">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 mb-1">改之后</div>
                <div className="font-mono text-[20px] font-bold text-coral tabular-nums">{p.demoAfter}</div>
              </div>
            </div>

            <p className="mt-5 text-[13px] text-ink/65 leading-relaxed">{p.demoNote}</p>
          </div>
        </div>

        <div className="mt-9 px-5 py-4 bg-butter border-2 border-ink rounded-2xl">
          <p className="text-[15px] text-ink leading-relaxed">
            记住这句就够了：<span className="font-bold">指数位管「能多大」，尾数位管「有多准」</span>。下一节就靠这两点，看四种格式的区别。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionThreeParts;
