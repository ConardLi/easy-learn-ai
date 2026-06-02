/**
 * SectionPitfalls · 新手常见翻车
 *
 * 交互：prompt 体检输入框（L3，实时按规则点亮三盏灯）+ accordion 看每种翻车的解释和改写。
 *       体检是粗略规则匹配，标「粗略体检」，不是精确判断。
 */
import React, { useState } from "react";
import { AlertTriangle, Check, ChevronDown } from "lucide-react";

type CheckResult = { hit: boolean; note: string };

function checkVague(p: string): CheckResult {
  const t = p.trim();
  if (t.length === 0) return { hit: false, note: "" };
  if (t.length < 12)
    return { hit: true, note: "太短了，AI 拿不到足够信息，只能给一段谁都能用的空话。" };
  return { hit: false, note: "给的信息看着够 AI 下手了。" };
}

function checkMultiTask(p: string): CheckResult {
  const t = p.trim();
  if (t.length === 0) return { hit: false, note: "" };
  const connectors = ["然后", "还有", "再帮", "顺便", "另外", "同时", "并且", "以及"];
  const hits = connectors.filter((c) => t.includes(c)).length;
  const bangs = (t.match(/帮我|给我|写一?[个篇条段封份]/g) || []).length;
  if (hits >= 1 || bangs >= 3)
    return { hit: true, note: "像是一口气塞了好几件事。拆成几条分开问，每条 AI 都能答得更稳。" };
  return { hit: false, note: "看着是一件事，AI 能专心做。" };
}

function checkFormat(p: string): CheckResult {
  const t = p.trim();
  if (t.length === 0) return { hit: false, note: "" };
  const fmt = ["字", "表格", "列表", "分点", "几条", "格式", "标题", "markdown", "段", "字数", "条", "列"];
  const has = fmt.some((f) => t.toLowerCase().includes(f));
  if (!has)
    return { hit: true, note: "没说要多长、要什么样子，AI 只能按自己的习惯回，常常对不上你想要的。" };
  return { hit: false, note: "提到了想要的长度或样子，AI 知道往哪个方向回。" };
}

type Pitfall = {
  id: string;
  title: string;
  check: (p: string) => CheckResult;
  bad: string;
  good: string;
  why: string;
};

const PITFALLS: Pitfall[] = [
  {
    id: "vague",
    title: "太模糊",
    check: checkVague,
    bad: "帮我分析一下",
    good: "帮我分析这份季度销售数据，找出卖得最差的三个产品，并各说一句可能的原因。",
    why: "「分析一下」没说分析什么、想看什么结论。补上要分析啥、你想得到什么结果，AI 才知道往哪使劲。",
  },
  {
    id: "multi",
    title: "一条塞太多任务",
    check: checkMultiTask,
    bad: "帮我写周报，然后翻译成英文，顺便做一张配图，再给我总结三个改进点",
    why: "一句话四件事，AI 容易做着这个忘了那个，漏掉一两样。一件一件分开问，每件都能做得更好。",
    good: "先只让它写周报。写完满意了，再开一条让它翻译成英文。",
  },
  {
    id: "format",
    title: "没说要什么格式",
    check: checkFormat,
    bad: "给我介绍一下这五个城市",
    good: "用表格介绍这五个城市，列出「城市 / 特色 / 适合几天」三列。",
    why: "不说样子，AI 可能回你一大段话。说清要表格、要几列、要多长，拿到手就能直接用。",
  },
];

const SectionPitfalls: React.FC = () => {
  const [p, setP] = useState("帮我写点东西");
  const [open, setOpen] = useState<string | null>("vague");
  const results = PITFALLS.map((pf) => ({ pf, res: pf.check(p) }));
  const hitCount = results.filter((r) => r.res.hit).length;
  const typed = p.trim().length > 0;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-[1000px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">三种翻车</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[720px] leading-tight">
          新手最常踩的三个坑
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/75 max-w-[660px]">
          先给你的 prompt 做个粗略体检：在框里写一句，下面三盏灯会按规则亮起来，提示哪里可能有问题。
          再往下展开看每种坑怎么改。
        </p>

        {/* 体检输入 */}
        <div className="mt-8 max-w-[660px]">
          <label className="block font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55 mb-2">
            把你的 prompt 贴这儿
          </label>
          <textarea
            value={p}
            onChange={(e) => setP(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 bg-cream border-2 border-ink rounded-xl font-sans text-[15px] text-ink resize-none focus:outline-none focus:shadow-stamp transition-shadow"
            placeholder="比如：帮我写点东西"
          />
        </div>

        {/* 三盏灯 */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {results.map(({ pf, res }) => {
            const danger = typed && res.hit;
            const ok = typed && !res.hit;
            return (
              <div
                key={pf.id}
                className="border-2 border-ink rounded-2xl p-4 transition-colors duration-250"
                style={{ backgroundColor: danger ? "#FCE3DC" : ok ? "#E8F0E4" : "#fff" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-ink flex items-center justify-center"
                    style={{ backgroundColor: danger ? "#E07A5F" : ok ? "#1B4B5A" : "transparent" }}
                  >
                    {danger ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-cream" strokeWidth={2.6} />
                    ) : ok ? (
                      <Check className="w-3.5 h-3.5 text-cream" strokeWidth={3} />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-ink/30" />
                    )}
                  </span>
                  <span className="font-display font-bold text-[14.5px] text-ink">{pf.title}</span>
                </div>
                <p className="mt-2 font-sans text-[12.5px] leading-[1.55] text-ink/70 min-h-[34px]">
                  {typed ? res.note : "等你写点东西……"}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-3 font-mono text-[11px] tracking-[0.05em] text-ink/45">
          粗略体检 · 按关键词和长度的简单规则点灯，帮你自查方向，不是精确判断 —— 命中
          {typed ? ` ${hitCount} ` : " 0 "}条
        </p>

        {/* accordion：每种坑的解释 + 改写 */}
        <div className="mt-9 space-y-3">
          {PITFALLS.map((pf) => {
            const isOpen = open === pf.id;
            return (
              <div key={pf.id} className="border-2 border-ink rounded-2xl bg-white shadow-stamp overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : pf.id)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold text-coral">坑</span>
                    <span className="font-display font-bold text-[17px] text-ink">{pf.title}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={2.5}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 space-y-4">
                    <p className="font-sans text-[14px] leading-[1.7] text-ink/75">{pf.why}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border-2 border-ink rounded-xl bg-cream overflow-hidden">
                        <div className="px-3 py-1.5 bg-coral">
                          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-cream">
                            容易翻车
                          </span>
                        </div>
                        <p className="px-3.5 py-3 font-sans text-[13.5px] leading-[1.65] text-ink/80">
                          {pf.bad}
                        </p>
                      </div>
                      <div className="border-2 border-ink rounded-xl bg-cream overflow-hidden">
                        <div className="px-3 py-1.5 bg-teal">
                          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-cream">
                            改完
                          </span>
                        </div>
                        <p className="px-3.5 py-3 font-sans text-[13.5px] leading-[1.65] text-ink/80">
                          {pf.good}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-9 font-serif italic text-[15px] text-ink/65 max-w-[600px]">
          写好单条 prompt 之后，还有几个跟它分工的进阶概念，最后一节带你认认门。
        </p>
      </div>
    </section>
  );
};

export default SectionPitfalls;
