/**
 * 模型分组选择器组件
 */

import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { GroupByOption } from '../../types/model';

interface GroupSelectorProps {
  value: GroupByOption;
  onChange: (value: GroupByOption) => void;
}

const groupOptions: { value: GroupByOption; label: string }[] = [
  { value: 'none', label: '不分组' },
  { value: 'company', label: '按公司分组' },
  { value: 'openSourceStatus', label: '按开源状态分组' },
  { value: 'tag', label: '按标签分组' },
];

export const GroupSelector: React.FC<GroupSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200">
        <LayoutGrid className="w-4 h-4 text-gray-500" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as GroupByOption)}
          className="appearance-none bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer pr-2"
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
