/**
 * 模型列表组件
 * 以网格形式展示模型卡片，支持分组显示
 */

import React from 'react';
import { ModelCard } from './ModelCard';
import { AIModel } from '../../types/model';

interface ModelListProps {
  models: Record<string, AIModel[]>;
  showGroupHeaders: boolean;
}

export const ModelList: React.FC<ModelListProps> = ({ models, showGroupHeaders }) => {
  const groupEntries = Object.entries(models);

  if (groupEntries.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">没有找到匹配的模型</h3>
        <p className="text-gray-500">请尝试调整筛选条件或搜索关键词</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {groupEntries.map(([groupName, groupModels]) => (
        <div key={groupName}>
          {/* 分组标题 */}
          {showGroupHeaders && (
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {groupName}
                </h2>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium">
                  {groupModels.length} 个模型
                </span>
              </div>
              <div className="mt-2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-20" />
            </div>
          )}

          {/* 模型网格 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {groupModels.map((model) => (
              <ModelCard key={model.modelName} model={model} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
