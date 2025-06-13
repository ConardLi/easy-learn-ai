/**
 * LoRA 秩学习网站的类型定义
 * 定义了各种数据结构和组件Props类型
 */

export interface RankMetrics {
  rank: number;
  parameterCount: number; // 参数数量（万个）
  expressivePower: number; // 表达能力评分 (0-100)
  memoryUsage: number; // 显存使用量 (GB)
  overfittingRisk: number; // 过拟合风险 (0-100)
  trainingStability: number; // 训练稳定性 (0-100)
}

export interface ConceptExample {
  rank: number;
  title: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  useCase: string;
}

export interface RecommendationInput {
  datasetSize: 'small' | 'medium' | 'large';
  taskComplexity: 'simple' | 'medium' | 'complex';
  memoryConstraint: 'low' | 'medium' | 'high';
}

export interface Recommendation {
  suggestedRank: number;
  reasoning: string;
  alternatives: number[];
}
