/**
 * 模型树形视图组件
 * 以树形结构展示模型的层级关系
 */

import React, { useMemo } from 'react';
import { AIModel } from '../../types/model';
import { buildModelTree } from '../../utils/modelTreeUtils';
import { TreeNode } from './TreeNode';

interface ModelTreeViewProps {
  models: AIModel[];
}

export const ModelTreeView: React.FC<ModelTreeViewProps> = ({ models }) => {
  // 构建树形结构
  const treeData = useMemo(() => buildModelTree(models), [models]);

  if (treeData.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🌳</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">暂无数据</h3>
        <p className="text-gray-500">没有可展示的模型信息</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* 树形结构提示 */}
      <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">树形视图说明</h4>
            <p className="text-sm text-gray-600">
              点击公司名称展开查看旗下模型，点击模型名称查看详细信息。默认只展开到公司层级，您可以逐层展开查看更多内容。
            </p>
          </div>
        </div>
      </div>

      {/* 树形结构 */}
      <div className="space-y-1">
        {treeData.map((node) => (
          <TreeNode key={node.id} node={node} level={0} />
        ))}
      </div>
    </div>
  );
};
