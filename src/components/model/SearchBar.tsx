/**
 * 模型搜索栏组件
 */

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange,
  placeholder = '搜索模型名称、公司、描述或标签...' 
}) => {
  return (
    <div className="relative flex-1 min-w-[300px]">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-ink/55" strokeWidth={2.5} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3 bg-white border-2 border-ink rounded-full font-sans text-[14px] text-ink placeholder:text-ink/40 shadow-stamp transition-all duration-250 ease-spring focus:outline-none focus:-translate-x-[2px] focus:-translate-y-[2px] focus:[box-shadow:6px_6px_0_0_#241C15]"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="清除搜索"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-ink/5 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-ink/60" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
