/**
 * 日报搜索框 · Mailchimp-Freddie stamp 风
 * 与 benchmark/model 模块同语系：白底 + ink 描线 + stamp 阴影，capsule 形态。
 */

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "搜索日报标题或标签…",
}) => {
  return (
    <div className="relative flex-1 min-w-[220px]">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-ink/55"
        strokeWidth={2.5}
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-2.5 bg-white border-2 border-ink rounded-full font-sans text-[14px] text-ink placeholder:text-ink/40 shadow-stamp transition-all duration-250 ease-spring focus:outline-none focus:-translate-x-[2px] focus:-translate-y-[2px] focus:[box-shadow:6px_6px_0_0_#241C15]"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          aria-label="清除搜索"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-full text-ink/55 hover:text-ink hover:bg-ink/10 transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
