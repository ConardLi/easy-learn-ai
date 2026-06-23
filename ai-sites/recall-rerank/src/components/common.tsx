import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

export const SectionShell: React.FC<{
  num: string;
  label: string;
  children: React.ReactNode;
  tone?: "cream" | "white" | "butter" | "teal";
}> = ({ num, label, children, tone = "cream" }) => {
  const toneClass =
    tone === "white"
      ? "bg-white border-y-2 border-ink"
      : tone === "butter"
        ? "bg-butter-tint border-y-2 border-ink"
        : tone === "teal"
          ? "bg-teal text-cream border-y-2 border-ink"
          : "bg-cream";

  return (
    <section className={`${toneClass} px-5 py-16 md:px-8 md:py-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor">
          <span className="section-anchor-num">{num}</span>
          <span className="section-anchor-label">{label}</span>
        </div>
        {children}
      </div>
    </section>
  );
};

export const MiniBadge: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark = false,
}) => (
  <span
    className={cx(
      "inline-flex items-center rounded-full border-2 border-ink px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em]",
      dark ? "bg-ink text-cream" : "bg-white text-ink",
    )}
  >
    {children}
  </span>
);

export const StampLink: React.FC<{
  href: string;
  title: string;
  desc: string;
  compact?: boolean;
  tone?: "butter" | "white";
}> = ({ href, title, desc, compact = false, tone = "butter" }) => (
  <a
    href={href}
    className={cx(
      "group flex items-start gap-3 border-2 border-ink text-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg",
      tone === "white" ? "bg-white" : "bg-butter",
      compact ? "rounded-xl p-4" : "rounded-2xl p-5",
    )}
  >
    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
      <ExternalLink className="h-4 w-4 text-ink" strokeWidth={2.4} />
    </span>
    <span className="min-w-0">
      <span className="flex items-center gap-1.5 font-bold leading-snug">
        {title}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-250 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      <span className="mt-1 block text-sm leading-relaxed text-ink/75">{desc}</span>
    </span>
  </a>
);

export const ScoreBar: React.FC<{
  label: string;
  value: number;
  color?: string;
  dark?: boolean;
}> = ({ label, value, color = "bg-coral", dark = false }) => (
  <div>
    <div
      className={cx(
        "mb-1 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.12em]",
        dark ? "text-cream/70" : "text-ink/55",
      )}
    >
      <span>{label}</span>
      <span>{Math.round(value)}</span>
    </div>
    <div className={cx("h-3 rounded-full border-2 border-ink", dark ? "bg-cream" : "bg-white")}>
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(4, Math.min(100, value))}%` }} />
    </div>
  </div>
);

export type Candidate = {
  id: string;
  title: string;
  text: string;
  keyword: number;
  meaning: number;
  exact: number;
  freshness: number;
};

export const candidates: Candidate[] = [
  {
    id: "a",
    title: "员工年假折算规则",
    text: "离职员工未休年假按日工资折算，需在最后一个工资周期结清。",
    keyword: 86,
    meaning: 92,
    exact: 80,
    freshness: 82,
  },
  {
    id: "b",
    title: "请假申请入口",
    text: "员工可在移动端提交年假、病假、调休申请，审批通过后自动同步。",
    keyword: 78,
    meaning: 54,
    exact: 44,
    freshness: 88,
  },
  {
    id: "c",
    title: "离职手续清单",
    text: "离职前需归还设备、完成交接，并确认工资、补贴、假期余额。",
    keyword: 52,
    meaning: 82,
    exact: 68,
    freshness: 76,
  },
  {
    id: "d",
    title: "年会调休通知",
    text: "年会当天加班的员工可申请调休，调休有效期为三个月。",
    keyword: 64,
    meaning: 38,
    exact: 34,
    freshness: 92,
  },
  {
    id: "e",
    title: "薪资发放时间",
    text: "工资一般在每月十日发放，遇节假日提前到最近工作日。",
    keyword: 28,
    meaning: 46,
    exact: 58,
    freshness: 84,
  },
  {
    id: "f",
    title: "假期余额查询",
    text: "员工可在系统里查看年假余额、历史请假记录和待审批申请。",
    keyword: 70,
    meaning: 62,
    exact: 46,
    freshness: 80,
  },
];

export const recallScore = (candidate: Candidate, keywordWeight: number) =>
  Math.round(candidate.keyword * (keywordWeight / 100) + candidate.meaning * (1 - keywordWeight / 100));

export const rerankScore = (candidate: Candidate) =>
  Math.round(candidate.meaning * 0.36 + candidate.exact * 0.38 + candidate.freshness * 0.14 + candidate.keyword * 0.12);
