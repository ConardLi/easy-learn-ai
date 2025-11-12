/**
 * 模型排序选择器组件
 */

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '../../types/model';

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'releaseDate-desc', label: '发布时间 ↓' },
  { value: 'releaseDate-asc', label: '发布时间 ↑' },
  { value: 'contextWindow-desc', label: '上下文窗口 ↓' },
  { value: 'contextWindow-asc', label: '上下文窗口 ↑' },
  { value: 'modelName-asc', label: '模型名称 A-Z' },
  { value: 'modelName-desc', label: '模型名称 Z-A' },
];

export const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200">
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
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
