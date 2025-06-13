/**
 * 训练模拟器主组件
 * 整合所有子组件，提供完整的训练模拟体验
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap } from 'lucide-react';
import { useTrainingSimulation } from '../../hooks/useTrainingSimulation';
import { LossChart } from '../LossChart';
import { AnimatedProgress } from '../AnimatedProgress';

export function TrainingSimulator() {
  const {
    epochs,
    setEpochs,
    currentEpoch,
    isTraining,
    trainingData,
    speed,
    setSpeed,
    startTraining,
    stopTraining,
    resetTraining,
    trainingStatus
  } = useTrainingSimulation();

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <Zap className="mr-3 text-yellow-500" size={36} />
          交互式训练模拟器
        </h2>
        <p className="text-gray-600 text-lg">
          调整训练轮数，观察模型训练过程中的变化
        </p>
      </motion.div>

      {/* 参数设置 */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="mr-2 text-purple-600" />
          训练参数设置
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              训练轮数 (Epochs): {epochs}
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={epochs}
              onChange={(e) => setEpochs(Number(e.target.value))}
              disabled={isTraining}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1轮</span>
              <span>15轮</span>
            </div>
            <div className="mt-2 text-sm">
              {epochs <= 2 && (
                <span className="text-red-600 font-medium">⚠️ 可能欠拟合</span>
              )}
              {epochs >= 3 && epochs <= 6 && (
                <span className="text-green-600 font-medium">✅ 推荐范围</span>
              )}
              {epochs >= 7 && (
                <span className="text-purple-600 font-medium">⚠️ 可能过拟合</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              训练速度: {speed === 500 ? '快' : speed === 1000 ? '中' : '慢'}
            </label>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isTraining}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={2000}>慢速 (2秒/轮)</option>
              <option value={1000}>中速 (1秒/轮)</option>
              <option value={500}>快速 (0.5秒/轮)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* 训练进度 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <AnimatedProgress
          currentEpoch={currentEpoch}
          totalEpochs={epochs}
          isTraining={isTraining}
          trainingStatus={trainingStatus}
          onStart={startTraining}
          onStop={stopTraining}
          onReset={resetTraining}
        />
      </motion.div>

      {/* 损失图表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <LossChart data={trainingData} trainingStatus={trainingStatus} />
      </motion.div>

      {/* 训练建议 */}
      {trainingData.length > 0 && (
        <motion.div
          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">💡 训练建议</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl">
              <h4 className="font-medium text-gray-800 mb-2">欠拟合（太少轮数）</h4>
              <p className="text-sm text-gray-600">
                模型没有充分学习，就像只复习了一遍教材，考试时可能表现不佳
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <h4 className="font-medium text-gray-800 mb-2">理想状态（3-6轮）</h4>
              <p className="text-sm text-gray-600">
                模型学习充分且泛化能力好，就像合理复习后既掌握知识又能应对新题目
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <h4 className="font-medium text-gray-800 mb-2">过拟合（太多轮数）</h4>
              <p className="text-sm text-gray-600">
                模型记住训练数据但泛化差，就像死记硬背教材但不会做变式题
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
