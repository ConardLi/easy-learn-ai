/**
 * 微调方法比较表格组件
 * 提供三种微调方法的关键指标对比
 */
import React from 'react';
import { motion } from 'framer-motion';

export const ComparisonTable: React.FC = () => {
  // 定义比较数据
  const comparisons = [
    {
      aspect: "参数数量",
      full: { value: "100%", description: "所有参数都参与训练" },
      freeze: { value: "10-50%", description: "仅顶层参数参与训练" },
      lora: { value: "<1%", description: "只训练低秩适配矩阵" }
    },
    {
      aspect: "内存消耗",
      full: { value: "高", description: "需要存储所有参数的梯度" },
      freeze: { value: "中", description: "仅需存储部分参数梯度" },
      lora: { value: "低", description: "只存储少量适配器参数梯度" }
    },
    {
      aspect: "训练速度",
      full: { value: "慢", description: "更新所有参数，计算量大" },
      freeze: { value: "中", description: "更新部分参数，速度适中" },
      lora: { value: "快", description: "仅更新小量参数，速度快" }
    },
    {
      aspect: "存储需求",
      full: { value: "高", description: "每个任务需保存完整模型" },
      freeze: { value: "高", description: "仍需保存完整模型" },
      lora: { value: "低", description: "只需保存小型适配器" }
    },
    {
      aspect: "性能上限",
      full: { value: "最高", description: "理论上能达到最佳性能" },
      freeze: { value: "中高", description: "取决于冻结策略" },
      lora: { value: "中高", description: "接近全参数微调但有差距" }
    },
    {
      aspect: "灾难性遗忘",
      full: { value: "高风险", description: "可能丢失预训练知识" },
      freeze: { value: "低风险", description: "底层知识得到保留" },
      lora: { value: "极低风险", description: "原始参数完全保留" }
    },
    {
      aspect: "多任务支持",
      full: { value: "困难", description: "每个任务需要一个完整模型" },
      freeze: { value: "中等", description: "通常仍需一个模型一个任务" },
      lora: { value: "简单", description: "只需切换适配器即可切换任务" }
    },
    {
      aspect: "实现复杂度",
      full: { value: "简单", description: "直接训练全部参数" },
      freeze: { value: "中等", description: "需要选择冻结策略" },
      lora: { value: "较复杂", description: "需要实现低秩适配架构" }
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                比较指标
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                Full Parameter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-50">
                Freeze
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-purple-50">
                LoRA
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comparisons.map((row, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.aspect}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue-50 bg-opacity-30">
                  <div className="font-semibold text-blue-700">{row.full.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{row.full.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-green-50 bg-opacity-30">
                  <div className="font-semibold text-green-700">{row.freeze.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{row.freeze.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-purple-50 bg-opacity-30">
                  <div className="font-semibold text-purple-700">{row.lora.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{row.lora.description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-gray-50 border-t">
        <h3 className="text-lg font-bold text-gray-700 mb-2">总结</h3>
        <p className="text-gray-600">
          各微调方法各有优劣势：全参数微调性能最优但计算资源需求高；参数冻结提供了性能和效率的平衡；
          LoRA则在极高的参数效率下提供接近全参数微调的性能。选择何种方法应基于具体任务需求、可用资源和性能要求。
        </p>
      </div>
    </motion.div>
  );
};