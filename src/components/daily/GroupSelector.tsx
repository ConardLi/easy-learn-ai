/**
 * 日报分组选择器 · Mailchimp-Freddie stamp 风
 * 支持按月分组（默认）/ 按年分组 / 不分组。
 */

import React from "react";
import { LayoutGrid } from "lucide-react";

export type DailyGroupBy = "month" | "year" | "none";

interface GroupSelectorProps {
  value: DailyGroupBy;
  onChange: (value: DailyGroupBy) => void;
}

const options: { value: DailyGroupBy; label: string }[] = [
  { value: "month", label: "按月分组" },
  { value: "year", label: "按年分组" },
  { value: "none", label: "不分组" },
];

export const GroupSelector: React.FC<GroupSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 pl-4 pr-3 py-2.5 bg-white border-2 border-ink rounded-full shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]">
      <LayoutGrid className="w-4 h-4 text-ink/65" strokeWidth={2.5} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DailyGroupBy)}
        className="appearance-none bg-transparent border-none outline-none font-sans font-semibold text-[13px] text-ink cursor-pointer pr-1"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
