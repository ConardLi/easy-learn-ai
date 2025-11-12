/**
 * 视图切换组件
 * 在卡片视图和树形视图之间切换
 */

import React from 'react';
import { LayoutGrid, Network } from 'lucide-react';

export type ViewMode = 'card' | 'tree';

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
      <button
        onClick={() => onChange('card')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          mode === 'card'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="text-sm font-medium">卡片视图</span>
      </button>
      
      <button
        onClick={() => onChange('tree')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          mode === 'tree'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Network className="w-4 h-4" />
        <span className="text-sm font-medium">树形视图</span>
      </button>
    </div>
  );
};
