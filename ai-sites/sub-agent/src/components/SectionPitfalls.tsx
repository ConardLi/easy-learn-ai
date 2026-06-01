/**
 * SectionPitfalls · 5 个常见误区
 *
 * 主交互（L2 accordion）：5 条并列误区，用户感兴趣哪个展开看
 *   误区一：SubAgent 主要是为了并行提速
 *   误区二：子 Agent 越多越好
 *   误区三：一上来就搞五六个角色
 *   误区四：结果应该完整带回来
 *   误区五：子 Agent 可以套娃
 *
 * 跟相邻 SectionInClaudeCode（编辑器）拉开风格：这里是折叠列表
 */
import React, { useMemo, useState } from "react";
import { ChevronDown, X, Footprints, ThumbsUp } from "lucide-react";

type Pitfall = {
  no: string;
  claim: string;
  why: string;
  real: string;
};

const PITFALLS: Pitfall[] = [
  {
    no: "01",
    claim: "「SubAgent 主要是为了并行提速。」",
    why: "并行是好处，排第二。第一永远是上下文隔离。光图快的话，多开几个窗口就行了。",
    real: "SubAgent 主要是为了别让主聊天被翻文件记录塞满。快一点是额外好处。",
  },
  {
    no: "02",
    claim: "「子 Agent 越多越好，能拆就拆。」",
    why: "多 Agent 工作流的 token 消耗大约是单 Agent 的 4-7 倍。没必要的委派只是白花钱加延迟。",
    real: "只有任务真正独立、结果能浓缩成摘要的时候，才值得派。其他情况主 Agent 直接干。",
  },
  {
    no: "03",
    claim: "「一上来就搞 Explorer / Reviewer / Planner / Tester / Implementer 一整套。」",
    why: "你还没验证「外包 + 摘要」这个最小循环对你有没有用，先把架子搭起来 = 容易半途而废。",
    real: "先跑通一件事：单个子任务外包 + 摘要返回。确认它解决了上下文污染，再慢慢加角色。",
  },
  {
    no: "04",
    claim: "「子 Agent 的执行历史应该完整带回来给主 Agent 参考。」",
    why: "把全量过程原封拷回主对话 = 隔离白做了。主对话又脏了，跟没派子 Agent 一样。",
    real: "只返回精炼结论。这条是纪律。中间过程要溯源，去子 Agent 自己空间翻。",
  },
  {
    no: "05",
    claim: "「子 Agent 还能再派子子 Agent，递归一下更强。」",
    why: "大多数框架里子 Agent 不能再派生。这是故意的 —— 允许无限嵌套，控制流不可预测，出问题没法调。",
    real: "一层就够。需要更深，重新切任务给主 Agent，让它再派一次。",
  },
];

type Stamp = "stepped" | "missed" | null;

