/**
 * 详细对比表格组件
 * 展示三种技术在各个维度的详细对比信息
 */
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ComparisonRow {
  dimension: string;
  longtext: {
    value: string;
    status: 'good' | 'medium' | 'poor';
  };
  knowledge: {
    value: string;
    status: 'good' | 'medium' | 'poor';
  };
  finetune: {
    value: string;
    status: 'good' | 'medium' | 'poor';
  };
}

const DetailComparison: React.FC = () => {
  const comparisonData: ComparisonRow[] = [
    {
      dimension: '核心目标',
      longtext: { value: '理解和生成长篇内容', status: 'good' },
      knowledge: { value: '提供背景知识，增强回答能力', status: 'good' },
      finetune: { value: '优化模型在特定任务或领域的表现', status: 'good' }
    },
    {
      dimension: '连贯性',
      longtext: { value: '连贯性强，适合复杂任务', status: 'good' },
      knowledge: { value: '中等，依赖检索质量', status: 'medium' },
      finetune: { value: '强，针对性优化', status: 'good' }
    },
    {
      dimension: '资源消耗',
      longtext: { value: '资源消耗大，上下文限制', status: 'poor' },
      knowledge: { value: '中等，需维护检索系统', status: 'medium' },
      finetune: { value: '高，训练算力需求大', status: 'poor' }
    },
    {
      dimension: '灵活性',
      longtext: { value: '中等，适合单次长内容分析', status: 'medium' },
      knowledge: { value: '高，可扩展多知识库', status: 'good' },
      finetune: { value: '低，需重新训练适应变化', status: 'poor' }
    },
    {
      dimension: '实时性',
      longtext: { value: '静态，依赖输入内容', status: 'medium' },
      knowledge: { value: '动态，知识库可随时更新', status: 'good' },
      finetune: { value: '静态，训练后固定', status: 'poor' }
    },
    {
      dimension: '数据依赖',
      longtext: { value: '无需额外数据', status: 'good' },
      knowledge: { value: '依赖结构化知识库', status: 'medium' },
      finetune: { value: '需要大量标注数据', status: 'poor' }
    },
    {
      dimension: '适用场景',
      longtext: { value: '写作助手、阅读理解', status: 'good' },
      knowledge: { value: '智能客服、问答系统', status: 'good' },
      finetune: { value: '专业领域、特定任务、风格定制', status: 'good' }
    }
  ];

  const getStatusIcon = (status: 'good' | 'medium' | 'poor') => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'poor':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: 'good' | 'medium' | 'poor') => {
    switch (status) {
      case 'good':
        return 'bg-green-50 border-green-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            详细对比表格
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            全方位了解三种方法在各个维度的具体表现
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">对比维度</th>
                  <th className="px-6 py-4 text-center font-bold">长文本处理</th>
                  <th className="px-6 py-4 text-center font-bold">知识库</th>
                  <th className="px-6 py-4 text-center font-bold">微调</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {row.dimension}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`p-3 rounded-xl border ${getStatusColor(row.longtext.status)}`}>
                        <div className="flex items-start space-x-2">
                          {getStatusIcon(row.longtext.status)}
                          <span className="text-sm text-gray-700 leading-relaxed">
                            {row.longtext.value}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`p-3 rounded-xl border ${getStatusColor(row.knowledge.status)}`}>
                        <div className="flex items-start space-x-2">
                          {getStatusIcon(row.knowledge.status)}
                          <span className="text-sm text-gray-700 leading-relaxed">
                            {row.knowledge.value}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`p-3 rounded-xl border ${getStatusColor(row.finetune.status)}`}>
                        <div className="flex items-start space-x-2">
                          {getStatusIcon(row.finetune.status)}
                          <span className="text-sm text-gray-700 leading-relaxed">
                            {row.finetune.value}
                          </span>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">优秀表现</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600">中等表现</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-gray-600">需要改进</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailComparison;
