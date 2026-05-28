/**
 * 模型库统计栏 · Mailchimp-Freddie 风（v2）
 *
 * v2 改造：接管 Hero 让出的"主数据展示"职责
 *   - 显示多维度数字：N 模型 / M 公司 / X 标签
 *   - 筛选生效时插入 coral 强调的"筛选结果"项
 *   - cream 底 stamp 卡 + 数字 display 大字 + 标签 mono 小字
 */

import React from "react";
import { Database, Filter as FilterIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
}

interface StatsBarProps {
  /** 总数（兼容旧调用） */
  totalCount: number;
  /** 筛选后数量 */
  filteredCount: number;
  /** 是否激活筛选 */
  hasActiveFilters: boolean;
  /** 额外维度统计（如 公司数 / 标签数），可选 */
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
        {/* 核心：总数 */}
        <StatItemView
          icon={<Database className="w-4 h-4" strokeWidth={2.5} />}
          label="收录模型"
          value={totalCount}
          primary
        />

        {/* 额外维度 */}
        {extras.map((item) => (
          <React.Fragment key={item.label}>
            <Divider />
            <StatItemView label={item.label} value={item.value} />
          </React.Fragment>
        ))}

        {/* 筛选结果（仅激活时显示，coral 强调） */}
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

        {/* 右侧：更新状态（推到最右） */}
        <div className="ml-auto inline-flex items-baseline gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
            Updated
          </span>
          <span className="font-display font-extrabold text-[14px] text-ink">
            周更
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
