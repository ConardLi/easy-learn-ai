/**
 * BERT模型对比组件
 * 展示BERT、RoBERTa、ALBERT等模型的特点和改进
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Minimize2, Zap, Award } from 'lucide-react';

const ModelComparison: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [comparisonView, setComparisonView] = useState<'features' | 'performance'>('features');

  const models = [
    {
      name: "BERT",
      year: 2018,
      icon: "🏆",
      color: "from-blue-500 to-blue-700",
      params: "110M / 340M",
      highlight: "开创性模型",
      features: [
        "Encoder-Only架构",
        "MLM + NSP预训练",
        "双向上下文编码",
        "12/24层Transformer"
      ],
      pros: [
        "首个双向预训练模型",
        "在11个NLP任务达到SOTA",
        "开启预训练-微调范式"
      ],
      cons: [
        "NSP任务效果存疑",
        "训练数据相对较少",
        "静态掩码策略"
      ]
    },
    {
      name: "RoBERTa",
      year: 2019,
      icon: "⚡",
      color: "from-green-500 to-green-700",
      params: "125M / 355M",
      highlight: "优化训练策略",
      features: [
        "移除NSP任务",
        "动态掩码策略",
        "更大规模数据(160GB)",
        "更长训练时间"
      ],
      pros: [
        "更好的训练数据利用",
        "显著提升下游任务性能",
        "更大的词表(50K)"
      ],
      cons: [
        "训练成本更高",
        "需要更多计算资源",
        "训练时间更长"
      ]
    },
    {
      name: "ALBERT",
      year: 2019,
      icon: "🔧",
      color: "from-purple-500 to-purple-700",
      params: "12M / 59M",
      highlight: "参数高效模型",
      features: [
        "参数共享策略",
        "Embedding参数分解",
        "SOP替代NSP",
        "更宽的隐藏层"
      ],
      pros: [
        "大幅减少参数量",
        "SOP任务更有效",
        "内存占用更少"
      ],
      cons: [
        "训练/推理速度较慢",
        "参数共享可能限制表达",
        "在某些任务上性能不如RoBERTa"
      ]
    }
  ];

  const performanceData = [
    { task: 'GLUE', BERT: 78.3, RoBERTa: 80.5, ALBERT: 82.3 },
    { task: 'SQuAD v1.1', BERT: 88.5, RoBERTa: 90.2, ALBERT: 89.8 },
    { task: 'SQuAD v2.0', BERT: 76.3, RoBERTa: 79.1, ALBERT: 82.3 },
    { task: 'RACE', BERT: 66.0, RoBERTa: 67.4, ALBERT: 69.5 }
  ];

  const radarData = [
    { metric: '性能', BERT: 85, RoBERTa: 92, ALBERT: 88 },
    { metric: '效率', BERT: 70, RoBERTa: 65, ALBERT: 95 },
    { metric: '训练成本', BERT: 80, RoBERTa: 50, ALBERT: 85 },
    { metric: '推理速度', BERT: 80, RoBERTa: 75, ALBERT: 60 },
    { metric: '参数量', BERT: 60, RoBERTa: 55, ALBERT: 90 },
    { metric: '适用性', BERT: 90, RoBERTa: 85, ALBERT: 75 }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          BERT 系列模型对比
        </h1>
        <p className="text-lg text-gray-600">
          探索BERT及其优化版本的特点和改进
        </p>
      </motion.div>

      {/* 模型选择器 */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-xl p-2 shadow-lg">
          {models.map((model, index) => (
            <button
              key={index}
              onClick={() => setSelectedModel(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                selectedModel === index
                  ? `bg-gradient-to-r ${model.color} text-white shadow-md`
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{model.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{model.name}</div>
                <div className="text-xs opacity-75">{model.year}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 模型详情 */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedModel}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className={`flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r ${models[selectedModel].color} text-white mb-6`}>
                <span className="text-3xl">{models[selectedModel].icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{models[selectedModel].name}</h2>
                  <p className="opacity-90">{models[selectedModel].highlight}</p>
                  <p className="text-sm opacity-75">参数量: {models[selectedModel].params}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Award size={16} />
                    核心特性
                  </h3>
                  <ul className="space-y-2">
                    {models[selectedModel].features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600 flex items-center gap-1">
                      <TrendingUp size={14} />
                      优势
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {models[selectedModel].pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600 flex items-center gap-1">
                      <Minimize2 size={14} />
                      不足
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {models[selectedModel].cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500">×</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 改进策略对比 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">主要改进策略</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800">RoBERTa 改进</h4>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• 去除NSP任务，专注MLM</li>
                  <li>• 动态掩码，提高数据利用率</li>
                  <li>• 10倍训练数据，更长训练时间</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-800">ALBERT 改进</h4>
                <ul className="text-sm text-purple-700 mt-2 space-y-1">
                  <li>• 参数共享，大幅减少参数</li>
                  <li>• Embedding分解，降低内存</li>
                  <li>• SOP任务，改进句子级预训练</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 性能对比 */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">性能对比</h3>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setComparisonView('performance')}
                  className={`px-4 py-2 rounded-md transition-all ${
                    comparisonView === 'performance'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  任务性能
                </button>
                <button
                  onClick={() => setComparisonView('features')}
                  className={`px-4 py-2 rounded-md transition-all ${
                    comparisonView === 'features'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  综合评价
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {comparisonView === 'performance' ? (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="task" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="BERT" fill="#3B82F6" />
                      <Bar dataKey="RoBERTa" fill="#10B981" />
                      <Bar dataKey="ALBERT" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              ) : (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="BERT" dataKey="BERT" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                      <Radar name="RoBERTa" dataKey="RoBERTa" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                      <Radar name="ALBERT" dataKey="ALBERT" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 选择建议 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">选择建议</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800">选择 BERT</h4>
                <p className="text-blue-600 text-sm">
                  如果需要稳定可靠的基线模型，或者计算资源有限
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800">选择 RoBERTa</h4>
                <p className="text-green-600 text-sm">
                  如果追求最佳性能，有充足的计算资源
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800">选择 ALBERT</h4>
                <p className="text-purple-600 text-sm">
                  如果需要参数高效的模型，内存和存储有限制
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;
