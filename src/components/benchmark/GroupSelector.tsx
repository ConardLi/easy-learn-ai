/**
 * 基准测试分组选择器 · Mailchimp-Freddie 风
 * 默认按年份（新→旧）分组，可切换不分组
 */

import React from "react";
import { LayoutGrid } from "lucide-react";

export type BenchmarkGroupBy = "none" | "year" | "type";

interface GroupSelectorProps {
  value: BenchmarkGroupBy;
  onChange: (value: BenchmarkGroupBy) => void;
}

const groupOptions: { value: BenchmarkGroupBy; label: string }[] = [
  { value: "year", label: "按年份分组" },
  { value: "type", label: "按类型分组" },
  { value: "none", label: "不分组" },
];

export const GroupSelector: React.FC<GroupSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 pl-4 pr-3 py-2.5 bg-white border-2 border-ink rounded-full shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]">
        <LayoutGrid className="w-4 h-4 text-ink/65" strokeWidth={2.5} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BenchmarkGroupBy)}
          className="appearance-none bg-transparent font-sans text-[13px] font-semibold text-ink focus:outline-none cursor-pointer pr-2"
        >
          {groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
