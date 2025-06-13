/**
 * LoRA 秩相关的计算工具函数
 * 包含各种指标的计算逻辑和数据生成
 */

import { RankMetrics, ConceptExample, RecommendationInput, Recommendation } from '../types';

// 根据秩值计算各项指标
export function calculateMetrics(rank: number): RankMetrics {
  // 参数数量：大致线性增长，基础模型为7B
  const parameterCount = Math.round((rank * 0.15 + 1) * 100) / 100;
  
  // 表达能力：对数增长，有上限
  const expressivePower = Math.min(100, Math.round(20 + 60 * Math.log(rank + 1) / Math.log(65)));
  
  // 显存使用量：近似线性增长
  const memoryUsage = Math.round((8 + rank * 0.03) * 100) / 100;
  
  // 过拟合风险：随秩增加而增加，但有阈值效应
  const overfittingRisk = Math.min(95, Math.round(10 + rank * 1.2 + (rank > 32 ? (rank - 32) * 0.5 : 0)));
  
  // 训练稳定性：随秩增加而降低
  const trainingStability = Math.max(20, Math.round(95 - rank * 0.8));

  return {
    rank,
    parameterCount,
    expressivePower,
    memoryUsage,
    overfittingRisk,
    trainingStability
  };
}

// 生成指定范围内的指标数据
export function generateMetricsRange(minRank: number = 1, maxRank: number = 64): RankMetrics[] {
  const data: RankMetrics[] = [];
  const step = Math.max(1, Math.floor((maxRank - minRank) / 20));
  
  for (let rank = minRank; rank <= maxRank; rank += step) {
    data.push(calculateMetrics(rank));
  }
  
  // 确保包含终点
  if (data[data.length - 1].rank !== maxRank) {
    data.push(calculateMetrics(maxRank));
  }
  
  return data;
}

// 概念示例数据
export const conceptExamples: ConceptExample[] = [
  {
    rank: 4,
    title: "保守型学习",
    description: "像是只掌握3-4种解题模板，学习稳定但灵活性有限",
    advantages: ["训练稳定", "不容易过拟合", "显存友好"],
    disadvantages: ["表达能力有限", "难以处理复杂任务"],
    useCase: "简单的风格迁移、基础文本生成"
  },
  {
    rank: 16,
    title: "平衡型学习",
    description: "掌握十几种思维方式，是效果与效率的最佳平衡点",
    advantages: ["效果与效率平衡", "适用性广", "风险可控"],
    disadvantages: ["某些极复杂任务可能力不从心"],
    useCase: "大多数微调任务的首选，日常应用"
  },
  {
    rank: 64,
    title: "强表达型学习",
    description: "掌握数十种解题思路，可以灵活应对复杂场景",
    advantages: ["强大的表达能力", "能处理复杂任务", "细腻的特征捕获"],
    disadvantages: ["容易过拟合", "显存消耗较大", "训练不稳定"],
    useCase: "复杂的多模态任务、精细的风格控制"
  }
];

// 根据需求推荐秩值
export function getRecommendation(input: RecommendationInput): Recommendation {
  let baseRank = 16; // 默认推荐值
  let reasoning = "";
  
  // 根据数据集大小调整
  if (input.datasetSize === 'small') {
    baseRank -= 4;
    reasoning += "小数据集建议降低秩值以避免过拟合; ";
  } else if (input.datasetSize === 'large') {
    baseRank += 8;
    reasoning += "大数据集可以支持更高的秩值; ";
  }
  
  // 根据任务复杂度调整
  if (input.taskComplexity === 'simple') {
    baseRank -= 4;
    reasoning += "简单任务无需过高的表达能力; ";
  } else if (input.taskComplexity === 'complex') {
    baseRank += 8;
    reasoning += "复杂任务需要更强的表达能力; ";
  }
  
  // 根据显存限制调整
  if (input.memoryConstraint === 'low') {
    baseRank = Math.min(baseRank, 8);
    reasoning += "显存限制建议使用较低秩值; ";
  } else if (input.memoryConstraint === 'high') {
    baseRank += 4;
    reasoning += "显存充足可以使用更高秩值; ";
  }
  
  // 确保在合理范围内
  const suggestedRank = Math.max(4, Math.min(64, baseRank));
  
  // 生成备选方案
  const alternatives = [
    Math.max(4, suggestedRank - 4),
    suggestedRank,
    Math.min(64, suggestedRank + 8)
  ].filter((rank, index, arr) => arr.indexOf(rank) === index);
  
  return {
    suggestedRank,
    reasoning: reasoning.trim(),
    alternatives
  };
}
