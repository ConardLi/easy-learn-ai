/**
 * 树形节点组件
 * 递归渲染树形结构的每个节点
 */

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Building2, Shield, Cpu, GitBranch } from 'lucide-react';
import { TreeNode as TreeNodeType } from '../../utils/modelTreeUtils';
import { ModelDetailModal } from './ModelDetailModal';

interface TreeNodeProps {
  node: TreeNodeType;
  level: number;
  parentExpanded?: boolean; // 父节点是否展开
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node, level, parentExpanded = false }) => {
  // 默认展开公司层级，或者当父节点是status类型且展开时，自动展开
  const [isExpanded, setIsExpanded] = useState(level === 0 || (level === 2 && parentExpanded));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 当父节点展开状态改变时，更新子节点状态
  React.useEffect(() => {
    if (level === 2 && parentExpanded) {
      setIsExpanded(true);
    }
  }, [parentExpanded, level]);

  const hasChildren = node.children && node.children.length > 0;

  // 获取节点图标
  const getIcon = () => {
    switch (node.type) {
      case 'company':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'status':
        return <Shield className="w-4 h-4 text-green-600" />;
      case 'model':
        return null; // 模型节点显示公司图标
      case 'submodel':
        return <GitBranch className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Cpu className="w-4 h-4 text-gray-600" />;
    }
  };

  // 获取节点样式
  const getNodeStyle = () => {
    const baseStyle = 'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200';
    
    switch (node.type) {
      case 'company':
        return `${baseStyle} hover:bg-blue-50 cursor-pointer font-semibold text-gray-800`;
      case 'status':
        return `${baseStyle} hover:bg-green-50 cursor-pointer font-medium text-gray-700`;
      case 'model':
        return `${baseStyle} hover:bg-purple-50 cursor-pointer text-gray-700`;
      case 'submodel':
        return `${baseStyle} hover:bg-purple-50 cursor-pointer text-gray-700`; // 与父模型字体大小一致
      default:
        return baseStyle;
    }
  };

  // 处理节点点击
  const handleNodeClick = () => {
    if (node.type === 'model' || node.type === 'submodel') {
      // 模型节点：打开详情弹框
      setIsModalOpen(true);
    } else if (hasChildren) {
      // 其他有子节点的节点：展开/收起
      setIsExpanded(!isExpanded);
    }
  };

  // 处理展开/收起按钮点击
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* 节点内容 */}
      <div
        className={getNodeStyle()}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={handleNodeClick}
      >
        {/* 展开/收起按钮或占位符 */}
        {hasChildren ? (
          <button
            onClick={handleToggleClick}
            className="flex-shrink-0 hover:bg-gray-200 rounded p-0.5 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        ) : (
          // 所有节点都显示占位符以保持对齐
          <div className="w-5 flex-shrink-0" />
        )}

        {/* 节点图标 */}
        {node.type === 'model' || node.type === 'submodel' ? (
          // 模型节点显示公司图标，子模型添加缩进体现层级
          <div className="flex items-center gap-2 flex-shrink-0">
            {node.type === 'submodel' && (
              <div className="w-4 border-l-2 border-b-2 border-gray-300 h-6 -mb-3" />
            )}
            {node.model && (
              <img
                src={`/imgs/${node.model.company}.png`}
                alt={node.model.company}
                className="w-6 h-6 rounded-full object-cover border border-gray-200 flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
        ) : (
          <div className="flex-shrink-0">{getIcon()}</div>
        )}

        {/* 节点名称 */}
        <span className="flex-1 truncate">{node.name}</span>

        {/* 子节点数量 */}
        {node.count !== undefined && node.count > 0 && (
          <span className="flex-shrink-0 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            {node.count}
          </span>
        )}
      </div>

      {/* 子节点 */}
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode 
              key={child.id} 
              node={child} 
              level={level + 1}
              parentExpanded={node.type === 'status' && isExpanded}
            />
          ))}
        </div>
      )}

      {/* 详情弹框 */}
      {node.model && (
        <ModelDetailModal
          model={node.model}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
