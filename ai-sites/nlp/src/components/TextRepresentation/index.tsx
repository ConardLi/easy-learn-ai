/**
 * 文本表示发展历程组件
 * 展示从传统方法到现代深度学习的文本表示技术
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Brain, Database, Zap, Layers } from 'lucide-react';

const TextRepresentation: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState('vsm');

  const methods = [
    {
      id: 'vsm',
      title: '向量空间模型 (VSM)',
      period: '1970年代',
      description: '基于词频的稀疏向量表示',
      icon: Database,
      color: 'from-red-500 to-pink-500',
      features: ['高维稀疏', '词袋模型', '忽略词序', 'TF-IDF权重']
    },
    {
      id: 'ngram',
      title: 'N-gram 模型',
      period: '1980-1990年代',
      description: '基于统计的语言建模',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      features: ['马尔可夫假设', '条件概率', '局部上下文', '数据稀疏问题']
    },
    {
      id: 'word2vec',
      title: 'Word2Vec',
      period: '2013年',
      description: '密集词向量表示的突破',
      icon: Brain,
      color: 'from-green-500 to-emerald-500',
      features: ['密集表示', '语义相似性', 'CBOW/Skip-gram', '词汇类比']
    },
    {
      id: 'elmo',
      title: 'ELMo',
      period: '2018年',
      description: '上下文相关的动态词向量',
      icon: Zap,
      color: 'from-purple-500 to-indigo-500',
      features: ['上下文敏感', '双向LSTM', '预训练+微调', '一词多义']
    }
  ];

  // 演示数据
  const demoText = "雍和宫的荷花很美";
  const vocabulary = ["雍和宫", "的", "荷花", "很", "美", "今天", "天气", "不错", "...", "其他词汇"];

  // VSM 表示数据
  const vsmData = vocabulary.map((word, index) => ({
    word: word.length > 4 ? word.slice(0, 4) + '...' : word,
    value: ["雍和宫", "的", "荷花", "很", "美"].includes(word) ? 1 : 0
  }));

  // Word2Vec 相似性数据
  const word2vecSimilarity = [
    { word: "荷花", similarity: 95 },
    { word: "莲花", similarity: 88 },
    { word: "花朵", similarity: 75 },
    { word: "美丽", similarity: 65 },
    { word: "天气", similarity: 20 }
  ];

  // 性能对比数据
  const performanceData = [
    { method: 'VSM', accuracy: 65, efficiency: 90, semantic: 30 },
    { method: 'N-gram', accuracy: 70, efficiency: 85, semantic: 40 },
    { method: 'Word2Vec', accuracy: 82, efficiency: 75, semantic: 85 },
    { method: 'ELMo', accuracy: 92, efficiency: 60, semantic: 95 }
  ];

  const renderMethodDemo = () => {
    switch (activeMethod) {
      case 'vsm':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
              <h4 className="font-semibold text-gray-800 mb-4">VSM 稀疏向量演示</h4>
              <p className="text-sm text-gray-600 mb-4">
                文本: "{demoText}" → 在16384维词汇表中仅5个位置为1
              </p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vsmData}>
                    <XAxis dataKey="word" />
                    <YAxis />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                      {vsmData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.value ? '#EF4444' : '#E5E7EB'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                ⚠️ 稀疏率: 99.97% (16379/16384 为零值)
              </div>
            </div>
          </div>
        );
        
      case 'word2vec':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-4">Word2Vec 语义相似性</h4>
              <p className="text-sm text-gray-600 mb-4">
                查询词: "荷花" → 找到语义相似的词汇
              </p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={word2vecSimilarity}>
                    <XAxis dataKey="word" />
                    <YAxis />
                    <Bar dataKey="similarity" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-xs text-green-600">
                ✅ 密集表示: 300维向量，每维都有意义
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h5 className="font-medium text-gray-800 mb-3">词汇类比示例</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>国王 - 男人 + 女人 =</span>
                  <span className="font-semibold text-green-600">王后</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>北京 - 中国 + 法国 =</span>
                  <span className="font-semibold text-green-600">巴黎</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <p className="text-gray-600">选择一个方法查看详细演示</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          文本表示技术演进
        </h2>
        <p className="text-xl text-gray-600">
          从稀疏向量到密集表示的技术变革
        </p>
      </motion.div>

      {/* 方法选择器 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {methods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.button
              key={method.id}
              onClick={() => setActiveMethod(method.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                activeMethod === method.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-4 mx-auto`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{method.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{method.period}</p>
              <p className="text-xs text-gray-600">{method.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* 选中方法的详细信息 */}
      <AnimatePresence mode="wait">
        {activeMethod && (
          <motion.div
            key={activeMethod}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const method = methods.find(m => m.id === activeMethod);
              if (!method) return null;
              
              return (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{method.title}</h3>
                    <p className="text-gray-600">{method.description}</p>
                  </div>

                  {/* 特性标签 */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {method.features.map((feature, index) => (
                      <motion.span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${method.color} text-white`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* 方法演示 */}
                  {renderMethodDemo()}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 性能对比图表 */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          各方法性能对比
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['accuracy', 'efficiency', 'semantic'].map((metric, index) => {
            const metricNames = {
              accuracy: '准确性',
              efficiency: '效率',
              semantic: '语义理解'
            };
            
            return (
              <div key={metric} className="space-y-4">
                <h4 className="text-lg font-semibold text-center text-gray-800">
                  {metricNames[metric as keyof typeof metricNames]}
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <XAxis dataKey="method" />
                      <YAxis domain={[0, 100]} />
                      <Bar 
                        dataKey={metric} 
                        fill={metric === 'accuracy' ? '#3B82F6' : metric === 'efficiency' ? '#10B981' : '#8B5CF6'}
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          💡 随着技术发展，文本表示在语义理解能力上显著提升，但计算效率有所下降
        </div>
      </motion.div>
    </div>
  );
};

export default TextRepresentation;
