/**
 * 基准测试排序选择器组件
 */

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { BenchmarkSortOption } from "../../types/benchmark";

interface SortSelectorProps {
  value: BenchmarkSortOption;
  onChange: (value: BenchmarkSortOption) => void;
}

const sortOptions: { value: BenchmarkSortOption; label: string }[] = [
  { value: "year-desc", label: "年份 (新→旧)" },
  { value: "year-asc", label: "年份 (旧→新)" },
  { value: "examples-desc", label: "样本数 (多→少)" },
  { value: "examples-asc", label: "样本数 (少→多)" },
  { value: "name-asc", label: "名称 (A→Z)" },
  { value: "name-desc", label: "名称 (Z→A)" },
];

export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200">
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BenchmarkSortOption)}
          className="appearance-none bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer pr-2"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