const SectionPitfalls: React.FC = () => {
  const [open, setOpen] = useState<string | null>("01");
  const [stamps, setStamps] = useState<Record<string, Stamp>>({});

  const setStamp = (no: string, s: Stamp) => {
    setStamps((prev) => ({ ...prev, [no]: prev[no] === s ? null : s }));
  };

  const steppedCount = useMemo(
    () => Object.values(stamps).filter((v) => v === "stepped").length,
    [stamps],
  );
  const missedCount = useMemo(
    () => Object.values(stamps).filter((v) => v === "missed").length,
    [stamps],
  );

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Trap · 容易踩的坑</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          5 句听起来对，其实{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-coral/60 -z-0" />
            <span className="relative z-10">都不对</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          这些话刚开始用 SubAgent 时几乎人人都会冒出来。
          <span className="font-bold text-ink"> 点开看为啥不对、真相是啥 </span>
          —— 顺手在右边给自己标一下：哪条踩过，哪条侥幸躲过。
        </p>

        {/* 计分牌 */}
        <div className="mt-7 inline-flex items-center gap-4 px-4 py-2.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.18em] uppercase text-coral font-bold">
            <Footprints className="w-3.5 h-3.5" strokeWidth={2.4} />
            踩过 {steppedCount}/{PITFALLS.length}
          </span>
          <span className="w-1 h-1 rounded-full bg-ink/30" />
          <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.18em] uppercase text-teal font-bold">
            <ThumbsUp className="w-3.5 h-3.5" strokeWidth={2.4} />
            躲过 {missedCount}/{PITFALLS.length}
          </span>
        </div>

        {/* accordion */}
        <div className="mt-7 space-y-3">
          {PITFALLS.map((p) => {
            const isOpen = open === p.no;
            const stamp = stamps[p.no] ?? null;
            return (
              <div
                key={p.no}
                className={`border-2 border-ink rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "shadow-stamp-lg" : "shadow-stamp"
                } ${
                  stamp === "stepped"
                    ? "bg-coral/8"
                    : stamp === "missed"
                    ? "bg-butter/30"
                    : "bg-cream"
                }`}
              >
                <div className="flex items-stretch">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : p.no)}
                    className="flex-1 flex items-start gap-4 px-5 py-4 text-left hover:bg-butter-tint/40 transition-colors duration-200"
                  >
                    <span className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-9 h-9 bg-ink text-cream font-mono text-[12px] font-bold tracking-[0.1em] rounded-full">
                      {p.no}
                    </span>
                    <span className="flex-1 font-display font-bold text-[16.5px] text-ink leading-snug pt-1">
                      {p.claim}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 mt-2 text-ink/60 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.4}
                    />
                  </button>
                  {/* 自我标记按钮 */}
                  <div className="hidden md:flex items-center gap-1 pr-4 pl-2 border-l-2 border-dashed border-ink/15">
                    <StampBtn
                      active={stamp === "stepped"}
                      onClick={() => setStamp(p.no, "stepped")}
                      tone="bg-coral text-white"
                      icon={<Footprints className="w-3 h-3" strokeWidth={2.4} />}
                      label="踩过"
                    />
                    <StampBtn
                      active={stamp === "missed"}
                      onClick={() => setStamp(p.no, "missed")}
                      tone="bg-teal text-cream"
                      icon={<ThumbsUp className="w-3 h-3" strokeWidth={2.4} />}
                      label="躲过"
                    />
                  </div>
                </div>
                {/* 移动端：底部按钮组 */}
                <div className="md:hidden flex items-center justify-end gap-2 px-5 pb-3 -mt-1">
                  <StampBtn
                    active={stamp === "stepped"}
                    onClick={() => setStamp(p.no, "stepped")}
                    tone="bg-coral text-white"
                    icon={<Footprints className="w-3 h-3" strokeWidth={2.4} />}
                    label="踩过"
                  />
                  <StampBtn
                    active={stamp === "missed"}
                    onClick={() => setStamp(p.no, "missed")}
                    tone="bg-teal text-cream"
                    icon={<ThumbsUp className="w-3 h-3" strokeWidth={2.4} />}
                    label="躲过"
                  />
                </div>

                {isOpen && (
                  <div className="px-5 pb-5 pl-[68px] grid grid-cols-1 md:grid-cols-2 gap-4 animate-enter-up">
                    <div className="border-2 border-coral rounded-2xl px-4 py-3.5 bg-coral/10">
                      <div className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.22em] uppercase text-coral mb-1.5">
                        <X className="w-3.5 h-3.5" strokeWidth={2.6} />
                        为什么不对
                      </div>
                      <p className="font-sans text-[14px] leading-[1.7] text-ink/85">
                        {p.why}
                      </p>
                    </div>
                    <div className="border-2 border-ink rounded-2xl px-4 py-3.5 bg-butter">
                      <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/70 mb-1.5">
                        实际上 ↓
                      </div>
                      <p className="font-sans text-[14px] leading-[1.7] text-ink">
                        {p.real}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StampBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  tone: string;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, tone, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 border-ink font-mono text-[10.5px] tracking-[0.18em] uppercase transition-all duration-200 ease-spring ${
      active
        ? `${tone} shadow-stamp translate-x-[-1px] translate-y-[-1px]`
        : "bg-cream text-ink/60 hover:text-ink hover:shadow-stamp"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default SectionPitfalls;
