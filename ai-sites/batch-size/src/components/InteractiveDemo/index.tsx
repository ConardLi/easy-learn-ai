/**
 * 交互式演示组件
 * 允许用户调整参数并实时看到效果
 */
import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveDemoProps {
  perDeviceBatchSize: number;
  setPerDeviceBatchSize: (value: number) => void;
  gradientAccumulationSteps: number;
  setGradientAccumulationSteps: (value: number) => void;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  perDeviceBatchSize,
  setPerDeviceBatchSize,
  gradientAccumulationSteps,
  setGradientAccumulationSteps
}) => {
  const effectiveBatchSize = perDeviceBatchSize * gradientAccumulationSteps;
  const memoryUsage = perDeviceBatchSize * 100; // 简化的显存使用计算
  const trainingSpeed = effectiveBatchSize * 10; // 简化的训练速度计算

  return (
    <div className="space-y-8">
      {/* 参数控制面板 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🎮 参数调节器
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 单设备批量大小 */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              单设备批量大小 (Per Device Batch Size)
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="16"
                value={perDeviceBatchSize}
                onChange={(e) => setPerDeviceBatchSize(Number(e.target.value))}
                className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1</span>
                <span className="font-bold text-blue-600 text-lg">{perDeviceBatchSize}</span>
                <span>16</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              每个GPU一次处理的样本数量
            </p>
          </div>

          {/* 梯度累积步数 */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              梯度累积步数 (Gradient Accumulation Steps)
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="16"
                value={gradientAccumulationSteps}
                onChange={(e) => setGradientAccumulationSteps(Number(e.target.value))}
                className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1</span>
                <span className="font-bold text-purple-600 text-lg">{gradientAccumulationSteps}</span>
                <span>16</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              累积多少步后进行参数更新
            </p>
          </div>
        </div>
      </motion.div>

      {/* 效果展示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 有效批量大小 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="text-lg font-semibold mb-2">有效批量大小</h3>
            <div className="text-3xl font-bold mb-2">{effectiveBatchSize}</div>
            <p className="text-blue-100 text-sm">
              {perDeviceBatchSize} × {gradientAccumulationSteps}
            </p>
          </div>
        </motion.div>

        {/* 显存使用 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">💾</div>
            <h3 className="text-lg font-semibold mb-2">显存使用</h3>
            <div className="text-3xl font-bold mb-2">{memoryUsage}MB</div>
            <div className="w-full bg-red-300 rounded-full h-3 mb-2">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${Math.min(memoryUsage / 16, 100)}%` }}
              ></div>
            </div>
            <p className="text-red-100 text-sm">
              {memoryUsage > 800 ? '显存较高' : '显存适中'}
            </p>
          </div>
        </motion.div>

        {/* 训练效率 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold mb-2">训练效率</h3>
            <div className="text-3xl font-bold mb-2">{trainingSpeed}</div>
            <div className="w-full bg-green-300 rounded-full h-3 mb-2">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${Math.min(trainingSpeed / 200, 100)}%` }}
              ></div>
            </div>
            <p className="text-green-100 text-sm">
              批量越大效率越高
            </p>
          </div>
        </motion.div>
      </div>

      {/* 实时建议 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-blue-500"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          智能建议
        </h3>
        <div className="space-y-2 text-gray-700">
          {memoryUsage > 800 && (
            <p className="text-orange-600">
              ⚠️ 显存使用较高，建议降低单设备批量大小或增加梯度累积步数
            </p>
          )}
          {effectiveBatchSize < 8 && (
            <p className="text-blue-600">
              📈 有效批量大小较小，可能导致训练不稳定，建议增加梯度累积步数
            </p>
          )}
          {effectiveBatchSize > 64 && (
            <p className="text-purple-600">
              🎯 有效批量大小较大，训练稳定但可能过拟合，注意监控验证性能
            </p>
          )}
          {memoryUsage <= 800 && effectiveBatchSize >= 8 && effectiveBatchSize <= 64 && (
            <p className="text-green-600">
              ✅ 当前参数配置合理，在显存使用和训练效果之间取得了良好平衡
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveDemo;
