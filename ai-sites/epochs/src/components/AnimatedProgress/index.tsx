/**
 * 动画进度条组件
 * 展示当前训练进度和状态的可视化动画
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface AnimatedProgressProps {
  currentEpoch: number;
  totalEpochs: number;
  isTraining: boolean;
  trainingStatus: string;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export function AnimatedProgress({
  currentEpoch,
  totalEpochs,
  isTraining,
  trainingStatus,
  onStart,
  onStop,
  onReset
}: AnimatedProgressProps) {
  const progress = totalEpochs > 0 ? (currentEpoch / totalEpochs) * 100 : 0;

  const getStatusIcon = () => {
    switch (trainingStatus) {
      case 'optimal':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'underfitting':
        return <AlertCircle className="text-red-500" size={24} />;
      case 'overfitting':
        return <XCircle className="text-purple-500" size={24} />;
      default:
        return null;
    }
  };

  const getProgressColor = () => {
    switch (trainingStatus) {
      case 'optimal': return 'bg-green-500';
      case 'underfitting': return 'bg-red-500';
      case 'overfitting': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">训练进度</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-600">
            {currentEpoch} / {totalEpochs} 轮
          </span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-6">
        <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            className={`h-full ${getProgressColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          {progress.toFixed(1)}% 完成
        </p>
      </div>

      {/* Epoch 指示器 */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {Array.from({ length: totalEpochs }, (_, i) => i + 1).map((epoch) => (
            <motion.div
              key={epoch}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                epoch <= currentEpoch
                  ? `${getProgressColor()} text-white`
                  : 'bg-gray-200 text-gray-500'
              }`}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ 
                scale: epoch === currentEpoch && isTraining ? [1, 1.2, 1] : 1,
                opacity: epoch <= currentEpoch ? 1 : 0.6
              }}
              transition={{ 
                duration: epoch === currentEpoch && isTraining ? 1 : 0.3,
                repeat: epoch === currentEpoch && isTraining ? Infinity : 0
              }}
            >
              {epoch}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-3">
        <motion.button
          onClick={isTraining ? onStop : onStart}
          className={`px-6 py-2 rounded-full font-medium flex items-center space-x-2 ${
            isTraining 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentEpoch >= totalEpochs && !isTraining}
        >
          {isTraining ? <Pause size={16} /> : <Play size={16} />}
          <span>{isTraining ? '暂停' : '开始'}</span>
        </motion.button>
        
        <motion.button
          onClick={onReset}
          className="px-6 py-2 rounded-full font-medium bg-gray-500 hover:bg-gray-600 text-white flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={16} />
          <span>重置</span>
        </motion.button>
      </div>

      {/* 当前状态描述 */}
      {trainingStatus !== 'ready' && (
        <motion.div
          className="mt-4 p-4 rounded-xl bg-opacity-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center">
            {trainingStatus === 'underfitting' && (
              <p className="text-red-600">
                <strong>欠拟合：</strong>训练轮数太少，模型学习不充分，建议增加训练轮数
              </p>
            )}
            {trainingStatus === 'optimal' && (
              <p className="text-green-600">
                <strong>理想状态：</strong>训练轮数合适，模型学习效果良好
              </p>
            )}
            {trainingStatus === 'overfitting' && (
              <p className="text-purple-600">
                <strong>过拟合：</strong>训练轮数过多，模型"学傻了"，建议减少训练轮数
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
