/**
 * 基准测试统计栏 · Mailchimp-Freddie 风（v2）
 *
 * v2 改造：接管 Hero 让出的"主数据展示"职责
 *   - 显示多维度数字：N 基准 / X 领域 / Y 年份
 *   - 筛选生效时插入 coral 强调的"筛选结果"项
 */

import React from "react";
import { Database, Filter as FilterIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
}

interface StatsBarProps {
  totalCount: number;
  filteredCount: number;
  hasActiveFilters: boolean;
  extras?: StatItem[];
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalCount,
  filteredCount,
  hasActiveFilters,
  extras = [],
}) => {
  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-6 lg:px-8 py-5">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <StatItemView
          icon={<Database className="w-4 h-4" strokeWidth={2.5} />}
          label="收录基准"
          value={totalCount}
          primary
        />

        {extras.map((item) => (
          <React.Fragment key={item.label}>
            <Divider />
            <StatItemView label={item.label} value={item.value} />
          </React.Fragment>
        ))}

        {hasActiveFilters && (
          <>
            <Divider />
            <StatItemView
              icon={<FilterIcon className="w-4 h-4" strokeWidth={2.5} />}
              label="筛选结果"
              value={filteredCount}
              accent
            />
          </>
        )}

        <div className="ml-auto inline-flex items-baseline gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
            Status
          </span>
          <span className="font-display font-extrabold text-[14px] text-ink">
            持续更新
          </span>
        </div>
      </div>
    </div>
  );
};

const Divider: React.FC = () => (
  <span
    className="w-px h-9 bg-ink/12 hidden md:inline-block"
    aria-hidden
  />
);

const StatItemView: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value: number | string;
  primary?: boolean;
  accent?: boolean;
}> = ({ icon, label, value, primary, accent }) => (
  <div className="inline-flex items-center gap-3">
    {icon && (
      <span className={accent ? "text-coral" : "text-ink/60"}>{icon}</span>
    )}
    <div className="inline-flex flex-col leading-tight">
      <span
        className={`font-display font-extrabold leading-none ${
          accent
            ? "text-coral text-[24px] lg:text-[28px]"
            : primary
              ? "text-ink text-[26px] lg:text-[32px]"
              : "text-ink text-[22px] lg:text-[26px]"
        }`}
      >
        {value}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
        {label}
      </span>
    </div>
  </div>
);
