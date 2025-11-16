/**
 * 模型树形结构工具函数
 * 将扁平的模型列表转换为树形结构
 */

import { AIModel } from "../types/model";

export interface TreeNode {
  id: string;
  name: string;
  type: "company" | "status" | "model" | "submodel";
  count?: number;
  model?: AIModel;
  children?: TreeNode[];
  country?: string;
}

/**
 * 构建树形结构
 * 结构：公司 -> 开源状态 -> 父模型 -> 子模型
 */
export const buildModelTree = (models: AIModel[]): TreeNode[] => {
  // 按公司分组
  const companyMap = new Map<string, AIModel[]>();

  models.forEach((model) => {
    if (!companyMap.has(model.company)) {
      companyMap.set(model.company, []);
    }
    companyMap.get(model.company)!.push(model);
  });

  // 构建树形结构
  const tree: TreeNode[] = [];

  companyMap.forEach((companyModels, companyName) => {
    // 按开源状态分组
    const statusMap = new Map<string, AIModel[]>();

    companyModels.forEach((model) => {
      if (!statusMap.has(model.openSourceStatus)) {
        statusMap.set(model.openSourceStatus, []);
      }
      statusMap.get(model.openSourceStatus)!.push(model);
    });

    // 构建开源状态节点
    const statusNodes: TreeNode[] = [];

    statusMap.forEach((statusModels, status) => {
      // 分离父模型和子模型
      const parentModels = statusModels.filter((m) => !m.parent);
      const childModels = statusModels.filter((m) => m.parent);

      // 构建模型节点
      const modelNodes: TreeNode[] = parentModels.map((model) => {
        // 查找该模型的子模型
        const children = childModels
          .filter((child) => child.parent === model.modelName)
          .map((child) => ({
            id: `${companyName}-${status}-${model.modelName}-${child.modelName}`,
            name: child.modelName,
            type: "submodel" as const,
            model: child,
          }));

        return {
          id: `${companyName}-${status}-${model.modelName}`,
          name: model.modelName,
          type: "model" as const,
          model,
          count: children.length,
          children: children.length > 0 ? children : undefined,
        };
      });

      // 处理孤儿子模型（parent不是实际模型名称的情况）
      const orphanChildren = childModels.filter((child) => {
        // 检查是否有实际的父模型
        return !parentModels.some(
          (parent) => parent.modelName === child.parent
        );
      });

      // 按parent分组孤儿子模型
      const orphanGroups = new Map<string, AIModel[]>();
      orphanChildren.forEach((child) => {
        if (!orphanGroups.has(child.parent!)) {
          orphanGroups.set(child.parent!, []);
        }
        orphanGroups.get(child.parent!)!.push(child);
      });

      // 为每个孤儿组创建虚拟父节点
      orphanGroups.forEach((children, parentName) => {
        const virtualChildren = children.map((child) => ({
          id: `${companyName}-${status}-${parentName}-${child.modelName}`,
          name: child.modelName,
          type: "submodel" as const,
          model: child,
        }));

        modelNodes.push({
          id: `${companyName}-${status}-${parentName}`,
          name: parentName,
          type: "model" as const,
          count: virtualChildren.length,
          children: virtualChildren,
        });
      });

      statusNodes.push({
        id: `${companyName}-${status}`,
        name: status,
        type: "status",
        count: modelNodes.length,
        children: modelNodes,
      });
    });

    tree.push({
      id: companyName,
      name: companyName,
      type: "company",
      count: companyModels.length,
      children: statusNodes,
      country: companyModels[0].country,
    });
  });

  // 按公司名称排序
  return tree.sort((a, b) => a.name.localeCompare(b.name));
};
