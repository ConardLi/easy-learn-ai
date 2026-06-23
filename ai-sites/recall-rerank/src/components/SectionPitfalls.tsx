import React, { useMemo, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { cx, MiniBadge, SectionShell } from "./common";

const checks = [
  {
    id: "miss",
    label: "关键资料没进候选",
    why: "召回阶段已经漏了，后面重排再强也看不到。",
    fix: "调大 top-K，补关键词检索，或者检查 chunk 是否切断了答案。",
  },
  {
    id: "noise",
    label: "无关资料总挤在前面",
    why: "召回只看相似度，可能把同词不同义的片段推上来。",
    fix: "加重排，或者给重排器更清楚的问题和来源字段。",
  },
  {
    id: "narrow",
    label: "重排只看太少候选",
    why: "候选池太窄时，正确资料没机会被细看。",
    fix: "让召回多给一些候选，再由重排压缩到 top-N。",
  },
  {
    id: "duplicate",
    label: "重复片段占满位置",
    why: "同一段资料被切成多个相似 chunk，最终全挤进聊天窗口。",
    fix: "做去重，按来源合并相邻 chunk，或者给同源片段降权。",
  },
  {
    id: "stale",
    label: "旧制度排在新制度前面",
    why: "只看文字相似，不看生效时间，就会把过期资料带进答案。",
    fix: "把日期、版本、权限这些字段也放进排序规则。",
  },
];

const SectionPitfalls: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(["miss", "noise"]);

  const active = useMemo(
    () => checks.filter((item) => selected.includes(item.id)),
    [selected],
  );

  const toggle = (id: string) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <SectionShell num="07" label="failure patterns" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-coral p-2 text-cream shadow-stamp">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg text-ink">出问题时，先判断卡在召回还是重排。</h2>
          <div className="mt-5 max-w-xl space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>如果正确资料没进候选，这是召回问题。重排看不到它，自然排不上来。</p>
            <p>如果正确资料进了候选，却被无关内容压住，这是重排问题。该调排序规则或换重排模型。</p>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-ink bg-cream p-5 shadow-stamp">
            <MiniBadge>勾选你遇到的现象</MiniBadge>
            <div className="mt-4 grid gap-2">
              {checks.map((item) => (
                <label
                  key={item.id}
                  className={cx(
                    "flex cursor-pointer items-start gap-3 rounded-xl border-2 border-ink p-3 transition-all duration-250 ease-spring",
                    selected.includes(item.id) ? "bg-butter shadow-stamp" : "bg-white hover:bg-butter/40",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => toggle(item.id)}
                    className="mt-1 h-4 w-4 accent-coral"
                  />
                  <span className="font-bold text-ink">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-ink bg-butter p-5 shadow-stamp-xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="font-display text-[24px] font-bold text-ink">排障建议</div>
            <span className="rounded-full border-2 border-ink bg-white px-3 py-1 font-mono text-xs font-bold">{active.length} 条</span>
          </div>

          <div className="space-y-3">
            {active.length === 0 ? (
              <div className="rounded-2xl border-2 border-ink bg-white p-8 text-center">
                <div className="font-display text-[22px] font-bold">先选一个现象</div>
                <p className="mt-2 text-sm text-ink/62">真实排障从具体症状开始。</p>
              </div>
            ) : (
              active.map((item) => (
                <div key={item.id} className="rounded-2xl border-2 border-ink bg-white p-4">
                  <div className="font-display text-[20px] font-bold text-ink">{item.label}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/62">
                    <span className="font-bold text-ink">原因：</span>
                    {item.why}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/62">
                    <span className="font-bold text-ink">改法：</span>
                    {item.fix}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionPitfalls;
