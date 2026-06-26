/**
 * SectionTechniques · 常见的上下文优化手法（核心加厚节）
 *
 * 把第 4 节的四类策略落到具体可操作的招式。交互：卡片阵列，点每招看「解决什么 + 怎么做」+ 归属类别。
 * 招式来自 Anthropic《Effective Context Engineering for AI Agents》(2025-09) + LangChain 四分类落地。
 */
import React, { useState } from "react";

type Cat = "Write" | "Select" | "Compress" | "Isolate";

const CAT_COLOR: Record<Cat, string> = {
  Write: "#1B4B5A",
  Select: "#E07A5F",
  Compress: "#F4D35E",
  Isolate: "#FF4D74",
};

const CAT_CN: Record<Cat, string> = {
  Write: "写出去",
  Select: "挑着放",
  Compress: "压一压",
  Isolate: "分开放",
};

const TECHS: {
  name: string;
  cat: Cat;
  problem: string;
  how: string;
}[] = [
  {
    name: "指令别写太死也别太空",
    cat: "Select",
    problem: "背后那段预设指令写得太死或太空，AI 都不好好照做。",
    how: "给清楚、给够，但别把每条边角规则都硬塞 —— 留出让 AI 自己判断的空间。",
  },
  {
    name: "工具只留够用的",
    cat: "Select",
    problem: "给 AI 配了一大堆功能重叠的工具，它纠结该用哪个、容易选错。",
    how: "精简到一组职责清晰、不重叠的工具。人都分不清该用哪个，AI 更分不清。",
  },
  {
    name: "示例挑典型的给",
    cat: "Select",
    problem: "为了讲清规则，把几十个边界情况全堆进提示里，又长又乱。",
    how: "挑几个有代表性的例子就够 —— 对 AI 来说，好例子胜过一长串规则。",
  },
  {
    name: "用到才去查（即时检索）",
    cat: "Select",
    problem: "提前把所有可能用到的资料一股脑塞进窗口，大半根本没用上。",
    how: "平时只存「资料在哪」的线索（路径、链接），AI 真需要时再现查现取。",
  },
  {
    name: "长历史压成摘要",
    cat: "Compress",
    problem: "对话越聊越长，旧消息把窗口占满，新内容快放不下。",
    how: "把前面一大段对话总结成几句「目前进展」，细节丢掉，腾出空间。",
  },
  {
    name: "外置便签 / 笔记",
    cat: "Write",
    problem: "干长任务时，中间的结论一多就记不住、被挤出窗口。",
    how: "让 AI 把关键结论写到窗口外的笔记里，下一步要用再读回来。",
  },
  {
    name: "关键信息放头尾",
    cat: "Compress",
    problem: "重要内容夹在一长段中间，AI 容易看漏（中间最容易被忽略）。",
    how: "把最关键的话放在开头或结尾这种显眼位置，别埋在正中间。",
  },
  {
    name: "拆给几个子 AI 各看各的",
    cat: "Isolate",
    problem: "一个任务的信息多到一个窗口根本装不下。",
    how: "拆成几摊，让不同的子 AI 各自只看自己那摊，最后汇总结果。",
  },
  {
    name: "开头别老变（省钱省时）",
    cat: "Write",
    problem: "每次请求开头的内容老在变，重复计算，又慢又费。",
    how: "把每次都一样的开头固定放最前面，系统就能省下重复计算、又快又省钱。",
  },
];

const SectionTechniques: React.FC = () => {
  const [sel, setSel] = useState<number>(0);
  const [filter, setFilter] = useState<Cat | "all">("all");

  const shown = TECHS.map((t, i) => ({ ...t, i })).filter(
    (t) => filter === "all" || t.cat === filter,
  );
  const cur = TECHS[sel];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Techniques</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px]">
          落到实处：九个常用的优化手法
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          四类策略对应的具体招式。每招都标了它归哪一类。可以按类别筛，点卡片看「治什么病、怎么做」。
          （多来自 Anthropic 2025-09 的工程实践文章。）
        </p>

        {/* 类别筛选 */}
        <div className="mt-9 flex flex-wrap gap-2.5">
          <FilterChip on={filter === "all"} onClick={() => setFilter("all")} label="全部" />
          {(Object.keys(CAT_CN) as Cat[]).map((c) => (
            <FilterChip
              key={c}
              on={filter === c}
              onClick={() => setFilter(c)}
              label={`${CAT_CN[c]} · ${c}`}
              color={CAT_COLOR[c]}
            />
          ))}
        </div>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 卡片阵列 */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shown.map((t) => {
              const on = t.i === sel;
              return (
                <button
                  key={t.name}
                  onClick={() => setSel(t.i)}
                  className={[
                    "text-left border-2 border-ink rounded-2xl px-4 py-4 transition-all duration-250 ease-spring",
                    on
                      ? "bg-white shadow-stamp-lg -translate-y-0.5"
                      : "bg-cream hover:-translate-y-0.5 hover:shadow-stamp",
                  ].join(" ")}
                >
                  <span
                    className="inline-block px-2 py-0.5 rounded-full border border-ink/40 font-mono text-[9px] tracking-[0.15em] uppercase mb-2"
                    style={{ color: CAT_COLOR[t.cat] }}
                  >
                    {CAT_CN[t.cat]}
                  </span>
                  <div className="font-display font-bold text-[15.5px] text-ink leading-snug">
                    {t.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 详情 */}
          <div className="lg:col-span-5 lg:sticky lg:top-6">
            <div
              className="border-2 border-ink rounded-3xl shadow-stamp p-6"
              style={{ backgroundColor: `${CAT_COLOR[cur.cat]}12` }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full border-2 border-ink font-mono text-[11px] tracking-[0.15em] uppercase font-bold mb-4"
                style={{
                  backgroundColor: CAT_COLOR[cur.cat],
                  color: cur.cat === "Compress" ? "#241C15" : "#FBEFE3",
                }}
              >
                {CAT_CN[cur.cat]} · {cur.cat}
              </div>
              <div className="font-display font-extrabold text-[22px] text-ink mb-5 leading-tight">
                {cur.name}
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-1.5">
                    治什么病
                  </div>
                  <p className="font-sans text-[15px] leading-[1.7] text-ink/80">{cur.problem}</p>
                </div>
                <div className="pt-4 border-t-2 border-dashed border-ink/20">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-1.5">
                    怎么做
                  </div>
                  <p className="font-sans text-[15px] leading-[1.7] text-ink/80">{cur.how}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FilterChip: React.FC<{
  on: boolean;
  onClick: () => void;
  label: string;
  color?: string;
}> = ({ on, onClick, label, color }) => (
  <button
    onClick={onClick}
    className={[
      "px-4 py-2 rounded-full border-2 border-ink font-semibold text-[13.5px] transition-all duration-250",
      on ? "text-cream shadow-stamp -translate-y-0.5" : "bg-cream text-ink/60 hover:text-ink",
    ].join(" ")}
    style={on ? { backgroundColor: color ?? "#241C15" } : undefined}
  >
    {label}
  </button>
);

export default SectionTechniques;
