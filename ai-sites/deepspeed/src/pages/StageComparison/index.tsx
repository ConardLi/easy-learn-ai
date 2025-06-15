/**
 * Stage 对比页面 - 通过"包饺子"类比展示不同 Stage 的工作方式
 * 包含交互式动画演示
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Users, Zap, Layers, Target, MemoryStick } from 'lucide-react';
import { DumplingAnimation } from './DumplingAnimation';

const stages = [
  {
    stage: 0,
    title: 'Stage 0 (默认)',
    subtitle: '每张卡独立全包',
    icon: <Users className="w-6 h-6" />,
    color: 'from-gray-500 to-gray-600',
    description: '每张卡都存完整的模型参数、算前向、算反向、更新参数',
    analogy: '4 个人各自包 4 盘饺子，每人都要准备 1 份馅、1 份面皮',
    pros: ['简单易用', '卡间无通信', '训练速度快'],
    cons: ['显存占用大', '无法突破单卡限制'],
    memoryUsage: 30.5,
    gpuCount: 2,
    memoryPerGpu: 15.25
  },
  {
    stage: 1,
    title: 'Stage 1',
    subtitle: '参数共享，计算独立',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    description: '参数只存 1 份，放在所有卡上，但每张卡各自计算',
    analogy: '4 个人共用 1 份馅，但各自擀面皮、包饺子',
    pros: ['参数内存节省', '计算仍然独立'],
    cons: ['梯度和优化器仍占用大量内存'],
    memoryUsage: 25.2,
    gpuCount: 2,
    memoryPerGpu: 12.6
  },
  {
    stage: 2,
    title: 'Stage 2',
    subtitle: '参数和优化器分离',
    icon: <Layers className="w-6 h-6" />,
    color: 'from-green-500 to-green-600',
    description: '参数共享，优化器状态分布存储',
    analogy: '2个人专门管馅和调料（优化器），2个人负责擀面皮、包饺子',
    pros: ['进一步节省内存', '优化器分布存储'],
    cons: ['需要更多卡间通信'],
    memoryUsage: 20.8,
    gpuCount: 2,
    memoryPerGpu: 10.4
  },
  {
    stage: 3,
    title: 'Stage 3',
    subtitle: '极致分工，参数流动',
    icon: <Target className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    description: '模型按层拆分，参数按需流动，实现最大内存节省',
    analogy: '包饺子流水线：卡1剁馅，卡2擀皮，卡3包饺子，卡4煮饺子',
    pros: ['最大内存节省', '支持超大模型', '真正的分布式'],
    cons: ['通信开销最大', '实现复杂度高'],
    memoryUsage: 16.3,
    gpuCount: 2,
    memoryPerGpu: 8.15
  }
];

export const StageComparison: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentStage = stages[selectedStage];

  const handleStageSelect = (index: number) => {
    setSelectedStage(index);
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          DeepSpeed Stage 对比
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          通过"包饺子"类比，理解不同 Stage 的分工模式和特点
        </p>
      </motion.div>

      {/* Stage Selector */}
      <div className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <motion.button
              key={stage.stage}
              onClick={() => handleStageSelect(index)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedStage === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center bg-gradient-to-r ${stage.color}`}>
                <span className="text-white font-bold">
                  {stage.stage}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-800">
                Stage {stage.stage}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {stage.subtitle}
              </div>
              <div className="text-xs text-blue-600 mt-2 font-medium">
                {stage.memoryPerGpu.toFixed(1)}G/卡
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stage Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Info Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentStage.color} flex items-center justify-center text-white mr-4`}>
                {currentStage.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {currentStage.title}
                </h3>
                <p className="text-gray-600">
                  {currentStage.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">工作原理</h4>
                <p className="text-gray-600 leading-relaxed">
                  {currentStage.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">包饺子类比</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-700 leading-relaxed">
                    🥟 {currentStage.analogy}
                  </p>
                </div>
              </div>

              {/* Memory Usage Stats */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <MemoryStick className="w-4 h-4 mr-2" />
                  显存消耗 (实际数据)
                </h4>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">总显存消耗:</span>
                    <span className="font-bold text-gray-800">{currentStage.memoryUsage}G</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">单卡显存:</span>
                    <span className="font-bold text-gray-800">{currentStage.memoryPerGpu.toFixed(1)}G</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">GPU 数量:</span>
                    <span className="font-bold text-gray-800">{currentStage.gpuCount} × RTX 4090D (24G)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r ${
                        currentStage.memoryPerGpu > 20 ? 'from-red-500 to-red-600' :
                        currentStage.memoryPerGpu > 15 ? 'from-yellow-500 to-orange-500' :
                        'from-green-500 to-green-600'
                      }`}
                      style={{ width: `${(currentStage.memoryPerGpu / 24) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    单卡利用率: {((currentStage.memoryPerGpu / 24) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">优点</h4>
                  <ul className="space-y-1">
                    {currentStage.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">缺点</h4>
                  <ul className="space-y-1">
                    {currentStage.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Animation Panel */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-800">
                工作流程演示
              </h4>
              <button
                onClick={toggleAnimation}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isAnimating ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    暂停
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    播放
                  </>
                )}
              </button>
            </div>
            
            <DumplingAnimation 
              stage={currentStage.stage}
              isAnimating={isAnimating}
              memoryUsage={currentStage.memoryPerGpu}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Memory Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          显存消耗对比 (单卡)
        </h2>
        
        <div className="grid grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <div key={stage.stage} className="text-center">
              <div className={`w-full bg-gradient-to-r ${stage.color} rounded-lg p-4 mb-3`}>
                <div className="text-white font-bold text-lg">
                  Stage {stage.stage}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-800">
                  {stage.memoryPerGpu.toFixed(1)}G
                </div>
                <div className="text-sm text-gray-600">
                  ({((stage.memoryPerGpu / 24) * 100).toFixed(1)}% 利用率)
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      stage.memoryPerGpu > 20 ? 'from-red-500 to-red-600' :
                      stage.memoryPerGpu > 15 ? 'from-yellow-500 to-orange-500' :
                      'from-green-500 to-green-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: selectedStage === index ? `${(stage.memoryPerGpu / 24) * 100}%` : '0%' }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          选择建议
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🚀 追求速度时选择
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Stage 0:</strong> 单卡内存足够 (需 >15.25G)，追求最快训练速度
            </p>
            <p className="text-gray-600">
              <strong>Stage 1:</strong> 轻微内存压力 (需 >12.6G)，保持较高速度
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              💾 节省内存时选择
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Stage 2:</strong> 中等内存压力 (需 >10.4G)，平衡速度和内存
            </p>
            <p className="text-gray-600">
              <strong>Stage 3:</strong> 极大模型或内存紧张 (仅需 8.15G)，最大节省
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};