/**
 * 模型树形视图组件
 * 以树形结构展示模型的层级关系
 */

import React, { useMemo } from "react";
import { AIModel } from "../../types/model";
import { buildModelTree } from "../../utils/modelTreeUtils";
import { TreeNode } from "./TreeNode";

interface ModelTreeViewProps {
  models: AIModel[];
}

export const ModelTreeView: React.FC<ModelTreeViewProps> = ({ models }) => {
  // 构建树形结构
  const treeData = useMemo(() => buildModelTree(models), [models]);

  // 按国家分组
  const { chinaCompanies, overseasCompanies } = useMemo(() => {
    const china: typeof treeData = [];
    const overseas: typeof treeData = [];

    // 递归查找第一个有model数据的节点，获取国家信息
    const findCountry = (node: any): string | undefined => {
      if (node.model?.country) {
        return node.model.country;
      }
      if (node.children) {
        for (const child of node.children) {
          const country = findCountry(child);
          if (country) return country;
        }
      }
      return undefined;
    };

    treeData.forEach((companyNode) => {
      // 递归查找该公司的国家信息
      const country = findCountry(companyNode);

      if (country === "中国") {
        china.push(companyNode);
      } else {
        // 非中国公司都归为海外
        overseas.push(companyNode);
      }
    });

    return { chinaCompanies: china, overseasCompanies: overseas };
  }, [treeData]);

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
      {/* 左右分栏展示 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 左侧：中国公司 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-red-200">
            <span className="text-2xl">🇨🇳</span>
            <h3 className="text-lg font-bold text-gray-800">中国公司</h3>
            <span className="text-sm text-gray-500">
              ({chinaCompanies.length})
            </span>
          </div>
          <div className="space-y-1">
            {chinaCompanies.length > 0 ? (
              chinaCompanies.map((node) => (
                <TreeNode key={node.id} node={node} level={0} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                暂无中国公司数据
              </div>
            )}
          </div>
        </div>

        {/* 右侧：海外公司 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-200">
            <span className="text-2xl">�</span>
            <h3 className="text-lg font-bold text-gray-800">海外公司</h3>
            <span className="text-sm text-gray-500">
              ({overseasCompanies.length})
            </span>
          </div>
          <div className="space-y-1">
            {overseasCompanies.length > 0 ? (
              overseasCompanies.map((node) => (
                <TreeNode key={node.id} node={node} level={0} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                暂无海外公司数据
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
