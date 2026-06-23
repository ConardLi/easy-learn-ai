import React, { useMemo, useState } from "react";
import { ClipboardCheck, Code2, FileQuestion, Landmark, ListChecks } from "lucide-react";
import { MiniBadge, SectionShell, cx } from "./common";

const scenarios = [
  {
    id: "policy",
    label: "制度手册",
    icon: ClipboardCheck,
    start: "按小节或问答条目切，保留标题。",
    watch: "日期、金额、适用范围别被切到两块里。",
  },
  {
    id: "contract",
    label: "合同",
    icon: Landmark,
    start: "按条款切，条款编号和标题要跟着正文走。",
    watch: "引用时要能回到原始条款，别只存一段孤零零的文字。",
  },
  {
    id: "faq",
    label: "FAQ",
    icon: FileQuestion,
    start: "一问一答通常就是一个 chunk。",
    watch: "相似问题可以放近一点，别把多个答案揉到一块。",
  },
  {
    id: "code",
    label: "代码",
    icon: Code2,
    start: "按函数、类、文件结构切，再补路径和依赖信息。",
    watch: "只切函数可能丢掉类型定义、配置和调用关系。",
  },
] as const;

const checks = [
  "每块单独拿出来，能看懂它在讲什么",
  "每块旁边要记清楚：来自哪个文件、哪个小节、哪些人有权限看、是什么时候的版本",
  "边界附近的重要条件没有断开",
  "能用真实问题跑一遍检索结果",
] as const;

const SectionPlaybook: React.FC = () => {
  const [scenarioId, setScenarioId] = useState<(typeof scenarios)[number]["id"]>("policy");
  const [checked, setChecked] = useState<string[]>([checks[0], checks[1]]);
  const scenario = scenarios.find((item) => item.id === scenarioId)!;
  const ready = checked.length >= 3;

  const status = useMemo(() => {
    if (checked.length <= 1) return "先补来源和边界检查。";
    if (checked.length === 2) return "可以试跑，但还别急着上线。";
    if (checked.length === 3) return "能做第一轮小样本测试。";
    return "可以拿真实问题做评估。";
  }, [checked.length]);

  return (
    <SectionShell num="06" label="how to choose">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg text-ink">实际切的时候，看资料长什么样。</h2>
          <div className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>没有一个固定数字适合所有资料。合同、FAQ、教程、代码的结构不同，切刀也该落在不同地方。</p>
            <p>一块资料单独拿出来要能看懂；被搜回来时，要刚好能回答问题，还要能找到原文位置。</p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {scenarios.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setScenarioId(item.id)}
                  className={cx(
                    "rounded-2xl border-2 border-ink p-4 text-left transition-all duration-250 ease-spring",
                    item.id === scenarioId ? "bg-ink text-cream shadow-stamp-lg" : "bg-white text-ink shadow-stamp hover:-translate-y-0.5",
                  )}
                >
                  <Icon className="mb-3 h-5 w-5" strokeWidth={2.4} />
                  <span className="font-display text-[20px] font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <MiniBadge dark>{scenario.label}</MiniBadge>
              <ListChecks className="h-6 w-6 text-ink" strokeWidth={2.5} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Advice title="先从这里切" text={scenario.start} />
              <Advice title="重点检查" text={scenario.watch} />
            </div>
          </div>

          <div className="rounded-3xl border-2 border-ink bg-butter p-5 shadow-stamp-xl">
            <div className="mb-4 font-display text-[24px] font-bold text-ink">上线前查四件事</div>
            <div className="grid gap-3">
              {checks.map((item) => (
                <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-ink bg-white p-4 text-sm leading-relaxed text-ink/75 shadow-stamp">
                  <input
                    type="checkbox"
                    checked={checked.includes(item)}
                    onChange={(event) => {
                      setChecked((prev) => (event.target.checked ? [...prev, item] : prev.filter((x) => x !== item)));
                    }}
                    className="mt-1 h-4 w-4 accent-coral"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <div className={cx("mt-4 rounded-2xl border-2 border-ink p-4 font-display text-[18px] font-bold", ready ? "bg-teal text-cream" : "bg-cream text-ink")}>
              {status}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const Advice: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="rounded-2xl border-2 border-ink bg-cream p-4">
    <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink/50">{title}</div>
    <p className="text-sm leading-relaxed text-ink/75">{text}</p>
  </div>
);

export default SectionPlaybook;
