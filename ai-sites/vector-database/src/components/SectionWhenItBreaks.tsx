import React, { useState } from "react";
import { AlertTriangle, BadgeCheck, Calendar, Hash, WalletCards } from "lucide-react";
import { MiniBadge, SectionShell } from "./common";

const cases = [
  {
    id: "policy",
    title: "意思相近",
    icon: BadgeCheck,
    query: "年假能不能结转？",
    vector: "未休假期顺延规则",
    keyword: "年假结转说明",
    note: "这种问题适合向量搜索。用户说法不一样，也能找回同一件事。",
  },
  {
    id: "date",
    title: "日期很硬",
    icon: Calendar,
    query: "2026-03-01 生效的是哪版？",
    vector: "2025 版休假制度",
    keyword: "2026-03-01 生效公告",
    note: "日期、版本、编号要精确匹配。只靠意思接近，会把旧资料拿回来。",
  },
  {
    id: "money",
    title: "金额不能猜",
    icon: WalletCards,
    query: "报销上限是 800 还是 1000？",
    vector: "差旅补贴政策",
    keyword: "报销上限 1000 元",
    note: "金额差一点就会答错。向量搜索负责找候选，精确字段还要单独查。",
  },
  {
    id: "code",
    title: "编号要对",
    icon: Hash,
    query: "POL-HR-2047 是什么？",
    vector: "HR 政策合集",
    keyword: "POL-HR-2047 离职结算",
    note: "编号、SKU、工单号更像钥匙。关键词搜索通常更稳。",
  },
];

const SectionWhenItBreaks: React.FC = () => {
  const [active, setActive] = useState(cases[0].id);
  const current = cases.find((item) => item.id === active) ?? cases[0];
  const Icon = current.icon;

  return (
    <SectionShell num="05" label="failure cases" tone="cream">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-coral p-2 text-cream shadow-stamp">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg">向量搜索会被数字和编号绊住</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            它擅长找“意思像”的内容。日期、金额、编号这类东西，差一个字符意思就变了。
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
            所以很多生产系统会同时用向量搜索和关键词搜索。下一节会把这件事拼起来看。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-3">
            {cases.map((item) => {
              const CaseIcon = item.icon;
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 border-ink p-4 text-left transition-all duration-250 ease-spring ${
                    selected ? "bg-ink text-cream shadow-stamp" : "bg-white text-ink"
                  }`}
                >
                  <CaseIcon className="h-5 w-5 shrink-0" />
                  <span className="font-bold">{item.title}</span>
                </button>
              );
            })}
          </div>

          <div className="card-stamp bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-butter">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <MiniBadge>同一个问题</MiniBadge>
                <p className="mt-1 font-bold">{current.query}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border-2 border-ink bg-coral p-4 text-cream">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.14em]">vector search</p>
                <p className="mt-3 text-xl font-extrabold">{current.vector}</p>
                <p className="mt-2 text-sm text-cream/80">按意思找，可能拿到宽泛候选。</p>
              </div>
              <div className="rounded-2xl border-2 border-ink bg-butter p-4">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.14em]">keyword / filter</p>
                <p className="mt-3 text-xl font-extrabold">{current.keyword}</p>
                <p className="mt-2 text-sm text-ink/70">按硬词和字段找，更适合精确信息。</p>
              </div>
            </div>

            <p className="mt-5 rounded-2xl border-2 border-ink bg-cream p-4 leading-relaxed text-ink/75">
              {current.note}
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionWhenItBreaks;
