/**
 * 树形节点组件
 * 递归渲染树形结构的每个节点
 */

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Building2,
  Shield,
  Cpu,
  GitBranch,
  Calendar,
} from "lucide-react";
import { TreeNode as TreeNodeType } from "../../utils/modelTreeUtils";
import { ModelDetailModal } from "./ModelDetailModal";

interface TreeNodeProps {
  node: TreeNodeType;
  level: number;
  parentExpanded?: boolean; // 父节点是否展开
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  parentExpanded = false,
}) => {
  // 默认展开公司层级，或者当父节点是status类型且展开时，自动展开
  const [isExpanded, setIsExpanded] = useState(
    level === 0 || (level === 2 && parentExpanded)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 当父节点展开状态改变时，更新子节点状态
  React.useEffect(() => {
    if (level === 2 && parentExpanded) {
      setIsExpanded(true);
    }
  }, [parentExpanded, level]);

  const hasChildren = node.children && node.children.length > 0;

  // 格式化日期
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date
        .toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");
    } catch {
      return dateStr;
    }
  };

  // 获取国家图标
  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      美国: "🇺🇸",
      中国: "🇨🇳",
    };
    return flags[country] || "🌍";
  };

  // 获取节点图标
  const getIcon = () => {
    switch (node.type) {
      case "company":
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case "status":
        return <Shield className="w-4 h-4 text-green-600" />;
      case "model":
        return null; // 模型节点显示公司图标
      case "submodel":
        return <GitBranch className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Cpu className="w-4 h-4 text-gray-600" />;
    }
  };

  // 获取节点样式
  const getNodeStyle = () => {
    const baseStyle =
      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200";

    switch (node.type) {
      case "company":
        return `${baseStyle} hover:bg-blue-50 cursor-pointer font-semibold text-gray-800`;
      case "status":
        return `${baseStyle} hover:bg-green-50 cursor-pointer font-medium text-gray-700`;
      case "model":
        return `${baseStyle} hover:bg-purple-50 cursor-pointer text-gray-700`;
      case "submodel":
        return `${baseStyle} hover:bg-purple-50 cursor-pointer text-gray-700`; // 与父模型字体大小一致
      default:
        return baseStyle;
    }
  };

  // 处理节点点击
  const handleNodeClick = () => {
    if ((node.type === "model" || node.type === "submodel") && node.model) {
      // 有实际模型数据的节点：打开详情弹框
      setIsModalOpen(true);
    } else if (hasChildren) {
      // 其他有子节点的节点（包括虚拟父节点）：展开/收起
      setIsExpanded(!isExpanded);
    }
  };

  // 处理展开/收起按钮点击
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  console.log(111, node);

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

        {/* 公司层级显示国家图标（在图标之前） */}
        {node.type === "company" &&
          node.children &&
          node.children.length > 0 && (
            <span className="text-lg flex-shrink-0 mr-1">
              {getCountryFlag(node.country || "")}
            </span>
          )}

        {/* 节点图标 */}
        {node.type === "model" || node.type === "submodel" ? (
          // 模型节点显示公司图标，子模型添加缩进体现层级
          <div className="flex items-center gap-2 flex-shrink-0">
            {node.type === "submodel" && (
              <div className="w-4 border-l-2 border-b-2 border-gray-300 h-6 -mb-3" />
            )}
            {node.model ? (
              <img
                src={`/imgs/${node.model.company}.png`}
                alt={node.model.company}
                className="w-6 h-6 rounded-full object-cover border border-gray-200 flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              // 虚拟父节点（parent是代称分类）显示文件夹图标
              <GitBranch className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </div>
        ) : (
          <div className="flex-shrink-0">{getIcon()}</div>
        )}

        {/* 节点名称和发布时间 */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="truncate">{node.name}</span>

          {/* 模型发布时间（仅模型和子模型显示） - 次要标签样式 */}
          {(node.type === "model" || node.type === "submodel") &&
            node.model && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 flex-shrink-0">
                <Calendar className="w-3 h-3" />
                {formatDate(node.model.releaseDate)}
              </span>
            )}
        </div>

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
              parentExpanded={node.type === "status" && isExpanded}
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
