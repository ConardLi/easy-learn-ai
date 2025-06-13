/**
 * 搜索栏组件
 * 提供实时搜索功能，支持按标题、日期、标签进行筛选
 */

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "搜索日报标题、日期或标签..."
}) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-lg border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-2 text-sm text-gray-500 text-center">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
            正在搜索: "{searchTerm}"
          </span>
        </div>
      )}
    </div>
  );
};
