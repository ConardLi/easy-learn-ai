/**
 * 日报排序选择器 · Mailchimp-Freddie stamp 风
 * 与 benchmark/model 模块同语系：capsule 按钮 + ink 描线 + stamp 阴影。
 */

import React from "react";
import { ArrowUpDown } from "lucide-react";

export type DailySortOption = "date-desc" | "date-asc";

interface SortSelectorProps {
  value: DailySortOption;
  onChange: (value: DailySortOption) => void;
}

const options: { value: DailySortOption; label: string }[] = [
  { value: "date-desc", label: "最新优先" },
  { value: "date-asc", label: "最早优先" },
];

export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 pl-4 pr-3 py-2.5 bg-white border-2 border-ink rounded-full shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]">
      <ArrowUpDown className="w-4 h-4 text-ink/65" strokeWidth={2.5} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DailySortOption)}
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
